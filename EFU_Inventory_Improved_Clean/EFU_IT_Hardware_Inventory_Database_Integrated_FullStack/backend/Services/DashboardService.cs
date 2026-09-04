using EFU.Inventory.Backend.Data;
using EFU.Inventory.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace EFU.Inventory.Backend.Services;

public class DashboardService(AppDbContext db)
{
    public async Task<object> Get()
    {
        var now = DateTime.UtcNow;
        var soon = now.AddDays(30);
        var activeAssets = db.Assets.Where(x => x.AssetType != null && x.AssetType.Status == "ACTIVE");
        var total = await activeAssets.CountAsync();
        var inStock = await activeAssets.CountAsync(x => x.Status == AssetStatuses.InStock);
        var allocated = await activeAssets.CountAsync(x => x.Status == AssetStatuses.Allocated);
        var retired = await activeAssets.CountAsync(x => x.Status == AssetStatuses.Retired);
        var expiring = await activeAssets.CountAsync(x => x.Status != AssetStatuses.Retired && x.ExpectedExpiryDate >= now && x.ExpectedExpiryDate <= soon);
        var warrantyExpiring = await activeAssets.CountAsync(x => x.WarrantyExpiryDate >= now && x.WarrantyExpiryDate <= soon);

        var recent = await db.Allocations
            .Include(x => x.Asset).ThenInclude(x => x!.AssetType)
            .Where(x => x.Asset != null && x.Asset.AssetType != null && x.Asset.AssetType.Status == "ACTIVE")
            .Include(x => x.Employee).ThenInclude(x => x!.Department)
            .OrderByDescending(x => x.CreatedAt)
            .Take(5)
            .Select(x => new
            {
                x.Id, x.AllocationDate,
                Asset = x.Asset == null ? null : new { x.Asset.Id, x.Asset.AssetCode, x.Asset.SerialNumber, x.Asset.Model, x.Asset.Status },
                Employee = x.Employee == null ? null : new { x.Employee.Id, x.Employee.Name, Department = x.Employee.Department == null ? null : x.Employee.Department.Name }
            })
            .ToListAsync();

        var distribution = await activeAssets
            .GroupBy(x => new { x.AssetTypeId, Name = x.AssetType!.Name })
            .Select(g => new { assetTypeId = g.Key.AssetTypeId, name = g.Key.Name, value = g.Count() })
            .OrderByDescending(x => x.value)
            .ToListAsync();

        var departments = await db.Allocations
            .Where(x => x.ReturnedAt == null && x.Asset != null && x.Asset.AssetType != null && x.Asset.AssetType.Status == "ACTIVE" && x.Employee != null && x.Employee.Department != null)
            .GroupBy(x => x.Employee!.Department!.Name)
            .Select(g => new { dept = g.Key, assets = g.Count() })
            .OrderByDescending(x => x.assets)
            .Take(8)
            .ToListAsync();

        var latestAssets = await activeAssets
            .Include(x => x.AssetType).Include(x => x.Vendor)
            .OrderByDescending(x => x.CreatedAt)
            .Take(5)
            .Select(x => new { x.Id, x.AssetCode, x.SerialNumber, x.Model, x.PurchaseCost, x.CreatedAt, Type = x.AssetType!.Name, Vendor = x.Vendor == null ? null : x.Vendor.Name })
            .ToListAsync();

        var monthStarts = Enumerable.Range(0, 6)
            .Select(offset => new DateTime(now.Year, now.Month, 1).AddMonths(offset - 5))
            .ToArray();
        var rangeStart = monthStarts[0];
        var rangeEnd = monthStarts[^1].AddMonths(1);
        var assetsByMonth = await activeAssets.Where(x => x.AddingDate >= rangeStart && x.AddingDate < rangeEnd).Select(x => x.AddingDate).ToListAsync();
        var allocationsByMonth = await db.Allocations.Where(x => x.AllocationDate >= rangeStart && x.AllocationDate < rangeEnd).Select(x => new { x.AllocationDate, x.ReturnedAt }).ToListAsync();
        var monthlyTrend = monthStarts.Select(start =>
        {
            var end = start.AddMonths(1);
            return new
            {
                month = start.ToString("MMM"),
                purchases = assetsByMonth.Count(x => x >= start && x < end),
                allocations = allocationsByMonth.Count(x => x.AllocationDate >= start && x.AllocationDate < end),
                returns = allocationsByMonth.Count(x => x.ReturnedAt >= start && x.ReturnedAt < end)
            };
        });

        var futureMonths = Enumerable.Range(0, 6).Select(offset => new DateTime(now.Year, now.Month, 1).AddMonths(offset)).ToArray();
        var warrantyStart = futureMonths[0];
        var warrantyEnd = futureMonths[^1].AddMonths(1);
        var warrantyDates = await activeAssets.Where(x => x.WarrantyExpiryDate >= warrantyStart && x.WarrantyExpiryDate < warrantyEnd).Select(x => x.WarrantyExpiryDate).ToListAsync();
        var warrantyTrend = futureMonths.Select(start => new { month = start.ToString("MMM"), expiring = warrantyDates.Count(x => x >= start && x < start.AddMonths(1)) });

        return new
        {
            stats = new { total, inStock, allocated, retired, expiring, warrantyExpiring },
            recentAllocations = recent,
            assetDistribution = distribution,
            departmentDistribution = departments,
            latestAssets,
            monthlyTrend,
            warrantyTrend
        };
    }
}
