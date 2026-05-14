import moment from 'moment';

// 天干 (Heavenly Stems)
export const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支 (Earthly Branches)
export const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 五行 (Five Elements)
export const FIVE_ELEMENTS = ['木', '火', '土', '金', '水'];

// 天干五行 (Heavenly Stems' Five Elements)
export const STEMS_ELEMENTS: Record<string, string> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

// 地支五行 (Earthly Branches' Five Elements)
export const BRANCHES_ELEMENTS: Record<string, string> = {
  '子': '水', '丑': '土',
  '寅': '木', '卯': '木',
  '辰': '土', '巳': '火',
  '午': '火', '未': '土',
  '申': '金', '酉': '金',
  '戌': '土', '亥': '水'
};

// 地支藏干 (Hidden Stems in Earthly Branches)
export const HIDDEN_STEMS: Record<string, string[]> = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '庚', '戊'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲']
};

// 阴阳属性 (Yin-Yang Properties)
export const YIN_YANG: Record<string, string> = {
  '甲': '阳', '乙': '阴',
  '丙': '阳', '丁': '阴',
  '戊': '阳', '己': '阴',
  '庚': '阳', '辛': '阴',
  '壬': '阳', '癸': '阴',
  '子': '阳', '丑': '阴',
  '寅': '阳', '卯': '阴',
  '辰': '阳', '巳': '阴',
  '午': '阳', '未': '阴',
  '申': '阳', '酉': '阴',
  '戌': '阳', '亥': '阴'
};

// 纳音五行 (Sound-Carrying Five Elements)
export const SOUND_ELEMENTS: Record<string, string> = {
  '甲子': '海中金', '乙丑': '海中金',
  '丙寅': '炉中火', '丁卯': '炉中火',
  '戊辰': '大林木', '己巳': '大林木',
  '庚午': '路旁土', '辛未': '路旁土',
  '壬申': '剑锋金', '癸酉': '剑锋金',
  '甲戌': '山头火', '乙亥': '山头火',
  '丙子': '涧下水', '丁丑': '涧下水',
  '戊寅': '城头土', '己卯': '城头土',
  '庚辰': '白蜡金', '辛巳': '白蜡金',
  '壬午': '杨柳木', '癸未': '杨柳木',
  '甲申': '泉中水', '乙酉': '泉中水',
  '丙戌': '屋上土', '丁亥': '屋上土',
  '戊子': '霹雳火', '己丑': '霹雳火',
  '庚寅': '松柏木', '辛卯': '松柏木',
  '壬辰': '长流水', '癸巳': '长流水',
  '甲午': '砂中金', '乙未': '砂中金',
  '丙申': '山下火', '丁酉': '山下火',
  '戊戌': '平地木', '己亥': '平地木',
  '庚子': '壁上土', '辛丑': '壁上土',
  '壬寅': '金箔金', '癸卯': '金箔金',
  '甲辰': '覆灯火', '乙巳': '覆灯火',
  '丙午': '天河水', '丁未': '天河水',
  '戊申': '大驿土', '己酉': '大驿土',
  '庚戌': '钗环金', '辛亥': '钗环金',
  '壬子': '桑柘木', '癸丑': '桑柘木',
  '甲寅': '大溪水', '乙卯': '大溪水',
  '丙辰': '沙中土', '丁巳': '沙中土',
  '戊午': '天上火', '己未': '天上火',
  '庚申': '石榴木', '辛酉': '石榴木',
  '壬戌': '大海水', '癸亥': '大海水'
};

// 空亡 (Empty Positions)
export function calculateEmptyPositions(dayStem: string, dayBranch: string): string[] {
  const stemIndex = HEAVENLY_STEMS.indexOf(dayStem);
  const branchIndex = EARTHLY_BRANCHES.indexOf(dayBranch);
  
  // 计算空亡
  const emptyIndex1 = (10 - stemIndex + branchIndex) % 12;
  const emptyIndex2 = (emptyIndex1 + 1) % 12;
  
  return [EARTHLY_BRANCHES[emptyIndex1], EARTHLY_BRANCHES[emptyIndex2]];
}

// 神煞 (Major Gods/Spirits)
export const MAJOR_GODS: Record<string, Record<string, string[]>> = {
  // 年神煞
  'year': {
    '子': ['将星', '劫煞'],
    '丑': ['灾煞', '伏尸'],
    '寅': ['天德', '福星'],
    '卯': ['福德', '华盖'],
    '辰': ['恩光', '天厨'],
    '巳': ['禄神', '孤辰'],
    '午': ['贵人', '红艳'],
    '未': ['羊刃', '灾煞'],
    '申': ['学堂', '驿马'],
    '酉': ['将星', '劫煞'],
    '戌': ['灾煞', '伏尸'],
    '亥': ['天德', '福星']
  },
  // 月神煞
  'month': {
    '子': ['天医', '阴煞'],
    '丑': ['月厌', '血支'],
    '寅': ['天贵', '天喜'],
    '卯': ['天德', '福星'],
    '辰': ['白虎', '天哭'],
    '巳': ['天喜', '禄神'],
    '午': ['天德', '福星'],
    '未': ['病符', '死符'],
    '申': ['六合', '官符'],
    '酉': ['天贵', '红艳'],
    '戌': ['灾煞', '岁破'],
    '亥': ['天乙', '国印']
  },
  // 日神煞
  'day': {
    '子': ['天德', '天乙'],
    '丑': ['三合', '六合'],
    '寅': ['驿马', '华盖'],
    '卯': ['天医', '学堂'],
    '辰': ['福星', '国印'],
    '巳': ['将星', '红艳'],
    '午': ['天德', '天赦'],
    '未': ['天喜', '禄神'],
    '申': ['官符', '岁破'],
    '酉': ['魁罡', '孤辰'],
    '戌': ['白虎', '劫煞'],
    '亥': ['天厨', '福德']
  },
  // 时神煞
  'time': {
    '子': ['贵人', '天乙'],
    '丑': ['羊刃', '劫煞'],
    '寅': ['学堂', '驿马'],
    '卯': ['三合', '天德'],
    '辰': ['六合', '岁破'],
    '巳': ['华盖', '国印'],
    '午': ['天医', '福星'],
    '未': ['空亡', '阴煞'],
    '申': ['福德', '官符'],
    '酉': ['天喜', '禄神'],
    '戌': ['将星', '天贵'],
    '亥': ['天德', '天厨']
  }
};

// 天干注意事项 (Heavenly Stem Notes)
export const STEM_NOTES: Record<string, string> = {
  '甲': '甲木生发向上，喜水生木，忌金克木',
  '乙': '乙木柔韧内敛，喜水生木，忌金克木',
  '丙': '丙火明亮外向，喜木生火，忌水克火',
  '丁': '丁火温和内敛，喜木生火，忌水克火',
  '戊': '戊土厚重中正，喜火生土，忌木克土',
  '己': '己土柔和内敛，喜火生土，忌木克土',
  '庚': '庚金刚健外向，喜土生金，忌火克金',
  '辛': '辛金清秀内敛，喜土生金，忌火克金',
  '壬': '壬水奔放外向，喜金生水，忌土克水',
  '癸': '癸水柔顺内敛，喜金生水，忌土克水'
};

// 地支注意事项 (Earthly Branch Notes)
export const BRANCH_NOTES: Record<string, string> = {
  '子': '子水旺于冬至，藏精气，为水的源头',
  '丑': '丑土湿润，带有寒气，藏水木',
  '寅': '寅木生长，为万物启始，带有春意',
  '卯': '卯木旺盛，阳气生发，木的本源',
  '辰': '辰土湿润，多雨水，有生机',
  '巳': '巳火温暖，带有热气，阳光充足',
  '午': '午火炎热，火的本源，阳气极旺',
  '未': '未土肥沃，带有湿气，利于生长',
  '申': '申金锐利，带有肃杀之气',
  '酉': '酉金清秀，金的本源，气清而肃',
  '戌': '戌土干燥，带有火气，气温降低',
  '亥': '亥水寒冷，水的本源，阴气增长'
};

// 称骨算命法 (Bone Weighing Fortune Telling)
// 算骨重量
export function calculateBoneWeight(year: number, month: number, day: number, hour: number, gender: string): number {
  const yearBone = [9.3, 0.6, 8.1, 9.4, 5.5, 1.7, 3.3, 3.5, 6.7, 7.8, 8.4, 12];
  const monthBone = [4.5, 6.8, 5.7, 0.6, 9.3, 1.8, 9.1, 8.2, 7.4, 2.8, 5.6, 3.7];
  const dayBone = [3.6, 8.5, 0.9, 2.1, 9.7, 4.6, 9.8, 1.9, 8.2, 5.3, 3.4, 6.3];
  const hourBone = [1.1, 8.2, 9.2, 1.9, 3.4, 6.7, 5.6, 2.3, 7.8, 0.8, 4.5, 3.2];
  
  // 计算生肖索引（0-11，对应子到亥）
  const zodiacIndex = (year - 4) % 12;
  
  // 根据性别调整骨重
  let baseWeight = yearBone[zodiacIndex] + monthBone[month - 1] + dayBone[day % 12] + hourBone[hour % 12];
  if (gender === '女') {
    baseWeight = baseWeight * 0.98;
  }
  
  return parseFloat(baseWeight.toFixed(1));
}

// 称骨评语
export function getBoneWeightComment(weight: number): string {
  if (weight <= 10) {
    return "骨重过轻，一生清贫，勤劳为本，中年后福缘较好";
  } else if (weight <= 20) {
    return "骨重适中偏轻，一生起伏较大，早年辛苦，中晚年可有小康";
  } else if (weight <= 30) {
    return "骨重中等，人生中平，不富不贫，平淡中有波折，晚年尚可";
  } else if (weight <= 40) {
    return "骨重适中偏重，事业有成，中年前后为人生高峰，财运不错";
  } else if (weight <= 50) {
    return "骨重较重，福寿双全，一生衣食无忧，财运亨通，贵人相助";
  } else {
    return "骨重极重，大富大贵，但需谨防因福中生祸，注意行善积德";
  }
}

// 十二时辰 (12 Time Periods)
export const TIME_PERIODS = [
  { start: 23, end: 1, branch: '子', name: '子时' },
  { start: 1, end: 3, branch: '丑', name: '丑时' },
  { start: 3, end: 5, branch: '寅', name: '寅时' },
  { start: 5, end: 7, branch: '卯', name: '卯时' },
  { start: 7, end: 9, branch: '辰', name: '辰时' },
  { start: 9, end: 11, branch: '巳', name: '巳时' },
  { start: 11, end: 13, branch: '午', name: '午时' },
  { start: 13, end: 15, branch: '未', name: '未时' },
  { start: 15, end: 17, branch: '申', name: '申时' },
  { start: 17, end: 19, branch: '酉', name: '酉时' },
  { start: 19, end: 21, branch: '戌', name: '戌时' },
  { start: 21, end: 23, branch: '亥', name: '亥时' }
];

// 十神 (Ten Gods)
export const TEN_GODS: Record<string, Record<string, string>> = {
  '甲': { '甲': '比肩', '乙': '劫财', '丙': '食神', '丁': '伤官', '戊': '偏财', '己': '正财', '庚': '七杀', '辛': '正官', '壬': '偏印', '癸': '正印' },
  '乙': { '甲': '劫财', '乙': '比肩', '丙': '伤官', '丁': '食神', '戊': '正财', '己': '偏财', '庚': '正官', '辛': '七杀', '壬': '正印', '癸': '偏印' },
  '丙': { '甲': '偏印', '乙': '正印', '丙': '比肩', '丁': '劫财', '戊': '食神', '己': '伤官', '庚': '偏财', '辛': '正财', '壬': '七杀', '癸': '正官' },
  '丁': { '甲': '正印', '乙': '偏印', '丙': '劫财', '丁': '比肩', '戊': '伤官', '己': '食神', '庚': '正财', '辛': '偏财', '壬': '正官', '癸': '七杀' },
  '戊': { '甲': '七杀', '乙': '正官', '丙': '偏印', '丁': '正印', '戊': '比肩', '己': '劫财', '庚': '食神', '辛': '伤官', '壬': '偏财', '癸': '正财' },
  '己': { '甲': '正官', '乙': '七杀', '丙': '正印', '丁': '偏印', '戊': '劫财', '己': '比肩', '庚': '伤官', '辛': '食神', '壬': '正财', '癸': '偏财' },
  '庚': { '甲': '偏财', '乙': '正财', '丙': '七杀', '丁': '正官', '戊': '偏印', '己': '正印', '庚': '比肩', '辛': '劫财', '壬': '食神', '癸': '伤官' },
  '辛': { '甲': '正财', '乙': '偏财', '丙': '正官', '丁': '七杀', '戊': '正印', '己': '偏印', '庚': '劫财', '辛': '比肩', '壬': '伤官', '癸': '食神' },
  '壬': { '甲': '食神', '乙': '伤官', '丙': '偏财', '丁': '正财', '戊': '七杀', '己': '正官', '庚': '偏印', '辛': '正印', '壬': '比肩', '癸': '劫财' },
  '癸': { '甲': '伤官', '乙': '食神', '丙': '正财', '丁': '偏财', '戊': '正官', '己': '七杀', '庚': '正印', '辛': '偏印', '壬': '劫财', '癸': '比肩' }
};

// 计算某个小时对应的时辰
export function getTimePeriod(hour: number): { branch: string; name: string } {
  const period = TIME_PERIODS.find(period => {
    if (period.start < period.end) {
      return hour >= period.start && hour < period.end;
    } else {
      return hour >= period.start || hour < period.end;
    }
  });

  return period || { branch: '子', name: '子时' };
}

// 计算干支纪年
export function getStemBranchYear(year: number): { stem: string; branch: string } {
  const stemIndex = (year - 4) % 10;
  const branchIndex = (year - 4) % 12;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex]
  };
}

// 计算干支纪月
export function getStemBranchMonth(year: number, month: number): { stem: string; branch: string } {
  // 计算当年的立春是几号
  // 简化算法，正月起寅
  const yearStem = getStemBranchYear(year).stem;
  const stemIndex = HEAVENLY_STEMS.indexOf(yearStem);
  
  // 月干公式：年干 × 2 + 月数，取余数
  const monthStemIndex = (stemIndex * 2 + month) % 10;
  
  // 月支：寅卯辰巳午未申酉戌亥子丑
  const monthBranchIndex = (month + 2) % 12;
  
  return {
    stem: HEAVENLY_STEMS[monthStemIndex],
    branch: EARTHLY_BRANCHES[monthBranchIndex]
  };
}

// 计算干支纪日
export function getStemBranchDay(date: moment.Moment): { stem: string; branch: string } {
  // 甲子日期基准: 1984-1-10
  const baseDate = moment('1984-01-10');
  const days = date.diff(baseDate, 'days');
  
  const stemIndex = (days % 10 + 10) % 10;
  const branchIndex = (days % 12 + 12) % 12;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex]
  };
}

// 计算干支纪时
export function getStemBranchTime(dayStem: string, hour: number): { stem: string; branch: string; name: string } {
  const timePeriod = getTimePeriod(hour);
  const branchIndex = EARTHLY_BRANCHES.indexOf(timePeriod.branch);
  
  // 计算时干
  const dayIndex = HEAVENLY_STEMS.indexOf(dayStem);
  let timeBaseIndex;
  
  // 甲己日起甲子时、乙庚日起丙子时、丙辛日起戊子时、丁壬日起庚子时、戊癸日起壬子时
  switch (dayIndex % 5) {
    case 0: // 甲己
      timeBaseIndex = 0; // 甲
      break;
    case 1: // 乙庚
      timeBaseIndex = 2; // 丙
      break;
    case 2: // 丙辛
      timeBaseIndex = 4; // 戊
      break;
    case 3: // 丁壬
      timeBaseIndex = 6; // 庚
      break;
    case 4: // 戊癸
      timeBaseIndex = 8; // 壬
      break;
    default:
      timeBaseIndex = 0;
  }
  
  const stemIndex = (timeBaseIndex + branchIndex) % 10;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: timePeriod.branch,
    name: timePeriod.name
  };
}

// 计算八字
export function calculateBazi(dateTime: moment.Moment): {
  year: { stem: string; branch: string; element: string; hidden: string[] };
  month: { stem: string; branch: string; element: string; hidden: string[] };
  day: { stem: string; branch: string; element: string; hidden: string[] };
  time: { stem: string; branch: string; element: string; hidden: string[]; name: string };
  lunarDate: string;
} {
  const year = dateTime.year();
  const month = dateTime.month() + 1; // 月份从1开始
  const day = dateTime.date();
  const hour = dateTime.hour();
  
  const yearSB = getStemBranchYear(year);
  const monthSB = getStemBranchMonth(year, month);
  const daySB = getStemBranchDay(dateTime);
  const timeSB = getStemBranchTime(daySB.stem, hour);
  
  // 农历日期格式化 (简化版)
  const lunarDate = `${year}年${month}月${day}日 ${timeSB.name}`;
  
  return {
    year: {
      stem: yearSB.stem,
      branch: yearSB.branch,
      element: STEMS_ELEMENTS[yearSB.stem],
      hidden: HIDDEN_STEMS[yearSB.branch]
    },
    month: {
      stem: monthSB.stem,
      branch: monthSB.branch,
      element: STEMS_ELEMENTS[monthSB.stem],
      hidden: HIDDEN_STEMS[monthSB.branch]
    },
    day: {
      stem: daySB.stem,
      branch: daySB.branch,
      element: STEMS_ELEMENTS[daySB.stem],
      hidden: HIDDEN_STEMS[daySB.branch]
    },
    time: {
      stem: timeSB.stem,
      branch: timeSB.branch,
      element: STEMS_ELEMENTS[timeSB.stem],
      hidden: HIDDEN_STEMS[timeSB.branch],
      name: timeSB.name
    },
    lunarDate
  };
}

// 计算五行生克关系
export function calculateElementRelationships(bazi: ReturnType<typeof calculateBazi>): Record<string, number> {
  const elements: Record<string, number> = {
    '木': 0, '火': 0, '土': 0, '金': 0, '水': 0
  };
  
  // 计算天干五行
  elements[bazi.year.element]++;
  elements[bazi.month.element]++;
  elements[bazi.day.element]++;
  elements[bazi.time.element]++;
  
  // 计算地支五行
  elements[BRANCHES_ELEMENTS[bazi.year.branch]]++;
  elements[BRANCHES_ELEMENTS[bazi.month.branch]]++;
  elements[BRANCHES_ELEMENTS[bazi.day.branch]]++;
  elements[BRANCHES_ELEMENTS[bazi.time.branch]]++;
  
  // 计算地支藏干五行
  bazi.year.hidden.forEach(stem => elements[STEMS_ELEMENTS[stem]] += 0.5);
  bazi.month.hidden.forEach(stem => elements[STEMS_ELEMENTS[stem]] += 0.5);
  bazi.day.hidden.forEach(stem => elements[STEMS_ELEMENTS[stem]] += 0.5);
  bazi.time.hidden.forEach(stem => elements[STEMS_ELEMENTS[stem]] += 0.5);
  
  return elements;
}

// 获取十神名称
export function getTenGod(dayStem: string, otherStem: string): string {
  return TEN_GODS[dayStem][otherStem] || '';
}

// 计算日主的十神关系
export function calculateTenGods(bazi: ReturnType<typeof calculateBazi>): {
  year: string;
  month: string;
  time: string;
  yearBranch: string[];
  monthBranch: string[];
  dayBranch: string[];
  timeBranch: string[];
} {
  const dayStem = bazi.day.stem;
  
  return {
    year: getTenGod(dayStem, bazi.year.stem),
    month: getTenGod(dayStem, bazi.month.stem),
    time: getTenGod(dayStem, bazi.time.stem),
    yearBranch: bazi.year.hidden.map(stem => getTenGod(dayStem, stem)),
    monthBranch: bazi.month.hidden.map(stem => getTenGod(dayStem, stem)),
    dayBranch: bazi.day.hidden.map(stem => getTenGod(dayStem, stem)),
    timeBranch: bazi.time.hidden.map(stem => getTenGod(dayStem, stem))
  };
}

// 将五行强度转化为状态描述
export function getElementStatus(value: number): string {
  if (value >= 4) return '旺';
  if (value >= 3) return '相';
  if (value >= 2) return '平';
  if (value >= 1) return '弱';
  return '休';
}

// 获取日主五行强弱
export function getDayMasterStrength(bazi: ReturnType<typeof calculateBazi>): {
  element: string;
  value: number;
  status: string;
} {
  const relationships = calculateElementRelationships(bazi);
  const element = STEMS_ELEMENTS[bazi.day.stem];
  const value = relationships[element];
  
  return {
    element,
    value,
    status: getElementStatus(value)
  };
}

// 五行生克关系
export function getElementRelation(element1: string, element2: string): string {
  const relations: Record<string, Record<string, string>> = {
    '木': { '木': '比和', '火': '生', '土': '克', '金': '被克', '水': '被生' },
    '火': { '木': '被生', '火': '比和', '土': '生', '金': '克', '水': '被克' },
    '土': { '木': '被克', '火': '被生', '土': '比和', '金': '生', '水': '克' },
    '金': { '木': '克', '火': '被克', '土': '被生', '金': '比和', '水': '生' },
    '水': { '木': '生', '火': '克', '土': '被克', '金': '被生', '水': '比和' }
  };
  
  return relations[element1][element2];
}

// 获取用神和忌神
export function getUsefulGods(bazi: ReturnType<typeof calculateBazi>): {
  useful: string[];
  avoid: string[];
} {
  const dayMaster = getDayMasterStrength(bazi);
  const useful: string[] = [];
  const avoid: string[] = [];
  
  // 根据日主旺衰确定用神和忌神
  if (['旺', '相'].includes(dayMaster.status)) {
    // 日主偏旺，用抑制的方法
    // 用神取日主所克的五行和克日主的五行
    switch (dayMaster.element) {
      case '木':
        useful.push('金', '土');
        avoid.push('木', '水');
        break;
      case '火':
        useful.push('水', '金');
        avoid.push('火', '木');
        break;
      case '土':
        useful.push('木', '水');
        avoid.push('土', '火');
        break;
      case '金':
        useful.push('火', '木');
        avoid.push('金', '土');
        break;
      case '水':
        useful.push('土', '火');
        avoid.push('水', '金');
        break;
    }
  } else {
    // 日主偏弱，用扶助的方法
    // 用神取生日主的五行和日主所生的五行
    switch (dayMaster.element) {
      case '木':
        useful.push('水', '火');
        avoid.push('金', '土');
        break;
      case '火':
        useful.push('木', '土');
        avoid.push('水', '金');
        break;
      case '土':
        useful.push('火', '金');
        avoid.push('木', '水');
        break;
      case '金':
        useful.push('土', '水');
        avoid.push('火', '木');
        break;
      case '水':
        useful.push('金', '木');
        avoid.push('土', '火');
        break;
    }
  }
  
  return { useful, avoid };
} 