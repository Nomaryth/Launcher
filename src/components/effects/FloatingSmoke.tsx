"use client";

import React, { useEffect, useRef, useState } from "react";

const FloatingSmoke = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    const particleCount = 8;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
        x: number = 0;
        y: number = 0;
        width: number = 0;
        height: number = 0;
        vx: number = 0;
        vy: number = 0;
        alpha: number = 0;
        life: number = 0;
        maxLife: number = 0;

        constructor() {
            if (!canvas) return;
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 300;
            this.width = Math.random() * 150 + 200;
            this.height = this.width * (Math.random() * 0.2 + 0.3);
            this.vx = Math.random() * 0.4 - 0.2; 
            this.vy = -Math.random() * 0.2 - 0.1;
            this.alpha = 0;
            this.life = 0;
            this.maxLife = 1000 + Math.random() * 800;
        }

        draw(context: CanvasRenderingContext2D) {
            context.save();
            context.globalAlpha = this.alpha * 0.4;
            context.fillStyle = 'white';
            context.filter = 'blur(12px)'; 
            
            const borderRadius = this.height / 2;
            context.beginPath();
            context.moveTo(this.x + borderRadius, this.y);
            context.lineTo(this.x + this.width - borderRadius, this.y);
            context.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + borderRadius);
            context.lineTo(this.x + this.width, this.y + this.height - borderRadius);
            context.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - borderRadius, this.y + this.height);
            context.lineTo(this.x + borderRadius, this.y + this.height);
            context.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - borderRadius);
            context.lineTo(this.x, this.y + borderRadius);
            context.quadraticCurveTo(this.x, this.y, this.x + borderRadius, this.y);
            context.closePath();
            context.fill();

            context.restore();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            this.life++;

            if (this.life < this.maxLife / 2) {
                this.alpha = (this.life / (this.maxLife / 2)) * 0.4;
            } else {
                this.alpha = (1 - (this.life - this.maxLife / 2) / (this.maxLife / 2)) * 0.4;
            }

            if (!canvas) return;
            if (this.life >= this.maxLife || this.y < -this.height || this.x < -this.width || this.x > canvas.width + this.width) {
                this.reset();
            }
        }
        
        reset() {
            if (!canvas) return;
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.width = Math.random() * 150 + 200;
            this.height = this.width * (Math.random() * 0.2 + 0.3);
            this.vx = Math.random() * 0.4 - 0.2; 
            this.vy = -Math.random() * 0.2 - 0.1;
            this.alpha = 0;
            this.life = 0;
            this.maxLife = 1000 + Math.random() * 800;
        }
    }

    const init = () => {
        resizeCanvas();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    };
    
    const animate = () => {
        if(ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });
        }
        animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();
    
    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMounted]);

  if (!isMounted) {
    return <canvas className="absolute top-0 left-0 w-full h-full z-1 pointer-events-none" />;
  }

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-1 pointer-events-none" />;
};

export default FloatingSmoke;
