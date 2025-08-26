import React, { useState, useEffect } from 'react';

interface TimerProps {
  gameState: string;
}

const Timer: React.FC<TimerProps> = ({ gameState }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(0);

  // Timer durations (match your server constants)
  const getTimerDuration = (state: string): number => {
    switch (state) {
      case 'BETTING': return 10000; 
      case 'DEALING': return 5000;  
      case 'ACTING': return 10000;  
      case 'REVEALING': return 5000;
      default: return 0;
    }
  };

  const getPhaseDisplay = (phase: string): string => {
    switch (phase) {
      case 'BETTING': return '💰 Betting Time';
      case 'DEALING': return '🃏 Dealing Cards';
      case 'ACTING': return '🎯 Player Turn';
      case 'REVEALING': return '🎊 Revealing Results';
      default: return phase;
    }
  };

  // Start timer when game state changes
  useEffect(() => {
    const duration = getTimerDuration(gameState);
    
    if (duration > 0) {
      const now = Date.now();
      setStartTime(now);
      setTimeRemaining(duration);
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [gameState]);

  // Update timer every 100ms
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, getTimerDuration(gameState) - elapsed);
      
      setTimeRemaining(remaining);
      
      if (remaining <= 0) {
        setIsActive(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, startTime, gameState]);

  const seconds = Math.ceil(timeRemaining / 1000);
  const totalSeconds = Math.ceil(getTimerDuration(gameState) / 1000);
  const percentage = totalSeconds > 0 ? (timeRemaining / getTimerDuration(gameState)) * 100 : 0;

  const getTimerColor = (percentage: number): string => {
    if (percentage > 60) return 'from-green-500 to-emerald-500';
    if (percentage > 30) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  // Don't show timer for WAITING state or when inactive
  if (!isActive || timeRemaining <= 0 || gameState === 'WAITING') return null;

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Phase Label */}
      <div className="text-white font-medium text-xs">
        {getPhaseDisplay(gameState)}
      </div>
      
      {/* Circular Timer Only */}
      <div className="relative w-8 h-8">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          {/* Background circle */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="3"
          />
          {/* Progress circle */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${percentage} 100`}
            className="transition-all duration-300 ease-out"
            style={{
              stroke: percentage > 60 ? '#10b981' : percentage > 30 ? '#f59e0b' : '#ef4444'
            }}
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-xs">
            {seconds}
          </span>
        </div>
      </div>
      
      {/* Urgency indicator */}
      {/* {seconds <= 3 && seconds > 0 && (
        <div className="text-red-400 font-bold text-xs animate-pulse">
          ⚠️
        </div>
      )} */}
    </div>
  );
};

export default Timer;