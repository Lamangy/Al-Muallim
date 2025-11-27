import { UserProgress } from '../types';

const STORAGE_KEY = 'al-muallim-progress-v1';

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedUnits: []
};

export const getUserProgress = (): UserProgress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return DEFAULT_PROGRESS;
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_PROGRESS;
  }
};

export const saveProgress = (progress: UserProgress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const getLevelInfo = (xp: number) => {
  // Level 1: 0-99 XP
  // Level 2: 100-399 XP
  // Level formula: simple progressive curve
  const level = Math.floor(Math.sqrt(xp / 50)) + 1;
  const nextLevelXp = Math.pow(level, 2) * 50;
  const currentLevelXp = Math.pow(level - 1, 2) * 50;
  const progress = Math.min(1, Math.max(0, (xp - currentLevelXp) / (nextLevelXp - currentLevelXp)));
  
  return { level, nextLevelXp, currentLevelXp, progress };
};

export const checkStreak = (): UserProgress => {
  const progress = getUserProgress();
  const today = new Date().toISOString().split('T')[0];
  const lastActive = new Date(progress.lastActiveDate);
  const current = new Date(today);
  
  // Calculate difference in days
  const diffTime = Math.abs(current.getTime() - lastActive.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  if (diffDays > 1) {
    progress.streak = 0;
    saveProgress(progress);
  }
  
  return progress;
};

export const addXP = (amount: number): UserProgress => {
  const progress = getUserProgress();
  progress.xp += amount;
  
  // Check streak on any activity
  const today = new Date().toISOString().split('T')[0];
  if (progress.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (progress.lastActiveDate === yesterday) {
          progress.streak += 1;
      } else {
          progress.streak = 1;
      }
      progress.lastActiveDate = today;
  }
  
  saveProgress(progress);
  return progress;
};

export const completeUnit = (unitId: string): UserProgress => {
  const progress = getUserProgress();
  if (!progress.completedUnits.includes(unitId)) {
    progress.completedUnits.push(unitId);
    progress.xp += 50; // Bonus for first completion
    saveProgress(progress);
  }
  return progress;
};