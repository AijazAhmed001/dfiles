using System.ComponentModel.DataAnnotations;

namespace Portfolio.Api.DTOs;

public record ContactRequest(
    [Required, StringLength(100)] string Name,
    [Required, EmailAddress, StringLength(180)] string Email,
    [Required, StringLength(160)] string Subject,
    [Required, StringLength(3000, MinimumLength = 10)] string Message);

public record LoginRequest([Required] string Username, [Required] string Password);
public record ChatRequest([Required, StringLength(600)] string Message);
public record AnalyticsRequest([Required, StringLength(80)] string EventName, string? Path, string? MetadataJson);
public record ProjectRequest(string Slug, string Title, string Category, string Summary, string Description,
    string[] Stack, string? GitHubUrl, string? LiveUrl, string? ImageUrl, bool Featured, int DisplayOrder);
