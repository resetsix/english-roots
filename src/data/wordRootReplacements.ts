import type { WordExample, WordRoot } from '@/data/wordRoots'

const baseWordRootReplacements: WordRoot[] = [
  {
    id: 231,
    root: 'alt',
    origin: 'Latin',
    meaning: '高',
    meaningEn: 'high',
    description: `alt 就像是向上看，和高度、提升有关。altitude 就是测量出来的高度。`,
    examples: [
      {
        word: 'altitude',
        breakdown: { prefix: '', root: 'alt', suffix: 'itude' },
        meaning: '高度',
        explanation: '高 + 变成名词→高度',
      },
      {
        word: 'exalt',
        breakdown: { prefix: 'ex', root: 'alt', suffix: '' },
        meaning: '提升',
        explanation: '向外 + 高→提升',
      },
    ],
    quiz: {
      question: 'alt 这个词根的意思是什么？',
      options: ['高', '低', '快', '慢'],
      correctAnswer: 0,
    },
  },
  {
    id: 232,
    root: 'am/amat',
    origin: 'Latin',
    meaning: '爱',
    meaningEn: 'love',
    description: `am 和 amat 代表喜爱和感情。amateur 指的是出于热爱才去做的人，也就是业余爱好者。`,
    examples: [
      {
        word: 'amateur',
        breakdown: { prefix: '', root: 'amat', suffix: 'eur' },
        meaning: '业余爱好者',
        explanation: '爱 + 做这事的人→业余爱好者',
      },
      {
        word: 'amiable',
        breakdown: { prefix: '', root: 'ami', suffix: 'able' },
        meaning: '和蔼可亲的',
        explanation: '爱 + 可以...的→和蔼可亲的',
      },
    ],
    quiz: {
      question: 'amat 这个词根的意思是什么？',
      options: ['恨', '爱', '看', '听'],
      correctAnswer: 1,
    },
  },
  {
    id: 233,
    root: 'apt/ept',
    origin: 'Latin',
    meaning: '适合',
    meaningEn: 'fit',
    description: `apt 和 ept 指的是合适、刚好对上。adapt 就是调整自己去适合新环境。`,
    examples: [
      {
        word: 'adapt',
        breakdown: { prefix: 'ad', root: 'apt', suffix: '' },
        meaning: '适应',
        explanation: '朝向 + 适合→适应',
      },
      {
        word: 'aptitude',
        breakdown: { prefix: '', root: 'apt', suffix: 'itude' },
        meaning: '天赋',
        explanation: '适合 + 变成名词→天赋',
      },
    ],
    quiz: {
      question: 'apt 这个词根的意思是什么？',
      options: ['跑', '抓', '适合', '改变'],
      correctAnswer: 2,
    },
  },
  {
    id: 234,
    root: 'arm',
    origin: 'Latin',
    meaning: '武器',
    meaningEn: 'weapon',
    description: `arm 本意是手臂，后来也指握在手里的武器。army 就是带着武器的军队。`,
    examples: [
      {
        word: 'army',
        breakdown: { prefix: '', root: 'arm', suffix: 'y' },
        meaning: '军队',
        explanation: '武器 + 变成名词→军队',
      },
      {
        word: 'disarm',
        breakdown: { prefix: 'dis', root: 'arm', suffix: '' },
        meaning: '缴械',
        explanation: '去除 + 武器→缴械',
      },
    ],
    quiz: {
      question: 'arm 这个词根的意思是什么？',
      options: ['武器', '食物', '金钱', '房屋'],
      correctAnswer: 0,
    },
  },
  {
    id: 235,
    root: 'art',
    origin: 'Latin',
    meaning: '技巧 / 艺术',
    meaningEn: 'skill / art',
    description: `art 指通过练习掌握的技巧，后来也指艺术。artist 就是靠技巧和艺术创作的人。`,
    examples: [
      {
        word: 'artist',
        breakdown: { prefix: '', root: 'art', suffix: 'ist' },
        meaning: '艺术家',
        explanation: '艺术 + 做这事的人→艺术家',
      },
      {
        word: 'artful',
        breakdown: { prefix: '', root: 'art', suffix: 'ful' },
        meaning: '巧妙的',
        explanation: '技巧 + 充满...的→巧妙的',
      },
    ],
    quiz: {
      question: 'art 的意思是什么？',
      options: ['技巧 / 艺术', '自然', '科学', '动物'],
      correctAnswer: 0,
    },
  },
  {
    id: 236,
    root: 'bat',
    origin: 'Latin',
    meaning: '打',
    meaningEn: 'beat',
    description: `bat 代表击打的动作。combat 就是双方一起打，也就是搏斗。`,
    examples: [
      {
        word: 'combat',
        breakdown: { prefix: 'com', root: 'bat', suffix: '' },
        meaning: '搏斗',
        explanation: '一起 + 打→搏斗',
      },
      {
        word: 'batter',
        breakdown: { prefix: '', root: 'bat', suffix: 'er' },
        meaning: '击球手',
        explanation: '打 + 做这事的人→击球手',
      },
    ],
    quiz: {
      question: 'bat 这个词根的意思是什么？',
      options: ['跑', '打', '笑', '吃'],
      correctAnswer: 1,
    },
  },
  {
    id: 237,
    root: 'bel/bell',
    origin: 'Latin',
    meaning: '战争',
    meaningEn: 'war',
    description: `bell 代表战争和冲突。rebellion 就是反着打起来，引申为反叛。`,
    examples: [
      {
        word: 'rebel',
        breakdown: { prefix: 're', root: 'bel', suffix: '' },
        meaning: '反叛',
        explanation: '相反 + 战争→反叛',
      },
      {
        word: 'rebellion',
        breakdown: { prefix: 're', root: 'bell', suffix: 'ion' },
        meaning: '反叛',
        explanation: '相反 + 战争 + 变成名词→反叛',
      },
    ],
    quiz: {
      question: 'bell 这个词根的意思是什么？',
      options: ['美丽', '铃铛', '战争', '和平'],
      correctAnswer: 2,
    },
  },
  {
    id: 238,
    root: 'camp',
    origin: 'Latin',
    meaning: '田野 / 营地',
    meaningEn: 'field',
    description: `camp 指开阔的空地或营地。campus 就是有大片空地的校园。`,
    examples: [
      {
        word: 'campus',
        breakdown: { prefix: '', root: 'camp', suffix: 'us' },
        meaning: '校园',
        explanation: '营地 + 变成名词→校园',
      },
      {
        word: 'camp',
        breakdown: { prefix: '', root: 'camp', suffix: '' },
        meaning: '营地',
        explanation: '营地→营地',
      },
    ],
    quiz: {
      question: 'camp 这个词根的意思是什么？',
      options: ['河流', '天空', '森林', '田野 / 营地'],
      correctAnswer: 3,
    },
  },
  {
    id: 239,
    root: 'cant/cent',
    origin: 'Latin',
    meaning: '唱',
    meaningEn: 'sing',
    description: `cant 和 cent 都和唱歌、发声有关。accent 强调发音时的声调，也就是口音。`,
    examples: [
      {
        word: 'accent',
        breakdown: { prefix: 'ac', root: 'cent', suffix: '' },
        meaning: '口音',
        explanation: '朝向 + 唱→口音',
      },
      {
        word: 'chant',
        breakdown: { prefix: '', root: 'chant', suffix: '' },
        meaning: '吟唱',
        explanation: '唱→吟唱',
      },
    ],
    quiz: {
      question: 'cent 在这里的意思是什么？',
      options: ['唱', '跑', '一百', '中心'],
      correctAnswer: 0,
    },
  },
  {
    id: 240,
    root: 'carn',
    origin: 'Latin',
    meaning: '肉',
    meaningEn: 'flesh',
    description: `carn 让人联想到肉食。carnivore 就是专门吃肉的动物。`,
    examples: [
      {
        word: 'carnivore',
        breakdown: { prefix: '', root: 'carn', suffix: 'ivore' },
        meaning: '食肉动物',
        explanation: '肉 + 吞食→食肉动物',
      },
      {
        word: 'carnivorous',
        breakdown: { prefix: '', root: 'carn', suffix: 'ivorous' },
        meaning: '食肉的',
        explanation: '肉 + 变成形容词→食肉的',
      },
    ],
    quiz: {
      question: 'carn 这个词根的意思是什么？',
      options: ['菜', '果', '肉', '骨'],
      correctAnswer: 2,
    },
  },
  {
    id: 241,
    root: 'caus/cus',
    origin: 'Latin',
    meaning: '原因',
    meaningEn: 'cause',
    description: `caus 和 cus 代表造成某事的原因。excuse 就是把原因往外推，也就是找借口。`,
    examples: [
      {
        word: 'excuse',
        breakdown: { prefix: 'ex', root: 'cus', suffix: 'e' },
        meaning: '借口',
        explanation: '向外 + 原因→借口',
      },
      {
        word: 'cause',
        breakdown: { prefix: '', root: 'caus', suffix: 'e' },
        meaning: '原因',
        explanation: '原因 + 变成名词→原因',
      },
    ],
    quiz: {
      question: 'cus 这个词根的意思是什么？',
      options: ['结果', '原因', '开始', '结束'],
      correctAnswer: 1,
    },
  },
  {
    id: 242,
    root: 'center/centr',
    origin: 'Greek',
    meaning: '中心',
    meaningEn: 'center',
    description: `centr 就是核心和中心。concentrate 把注意力聚到一个中心，就是集中。`,
    examples: [
      {
        word: 'central',
        breakdown: { prefix: '', root: 'centr', suffix: 'al' },
        meaning: '中心的',
        explanation: '中心 + 变成形容词→中心的',
      },
      {
        word: 'concentrate',
        breakdown: { prefix: 'con', root: 'centr', suffix: 'ate' },
        meaning: '集中',
        explanation: '一起 + 中心 + 变成动词→集中',
      },
    ],
    quiz: {
      question: 'centr 的意思是什么？',
      options: ['边缘', '中心', '顶部', '底部'],
      correctAnswer: 1,
    },
  },
  {
    id: 243,
    root: 'cert',
    origin: 'Latin',
    meaning: '确定',
    meaningEn: 'sure',
    description: `cert 就是让人确信无疑。certain 表示一件事是确定的。`,
    examples: [
      {
        word: 'certain',
        breakdown: { prefix: '', root: 'cert', suffix: 'ain' },
        meaning: '确定的',
        explanation: '确定 + 变成形容词→确定的',
      },
      {
        word: 'certify',
        breakdown: { prefix: '', root: 'cert', suffix: 'ify' },
        meaning: '证明',
        explanation: '确定 + 变成动词→证明',
      },
    ],
    quiz: {
      question: 'cert 这个词根的意思是什么？',
      options: ['犹豫', '确定', '怀疑', '猜测'],
      correctAnswer: 1,
    },
  },
  {
    id: 244,
    root: 'cid/cis',
    origin: 'Latin',
    meaning: '切',
    meaningEn: 'cut',
    description: `cid 和 cis 像剪刀一样，代表切断。decide 就像把犹豫切掉，下定决心。`,
    examples: [
      {
        word: 'decide',
        breakdown: { prefix: 'de', root: 'cid', suffix: 'e' },
        meaning: '决定',
        explanation: '向下 + 切→决定',
      },
      {
        word: 'precise',
        breakdown: { prefix: 'pre', root: 'cis', suffix: 'e' },
        meaning: '精确的',
        explanation: '提前 + 切好→精确的',
      },
    ],
    quiz: {
      question: 'cid / cis 的意思是什么？',
      options: ['贴', '粘', '切', '补'],
      correctAnswer: 2,
    },
  },
  {
    id: 245,
    root: 'civ',
    origin: 'Latin',
    meaning: '公民',
    meaningEn: 'citizen',
    description: `civ 和城市里的居民有关。civil 指的是公民之间的事。`,
    examples: [
      {
        word: 'civil',
        breakdown: { prefix: '', root: 'civ', suffix: 'il' },
        meaning: '公民的',
        explanation: '公民 + 变成形容词→公民的',
      },
      {
        word: 'civilian',
        breakdown: { prefix: '', root: 'civ', suffix: 'ian' },
        meaning: '平民',
        explanation: '公民 + 变成名词→平民',
      },
    ],
    quiz: {
      question: 'civ 的意思是什么？',
      options: ['外星人', '国王', '公民', '敌人'],
      correctAnswer: 2,
    },
  },
  {
    id: 246,
    root: 'claim/clam',
    origin: 'Latin',
    meaning: '呼喊',
    meaningEn: 'shout',
    description: `claim 代表大声说出来。exclaim 就是忍不住向外呼喊出声，也就是惊叫。`,
    examples: [
      {
        word: 'exclaim',
        breakdown: { prefix: 'ex', root: 'claim', suffix: '' },
        meaning: '惊叫',
        explanation: '向外 + 呼喊→惊叫',
      },
      {
        word: 'proclaim',
        breakdown: { prefix: 'pro', root: 'claim', suffix: '' },
        meaning: '宣布',
        explanation: '向前 + 呼喊→宣布',
      },
    ],
    quiz: {
      question: 'claim 的意思是什么？',
      options: ['耳语', '呼喊', '哭泣', '微笑'],
      correctAnswer: 1,
    },
  },
  {
    id: 247,
    root: 'clar',
    origin: 'Latin',
    meaning: '清楚',
    meaningEn: 'clear',
    description: `clar 就像水变清澈一样。clarify 就是把一件模糊的事解释清楚。`,
    examples: [
      {
        word: 'clear',
        breakdown: { prefix: '', root: 'clear', suffix: '' },
        meaning: '清楚的',
        explanation: '清楚→清楚的',
      },
      {
        word: 'clarify',
        breakdown: { prefix: '', root: 'clar', suffix: 'ify' },
        meaning: '澄清',
        explanation: '清楚 + 变成动词→澄清',
      },
    ],
    quiz: {
      question: 'clar 这个词根的意思是什么？',
      options: ['清楚', '模糊', '黑', '白'],
      correctAnswer: 0,
    },
  },
  {
    id: 248,
    root: 'clin',
    origin: 'Latin',
    meaning: '倾斜',
    meaningEn: 'lean',
    description: `clin 就像一个斜坡。incline 是向某个方向倾斜，引申为倾向。`,
    examples: [
      {
        word: 'decline',
        breakdown: { prefix: 'de', root: 'clin', suffix: 'e' },
        meaning: '下降 / 婉拒',
        explanation: '向下 + 倾斜→下降',
      },
      {
        word: 'incline',
        breakdown: { prefix: 'in', root: 'clin', suffix: 'e' },
        meaning: '倾向 / 倾斜',
        explanation: '向内 + 倾斜→倾向',
      },
    ],
    quiz: {
      question: 'clin 的意思是什么？',
      options: ['平坦', '倾斜', '折断', '转圈'],
      correctAnswer: 1,
    },
  },
  {
    id: 249,
    root: 'clos/clud/clus',
    origin: 'Latin',
    meaning: '关闭',
    meaningEn: 'close',
    description: `clud 就是把门关上。include 是把某人关在门内，引申为包含。`,
    examples: [
      {
        word: 'include',
        breakdown: { prefix: 'in', root: 'clud', suffix: 'e' },
        meaning: '包含',
        explanation: '向内 + 关闭→包含',
      },
      {
        word: 'exclude',
        breakdown: { prefix: 'ex', root: 'clud', suffix: 'e' },
        meaning: '排除',
        explanation: '向外 + 关闭→排除',
      },
    ],
    quiz: {
      question: 'clud 的意思是什么？',
      options: ['打开', '关闭', '寻找', '看见'],
      correctAnswer: 1,
    },
  },
  {
    id: 250,
    root: 'cogn/gnos',
    origin: 'Latin',
    meaning: '知道',
    meaningEn: 'know',
    description: `cogn 代表大脑处理信息并知道它。recognize 就是再次认出某个熟人。`,
    examples: [
      {
        word: 'recognize',
        breakdown: { prefix: 're', root: 'cogn', suffix: 'ize' },
        meaning: '认出',
        explanation: '再次 + 知道 + 变成动词→认出',
      },
      {
        word: 'cognition',
        breakdown: { prefix: '', root: 'cogn', suffix: 'ition' },
        meaning: '认知',
        explanation: '知道 + 变成名词→认知',
      },
    ],
    quiz: {
      question: 'cogn 的意思是什么？',
      options: ['忘记', '知道', '猜想', '迷惑'],
      correctAnswer: 1,
    },
  },
  {
    id: 251,
    root: 'color',
    origin: 'Latin',
    meaning: '颜色',
    meaningEn: 'color',
    description: `color 就是眼睛看到的色彩。colorful 就是充满各种颜色的。`,
    examples: [
      {
        word: 'color',
        breakdown: { prefix: '', root: 'color', suffix: '' },
        meaning: '颜色',
        explanation: '颜色→颜色',
      },
      {
        word: 'colorful',
        breakdown: { prefix: '', root: 'color', suffix: 'ful' },
        meaning: '色彩丰富的',
        explanation: '颜色 + 充满...的→色彩丰富的',
      },
    ],
    quiz: {
      question: 'color 的意思是什么？',
      options: ['声音', '形状', '颜色', '气味'],
      correctAnswer: 2,
    },
  },
  {
    id: 252,
    root: 'cross/cruc',
    origin: 'Latin',
    meaning: '十字',
    meaningEn: 'cross',
    description: `cruc 就像十字路口。crucial 是站在关键十字路口，引申为关键的。`,
    examples: [
      {
        word: 'cross',
        breakdown: { prefix: '', root: 'cross', suffix: '' },
        meaning: '十字 / 穿过',
        explanation: '十字→穿过',
      },
      {
        word: 'crucial',
        breakdown: { prefix: '', root: 'cruc', suffix: 'ial' },
        meaning: '关键的',
        explanation: '十字 + 变成形容词→关键的',
      },
    ],
    quiz: {
      question: 'cruc 的意思是什么？',
      options: ['圆圈', '直线', '十字', '三角'],
      correctAnswer: 2,
    },
  },
  {
    id: 253,
    root: 'crust',
    origin: 'Latin',
    meaning: '外壳',
    meaningEn: 'shell',
    description: `crust 指物体外面那层坚硬的壳，比如面包皮或地壳。`,
    examples: [
      {
        word: 'crust',
        breakdown: { prefix: '', root: 'crust', suffix: '' },
        meaning: '地壳 / 外壳',
        explanation: '外壳→外壳',
      },
      {
        word: 'crusty',
        breakdown: { prefix: '', root: 'crust', suffix: 'y' },
        meaning: '有硬壳的',
        explanation: '外壳 + 变成形容词→有硬壳的',
      },
    ],
    quiz: {
      question: 'crust 的意思是什么？',
      options: ['内部', '核心', '外壳', '液体'],
      correctAnswer: 2,
    },
  },
  {
    id: 254,
    root: 'culp',
    origin: 'Latin',
    meaning: '罪',
    meaningEn: 'blame',
    description: `culp 总和做错事、怪罪有关。culpable 就是可以被怪罪的，也就是有罪的。`,
    examples: [
      {
        word: 'culpable',
        breakdown: { prefix: '', root: 'culp', suffix: 'able' },
        meaning: '有罪的',
        explanation: '罪 + 可以...的→有罪的',
      },
      {
        word: 'inculpate',
        breakdown: { prefix: 'in', root: 'culp', suffix: 'ate' },
        meaning: '归罪',
        explanation: '向内 + 罪 + 变成动词→归罪',
      },
    ],
    quiz: {
      question: 'culp 这个词根的意思是什么？',
      options: ['奖励', '功劳', '罪', '清白'],
      correctAnswer: 2,
    },
  },
  {
    id: 255,
    root: 'custom',
    origin: 'Latin',
    meaning: '习惯',
    meaningEn: 'habit',
    description: `custom 是长期养成的习惯和风俗。customer 是按习惯经常光顾的人。`,
    examples: [
      {
        word: 'custom',
        breakdown: { prefix: '', root: 'custom', suffix: '' },
        meaning: '风俗 / 习惯',
        explanation: '习惯→风俗',
      },
      {
        word: 'customer',
        breakdown: { prefix: '', root: 'custom', suffix: 'er' },
        meaning: '顾客',
        explanation: '习惯 + 做这事的人→顾客',
      },
    ],
    quiz: {
      question: 'custom 的意思是什么？',
      options: ['偶尔', '习惯', '陌生', '新鲜'],
      correctAnswer: 1,
    },
  },
  {
    id: 256,
    root: 'dam/demn',
    origin: 'Latin',
    meaning: '损害',
    meaningEn: 'loss',
    description: `dam 意味着破坏和损失。damage 就是对物品造成的损害。`,
    examples: [
      {
        word: 'damage',
        breakdown: { prefix: '', root: 'dam', suffix: 'age' },
        meaning: '损害',
        explanation: '损害 + 变成名词→损害',
      },
      {
        word: 'condemn',
        breakdown: { prefix: 'con', root: 'demn', suffix: '' },
        meaning: '谴责',
        explanation: '一起 + 损害名誉→谴责',
      },
    ],
    quiz: {
      question: 'dam 的意思是什么？',
      options: ['修复', '建设', '损害', '保护'],
      correctAnswer: 2,
    },
  },
  {
    id: 257,
    root: 'dem/demo',
    origin: 'Greek',
    meaning: '人民',
    meaningEn: 'people',
    description: `demo 是大众、人民的意思。democracy 就是由人民来做主。`,
    examples: [
      {
        word: 'democracy',
        breakdown: { prefix: '', root: 'demo', suffix: 'cracy' },
        meaning: '民主',
        explanation: '人民 + 统治→民主',
      },
      {
        word: 'epidemic',
        breakdown: { prefix: 'epi', root: 'dem', suffix: 'ic' },
        meaning: '流行病',
        explanation: '在人群中 + 人民 + 变成形容词→流行病',
      },
    ],
    quiz: {
      question: 'demo 这个词根的意思是什么？',
      options: ['动物', '神仙', '机器', '人民'],
      correctAnswer: 3,
    },
  },
  {
    id: 258,
    root: 'dexter',
    origin: 'Latin',
    meaning: '右 / 熟练',
    meaningEn: 'right hand',
    description: `古人常把右手和熟练联系起来。dexterity 就是像惯用手一样灵巧。`,
    examples: [
      {
        word: 'dexterity',
        breakdown: { prefix: '', root: 'dexter', suffix: 'ity' },
        meaning: '灵巧',
        explanation: '右 / 熟练 + 变成名词→灵巧',
      },
      {
        word: 'ambidextrous',
        breakdown: { prefix: 'ambi', root: 'dextr', suffix: 'ous' },
        meaning: '左右手都灵活的',
        explanation: '两边 + 右 + 变成形容词→左右手都灵活的',
      },
    ],
    quiz: {
      question: 'dexter 的意思是什么？',
      options: ['笨拙', '左', '右 / 熟练', '瞎'],
      correctAnswer: 2,
    },
  },
  {
    id: 259,
    root: 'di/dia',
    origin: 'Latin',
    meaning: '日子',
    meaningEn: 'day',
    description: `di 代表一天天的日子。diary 就是记录每天事情的小本子。`,
    examples: [
      {
        word: 'diary',
        breakdown: { prefix: '', root: 'di', suffix: 'ary' },
        meaning: '日记',
        explanation: '日子 + 变成名词→日记',
      },
      {
        word: 'dial',
        breakdown: { prefix: '', root: 'di', suffix: 'al' },
        meaning: '表盘',
        explanation: '日子 + 变成名词→表盘',
      },
    ],
    quiz: {
      question: 'di 这个词根的意思是什么？',
      options: ['年', '月', '日子', '小时'],
      correctAnswer: 2,
    },
  },
  {
    id: 260,
    root: 'dign',
    origin: 'Latin',
    meaning: '尊贵',
    meaningEn: 'worthy',
    description: `dign 总带着高贵的气息。dignity 就是一个人的尊贵和体面。`,
    examples: [
      {
        word: 'dignity',
        breakdown: { prefix: '', root: 'dign', suffix: 'ity' },
        meaning: '尊严',
        explanation: '尊贵 + 变成名词→尊严',
      },
      {
        word: 'dignify',
        breakdown: { prefix: '', root: 'dign', suffix: 'ify' },
        meaning: '使高贵',
        explanation: '尊贵 + 变成动词→使高贵',
      },
    ],
    quiz: {
      question: 'dign 的意思是什么？',
      options: ['卑微', '平凡', '尊贵', '可笑'],
      correctAnswer: 2,
    },
  },
  {
    id: 261,
    root: 'divid/divis',
    origin: 'Latin',
    meaning: '分开',
    meaningEn: 'divide',
    description: `divid 就是把一个整体切成几块。divide 就是把东西分开。`,
    examples: [
      {
        word: 'divide',
        breakdown: { prefix: '', root: 'divid', suffix: 'e' },
        meaning: '划分',
        explanation: '分开 + 变成动词→划分',
      },
      {
        word: 'division',
        breakdown: { prefix: '', root: 'divis', suffix: 'ion' },
        meaning: '部门 / 分开',
        explanation: '分开 + 变成名词→部门',
      },
    ],
    quiz: {
      question: 'divid 这个词根的意思是什么？',
      options: ['连接', '分开', '粘贴', '合并'],
      correctAnswer: 1,
    },
  },
  {
    id: 262,
    root: 'doc/doct',
    origin: 'Latin',
    meaning: '教',
    meaningEn: 'teach',
    description: `doct 代表传授知识。doctor 原本是有资格教书的学者，后来也指医生。`,
    examples: [
      {
        word: 'doctor',
        breakdown: { prefix: '', root: 'doct', suffix: 'or' },
        meaning: '医生 / 博士',
        explanation: '教 + 做这事的人→医生',
      },
      {
        word: 'document',
        breakdown: { prefix: '', root: 'doc', suffix: 'ment' },
        meaning: '文件',
        explanation: '教 + 变成名词→文件',
      },
    ],
    quiz: {
      question: 'doct 的意思是什么？',
      options: ['跑', '跳', '教', '玩'],
      correctAnswer: 2,
    },
  },
  {
    id: 263,
    root: 'domin',
    origin: 'Latin',
    meaning: '主人',
    meaningEn: 'master',
    description: `domin 像发号施令的主人。dominate 就是像主人一样控制全局。`,
    examples: [
      {
        word: 'dominate',
        breakdown: { prefix: '', root: 'domin', suffix: 'ate' },
        meaning: '控制 / 主导',
        explanation: '主人 + 变成动词→控制',
      },
      {
        word: 'domain',
        breakdown: { prefix: '', root: 'domain', suffix: '' },
        meaning: '领域',
        explanation: '主人的领地→领域',
      },
    ],
    quiz: {
      question: 'domin 这个词根的意思是什么？',
      options: ['奴隶', '仆人', '主人', '客人'],
      correctAnswer: 2,
    },
  },
  {
    id: 264,
    root: 'dorm',
    origin: 'Latin',
    meaning: '睡眠',
    meaningEn: 'sleep',
    description: `dorm 是睡觉休息的地方。dormitory 就是提供睡眠的集体宿舍。`,
    examples: [
      {
        word: 'dormitory',
        breakdown: { prefix: '', root: 'dorm', suffix: 'itory' },
        meaning: '宿舍',
        explanation: '睡眠 + 相关场所→宿舍',
      },
      {
        word: 'dormant',
        breakdown: { prefix: '', root: 'dorm', suffix: 'ant' },
        meaning: '休眠的',
        explanation: '睡眠 + 变成形容词→休眠的',
      },
    ],
    quiz: {
      question: 'dorm 的意思是什么？',
      options: ['清醒', '兴奋', '睡眠', '奔跑'],
      correctAnswer: 2,
    },
  },
  {
    id: 265,
    root: 'dur',
    origin: 'Latin',
    meaning: '持久',
    meaningEn: 'last',
    description: `dur 像石头一样坚硬、抗造。durable 形容东西很耐用。`,
    examples: [
      {
        word: 'durable',
        breakdown: { prefix: '', root: 'dur', suffix: 'able' },
        meaning: '耐用的',
        explanation: '持久 + 可以...的→耐用的',
      },
      {
        word: 'endure',
        breakdown: { prefix: 'en', root: 'dur', suffix: 'e' },
        meaning: '忍受',
        explanation: '使变成 + 持久→忍受',
      },
    ],
    quiz: {
      question: 'dur 这个词根的意思是什么？',
      options: ['脆弱', '持久', '柔软', '瞬间'],
      correctAnswer: 1,
    },
  },
  {
    id: 266,
    root: 'dyn/dynam',
    origin: 'Greek',
    meaning: '力量',
    meaningEn: 'power',
    description: `dynam 充满能量和动力。dynamic 形容事物充满力量，一直在变化。`,
    examples: [
      {
        word: 'dynamic',
        breakdown: { prefix: '', root: 'dynam', suffix: 'ic' },
        meaning: '动态的',
        explanation: '力量 + 变成形容词→动态的',
      },
      {
        word: 'dynamite',
        breakdown: { prefix: '', root: 'dynam', suffix: 'ite' },
        meaning: '炸药',
        explanation: '力量 + 变成名词→炸药',
      },
    ],
    quiz: {
      question: 'dynam 的意思是什么？',
      options: ['虚弱', '静止', '力量', '黑暗'],
      correctAnswer: 2,
    },
  },
  {
    id: 267,
    root: 'ego',
    origin: 'Latin',
    meaning: '自己',
    meaningEn: 'self',
    description: `ego 就是满脑子都是我。egocentric 就是完全以自己为中心。`,
    examples: [
      {
        word: 'egocentric',
        breakdown: { prefix: '', root: 'ego', suffix: 'centric' },
        meaning: '以自我为中心的',
        explanation: '自己 + 中心→以自我为中心的',
      },
      {
        word: 'ego',
        breakdown: { prefix: '', root: 'ego', suffix: '' },
        meaning: '自我',
        explanation: '自己→自我',
      },
    ],
    quiz: {
      question: 'ego 这个词根的意思是什么？',
      options: ['大家', '别人', '自己', '动物'],
      correctAnswer: 2,
    },
  },
  {
    id: 268,
    root: 'empir',
    origin: 'Greek',
    meaning: '经验',
    meaningEn: 'experience',
    description: `empir 强调不讲空话，只看实际经历。empirical 就是基于经验和实验的。`,
    examples: [
      {
        word: 'empirical',
        breakdown: { prefix: '', root: 'empir', suffix: 'ical' },
        meaning: '经验主义的',
        explanation: '经验 + 变成形容词→经验主义的',
      },
      {
        word: 'empiricism',
        breakdown: { prefix: '', root: 'empir', suffix: 'icism' },
        meaning: '经验主义',
        explanation: '经验 + 主义 / 思想→经验主义',
      },
    ],
    quiz: {
      question: 'empir 的意思是什么？',
      options: ['幻想', '理论', '经验', '猜测'],
      correctAnswer: 2,
    },
  },
  {
    id: 269,
    root: 'empt',
    origin: 'Latin',
    meaning: '拿',
    meaningEn: 'take',
    description: `empt 是把东西拿走。exempt 是把人从义务里拿出来，也就是免除。`,
    examples: [
      {
        word: 'exempt',
        breakdown: { prefix: 'ex', root: 'empt', suffix: '' },
        meaning: '免除',
        explanation: '向外 + 拿→免除',
      },
      {
        word: 'preempt',
        breakdown: { prefix: 'pre', root: 'empt', suffix: '' },
        meaning: '抢占',
        explanation: '提前 + 拿→抢占',
      },
    ],
    quiz: {
      question: 'empt 这个词根的意思是什么？',
      options: ['拿', '扔', '丢', '看'],
      correctAnswer: 0,
    },
  },
  {
    id: 270,
    root: 'err',
    origin: 'Latin',
    meaning: '犯错',
    meaningEn: 'mistake',
    description: `err 就像走偏了路。error 就是不小心走岔了，也就是犯错。`,
    examples: [
      {
        word: 'error',
        breakdown: { prefix: '', root: 'err', suffix: 'or' },
        meaning: '错误',
        explanation: '犯错 + 变成名词→错误',
      },
      {
        word: 'erratic',
        breakdown: { prefix: '', root: 'err', suffix: 'atic' },
        meaning: '不稳定的',
        explanation: '犯错 + 变成形容词→不稳定的',
      },
    ],
    quiz: {
      question: 'err 的意思是什么？',
      options: ['正确', '犯错', '完美', '精准'],
      correctAnswer: 1,
    },
  },
  {
    id: 271,
    root: 'fab/fess',
    origin: 'Latin',
    meaning: '说',
    meaningEn: 'speak',
    description: `fess 是张开嘴表达。confess 是把真相说出来，也就是承认。`,
    examples: [
      {
        word: 'confess',
        breakdown: { prefix: 'con', root: 'fess', suffix: '' },
        meaning: '承认',
        explanation: '一起 + 说→承认',
      },
      {
        word: 'fable',
        breakdown: { prefix: '', root: 'fab', suffix: 'le' },
        meaning: '寓言',
        explanation: '说 + 变成名词→寓言',
      },
    ],
    quiz: {
      question: 'fess 这个词根的意思是什么？',
      options: ['走', '跑', '说', '听'],
      correctAnswer: 2,
    },
  },
  {
    id: 272,
    root: 'fall/fals',
    origin: 'Latin',
    meaning: '假',
    meaningEn: 'deceive',
    description: `fals 是用来骗人的东西。false 就是不真实的、假的。`,
    examples: [
      {
        word: 'false',
        breakdown: { prefix: '', root: 'fals', suffix: 'e' },
        meaning: '假的',
        explanation: '假 + 变成形容词→假的',
      },
      {
        word: 'fallacy',
        breakdown: { prefix: '', root: 'fall', suffix: 'acy' },
        meaning: '谬误',
        explanation: '假 + 变成名词→谬误',
      },
    ],
    quiz: {
      question: 'fals 的意思是什么？',
      options: ['真', '善', '美', '假'],
      correctAnswer: 3,
    },
  },
  {
    id: 273,
    root: 'fam',
    origin: 'Latin',
    meaning: '名声',
    meaningEn: 'fame',
    description: `fam 是大家口口相传的口碑。famous 就是非常有名声的。`,
    examples: [
      {
        word: 'famous',
        breakdown: { prefix: '', root: 'fam', suffix: 'ous' },
        meaning: '著名的',
        explanation: '名声 + 变成形容词→著名的',
      },
      {
        word: 'fame',
        breakdown: { prefix: '', root: 'fam', suffix: 'e' },
        meaning: '名声',
        explanation: '名声 + 变成名词→名声',
      },
    ],
    quiz: {
      question: 'fam 这个词根的意思是什么？',
      options: ['名声', '财富', '饥饿', '家庭'],
      correctAnswer: 0,
    },
  },
  {
    id: 274,
    root: 'fend/fens',
    origin: 'Latin',
    meaning: '防御',
    meaningEn: 'ward off',
    description: `fend 就是把打过来的东西挡回去。defend 就是防御和保卫。`,
    examples: [
      {
        word: 'defend',
        breakdown: { prefix: 'de', root: 'fend', suffix: '' },
        meaning: '防御',
        explanation: '向下 + 防御→防御',
      },
      {
        word: 'defense',
        breakdown: { prefix: 'de', root: 'fens', suffix: 'e' },
        meaning: '防御',
        explanation: '向下 + 防御→防御',
      },
    ],
    quiz: {
      question: 'fend 的意思是什么？',
      options: ['逃跑', '投降', '防御', '睡觉'],
      correctAnswer: 2,
    },
  },
  {
    id: 275,
    root: 'fid',
    origin: 'Latin',
    meaning: '相信',
    meaningEn: 'trust',
    description: `fid 代表信任。confidence 是心里相信自己能做到，也就是自信。`,
    examples: [
      {
        word: 'confide',
        breakdown: { prefix: 'con', root: 'fid', suffix: 'e' },
        meaning: '信任',
        explanation: '一起 + 相信→信任',
      },
      {
        word: 'confidence',
        breakdown: { prefix: 'con', root: 'fid', suffix: 'ence' },
        meaning: '自信',
        explanation: '一起 + 相信 + 变成名词→自信',
      },
    ],
    quiz: {
      question: 'fid 这个词根的意思是什么？',
      options: ['相信', '怀疑', '害怕', '讨厌'],
      correctAnswer: 0,
    },
  },
  {
    id: 276,
    root: 'fil',
    origin: 'Latin',
    meaning: '线',
    meaningEn: 'thread',
    description: `fil 像一根把东西串起来的线。file 最初和用线串起的档案有关。`,
    examples: [
      {
        word: 'file',
        breakdown: { prefix: '', root: 'fil', suffix: 'e' },
        meaning: '文件',
        explanation: '线 + 变成名词→文件',
      },
      {
        word: 'filament',
        breakdown: { prefix: '', root: 'fil', suffix: 'ament' },
        meaning: '细丝',
        explanation: '线 + 变成名词→细丝',
      },
    ],
    quiz: {
      question: 'fil 的意思是什么？',
      options: ['面', '体', '点', '线'],
      correctAnswer: 3,
    },
  },
  {
    id: 277,
    root: 'fin',
    origin: 'Latin',
    meaning: '结束',
    meaningEn: 'end',
    description: `fin 代表画上句号、到达边界。final 就是所有事情到了结束那一步。`,
    examples: [
      {
        word: 'final',
        breakdown: { prefix: '', root: 'fin', suffix: 'al' },
        meaning: '最终的',
        explanation: '结束 + 变成形容词→最终的',
      },
      {
        word: 'finish',
        breakdown: { prefix: '', root: 'fin', suffix: 'ish' },
        meaning: '完成',
        explanation: '结束 + 变成动词→完成',
      },
    ],
    quiz: {
      question: 'fin 这个词根的意思是什么？',
      options: ['开始', '中间', '结束', '无限'],
      correctAnswer: 2,
    },
  },
  {
    id: 278,
    root: 'firm',
    origin: 'Latin',
    meaning: '坚固',
    meaningEn: 'strong',
    description: `firm 让人觉得稳当、靠谱。confirm 就是把事情敲定，也就是确认。`,
    examples: [
      {
        word: 'confirm',
        breakdown: { prefix: 'con', root: 'firm', suffix: '' },
        meaning: '确认',
        explanation: '共同 + 坚固→确认',
      },
      {
        word: 'firm',
        breakdown: { prefix: '', root: 'firm', suffix: '' },
        meaning: '坚固的',
        explanation: '坚固→坚固的',
      },
    ],
    quiz: {
      question: 'firm 的意思是什么？',
      options: ['脆弱', '松散', '摇晃', '坚固'],
      correctAnswer: 3,
    },
  },
  {
    id: 279,
    root: 'fix',
    origin: 'Latin',
    meaning: '固定',
    meaningEn: 'fasten',
    description: `fix 就是把松动的东西固定住。prefix 就是固定在单词前面的前缀。`,
    examples: [
      {
        word: 'prefix',
        breakdown: { prefix: 'pre', root: 'fix', suffix: '' },
        meaning: '前缀',
        explanation: '提前 + 固定→前缀',
      },
      {
        word: 'fix',
        breakdown: { prefix: '', root: 'fix', suffix: '' },
        meaning: '固定',
        explanation: '固定→固定',
      },
    ],
    quiz: {
      question: 'fix 这个词根的意思是什么？',
      options: ['移动', '固定', '逃跑', '滑落'],
      correctAnswer: 1,
    },
  },
  {
    id: 280,
    root: 'flam',
    origin: 'Latin',
    meaning: '火焰',
    meaningEn: 'fire',
    description: `flam 就是燃烧的大火。flame 就是跳动的火焰。`,
    examples: [
      {
        word: 'flame',
        breakdown: { prefix: '', root: 'flam', suffix: 'e' },
        meaning: '火焰',
        explanation: '火焰 + 变成名词→火焰',
      },
      {
        word: 'flammable',
        breakdown: { prefix: '', root: 'flam', suffix: 'able' },
        meaning: '易燃的',
        explanation: '火焰 + 可以...的→易燃的',
      },
    ],
    quiz: {
      question: 'flam 的意思是什么？',
      options: ['水流', '土壤', '火焰', '风'],
      correctAnswer: 2,
    },
  },
  {
    id: 281,
    root: 'flat',
    origin: 'Latin',
    meaning: '吹气',
    meaningEn: 'blow',
    description: `flat 就像给气球打气。inflate 就是向内吹气，让它膨胀起来。`,
    examples: [
      {
        word: 'inflate',
        breakdown: { prefix: 'in', root: 'flat', suffix: 'e' },
        meaning: '充气',
        explanation: '向内 + 吹气→充气',
      },
      {
        word: 'deflate',
        breakdown: { prefix: 'de', root: 'flat', suffix: 'e' },
        meaning: '放气',
        explanation: '向下 + 吹气→放气',
      },
    ],
    quiz: {
      question: 'flat 这个词根的意思是什么？',
      options: ['吸气', '吹气', '憋气', '吞咽'],
      correctAnswer: 1,
    },
  },
  {
    id: 282,
    root: 'flect/flex',
    origin: 'Latin',
    meaning: '弯曲',
    meaningEn: 'bend',
    description: `flex 像有弹性的弹簧。flexible 就是可以弯曲的，也就是灵活的。`,
    examples: [
      {
        word: 'flexible',
        breakdown: { prefix: '', root: 'flex', suffix: 'ible' },
        meaning: '灵活的',
        explanation: '弯曲 + 可以...的→灵活的',
      },
      {
        word: 'reflect',
        breakdown: { prefix: 're', root: 'flect', suffix: '' },
        meaning: '反射',
        explanation: '向后 + 弯曲→反射',
      },
    ],
    quiz: {
      question: 'flex 的意思是什么？',
      options: ['僵硬', '折断', '弯曲', '笔直'],
      correctAnswer: 2,
    },
  },
  {
    id: 283,
    root: 'flor',
    origin: 'Latin',
    meaning: '花',
    meaningEn: 'flower',
    description: `flor 散发着花香。floral 就是和花有关的。`,
    examples: [
      {
        word: 'floral',
        breakdown: { prefix: '', root: 'flor', suffix: 'al' },
        meaning: '花的',
        explanation: '花 + 变成形容词→花的',
      },
      {
        word: 'flora',
        breakdown: { prefix: '', root: 'flor', suffix: 'a' },
        meaning: '植物群',
        explanation: '花 + 变成名词→植物群',
      },
    ],
    quiz: {
      question: 'flor 这个词根的意思是什么？',
      options: ['草', '树', '花', '果'],
      correctAnswer: 2,
    },
  },
  {
    id: 284,
    root: 'foli',
    origin: 'Latin',
    meaning: '叶子',
    meaningEn: 'leaf',
    description: `foli 是一片片的叶子或纸张。foliage 指一树繁茂的树叶。`,
    examples: [
      {
        word: 'foliage',
        breakdown: { prefix: '', root: 'foli', suffix: 'age' },
        meaning: '树叶',
        explanation: '叶子 + 变成名词→树叶',
      },
      {
        word: 'portfolio',
        breakdown: { prefix: 'port', root: 'foli', suffix: 'o' },
        meaning: '作品集',
        explanation: '携带 + 叶子(纸张) + 变成名词→作品集',
      },
    ],
    quiz: {
      question: 'foli 的意思是什么？',
      options: ['根', '茎', '叶子', '花瓣'],
      correctAnswer: 2,
    },
  },
  {
    id: 285,
    root: 'fort',
    origin: 'Latin',
    meaning: '强大',
    meaningEn: 'strong',
    description: `fort 是坚不可摧的堡垒。effort 是把力量使出来，也就是努力。`,
    examples: [
      {
        word: 'effort',
        breakdown: { prefix: 'ef', root: 'fort', suffix: '' },
        meaning: '努力',
        explanation: '向外 + 强大→努力',
      },
      {
        word: 'fort',
        breakdown: { prefix: '', root: 'fort', suffix: '' },
        meaning: '堡垒',
        explanation: '强大→堡垒',
      },
    ],
    quiz: {
      question: 'fort 这个词根的意思是什么？',
      options: ['弱小', '强大', '柔软', '轻盈'],
      correctAnswer: 1,
    },
  },
  {
    id: 286,
    root: 'fract/frag',
    origin: 'Latin',
    meaning: '打破',
    meaningEn: 'break',
    description: `frag 像摔碎的玻璃。fragile 就是一碰就会碎的，表示脆弱。`,
    examples: [
      {
        word: 'fragile',
        breakdown: { prefix: '', root: 'frag', suffix: 'ile' },
        meaning: '脆弱的',
        explanation: '打破 + 可以...的→脆弱的',
      },
      {
        word: 'fragment',
        breakdown: { prefix: '', root: 'frag', suffix: 'ment' },
        meaning: '碎片',
        explanation: '打破 + 变成名词→碎片',
      },
    ],
    quiz: {
      question: 'frag 的意思是什么？',
      options: ['粘合', '修复', '建造', '打破'],
      correctAnswer: 3,
    },
  },
  {
    id: 287,
    root: 'frig',
    origin: 'Latin',
    meaning: '冷',
    meaningEn: 'cold',
    description: `frig 会让人冷得发抖。frigid 就是寒冷的。`,
    examples: [
      {
        word: 'frigid',
        breakdown: { prefix: '', root: 'frig', suffix: 'id' },
        meaning: '寒冷的',
        explanation: '冷 + 变成形容词→寒冷的',
      },
      {
        word: 'refrigerate',
        breakdown: { prefix: 're', root: 'frig', suffix: 'ate' },
        meaning: '冷藏',
        explanation: '再次 + 冷 + 变成动词→冷藏',
      },
    ],
    quiz: {
      question: 'frig 这个词根的意思是什么？',
      options: ['热', '冷', '温', '烫'],
      correctAnswer: 1,
    },
  },
  {
    id: 288,
    root: 'fug',
    origin: 'Latin',
    meaning: '逃跑',
    meaningEn: 'flee',
    description: `fug 就是急忙逃离。refuge 是向后逃去躲起来的地方，也就是避难所。`,
    examples: [
      {
        word: 'refuge',
        breakdown: { prefix: 're', root: 'fug', suffix: 'e' },
        meaning: '避难所',
        explanation: '向后 + 逃跑→避难所',
      },
      {
        word: 'refugee',
        breakdown: { prefix: 're', root: 'fug', suffix: 'ee' },
        meaning: '难民',
        explanation: '向后 + 逃跑的人→难民',
      },
    ],
    quiz: {
      question: 'fug 的意思是什么？',
      options: ['追赶', '逃跑', '战斗', '停留'],
      correctAnswer: 1,
    },
  },
  {
    id: 289,
    root: 'fund/fus',
    origin: 'Latin',
    meaning: '倒',
    meaningEn: 'pour',
    description: `fus 就像倒水一样。confuse 是把东西倒在一起分不清，也就是使人困惑。`,
    examples: [
      {
        word: 'confuse',
        breakdown: { prefix: 'con', root: 'fus', suffix: 'e' },
        meaning: '使困惑',
        explanation: '一起 + 倒→使困惑',
      },
      {
        word: 'refuse',
        breakdown: { prefix: 're', root: 'fus', suffix: 'e' },
        meaning: '拒绝',
        explanation: '向后 + 倒→拒绝',
      },
    ],
    quiz: {
      question: 'fus 这个词根的意思是什么？',
      options: ['喝', '吃', '倒', '装'],
      correctAnswer: 2,
    },
  },
  {
    id: 290,
    root: 'gen',
    origin: 'Latin',
    meaning: '产生',
    meaningEn: 'produce',
    description: `gen 代表出生和诞生。generate 就是源源不断地产生新事物。`,
    examples: [
      {
        word: 'generate',
        breakdown: { prefix: '', root: 'gen', suffix: 'ate' },
        meaning: '产生',
        explanation: '产生 + 变成动词→产生',
      },
      {
        word: 'genius',
        breakdown: { prefix: '', root: 'gen', suffix: 'ius' },
        meaning: '天才',
        explanation: '产生天赋→天才',
      },
    ],
    quiz: {
      question: 'gen 的意思是什么？',
      options: ['毁灭', '破坏', '产生', '消失'],
      correctAnswer: 2,
    },
  },
  {
    id: 291,
    root: 'gest',
    origin: 'Latin',
    meaning: '带',
    meaningEn: 'carry',
    description: `gest 是把东西带过来。digest 是把吃进去的食物分开带下去，也就是消化。`,
    examples: [
      {
        word: 'digest',
        breakdown: { prefix: 'di', root: 'gest', suffix: '' },
        meaning: '消化',
        explanation: '分开 + 带→消化',
      },
      {
        word: 'suggest',
        breakdown: { prefix: 'sug', root: 'gest', suffix: '' },
        meaning: '建议',
        explanation: '下方 + 带出想法→建议',
      },
    ],
    quiz: {
      question: 'gest 这个词根的意思是什么？',
      options: ['扔', '推', '带', '藏'],
      correctAnswer: 2,
    },
  },
  {
    id: 292,
    root: 'glor',
    origin: 'Latin',
    meaning: '荣誉',
    meaningEn: 'glory',
    description: `glor 是万众瞩目的光环。glory 也就是英雄们追求的荣誉。`,
    examples: [
      {
        word: 'glory',
        breakdown: { prefix: '', root: 'glor', suffix: 'y' },
        meaning: '荣誉',
        explanation: '荣誉 + 变成名词→荣誉',
      },
      {
        word: 'glorious',
        breakdown: { prefix: '', root: 'glor', suffix: 'ious' },
        meaning: '光荣的',
        explanation: '荣誉 + 变成形容词→光荣的',
      },
    ],
    quiz: {
      question: 'glor 的意思是什么？',
      options: ['耻辱', '平庸', '荣誉', '失败'],
      correctAnswer: 2,
    },
  },
  {
    id: 293,
    root: 'grad/gress',
    origin: 'Latin',
    meaning: '走',
    meaningEn: 'step',
    description: `gress 是一步一步往前迈进。progress 就是向前走，也就是进步。`,
    examples: [
      {
        word: 'progress',
        breakdown: { prefix: 'pro', root: 'gress', suffix: '' },
        meaning: '进步',
        explanation: '向前 + 走→进步',
      },
      {
        word: 'grade',
        breakdown: { prefix: '', root: 'grad', suffix: 'e' },
        meaning: '等级',
        explanation: '走的台阶→等级',
      },
    ],
    quiz: {
      question: 'gress 这个词根的意思是什么？',
      options: ['跑', '跳', '停', '走'],
      correctAnswer: 3,
    },
  },
  {
    id: 294,
    root: 'gram',
    origin: 'Greek',
    meaning: '写',
    meaningEn: 'write',
    description: `gram 是用笔写下或画出的痕迹。program 就是一组写好的步骤。`,
    examples: [
      {
        word: 'grammar',
        breakdown: { prefix: '', root: 'gram', suffix: 'ar' },
        meaning: '语法',
        explanation: '写 + 变成名词→语法',
      },
      {
        word: 'program',
        breakdown: { prefix: 'pro', root: 'gram', suffix: '' },
        meaning: '程序',
        explanation: '向前 + 写→程序',
      },
    ],
    quiz: {
      question: 'gram 的意思是什么？',
      options: ['听', '读', '写', '说'],
      correctAnswer: 2,
    },
  },
  {
    id: 295,
    root: 'gran',
    origin: 'Latin',
    meaning: '颗粒',
    meaningEn: 'grain',
    description: `gran 是细小的一粒一粒的东西。grain 就是颗粒状的谷物。`,
    examples: [
      {
        word: 'grain',
        breakdown: { prefix: '', root: 'grain', suffix: '' },
        meaning: '谷物',
        explanation: '颗粒→谷物',
      },
      {
        word: 'granite',
        breakdown: { prefix: '', root: 'gran', suffix: 'ite' },
        meaning: '花岗岩',
        explanation: '颗粒 + 变成名词→花岗岩',
      },
    ],
    quiz: {
      question: 'gran 这个词根的意思是什么？',
      options: ['液体', '气体', '颗粒', '大块'],
      correctAnswer: 2,
    },
  },
  {
    id: 296,
    root: 'grav',
    origin: 'Latin',
    meaning: '重',
    meaningEn: 'heavy',
    description: `grav 给人一种沉甸甸的感觉。gravity 就是把我们往地下拉的重力。`,
    examples: [
      {
        word: 'gravity',
        breakdown: { prefix: '', root: 'grav', suffix: 'ity' },
        meaning: '重力',
        explanation: '重 + 变成名词→重力',
      },
      {
        word: 'grave',
        breakdown: { prefix: '', root: 'grav', suffix: 'e' },
        meaning: '严重的',
        explanation: '重 + 变成形容词→严重的',
      },
    ],
    quiz: {
      question: 'grav 的意思是什么？',
      options: ['轻', '浮', '重', '飘'],
      correctAnswer: 2,
    },
  },
  {
    id: 297,
    root: 'hosp/host',
    origin: 'Latin',
    meaning: '客人',
    meaningEn: 'guest',
    description: `hosp 和接待客人有关。hospital 原本是接待客人和穷人的地方，后来成了医院。`,
    examples: [
      {
        word: 'hospital',
        breakdown: { prefix: '', root: 'hosp', suffix: 'ital' },
        meaning: '医院',
        explanation: '客人 + 相关场所→医院',
      },
      {
        word: 'host',
        breakdown: { prefix: '', root: 'host', suffix: '' },
        meaning: '主人',
        explanation: '接待客人的人→主人',
      },
    ],
    quiz: {
      question: 'hosp 这个词根的意思是什么？',
      options: ['医生', '护士', '客人', '敌人'],
      correctAnswer: 2,
    },
  },
  {
    id: 298,
    root: 'hum',
    origin: 'Latin',
    meaning: '泥土',
    meaningEn: 'earth',
    description: `hum 带着大地的气息。human 在古老观念里和泥土造人有关。`,
    examples: [
      {
        word: 'human',
        breakdown: { prefix: '', root: 'hum', suffix: 'an' },
        meaning: '人类',
        explanation: '泥土 + 变成名词→人类',
      },
      {
        word: 'humble',
        breakdown: { prefix: '', root: 'hum', suffix: 'ble' },
        meaning: '谦虚的',
        explanation: '泥土 + 可以...的→谦虚的',
      },
    ],
    quiz: {
      question: 'hum 的意思是什么？',
      options: ['火焰', '天空', '海洋', '泥土'],
      correctAnswer: 3,
    },
  },
  {
    id: 299,
    root: 'ign',
    origin: 'Latin',
    meaning: '火',
    meaningEn: 'fire',
    description: `ign 就像一颗火星。ignite 就是用火星把物体点燃。`,
    examples: [
      {
        word: 'ignite',
        breakdown: { prefix: '', root: 'ign', suffix: 'ite' },
        meaning: '点燃',
        explanation: '火 + 变成动词→点燃',
      },
      {
        word: 'ignition',
        breakdown: { prefix: '', root: 'ign', suffix: 'ition' },
        meaning: '点火',
        explanation: '火 + 变成名词→点火',
      },
    ],
    quiz: {
      question: 'ign 这个词根的意思是什么？',
      options: ['冰', '火', '风', '电'],
      correctAnswer: 1,
    },
  },
  {
    id: 300,
    root: 'insul',
    origin: 'Latin',
    meaning: '岛屿',
    meaningEn: 'island',
    description: `insul 是海中被水包围的孤岛。insular 就像岛一样与外界隔开。`,
    examples: [
      {
        word: 'insular',
        breakdown: { prefix: '', root: 'insul', suffix: 'ar' },
        meaning: '岛屿的',
        explanation: '岛屿 + 变成形容词→岛屿的',
      },
      {
        word: 'peninsula',
        breakdown: { prefix: 'pen', root: 'insul', suffix: 'a' },
        meaning: '半岛',
        explanation: '几乎 + 岛屿 + 变成名词→半岛',
      },
    ],
    quiz: {
      question: 'insul 的意思是什么？',
      options: ['高山', '平原', '沙漠', '岛屿'],
      correctAnswer: 3,
    },
  },
]

const extraExamplesById = new Map<number, WordExample>([
  [
    231,
    {
      word: 'altar',
      breakdown: { prefix: '', root: 'alt', suffix: 'ar' },
      meaning: '祭坛',
      explanation: '高 + 相关场所→祭坛',
    },
  ],
  [
    232,
    {
      word: 'amorous',
      breakdown: { prefix: '', root: 'amor', suffix: 'ous' },
      meaning: '多情的',
      explanation: '爱 + 变成形容词→多情的',
    },
  ],
  [
    233,
    {
      word: 'inept',
      breakdown: { prefix: 'in', root: 'ept', suffix: '' },
      meaning: '笨拙的',
      explanation: '否定含义 + 适合→笨拙的',
    },
  ],
  [
    234,
    {
      word: 'armor',
      breakdown: { prefix: '', root: 'arm', suffix: 'or' },
      meaning: '盔甲',
      explanation: '武器 + 相关物品→盔甲',
    },
  ],
  [
    235,
    {
      word: 'artificial',
      breakdown: { prefix: 'arti', root: 'fic', suffix: 'ial' },
      meaning: '人造的',
      explanation: '艺术 + 制作 + 变成形容词→人造的',
    },
  ],
  [
    236,
    {
      word: 'batter',
      breakdown: { prefix: '', root: 'bat', suffix: 'ter' },
      meaning: '连续猛击',
      explanation: '打 + 连击/重复→连续猛击',
    },
  ],
  [
    237,
    {
      word: 'rebellion',
      breakdown: { prefix: 're', root: 'bell', suffix: 'ion' },
      meaning: '叛乱',
      explanation: '相反 + 战争 + 变成名词→叛乱',
    },
  ],
  [
    238,
    {
      word: 'campaign',
      breakdown: { prefix: '', root: 'camp', suffix: 'aign' },
      meaning: '战役 / 活动',
      explanation: '营地/田野 + 变成名词→战役',
    },
  ],
  [
    239,
    {
      word: 'incantation',
      breakdown: { prefix: 'in', root: 'cant', suffix: 'ation' },
      meaning: '咒语',
      explanation: '向内 + 唱 + 变成名词→咒语',
    },
  ],
  [
    240,
    {
      word: 'reincarnation',
      breakdown: { prefix: 're', root: 'incarn', suffix: 'ation' },
      meaning: '轮回',
      explanation: '再次 + 进入肉体 + 变成名词→轮回',
    },
  ],
  [
    241,
    {
      word: 'accuse',
      breakdown: { prefix: 'ac', root: 'cuse', suffix: '' },
      meaning: '指控',
      explanation: '朝向 + 原因/理由→指控',
    },
  ],
  [
    242,
    {
      word: 'eccentric',
      breakdown: { prefix: 'ec', root: 'centr', suffix: 'ic' },
      meaning: '古怪的',
      explanation: '向外 + 中心 + 变成形容词→古怪的',
    },
  ],
  [
    243,
    {
      word: 'certificate',
      breakdown: { prefix: '', root: 'cert', suffix: 'ificate' },
      meaning: '证书',
      explanation: '确定 + 变成名词→证书',
    },
  ],
  [
    244,
    {
      word: 'incision',
      breakdown: { prefix: 'in', root: 'cis', suffix: 'ion' },
      meaning: '切口',
      explanation: '向内 + 切 + 变成名词→切口',
    },
  ],
  [
    245,
    {
      word: 'civilization',
      breakdown: { prefix: '', root: 'civil', suffix: 'ization' },
      meaning: '文明',
      explanation: '公民的 + 变成名词→文明',
    },
  ],
  [
    246,
    {
      word: 'clamor',
      breakdown: { prefix: '', root: 'clam', suffix: 'or' },
      meaning: '喧哗',
      explanation: '呼喊 + 变成名词→喧哗',
    },
  ],
  [
    247,
    {
      word: 'declare',
      breakdown: { prefix: 'de', root: 'clare', suffix: '' },
      meaning: '宣布',
      explanation: '完全 + 清楚→宣布',
    },
  ],
  [
    248,
    {
      word: 'recline',
      breakdown: { prefix: 're', root: 'clin', suffix: 'e' },
      meaning: '靠躺',
      explanation: '向后 + 倾斜→靠躺',
    },
  ],
  [
    249,
    {
      word: 'conclude',
      breakdown: { prefix: 'con', root: 'clude', suffix: '' },
      meaning: '结论',
      explanation: '一起 + 关闭→结论',
    },
  ],
  [
    250,
    {
      word: 'ignore',
      breakdown: { prefix: 'ig', root: 'nore', suffix: '' },
      meaning: '忽视',
      explanation: '否定含义 + 知道→忽视',
    },
  ],
  [
    251,
    {
      word: 'discolor',
      breakdown: { prefix: 'dis', root: 'color', suffix: '' },
      meaning: '变色',
      explanation: '去除/改变 + 颜色→变色',
    },
  ],
  [
    252,
    {
      word: 'crucify',
      breakdown: { prefix: '', root: 'cruc', suffix: 'ify' },
      meaning: '钉十字架',
      explanation: '十字 + 变成动词→钉十字架',
    },
  ],
  [
    253,
    {
      word: 'crusty',
      breakdown: { prefix: '', root: 'crust', suffix: 'y' },
      meaning: '酥脆的',
      explanation: '外壳 + 变成形容词→酥脆的',
    },
  ],
  [
    254,
    {
      word: 'exculpate',
      breakdown: { prefix: 'ex', root: 'culp', suffix: 'ate' },
      meaning: '开脱',
      explanation: '向外 + 罪 + 变成动词→开脱',
    },
  ],
  [
    255,
    {
      word: 'accustom',
      breakdown: { prefix: 'ac', root: 'custom', suffix: '' },
      meaning: '使习惯',
      explanation: '朝向 + 习惯→使习惯',
    },
  ],
  [
    256,
    {
      word: 'indemnity',
      breakdown: { prefix: 'in', root: 'demn', suffix: 'ity' },
      meaning: '赔偿',
      explanation: '否定含义 + 损害 + 变成名词→赔偿',
    },
  ],
  [
    257,
    {
      word: 'demographic',
      breakdown: { prefix: '', root: 'demo', suffix: 'graphic' },
      meaning: '人口统计的',
      explanation: '人民 + 画/写(形容词)→人口统计的',
    },
  ],
  [
    258,
    {
      word: 'dextrous',
      breakdown: { prefix: '', root: 'dextr', suffix: 'ous' },
      meaning: '灵巧的',
      explanation: '熟练 + 变成形容词→灵巧的',
    },
  ],
  [
    259,
    {
      word: 'quotidian',
      breakdown: { prefix: 'quoti', root: 'dian', suffix: '' },
      meaning: '每日的',
      explanation: '每一 + 日子→每日的',
    },
  ],
  [
    260,
    {
      word: 'indignant',
      breakdown: { prefix: 'in', root: 'dign', suffix: 'ant' },
      meaning: '愤慨的',
      explanation: '否定含义 + 尊贵 + 变成形容词→愤慨的',
    },
  ],
  [
    261,
    {
      word: 'individual',
      breakdown: { prefix: 'in', root: 'divid', suffix: 'ual' },
      meaning: '个体',
      explanation: '否定含义 + 分开 + 变成名词→个体',
    },
  ],
  [
    262,
    {
      word: 'doctrine',
      breakdown: { prefix: '', root: 'doct', suffix: 'rine' },
      meaning: '教义',
      explanation: '教 + 变成名词→教义',
    },
  ],
  [
    263,
    {
      word: 'predominant',
      breakdown: { prefix: 'pre', root: 'domin', suffix: 'ant' },
      meaning: '占主导的',
      explanation: '在前 + 主人 + 变成形容词→占主导的',
    },
  ],
  [
    264,
    {
      word: 'dormancy',
      breakdown: { prefix: '', root: 'dorm', suffix: 'ancy' },
      meaning: '休眠',
      explanation: '睡眠 + 变成名词→休眠',
    },
  ],
  [
    265,
    {
      word: 'duration',
      breakdown: { prefix: '', root: 'dur', suffix: 'ation' },
      meaning: '持续时间',
      explanation: '持久 + 变成名词→持续时间',
    },
  ],
  [
    266,
    {
      word: 'dynamite',
      breakdown: { prefix: '', root: 'dynam', suffix: 'ite' },
      meaning: '炸药',
      explanation: '力量 + 变成名词→炸药',
    },
  ],
  [
    267,
    {
      word: 'egoist',
      breakdown: { prefix: '', root: 'ego', suffix: 'ist' },
      meaning: '利己主义者',
      explanation: '自己 + 做这事的人→利己主义者',
    },
  ],
  [
    268,
    {
      word: 'empiric',
      breakdown: { prefix: '', root: 'empir', suffix: 'ic' },
      meaning: '经验主义者',
      explanation: '经验 + 变成名词→经验主义者',
    },
  ],
  [
    269,
    {
      word: 'preemption',
      breakdown: { prefix: 'pre', root: 'empt', suffix: 'ion' },
      meaning: '抢先',
      explanation: '提前 + 拿 + 变成名词→抢先',
    },
  ],
  [
    270,
    {
      word: 'errand',
      breakdown: { prefix: '', root: 'err', suffix: 'and' },
      meaning: '差事',
      explanation: '走动/犯错 + 变成名词→差事',
    },
  ],
  [
    271,
    {
      word: 'profess',
      breakdown: { prefix: 'pro', root: 'fess', suffix: '' },
      meaning: '宣称',
      explanation: '向前 + 说→宣称',
    },
  ],
  [
    272,
    {
      word: 'falsify',
      breakdown: { prefix: '', root: 'fals', suffix: 'ify' },
      meaning: '伪造',
      explanation: '假 + 变成动词→伪造',
    },
  ],
  [
    273,
    {
      word: 'infamous',
      breakdown: { prefix: 'in', root: 'fam', suffix: 'ous' },
      meaning: '臭名昭著的',
      explanation: '否定含义 + 名声 + 变成形容词→臭名昭著的',
    },
  ],
  [
    274,
    {
      word: 'fence',
      breakdown: { prefix: '', root: 'fenc', suffix: 'e' },
      meaning: '篱笆',
      explanation: '防御(物)→篱笆',
    },
  ],
  [
    275,
    {
      word: 'confide',
      breakdown: { prefix: 'con', root: 'fide', suffix: '' },
      meaning: '吐露',
      explanation: '一起 + 相信→吐露',
    },
  ],
  [
    276,
    {
      word: 'filament',
      breakdown: { prefix: '', root: 'fil', suffix: 'ament' },
      meaning: '灯丝',
      explanation: '线 + 变成名词→灯丝',
    },
  ],
  [
    277,
    {
      word: 'infinite',
      breakdown: { prefix: 'in', root: 'fin', suffix: 'ite' },
      meaning: '无限的',
      explanation: '否定含义 + 结束 + 变成形容词→无限的',
    },
  ],
  [
    278,
    {
      word: 'affirm',
      breakdown: { prefix: 'af', root: 'firm', suffix: '' },
      meaning: '肯定',
      explanation: '朝向 + 坚固→肯定',
    },
  ],
  [
    279,
    {
      word: 'suffix',
      breakdown: { prefix: 'suf', root: 'fix', suffix: '' },
      meaning: '后缀',
      explanation: '下方/之后 + 固定→后缀',
    },
  ],
  [
    280,
    {
      word: 'flamboyant',
      breakdown: { prefix: '', root: 'flam', suffix: 'boyant' },
      meaning: '耀眼的',
      explanation: '火焰 + 变成形容词→耀眼的',
    },
  ],
  [
    281,
    {
      word: 'deflation',
      breakdown: { prefix: 'de', root: 'flat', suffix: 'ion' },
      meaning: '通货紧缩',
      explanation: '向下 + 吹气 + 变成名词→通货紧缩',
    },
  ],
  [
    282,
    {
      word: 'deflect',
      breakdown: { prefix: 'de', root: 'flect', suffix: '' },
      meaning: '使偏斜',
      explanation: '向下/偏离 + 弯曲→使偏斜',
    },
  ],
  [
    283,
    {
      word: 'florist',
      breakdown: { prefix: '', root: 'flor', suffix: 'ist' },
      meaning: '花商',
      explanation: '花 + 做这事的人→花商',
    },
  ],
  [
    284,
    {
      word: 'foil',
      breakdown: { prefix: '', root: 'foil', suffix: '' },
      meaning: '箔',
      explanation: '叶片/薄片→箔',
    },
  ],
  [
    285,
    {
      word: 'comfort',
      breakdown: { prefix: 'com', root: 'fort', suffix: '' },
      meaning: '安慰',
      explanation: '一起 + 强大→安慰',
    },
  ],
  [
    286,
    {
      word: 'fraction',
      breakdown: { prefix: '', root: 'fract', suffix: 'ion' },
      meaning: '分数',
      explanation: '打破 + 变成名词→分数',
    },
  ],
  [
    287,
    {
      word: 'frigidity',
      breakdown: { prefix: '', root: 'frig', suffix: 'idity' },
      meaning: '寒冷',
      explanation: '冷 + 变成名词→寒冷',
    },
  ],
  [
    288,
    {
      word: 'fugitive',
      breakdown: { prefix: '', root: 'fug', suffix: 'itive' },
      meaning: '逃犯',
      explanation: '逃跑 + 变成名词→逃犯',
    },
  ],
  [
    289,
    {
      word: 'diffuse',
      breakdown: { prefix: 'dif', root: 'fuse', suffix: '' },
      meaning: '扩散',
      explanation: '分开 + 倒→扩散',
    },
  ],
  [
    290,
    {
      word: 'gene',
      breakdown: { prefix: '', root: 'gene', suffix: '' },
      meaning: '基因',
      explanation: '产生→基因',
    },
  ],
  [
    291,
    {
      word: 'congestion',
      breakdown: { prefix: 'con', root: 'gest', suffix: 'ion' },
      meaning: '拥堵',
      explanation: '一起 + 带 + 变成名词→拥堵',
    },
  ],
  [
    292,
    {
      word: 'glorify',
      breakdown: { prefix: '', root: 'glor', suffix: 'ify' },
      meaning: '颂扬',
      explanation: '荣誉 + 变成动词→颂扬',
    },
  ],
  [
    293,
    {
      word: 'aggressive',
      breakdown: { prefix: 'ag', root: 'gress', suffix: 'ive' },
      meaning: '具有攻击性的',
      explanation: '朝向 + 走 + 变成形容词→具有攻击性的',
    },
  ],
  [
    294,
    {
      word: 'telegram',
      breakdown: { prefix: 'tele', root: 'gram', suffix: '' },
      meaning: '电报',
      explanation: '远程 + 写→电报',
    },
  ],
  [
    295,
    {
      word: 'granular',
      breakdown: { prefix: '', root: 'gran', suffix: 'ular' },
      meaning: '颗粒状的',
      explanation: '颗粒 + 变成形容词→颗粒状的',
    },
  ],
  [
    296,
    {
      word: 'aggravate',
      breakdown: { prefix: 'ag', root: 'grav', suffix: 'ate' },
      meaning: '加重',
      explanation: '朝向 + 重 + 变成动词→加重',
    },
  ],
  [
    297,
    {
      word: 'hostel',
      breakdown: { prefix: '', root: 'host', suffix: 'el' },
      meaning: '青年旅舍',
      explanation: '客人 + 相关场所→青年旅舍',
    },
  ],
  [
    298,
    {
      word: 'exhume',
      breakdown: { prefix: 'ex', root: 'hum', suffix: 'e' },
      meaning: '掘出',
      explanation: '向外 + 泥土→掘出',
    },
  ],
  [
    299,
    {
      word: 'igneous',
      breakdown: { prefix: '', root: 'ign', suffix: 'eous' },
      meaning: '火成的',
      explanation: '火 + 变成形容词→火成的',
    },
  ],
  [
    300,
    {
      word: 'insulate',
      breakdown: { prefix: '', root: 'insul', suffix: 'ate' },
      meaning: '绝缘',
      explanation: '岛屿/隔离 + 变成动词→绝缘',
    },
  ],
])

export const wordRootReplacements: WordRoot[] = baseWordRootReplacements.map(
  (root) => {
    const extraExample = extraExamplesById.get(root.id)

    if (!extraExample || root.examples.length >= 3) {
      return root
    }

    return {
      ...root,
      examples: [...root.examples, extraExample],
    }
  },
)
