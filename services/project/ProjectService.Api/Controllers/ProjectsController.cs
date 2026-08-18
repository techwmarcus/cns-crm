using Microsoft.AspNetCore.Mvc;
using ProjectService.Domain.Entities;
using ProjectService.Infrastructure.Repositories;

namespace ProjectService.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectRepository _projectRepository;

    public ProjectsController(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetAllProjects([FromQuery] Guid tenantId)
    {
        var projects = await _projectRepository.GetAllAsync(tenantId);
        return Ok(projects.Select(MapToDto).ToList());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDto>> GetProject(Guid id)
    {
        var project = await _projectRepository.GetByIdAsync(id);
        if (project == null)
            return NotFound();

        return Ok(MapToDto(project));
    }

    [HttpGet("client/{clientId}")]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjectsByClient(Guid clientId)
    {
        var projects = await _projectRepository.GetByClientIdAsync(clientId);
        return Ok(projects.Select(MapToDto).ToList());
    }

    [HttpPost]
    public async Task<ActionResult<ProjectDto>> CreateProject([FromBody] CreateProjectRequest request)
    {
        var project = new Project
        {
            Id = Guid.NewGuid(),
            TenantId = request.TenantId,
            Name = request.Name,
            Description = request.Description,
            ClientId = request.ClientId,
            ManagerId = request.ManagerId,
            Status = request.Status ?? "Active",
            Health = request.Health ?? "Good",
            TotalBudget = request.TotalBudget ?? 0,
            TotalSpent = request.TotalSpent ?? 0,
            ExpectedEndDate = request.ExpectedEndDate,
            CreatedAt = DateTime.UtcNow,
            CreatedBy = Guid.NewGuid(),
            Version = 1
        };

        var created = await _projectRepository.CreateAsync(project);
        return CreatedAtAction(nameof(GetProject), new { id = created.Id }, MapToDto(created));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ProjectDto>> UpdateProject(Guid id, [FromBody] UpdateProjectRequest request)
    {
        var project = await _projectRepository.GetByIdAsync(id);
        if (project == null)
            return NotFound();

        project.Name = request.Name ?? project.Name;
        project.Description = request.Description ?? project.Description;
        project.Status = request.Status ?? project.Status;
        project.Health = request.Health ?? project.Health;
        project.TotalBudget = request.TotalBudget ?? project.TotalBudget;
        project.TotalSpent = request.TotalSpent ?? project.TotalSpent;
        project.ExpectedEndDate = request.ExpectedEndDate ?? project.ExpectedEndDate;
        project.UpdatedBy = Guid.NewGuid();

        var updated = await _projectRepository.UpdateAsync(project);
        return Ok(MapToDto(updated));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(Guid id)
    {
        await _projectRepository.DeleteAsync(id);
        return NoContent();
    }

    private ProjectDto MapToDto(Project project) => new(
        project.Id,
        project.Name,
        project.Description,
        project.ClientId,
        project.Status,
        project.Health,
        project.TotalBudget,
        project.TotalSpent,
        project.ExpectedEndDate?.ToString("yyyy-MM-dd"),
        CalculateProgress(project.TotalSpent, project.TotalBudget));

    private int CalculateProgress(decimal spent, decimal budget)
    {
        if (budget == 0) return 0;
        return (int)((spent / budget) * 100);
    }
}

public record ProjectDto(
    Guid Id,
    string Name,
    string? Description,
    Guid ClientId,
    string Status,
    string Health,
    decimal TotalBudget,
    decimal TotalSpent,
    string? ExpectedEndDate,
    int Progress);

public record CreateProjectRequest(
    Guid TenantId,
    string Name,
    string? Description,
    Guid ClientId,
    Guid ManagerId,
    string? Status,
    string? Health,
    decimal? TotalBudget,
    decimal? TotalSpent,
    DateTime? ExpectedEndDate);

public record UpdateProjectRequest(
    string? Name,
    string? Description,
    string? Status,
    string? Health,
    decimal? TotalBudget,
    decimal? TotalSpent,
    DateTime? ExpectedEndDate);
