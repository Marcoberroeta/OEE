import React, { useState } from 'react';
import { Download, Upload, Settings } from 'lucide-react';

const DatabasesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('stops');

  const tabs = [
    { id: 'stops', label: '⚠️ Paradas', count: 286 },
    { id: 'production', label: '⊙ Producción', count: 29 },
    { id: 'operators', label: '👤 Operadores', count: 8 },
    { id: 'defects', label: '✦ Defectos', count: 0 },
  ];

  const stopsData = [
    {
      machine: 'S-1',
      date: 'May 20, 2026',
      shift: 'Morning',
      start: '10:55 AM',
      end: '11:57 AM',
      duration: '1h 2m',
      cause: 'PERSONAL (R.H.)',
      specific: 'Descanso',
      status: 'Live',
    },
    {
      machine: 'P-1',
      date: 'May 20, 2026',
      shift: 'Morning',
      start: '9:00 AM',
      end: '10:00 AM',
      duration: '1h 0m',
      cause: 'Operación',
      specific: 'Setup',
      status: 'Completed',
    },
  ];

  return (
    <div className="w-full p-6">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-brand-green text-brand-green'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} <span className="text-xs text-gray-500 ml-1">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Desde</label>
            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hasta</label>
            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
          </div>
        </div>
        <div className="flex gap-3">
          <select className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option>Máquinas 6</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            Filtros
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 flex items-center gap-1">
            <Download className="w-4 h-4" />
            Descargar
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Máquina</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Fecha</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Turno</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Inicio</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Fin</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Duración</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Causa General</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Estado</th>
            </tr>
          </thead>
          <tbody>
            {stopsData.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900 font-medium">{row.machine}</td>
                <td className="px-4 py-3 text-gray-600">{row.date}</td>
                <td className="px-4 py-3 text-gray-600">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    {row.shift}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{row.start}</td>
                <td className="px-4 py-3 text-gray-600">{row.end}</td>
                <td className="px-4 py-3 text-gray-600">{row.duration}</td>
                <td className="px-4 py-3 text-gray-600">{row.cause}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      row.status === 'Live'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {row.status === 'Live' ? '🔴 ' : ''}  {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600 flex justify-between">
        <span>1 : 100 de 286 paradas</span>
        <span>Página 1 de 3</span>
      </div>
    </div>
  );
};

export default DatabasesPage;
