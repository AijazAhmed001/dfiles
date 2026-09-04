using System.ComponentModel.DataAnnotations;

namespace EFU.Inventory.DTOs;

// Authentication requests
public record LoginRequest(
    [Required, EmailAddress, StringLength(254)] string Email,
    [Required, StringLength(128)] string Password);

public record RefreshRequest(
    [Required, StringLength(500)] string RefreshToken);

public record ForgotPasswordRequest(
    [Required, EmailAddress, StringLength(254)] string Email);

public record ResetPasswordRequest(
    [Required, StringLength(500)] string Token,
    [Required, StringLength(128, MinimumLength = 8)] string NewPassword);

public record ChangePasswordRequest(
    [Required, StringLength(128)] string CurrentPassword,
    [Required, StringLength(128, MinimumLength = 8)] string NewPassword);

public record UpdateProfileRequest(
    [StringLength(200)] string? Name,
    [StringLength(30)] string? Phone,
    [StringLength(100)] string? EmployeeCode,
    Guid? DepartmentId,
    Guid? LocationId);

// User administration request
public record CreateUserRequest(
    [Required, StringLength(200)] string Name,
    [Required, EmailAddress, StringLength(254)] string Email,
    [Required, StringLength(128, MinimumLength = 8)] string Password,
    [Required, StringLength(50)] string Role);

// Asset request
public record CreateAssetRequest
{
    [Required] public Guid AssetTypeId { get; set; }
    public Guid? AssetMakeId { get; set; }
    [Required, StringLength(200)] public string Model { get; set; } = "";
    public Guid? MotherboardId { get; set; }
    public Guid? MemoryId { get; set; }
    public Guid? StorageId { get; set; }
    public Guid? OperatingSystemId { get; set; }
    [StringLength(2000)] public string? Accessories { get; set; }
    [Required, StringLength(100)] public string SerialNumber { get; set; } = "";
    public Guid? VendorId { get; set; }
    [Required] public DateTime PurchaseDate { get; set; }
    [Range(0, double.MaxValue)] public decimal PurchaseCost { get; set; }
    public DateTime? AddingDate { get; set; }
    public Guid? LocationId { get; set; }
    [StringLength(100)] public string? AssetTag { get; set; } = null;
    [StringLength(100)] public string? Condition { get; set; } = null;
    [StringLength(2000)] public string? AdditionalNotes { get; set; } = null;
    [StringLength(100)] public string? PurchaseOrderNumber { get; set; } = null;
    [StringLength(100)] public string? InvoiceNumber { get; set; } = null;
    [StringLength(100)] public string? MacAddress { get; set; } = null;
    [StringLength(100)] public string? IpAddress { get; set; } = null;
    [StringLength(100)] public string? Hostname { get; set; } = null;
    [StringLength(200)] public string? Domain { get; set; } = null;
    [StringLength(100)] public string? BiosVersion { get; set; } = null;
    [StringLength(200)] public string? GpuModel { get; set; } = null;
}

// Asset lifecycle requests
public record AllocateRequest
{
    [Required] public Guid AssetId { get; set; }
    [Required] public Guid EmployeeId { get; set; }
    [Required] public DateTime AllocationDate { get; set; }
    public Guid? LocationId { get; set; }
    [StringLength(2000)] public string? Remarks { get; set; }
}

public record RevokeRequest
{
    [Required] public Guid AssetId { get; set; }
    [Required, StringLength(2000)] public string Reason { get; set; } = "";
    [StringLength(100)] public string? Condition { get; set; }
    [StringLength(2000)] public string? Remarks { get; set; }
    [Required] public DateTime RevocationDate { get; set; }
}

public record RetireRequest
{
    [Required] public Guid AssetId { get; set; }
    [StringLength(200)] public string? CurrentOwner { get; set; }
    [Required, StringLength(2000)] public string Reason { get; set; } = "";
    [StringLength(100)] public string? Condition { get; set; }
    [Required, StringLength(100)] public string EndOfLifeAction { get; set; } = "";
    public decimal? SalvageValue { get; set; }
    [StringLength(200)] public string? DisposalLocation { get; set; }
    [StringLength(2000)] public string? Remarks { get; set; }
    [Required] public DateTime ExpirationDate { get; set; }
}
