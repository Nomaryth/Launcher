"use client";

import React from 'react';

interface DotGridProps {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  spacing?: number;
  opacity?: number;
}

const DotGrid: React.FC<DotGridProps> = ({ 
  className = "", 
  dotColor = "hsla(0, 0%, 98%, 0.15)", 
  dotSize = 1, 
  spacing = 15,
  opacity = 0.15
}) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const dotId = React.useId();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={`absolute inset-0 z-10 w-full h-full pointer-events-none ${className}`}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="placeholder-pattern" width={spacing} height={spacing} patternUnits="userSpaceOnUse">
              <circle cx={dotSize} cy={dotSize} r={dotSize} fill={dotColor} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#placeholder-pattern)" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 z-10 w-full h-full pointer-events-none ${className}`}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id={dotId} width={spacing} height={spacing} patternUnits="userSpaceOnUse">
            <circle cx={dotSize} cy={dotSize} r={dotSize} fill={dotColor} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${dotId})`} />
      </svg>
    </div>
  );
};

export default DotGrid;
