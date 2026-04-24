import React, { useState, useEffect } from 'react';
import './App.css';
import type { UserData, ExpenseRecord, Budget } from './types';
import type { AppPage } from './pages/types';
import ToastNotification from './components/ToastNotification';
import { loadUserData, saveUserData, calculateLevel, isBudgetExceeded } from './utils';
import HomePage from './pages/HomePage';
import BudgetPage from './pages/BudgetPage';
import StorePage from './pages/StorePage';
import ExpensesPage from './pages/ExpensesPage';
import './App.css';

function App() {
  const [userData, setUserData] = useState<UserData>(loadUserData());
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [showBudgetAlert, setShowBudgetAlert] = useState<string | null>(null);

  useEffect(() => {
    saveUserData(userData);
  }, [userData]);

  const addExpense = (expense: ExpenseRecord) => {
    const newExpense: ExpenseRecord = {
      id: Date.now().toString(),
      amount: expense.amount,
      category: expense.category,
      date: new Date().toISOString().split('T')[0]
    };

    const newTotalPoints = userData.totalPoints + expense.amount;
    const newLevel = calculateLevel(newTotalPoints);

    const updatedData: UserData = {
      ...userData,
      totalPoints: newTotalPoints,
      level: newLevel,
      expenses: [...userData.expenses, newExpense]
    };

    setUserData(updatedData);

    // 检查预算超支
    const budget = userData.budgets.find(b => b.category === expense.category);
    if (budget && isBudgetExceeded(updatedData.expenses, budget)) {
      setShowBudgetAlert(`${expense.category}预算已超支！`);
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

    const updatedData: Partial<UserData> = { storeItems: updatedItems };

    if (item.type === 'theme') {
      updatedData.currentTheme = item.id;
    } else if (item.type === 'background') {
      updatedData.currentBackground = item.id;
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
            currentPage={currentPage}
          />
        );
      case 'budget':
        return (
          <BudgetPage
            userData={userData}
            onUpdateBudget={updateBudget}
            onNavigate={handleNavigate}
            currentPage={currentPage}
          />
        );
      case 'store':
        return (
          <StorePage
            userData={userData}
            onPurchaseItem={purchaseItem}
            onApplyItem={applyItem}
            onNavigate={handleNavigate}
            currentPage={currentPage}
          />
        );
      case 'expenses':
        return (
          <ExpensesPage
            userData={userData}
            onNavigate={handleNavigate}
            currentPage={currentPage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {/* 统一提示信息 */}
      <ToastNotification 
        message={showBudgetAlert || ''}
        type="error"
        visible={!!showBudgetAlert}
      />

      {/* 当前页面 */}
      {renderCurrentPage()}
    </div>
  );
}

export default App;