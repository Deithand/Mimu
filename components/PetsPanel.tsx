
import React from 'react';
import { Pet } from '../types';
import { gsap } from 'gsap';

interface PetsPanelProps {
  pets: Pet[];
  balance: number;
  onBuy: (pet: Pet) => void;
}

const getRarityColor = (rarity: Pet['rarity']) => {
    switch (rarity) {
        case 'Common': return 'text-gray-300';
        case 'Rare': return 'text-blue-400';
        case 'Epic': return 'text-purple-400';
        case 'Legendary': return 'text-yellow-400';
        default: return 'text-gray-300';
    }
}

const PetItem: React.FC<{ pet: Pet, balance: number, onBuy: (pet: Pet) => void }> = ({ pet, balance, onBuy }) => {
    const canAfford = balance >= pet.cost;
    const itemRef = React.useRef<HTMLDivElement>(null);
    
    const handleBuy = () => {
        if(canAfford && !pet.owned) {
            onBuy(pet);
            gsap.fromTo(itemRef.current, {scale: 0.98, opacity: 0.8}, {scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out'});
        }
    };
    
    return (
        <div ref={itemRef} className={`flex items-center justify-between p-3 transition-colors duration-300 rounded-lg ${pet.owned ? 'opacity-50' : 'hover:bg-nothing-border/50'}`}>
            <div className="flex items-center space-x-4">
                <span className="text-4xl">{pet.emoji}</span>
                <div>
                    <h4 className={`font-bold text-nothing-accent`}>{pet.name}</h4>
                    <p className={`text-xs font-bold tracking-wider uppercase ${getRarityColor(pet.rarity)}`}>{pet.rarity}</p>
                    <p className="text-xs text-nothing-dim mt-1">{pet.description}</p>
                </div>
            </div>
            <button 
                onClick={handleBuy}
                disabled={!canAfford || pet.owned}
                 className={`px-4 py-2 text-xs font-bold rounded-md transition-all duration-300 min-w-[100px] border ${pet.owned ? 'bg-transparent text-nothing-dim border-nothing-border/50' : canAfford ? 'bg-nothing-accent text-nothing-base hover:bg-opacity-80 border-transparent' : 'bg-transparent text-nothing-dim border-nothing-border/50 cursor-not-allowed'}`}
            >
                {pet.owned ? 'Owned' : pet.cost.toLocaleString()}
            </button>
        </div>
    );
};

const PetsPanel: React.FC<PetsPanelProps> = ({ pets, balance, onBuy }) => {
  return (
    <div className="h-48 bg-nothing-bg/70 backdrop-blur-xl p-2 overflow-y-auto border-t border-nothing-border">
      <div className="flex flex-col gap-1">
        {pets.map(pet => (
          <PetItem key={pet.id} pet={pet} balance={balance} onBuy={onBuy} />
        ))}
      </div>
    </div>
  );
};

export default PetsPanel;