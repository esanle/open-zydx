# 历史研究和验证资料

这里和 ../fixtures/ 中的文件是历史来源、样本和对照证据，不是运行依赖。

项目现已迁移为根目录 index.html + bazi.js。早期报告中出现的 src/utils/*.ts、scripts/*.cjs、npm 命令是当时的实现位置；这些 Node/React 工程文件已按要求删除。当前算法、兼容表、可选原生界面均在 bazi.js 中，最新用法见根目录 README.md。

standalone-migration.json：284组输入×2种模式及全范围节月/流日的迁移一致性结果。
standalone-browser.json：通过本地文件直接加载、19项交互检查的浏览器结果。
