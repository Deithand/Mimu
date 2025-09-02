import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  // Fix: Changed useRef type from HTMLSpanElement to HTMLHeadingElement to match the ref being attached to an h2 element.
  const scoreRef = useRef<HTMLHeadingElement>(null);
  const tweenedScore = useRef({ value: 0 });

  useEffect(() => {
    gsap.to(tweenedScore.current, {
      value: score,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (scoreRef.current) {
          scoreRef.current.textContent = tweenedScore.current.value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 1
          });
        }
      }
    });
  }, [score]);

  return (
    <h2 className="text-5xl font-bold text-nothing-accent my-2" ref={scoreRef}>
      0
    </h2>
  );
};

export default ScoreDisplay;
