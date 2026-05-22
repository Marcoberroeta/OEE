import React, { useState } from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface MetricPanelProps {
  title: string;
  mainValue: number;
  unit: string;
  trend: number;
  data: Array<{ label: string; value: number; color: string }>;
}

const MetricPanel: React.FC<MetricPanelProps> = ({
  title,
  mainValue,
  unit,
  trend,
  data,
}) => {
  const isPositive = trend >= 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-5xl font-bold text-gray-900">{mainValue}%</span>
        <div className={`flex items-center gap-1 ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="text-sm font-medium">{Math.abs(trend)}% Tendencia</span>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricPanel;
