import React from 'react';
import type { UserData, Budget } from '../types';
import StatusBar from '../components/StatusBar';
import RecordForm from '../components/RecordForm';
import ExpenseStats from '../components/ExpenseStats';
import BudgetManager from '../components/BudgetManager';

interface HomePageProps {
  userData: UserData;
  onAddExpense: (amount: number, category: string) => void;
  onUpdateBudget: (budget: Budget) => void;
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  userData, 
  onAddExpense, 
  onUpdateBudget, 
  onNavigate 
}) => {
  return (
    <div className="app">
      {/* 顶部状态栏 */}
      <StatusBar userData={userData} />

      {/* 支出统计 */}
      <ExpenseStats userData={userData} />

      {/* 记账表单 */}
      <RecordForm onAddExpense={onAddExpense} />

      {/* 预算管理概览 */}
      <BudgetManager userData={userData} onUpdateBudget={onUpdateBudget} />

      {/* 底部导航 */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginTop: 'auto',
        padding: '10px 0'
      }}>
        <button 
          className="store-btn"
          onClick={() => onNavigate('budget')}
          style={{ 
            flex: 1, 
            background: 'var(--warm-pink)',
            fontSize: '14px',
            padding: '12px'
          }}
        >
          💰 预算管理
        </button>
        <button 
          className="store-btn"
          onClick={() => onNavigate('store')}
          style={{ 
            flex: 1, 
            fontSize: '14px',
            padding: '12px'
          }}
        >
          🏪 小猪商店
        </button>
      </div>

      {/* 装饰效果 */}
      {userData.currentStickers.map(stickerId => (
        <div key={stickerId} style={{
          position: 'fixed',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          fontSize: '30px',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          🐷
        </div>
      ))}
    </div>
  );
};

export default HomePage;