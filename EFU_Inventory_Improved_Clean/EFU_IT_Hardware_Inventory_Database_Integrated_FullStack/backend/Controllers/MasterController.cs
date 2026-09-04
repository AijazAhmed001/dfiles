using System.Text.Json;
using EFU.Inventory.Backend.Data;
using EFU.Inventory.Backend.Extensions;
using EFU.Inventory.Backend.Models;
using EFU.Inventory.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EFU.Inventory.Backend.Controllers;

/// <summary>
/// Handles all master/setup tables through one common endpoint.
/// Examples: asset-type, asset-make, vendor, department and location.
/// </summary>
[ApiController]
[Route("api/master")]
[Authorize]
public class MasterController(
    AppDbContext db,
    AuditService auditService) : ControllerBase
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    [HttpGet("{type}")]
    public async Task<IActionResult> List(
        string type,
        [FromQuery] int page = 1,
        [FromQuery] int limit = 10,
        [FromQuery] string? search = null,
        [FromQuery] bool activeOnly = false)
    {
        page = Math.Max(1, page);
        limit = Math.Clamp(limit, 1, 100);

        var rows = await GetQuery(type)
            .AsNoTracking()
            .ToListAsync();

        if (activeOnly)
        {
            rows = rows.Where(IsActive).ToList();
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            rows = rows
                .Where(row => MatchesSearch(row, search))
                .ToList();
        }

        var total = rows.Count;
        var data = rows
            .Skip((page - 1) * limit)
            .Take(limit)
            .Select(row => (object)row)
            .ToList();

        return Ok(new
        {
            success = true,
            data,
            meta = new { page, limit, total }
        });
    }

    [HttpPost("{type}")]
    [Authorize(Roles = Roles.SuperAdmin + "," + Roles.ItAdmin)]
    public async Task<IActionResult> Create(
        string type,
        [FromBody] JsonElement body)
    {
        var entity = DeserializeEntity(type, body);

        db.Add(entity);
        await db.SaveChangesAsync();

        await auditService.Log(
            User.UserId(),
            "CREATE",
            type,
            entity.Id,
            entity);

        return StatusCode(
            StatusCodes.Status201Created,
            new { success = true, data = (object)entity });
    }

    [HttpPut("{type}/{id:guid}")]
    [Authorize(Roles = Roles.SuperAdmin + "," + Roles.ItAdmin)]
    public async Task<IActionResult> Update(
        string type,
        Guid id,
        [FromBody] JsonElement body)
    {
        var existingEntity = await GetQuery(type)
            .FirstOrDefaultAsync(entity => entity.Id == id)
            ?? throw new KeyNotFoundException("Record not found");

        var incomingEntity = DeserializeEntity(type, body);
        CopyEditableProperties(type, incomingEntity, existingEntity);

        await db.SaveChangesAsync();
        await auditService.Log(User.UserId(), "UPDATE", type, id, body);

        return Ok(new
        {
            success = true,
            data = (object)existingEntity
        });
    }

    [HttpDelete("{type}/{id:guid}")]
    [Authorize(Roles = Roles.SuperAdmin)]
    public async Task<IActionResult> Delete(string type, Guid id)
    {
        var entity = await GetQuery(type)
            .FirstOrDefaultAsync(item => item.Id == id)
            ?? throw new KeyNotFoundException("Record not found");

        // Soft delete: the database record is kept, but hidden from normal use.
        entity.IsDeleted = true;

        await db.SaveChangesAsync();
        await auditService.Log(User.UserId(), "DELETE", type, id);

        return NoContent();
    }

    private IQueryable<BaseEntity> GetQuery(string type)
    {
        return type switch
        {
            "asset-type" => db.AssetTypes,
            "asset-make" => db.AssetMakes,
            "motherboard" => db.Motherboards,
            "memory" => db.Memories,
            "storage" => db.Storages,
            "operating-system" => db.OperatingSystems,
            "vendor" => db.Vendors,
            "province" => db.Provinces,
            "city" => db.Cities,
            "location" => db.Locations,
            "department" => db.Departments,
            "office" => db.Offices,
            "employee" => db.Employees,
            "lifecycle-policy" => db.LifecyclePolicies,
            _ => throw new KeyNotFoundException("Unknown setup type")
        };
    }

    private static Type GetEntityType(string type)
    {
        return type switch
        {
            "asset-type" => typeof(AssetType),
            "asset-make" => typeof(AssetMake),
            "motherboard" => typeof(Motherboard),
            "memory" => typeof(Memory),
            "storage" => typeof(Storage),
            "operating-system" => typeof(Models.OperatingSystem),
            "vendor" => typeof(Vendor),
            "province" => typeof(Province),
            "city" => typeof(City),
            "location" => typeof(Location),
            "department" => typeof(Department),
            "office" => typeof(Office),
            "employee" => typeof(Employee),
            "lifecycle-policy" => typeof(LifecyclePolicy),
            _ => throw new KeyNotFoundException("Unknown setup type")
        };
    }

    private static BaseEntity DeserializeEntity(
        string type,
        JsonElement body)
    {
        var entityType = GetEntityType(type);

        return (BaseEntity?)JsonSerializer.Deserialize(
            body.GetRawText(),
            entityType,
            JsonOptions)
            ?? throw new ArgumentException("Invalid request body");
    }

    private static void CopyEditableProperties(
        string type,
        BaseEntity source,
        BaseEntity destination)
    {
        var protectedProperties = new HashSet<string>
        {
            "Id",
            "CreatedAt",
            "UpdatedAt",
            "IsDeleted"
        };

        var properties = GetEntityType(type)
            .GetProperties()
            .Where(property =>
                property.CanRead &&
                property.CanWrite &&
                !protectedProperties.Contains(property.Name));

        foreach (var property in properties)
        {
            var value = property.GetValue(source);

            if (value is not null)
            {
                property.SetValue(destination, value);
            }
        }
    }

    private static bool IsActive(BaseEntity entity)
    {
        var statusProperty = entity.GetType().GetProperty("Status");
        return statusProperty?.GetValue(entity)?.ToString()?.Equals("ACTIVE", StringComparison.OrdinalIgnoreCase) == true;
    }

    private static bool MatchesSearch(BaseEntity entity, string search)
    {
        var json = JsonSerializer.Serialize(entity, entity.GetType());
        return json.Contains(search, StringComparison.OrdinalIgnoreCase);
    }
}
