
import React from 'react';

interface AirdropModalProps {
    onClaim: () => void;
}

const AirdropModal: React.FC<AirdropModalProps> = ({ onClaim }) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-nothing-bg/70 backdrop-blur-xl border border-nothing-border rounded-2xl p-8 m-4 text-center animate-slide-up shadow-2xl shadow-black/50">
                <h2 className="text-2xl font-bold text-nothing-accent mb-2 tracking-wider">WELCOME AIRDROP</h2>
                <p className="text-nothing-dim mb-6">A little something to get you started.</p>
                <p className="text-5xl font-bold text-white my-6 drop-shadow-lg">500 MIMU</p>
                <button 
                    onClick={onClaim}
                    className="w-full px-6 py-3 text-md font-bold rounded-lg transition-colors duration-300 bg-nothing-accent text-nothing-base hover:bg-opacity-80"
                >
                    Claim
                </button>
            </div>
        </div>
    );
};

export default AirdropModal;