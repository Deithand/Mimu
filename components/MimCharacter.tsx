
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const MimCharacter: React.FC = () => {
  const mimRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement[]>([]);
  // Fix: Initialize useRef with null to provide the required initial value.
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const mimElement = mimRef.current;
    if (!mimElement) return;

    gsap.set(mimElement, { scale: 1, y: 0 });

    // Floating animation
    timeline.current = gsap.timeline({ repeat: -1, yoyo: true })
      .to(mimElement, {
        y: -15,
        duration: 3,
        ease: 'sine.inOut'
      })
      .to(ringsRef.current, {
        scale: (i) => 1 - i * 0.02,
        duration: 3,
        ease: 'sine.inOut',
        stagger: 0.1,
      }, "<");

    return () => {
      timeline.current?.kill();
    }
  }, []);

  const handleMouseEnter = () => {
    gsap.to(mimRef.current, {
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out'
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(mimRef.current, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleClick = () => {
    // A more pronounced click animation with a "press down" and "pop out" effect.
    gsap.timeline()
      // 1. Press down: A quick, sharp inward scaling.
      .to(mimRef.current, { 
        scale: 0.9, 
        duration: 0.1, 
        ease: 'power2.in' 
      })
      // 2. Pop out: An elastic return to the hover state scale, creating an overshoot.
      .to(mimRef.current, { 
        scale: 1.05, 
        duration: 0.6, 
        ease: 'elastic.out(1.1, 0.4)' 
      });
  };

  return (
    <div
      ref={mimRef}
      className="w-52 h-52 md:w-64 md:h-64 flex items-center justify-center cursor-pointer select-none"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full">
        {Array.from({ length: 4 }).map((_, i) => (
           <div
              key={i}
              // Fix: Corrected ref callback to not return a value, resolving a type error.
              ref={el => { ringsRef.current[i] = el! }}
              className="absolute inset-0 rounded-full border border-nothing-border"
              style={{ 
                transform: `scale(${1 - i * 0.2})`,
                opacity: 1 - i * 0.2,
              }}
            />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="text-7xl md:text-9xl font-bold text-nothing-accent"
            style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.5)'}}
          >
            M
          </span>
        </div>
      </div>
    </div>
  );
};

export default MimCharacter;