using EFU.Inventory.Backend.Services; using Microsoft.AspNetCore.Authorization; using Microsoft.AspNetCore.Mvc;
namespace EFU.Inventory.Backend.Controllers; [ApiController,Route("api/dashboard"),Authorize] public class DashboardController(DashboardService s):ControllerBase{[HttpGet]public async Task<IActionResult> Get()=>Ok(new{success=true,data=await s.Get()});}
