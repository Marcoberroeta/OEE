import React from 'react';
import { Bell, User, Settings } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const currentDate = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <header className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Version TV Button */}
        <button className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
          Versión TV
        </button>

        {/* Machine Group Selector */}
        <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-md bg-white text-gray-700 hover:border-gray-300">
          <option>Todos los Grupos</option>
          <option>Impresión</option>
          <option>Producción</option>
        </select>

        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Avatar */}
        <button className="w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center">
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
