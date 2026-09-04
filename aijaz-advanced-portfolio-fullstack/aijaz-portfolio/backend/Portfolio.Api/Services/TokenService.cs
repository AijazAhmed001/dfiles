using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Portfolio.Api.Services;

public class TokenService(IConfiguration config)
{
    public string Create(string username)
    {
        var key = config["Jwt:Key"] ?? throw new InvalidOperationException("JWT key missing");
        var claims = new[] { new Claim(ClaimTypes.Name, username), new Claim(ClaimTypes.Role, "Admin") };
        var credentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)), SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"], audience: config["Jwt:Audience"], claims: claims,
            expires: DateTime.UtcNow.AddMinutes(config.GetValue("Jwt:ExpiryMinutes", 120)), signingCredentials: credentials);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
