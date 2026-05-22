import React, { useState } from 'react';
import MachineStatusRow from '../components/Dashboard/MachineStatusRow';
import MetricPanel from '../components/Dashboard/MetricPanel';
import SimpleChart from '../components/Dashboard/SimpleChart';
import { Calendar } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('hoy');

  const availabilityData = [
    { label: 'I-1', value: 40, color: 'bg-green-500' },
    { label: 'P-1', value: 37, color: 'bg-green-500' },
    { label: 'P-2', value: 28, color: 'bg-yellow-500' },
    { label: 'S-1', value: 0, color: 'bg-red-500' },
    { label: 'I-2', value: 0, color: 'bg-red-500' },
    { label: 'S-2', value: 22, color: 'bg-yellow-500' },
  ];

  const causeData = [
    { label: 'Operación', value: 4, hours: '4h 39m', trend: 45, color: 'bg-blue-500' },
    { label: 'PERSONAL (R.H.)', value: 3, hours: '3h 1m', trend: 89, color: 'bg-purple-500' },
    { label: 'MÁQUINA / MANTENIMIENTO', value: 1, hours: '1h 35m', trend: 315, color: 'bg-red-500' },
    { label: 'Calidad', value: 0, hours: '0h 36m', trend: 289, color: 'bg-yellow-500' },
  ];

  return (
    <div className="w-full">
      {/* Machine Status Row */}
      <MachineStatusRow />

      {/* General Indicators Section */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            INDICADORES GENERALES | <span className="text-gray-500 font-normal">Miércoles 20/05/2026</span>
          </h2>
          <div className="flex gap-2">
            {['Hoy', 'Ayer', 'semana'].map((period) => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  timePeriod === period
                    ? 'bg-brand-green text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Disponibilidad Total */}
          <MetricPanel
            title="DISPONIBILIDAD TOTAL"
            mainValue={21}
            unit="%"
            trend={-5}
            data={[
              { label: 'Alta Disponibilidad (I-1)', value: 40, color: 'bg-green-500' },
              { label: 'Alta Disponibilidad (P-1)', value: 37, color: 'bg-green-500' },
              { label: 'Alta Disponibilidad (P-2)', value: 28, color: 'bg-yellow-500' },
              { label: 'Baja Disponibilidad (S-1)', value: 0, color: 'bg-red-500' },
            ]}
          />

          {/* Anotación de Paradas */}
          <MetricPanel
            title="ANOTACIÓN DE PARADAS"
            mainValue={100}
            unit="%"
            trend={85}
            data={[
              { label: 'Mayor Porcentaje (S-2)', value: 100, color: 'bg-green-500' },
              { label: 'Mayor Porcentaje (P-1)', value: 100, color: 'bg-green-500' },
              { label: 'Mayor Porcentaje (I-1)', value: 100, color: 'bg-green-500' },
              { label: 'Menor Porcentaje', value: 0, color: 'bg-gray-300' },
            ]}
          />

          {/* Causas Generales de Paradas */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">CAUSAS GENERALES DE PARADAS</h3>
            <div className="text-4xl font-bold text-gray-900 mb-6">9h 51m</div>
            <div className="space-y-3">
              {causeData.map((cause, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <div className={`w-3 h-3 rounded-full ${cause.color}`}></div>
                    <span className="text-sm text-gray-600">{cause.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{cause.hours}</div>
                    <div className="text-xs text-green-600">+{cause.trend}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Principales Eventos</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Máquina</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Causa General</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Detención</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900">P-1</td>
                <td className="py-3 px-4 text-gray-600">PERSONAL (R.H.)</td>
                <td className="py-3 px-4 text-gray-600">3h 1m</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900">S-2</td>
                <td className="py-3 px-4 text-gray-600">Operación</td>
                <td className="py-3 px-4 text-gray-600">1h 13m</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900">S-2</td>
                <td className="py-3 px-4 text-gray-600">Calidad</td>
                <td className="py-3 px-4 text-gray-600">0h 36m</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
