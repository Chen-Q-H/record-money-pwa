import React, { useState, useEffect } from 'react';
import type { UserData, ExpenseRecord, Budget, StoreItem } from './types';
import type { AppPage } from './pages/types';
import { loadUserData, saveUserData, calculateLevel, isBudgetExceeded } from './utils';
import HomePage from './pages/HomePage';
import BudgetPage from './pages/BudgetPage';
import StorePage from './pages/StorePage';
import './App.css';

function App() {
  const [userData, setUserData] = useState<UserData>(loadUserData());
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [showBudgetAlert, setShowBudgetAlert] = useState<string | null>(null);

  useEffect(() => {
    saveUserData(userData);
  }, [userData]);

  const addExpense = (amount: number, category: string) => {
    const newExpense: ExpenseRecord = {
      id: Date.now().toString(),
      amount,
      category: category as any,
      date: new Date().toISOString().split('T')[0]
    };

    const newTotalPoints = userData.totalPoints + amount;
    const newLevel = calculateLevel(newTotalPoints);

    const updatedData: UserData = {
      ...userData,
      totalPoints: newTotalPoints,
      level: newLevel,
      expenses: [...userData.expenses, newExpense]
    };

    setUserData(updatedData);

    // 检查预算超支
    const budget = userData.budgets.find(b => b.category === category);
    if (budget && isBudgetExceeded(updatedData.expenses, budget)) {
      setShowBudgetAlert(`${category}预算已超支！`);
      setTimeout(() => setShowBudgetAlert(null), 3000);
    }
  };

  const updateBudget = (updatedBudget: Budget) => {
    const updatedBudgets = userData.budgets.map(budget =>
      budget.category === updatedBudget.category ? updatedBudget : budget
    );

    setUserData({
      ...userData,
      budgets: updatedBudgets
    });
  };

  const purchaseItem = (itemId: string) => {
    const item = userData.storeItems.find(item => item.id === itemId);
    if (!item || userData.totalPoints < item.price || userData.level < item.requiredLevel) {
      return;
    }

    const updatedItems = userData.storeItems.map(item =>
      item.id === itemId ? { ...item, isPurchased: true } : item
    );

    setUserData({
      ...userData,
      totalPoints: userData.totalPoints - item.price,
      storeItems: updatedItems
    });
  };

  const applyItem = (itemId: string) => {
    const item = userData.storeItems.find(item => item.id === itemId);
    if (!item || !item.isPurchased) {
      return;
    }

    const updatedItems = userData.storeItems.map(storeItem => {
      if (storeItem.type === item.type) {
        return { ...storeItem, isApplied: storeItem.id === itemId };
      }
      return storeItem;
    });

    let updatedData: Partial<UserData> = { storeItems: updatedItems };

    if (item.type === 'theme') {
      updatedData.currentTheme = item.id;
    } else if (item.type === 'background') {
      updatedData.currentBackground = item.id;
    } else if (item.type === 'sticker') {
      const currentStickers = userData.currentStickers.includes(itemId)
        ? userData.currentStickers.filter(id => id !== itemId)
        : [...userData.currentStickers, itemId];
      updatedData.currentStickers = currentStickers;
    }

    setUserData({
      ...userData,
      ...updatedData
    });
  };

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            userData={userData}
            onAddExpense={addExpense}
            onUpdateBudget={updateBudget}
            onNavigate={handleNavigate}
          />
        );
      case 'budget':
        return (
          <BudgetPage
            userData={userData}
            onUpdateBudget={updateBudget}
            onNavigate={handleNavigate}
          />
        );
      case 'store':
        return (
          <StorePage
            userData={userData}
            onPurchaseItem={purchaseItem}
            onApplyItem={applyItem}
            onNavigate={handleNavigate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {/* 预算超支提醒 */}
      {showBudgetAlert && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--danger)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '10px',
          zIndex: 1000,
          boxShadow: '0 4px 15px rgba(255, 170, 165, 0.5)'
        }}>
          ⚠️ {showBudgetAlert}
        </div>
      )}

      {/* 当前页面 */}
      {renderCurrentPage()}
    </div>
  );
}

export default App;