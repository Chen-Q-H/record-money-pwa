import React, { useState } from 'react';
import type { ExpenseCategory, ExpenseRecord, Crop } from '../types';
import CropSvg from './CropSvg';

interface RecordFormProps {
  onAddExpense: (expense: ExpenseRecord) => void;
  crops: Crop[];
}

const RecordForm: React.FC<RecordFormProps> = ({ onAddExpense, crops }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('餐饮');
  const [description, setDescription] = useState('');
  const [selectedCropId, setSelectedCropId] = useState<string>('');

  const categories: ExpenseCategory[] = ['餐饮', '购物', '交通', '娱乐'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    if (amountNum > 0) {
      const newExpense: ExpenseRecord = {
        id: Date.now().toString(),
        amount: amountNum,
        category: category,
        date: new Date().toISOString().split('T')[0],
        description: description.trim() || undefined,
        appliedCropId: selectedCropId || undefined
      };
      onAddExpense(newExpense);
      setAmount('');
      setCategory('餐饮');
      setDescription('');
      setSelectedCropId('');
    }
  };

  return (
    <div className="record-form">
      <h3 className="form-title">快速记账</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="input-group">
          <label htmlFor="amount">消费金额 (元)</label>
          <input
            id="amount"
            type="number"
            className="amount-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>
        
        <div className="input-group">
          <label>消费分类</label>
          <div className="category-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-btn ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="input-group">
          <label htmlFor="description">备注（可选）</label>
          <input
            id="description"
            type="text"
            className="description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="例如：午餐、购物、交通费等"
            maxLength={50}
          />
        </div>
        
        {crops && crops.length > 0 && (
          <div className="input-group">
            <label>应用到作物（可选）</label>
            <div className="crop-selection">
              {crops.map(crop => {
                const cropConfig = {
                  carrot: { emoji: '🥕', name: '胡萝卜' },
                  tomato: { emoji: '🍅', name: '番茄' },
                  corn: { emoji: '🌽', name: '玉米' }
                };
                const config = cropConfig[crop.type as keyof typeof cropConfig];
                const stages = ['🌱', '🌿', '🌻'];
                
                return (
                   <button
                     key={crop.id}
                     type="button"
                     className={`crop-select-btn ${selectedCropId === crop.id ? 'selected' : ''}`}
                     onClick={() => setSelectedCropId(crop.id === selectedCropId ? '' : crop.id)}
                   >
                     <CropSvg 
                       type={crop.type}
                       stage={crop.stage}
                       size={32}
                       className="crop-svg-select"
                     />
                     <div className="crop-info-select">
                       <span className="crop-name-small">{config.name}</span>
                       <span className="crop-stage-indicator">
                         {stages.map((icon, index) => (
                           <span key={index} className={`stage-dot ${crop.stage > index ? 'active' : ''}`}>
                             {icon}
                           </span>
                         ))}
                       </span>
                     </div>
                   </button>
                 );
              })}
            </div>
          </div>
        )}
        
        <button type="submit" className="submit-btn">
          记一笔
        </button>
      </form>
    </div>
  );
};

export default RecordForm;