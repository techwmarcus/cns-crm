import { useEffect } from 'react';
import { Search, Filter, Plus, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export function Clients() {
  const { clients, fetchClients, loading, error } = useAppStore();

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  if (loading) {
    return <div className="p-6">Loading clients...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Client
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Contact</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Projects</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Revenue</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{client.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{client.contactName}</td>
                <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-1">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {client.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-1">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {client.phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{client.activeProjectsCount}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ${(client.totalRevenue / 1000000).toFixed(1)}M
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    client.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
