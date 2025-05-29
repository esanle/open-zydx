import moment from 'moment';
import { getLunar } from 'chinese-lunar-calendar';

// 天干 (Heavenly Stems)
export const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支 (Earthly Branches)
export const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 五行 (Five Elements)
export const FIVE_ELEMENTS = ['木', '火', '土', '金', '水'];

// 天干五行 (Heavenly Stems' Five Elements)
export const STEMS_ELEMENTS = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

// 地支五行 (Earthly Branches' Five Elements)
export const BRANCHES_ELEMENTS = {
  '子': '水', '丑': '土',
  '寅': '木', '卯': '木',
  '辰': '土', '巳': '火',
  '午': '火', '未': '土',
  '申': '金', '酉': '金',
  '戌': '土', '亥': '水'
};

// 地支藏干 (Hidden Stems in Earthly Branches)
export const HIDDEN_STEMS = {
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

// 十二长生 (Twelve Growth Stages)
export const TWELVE_STAGES = {
  '长生': 1, '沐浴': 2, '冠带': 3, '临官': 4, '帝旺': 5, '衰': 6,
  '病': 7, '死': 8, '墓': 9, '绝': 10, '胎': 11, '养': 12
};

// 阴阳属性 (Yin-Yang Properties)
export const YIN_YANG = {
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
export const SOUND_ELEMENTS = {
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

// 计算八字 (Calculate BaZi)
export function calculateBazi(date) {
  // Convert input date to a moment object
  const birthDate = moment(date);
  
  // Get solar date components
  const year = birthDate.year();
  const month = birthDate.month() + 1; // Month is 0-indexed in moment
  const day = birthDate.date();
  const hour = birthDate.hour();
  
  // Convert to lunar date using getLunar
  const lunar = getLunar(year, month, day);
  
  // Extract year stem and branch from lunar.lunarYear (e.g., "甲子年")
  const yearStem = lunar.lunarYear.charAt(0);  // First character is the stem
  const yearBranch = lunar.lunarYear.charAt(1); // Second character is the branch
  
  // Calculate month pillar
  // The first month stem is associated with the year stem
  const baseMonthStem = HEAVENLY_STEMS.indexOf(yearStem) * 2 + 1; // First month stem index
  const monthStemIndex = (baseMonthStem + (lunar.lunarMonth - 1)) % 10;
  const monthStem = HEAVENLY_STEMS[monthStemIndex];
  const monthBranch = EARTHLY_BRANCHES[(lunar.lunarMonth + 1) % 12];
  
  // Calculate day pillar
  // This is a complex calculation based on the day's position in the sexagenary cycle
  // For simplicity, we'll calculate the days since a reference date
  const epochDate = moment('1900-01-31'); // A reference date (甲子日)
  const daysDiff = birthDate.diff(epochDate, 'days');
  const dayStemIndex = daysDiff % 10;
  const dayBranchIndex = daysDiff % 12;
  
  const dayStem = HEAVENLY_STEMS[dayStemIndex];
  const dayBranch = EARTHLY_BRANCHES[dayBranchIndex];
  
  // Calculate hour pillar
  // Hour pillar is determined by the day stem and the hour
  const hourBranchIndex = Math.floor(hour / 2) % 12;
  const baseHourStem = HEAVENLY_STEMS.indexOf(dayStem) * 2; // First hour stem index
  const hourStemIndex = (baseHourStem + Math.floor(hour / 2)) % 10;
  
  const hourStem = HEAVENLY_STEMS[hourStemIndex];
  const hourBranch = EARTHLY_BRANCHES[hourBranchIndex];
  
  // Create the BaZi pillars
  const pillars = [
    { stem: yearStem, branch: yearBranch, name: '年柱' },
    { stem: monthStem, branch: monthBranch, name: '月柱' },
    { stem: dayStem, branch: dayBranch, name: '日柱' },
    { stem: hourStem, branch: hourBranch, name: '时柱' }
  ];
  
  // Add element information to each component
  pillars.forEach(pillar => {
    pillar.stemElement = STEMS_ELEMENTS[pillar.stem];
    pillar.branchElement = BRANCHES_ELEMENTS[pillar.branch];
    pillar.hiddenStems = HIDDEN_STEMS[pillar.branch];
    pillar.stemYinYang = YIN_YANG[pillar.stem];
    pillar.branchYinYang = YIN_YANG[pillar.branch];
    pillar.soundElement = SOUND_ELEMENTS[pillar.stem + pillar.branch];
  });
  
  // Create the complete BaZi chart
  return {
    solarDate: {
      year, month, day, hour,
      formatted: birthDate.format('YYYY-MM-DD HH:mm')
    },
    lunarDate: {
      year: lunar.lunarYear.slice(0, -1), // Remove the "年" character
      month: lunar.lunarMonth,
      day: lunar.lunarDate,
      formatted: `${lunar.lunarYear.slice(0, -1)}年${lunar.lunarMonth}月${lunar.lunarDate}日`,
      dateStr: lunar.dateStr // Include the traditional date string
    },
    pillars
  };
}

// 计算五行生克关系 (Calculate Five Elements Relationships)
export function calculateElementRelationships(bazi) {
  const relationships = [];
  const elements = {
    '木': 0, '火': 0, '土': 0, '金': 0, '水': 0
  };
  
  // Count elements in the chart
  bazi.pillars.forEach(pillar => {
    // Count stem elements
    elements[pillar.stemElement]++;
    
    // Count branch elements
    elements[pillar.branchElement]++;
    
    // Count hidden stem elements
    pillar.hiddenStems.forEach(hiddenStem => {
      elements[STEMS_ELEMENTS[hiddenStem]]++;
    });
  });
  
  // Determine element strengths
  const elementStrengths = {};
  for (const element in elements) {
    let strength = elements[element];
    
    // Adjust for natural relationships
    switch (element) {
      case '木':
        strength += elements['水'] * 0.5; // Water generates Wood
        strength -= elements['金'] * 0.5; // Metal controls Wood
        break;
      case '火':
        strength += elements['木'] * 0.5; // Wood generates Fire
        strength -= elements['水'] * 0.5; // Water controls Fire
        break;
      case '土':
        strength += elements['火'] * 0.5; // Fire generates Earth
        strength -= elements['木'] * 0.5; // Wood controls Earth
        break;
      case '金':
        strength += elements['土'] * 0.5; // Earth generates Metal
        strength -= elements['火'] * 0.5; // Fire controls Metal
        break;
      case '水':
        strength += elements['金'] * 0.5; // Metal generates Water
        strength -= elements['土'] * 0.5; // Earth controls Water
        break;
    }
    
    elementStrengths[element] = strength;
  }
  
  // Calculate relationships
  for (const element in elementStrengths) {
    relationships.push({
      element,
      count: elements[element],
      strength: elementStrengths[element],
      status: determineElementStatus(elementStrengths[element])
    });
  }
  
  return relationships.sort((a, b) => b.strength - a.strength);
}

// 确定五行状态 (Determine Element Status)
function determineElementStatus(strength) {
  if (strength >= 4) return '旺';
  if (strength >= 3) return '相';
  if (strength >= 2) return '平';
  if (strength >= 1) return '弱';
  return '休';
}

// 计算日主五行强弱 (Calculate Day Master Strength)
export function calculateDayMasterStrength(bazi) {
  const dayMasterElement = STEMS_ELEMENTS[bazi.pillars[2].stem]; // Day stem's element
  const relationships = calculateElementRelationships(bazi);
  
  // Find the day master element in relationships
  const dayMasterInfo = relationships.find(rel => rel.element === dayMasterElement);
  
  return {
    element: dayMasterElement,
    strength: dayMasterInfo.strength,
    status: dayMasterInfo.status
  };
}

// 计算命局喜忌 (Calculate Favorable and Unfavorable Elements)
export function calculateFavorableElements(bazi) {
  const dayMaster = calculateDayMasterStrength(bazi);
  const favorable = [];
  const unfavorable = [];
  
  // Logic for determining favorable and unfavorable elements
  // This is simplified; in real BaZi analysis, it depends on many factors
  if (dayMaster.status === '旺' || dayMaster.status === '相') {
    // If day master is strong, need controlling and weakening elements
    const controllingElement = getControllingElement(dayMaster.element);
    const controlledByDayMaster = getControlledElement(dayMaster.element);
    
    favorable.push(controllingElement); // Element that controls day master
    unfavorable.push(getGeneratingElement(dayMaster.element)); // Element that strengthens day master
    unfavorable.push(controlledByDayMaster); // Element controlled by day master
  } else {
    // If day master is weak, need strengthening elements
    const generatingElement = getGeneratingElement(dayMaster.element);
    const generatedByDayMaster = getGeneratedElement(dayMaster.element);
    
    favorable.push(generatingElement); // Element that generates day master
    favorable.push(generatedByDayMaster); // Element generated by day master
    unfavorable.push(getControllingElement(dayMaster.element)); // Element that controls day master
  }
  
  return { favorable, unfavorable };
}

// Helper functions for five elements relationships

// 获取生我的五行 (Get Element that Generates Me)
function getGeneratingElement(element) {
  const generationCycle = ['木', '火', '土', '金', '水'];
  const index = generationCycle.indexOf(element);
  return generationCycle[(index - 1 + 5) % 5]; // Previous element in cycle
}

// 获取我生的五行 (Get Element that I Generate)
function getGeneratedElement(element) {
  const generationCycle = ['木', '火', '土', '金', '水'];
  const index = generationCycle.indexOf(element);
  return generationCycle[(index + 1) % 5]; // Next element in cycle
}

// 获取克我的五行 (Get Element that Controls Me)
function getControllingElement(element) {
  const controlCycle = {
    '木': '金', // Metal controls Wood
    '火': '水', // Water controls Fire
    '土': '木', // Wood controls Earth
    '金': '火', // Fire controls Metal
    '水': '土'  // Earth controls Water
  };
  
  return controlCycle[element];
}

// 获取我克的五行 (Get Element that I Control)
function getControlledElement(element) {
  const controlCycle = {
    '金': '木', // Metal controls Wood
    '水': '火', // Water controls Fire
    '木': '土', // Wood controls Earth
    '火': '金', // Fire controls Metal
    '土': '水'  // Earth controls Water
  };
  
  return controlCycle[element];
} 