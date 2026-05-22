import React from 'react';

const TimelineBar: React.FC = () => {
  const segments = [
    { width: 30, fill: '#ffd505' },
    { width: 20, fill: '#4BD1A0' },
    { width: 25, fill: '#fcea99' },
    { width: 25, fill: '#FBF6F5' },
  ];

  const totalWidth = segments.reduce((sum, s) => sum + s.width, 0);

  return (
    <div className="w-full">
      <svg width="100%" height="55" style={{ width: '100%' }}>
        {/* Background */}
        <rect width="100%" height="20" fill="#FBF6F5" y="0" />
        
        {/* Segments */}
        {segments.map((seg, idx) => {
          const percentage = (seg.width / totalWidth) * 100;
          let xPosition = 0;
          for (let i = 0; i < idx; i++) {
            xPosition += (segments[i].width / totalWidth) * 100;
          }
          return (
            <rect
              key={idx}
              x={`${xPosition}%`}
              width={`${percentage}%`}
              height="20"
              fill={seg.fill}
              y="0"
            />
          );
        })}
        
        {/* Time Labels */}
        {['8:00 AM', '10:30 AM', '1:00 PM', '3:30 PM', '6:00 PM'].map((label, idx) => (
          <text
            key={idx}
            x={`${idx * 25}%`}
            y="42"
            fontSize="11"
            fill="#9CA3AF"
            textAnchor={idx === 0 ? 'start' : idx === 4 ? 'end' : 'middle'}
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default TimelineBar;
