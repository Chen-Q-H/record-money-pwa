import React, { useState, useEffect, useRef } from 'react';
import type { Crop } from '../types';
import CropSvg from './CropSvg';

interface GrowingCropProps {
  crop: Crop;
  size?: number;
  showAnimation?: boolean;
  className?: string;
}

const GrowingCrop: React.FC<GrowingCropProps> = ({ 
  crop, 
  size = 40, 
  showAnimation = true,
  className = '' 
}) => {
  const [isGrowing, setIsGrowing] = useState(false);
  const previousStageRef = useRef(crop.stage);

  // 检测阶段变化，触发生长动画
  useEffect(() => {
    if (showAnimation && crop.stage !== previousStageRef.current) {
      const stageDiff = Math.abs(crop.stage - previousStageRef.current);
      const animationDuration = stageDiff === 2 ? 1200 : 800;
      
      setIsGrowing(true);
      previousStageRef.current = crop.stage;
      
      const timer = setTimeout(() => {
        setIsGrowing(false);
      }, animationDuration);
      
      return () => clearTimeout(timer);
    }
  }, [crop.stage, showAnimation]);

  const getCropName = (type: string) => {
    const names = {
      carrot: '胡萝卜',
      tomato: '番茄',
      corn: '玉米'
    };
    return names[type as keyof typeof names] || '作物';
  };

  const getProgressText = (crop: Crop) => {
    if (crop.stage === 3) return '已成熟';
    return `${crop.currentExpenses}/${crop.targetExpenses}次记账`;
  };

  return (
    <div className={`growing-crop-container ${className}`}>
      <div className={`crop-display ${isGrowing ? 'growing-crop' : ''}`}>
        <CropSvg 
          type={crop.type}
          stage={crop.stage}
          size={size}
          className={`stage-${crop.stage}`}
        />
      </div>
      
      {/* 作物信息 */}
      <div className="crop-info-mini">
        <div className="crop-name-mini">{getCropName(crop.type)}</div>
        <div className="crop-progress-mini">{getProgressText(crop)}</div>
        
        {/* 生长进度条 */}
        <div className="growth-progress-bar">
          <div 
            className="growth-progress-fill"
            style={{ width: `${crop.growthProgress}%` }}
          />
        </div>
        
        {/* 阶段指示器 */}
        <div className="stage-indicator-mini">
          {[1, 2, 3].map(stage => (
            <div 
              key={stage}
              className={`stage-dot-mini ${crop.stage >= stage ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrowingCrop;