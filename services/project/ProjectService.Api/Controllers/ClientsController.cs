using Microsoft.AspNetCore.Mvc;
using ProjectService.Domain.Entities;
using ProjectService.Infrastructure.Repositories;

namespace ProjectService.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly IClientRepository _clientRepository;

    public ClientsController(IClientRepository clientRepository)
    {
        _clientRepository = clientRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ClientDto>>> GetAllClients([FromQuery] Guid tenantId)
    {
        var clients = await _clientRepository.GetAllAsync(tenantId);
        return Ok(clients.Select(MapToDto).ToList());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ClientDto>> GetClient(Guid id)
    {
        var client = await _clientRepository.GetByIdAsync(id);
        if (client == null)
            return NotFound();

        return Ok(MapToDto(client));
    }

    [HttpPost]
    public async Task<ActionResult<ClientDto>> CreateClient([FromBody] CreateClientRequest request)
    {
        var client = new Client
        {
            Id = Guid.NewGuid(),
            TenantId = request.TenantId,
            Name = request.Name,
            ContactName = request.ContactName,
            Email = request.Email,
            Phone = request.Phone,
            Industry = request.Industry,
            Status = request.Status ?? "Active",
            CreatedAt = DateTime.UtcNow,
            CreatedBy = Guid.NewGuid(), // In production, use current user ID
            Version = 1
        };

        var created = await _clientRepository.CreateAsync(client);
        return CreatedAtAction(nameof(GetClient), new { id = created.Id }, MapToDto(created));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ClientDto>> UpdateClient(Guid id, [FromBody] UpdateClientRequest request)
    {
        var client = await _clientRepository.GetByIdAsync(id);
        if (client == null)
            return NotFound();

        client.Name = request.Name ?? client.Name;
        client.ContactName = request.ContactName ?? client.ContactName;
        client.Email = request.Email ?? client.Email;
        client.Phone = request.Phone ?? client.Phone;
        client.Industry = request.Industry ?? client.Industry;
        client.Status = request.Status ?? client.Status;
        client.TotalRevenue = request.TotalRevenue ?? client.TotalRevenue;
        client.UpdatedBy = Guid.NewGuid();

        var updated = await _clientRepository.UpdateAsync(client);
        return Ok(MapToDto(updated));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteClient(Guid id)
    {
        await _clientRepository.DeleteAsync(id);
        return NoContent();
    }

    private ClientDto MapToDto(Client client) => new(
        client.Id,
        client.Name,
        client.ContactName,
        client.Email,
        client.Phone,
        client.Industry,
        client.Status,
        client.TotalRevenue,
        client.ActiveProjectsCount
    );
}

public record ClientDto(
    Guid Id,
    string Name,
    string? ContactName,
    string? Email,
    string? Phone,
    string? Industry,
    string Status,
    decimal TotalRevenue,
    int ActiveProjectsCount);

public record CreateClientRequest(
    Guid TenantId,
    string Name,
    string? ContactName,
    string? Email,
    string? Phone,
    string? Industry,
    string? Status);

public record UpdateClientRequest(
    string? Name,
    string? ContactName,
    string? Email,
    string? Phone,
    string? Industry,
    string? Status,
    decimal? TotalRevenue);
