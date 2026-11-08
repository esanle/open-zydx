---
name: bazi
description: 使用离线八字历法库排四柱、查起运和大运、流年流月流日，或按日干和地支查十二长生。适用于按出生资料排盘、核对干支和讲解本项目的排盘口径。
---

# 八字排盘

从本文件所在目录定位 `scripts/bazi.cjs`，用 Node.js 执行。命令读取一个 JSON 参数并输出 JSON。使用计算结果回答，保留对结论有影响的输入假设和口径。

## 排四柱与大运

```sh
node "<技能目录>/scripts/bazi.cjs" chart '{"year":1990,"month":6,"day":15,"hour":12,"minute":30,"gender":"男","calendar":"solar"}'
```

- 出生年份范围为 1902–2038。先确认公历 `solar` 或农历 `lunar`。农历闰月传正的月份数，并设 `leapMonth:true`。
- 时间采用中国历法的民用钟表值，未做时区或真太阳时校正。海外出生或日期时间有歧义时，先确认用户要用的换算口径。只有时辰范围且跨过换日或节气边界时，按边界列出可能结果。缺失出生时辰时，先补问或标明仅能提供条件结果。大运方向需要用户确认的男/女排运参数。
- 默认 `mode:"reference"` 对照参考站。农历入口在该模式下按小时取值，小月三十会顺延至下月。需要天文模式时传 `mode:"astronomical"`，其中 `yunSect` 默认 2（分钟精度），也可传 1（时辰法）。
- 默认 `daySect:1` 为 23 时换日，`daySect:2` 为零时换日。报告边界案例时说明选项。根据返回的 `calculationSource` 说明实际采用的来源，`reference-with-fallback` 表示有节气边界使用内核补齐。
- 从 `year/month/day/time` 读取四柱，按同一顺序读取 `tenGods` 和 `diShi`。用 `start.date` 报告交运时间，用 `decades` 和其中的 `years` 查询大运及流年。索引 0 为起运前童限。起止岁数按公历年差列示。

## 查流月、流日和十二长生

```sh
node "<技能目录>/scripts/bazi.cjs" flow '{"year":2026}'
node "<技能目录>/scripts/bazi.cjs" flow '{"year":2026,"jie":"小寒","daySect":1}'
node "<技能目录>/scripts/bazi.cjs" life-cycle '{"dayStem":"辛","branch":"酉"}'
```

- `flow` 的 `year` 是立春开始的流年，流月以十二个节为界，最后的小寒月落在次年。传 `jie` 可查该节月的流日列表。逐日表按公历日期列示，节月的精确起止时刻以 `month.start/end` 为准。按某个时刻判月柱时比较精确时刻，勿只按逐日列表归属。
- `life-cycle` 只传 `dayStem` 可列出整轮配支及释义，传 `branch` 则查单一阶段。采用阳干地支顺排、阴干地支逆排、土随火的口径。阶段名用于讲解传统循环，与现实疾病、寿命和个人吉凶分开表述。
