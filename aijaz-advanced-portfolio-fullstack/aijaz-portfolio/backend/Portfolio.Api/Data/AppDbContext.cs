using Microsoft.EntityFrameworkCore;
using Portfolio.Api.Models;

namespace Portfolio.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<AnalyticsEvent> AnalyticsEvents => Set<AnalyticsEvent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>().HasIndex(x => x.Slug).IsUnique();
        modelBuilder.Entity<ContactMessage>().Property(x => x.Email).HasMaxLength(180);
        modelBuilder.Entity<AnalyticsEvent>().HasIndex(x => x.CreatedAtUtc);
    }
}
