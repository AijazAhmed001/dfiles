using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Data;

namespace Portfolio.Api.Services;

public class PortfolioChatService(AppDbContext db)
{
    public async Task<string> AnswerAsync(string input)
    {
        var q = input.ToLowerInvariant();
        if (q.Contains("skill") || q.Contains("technology"))
            return "Aijaz works with React, TypeScript, ASP.NET Core, C#, FastAPI, SQL Server, PostgreSQL, Entity Framework Core, Docker, Git and modern AI-assistant concepts.";
        if (q.Contains("experience") || q.Contains("intern"))
            return "Aijaz has enterprise project experience from EFU General Insurance and has built full-stack systems involving APIs, databases, authentication, dashboards and deployment.";
        if (q.Contains("contact") || q.Contains("hire") || q.Contains("email"))
            return "You can use the contact form on this portfolio. Your message is securely stored for review in the admin dashboard.";
        if (q.Contains("project") || q.Contains("work") || q.Contains("build"))
        {
            var projects = await db.Projects.OrderBy(x => x.DisplayOrder).Take(5).Select(x => x.Title).ToListAsync();
            return $"Featured projects include {string.Join(", ", projects)}. Open the Projects section to explore each case study.";
        }
        if (q.Contains("who") || q.Contains("about"))
            return "Aijaz Ahmed is a BS Computer Science student, full-stack developer and AI application developer focused on secure, practical enterprise software.";
        return "Ask me about Aijaz's projects, ASP.NET Core experience, AI work, skills, internship or availability.";
    }
}
