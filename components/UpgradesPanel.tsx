
import React from 'react';
import { Upgrade } from '../types';
import { gsap } from 'gsap';

interface UpgradesPanelProps {
  upgrades: Upgrade[];
  balance: number;
  onBuy: (upgrade: Upgrade) => void;
}

const UpgradeItem: React.FC<{ upgrade: Upgrade; balance: number; onBuy: (upgrade: Upgrade) => void; }> = ({ upgrade, balance, onBuy }) => {
    const cost = upgrade.cost(upgrade.level);
    const canAfford = balance >= cost;
    const itemRef = React.useRef<HTMLDivElement>(null);

    const handleBuy = () => {
        if(canAfford) {
            onBuy(upgrade);
            gsap.fromTo(itemRef.current, {backgroundColor: 'rgba(255,255,255,0.1)'}, {backgroundColor: 'transparent', duration: 0.5});
        }
    };
    
    return (
        <div ref={itemRef} className="flex items-center justify-between p-3 transition-colors duration-300 hover:bg-nothing-border/50 rounded-lg">
            <div>
                <h4 className="font-bold text-nothing-accent">{upgrade.name} <span className="text-sm text-nothing-dim font-normal ml-2">Lv. {upgrade.level}</span></h4>
                <p className="text-xs text-nothing-dim mt-1">{upgrade.description}</p>
            </div>
            <button 
                onClick={handleBuy}
                disabled={!canAfford}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-all duration-300 min-w-[100px] border ${canAfford ? 'bg-nothing-accent text-nothing-base hover:bg-opacity-80 border-transparent' : 'bg-transparent text-nothing-dim border-nothing-border/50 cursor-not-allowed'}`}
            >
                {cost.toLocaleString()}
            </button>
        </div>
    );
};


const UpgradesPanel: React.FC<UpgradesPanelProps> = ({ upgrades, balance, onBuy }) => {
  return (
    <div className="h-48 bg-nothing-bg/70 backdrop-blur-xl p-2 overflow-y-auto border-t border-nothing-border">
      <div className="flex flex-col gap-1">
        {upgrades.map(upgrade => (
          <UpgradeItem key={upgrade.id} upgrade={upgrade} balance={balance} onBuy={onBuy} />
        ))}
      </div>
    </div>
  );
};

export default UpgradesPanel;