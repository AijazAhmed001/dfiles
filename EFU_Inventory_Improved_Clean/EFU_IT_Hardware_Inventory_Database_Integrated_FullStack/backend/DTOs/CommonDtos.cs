using System.ComponentModel.DataAnnotations;

namespace EFU.Inventory.Backend.DTOs;

// Authentication requests
public record LoginRequest(
    [Required, EmailAddress] string Email,
    [Required] string Password);

public record RefreshRequest(
    [Required] string RefreshToken);

public record ForgotPasswordRequest(
    [Required, EmailAddress] string Email);

public record ResetPasswordRequest(
    [Required] string Token,
    [Required, MinLength(8)] string NewPassword);

public record ChangePasswordRequest(
    [Required] string CurrentPassword,
    [Required, MinLength(8)] string NewPassword);

public record UpdateProfileRequest(
    string? Name,
    string? Phone,
    string? EmployeeCode,
    Guid? DepartmentId,
    Guid? LocationId);

// User administration request
public record CreateUserRequest(
    [Required] string Name,
    [Required, EmailAddress] string Email,
    [Required, MinLength(8)] string Password,
    [Required] string Role);

// Asset request
public record CreateAssetRequest(
    [Required] Guid AssetTypeId,
    Guid? AssetMakeId,
    [Required] string Model,
    Guid? MotherboardId,
    Guid? MemoryId,
    Guid? StorageId,
    Guid? OperatingSystemId,
    string? Accessories,
    [Required] string SerialNumber,
    Guid? VendorId,
    [Required] DateTime PurchaseDate,
    [Range(0, double.MaxValue)] decimal PurchaseCost,
    DateTime? AddingDate,
    Guid? LocationId,
    string? AssetTag = null,
    string? Condition = null,
    string? AdditionalNotes = null,
    string? PurchaseOrderNumber = null,
    string? InvoiceNumber = null,
    string? MacAddress = null,
    string? IpAddress = null,
    string? Hostname = null,
    string? Domain = null,
    string? BiosVersion = null,
    string? GpuModel = null);

// Asset lifecycle requests
public record AllocateRequest(
    [Required] Guid AssetId,
    [Required] Guid EmployeeId,
    [Required] DateTime AllocationDate,
    Guid? LocationId,
    string? Remarks);

public record RevokeRequest(
    [Required] Guid AssetId,
    [Required] string Reason,
    string? Condition,
    string? Remarks,
    [Required] DateTime RevocationDate);

public record RetireRequest(
    [Required] Guid AssetId,
    string? CurrentOwner,
    [Required] string Reason,
    string? Condition,
    [Required] string EndOfLifeAction,
    decimal? SalvageValue,
    string? DisposalLocation,
    string? Remarks,
    [Required] DateTime ExpirationDate);
