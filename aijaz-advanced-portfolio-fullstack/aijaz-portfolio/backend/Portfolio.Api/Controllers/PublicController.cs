using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.DTOs;
using Portfolio.Api.Models;
using Portfolio.Api.Services;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api")]
public class PublicController(AppDbContext db, PortfolioChatService chat) : ControllerBase
{
    [HttpPost("contact"), EnableRateLimiting("contact")]
    public async Task<IActionResult> Contact(ContactRequest request)
    {
        db.ContactMessages.Add(new ContactMessage { Name=request.Name.Trim(), Email=request.Email.Trim().ToLowerInvariant(), Subject=request.Subject.Trim(), Message=request.Message.Trim() });
        await db.SaveChangesAsync();
        return Ok(new { message="Message received successfully." });
    }

    [HttpPost("chat"), EnableRateLimiting("chat")]
    public async Task<IActionResult> Chat(ChatRequest request) => Ok(new { answer=await chat.AnswerAsync(request.Message.Trim()) });

    [HttpGet("projects"), OutputCache]
    public async Task<IActionResult> Projects([FromQuery] string? category, [FromQuery] string? search)
    {
        var query=db.Projects.AsNoTracking().AsQueryable();
        if(!string.IsNullOrWhiteSpace(category)) query=query.Where(x=>x.Category==category);
        if(!string.IsNullOrWhiteSpace(search)) query=query.Where(x=>x.Title.Contains(search)||x.Summary.Contains(search)||x.StackCsv.Contains(search));
        return Ok(await query.OrderByDescending(x=>x.Featured).ThenBy(x=>x.DisplayOrder).ToListAsync());
    }

    [HttpGet("projects/{slug}"), OutputCache]
    public async Task<IActionResult> Project(string slug)
    {
        var item=await db.Projects.AsNoTracking().SingleOrDefaultAsync(x=>x.Slug==slug);
        return item is null ? NotFound(new { message="Project not found." }) : Ok(item);
    }

    [HttpPost("analytics")]
    public async Task<IActionResult> Analytics(AnalyticsRequest request)
    {
        db.AnalyticsEvents.Add(new AnalyticsEvent { EventName=request.EventName.Trim(), Path=request.Path?.Trim(), MetadataJson=request.MetadataJson });
        await db.SaveChangesAsync(); return Accepted();
    }
}
