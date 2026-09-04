using Portfolio.Api.Models;

namespace Portfolio.Api.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext db, IConfiguration config)
    {
        if (db.Projects.Any()) return;
        db.Projects.AddRange(
            new Project { Slug="enterprise-ai-assistant", Title="Enterprise AI Assistant", Category="AI / Full Stack", Summary="A context-aware assistant for secure company portals.", Description="A reusable AI assistant designed for enterprise portals, role-aware data access, charts and reports.", StackCsv="React,TypeScript,ASP.NET Core,SQL Server,AI", Featured=true, DisplayOrder=1 },
            new Project { Slug="efu-inventory-system", Title="EFU Inventory Management System", Category="Enterprise Full Stack", Summary="Asset lifecycle management with secure roles and dashboards.", Description="A production-oriented inventory platform with JWT, RBAC, audit logging and reporting.", StackCsv="React,TypeScript,ASP.NET Core,EF Core,SQL Server", Featured=true, DisplayOrder=2 },
            new Project { Slug="smart-agriculture", Title="Smart Agriculture AI", Category="AI / Cloud", Summary="AI-supported crop monitoring and farm recommendations.", Description="A smart agriculture concept for crop insights, irrigation and disease detection.", StackCsv="AI,Cloud,React,APIs", Featured=true, DisplayOrder=3 }
        );
        db.SaveChanges();
    }
}
