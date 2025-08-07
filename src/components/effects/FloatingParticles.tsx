"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";

interface Particle {
  id: number;
  style: React.CSSProperties;
}

interface FloatingParticlesProps {
  count: number;
}

const FloatingParticles = React.memo<FloatingParticlesProps>(({ count }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const generateParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 18 + 6;
      const top = Math.random() * 100;
      const animationDuration = Math.random() * 15 + 10;
      const animationDelay = Math.random() * 15;
      const opacity = Math.random() * 0.3 + 0.15;
      const blur = Math.random() * 3.5 + 2.5;
      
      const isBurnt = Math.random() > 0.8;
      const backgroundColor = isBurnt ? 'rgba(255, 165, 0, 0.4)' : 'rgba(255, 255, 255, 0.3)';
      const boxShadow = isBurnt ? '0 0 6px 1px rgba(255, 165, 0, 0.2)' : '0 0 4px 1px rgba(255, 255, 255, 0.15)';

      const polygonPoints = Array.from({ length: 6 }, () => `${Math.random() * 100}% ${Math.random() * 100}%`).join(", ");
      const clipPath = `polygon(${polygonPoints})`;
      
      newParticles.push({
        id: i,
        style: {
          position: 'absolute',
          top: `${top}vh`,
          right: `-${size + 5}px`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor,
          boxShadow,
          opacity,
          filter: `blur(${blur}px)`,
          clipPath,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDelay}s`,
        },
      });
    }
    setParticles(newParticles);
  }, [count]);

  useEffect(() => {
    if (!isMounted) return;
    generateParticles();
  }, [isMounted, generateParticles, count]);

  const particleElements = useMemo(() => {
    return particles.map((particle) => (
      <div
        key={particle.id}
        className="animate-float"
        style={{
          ...particle.style,
          animation: `float ${particle.style.animationDuration} linear infinite`,
          animationDelay: `${particle.style.animationDelay}s`,
        }}
      />
    ));
  }, [particles]);

  if (!isMounted) {
    return (
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {particleElements}
    </div>
  );
});

FloatingParticles.displayName = "FloatingParticles";

export default FloatingParticles;
