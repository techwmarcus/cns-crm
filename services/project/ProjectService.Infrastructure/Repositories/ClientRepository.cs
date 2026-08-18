using Microsoft.EntityFrameworkCore;
using ProjectService.Domain.Entities;

namespace ProjectService.Infrastructure.Repositories;

public interface IClientRepository
{
    Task<Client?> GetByIdAsync(Guid id);
    Task<List<Client>> GetAllAsync(Guid tenantId);
    Task<Client> CreateAsync(Client client);
    Task<Client> UpdateAsync(Client client);
    Task DeleteAsync(Guid id);
}

public class ClientRepository : IClientRepository
{
    private readonly Data.ProjectServiceContext _context;

    public ClientRepository(Data.ProjectServiceContext context)
    {
        _context = context;
    }

    public async Task<Client?> GetByIdAsync(Guid id)
    {
        return await _context.Clients.FindAsync(id);
    }

    public async Task<List<Client>> GetAllAsync(Guid tenantId)
    {
        return await _context.Clients
            .Where(c => c.TenantId == tenantId)
            .OrderBy(c => c.Name)
            .ToListAsync();
    }

    public async Task<Client> CreateAsync(Client client)
    {
        _context.Clients.Add(client);
        await _context.SaveChangesAsync();
        return client;
    }

    public async Task<Client> UpdateAsync(Client client)
    {
        client.UpdatedAt = DateTime.UtcNow;
        _context.Clients.Update(client);
        await _context.SaveChangesAsync();
        return client;
    }

    public async Task DeleteAsync(Guid id)
    {
        var client = await _context.Clients.FindAsync(id);
        if (client != null)
        {
            client.IsDeleted = true;
            await _context.SaveChangesAsync();
        }
    }
}
