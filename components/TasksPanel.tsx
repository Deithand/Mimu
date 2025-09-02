
import React from 'react';
import { Task, GameState } from '../types';

interface TasksPanelProps {
  tasks: Task[];
  gameState: GameState;
  onClaim: (task: Task) => void;
}

const TaskItem: React.FC<{ task: Task; gameState: GameState; onClaim: (task: Task) => void }> = ({ task, gameState, onClaim }) => {
    const isCompleted = task.isCompleted(gameState);
    const canClaim = isCompleted && !task.claimed;
    
    return (
        <div className={`flex items-center justify-between p-3 transition-opacity duration-300 rounded-lg ${task.claimed ? 'opacity-40' : 'hover:bg-nothing-border/50'}`}>
            <div>
                <h4 className={`font-bold ${task.claimed ? 'text-nothing-dim line-through' : 'text-nothing-accent'}`}>{task.name}</h4>
                <p className="text-xs text-nothing-dim mt-1">{task.description}</p>
                <p className="text-xs font-bold text-green-400 mt-1">Reward: {task.reward.toLocaleString()} MIMU</p>
            </div>
            <button 
                onClick={() => onClaim(task)}
                disabled={!canClaim}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-all duration-300 min-w-[100px] border ${canClaim ? 'bg-green-500 text-nothing-base hover:bg-green-400 border-transparent' : task.claimed ? 'bg-transparent text-nothing-dim border-nothing-border/50' : 'bg-transparent text-nothing-dim border-nothing-border/50 cursor-not-allowed'}`}
            >
                {task.claimed ? 'Claimed' : canClaim ? 'Claim' : 'Locked'}
            </button>
        </div>
    );
};

const TasksPanel: React.FC<TasksPanelProps> = ({ tasks, gameState, onClaim }) => {
  return (
    <div className="h-48 bg-nothing-bg/70 backdrop-blur-xl p-2 overflow-y-auto border-t border-nothing-border">
      <div className="flex flex-col gap-1">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} gameState={gameState} onClaim={onClaim} />
        ))}
      </div>
    </div>
  );
};

export default TasksPanel;