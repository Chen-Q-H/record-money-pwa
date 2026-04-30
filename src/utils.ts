import type { UserData, ExpenseRecord, Budget, ExpenseCategory, StoreItem } from './types';
import { STORE_ITEMS } from './types';

export const getInitialUserData = (): UserData => ({
  totalPoints: 0,
  level: 1,
  expenses: [],
  budgets: [
    { category: '餐饮', amount: 0 },
    { category: '购物', amount: 0 },
    { category: '交通', amount: 0 },
    { category: '娱乐', amount: 0 }
  ],
  storeItems: STORE_ITEMS.map(item => ({
    ...item,
    isPurchased: false,
    isApplied: false
  })),
  currentTheme: 'default',
  currentBackground: 'default',
  crops: []
});

export const saveUserData = (data: UserData): void => {
  localStorage.setItem('piggy-money-data', JSON.stringify(data));
};

export const loadUserData = (): UserData => {
  const saved = localStorage.getItem('piggy-money-data');
  if (saved) {
    const data = JSON.parse(saved);
    const defaultData = getInitialUserData();
    
    // 确保storeItems包含所有种子商品
    const mergedStoreItems = [...defaultData.storeItems];
    if (data.storeItems) {
      data.storeItems.forEach((existingItem: Partial<StoreItem>) => {
        const index = mergedStoreItems.findIndex(item => item.id === existingItem.id);
        if (index !== -1) {
          mergedStoreItems[index] = { ...mergedStoreItems[index], ...existingItem };
        }
      });
    }
    
    // 数据迁移：确保所有字段都存在
    return {
      ...defaultData, // 使用默认值作为基础
      ...data, // 覆盖现有数据
      storeItems: mergedStoreItems,
      crops: data.crops || [] // 确保crops字段存在
    };
  }
  return getInitialUserData();
};

export const calculateLevel = (expenseCount: number): number => {
  if (expenseCount >= 20) return 3; // 理财大师
  if (expenseCount >= 10) return 2; // 记账达人
  return 1; // 记账新手
};

export const getLevelName = (level: number): string => {
  switch (level) {
    case 3: return '理财大师';
    case 2: return '记账达人';
    default: return '记账新手';
  }
};

export const calculateProgress = (points: number): number => {
  if (points >= 300) return 100;
  if (points >= 100) return ((points - 100) / 200) * 100;
  return (points / 100) * 100;
};

export const getTodayExpenses = (expenses: ExpenseRecord[]): number => {
  const today = new Date().toISOString().split('T')[0];
  return expenses
    .filter(expense => expense.date === today)
    .reduce((sum, expense) => sum + expense.amount, 0);
};

export const getMonthExpenses = (expenses: ExpenseRecord[]): number => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  return expenses
    .filter(expense => expense.date.startsWith(currentMonth))
    .reduce((sum, expense) => sum + expense.amount, 0);
};

export const getCategoryExpenses = (expenses: ExpenseRecord[], category: ExpenseCategory): number => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  return expenses
    .filter(expense => expense.date.startsWith(currentMonth) && expense.category === category)
    .reduce((sum, expense) => sum + expense.amount, 0);
};

export const isBudgetExceeded = (expenses: ExpenseRecord[], budgets: Budget[]): string | null => {
  for (const budget of budgets) {
    if (budget.amount > 0) {
      const categoryExpenses = getCategoryExpenses(expenses, budget.category);
      if (categoryExpenses > budget.amount) {
        return budget.category;
      }
    }
  }
  return null;
};