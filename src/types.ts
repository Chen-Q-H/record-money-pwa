export interface ExpenseRecord {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  description?: string;
}

export type ExpenseCategory = '餐饮' | '购物' | '交通' | '娱乐';

export interface Budget {
  category: ExpenseCategory;
  amount: number;
}

export interface StoreItem {
  id: string;
  name: string;
  price: number;
  requiredLevel: number;
  type: 'sticker' | 'background' | 'theme';
  isPurchased: boolean;
  isApplied: boolean;
}

export interface UserData {
  totalPoints: number;
  level: number;
  expenses: ExpenseRecord[];
  budgets: Budget[];
  storeItems: StoreItem[];
  currentTheme: string;
  currentBackground: string;
  currentStickers: string[];
}

export const LEVEL_THRESHOLDS = {
  beginner: 0,
  expert: 100,
  master: 300
};

export const STORE_ITEMS: StoreItem[] = [
  {
    id: 'sticker-1',
    name: '小猪贴纸',
    price: 5,
    requiredLevel: 1,
    type: 'sticker',
    isPurchased: false,
    isApplied: false
  },
  {
    id: 'background-1',
    name: '猪猪背景',
    price: 10,
    requiredLevel: 1,
    type: 'background',
    isPurchased: false,
    isApplied: false
  },
  {
    id: 'theme-1',
    name: '粉红主题皮肤',
    price: 15,
    requiredLevel: 2,
    type: 'theme',
    isPurchased: false,
    isApplied: false
  }
];