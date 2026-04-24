# 项目架构规范

## 项目定位与目标

**小猪养成记**是一个基于React + TypeScript的PWA记账应用，帮助用户记录日常消费、管理预算，并通过积分系统激励良好的财务习惯。

## 技术栈决策

### 前端技术栈
- **框架**: React 19.2.5 + TypeScript 6.0.2
- **构建工具**: Vite 8.0.10
- **样式方案**: CSS Modules + 小猪主题配色
- **PWA支持**: Vite PWA插件

### 核心约束
- **移动优先**: 适配移动端PWA全屏体验
- **数据持久化**: 使用localStorage存储用户数据
- **无后端依赖**: 纯前端应用，无需服务器
- **离线可用**: PWA支持离线使用

## 架构原则

### 组件设计原则
- **单一职责**: 每个组件只负责一个功能
- **纯函数组件**: 遵循React 19纯函数原则
- **TypeScript严格模式**: 确保类型安全

### 状态管理原则
- **本地状态优先**: 优先使用useState管理组件状态
- **数据流清晰**: 父组件向子组件传递数据
- **避免全局状态**: 除非必要，避免使用复杂的状态管理

## 目录结构规范

```
src/
├── components/     # 可复用组件
│   ├── StatusBar.tsx      # 状态栏
│   ├── ExpenseStats.tsx   # 支出统计
│   ├── RecordForm.tsx     # 记账表单
│   ├── BudgetManager.tsx  # 预算管理
│   ├── TopNav.tsx         # 顶部导航
│   └── BottomNav.tsx      # 底部导航
├── pages/         # 页面组件
│   ├── HomePage.tsx       # 首页
│   ├── BudgetPage.tsx     # 预算页面
│   ├── StorePage.tsx      # 商店页面
│   └── ExpensesPage.tsx   # 花销记录页面
├── types.ts       # TypeScript类型定义
├── utils.ts       # 工具函数
└── App.tsx        # 应用入口

specs/             # 功能规格文档
.trae/rules/       # 分层规范
CLAUDE.md          # 项目主规范
```