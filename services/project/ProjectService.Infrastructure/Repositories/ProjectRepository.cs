using Microsoft.EntityFrameworkCore;
using ProjectService.Domain.Entities;

namespace ProjectService.Infrastructure.Repositories;

public interface IProjectRepository
{
    Task<Project?> GetByIdAsync(Guid id);
    Task<List<Project>> GetAllAsync(Guid tenantId);
    Task<List<Project>> GetByClientIdAsync(Guid clientId);
    Task<Project> CreateAsync(Project project);
    Task<Project> UpdateAsync(Project project);
    Task DeleteAsync(Guid id);
}

public class ProjectRepository : IProjectRepository
{
    private readonly Data.ProjectServiceContext _context;

    public ProjectRepository(Data.ProjectServiceContext context)
    {
        _context = context;
    }

    public async Task<Project?> GetByIdAsync(Guid id)
    {
        return await _context.Projects
            .Include(p => p.Client)
            .Include(p => p.Milestones)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<List<Project>> GetAllAsync(Guid tenantId)
    {
        return await _context.Projects
            .Where(p => p.TenantId == tenantId)
            .Include(p => p.Client)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }

    public async Task<List<Project>> GetByClientIdAsync(Guid clientId)
    {
        return await _context.Projects
            .Where(p => p.ClientId == clientId)
            .Include(p => p.Client)
            .OrderBy(p => p.Name)
            .ToListAsync();
    }

    public async Task<Project> CreateAsync(Project project)
    {
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();
        return project;
    }

    public async Task<Project> UpdateAsync(Project project)
    {
        project.UpdatedAt = DateTime.UtcNow;
        _context.Projects.Update(project);
        await _context.SaveChangesAsync();
        return project;
    }

    public async Task DeleteAsync(Guid id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project != null)
        {
            project.IsDeleted = true;
            await _context.SaveChangesAsync();
        }
    }
}
