import React from 'react';
import type { UserData } from '../types';
import { getLevelName, calculateProgress } from '../utils';

interface StatusBarProps {
  userData: UserData;
}

const StatusBar: React.FC<StatusBarProps> = ({ userData }) => {
  const progress = calculateProgress(userData.totalPoints);
  
  return (
    <div className="status-bar">
      <div className="level-info">
        <div className="level-badge">
          {getLevelName(userData.level)}
        </div>
        <div className="points-display">
          {userData.totalPoints} 积分
        </div>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
        升级进度: {Math.round(progress)}%
      </div>
    </div>
  );
};

export default StatusBar;