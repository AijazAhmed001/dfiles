using System.Security.Claims;
namespace EFU.Inventory.Backend.Extensions; public static class ClaimsExtensions{public static Guid UserId(this ClaimsPrincipal u)=>Guid.Parse(u.FindFirstValue(ClaimTypes.NameIdentifier)??throw new UnauthorizedAccessException());}
