import React, { useState } from 'react';
import type { UserData, Budget, ExpenseCategory } from '../types';
import { getCategoryExpenses, isBudgetExceeded } from '../utils';

interface BudgetModalProps {
  userData: UserData;
  onUpdateBudget: (budget: Budget) => void;
  onClose: () => void;
}

const BudgetModal: React.FC<BudgetModalProps> = ({ userData, onUpdateBudget, onClose }) => {
  const categories: ExpenseCategory[] = ['餐饮', '购物', '交通', '娱乐'];

  const getBudgetForCategory = (category: ExpenseCategory): Budget => {
    return userData.budgets.find(b => b.category === category) || { category, amount: 0 };
  };

  const getCategoryExpense = (category: ExpenseCategory): number => {
    return getCategoryExpenses(userData.expenses, category);
  };

  const handleBudgetChange = (category: ExpenseCategory, amount: string) => {
    const budgetAmount = amount ? parseFloat(amount) : 0;
    if (!isNaN(budgetAmount) && budgetAmount >= 0) {
      onUpdateBudget({ category, amount: budgetAmount });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px' 
        }}>
          <h3 style={{ margin: 0 }}>预算管理</h3>
          <button 
            onClick={onClose}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '20px', 
              cursor: 'pointer',
              color: 'var(--text-light)'
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ 
            fontSize: '14px', 
            color: 'var(--text-light)',
            marginBottom: '15px' 
          }}>
            为每个消费分类设置月度预算金额
          </p>
        </div>

        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {categories.map((category) => {
            const budget = getBudgetForCategory(category);
            const expense = getCategoryExpense(category);
            const percentage = budget.amount > 0 ? (expense / budget.amount) * 100 : 0;
            const isOverBudget = isBudgetExceeded(userData.expenses, budget);

            return (
              <div key={category} style={{
                border: '2px solid var(--light-pink)',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '15px',
                background: isOverBudget ? '#FFE4E4' : 'white',
                borderLeft: `4px solid ${isOverBudget ? 'var(--danger)' : 'var(--primary-pink)'}`
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <div>
                    <div style={{ 
                      fontSize: '16px', 
                      fontWeight: 'bold',
                      color: 'var(--text-dark)' 
                    }}>
                      {category}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: 'var(--text-light)' 
                    }}>
                      本月支出: ¥{expense.toFixed(2)}
                    </div>
                  </div>
                  {isOverBudget && (
                    <span style={{ 
                      background: 'var(--danger)', 
                      color: 'white', 
                      padding: '2px 8px', 
                      borderRadius: '10px',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}>
                      超支
                    </span>
                  )}
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: 'var(--text-light)',
                    marginBottom: '5px'
                  }}>
                    <span>预算进度</span>
                    <span>{Math.round(percentage)}%</span>
                  </div>
                  <div style={{
                    height: '6px',
                    background: 'var(--light-pink)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      background: isOverBudget ? 'var(--danger)' : 'var(--primary-pink)',
                      borderRadius: '3px',
                      width: `${Math.min(percentage, 100)}%`,
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label style={{ 
                    fontSize: '12px', 
                    color: 'var(--text-light)',
                    whiteSpace: 'nowrap'
                  }}>
                    预算金额:
                  </label>
                  <input
                    type="number"
                    value={budget.amount || ''}
                    onChange={(e) => handleBudgetChange(category, e.target.value)}
                    placeholder="0"
                    min="0"
                    step="1"
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: '2px solid var(--light-pink)',
                      borderRadius: '5px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  <span style={{ 
                    fontSize: '12px', 
                    color: 'var(--text-light)' 
                  }}>
                    元/月
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: 'var(--cream)', 
          borderRadius: '10px',
          fontSize: '12px',
          color: 'var(--text-light)'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>使用说明:</div>
          <div>• 设置预算后，当支出超过预算时会收到提醒</div>
          <div>• 预算金额为0表示不设置预算限制</div>
          <div>• 预算按月计算，每月1日自动重置</div>
        </div>
      </div>
    </div>
  );
};

export default BudgetModal;