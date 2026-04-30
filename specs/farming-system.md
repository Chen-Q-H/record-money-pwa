# 作物种植系统功能规格

## 功能概述

### 功能名称
可爱作物种植系统

### 用户故事
作为用户，我希望能够在商店购买种子，通过记账来培育作物，看到作物从幼苗到成熟的生长过程，获得种植的乐趣和成就感。

### 业务价值
- 通过游戏化元素增强用户记账的积极性
- 提供视觉反馈和成就感
- 增加应用的趣味性和用户粘性

### 积分和等级计算规则
- **积分获取**：每次记账获得1积分（与金额无关）
- **等级计算**：基于记账次数分段：
  - 等级1：记账新手（0-9次记账）
  - 等级2：记账达人（10-19次记账）
  - 等级3：理财大师（20+次记账）

### 商品购买规则
- **购买限制**：所有商品无等级限制，只需积分足够即可购买
- **积分消耗**：购买商品消耗相应积分
- **应用效果**：购买后需要应用才能生效（种子应用后种植到园地）

## 技术规格

### 数据结构
```typescript
interface Crop {
  id: string;
  type: 'carrot' | 'tomato' | 'corn';
  stage: 1 | 2 | 3; // 生长阶段：1-幼苗，2-成长，3-成熟
  plantedAt: string; // 种植时间
  growthProgress: number; // 生长进度（0-100）
  targetExpenses: number; // 需要记账次数
  currentExpenses: number; // 当前记账次数
}

interface UserData {
  crops: Crop[];
  // ...其他字段
}

interface StoreItem {
  id: string;
  name: string;
  price: number;
  requiredLevel: number;
  type: 'background' | 'theme' | 'seed';
  isPurchased: boolean;
  isApplied: boolean;
}
```

### 作物类型定义
```typescript
const CROP_TYPES = {
  carrot: {
    name: '胡萝卜种子',
    price: 5,
    requiredLevel: 1,
    targetExpenses: 5, // 需要5次记账才能成熟
    stages: [
      '🌱', // 幼苗
      '🥕', // 成长
      '🥕🌿' // 成熟
    ]
  },
  tomato: {
    name: '番茄种子',
    price: 8,
    requiredLevel: 1,
    targetExpenses: 7,
    stages: [
      '🌱',
      '🍅',
      '🍅🌿'
    ]
  },
  corn: {
    name: '玉米种子',
    price: 12,
    requiredLevel: 1,
    targetExpenses: 10,
    stages: [
      '🌱',
      '🌽',
      '🌽🌿'
    ]
  }
};
```

### 组件架构
- **CropGarden组件**: 显示作物园地
- **CropItem组件**: 单个作物显示
- **SeedStore组件**: 种子购买界面
- **PlantingModal组件**: 种植选择模态框

## 验收标准

### 功能测试
- ✅ 商店正确显示三种种子商品
- ✅ 购买种子后可以种植到园地
- ✅ 每次记账选择作物后生长进度增加
- ✅ 作物分三个阶段显示不同图案
- ✅ 达到目标记账次数后作物成熟
- ✅ 园地布局美观，格子有边框和背景色

### 用户体验
- ✅ 作物图案可爱，符合小猪主题
- ✅ 生长动画流畅自然
- ✅ 园地布局在status-bar下方，位置合理
- ✅ 操作流程直观易用

### 性能指标
- ✅ 作物状态更新及时
- ✅ 动画效果流畅不卡顿
- ✅ 内存使用合理

## 实现计划

### 开发步骤
1. 更新数据模型和接口定义
2. 在商店添加种子购买选项
3. 实现作物生长动画和显示
4. 集成到首页status-bar下方
5. 实现记账时选择作物的功能

### 依赖关系
- 依赖于现有的UserData数据模型
- 需要扩展StoreItem类型
- 依赖记账系统的回调机制

### 风险评估
- 动画性能优化（已设计简单图案）
- 数据同步一致性（使用现有存储机制）
- 用户体验复杂度（已设计直观流程）

---

*最后更新：2026-04-27*  
*状态：🔄 待实现*