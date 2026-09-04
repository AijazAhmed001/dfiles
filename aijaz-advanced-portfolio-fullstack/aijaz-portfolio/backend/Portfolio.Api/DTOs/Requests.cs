using System.ComponentModel.DataAnnotations;

namespace Portfolio.Api.DTOs;

public record ContactRequest(
    [Required, StringLength(100)] string Name,
    [Required, EmailAddress, StringLength(180)] string Email,
    [Required, StringLength(160)] string Subject,
    [Required, StringLength(3000, MinimumLength = 10)] string Message);

public record LoginRequest(
    [Required, StringLength(80)] string Username,
    [Required, StringLength(200)] string Password);

public record ChatRequest([Required, StringLength(600, MinimumLength = 2)] string Message);
public record AnalyticsRequest([Required, StringLength(80)] string EventName, [StringLength(300)] string? Path, [StringLength(2000)] string? MetadataJson);
public record ProjectRequest(
    [Required, RegularExpression("^[a-z0-9-]+$"), StringLength(120)] string Slug,
    [Required, StringLength(160)] string Title,
    [Required, StringLength(80)] string Category,
    [Required, StringLength(500)] string Summary,
    [StringLength(5000)] string Description,
    string[] Stack,
    [Url] string? GitHubUrl,
    [Url] string? LiveUrl,
    [Url] string? ImageUrl,
    bool Featured,
    [Range(0, 1000)] int DisplayOrder);
