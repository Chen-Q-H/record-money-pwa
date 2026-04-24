# 小猪养成记 - 项目主规范

## 项目概述

**小猪养成记**是一个基于React + TypeScript的PWA记账应用，帮助用户记录日常消费、管理预算，并通过积分系统激励良好的财务习惯。

## Spec Coding 开发流程

### 核心理念：规范即代码
基于Sean Grove的"The New Code"理念：**代码是意图的有损投影，规范才是真正的源代码**。

### 三层规范结构
1. **功能规范（What）** - `specs/`目录：描述业务需求和用户故事
2. **架构规范（How - 架构层）** - `.trae/rules/00-architecture.md`：定义技术架构和约束
3. **实现规范（How - 实现层）** - `.trae/rules/`其他文件：具体实现要求和标准

### 开发工作流
1. **Specify** → 在`specs/`创建功能规格文档
2. **Plan** → 制定技术方案和任务拆解
3. **Tasks** → 将计划拆分为可执行的小任务
4. **Implement** → AI读取规范生成代码实现
5. **Validate** → 执行质量检查和规范修复

## 分层规范体系

### 第一层：功能规范（specs/）
- `expense-tracking.md` - 花销记录功能
- `budget-management.md` - 预算管理功能
- `store-system.md` - 商店系统功能

### 第二层：架构规范（.trae/rules/00-architecture.md）
- 技术栈决策和架构原则
- 目录结构规范
- 组件设计原则

### 第三层：实现规范（.trae/rules/）
- `01-security.md` - 安全与数据规范
- `10-frontend-patterns.md` - 前端开发模式
- `20-testing.md` - 测试与质量保证

## 核心约束与决策

### 技术栈约束
- **必须使用**：React 19.2.5 + TypeScript 6.0.2 + Node.js 22.21.1+
- **移动优先**：适配PWA全屏体验
- **无后端依赖**：纯前端应用，数据存储在localStorage

### 设计主题约束
- **配色方案**：小猪粉色主题（#FFB6C1等）
- **用户体验**：简洁直观，操作流畅
- **性能要求**：页面加载<1秒，交互响应<100ms

## 质量保证流程

### 代码质量检查（每次修改后必须执行）
```bash
# TypeScript类型检查
npx tsc --noEmit

# ESLint代码规范检查
npm run lint
```

### 验收标准
- ✅ TypeScript编译无错误
- ✅ ESLint检查通过（0错误，0警告）
- ✅ 符合React 19纯函数规则
- ✅ 所有功能正常，用户体验流畅

## 规范修复机制

**软件工程的本质是规范修复**（Josh Beckman）。开发过程就是：
- 修改Markdown规范 → AI读取规范 → 生成代码 → 验证结果 → 修复规范

规范是活的，需要随着实现结果持续演进和完善。

---

*本规范将随着项目开发持续更新和完善。规范修复是开发过程的核心环节。*