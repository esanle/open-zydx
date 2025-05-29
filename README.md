# 八字排盘系统 (BaZi Calculator)

一个基于React的八字排盘（四柱命理）应用，提供传统中国命理八字的计算和分析功能。

## 功能特点

- 根据出生日期和时间计算八字（四柱）
- 显示年、月、日、时四柱的天干地支
- 分析天干地支的五行属性
- 计算地支藏干
- 分析五行强弱状况
- 确定日主五行的状态
- 推算命局喜忌用神
- 传统中国文化风格的UI设计

## 技术栈

- React 18
- Styled Components（CSS-in-JS）
- Moment.js（日期处理）
- Chinese-lunar-calendar（中国农历转换）

## 安装与使用

1. 克隆仓库
```bash
git clone https://github.com/yourusername/open-zydx.git
cd open-zydx
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm start
```

4. 构建生产版本
```bash
npm run build
```

## 项目结构

```
src/
  ├── components/           # React组件
  │   ├── BaziCalculator.js # 主计算组件
  │   ├── BaziChart.js      # 八字图表展示
  │   ├── DetailedPillar.js # 详细八字信息
  │   └── ElementAnalysis.js # 五行分析
  ├── utils/                # 工具函数
  │   └── baziUtils.js      # 八字计算核心函数
  ├── styles/               # 样式文件
  │   └── GlobalStyle.js    # 全局样式
  ├── assets/               # 静态资源
  ├── App.js                # 应用入口组件
  └── index.js              # React入口文件
```

## 八字计算原理

本应用基于传统中国命理学的八字理论进行计算和分析：

1. **四柱计算**：根据公历日期转换为农历，并计算年、月、日、时四柱的天干地支
2. **五行分析**：计算命局中五行（金、木、水、火、土）的数量和强弱
3. **日主分析**：分析日柱天干所属五行的强弱状态
4. **喜忌判断**：根据日主五行的强弱，判断命局所喜用和忌用的五行

## 免责声明

本应用仅用于传统文化研究和娱乐目的，不作为任何决策的依据。八字命理分析结果仅供参考，不应被视为科学预测或建议。

## 许可证

MIT
