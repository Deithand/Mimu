
import React from 'react';
import { GameView } from '../types';
import { gsap } from 'gsap';

interface BottomNavBarProps {
  activeView: GameView;
  setActiveView: (view: GameView) => void;
}

interface NavButtonProps {
    view: GameView;
    label: string;
    activeView: GameView;
    onClick: (view: GameView) => void;
}

const NavButton: React.FC<NavButtonProps> = ({ view, label, activeView, onClick }) => {
    const isActive = activeView === view;
    const indicatorRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        gsap.to(indicatorRef.current, {
            scale: isActive ? 1 : 0,
            opacity: isActive ? 1 : 0,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
    }, [isActive]);

    return (
        <button 
            onClick={() => onClick(view)}
            className={`relative flex-1 py-4 text-sm font-medium transition-colors duration-300 ${isActive ? 'text-nothing-accent' : 'text-nothing-dim hover:text-nothing-accent'}`}
        >
            {label}
             <div ref={indicatorRef} className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-nothing-accent rounded-full" />
        </button>
    );
};

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, setActiveView }) => {
  const views: GameView[] = [GameView.Upgrades, GameView.Pets, GameView.Tasks, GameView.Leaderboard];

  return (
    <div className="flex bg-nothing-bg/70 backdrop-blur-xl border-t border-nothing-border">
      {views.map(view => (
          <NavButton 
            key={view}
            view={view}
            label={view}
            activeView={activeView}
            onClick={setActiveView}
          />
      ))}
    </div>
  );
};

export default BottomNavBar;