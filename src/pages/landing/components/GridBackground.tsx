import React from 'react';

interface GridBackgroundProps {
  className?: string;
}

const GridBackground: React.FC<GridBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gray-50">
        {[...Array(20)].map((_, i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 h-px bg-gray-200" style={{ top: `${i * 5}%` }} />
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={`v-${i}`} className="absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: `${i * 5}%` }} />
        ))}
      </div>
    </div>
  );
};

export default GridBackground;