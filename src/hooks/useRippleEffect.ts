import { useCallback } from 'react';

interface RippleOptions {
  color?: string;
  duration?: number;
  scale?: number;
}

export const useRippleEffect = (options: RippleOptions = {}) => {
  const {
    color = 'hsl(var(--primary))',
    duration = 800,
    scale = 2
  } = options;

  const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const existingRipples = element.querySelectorAll('.dynamic-ripple');
    existingRipples.forEach(ripple => ripple.remove());

    const ripple = document.createElement('span');
    ripple.className = 'dynamic-ripple';
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, ${color}40 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: dynamic-ripple ${duration}ms ease-out;
      pointer-events: none;
      z-index: 1000;
    `;


    if (!document.querySelector('#dynamic-ripple-keyframes')) {
      const style = document.createElement('style');
      style.id = 'dynamic-ripple-keyframes';
      style.textContent = `
        @keyframes dynamic-ripple {
          to {
            transform: scale(${scale});
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    element.appendChild(ripple);


    setTimeout(() => {
      ripple.remove();
    }, duration);
  }, [color, duration, scale]);

  return createRipple;
};