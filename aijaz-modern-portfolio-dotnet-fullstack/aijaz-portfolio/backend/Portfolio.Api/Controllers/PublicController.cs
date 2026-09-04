using Microsoft.AspNetCore.Mvc;
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
    [HttpPost("contact")]
    [EnableRateLimiting("contact")]
    public async Task<IActionResult> Contact(ContactRequest request)
    {
        db.ContactMessages.Add(new ContactMessage { Name=request.Name.Trim(), Email=request.Email.Trim(), Subject=request.Subject.Trim(), Message=request.Message.Trim() });
        await db.SaveChangesAsync();
        return Ok(new { message = "Message received successfully." });
    }

    [HttpPost("chat")]
    public async Task<IActionResult> Chat(ChatRequest request) => Ok(new { answer = await chat.AnswerAsync(request.Message) });

    [HttpGet("projects")]
    public async Task<IActionResult> Projects() => Ok(await db.Projects.OrderBy(x=>x.DisplayOrder).ToListAsync());

    [HttpGet("projects/{slug}")]
    public async Task<IActionResult> Project(string slug)
    {
        var item = await db.Projects.SingleOrDefaultAsync(x=>x.Slug==slug);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost("analytics")]
    public async Task<IActionResult> Analytics(AnalyticsRequest request)
    {
        db.AnalyticsEvents.Add(new AnalyticsEvent { EventName=request.EventName, Path=request.Path, MetadataJson=request.MetadataJson });
        await db.SaveChangesAsync();
        return Accepted();
    }
}
