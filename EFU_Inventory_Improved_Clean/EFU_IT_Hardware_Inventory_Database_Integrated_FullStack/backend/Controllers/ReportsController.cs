using EFU.Inventory.Backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EFU.Inventory.Backend.Controllers;

[ApiController]
[Route("api/reports")]
[Authorize]
public class ReportsController(AppDbContext db) : ControllerBase
{
    [HttpGet("asset-history/{id:guid}")]
    public async Task<IActionResult> AssetHistory(Guid id)
    {
        var asset = await db.Assets
            .Include(item => item.AssetType)
            .Include(item => item.AssetMake)
            .Include(item => item.Motherboard)
            .Include(item => item.Memory)
            .Include(item => item.Storage)
            .Include(item => item.OperatingSystem)
            .Include(item => item.Vendor)
            .Include(item => item.Location)
            .FirstOrDefaultAsync(item => item.Id == id);

        if (asset is null)
        {
            return NotFound(new { success = false, message = "Asset not found" });
        }

        var allocations = await db.Allocations
            .Where(item => item.AssetId == id)
            .Include(item => item.Employee)
            .OrderBy(item => item.AllocationDate)
            .ToListAsync();

        var revocations = await db.Revocations
            .Where(item => item.AssetId == id)
            .OrderBy(item => item.RevocationDate)
            .ToListAsync();

        var retirements = await db.Retirements
            .Where(item => item.AssetId == id)
            .OrderBy(item => item.ExpirationDate)
            .ToListAsync();

        var statusHistory = await db.AssetStatusHistories
            .Where(item => item.AssetId == id)
            .OrderBy(item => item.EffectiveAt)
            .ToListAsync();

        return Ok(new
        {
            success = true,
            data = new
            {
                asset,
                allocations,
                revocations,
                retirements,
                statusHistory
            }
        });
    }

    [HttpGet("inventory")]
    public async Task<IActionResult> Inventory()
    {
        var assets = await db.Assets
            .Include(item => item.AssetType)
            .Include(item => item.AssetMake)
            .Include(item => item.Vendor)
            .ToListAsync();

        return Ok(new { success = true, data = assets });
    }

    [HttpGet("audit")]
    public async Task<IActionResult> Audit(int page = 1, int limit = 50)
    {
        page = Math.Max(page, 1);
        limit = Math.Clamp(limit, 1, 100);

        var query = db.ActivityLogs
            .Include(item => item.User)
            .OrderByDescending(item => item.CreatedAt);

        var total = await query.CountAsync();
        var logs = await query
            .Skip((page - 1) * limit)
            .Take(limit)
            .ToListAsync();

        return Ok(new
        {
            success = true,
            data = logs,
            meta = new { page, limit, total }
        });
    }
}
