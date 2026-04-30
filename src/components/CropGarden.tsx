import React from 'react';
import type { Crop } from '../types';
import GrowingCrop from './GrowingCrop';

interface CropGardenProps {
  crops: Crop[];
  onSelectCrop?: (cropId: string) => void;
  selectedCropId?: string;
}

const CropGarden: React.FC<CropGardenProps> = ({ crops, onSelectCrop, selectedCropId }) => {
  return (
    <div className="crop-garden">
      <h3 className="garden-title">我的小菜园 🌱</h3>
      
      {(!crops || crops.length === 0) ? (
        <div className="empty-garden">
          <div className="empty-garden-icon">🏡</div>
          <div className="empty-garden-text">菜园空空的</div>
          <div className="empty-garden-subtext">去商店购买种子开始种植吧！</div>
        </div>
      ) : (
        <div className="crop-grid">
          {crops.map(crop => (
            <div 
              key={crop.id}
              className={`crop-item ${selectedCropId === crop.id ? 'selected' : ''}`}
              onClick={() => onSelectCrop?.(crop.id)}
            >
              <div className="crop-display-wrapper">
                <GrowingCrop crop={crop} size={48} showAnimation={true} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CropGarden;