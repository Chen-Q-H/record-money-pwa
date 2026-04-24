import React from 'react';
import type { UserData } from '../types';
import { getTodayExpenses, getMonthExpenses } from '../utils';

interface ExpenseStatsProps {
  userData: UserData;
}

const ExpenseStats: React.FC<ExpenseStatsProps> = ({ userData }) => {
  const todayExpenses = getTodayExpenses(userData.expenses);
  const monthExpenses = getMonthExpenses(userData.expenses);

  return (
    <div className="expense-stats">
      <div className="stat-card">
        <div className="stat-value">¥{todayExpenses.toFixed(2)}</div>
        <div className="stat-label">今日支出</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">¥{monthExpenses.toFixed(2)}</div>
        <div className="stat-label">本月支出</div>
      </div>
    </div>
  );
};

export default ExpenseStats;