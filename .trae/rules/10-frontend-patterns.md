# 前端开发模式规范

## 组件开发规范

### React组件模式
- **函数组件优先**: 使用React函数组件而非类组件
- **Hook使用规范**: 合理使用useState、useEffect、useMemo等Hook
- **Props类型定义**: 所有组件必须定义完整的TypeScript Props接口

### 组件命名规范
- **PascalCase**: 组件文件名和组件名使用PascalCase
- **语义化命名**: 组件名反映其功能，如`ExpenseStats`而非`Stats`
- **页面组件**: 页面组件以`Page`结尾，如`HomePage`

## 样式开发规范

### CSS模块化
- **CSS Modules**: 使用CSS Modules实现样式隔离
- **命名约定**: 类名使用kebab-case，如`.expense-stats`
- **响应式设计**: 移动端优先，适配不同屏幕尺寸

### 主题配色系统
```css
/* 小猪主题配色 */
:root {
  --color-primary: #FFB6C1;    /* 主色调 - 粉色 */
  --color-secondary: #FF69B4;  /* 辅助色 - 深粉色 */
  --color-accent: #FF1493;     /* 强调色 - 亮粉色 */
  --color-text: #333333;       /* 文字色 */
  --color-background: #FFFFFF;  /* 背景色 */
  --color-border: #E0E0E0;     /* 边框色 */
}
```

## 数据流模式

### Props传递
- **单向数据流**: 数据从父组件流向子组件
- **最小化Props**: 只传递必要的props
- **事件回调**: 子组件通过回调函数与父组件通信

### 状态管理
- **本地状态**: 使用useState管理组件内部状态
- **提升状态**: 共享状态提升到最近的共同祖先
- **避免过度状态**: 避免不必要的全局状态

## 性能优化规范

### 渲染优化
- **React.memo**: 对纯函数组件使用React.memo
- **useMemo/useCallback**: 合理使用避免不必要的重新计算
- **懒加载**: 页面组件使用React.lazy进行代码分割

### 内存管理
- **清理副作用**: useEffect返回清理函数
- **避免内存泄漏**: 及时清理定时器和事件监听器
- **数据量控制**: 限制本地存储的数据量