import React, { useState } from 'react';
import type { ExpenseCategory } from '../types';

interface RecordFormProps {
  onAddExpense: (amount: number, category: ExpenseCategory) => void;
}

const RecordForm: React.FC<RecordFormProps> = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('餐饮');

  const categories: ExpenseCategory[] = ['餐饮', '购物', '交通', '娱乐'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    if (amountNum > 0) {
      onAddExpense(amountNum, category);
      setAmount('');
      setCategory('餐饮');
    }
  };

  return (
    <div className="record-form">
      <h3 className="form-title">快速记账</h3>
      <form onSubmit={handleSubmit}>
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
            required
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
        
        <button type="submit" className="submit-btn">
          记一笔
        </button>
      </form>
    </div>
  );
};

export default RecordForm;