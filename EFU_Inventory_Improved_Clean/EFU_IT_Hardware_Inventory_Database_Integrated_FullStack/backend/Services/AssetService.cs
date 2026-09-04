using EFU.Inventory.Backend.Data;
using EFU.Inventory.Backend.DTOs;
using EFU.Inventory.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace EFU.Inventory.Backend.Services;

public class AssetService(AppDbContext db)
{
    public async Task<Asset> Create(CreateAssetRequest d)
    {
        var type = await db.AssetTypes.FirstOrDefaultAsync(x => x.Id == d.AssetTypeId && x.Status == "ACTIVE")
            ?? throw new InvalidOperationException("The selected asset type is inactive and cannot be used.");
        var policy = await db.LifecyclePolicies.FirstOrDefaultAsync(x => x.AssetTypeId == d.AssetTypeId && x.Status == "ACTIVE");
        var count = await db.Assets.IgnoreQueryFilters().CountAsync(x => x.AssetTypeId == d.AssetTypeId) + 1;
        var code = $"{type.Prefix}-{count:000000}";
        while (await db.Assets.IgnoreQueryFilters().AnyAsync(x => x.AssetCode == code))
        {
            count++;
            code = $"{type.Prefix}-{count:000000}";
        }

        var a = new Asset
        {
            AssetCode = code,
            AssetTypeId = d.AssetTypeId,
            AssetMakeId = d.AssetMakeId,
            Model = d.Model.Trim(),
            MotherboardId = d.MotherboardId,
            MemoryId = d.MemoryId,
            StorageId = d.StorageId,
            OperatingSystemId = d.OperatingSystemId,
            Accessories = d.Accessories,
            SerialNumber = d.SerialNumber.Trim(),
            VendorId = d.VendorId,
            PurchaseDate = d.PurchaseDate,
            PurchaseCost = d.PurchaseCost,
            AddingDate = d.AddingDate ?? DateTime.UtcNow,
            LocationId = d.LocationId,
            AssetTag = d.AssetTag,
            Condition = d.Condition,
            AdditionalNotes = d.AdditionalNotes,
            PurchaseOrderNumber = d.PurchaseOrderNumber,
            InvoiceNumber = d.InvoiceNumber,
            MacAddress = d.MacAddress,
            IpAddress = d.IpAddress,
            Hostname = d.Hostname,
            Domain = d.Domain,
            BiosVersion = d.BiosVersion,
            GpuModel = d.GpuModel,
            Status = AssetStatuses.InStock
        };
        if (policy != null)
        {
            a.WarrantyExpiryDate = d.PurchaseDate.AddYears(policy.WarrantyPeriodYears);
            a.ExpectedExpiryDate = d.PurchaseDate.AddYears(policy.ExpectedLifespanYears);
        }

        db.Assets.Add(a);
        db.AssetStatusHistories.Add(new AssetStatusHistory
        {
            AssetId = a.Id,
            FromStatus = "NEW",
            ToStatus = AssetStatuses.InStock,
            EventType = "CREATED",
            EffectiveAt = a.AddingDate
        });
        await db.SaveChangesAsync();
        return a;
    }

    public decimal CurrentBookValue(Asset a, LifecyclePolicy? p)
    {
        if (p is null) return a.PurchaseCost;
        var years = (decimal)Math.Max(0, (DateTime.UtcNow - a.PurchaseDate).TotalDays / 365.25);
        var salvage = a.PurchaseCost * p.SalvageValuePercent / 100m;
        if (p.ExpectedLifespanYears <= 0) return a.PurchaseCost;
        var annual = (a.PurchaseCost - salvage) / p.ExpectedLifespanYears;
        return Math.Max(salvage, a.PurchaseCost - annual * years);
    }
}
