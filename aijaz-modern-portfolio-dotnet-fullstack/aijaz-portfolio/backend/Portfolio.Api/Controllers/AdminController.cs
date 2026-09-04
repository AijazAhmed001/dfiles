using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;
using Portfolio.Api.DTOs;
using Portfolio.Api.Models;
using Portfolio.Api.Services;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/admin")]
public class AdminController(AppDbContext db, IConfiguration config, TokenService tokenService) : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login(LoginRequest request)
    {
        var valid = request.Username == config["Admin:Username"] && request.Password == config["Admin:Password"];
        return valid ? Ok(new { token = tokenService.Create(request.Username) }) : Unauthorized(new { message = "Invalid credentials" });
    }

    [Authorize(Roles="Admin")]
    [HttpGet("messages")]
    public async Task<IActionResult> Messages() => Ok(await db.ContactMessages.OrderByDescending(x=>x.CreatedAtUtc).ToListAsync());

    [Authorize(Roles="Admin")]
    [HttpPatch("messages/{id:int}/read")]
    public async Task<IActionResult> MarkRead(int id)
    {
        var message = await db.ContactMessages.FindAsync(id);
        if (message is null) return NotFound();
        message.Read = true; await db.SaveChangesAsync(); return NoContent();
    }

    [Authorize(Roles="Admin")]
    [HttpDelete("messages/{id:int}")]
    public async Task<IActionResult> DeleteMessage(int id)
    {
        var message = await db.ContactMessages.FindAsync(id);
        if (message is null) return NotFound();
        db.Remove(message); await db.SaveChangesAsync(); return NoContent();
    }

    [Authorize(Roles="Admin")]
    [HttpPost("projects")]
    public async Task<IActionResult> CreateProject(ProjectRequest request)
    {
        var entity = Map(request); db.Projects.Add(entity); await db.SaveChangesAsync(); return CreatedAtAction(nameof(PublicController.Project), "Public", new { slug=entity.Slug }, entity);
    }

    [Authorize(Roles="Admin")]
    [HttpPut("projects/{id:int}")]
    public async Task<IActionResult> UpdateProject(int id, ProjectRequest request)
    {
        var entity = await db.Projects.FindAsync(id); if (entity is null) return NotFound();
        Apply(entity, request); await db.SaveChangesAsync(); return Ok(entity);
    }

    [Authorize(Roles="Admin")]
    [HttpDelete("projects/{id:int}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var entity = await db.Projects.FindAsync(id); if (entity is null) return NotFound();
        db.Remove(entity); await db.SaveChangesAsync(); return NoContent();
    }

    [Authorize(Roles="Admin")]
    [HttpGet("stats")]
    public async Task<IActionResult> Stats() => Ok(new {
        totalMessages = await db.ContactMessages.CountAsync(),
        unreadMessages = await db.ContactMessages.CountAsync(x=>!x.Read),
        projects = await db.Projects.CountAsync(),
        events = await db.AnalyticsEvents.CountAsync()
    });

    private static Project Map(ProjectRequest r) { var p = new Project { Slug=r.Slug, Title=r.Title, Category=r.Category, Summary=r.Summary }; Apply(p,r); return p; }
    private static void Apply(Project p, ProjectRequest r) { p.Slug=r.Slug; p.Title=r.Title; p.Category=r.Category; p.Summary=r.Summary; p.Description=r.Description; p.StackCsv=string.Join(',',r.Stack); p.GitHubUrl=r.GitHubUrl; p.LiveUrl=r.LiveUrl; p.ImageUrl=r.ImageUrl; p.Featured=r.Featured; p.DisplayOrder=r.DisplayOrder; p.UpdatedAtUtc=DateTime.UtcNow; }
}
