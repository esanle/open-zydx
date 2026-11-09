# 八字排盘技能 · $bazi

`$bazi` 是一个在本机计算的 Codex 技能。给出出生资料，即可排四柱、查起运与大运、逐级查询流年流月流日，也可以单独查询十二长生。技能需要 Node.js，无需安装 npm 依赖。

师从九龙老师，学习来源为 [周易大学](https://zydx.top/)（zydx.top）。

## 快速开始

在 Codex 中打开本仓库并新建对话，输入：

> $bazi 帮我排公历 1990 年 6 月 15 日 12:30 的八字，按男命排运，列出四柱、起运时间和首步大运。

也可以问：

- `$bazi 查 2026 流年的十二节月，并列出小寒月的流日。`
- `$bazi 按辛日干查十二长生，说明酉支对应哪个阶段。`
- `$bazi 按 23 时换日和零时换日，分别排公历 1991 年 12 月 3 日 23:30 的四柱，按男命排运。`

## 安装到个人技能目录

如需在其他项目中使用，从仓库根目录执行以下命令。更新时可以重新执行。

```sh
bazi_skill_root="${CODEX_HOME:-$HOME/.codex}/skills"
mkdir -p "$bazi_skill_root/bazi"
cp -R .agents/skills/bazi/. "$bazi_skill_root/bazi/"
cp bazi.js THIRD-PARTY-LICENSES.txt "$bazi_skill_root/bazi/"
```

安装后，在 Codex 新对话中调用 `$bazi`。输入字段、计算口径及命令行示例见 [SKILL.md](.agents/skills/bazi/SKILL.md)。

## 排盘口径

- 出生年份支持 1902–2038，支持公历、农历和农历闰月。输入采用中国历法民用钟表时间。海外出生时应先明确换算口径。
- 默认采用参考站兼容模式和 23 时换日，可切换到天文模式或零时换日。晚子时的两套口径可能得到不同的日柱。
- 流年以立春为界，流月以十二节为界。一个流年的小寒月从次年 1 月开始。
- 十二长生采用阳干地支顺排、阴干地支逆排、土随火的口径。循环图的角度表示阶段次序。

## 网页与 JavaScript 库

双击 [index.html](index.html) 可打开离线排盘网页。使用时将 `index.html` 与 `bazi.js` 放在同一目录。网页支持大运、流年、流月、流日联动，以及十二长生循环图和本机排盘记录。

[bazi.js](bazi.js) 是技能与网页共用的独立计算库。浏览器加载普通脚本后可通过全局 `Bazi` 调用，并用 `Bazi.mount` 嵌入界面。Node.js 可直接使用 CommonJS：

```js
const Bazi = require('./bazi.js');
const chart = Bazi.calculate({
  year: 1990, month: 6, day: 15, hour: 12, minute: 30,
  calendar: 'solar', gender: '男'
});

console.log([chart.year, chart.month, chart.day, chart.time].map(p => p.ganZhi));
// ['庚午', '壬午', '辛亥', '甲午']
```

库内有中文教学注释。第三方历法内核的授权见 [THIRD-PARTY-LICENSES.txt](THIRD-PARTY-LICENSES.txt)。
