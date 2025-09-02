
import { Upgrade, Pet, Task, LeaderboardPlayer } from './types';

export const INITIAL_UPGRADES: Upgrade[] = [
  {
    id: 'tap_strength',
    name: 'Tap Strength',
    description: 'Increases MIMU per tap.',
    level: 0,
    type: 'click',
    cost: (level) => Math.floor(10 * Math.pow(1.15, level)),
    effect: (level) => level * 0.5,
  },
  {
    id: 'multi_tap',
    name: 'Multi-Tap Processor',
    description: 'Adds a flat bonus to your taps.',
    level: 0,
    type: 'click',
    cost: (level) => Math.floor(100 * Math.pow(1.2, level)),
    effect: (level) => level * 2,
  },
  {
    id: 'mim_bot_v1',
    name: 'Mim Bot v1',
    description: 'Generates MIMU automatically.',
    level: 0,
    type: 'auto',
    cost: (level) => Math.floor(25 * Math.pow(1.25, level)),
    effect: (level) => level * 0.2,
  },
  {
    id: 'mim_drone',
    name: 'Mim Drone Swarm',
    description: 'Drones that harvest MIMU for you.',
    level: 0,
    type: 'auto',
    cost: (level) => Math.floor(250 * Math.pow(1.3, level)),
    effect: (level) => level * 2.5,
  },
];

export const INITIAL_PETS: Pet[] = [
    {
        id: 'common_cat',
        name: 'Pixel Cat',
        description: 'Increases auto-generation by 5%.',
        rarity: 'Common',
        cost: 1000,
        multiplier: 1.05,
        owned: false,
        emoji: '🐱'
    },
    {
        id: 'rare_dog',
        name: 'Data Dog',
        description: 'Increases auto-generation by 15%.',
        rarity: 'Rare',
        cost: 10000,
        multiplier: 1.15,
        owned: false,
        emoji: '🐶'
    },
    {
        id: 'epic_fox',
        name: 'Glitch Fox',
        description: 'Increases auto-generation by 30%.',
        rarity: 'Epic',
        cost: 100000,
        multiplier: 1.30,
        owned: false,
        emoji: '🦊'
    },
    {
        id: 'legendary_dragon',
        name: 'Byte Dragon',
        description: 'Increases auto-generation by 100%. A true legend.',
        rarity: 'Legendary',
        cost: 1000000,
        multiplier: 2.00,
        owned: false,
        emoji: '🐲'
    }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'reach_1k',
    name: 'Novice Collector',
    description: 'Earn a total of 1,000 MIMU.',
    reward: 250,
    isCompleted: (state) => state.totalMimuEarned >= 1000,
    claimed: false,
  },
  {
    id: 'reach_10k',
    name: 'Skilled Tapper',
    description: 'Earn a total of 10,000 MIMU.',
    reward: 1000,
    isCompleted: (state) => state.totalMimuEarned >= 10000,
    claimed: false,
  },
  {
    id: 'buy_pet',
    name: 'First Companion',
    description: 'Acquire your first pet.',
    reward: 500,
    isCompleted: (state) => state.pets.some(p => p.owned),
    claimed: false,
  },
  {
    id: 'level_10_tap',
    name: 'Power Tapper',
    description: 'Upgrade Tap Strength to level 10.',
    reward: 750,
    isCompleted: (state) => {
        const upgrade = state.upgrades.find(u => u.id === 'tap_strength');
        return !!upgrade && upgrade.level >= 10;
    },
    claimed: false,
  },
];

export const LEADERBOARD_DATA: LeaderboardPlayer[] = [
    { rank: 1, name: 'Satoshi', score: 987654321 },
    { rank: 2, name: 'Vitalik', score: 876543210 },
    { rank: 3, name: 'Mim_Master', score: 765432109 },
    { rank: 4, name: 'ClickerGod', score: 654321098 },
    { rank: 5, name: 'TokenHoarder', score: 543210987 },
    { rank: 6, name: 'NFT_Whale', score: 432109876 },
    { rank: 7, name: 'DeFi_King', score: 321098765 },
    { rank: 8, name: 'PixelPusher', score: 210987654 },
    { rank: 9, name: 'CryptoCat', score: 109876543 },
    { rank: 10, name: 'You', score: 0 },
];
