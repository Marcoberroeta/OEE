import React from 'react';
import { Activity, Power, Clock } from 'lucide-react';

const MachineStatusRow: React.FC = () => {
  const statuses = [
    { icon: Power, label: 'Máquinas Detenidas', value: 4, color: 'text-yellow-500' },
    { icon: Activity, label: 'Máquinas Funcionando', value: 2, color: 'text-green-500' },
    { icon: Clock, label: 'Máquinas Sin Turno', value: 0, color: 'text-gray-500' },
    { icon: Clock, label: '6 Máquinas sin Datos', value: 6, color: 'text-blue-500' },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 px-6 pt-4 pb-4">
      {statuses.map((status, idx) => {
        const Icon = status.icon;
        return (
          <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{status.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{status.value}</p>
              </div>
              <Icon className={`w-8 h-8 ${status.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MachineStatusRow;
