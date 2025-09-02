
import React from 'react';
import { LeaderboardPlayer } from '../types';

interface LeaderboardPanelProps {
  players: LeaderboardPlayer[];
}

const LeaderboardPanel: React.FC<LeaderboardPanelProps> = ({ players }) => {
  return (
    <div className="h-48 bg-nothing-bg/70 backdrop-blur-xl p-2 overflow-y-auto border-t border-nothing-border">
      <table className="w-full text-left text-sm">
        <thead className="sticky top-0 bg-nothing-bg/80 backdrop-blur-xl">
          <tr className="text-nothing-dim uppercase tracking-wider text-xs border-b border-nothing-border">
            <th className="p-3">Rank</th>
            <th className="p-3">Name</th>
            <th className="p-3 text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.rank} className={`border-b border-nothing-border/50 ${player.name === 'You' ? 'text-nothing-accent font-bold' : ''}`}>
              <td className="p-3 font-bold w-1/4">{player.rank}</td>
              <td className="p-3 w-1/2">{player.name}</td>
              <td className="p-3 text-right font-mono w-1/4">{player.score.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPanel;