import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const DotBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | undefined>(undefined);
  
  type Dot = {
    x: number;
    y: number;
    originalRadius: number;
    radius: number;
    originalOpacity: number;
    opacity: number;
    isActive: boolean;
    tween?: gsap.core.Tween;
    // Fix: Changed the type of 'decayTimeout' from 'gsap.core.DelayedCall' to 'gsap.core.Tween' because gsap.delayedCall returns a Tween instance.
    decayTimeout?: gsap.core.Tween;
  };
  
  const dots = useRef<Dot[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DECAY_RADIUS = 0.4;
    const DECAY_OPACITY = 0.15;
    const DECAY_DELAY_SECONDS = 2;
    const DECAY_DURATION_SECONDS = 4;

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      dots.current.forEach(dot => {
        dot.tween?.kill();
        dot.decayTimeout?.kill();
      });
      dots.current = [];
      const GRID_GAP = 40;
      for (let x = GRID_GAP / 2; x < rect.width; x += GRID_GAP) {
        for (let y = GRID_GAP / 2; y < rect.height; y += GRID_GAP) {
          dots.current.push({
            x: x,
            y: y,
            originalRadius: 0.8,
            radius: 0.8,
            originalOpacity: 0.3,
            opacity: 0.3,
            isActive: false
          });
        }
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };
    
    const animate = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const INTERACTION_RADIUS = 150;
      const MAX_RADIUS = 4;
      const MAX_OPACITY = 0.8;

      dots.current.forEach(dot => {
        const dx = mouse.current.x - dot.x;
        const dy = mouse.current.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < INTERACTION_RADIUS && !dot.isActive) {
          dot.isActive = true;
          dot.decayTimeout?.kill();
          dot.tween?.kill();
          
          dot.tween = gsap.to(dot, {
            radius: MAX_RADIUS,
            opacity: MAX_OPACITY,
            duration: 0.4,
            ease: 'power2.out',
          });
        } 
        else if (dist >= INTERACTION_RADIUS && dot.isActive) {
          dot.isActive = false;
          dot.tween?.kill();

          dot.tween = gsap.to(dot, {
            radius: dot.originalRadius,
            opacity: dot.originalOpacity,
            duration: 0.6,
            ease: 'power2.out',
          });
          
          dot.decayTimeout = gsap.delayedCall(DECAY_DELAY_SECONDS, () => {
            dot.tween = gsap.to(dot, {
              radius: DECAY_RADIUS,
              opacity: DECAY_OPACITY,
              duration: DECAY_DURATION_SECONDS,
              ease: 'power2.inOut'
            });
          });
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    setup();
    animate();

    window.addEventListener('resize', setup);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', setup);
      window.removeEventListener('mousemove', handleMouseMove);
      dots.current.forEach(dot => {
        dot.tween?.kill();
        dot.decayTimeout?.kill();
      });
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" />;
};

export default DotBackground;
