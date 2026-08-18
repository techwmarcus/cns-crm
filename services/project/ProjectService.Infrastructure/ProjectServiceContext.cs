using Microsoft.EntityFrameworkCore;
using ProjectService.Domain.Entities;

namespace ProjectService.Infrastructure.Data;

public class ProjectServiceContext : DbContext
{
    public ProjectServiceContext(DbContextOptions<ProjectServiceContext> options)
        : base(options)
    {
    }

    public DbSet<Client> Clients { get; set; } = null!;
    public DbSet<Project> Projects { get; set; } = null!;
    public DbSet<ProjectMilestone> ProjectMilestones { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Client configuration
        modelBuilder.Entity<Client>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(255).IsRequired();
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.HasQueryFilter(e => !e.IsDeleted);
            entity.HasIndex(e => new { e.TenantId, e.Name });
        });

        // Project configuration
        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(255).IsRequired();
            entity.Property(e => e.Status).HasMaxLength(50);
            entity.Property(e => e.Health).HasMaxLength(50);
            entity.Property(e => e.TotalBudget).HasPrecision(18, 2);
            entity.Property(e => e.TotalSpent).HasPrecision(18, 2);
            entity.HasOne(e => e.Client)
                .WithMany()
                .HasForeignKey(e => e.ClientId);
            entity.HasMany(e => e.Milestones)
                .WithOne(m => m.Project)
                .HasForeignKey(m => m.ProjectId);
            entity.HasQueryFilter(e => !e.IsDeleted);
            entity.HasIndex(e => new { e.TenantId, e.Status });
        });

        // ProjectMilestone configuration
        modelBuilder.Entity<ProjectMilestone>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(255).IsRequired();
            entity.Property(e => e.Status).HasMaxLength(50);
            entity.HasQueryFilter(e => !e.IsDeleted);
        });
    }
}
