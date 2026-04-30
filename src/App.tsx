import { useState, useEffect } from 'react';
import type { UserData, ExpenseRecord, Budget, Crop } from './types';
import { CROP_TYPES } from './types';
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
      date: new Date().toISOString().split('T')[0],
      description: expense.description,
      appliedCropId: expense.appliedCropId
    };

    const newTotalPoints = userData.totalPoints + 1; // 每次记账获得1积分
    const newExpenseCount = userData.expenses.length + 1;
    const newLevel = calculateLevel(newExpenseCount);

    // 更新作物生长进度（如果应用了作物）
    let updatedCrops = userData.crops ? [...userData.crops] : [];
    if (expense.appliedCropId) {
      updatedCrops = updatedCrops.map(crop => {
        if (crop.id === expense.appliedCropId) {
          const newExpenses = crop.currentExpenses + 1;
          const progress = Math.min((newExpenses / crop.targetExpenses) * 100, 100);
          const stage = newExpenses >= crop.targetExpenses ? 3 : 
                       newExpenses >= crop.targetExpenses / 2 ? 2 : 1;
          
          return {
            ...crop,
            currentExpenses: newExpenses,
            growthProgress: progress,
            stage: stage
          };
        }
        return crop;
      });
    }

    const updatedExpenses = [...userData.expenses, newExpense];
    
    // 检查预算是否超支
    const budgetExceeded = isBudgetExceeded(updatedExpenses, userData.budgets);
    
    setUserData({
      ...userData,
      expenses: updatedExpenses,
      crops: updatedCrops,
      totalPoints: newTotalPoints,
      level: newLevel
    });

    // 显示预算超支提醒
    if (budgetExceeded) {
      setShowBudgetAlert(`${budgetExceeded} 类别预算已超支`);
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

  const purchaseItem = (itemId: string, quantity: number = 1) => {
    const item = userData.storeItems.find(item => item.id === itemId);
    if (!item || userData.totalPoints < item.price * quantity || userData.level < item.requiredLevel) {
      return;
    }

    const updatedItems = userData.storeItems.map(storeItem => {
      if (storeItem.id === itemId) {
        if (storeItem.type === 'seed') {
          // 种子类型：增加数量
          return { 
            ...storeItem, 
            quantity: (storeItem.quantity || 0) + quantity,
            isPurchased: true 
          };
        }
        // 其他类型：标记为已购买
        return { ...storeItem, isPurchased: true };
      }
      return storeItem;
    });

    setUserData({
      ...userData,
      totalPoints: userData.totalPoints - item.price * quantity,
      storeItems: updatedItems
    });
  };

  const applyItem = (itemId: string) => {
    const item = userData.storeItems.find(item => item.id === itemId);
    if (!item) {
      return;
    }

    // 处理种子类型商品 - 种植作物（需要有库存）
    if (item.type === 'seed') {
      const seedItem = userData.storeItems.find(si => si.id === itemId);
      if (!seedItem || seedItem.quantity === undefined || seedItem.quantity <= 0) {
        return;
      }

      const cropType = item.id.split('-')[1] as 'carrot' | 'tomato' | 'corn';
      const cropConfig = CROP_TYPES[cropType];
      
      const newCrop: Crop = {
        id: Date.now().toString(),
        type: cropType,
        stage: 1,
        plantedAt: new Date().toISOString(),
        growthProgress: 0,
        targetExpenses: cropConfig.targetExpenses,
        currentExpenses: 0
      };

      // 减少种子数量
      const updatedItems = userData.storeItems.map(storeItem => {
        if (storeItem.id === itemId && storeItem.type === 'seed') {
          return { 
            ...storeItem, 
            quantity: (storeItem.quantity || 0) - 1 
          };
        }
        return storeItem;
      });

      setUserData({
        ...userData,
        crops: [...userData.crops, newCrop],
        storeItems: updatedItems
      });
      return;
    }

    // 处理主题和背景类型商品
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
