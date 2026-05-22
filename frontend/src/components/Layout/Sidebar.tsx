import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Clock,
  Database,
  BarChart3,
  Table,
  Bell,
  FileText,
  Download,
  Settings,
  ChevronDown,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const navItems = [
    { label: 'Resumen General', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Tiempo Real', icon: Clock, path: '/realtime' },
    { label: 'Bases de Datos', icon: Database, path: '/databases' },
    { label: 'Analítica de datos', icon: BarChart3, path: '/analytics' },
    { label: 'Tabla de Métricas', icon: Table, path: '/metrics' },
    { label: 'Notificaciones', icon: Bell, path: '/view-alerts' },
    { label: 'Reportes', icon: FileText, path: '/reports' },
    { label: 'Exportar Datos', icon: Download, path: '/data/reports' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`${
        isOpen ? 'w-sidebar' : 'w-0'
      } bg-white border-r border-gray-100 shadow-sidebar transition-all duration-300 overflow-hidden flex flex-col`}
    >
      {/* Logo */}
      <div className="px-4 py-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-brand-green">Pulsar</h1>
        <p className="text-xs text-gray-400 mt-1">OEE Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-md mb-1 transition-colors ${
              isActive(item.path)
                ? 'bg-secondary text-brand-green'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}

        {/* Settings */}
        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Configuraciones</span>
          <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${ settingsOpen ? 'rotate-180' : '' }`} />
        </button>

        {settingsOpen && (
          <div className="ml-4 mt-2 space-y-1 border-l border-gray-200 pl-2">
            <Link to="#" className="block text-xs text-gray-500 hover:text-gray-700 py-1">
              Catálogo de Paros
            </Link>
            <Link to="#" className="block text-xs text-gray-500 hover:text-gray-700 py-1">
              Operadores
            </Link>
            <Link to="#" className="block text-xs text-gray-500 hover:text-gray-700 py-1">
              Producción
            </Link>
            <Link to="#" className="block text-xs text-gray-500 hover:text-gray-700 py-1">
              Alertas
            </Link>
            <Link to="#" className="block text-xs text-gray-500 hover:text-gray-700 py-1">
              Objetivos
            </Link>
            <Link to="#" className="block text-xs text-gray-500 hover:text-gray-700 py-1">
              Turnos
            </Link>
            <Link to="#" className="block text-xs text-gray-500 hover:text-gray-700 py-1">
              Grupos de Máquinas
            </Link>
            <Link to="#" className="block text-xs text-gray-500 hover:text-gray-700 py-1">
              Usuarios
            </Link>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">v6.05.2001+prod</p>
      </div>
    </aside>
  );
};

export default Sidebar;
