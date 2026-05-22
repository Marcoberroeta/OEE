import React, { useMemo } from 'react';
import { AlertCircle, Package, Edit2, Settings, User } from 'lucide-react';
import { Machine } from '../../types';
import TimelineBar from './TimelineBar';

interface MachineCardProps {
  machine: Machine;
}

const MachineCard: React.FC<MachineCardProps> = ({ machine }) => {
  const headerBg =
    machine.status === 'producing'
      ? 'bg-brand-green-light'
      : 'bg-brand-yellow-light';
  const statusBg =
    machine.status === 'producing' ? 'bg-brand-green' : 'bg-brand-yellow';
  const statusText = machine.status === 'producing' ? 'text-white' : 'text-gray-900';
  const isWarning = machine.operation.includes('MÁQUINA') || machine.operation.includes('PERSONAL');

  const metrics = [
    { label: 'Disponibilidad', value: machine.availability?.toFixed(0) || '0', unit: '%' },
    { label: 'Velocidad Actual', value: machine.current_speed?.toFixed(0) || '0', unit: 'u/min' },
    { label: 'OEE', value: machine.oee?.toFixed(0) || '-', unit: '%' },
    { label: 'Productos Totales', value: machine.total_products?.toLocaleString() || '0', unit: '' },
    { label: 'Rendimiento', value: machine.performance?.toFixed(0) || '-', unit: '%' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-card overflow-hidden h-72">
      {/* Header */}
      <div className={`${headerBg} px-4 h-11 flex items-center justify-between border-b`}>
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold text-gray-700">{machine.name}</h3>
          <span className="text-base font-light text-gray-600">| {machine.type}</span>
          {machine.shift && (
            <span className={`px-2 py-0.5 rounded-full text-sm font-medium ${
              machine.status === 'producing'
                ? 'bg-brand-green text-white'
                : 'bg-brand-yellow text-gray-900'
            }`}>
              {machine.shift === 'morning' ? 'Mañana' : machine.shift === 'afternoon' ? 'Tarde' : 'Noche'}
            </span>
          )}
        </div>
        <button className={`${statusBg} ${statusText} px-4 py-1 rounded-tr rounded-bl-2xl text-lg font-semibold flex items-center gap-1`}>
          ⏱ {machine.elapsed_time}
          <span className="ml-1">{machine.status === 'producing' ? 'Produciendo' : 'Detenida'}</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-5 border-b border-gray-100">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className={`py-2 px-3 flex flex-col items-center ${
              idx > 0 ? 'border-l border-gray-100' : ''
            }`}
          >
            <div className="text-2xl font-semibold text-gray-700">
              {metric.value === '-' || metric.value === null ? (
                <span className="text-amber-500 flex items-center gap-1">
                  <AlertCircle className="w-5 h-5" />
                  Sin SKU
                </span>
              ) : (
                <>{metric.value}{metric.unit}</>
              )}
            </div>
            <div className="text-sm font-semibold text-gray-600 text-center">{metric.unit}</div>
            <div className="text-xs uppercase text-gray-400 text-center font-normal mt-1">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="px-3 py-2 border-b border-gray-100">
        <TimelineBar />
      </div>

      {/* Footer */}
      <div className="grid grid-cols-4 gap-2 px-3 pb-3 pt-2">
        <div className="bg-white border border-gray-100 rounded-md p-2 flex justify-between items-center cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-1">
            {isWarning ? <AlertCircle className="w-4 h-4 text-amber-500" /> : <Bell className="w-4 h-4 text-gray-400" />}
            <span className="text-xs text-gray-600">Operación</span>
          </div>
          <Edit2 className="w-3 h-3 text-gray-400" />
        </div>
        <div className="bg-white border border-gray-100 rounded-md p-2 flex justify-between items-center cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-600">{machine.operator || 'Operador'}</span>
          </div>
          <Edit2 className="w-3 h-3 text-gray-400" />
        </div>
        <div className="bg-white border border-gray-100 rounded-md p-2 flex justify-between items-center cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-1">
            <Package className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-600">{machine.sku || 'SKU'}</span>
          </div>
          <Edit2 className="w-3 h-3 text-gray-400" />
        </div>
        <div className="bg-white border border-gray-100 rounded-md p-2 flex justify-between items-center cursor-pointer hover:bg-gray-50">
          <span className="text-xs text-gray-600">Agregar Defectos</span>
          <div className="flex gap-1">
            <Edit2 className="w-3 h-3 text-gray-400" />
            <Settings className="w-3 h-3 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Bell = ({ className }: { className: string }) => {
  return <AlertCircle className={className} />;
};

export default MachineCard;
