import React, { useState } from 'react';
import { Download, Settings } from 'lucide-react';

const MetricsPage: React.FC = () => {
  const [dateFrom, setDateFrom] = useState('2026-05-18');
  const [dateTo, setDateTo] = useState('2026-05-20');

  const metricsData = [
    {
      date: 'May 19, 2026',
      production_time: 494,
      stop_time: 3226,
      no_data: 0,
      scheduled_stops: 369,
    },
    {
      date: 'May 18, 2026',
      production_time: 1138,
      stop_time: 2582,
      no_data: 0,
      scheduled_stops: 1073,
    },
  ];

  return (
    <div className="w-full p-6">
      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Desde</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hasta</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option>Máquinas</option>
            <option>P-1</option>
            <option>P-2</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option>Métricas</option>
            <option>Disponibilidad</option>
            <option>OEE</option>
          </select>
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 text-sm text-brand-green font-medium hover:bg-gray-50 rounded-md transition-colors">
              Reiniciar Filtros
            </button>
            <button className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-1">
              <Settings className="w-4 h-4" />
              Filtros Avanzados
            </button>
            <button className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-1">
              <Download className="w-4 h-4" />
              Descargar
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Fecha (Día)</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tiempo Producción</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tiempo en Paro</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sin Datos</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tiempo de Paros Programados</th>
            </tr>
          </thead>
          <tbody>
            {metricsData.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">{row.date}</td>
                <td className="px-6 py-4 text-gray-600">{row.production_time}</td>
                <td className="px-6 py-4 text-gray-600">{row.stop_time}</td>
                <td className="px-6 py-4 text-gray-600">{row.no_data}</td>
                <td className="px-6 py-4 text-gray-600">{row.scheduled_stops}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <span>1 : 2 métricas</span>
        <span>Página 1 de 1</span>
      </div>
    </div>
  );
};

export default MetricsPage;
