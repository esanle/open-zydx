const Bazi = require('../bazi.js');

function run(action, input) {
  switch (action) {
    case 'chart':
      if (!Number.isInteger(input.hour)) throw new Error('排盘需要明确的出生小时');
      if (!['男', '女'].includes(input.gender)) throw new Error('请指定男或女排运参数');
      return Bazi.calculate(input);
    case 'flow': {
      if (!Number.isInteger(input.year) || input.year < 1 || input.year > 9998) {
        throw new Error('流年须为 1–9998 的整数');
      }
      if (input.daySect !== undefined && ![1, 2].includes(input.daySect)) {
        throw new Error('daySect 应为 1 或 2');
      }
      const months = Bazi.getFortuneMonths(input.year);
      if (input.jie === undefined) return months;
      const month = months.find(item => item.jie === input.jie);
      if (!month) throw new Error('请用十二节中的名称指定流月，例如立春或小寒');
      return { month, days: Bazi.getFortuneDays(month, input.daySect) };
    }
    case 'life-cycle': {
      const cycle = Bazi.getLifeCycle(input.dayStem);
      if (input.branch === undefined) return cycle;
      const stage = Bazi.getLifeStage(input.dayStem, input.branch);
      return cycle.find(item => item.stage === stage);
    }
    default:
      throw new Error('支持的命令为 chart、flow、life-cycle');
  }
}

try {
  const [action, json] = process.argv.slice(2);
  if (json === undefined) throw new Error('用法：node bazi.cjs <命令> <JSON 对象>');
  const input = JSON.parse(json);
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new Error('输入必须为 JSON 对象');
  }
  process.stdout.write(JSON.stringify(run(action, input)) + '\n');
} catch (error) {
  process.stderr.write(error.message + '\n');
  process.exitCode = 1;
}
