using EFU.Inventory.Backend.Data;
using EFU.Inventory.Backend.DTOs;
using EFU.Inventory.Backend.Extensions;
using EFU.Inventory.Backend.Models;
using EFU.Inventory.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EFU.Inventory.Backend.Controllers;

[ApiController, Route("api/users"), Authorize(Roles = Roles.SuperAdmin)]
public class UsersController(AppDbContext db, AuditService audit) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> List() => Ok(new
    {
        success = true,
        data = await db.Users.Select(x => new { x.Id, x.Name, x.Email, x.Role, x.Status, x.LastLoginAt, x.EmployeeCode, x.CreatedAt }).ToListAsync()
    });

    [HttpPost]
    public async Task<IActionResult> Create(CreateUserRequest d)
    {
        if (d.Role is not (Roles.SuperAdmin or Roles.ItAdmin or Roles.Viewer))
            return BadRequest(new { success = false, message = "Invalid role" });
        if (await db.Users.AnyAsync(x => x.Email == d.Email))
            return Conflict(new { success = false, message = "Email already exists" });

        await using var tx = await db.Database.BeginTransactionAsync();
        var u = new User
        {
            Name = d.Name,
            Email = d.Email.ToLowerInvariant(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(d.Password),
            Role = d.Role,
            Status = "ACTIVE",
            PasswordChangedAt = DateTime.UtcNow
        };
        db.Users.Add(u);
        await db.SaveChangesAsync();

        var role = await db.Roles.FirstAsync(x => x.Name == d.Role);
        db.UserRoles.Add(new UserRole { UserId = u.Id, RoleId = role.Id });
        db.UserNotificationPreferences.Add(new UserNotificationPreference { UserId = u.Id });
        await db.SaveChangesAsync();
        await tx.CommitAsync();

        return StatusCode(201, new { success = true, data = new { u.Id, u.Name, u.Email, u.Role } });
    }

    [HttpPatch("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] Dictionary<string, string> body)
    {
        var u = await db.Users.FindAsync(id) ?? throw new KeyNotFoundException();
        if (body.TryGetValue("name", out var n)) u.Name = n;
        if (body.TryGetValue("status", out var s)) u.Status = s;
        if (body.TryGetValue("role", out var r))
        {
            if (r is not (Roles.SuperAdmin or Roles.ItAdmin or Roles.Viewer))
                return BadRequest(new { success = false, message = "Invalid role" });
            u.Role = r;
            var role = await db.Roles.FirstAsync(x => x.Name == r);
            var old = await db.UserRoles.Where(x => x.UserId == id).ToListAsync();
            db.UserRoles.RemoveRange(old);
            db.UserRoles.Add(new UserRole { UserId = id, RoleId = role.Id });
        }
        await db.SaveChangesAsync();
        return Ok(new
        {
            success = true,
            data = new { u.Id, u.Name, u.Email, u.Role, u.Status, u.LastLoginAt, u.EmployeeCode, u.CreatedAt }
        });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        if (id == User.UserId())
            return BadRequest(new { success = false, message = "You cannot delete your own account." });

        var user = await db.Users.FindAsync(id) ?? throw new KeyNotFoundException("User not found");
        user.IsDeleted = true;
        user.Status = "INACTIVE";
        var tokens = await db.RefreshTokens.Where(x => x.UserId == id && x.RevokedAt == null).ToListAsync();
        tokens.ForEach(x => x.RevokedAt = DateTime.UtcNow);
        await db.SaveChangesAsync();
        await audit.Log(User.UserId(), "DELETE", "user", id);
        return NoContent();
    }
}
