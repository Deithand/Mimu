import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, Upgrade, Pet, Task } from './types';
import { GameView } from './types';
import { INITIAL_UPGRADES, INITIAL_PETS, INITIAL_TASKS, LEADERBOARD_DATA } from './constants';
import ScoreDisplay from './components/ScoreDisplay';
import MimCharacter from './components/MimCharacter';
import BottomNavBar from './components/BottomNavBar';
import UpgradesPanel from './components/UpgradesPanel';
import TasksPanel from './components/TasksPanel';
import PetsPanel from './components/PetsPanel';
import LeaderboardPanel from './components/LeaderboardPanel';
import AirdropModal from './components/AirdropModal';
import DotBackground from './components/DotBackground';
// Fix: Add missing 'gsap' import to resolve 'Cannot find name 'gsap'' error.
import { gsap } from 'gsap';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    mimuBalance: 0,
    mimuPerClick: 1,
    mimuPerSecond: 0,
    upgrades: INITIAL_UPGRADES,
    pets: INITIAL_PETS,
    tasks: INITIAL_TASKS,
    totalMimuEarned: 0,
  });
  const [activeView, setActiveView] = useState<GameView>(GameView.Upgrades);
  const [showAirdrop, setShowAirdrop] = useState(false);
  const clickContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const hasClaimedAirdrop = localStorage.getItem('mim_airdrop_claimed');
    if (!hasClaimedAirdrop) {
      setShowAirdrop(true);
    }
  }, []);

  const claimAirdrop = () => {
    setGameState(prev => ({ ...prev, mimuBalance: prev.mimuBalance + 500, totalMimuEarned: prev.totalMimuEarned + 500 }));
    localStorage.setItem('mim_airdrop_claimed', 'true');
    setShowAirdrop(false);
  };

  const calculateRates = useCallback(() => {
    let perClick = 1;
    let perSecond = 0;

    gameState.upgrades.forEach(upgrade => {
      if (upgrade.level > 0) {
        if (upgrade.type === 'click') {
          perClick += upgrade.effect(upgrade.level);
        } else if (upgrade.type === 'auto') {
          perSecond += upgrade.effect(upgrade.level);
        }
      }
    });
    
    gameState.pets.forEach(pet => {
      if(pet.owned) {
          perSecond *= pet.multiplier;
      }
    });

    setGameState(prev => ({
      ...prev,
      mimuPerClick: parseFloat(perClick.toFixed(2)),
      mimuPerSecond: parseFloat(perSecond.toFixed(2)),
    }));
  }, [gameState.upgrades, gameState.pets]);

  useEffect(() => {
    calculateRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.upgrades, gameState.pets]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        mimuBalance: prev.mimuBalance + prev.mimuPerSecond / 10,
        totalMimuEarned: prev.totalMimuEarned + prev.mimuPerSecond / 10,
      }));
    }, 100);
    return () => clearInterval(gameLoop);
  }, [gameState.mimuPerSecond]);

  const handleMimClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setGameState(prev => ({
      ...prev,
      mimuBalance: prev.mimuBalance + prev.mimuPerClick,
      totalMimuEarned: prev.totalMimuEarned + prev.mimuPerClick,
    }));
    showFloatingMimu(e.clientX, e.clientY);
  };

  const showFloatingMimu = (x: number, y: number) => {
    if (!clickContainerRef.current) return;
    
    const containerRect = clickContainerRef.current.getBoundingClientRect();
    const plusOne = document.createElement('div');
    plusOne.textContent = `+${gameState.mimuPerClick.toFixed(1)}`;
    plusOne.className = 'absolute text-nothing-accent text-2xl font-bold pointer-events-none select-none drop-shadow-lg';
    plusOne.style.left = `${x - containerRect.left}px`;
    plusOne.style.top = `${y - containerRect.top}px`;
    
    clickContainerRef.current.appendChild(plusOne);

    gsap.to(plusOne, {
      y: -120,
      opacity: 0,
      scale: 1.5,
      duration: 1.8,
      ease: 'power3.out',
      onComplete: () => {
        plusOne.remove();
      }
    });
  };

  const buyUpgrade = (upgrade: Upgrade) => {
    const cost = upgrade.cost(upgrade.level);
    if (gameState.mimuBalance >= cost) {
      setGameState(prev => ({
        ...prev,
        mimuBalance: prev.mimuBalance - cost,
        upgrades: prev.upgrades.map(u => 
          u.id === upgrade.id ? { ...u, level: u.level + 1 } : u
        ),
      }));
    }
  };
  
  const buyPet = (pet: Pet) => {
     if (gameState.mimuBalance >= pet.cost && !pet.owned) {
        setGameState(prev => ({
            ...prev,
            mimuBalance: prev.mimuBalance - pet.cost,
            pets: prev.pets.map(p => p.id === pet.id ? { ...p, owned: true } : p)
        }));
     }
  };

  const claimTask = (task: Task) => {
    if (task.isCompleted(gameState) && !task.claimed) {
      setGameState(prev => ({
        ...prev,
        mimuBalance: prev.mimuBalance + task.reward,
        totalMimuEarned: prev.totalMimuEarned + task.reward,
        tasks: prev.tasks.map(t => t.id === task.id ? { ...t, claimed: true } : t)
      }));
    }
  };

  const renderActiveView = () => {
    switch (activeView) {
      case GameView.Upgrades:
        return <UpgradesPanel upgrades={gameState.upgrades} balance={gameState.mimuBalance} onBuy={buyUpgrade} />;
      case GameView.Pets:
        return <PetsPanel pets={gameState.pets} balance={gameState.mimuBalance} onBuy={buyPet} />;
      case GameView.Tasks:
        return <TasksPanel tasks={gameState.tasks} gameState={gameState} onClaim={claimTask} />;
      case GameView.Leaderboard:
        return <LeaderboardPanel players={LEADERBOARD_DATA} />;
      default:
        return <UpgradesPanel upgrades={gameState.upgrades} balance={gameState.mimuBalance} onBuy={buyUpgrade} />;
    }
  };

  return (
    <>
      <DotBackground />
      <div className="relative flex flex-col h-[calc(100vh-2rem)] my-4 w-full max-w-md mx-auto text-nothing-text bg-nothing-base/50 border border-nothing-border rounded-3xl shadow-2xl shadow-black/50 overflow-hidden">
        {showAirdrop && <AirdropModal onClaim={claimAirdrop} />}
        <div className="flex-shrink-0 pt-8 pb-4 px-6 flex flex-col items-center">
          <h1 className="text-lg font-bold text-nothing-dim tracking-widest">MIMU</h1>
          <ScoreDisplay score={gameState.mimuBalance} />
          <div className="w-full flex justify-between text-xs mt-2 text-nothing-dim uppercase tracking-wider">
              <span>Click: +{gameState.mimuPerClick.toFixed(1)}</span>
              <span>Sec: +{gameState.mimuPerSecond.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex-grow flex items-center justify-center relative" ref={clickContainerRef} onClick={handleMimClick}>
          <MimCharacter />
        </div>

        <div className="flex-shrink-0">
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {renderActiveView()}
          </div>
          <BottomNavBar activeView={activeView} setActiveView={setActiveView} />
        </div>
      </div>
    </>
  );
};

export default App;