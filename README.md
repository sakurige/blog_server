# 项目初始化

## 制定项目开发规范

### `git`规范

1. 安装依赖

```shell
pnpm add -D lint-staged @commitlint/cli cz-customizable husky
```

2. `package.json`添加内容

```json
  "scripts": {
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "gitHooks": {
    "pre-commit": "npx lint-staged",
    "commit-msg": "npx commitlint -e"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    },
    "cz-customizable": {
      "config": "./.cz-config.cjs"
    }
  },
  "lint-staged": {
    "src/**/*.{ts,vue}": [
      "prettier --write",
      "eslint --fix",
      "git add -A"
    ]
  }
```

- 根目录创建 `.cz-config.js`, 内容如下

```js
module.exports = {
  //可选类型
  types: [
    { value: 'feat', name: 'feat:   新功能' },
    { value: 'fix', name: 'fix:   修复' },
    { value: 'docs', name: 'docs:   文档变更' },
    { value: 'style', name: 'style:   代码格式(不影响代码运行的变动)' },
    {
      value: 'refactor',
      name: 'refactor:重构(既不是增加feature)，也不是修复bug',
    },
    { value: 'perf', name: 'perf:   性能优化' },
    { value: 'test', name: 'test:   增加测试' },
    { value: 'chore', name: 'chore:   构建过程或辅助功能的变动' },
    { value: 'revert', name: 'revert:   回退' },
    { value: 'build', name: 'build:   打包' },
    { value: 'revert', name: 'revert:   回退' },
  ],
  //消息步骤
  messages: {
    type: '请选择提交类型',
    customScope: '请输入修改范围(可选)',
    subject: '请简要描述提交(必填)',
    body: '请输入详细描述(可选)',
    footer: '请输入要关闭的issue(可选)',
    confirmCommit: '确认以上信息提交?(y/n)',
  },
  //跳过问题
  skipQuestion: ['body', 'footer'],
  //subject文字长度默认是
  subjectLimit: 72,
};
```

3. `commit`时，使用`git cz`代替

### 代码规范

1. 安装依赖

```shell
pnpm add -D eslint prettier
```

2. 初始化`eslint`

```shell
npx eslint --init
```

3. 设置`prettier`规范

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "endOfLine": "lf"
}

```

4. 解决`eslint`与`prettier`冲突

```shell
pnpm add -D eslint-config-prettier eslint-plugin-prettier
```

- 修改eslint配置

```cjs
 plugins: [...,'prettier'],

```
