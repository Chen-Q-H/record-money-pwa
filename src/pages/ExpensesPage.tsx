import React from 'react';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import type { UserData, ExpenseRecord } from '../types';

interface ExpensesPageProps {
  userData: UserData;
  onNavigate: (page: 'home' | 'budget' | 'store' | 'expenses') => void;
  currentPage: 'home' | 'budget' | 'store' | 'expenses';
}

const ExpensesPage: React.FC<ExpensesPageProps> = ({ userData, onNavigate, currentPage }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      '餐饮': '🍽️',
      '购物': '🛍️',
      '交通': '🚗',
      '娱乐': '🎮'
    };
    return icons[category as keyof typeof icons] || '💰';
  };

  const expensesByDate = userData.expenses.reduce((acc, expense) => {
    const date = expense.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(expense);
    return acc;
  }, {} as Record<string, ExpenseRecord[]>);

  const sortedDates = Object.keys(expensesByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="app">
      <div className="page-container">
        <TopNav 
          title="花销记录" 
          showBackButton={false}
        />

        <div className="page-content">
          <div className="expenses-page">
            <div className="expenses-summary">
              共 {userData.expenses.length} 笔消费
            </div>

            {userData.expenses.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <div className="empty-text">还没有花销记录</div>
                <div className="empty-subtext">快去首页记录你的第一笔消费吧！</div>
              </div>
            ) : (
              <div className="expenses-list">
                {sortedDates.map(date => (
                  <div key={date} className="expense-date-group">
                    <div className="date-header">
                      <span className="date-label">{formatDate(date)}</span>
                      <span className="date-total">
                        合计: ¥{expensesByDate[date].reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="expense-items">
                      {expensesByDate[date].map(expense => (
                        <div key={expense.id} className="expense-item">
                          <div className="expense-icon">
                            {getCategoryIcon(expense.category)}
                          </div>
                          <div className="expense-info">
                            <div className="expense-category">{expense.category}</div>
                            <div className="expense-description">
                              {expense.description || '无备注'}
                            </div>
                          </div>
                          <div className="expense-amount">
                            ¥{expense.amount.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <BottomNav 
          currentPage={currentPage}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};

export default ExpensesPage;