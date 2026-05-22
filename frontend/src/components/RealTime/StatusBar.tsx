import React from 'react';
import { Cube } from 'lucide-react';

interface StatusBarProps {
  totalMachines: number;
  producing: number;
  stopped: number;
  alerts: number;
  noData: number;
  outOfShift: number;
}

const StatusBar: React.FC<StatusBarProps> = ({
  totalMachines,
  producing,
  stopped,
  alerts,
  noData,
  outOfShift,
}) => {
  const statuses = [
    { label: 'MÁQUINAS TOTALES', value: totalMachines, color: 'cyan' },
    { label: 'PRODUCIENDO', value: producing, color: 'green' },
    { label: 'DETENIDO', value: stopped, color: 'yellow' },
    { label: 'ALERTA', value: alerts, color: 'red' },
    { label: 'SIN DATOS', value: noData, color: 'gray' },
    { label: 'FUERA DE TURNO', value: outOfShift, color: 'blue' },
  ];

  const colorMap = {
    cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700' },
    red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
    gray: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
  };

  return (
    <div className="grid grid-cols-6 gap-4 px-6 pt-4 pb-2">
      {statuses.map((status) => {
        const colors = colorMap[status.color as keyof typeof colorMap];
        return (
          <div
            key={status.label}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
              colors.bg
            } ${colors.border}`}
          >
            <span className={`text-4xl font-bold leading-none ${colors.text}`}>
              {status.value}
            </span>
            <span className="text-xs uppercase tracking-wide text-gray-400">
              {status.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StatusBar;
