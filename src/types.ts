export interface ExpenseRecord {
  id: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  description?: string;
  appliedCropId?: string; // 应用到哪个作物上
}

export type ExpenseCategory = '餐饮' | '购物' | '交通' | '娱乐';

export interface Crop {
  id: string;
  type: 'carrot' | 'tomato' | 'corn';
  stage: 1 | 2 | 3; // 生长阶段：1-幼苗，2-成长，3-成熟
  plantedAt: string; // 种植时间
  growthProgress: number; // 生长进度（0-100）
  targetExpenses: number; // 需要记账次数
  currentExpenses: number; // 当前记账次数
}

export const CROP_TYPES = {
  carrot: {
    name: '胡萝卜种子',
    price: 5,
    requiredLevel: 1,
    targetExpenses: 5,
    stages: ['🌱', '🥕', '🥕🌿']
  },
  tomato: {
    name: '番茄种子',
    price: 8,
    requiredLevel: 1,
    targetExpenses: 7,
    stages: ['🌱', '🍅', '🍅🌿']
  },
  corn: {
    name: '玉米种子',
    price: 12,
    requiredLevel: 1,
    targetExpenses: 10,
    stages: ['🌱', '🌽', '🌽🌿']
  }
} as const;

export interface Budget {
  category: ExpenseCategory;
  amount: number;
}

export interface StoreItem {
  id: string;
  name: string;
  price: number;
  requiredLevel: number;
  type: 'background' | 'theme' | 'seed';
  isPurchased: boolean;
  isApplied: boolean;
  quantity?: number; // 种子数量，用于多次购买
}

export interface UserData {
  totalPoints: number;
  level: number;
  expenses: ExpenseRecord[];
  budgets: Budget[];
  storeItems: StoreItem[];
  currentTheme: string;
  currentBackground: string;
  crops: Crop[];
}

export const LEVEL_THRESHOLDS = {
  beginner: 0,
  expert: 100,
  master: 300
};

export const STORE_ITEMS: StoreItem[] = [
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
    requiredLevel: 1,
    type: 'theme',
    isPurchased: false,
    isApplied: false
  },
  {
    id: 'seed-carrot',
    name: '胡萝卜种子',
    price: 5,
    requiredLevel: 1,
    type: 'seed',
    isPurchased: false,
    isApplied: false,
    quantity: 0
  },
  {
    id: 'seed-tomato',
    name: '番茄种子',
    price: 8,
    requiredLevel: 1,
    type: 'seed',
    isPurchased: false,
    isApplied: false,
    quantity: 0
  },
  {
    id: 'seed-corn',
    name: '玉米种子',
    price: 12,
    requiredLevel: 1,
    type: 'seed',
    isPurchased: false,
    isApplied: false,
    quantity: 0
  }
];
