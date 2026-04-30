# Git工作流与代码提交规范

## 提交信息规范

### 语义化提交格式
遵循[Conventional Commits](https://www.conventionalcommits.org/)规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 提交类型（type）
- **feat**: 新功能
- **fix**: 修复bug
- **docs**: 文档更新
- **style**: 代码格式调整（不影响功能）
- **refactor**: 代码重构（不改变功能）
- **perf**: 性能优化
- **test**: 测试相关
- **build**: 构建系统或外部依赖变更
- **ci**: CI配置变更
- **chore**: 其他杂项

### 描述语言规范
- **description（描述）**: 必须使用**中文**
- **body（正文）**: 建议使用中文，如需引用代码或技术术语可混合使用
- **footer（页脚）**: 可根据需要使用中文或英文

### 提交示例
```bash
# 新功能
feat: 添加花销记录页面

# 修复bug
fix: 修复预算计算错误

# 文档更新
docs: 更新项目规范文档

# 代码重构
refactor: 优化组件结构
```

## 提交前检查流程

### 必须执行的检查
```bash
# 1. TypeScript类型检查
npx tsc --noEmit

# 2. ESLint代码规范检查
npm run lint

# 3. 构建测试
npm run build
```

### 检查标准
- ✅ TypeScript编译无错误
- ✅ ESLint检查通过（0错误，0警告）
- ✅ 构建成功，无编译错误

## 提交工作流

### 1. 检查当前状态
```bash
git status
git diff --staged
```

### 2. 添加变更到暂存区
```bash
# 添加所有变更
git add .

# 或选择性添加
git add <specific-files>
```

### 3. 创建提交信息
```bash
git commit -m "<type>[scope]: <description>"
```

### 4. 推送到远程仓库
```bash
git push origin main
```

## 分支管理规范

### 分支命名
- **main**: 主分支，稳定版本
- **develop**: 开发分支
- **feature/**: 功能分支，如`feature/expense-tracking`
- **fix/**: 修复分支，如`fix/budget-calculation`
- **docs/**: 文档分支，如`docs/spec-coding-guide`

### 合并策略
- **feature分支**: 合并到develop分支
- **hotfix分支**: 直接合并到main分支
- **PR审查**: 所有合并都需要代码审查

## 版本发布规范

### 版本号格式
遵循[语义化版本](https://semver.org/)：`MAJOR.MINOR.PATCH`

- **MAJOR**: 不兼容的API修改
- **MINOR**: 向下兼容的功能性新增
- **PATCH**: 向下兼容的问题修正

### 发布流程
1. 更新版本号
2. 更新CHANGELOG.md
3. 创建release tag
4. 推送到远程仓库

## 规范修复机制

### 提交前的规范检查
每次提交前必须验证：
- 代码是否符合项目规范
- 提交信息是否符合语义化格式
- 所有检查是否通过

### 提交后的规范更新
如果提交涉及规范变更，需要：
- 更新相应的规范文档
- 确保规范与代码实现一致
- 记录变更原因和影响

## 示例工作流

### 新功能开发提交
```bash
# 1. 检查代码质量
npx tsc --noEmit && npm run lint

# 2. 添加变更
git add .

# 3. 创建提交
git commit -m "feat(expenses): 添加花销记录按日期分组功能"

# 4. 推送
git push origin feature/expense-tracking
```

### 规范文档更新提交
```bash
# 1. 检查代码质量
npx tsc --noEmit && npm run lint

# 2. 添加规范文档变更
git add specs/ CLAUDE.md .trae/rules/

# 3. 创建提交
git commit -m "docs(spec): 更新Spec Coding开发流程规范"

# 4. 推送
git push origin docs/spec-coding-guide
```