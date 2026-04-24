import React from 'react';
import type { UserData, Budget, ExpenseCategory } from '../types';
import { getCategoryExpenses, isBudgetExceeded } from '../utils';

interface BudgetPageProps {
  userData: UserData;
  onUpdateBudget: (budget: Budget) => void;
  onNavigate: (page: string) => void;
}

const BudgetPage: React.FC<BudgetPageProps> = ({ userData, onUpdateBudget, onNavigate }) => {
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
    <div className="app">
      {/* 页面标题和返回按钮 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        padding: '15px',
        background: 'var(--primary-pink)',
        borderRadius: '20px',
        color: 'white'
      }}>
        <button 
          onClick={() => onNavigate('home')}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '5px 10px'
          }}
        >
          ←
        </button>
        <h3 style={{ margin: 0, fontSize: '18px' }}>预算管理</h3>
        <div style={{ width: '40px' }}></div> {/* 占位保持对称 */}
      </div>

      {/* 页面内容 */}
      <div style={{ marginBottom: '20px' }}>
        <p style={{ 
          fontSize: '14px', 
          color: 'var(--text-light)',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          为每个消费分类设置月度预算金额
        </p>
      </div>

      <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
        {categories.map((category) => {
          const budget = getBudgetForCategory(category);
          const expense = getCategoryExpense(category);
          const percentage = budget.amount > 0 ? (expense / budget.amount) * 100 : 0;
          const isOverBudget = isBudgetExceeded(userData.expenses, budget);

          return (
            <div key={category} style={{
              border: '2px solid var(--light-pink)',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '15px',
              background: isOverBudget ? '#FFE4E4' : 'white',
              borderLeft: `6px solid ${isOverBudget ? 'var(--danger)' : 'var(--primary-pink)'}`
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <div>
                  <div style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold',
                    color: 'var(--text-dark)' 
                  }}>
                    {category}
                  </div>
                  <div style={{ 
                    fontSize: '14px', 
                    color: 'var(--text-light)' 
                  }}>
                    本月支出: ¥{expense.toFixed(2)}
                  </div>
                </div>
                {isOverBudget && (
                  <span style={{ 
                    background: 'var(--danger)', 
                    color: 'white', 
                    padding: '5px 12px', 
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    超支
                  </span>
                )}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  fontSize: '14px',
                  color: 'var(--text-light)',
                  marginBottom: '8px'
                }}>
                  <span>预算进度</span>
                  <span>{Math.round(percentage)}%</span>
                </div>
                <div style={{
                  height: '8px',
                  background: 'var(--light-pink)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    background: isOverBudget ? 'var(--danger)' : 'var(--primary-pink)',
                    borderRadius: '4px',
                    width: `${Math.min(percentage, 100)}%`,
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ 
                  fontSize: '14px', 
                  color: 'var(--text-light)',
                  fontWeight: 'bold',
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
                    padding: '12px',
                    border: '2px solid var(--light-pink)',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    background: 'white'
                  }}
                />
                <span style={{ 
                  fontSize: '14px', 
                  color: 'var(--text-light)',
                  fontWeight: 'bold'
                }}>
                  元/月
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 使用说明 */}
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        background: 'var(--cream)', 
        borderRadius: '15px',
        fontSize: '13px',
        color: 'var(--text-light)'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>使用说明:</div>
        <div>• 设置预算后，当支出超过预算时会收到提醒</div>
        <div>• 预算金额为0表示不设置预算限制</div>
        <div>• 预算按月计算，每月1日自动重置</div>
      </div>
    </div>
  );
};

export default BudgetPage;