import React from 'react';
import { Plus } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const reports = [
    {
      id: 1,
      name: 'Disponibilidad Semanal',
      charts: ['Disponibilidad por máquina', 'Disponibilidad por máquina', 'Causa específica de pérdida'],
      recipients: 'juan.martinez@...',
      createdBy: 'alejandra.martinez@...',
      date: '17-05-2026',
    },
    {
      id: 2,
      name: 'Diario',
      charts: ['Producción por máquina', 'Producción por máquina', 'Producción por máquina'],
      recipients: 'info@graficgold.com.mx',
      createdBy: 'info@...',
      date: '13-04-2026',
    },
    {
      id: 3,
      name: 'P&L',
      charts: ['Producción por máquina', 'Disponibilidad', 'OEE Neta por máquina'],
      recipients: 'info@graficgold.com.mx',
      createdBy: 'info@...',
      date: '13-04-2026',
    },
  ];

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar reportes por nombre..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button className="ml-4 px-4 py-2 bg-brand-green text-white rounded-md font-medium hover:bg-brand-green/90 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Crear reporte
        </button>
      </div>

      {/* Reports Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Nombre</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Gráficos</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Destinatarios</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Creado por</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Modificado</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900 font-medium">{report.name}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 flex-wrap">
                    {report.charts.slice(0, 2).map((chart, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {chart.substring(0, 20)}...
                      </span>
                    ))}
                    {report.charts.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{report.charts.length - 2} más
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 text-xs">{report.recipients}</td>
                <td className="px-6 py-4 text-gray-600 text-xs">{report.createdBy}</td>
                <td className="px-6 py-4 text-gray-600">{report.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
