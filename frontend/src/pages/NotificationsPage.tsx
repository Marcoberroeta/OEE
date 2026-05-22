import React from 'react';
import { AlertCircle, AlertTriangle } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Paro en S-1',
      message: 'Paro en S-1 por más de 60 min desde las 10:55 hrs.',
      machine: 'S-1',
      timestamp: '2026-04-13 11:57 AM',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Paro en S-1',
      message: 'Paro en S-1 por más de 60 min desde las 08:03 hrs.',
      machine: 'S-1',
      timestamp: '2026-04-13 9:05 AM',
    },
    {
      id: 3,
      type: 'warning',
      title: 'Paro en I-2',
      message: 'Paro en I-2 por más de 60 min desde las 08:00 hrs.',
      machine: 'I-2',
      timestamp: '2026-04-13 9:02 AM',
    },
  ];

  const criticalCount = alerts.filter((a) => a.type === 'critical').length;
  const warningCount = alerts.filter((a) => a.type === 'warning').length;

  return (
    <div className="w-full p-6">
      {/* Summary Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex gap-6">
        <div>
          <span className="text-sm text-gray-600">TOTAL ALERTAS</span>
          <span className="text-2xl font-bold text-gray-900 ml-2">78</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <span className="text-sm text-gray-600">CRÍTICO: 0</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-500" />
          <span className="text-sm text-gray-600">ADVERTENCIAS: {warningCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span className="text-sm text-gray-600">RECUPERADO: 0</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Buscar alertas..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
          <option>Máquinas</option>
        </select>
        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
          <option>Destinatarios</option>
        </select>
        <button className="px-4 py-2 text-sm text-brand-green font-medium hover:bg-gray-50 rounded-md">
          Reiniciar filtros
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
          <span className="text-sm font-semibold text-gray-700">Older</span>
          <button className="text-sm text-brand-green font-medium hover:underline">
            Marcar todo como leído
          </button>
        </div>

        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer flex items-start justify-between"
          >
            <div className="flex gap-4 flex-1">
              <AlertCircle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  <span>🖥 {alert.machine}</span>
                  <span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                      Advertencia
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-gray-500">{alert.timestamp}</p>
              <button className="text-gray-400 hover:text-gray-600 mt-2">›</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-600 flex justify-between">
        <span>1 : 5 de 78 Notificaciones</span>
        <span>Page 1 of 16</span>
      </div>
    </div>
  );
};

export default NotificationsPage;
