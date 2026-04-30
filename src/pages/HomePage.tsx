import React, { useState } from 'react';
import StatusBar from '../components/StatusBar';
import ExpenseStats from '../components/ExpenseStats';
import RecordForm from '../components/RecordForm';
import BudgetManager from '../components/BudgetManager';
import CropGarden from '../components/CropGarden';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import type { UserData, ExpenseRecord, Budget } from '../types';

interface HomePageProps {
  userData: UserData;
  onAddExpense: (expense: ExpenseRecord) => void;
  onUpdateBudget: (budget: Budget) => void;
  onNavigate: (page: 'home' | 'budget' | 'store') => void;
  currentPage: 'home' | 'budget' | 'store';
}

const HomePage: React.FC<HomePageProps> = ({ 
  userData, 
  onAddExpense, 
  onUpdateBudget, 
  onNavigate,
  currentPage 
}) => {
  const [selectedCropId, setSelectedCropId] = useState<string>('');

  return (
    <div className="app">
      <div className="page-container">
        {/* 统一顶部导航栏 */}
        <TopNav 
          title="首页" 
          showBackButton={false}
        />

        {/* 主要内容区域（可滚动） */}
        <div className="page-content">
          {/* 状态栏（现在是页面内容的一部分） */}
          <StatusBar userData={userData} />

          {/* 作物园地 */}
          <CropGarden 
            crops={userData.crops} 
            onSelectCrop={setSelectedCropId}
            selectedCropId={selectedCropId}
          />

          {/* 支出统计 */}
          <ExpenseStats userData={userData} />

          {/* 记账表单 */}
          <RecordForm 
            onAddExpense={onAddExpense} 
            crops={userData.crops}
          />

          {/* 预算管理概览 */}
          <BudgetManager userData={userData} onUpdateBudget={onUpdateBudget} />
        </div>

        {/* 统一底部菜单 */}
        <BottomNav 
          currentPage={currentPage}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};

export default HomePage;