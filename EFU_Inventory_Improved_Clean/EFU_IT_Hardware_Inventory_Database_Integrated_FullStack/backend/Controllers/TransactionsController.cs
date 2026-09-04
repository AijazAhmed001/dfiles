using EFU.Inventory.Backend.Data;
using EFU.Inventory.Backend.DTOs;
using EFU.Inventory.Backend.Extensions;
using EFU.Inventory.Backend.Models;
using EFU.Inventory.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EFU.Inventory.Backend.Controllers;

[ApiController, Route("api/transactions"), Authorize]
public class TransactionsController(AppDbContext db, AuditService audit) : ControllerBase
{

    [HttpGet("allocations")]
    public async Task<IActionResult> GetAllocations([FromQuery] int page = 1, [FromQuery] int limit = 20)
    {
        page = Math.Max(1, page);
        limit = Math.Clamp(limit, 1, 100);

        var query = db.Allocations
            .AsNoTracking()
            .Include(x => x.Asset).ThenInclude(x => x!.AssetType)
            .Include(x => x.Employee).ThenInclude(x => x!.Department)
            .Where(x => x.Asset != null && x.Asset.AssetType != null && x.Asset.AssetType.Status == "ACTIVE")
            .OrderByDescending(x => x.AllocationDate);

        var total = await query.CountAsync();
        var data = await query.Skip((page - 1) * limit).Take(limit)
            .Select(x => new
            {
                x.Id, x.AllocationDate, x.ReturnedAt, x.Remarks,
                Asset = new { x.Asset!.Id, x.Asset.AssetCode, x.Asset.SerialNumber, x.Asset.Model, x.Asset.Status },
                Employee = x.Employee == null ? null : new { x.Employee.Id, x.Employee.Name, Department = x.Employee.Department == null ? null : x.Employee.Department.Name }
            }).ToListAsync();

        return Ok(new { success = true, data, meta = new { page, limit, total } });
    }
    [Authorize(Roles = Roles.SuperAdmin + "," + Roles.ItAdmin)]
    [HttpPost("allocate")]
    public async Task<IActionResult> Allocate(AllocateRequest d)
    {
        await using var tx = await db.Database.BeginTransactionAsync();
        var a = await db.Assets.FindAsync(d.AssetId) ?? throw new KeyNotFoundException("Asset not found");
        if (a.Status != AssetStatuses.InStock)
            return Conflict(new { success = false, message = "Only assets in IT stock can be allocated" });
        if (!await db.Employees.AnyAsync(x => x.Id == d.EmployeeId))
            return NotFound(new { success = false, message = "Employee not found" });

        var oldStatus = a.Status;
        var al = new Allocation { AssetId = d.AssetId, EmployeeId = d.EmployeeId, AllocationDate = d.AllocationDate, LocationId = d.LocationId, Remarks = d.Remarks };
        db.Allocations.Add(al);
        a.Status = AssetStatuses.Allocated;
        a.LocationId = d.LocationId ?? a.LocationId;
        db.AssetStatusHistories.Add(new AssetStatusHistory
        {
            AssetId = a.Id, FromStatus = oldStatus, ToStatus = AssetStatuses.Allocated,
            EventType = "ALLOCATED", PerformedByUserId = User.UserId(), Remarks = d.Remarks, EffectiveAt = d.AllocationDate
        });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        await audit.Log(User.UserId(), "ALLOCATE", "asset", a.Id, d);
        return StatusCode(201, new { success = true, data = al });
    }

    [Authorize(Roles = Roles.SuperAdmin + "," + Roles.ItAdmin)]
    [HttpPost("revoke")]
    public async Task<IActionResult> Revoke(RevokeRequest d)
    {
        await using var tx = await db.Database.BeginTransactionAsync();
        var a = await db.Assets.FindAsync(d.AssetId) ?? throw new KeyNotFoundException("Asset not found");
        var active = await db.Allocations.Where(x => x.AssetId == d.AssetId && x.ReturnedAt == null).OrderByDescending(x => x.AllocationDate).FirstOrDefaultAsync();
        if (active == null) return Conflict(new { success = false, message = "Asset is not currently allocated" });

        var oldStatus = a.Status;
        active.ReturnedAt = d.RevocationDate;
        var rv = new Revocation { AssetId = d.AssetId, EmployeeId = active.EmployeeId, Reason = d.Reason, Condition = d.Condition, Remarks = d.Remarks, RevocationDate = d.RevocationDate };
        db.Revocations.Add(rv);
        a.Status = AssetStatuses.InStock;
        db.AssetStatusHistories.Add(new AssetStatusHistory
        {
            AssetId = a.Id, FromStatus = oldStatus, ToStatus = AssetStatuses.InStock,
            EventType = "REVOKED", PerformedByUserId = User.UserId(), Remarks = d.Remarks, EffectiveAt = d.RevocationDate
        });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        await audit.Log(User.UserId(), "REVOKE", "asset", a.Id, d);
        return StatusCode(201, new { success = true, data = rv });
    }

    [Authorize(Roles = Roles.SuperAdmin + "," + Roles.ItAdmin)]
    [HttpPost("retire")]
    public async Task<IActionResult> Retire(RetireRequest d)
    {
        await using var tx = await db.Database.BeginTransactionAsync();
        var a = await db.Assets.FindAsync(d.AssetId) ?? throw new KeyNotFoundException("Asset not found");
        if (a.Status == AssetStatuses.Retired)
            return Conflict(new { success = false, message = "Asset is already retired" });

        var oldStatus = a.Status;
        var active = await db.Allocations.Where(x => x.AssetId == d.AssetId && x.ReturnedAt == null).ToListAsync();
        foreach (var x in active) x.ReturnedAt = d.ExpirationDate;
        var r = new Retirement { AssetId = d.AssetId, CurrentOwner = d.CurrentOwner, Reason = d.Reason, Condition = d.Condition, EndOfLifeAction = d.EndOfLifeAction, SalvageValue = d.SalvageValue, DisposalLocation = d.DisposalLocation, Remarks = d.Remarks, ExpirationDate = d.ExpirationDate };
        db.Retirements.Add(r);
        a.Status = AssetStatuses.Retired;
        db.AssetStatusHistories.Add(new AssetStatusHistory
        {
            AssetId = a.Id, FromStatus = oldStatus, ToStatus = AssetStatuses.Retired,
            EventType = "RETIRED", PerformedByUserId = User.UserId(), Remarks = d.Remarks, EffectiveAt = d.ExpirationDate
        });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        await audit.Log(User.UserId(), "RETIRE", "asset", a.Id, d);
        return StatusCode(201, new { success = true, data = r });
    }
}
