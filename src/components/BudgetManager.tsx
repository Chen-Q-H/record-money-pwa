import React from 'react';
import type { UserData, Budget } from '../types';
import { getCategoryExpenses } from '../utils';

interface BudgetManagerProps {
  userData: UserData;
  onUpdateBudget: (budget: Budget) => void;
}

const BudgetManager: React.FC<BudgetManagerProps> = ({ userData }) => {
  // 计算超支的预算数量
  const overBudgetCount = userData.budgets.filter(budget => 
    budget.amount > 0 && getCategoryExpenses(userData.expenses, budget.category) > budget.amount
  ).length;

  // 计算已设置预算的数量
  const setBudgetCount = userData.budgets.filter(budget => budget.amount > 0).length;

  return (
    <div className="budget-section">
      <div className="section-title">
        <span>预算概览</span>
        <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>
          点击下方按钮进行详细设置
        </span>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div style={{
          background: 'var(--cream)',
          borderRadius: '10px',
          padding: '15px',
          textAlign: 'center',
          borderLeft: '4px solid var(--primary-pink)'
        }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-dark)' }}>
            {setBudgetCount}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
            已设置预算
          </div>
        </div>
        
        <div style={{
          background: overBudgetCount > 0 ? '#FFE4E4' : 'var(--cream)',
          borderRadius: '10px',
          padding: '15px',
          textAlign: 'center',
          borderLeft: `4px solid ${overBudgetCount > 0 ? 'var(--danger)' : 'var(--primary-pink)'}`
        }}>
          <div style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: overBudgetCount > 0 ? 'var(--danger)' : 'var(--text-dark)' 
          }}>
            {overBudgetCount}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
            超支分类
          </div>
        </div>
      </div>
      
      {overBudgetCount > 0 && (
        <div style={{
          marginTop: '10px',
          padding: '10px',
          background: '#FFF0F0',
          borderRadius: '5px',
          fontSize: '12px',
          color: 'var(--danger)',
          textAlign: 'center'
        }}>
          ⚠️ 有{overBudgetCount}个分类超出预算
        </div>
      )}
    </div>
  );
};

export default BudgetManager;