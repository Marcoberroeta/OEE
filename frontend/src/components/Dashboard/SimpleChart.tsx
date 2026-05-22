import React from 'react';

interface ChartProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

const SimpleChart: React.FC<{ data: ChartProps[] }> = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((item, idx) => (
        <div key={idx}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{item.label}</span>
            <span className="text-sm font-bold text-gray-900">{item.value}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${item.color}`}
              style={{ width: `${(item.value / item.maxValue) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimpleChart;
