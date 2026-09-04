using System.Text.Json;
using EFU.Inventory.Backend.Data;
using EFU.Inventory.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EFU.Inventory.Backend.Controllers;

[ApiController]
[Route("api/settings")]
[Authorize]
public class SettingsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var settings = await db.SystemSettings.ToListAsync();

        var data = settings.ToDictionary(
            setting => setting.Key,
            setting => (object?)JsonSerializer.Deserialize<object>(setting.Value));

        return Ok(new { success = true, data });
    }

    [HttpPut]
    [Authorize(Roles = Roles.SuperAdmin + "," + Roles.ItAdmin)]
    public async Task<IActionResult> Put(
        [FromBody] Dictionary<string, JsonElement> body)
    {
        foreach (var item in body)
        {
            var setting = await db.SystemSettings.FindAsync(item.Key);

            if (setting is null)
            {
                db.SystemSettings.Add(new SystemSetting
                {
                    Key = item.Key,
                    Value = item.Value.GetRawText()
                });
            }
            else
            {
                setting.Value = item.Value.GetRawText();
                setting.UpdatedAt = DateTime.UtcNow;
            }
        }

        await db.SaveChangesAsync();
        return Ok(new { success = true, data = body });
    }
}
