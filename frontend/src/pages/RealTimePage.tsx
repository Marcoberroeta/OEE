import React from 'react';
import StatusBar from '../components/RealTime/StatusBar';
import MachineCard from '../components/RealTime/MachineCard';
import { mockMachines } from '../data/mockMachines';

const RealTimePage: React.FC = () => {
  const totalMachines = mockMachines.length;
  const producing = mockMachines.filter(m => m.status === 'producing').length;
  const stopped = mockMachines.filter(m => m.status === 'stopped').length;

  return (
    <div className="w-full">
      {/* Status Bar */}
      <StatusBar
        totalMachines={totalMachines}
        producing={producing}
        stopped={stopped}
        alerts={0}
        noData={0}
        outOfShift={0}
      />

      {/* Controls Row */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
            📊 Ordenar por
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
            🔽 Filtrar
          </button>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
            📅 Turnos Históricos
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
            🔍 Tour Rápido
          </button>
        </div>
      </div>

      {/* Machine Cards Grid */}
      <div className="px-6 pb-6 grid grid-cols-2 lg:grid-cols-3 gap-4">
        {mockMachines.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </div>
  );
};

export default RealTimePage;
