import { wordRootReplacements } from '@/data/wordRootReplacements'

export type WordPart = { prefix: string; root: string; suffix: string }

export type WordExample = {
  word: string
  breakdown: WordPart
  partMeanings?: Partial<WordPart>
  meaning: string
  explanation: string
  literalMeaning?: string
  learningNote?: string
}

export type WordRoot = {
  id: number
  root: string
  origin: string
  meaning: string
  meaningEn: string
  description: string
  variants?: string[]
  memoryHint?: string
  commonPitfall?: string
  examples: WordExample[]
  quiz: {
    question: string
    options: string[]
    correctAnswer: number
  }
}

const baseWordRoots: WordRoot[] = [
  {
    id: 1,
    root: 'a-/an-',
    origin: 'Greek',
    meaning: '否定含义',
    meaningEn: 'a',
    description: `a-/an- 来自希腊语，代表「没有、缺乏」。想象一个「anonymous（匿名的）」人，就是没有（an-）名字（onym）的人。这个前缀在医学术语中特别常见，比如 anemia（贫血）= 没有（an-）血（emia）。`,
    examples: [
      {
        word: 'amoral',
        breakdown: { prefix: 'a', root: 'moral', suffix: '' },
        meaning: '非道德的',
        explanation: '不道德的→非道德的'
      },
      {
        word: 'apolitical',
        breakdown: { prefix: 'a', root: 'political', suffix: '' },
        meaning: '不关政治的',
        explanation: '不关心政治→不关政治的'
      },
      {
        word: 'anonymous',
        breakdown: { prefix: 'an', root: 'onym', suffix: 'ous' },
        meaning: '匿名的',
        explanation: '没有名字→匿名的'
      },
      {
        word: 'anarchy',
        breakdown: { prefix: 'an', root: 'archy', suffix: '' },
        meaning: '无政府状态',
        explanation: '没有统治→无政府'
      }
    ],
    quiz: {
      question: 'amoral 的意思是什么？',
      options: ["非道德的", "无政府状态", "不关政治的", "匿名的"],
      correctAnswer: 0
    }
  },

  {
    id: 2,
    root: 'anti-',
    origin: 'Greek',
    meaning: '反对 / 抗击',
    meaningEn: 'anti',
    description: `anti- 源自希腊语 anti「对抗」。记住「抗生素 antibiotic」这个词：anti-（对抗）+ bio（生命）+ -tic（的），就是「对抗生命的」→ 专门对抗细菌的。从此你就能理解为什么「抗体 antibody」、「反战 antiwar」都用这个前缀。`,
    examples: [
      {
        word: 'antiwar',
        breakdown: { prefix: 'anti', root: 'war', suffix: '' },
        meaning: '反战的',
        explanation: '反对战争→反战的'
      },
      {
        word: 'antibody',
        breakdown: { prefix: 'anti', root: 'body', suffix: '' },
        meaning: '抗体',
        explanation: '对抗物→抗体'
      },
      {
        word: 'antipathy',
        breakdown: { prefix: 'anti', root: 'pathy', suffix: '' },
        meaning: '反感',
        explanation: '相反的感情→反感'
      },
      {
        word: 'antithesis',
        breakdown: { prefix: 'anti', root: 'thesis', suffix: '' },
        meaning: '对立',
        explanation: '相反的观点→对立'
      }
    ],
    quiz: {
      question: 'antiwar 的意思是什么？',
      options: ["反战的", "反感", "抗体", "对立"],
      correctAnswer: 0
    }
  },

  {
    id: 3,
    root: 'counter-',
    origin: 'Latin',
    meaning: '相反 / 对抗',
    meaningEn: 'counter',
    description: `counter- 来自拉丁语，字面意思「相反方向」。想象拳击场上的「反击 counterattack」：counter-（反向）+ attack（攻击）。商店柜台叫 counter，因为是面对面（counter）站着交易的地方。`,
    examples: [
      {
        word: 'counteract',
        breakdown: { prefix: 'counter', root: 'act', suffix: '' },
        meaning: '对抗',
        explanation: '相反行动→对抗'
      },
      {
        word: 'counterbalance',
        breakdown: { prefix: 'counter', root: 'balance', suffix: '' },
        meaning: '平衡',
        explanation: '反向平衡→平衡'
      },
      {
        word: 'counterfeit',
        breakdown: { prefix: 'counter', root: 'feit', suffix: '' },
        meaning: '伪造',
        explanation: '相反的制作→伪造'
      },
      {
        word: 'counterpart',
        breakdown: { prefix: 'counter', root: 'part', suffix: '' },
        meaning: '对应物',
        explanation: '对立的部分→对应物'
      }
    ],
    quiz: {
      question: 'counteract 的意思是什么？',
      options: ["平衡", "对应物", "伪造", "对抗"],
      correctAnswer: 3
    }
  },

  {
    id: 4,
    root: 'de-',
    origin: 'Latin',
    meaning: '向下，去除',
    meaningEn: 'de',
    description: `de- 有两个核心含义：①向下（descend下降）②去除（debug除错）。记住 decline 这个词：de-（向下）+ cline（倾斜）= 向下倾斜 → 衰退、拒绝。掌握这个前缀，200+单词轻松记。`,
    examples: [
      {
        word: 'descend',
        breakdown: { prefix: 'de', root: 'scend', suffix: '' },
        meaning: '下降',
        explanation: '向下走→下降'
      },
      {
        word: 'devalue',
        breakdown: { prefix: 'de', root: 'value', suffix: '' },
        meaning: '贬值',
        explanation: '去掉价值→贬值'
      },
      {
        word: 'deforest',
        breakdown: { prefix: 'de', root: 'forest', suffix: '' },
        meaning: '砍伐森林',
        explanation: '去除森林→砍伐'
      },
      {
        word: 'decode',
        breakdown: { prefix: 'de', root: 'code', suffix: '' },
        meaning: '解码',
        explanation: '去掉密码→解码'
      }
    ],
    quiz: {
      question: 'descend 的意思是什么？',
      options: ["解码", "贬值", "砍伐森林", "下降"],
      correctAnswer: 3
    }
  },

  {
    id: 5,
    root: 'dis-',
    origin: 'Latin',
    meaning: '否定含义 / 分开',
    meaningEn: 'dis',
    description: `dis- 代表「分离、相反」。记住 discover（发现）这个词：dis-（去掉）+ cover（覆盖物）= 把盖子揭开 → 发现。disappear = dis-（相反）+ appear（出现）→ 消失。这个前缀是英语中使用频率最高的否定前缀之一。`,
    examples: [
      {
        word: 'disagree',
        breakdown: { prefix: 'dis', root: 'agree', suffix: '' },
        meaning: '不同意',
        explanation: '不一致→不同意'
      },
      {
        word: 'disappear',
        breakdown: { prefix: 'dis', root: 'appear', suffix: '' },
        meaning: '消失',
        explanation: '不出现→消失'
      },
      {
        word: 'disconnect',
        breakdown: { prefix: 'dis', root: 'connect', suffix: '' },
        meaning: '断开',
        explanation: '不连接→断开'
      },
      {
        word: 'disorder',
        breakdown: { prefix: 'dis', root: 'order', suffix: '' },
        meaning: '混乱',
        explanation: '无秩序→混乱'
      }
    ],
    quiz: {
      question: 'disagree 的意思是什么？',
      options: ["断开", "混乱", "不同意", "消失"],
      correctAnswer: 2
    }
  },

  {
    id: 6,
    root: 'ex-/e-',
    origin: 'Latin',
    meaning: '向外',
    meaningEn: 'ex',
    description: `ex-/e- 代表「向外」。记住 exit（出口）：ex-（向外）+ it（走）= 向外走的地方。export（出口）= ex-（向外）+ port（运）→ 运出去。元音前会省略x变成e-，如 emit（发射）。`,
    examples: [
      {
        word: 'export',
        breakdown: { prefix: 'ex', root: 'port', suffix: '' },
        meaning: '出口 / 输出',
        explanation: '带出去→出口/输出'
      },
      {
        word: 'exit',
        breakdown: { prefix: 'ex', root: 'it', suffix: '' },
        meaning: '出口 / 退出',
        explanation: '走出去→出口/退出'
      },
      {
        word: 'emerge',
        breakdown: { prefix: 'e', root: 'merge', suffix: '' },
        meaning: '浮现',
        explanation: '出现→浮现'
      },
      {
        word: 'evade',
        breakdown: { prefix: 'e', root: 'vade', suffix: '' },
        meaning: '逃避',
        explanation: '走出去→逃避'
      }
    ],
    quiz: {
      question: 'export 的意思是什么？',
      options: ["浮现", "出口 / 输出", "出口 / 退出", "逃避"],
      correctAnswer: 1
    }
  },

  {
    id: 7,
    root: 'in-/im-',
    origin: 'Latin',
    meaning: '向内 / 否定含义',
    meaningEn: 'in',
    description: `in-/im- 有两个相反的意思，要根据词根判断：①进入（insert插入）②否定（impossible不可能）。辅音m/p/b前会变成im-，这是为了发音方便。记住：如果词根是形容词，in-通常表否定；如果是动词，通常表「进入」。`,
    examples: [
      {
        word: 'import',
        breakdown: { prefix: 'im', root: 'port', suffix: '' },
        meaning: '进口',
        explanation: '带进来→进口'
      },
      {
        word: 'income',
        breakdown: { prefix: 'in', root: 'come', suffix: '' },
        meaning: '收入',
        explanation: '进来的→收入'
      },
      {
        word: 'insert',
        breakdown: { prefix: 'in', root: 'sert', suffix: '' },
        meaning: '插入',
        explanation: '放进去→插入'
      },
      {
        word: 'invade',
        breakdown: { prefix: 'in', root: 'vade', suffix: '' },
        meaning: '入侵',
        explanation: '走进去→入侵'
      }
    ],
    quiz: {
      question: 'import 的意思是什么？',
      options: ["收入", "进口", "插入", "入侵"],
      correctAnswer: 1
    }
  },

  {
    id: 8,
    root: 'inter-',
    origin: 'Latin',
    meaning: '在...之间',
    meaningEn: 'inter',
    description: `inter- 来自拉丁语「在...之间」。internet（互联网）= inter-（相互之间）+ net（网）→ 相互连接的网络。international（国际的）= inter-（之间）+ national（国家的）→ 国与国之间的。`,
    examples: [
      {
        word: 'international',
        breakdown: { prefix: 'inter', root: 'national', suffix: '' },
        meaning: '国际的',
        explanation: '国家之间→国际的'
      },
      {
        word: 'internet',
        breakdown: { prefix: 'inter', root: 'net', suffix: '' },
        meaning: '互联网',
        explanation: '网络之间→互联网'
      },
      {
        word: 'interview',
        breakdown: { prefix: 'inter', root: 'view', suffix: '' },
        meaning: '面试',
        explanation: '相互看→面试'
      },
      {
        word: 'interact',
        breakdown: { prefix: 'inter', root: 'act', suffix: '' },
        meaning: '互动',
        explanation: '相互作用→互动'
      }
    ],
    quiz: {
      question: 'international 的意思是什么？',
      options: ["互动", "国际的", "互联网", "面试"],
      correctAnswer: 1
    }
  },

  {
    id: 9,
    root: 'sub-',
    origin: 'Latin',
    meaning: '在下，次',
    meaningEn: 'sub',
    description: `sub- 代表「在下面」。submarine（潜水艇）= sub-（在下）+ marine（海）→ 在海下的船。subway（地铁）= sub-（在下）+ way（路）→ 在地下的路。注意：辅音前会变形，如 support = sup- + port。`,
    examples: [
      {
        word: 'subway',
        breakdown: { prefix: 'sub', root: 'way', suffix: '' },
        meaning: '地铁',
        explanation: '地下通道→地铁'
      },
      {
        word: 'submarine',
        breakdown: { prefix: 'sub', root: 'marine', suffix: '' },
        meaning: '潜水艇',
        explanation: '水下的→潜水艇'
      },
      {
        word: 'subtitle',
        breakdown: { prefix: 'sub', root: 'title', suffix: '' },
        meaning: '字幕',
        explanation: '下方标题→字幕'
      },
      {
        word: 'subconscious',
        breakdown: { prefix: 'sub', root: 'conscious', suffix: '' },
        meaning: '潜意识',
        explanation: '意识之下→潜意识'
      }
    ],
    quiz: {
      question: 'subway 的意思是什么？',
      options: ["潜水艇", "地铁", "潜意识", "字幕"],
      correctAnswer: 1
    }
  },

  {
    id: 10,
    root: 'super-',
    origin: 'Latin',
    meaning: '在上，超',
    meaningEn: 'super',
    description: `super- 来自拉丁语「在上、超过」。superman（超人）、supermarket（超市，比普通市场更大）。记住：super- 强调「超越、胜过」，而 hyper- 强调「过度」。`,
    examples: [
      {
        word: 'superman',
        breakdown: { prefix: 'super', root: 'man', suffix: '' },
        meaning: '超人',
        explanation: '超级人类→超人'
      },
      {
        word: 'supervise',
        breakdown: { prefix: 'super', root: 'vise', suffix: '' },
        meaning: '监督',
        explanation: '从上看→监督'
      },
      {
        word: 'superior',
        breakdown: { prefix: 'super', root: 'ior', suffix: '' },
        meaning: '优越的',
        explanation: '在上的→优越的'
      },
      {
        word: 'supersonic',
        breakdown: { prefix: 'super', root: 'sonic', suffix: '' },
        meaning: '超音速的',
        explanation: '超过声速→超音速'
      }
    ],
    quiz: {
      question: 'superman 的意思是什么？',
      options: ["优越的", "监督", "超音速的", "超人"],
      correctAnswer: 3
    }
  },

  {
    id: 11,
    root: 'pre-',
    origin: 'Latin',
    meaning: '提前',
    meaningEn: 'pre',
    description: `pre- 代表「在前、提前」。predict（预测）= pre-（提前）+ dict（说）→ 提前说出来。preview（预览）= pre-（先）+ view（看）→ 先看一眼。这个前缀暗示「时间上靠前」。`,
    examples: [
      {
        word: 'predict',
        breakdown: { prefix: 'pre', root: 'dict', suffix: '' },
        meaning: '预测',
        explanation: '提前说→预测'
      },
      {
        word: 'prepare',
        breakdown: { prefix: 'pre', root: 'pare', suffix: '' },
        meaning: '准备',
        explanation: '提前准备→准备'
      },
      {
        word: 'preview',
        breakdown: { prefix: 'pre', root: 'view', suffix: '' },
        meaning: '预览',
        explanation: '提前看→预览'
      },
      {
        word: 'prefix',
        breakdown: { prefix: 'pre', root: 'fix', suffix: '' },
        meaning: '前缀',
        explanation: '固定在前→前缀'
      }
    ],
    quiz: {
      question: 'predict 的意思是什么？',
      options: ["预览", "准备", "预测", "前缀"],
      correctAnswer: 2
    }
  },

  {
    id: 12,
    root: 'post-',
    origin: 'Latin',
    meaning: '在...之后',
    meaningEn: 'post',
    description: `post- 代表「在后」。postpone（推迟）= post-（后）+ pone（放）→ 往后放。postwar（战后的）= post-（后）+ war（战争）→ 战争之后。与 pre- 相对。`,
    examples: [
      {
        word: 'postwar',
        breakdown: { prefix: 'post', root: 'war', suffix: '' },
        meaning: '战后的',
        explanation: '战争之后→战后'
      },
      {
        word: 'postpone',
        breakdown: { prefix: 'post', root: 'pone', suffix: '' },
        meaning: '推迟',
        explanation: '放到后面→推迟'
      },
      {
        word: 'postgraduate',
        breakdown: { prefix: 'post', root: 'graduate', suffix: '' },
        meaning: '研究生',
        explanation: '毕业后→研究生'
      },
      {
        word: 'postscript',
        breakdown: { prefix: 'post', root: 'script', suffix: '' },
        meaning: '附言',
        explanation: '写在后面→附言'
      }
    ],
    quiz: {
      question: 'postwar 的意思是什么？',
      options: ["附言", "战后的", "研究生", "推迟"],
      correctAnswer: 1
    }
  },

  {
    id: 13,
    root: 're-',
    origin: 'Latin',
    meaning: '再次 / 回退',
    meaningEn: 're',
    description: `re- 是最常用的前缀之一，代表「再次、回」。return（返回）、review（复习）、recycle（回收利用）。记住：re- 的单词通常代表「重复做某事」或「回到原来的状态」。`,
    examples: [
      {
        word: 'return',
        breakdown: { prefix: 're', root: 'turn', suffix: '' },
        meaning: '返回',
        explanation: '转回来→返回'
      },
      {
        word: 'review',
        breakdown: { prefix: 're', root: 'view', suffix: '' },
        meaning: '复习',
        explanation: '再看→复习'
      },
      {
        word: 'recycle',
        breakdown: { prefix: 're', root: 'cycle', suffix: '' },
        meaning: '回收',
        explanation: '再循环→回收'
      },
      {
        word: 'repeat',
        breakdown: { prefix: 're', root: 'peat', suffix: '' },
        meaning: '重复',
        explanation: '再做→重复'
      }
    ],
    quiz: {
      question: 'return 的意思是什么？',
      options: ["返回", "复习", "重复", "回收"],
      correctAnswer: 0
    }
  },

  {
    id: 14,
    root: 'mono-',
    origin: 'Greek',
    meaning: '单一',
    meaningEn: 'mono',
    description: `mono- 来自希腊语「单个、一」。monologue（独白）= mono-（单个）+ logue（说）→ 一个人说 → 独白。monopoly（垄断）= mono-（单个）+ poly（卖）→ 只有一个人卖 → 垄断。monochrome（单色）= mono-（单）+ chrome（色）→ 单一颜色。`,
    examples: [
      {
        word: 'monopoly',
        breakdown: { prefix: 'mono', root: 'poly', suffix: '' },
        meaning: '垄断',
        explanation: '单独卖→垄断'
      },
      {
        word: 'monologue',
        breakdown: { prefix: 'mono', root: 'logue', suffix: '' },
        meaning: '独白',
        explanation: '一个人说→独白'
      },
      {
        word: 'monotonous',
        breakdown: { prefix: 'mono', root: 'ton', suffix: 'ous' },
        meaning: '单调的',
        explanation: '一个声调→单调的'
      },
      {
        word: 'monarch',
        breakdown: { prefix: 'mon', root: 'arch', suffix: '' },
        meaning: '君主',
        explanation: '单独统治→君主'
      }
    ],
    quiz: {
      question: 'monopoly 的意思是什么？',
      options: ["单调的", "独白", "君主", "垄断"],
      correctAnswer: 3
    }
  },

  {
    id: 15,
    root: 'bi-',
    origin: 'Latin',
    meaning: '两个 / 双重',
    meaningEn: 'bi',
    description: `bi- 来自拉丁语「二、双」。bicycle（自行车）= bi-（双）+ cycle（轮）→ 双轮车。bilingual（双语的）= bi-（双）+ lingual（语言的）。`,
    examples: [
      {
        word: 'bicycle',
        breakdown: { prefix: 'bi', root: 'cycle', suffix: '' },
        meaning: '自行车',
        explanation: '两个轮→自行车'
      },
      {
        word: 'bilingual',
        breakdown: { prefix: 'bi', root: 'lingual', suffix: '' },
        meaning: '双语的',
        explanation: '两种语言→双语的'
      },
      {
        word: 'biannual',
        breakdown: { prefix: 'bi', root: 'annual', suffix: '' },
        meaning: '一年两次',
        explanation: '两次年度→一年两次'
      },
      {
        word: 'bilateral',
        breakdown: { prefix: 'bi', root: 'lateral', suffix: '' },
        meaning: '双边的',
        explanation: '两边→双边的'
      }
    ],
    quiz: {
      question: 'bicycle 的意思是什么？',
      options: ["一年两次", "双语的", "双边的", "自行车"],
      correctAnswer: 3
    }
  },

  {
    id: 16,
    root: 'tri-',
    origin: 'Latin',
    meaning: '三',
    meaningEn: 'tri',
    description: `tri- 代表「三」。triangle（三角形）、tricycle（三轮车）。记住：tri- 总是和「3」相关。`,
    examples: [
      {
        word: 'triangle',
        breakdown: { prefix: 'tri', root: 'angle', suffix: '' },
        meaning: '三角形',
        explanation: '三个角→三角形'
      },
      {
        word: 'tricycle',
        breakdown: { prefix: 'tri', root: 'cycle', suffix: '' },
        meaning: '三轮车',
        explanation: '三个轮→三轮车'
      },
      {
        word: 'triple',
        breakdown: { prefix: 'tri', root: 'ple', suffix: '' },
        meaning: '三倍的',
        explanation: '三重→三倍的'
      },
      {
        word: 'trilogy',
        breakdown: { prefix: 'tri', root: 'logy', suffix: '' },
        meaning: '三部曲',
        explanation: '三个故事→三部曲'
      }
    ],
    quiz: {
      question: 'triangle 的意思是什么？',
      options: ["三角形", "三倍的", "三部曲", "三轮车"],
      correctAnswer: 0
    }
  },

  {
    id: 17,
    root: 'multi-',
    origin: 'Latin',
    meaning: '多个 / 多重',
    meaningEn: 'multi',
    description: `multi- 代表「多」。multimedia（多媒体）、multinational（跨国的）。记住：multi- 强调「很多、多种」。`,
    examples: [
      {
        word: 'multimedia',
        breakdown: { prefix: 'multi', root: 'media', suffix: '' },
        meaning: '多媒体',
        explanation: '多个媒介→多媒体'
      },
      {
        word: 'multinational',
        breakdown: { prefix: 'multi', root: 'national', suffix: '' },
        meaning: '跨国的',
        explanation: '多个国家→跨国的'
      },
      {
        word: 'multiple',
        breakdown: { prefix: 'multi', root: 'ple', suffix: '' },
        meaning: '多重的',
        explanation: '多个→多重的'
      },
      {
        word: 'multiply',
        breakdown: { prefix: 'multi', root: 'ply', suffix: '' },
        meaning: '乘；繁殖',
        explanation: '变多→乘'
      }
    ],
    quiz: {
      question: 'multimedia 的意思是什么？',
      options: ["多重的", "跨国的", "多媒体", "乘；繁殖"],
      correctAnswer: 2
    }
  },

  {
    id: 18,
    root: 'micro-',
    origin: 'Greek',
    meaning: '微，小',
    meaningEn: 'micro',
    description: `micro- 来自希腊语「小」。microscope（显微镜）= micro-（小）+ scope（看）→ 看微小东西的工具。microphone（麦克风）= micro-（小）+ phone（声音）→ 小声音也能听到。`,
    examples: [
      {
        word: 'microscope',
        breakdown: { prefix: 'micro', root: 'scope', suffix: '' },
        meaning: '显微镜',
        explanation: '看小东西→显微镜'
      },
      {
        word: 'microphone',
        breakdown: { prefix: 'micro', root: 'phone', suffix: '' },
        meaning: '麦克风',
        explanation: '小声音→麦克风'
      },
      {
        word: 'microwave',
        breakdown: { prefix: 'micro', root: 'wave', suffix: '' },
        meaning: '微波',
        explanation: '小波→微波'
      },
      {
        word: 'microorganism',
        breakdown: { prefix: 'micro', root: 'organism', suffix: '' },
        meaning: '微生物',
        explanation: '小生物→微生物'
      }
    ],
    quiz: {
      question: 'microscope 的意思是什么？',
      options: ["微波", "微生物", "麦克风", "显微镜"],
      correctAnswer: 3
    }
  },

  {
    id: 19,
    root: 'macro-',
    origin: 'Greek',
    meaning: '宏大 / 宏观',
    meaningEn: 'macro',
    description: `macro- 代表「大、宏观」（与 micro- 相对）。macroeconomics（宏观经济学）= macro-（大）+ economics（经济学）。macroscopic（肉眼可见的）= macro-（大）+ scopic（看）。`,
    examples: [
      {
        word: 'macroeconomics',
        breakdown: { prefix: 'macro', root: 'economics', suffix: '' },
        meaning: '宏观经济学',
        explanation: '大经济→宏观经济'
      },
      {
        word: 'macroscopic',
        breakdown: { prefix: 'macro', root: 'scopic', suffix: '' },
        meaning: '宏观的',
        explanation: '大范围看→宏观'
      },
      {
        word: 'macrocosm',
        breakdown: { prefix: 'macro', root: 'cosm', suffix: '' },
        meaning: '宇宙',
        explanation: '大世界→宇宙'
      },
      {
        word: 'macrobiotic',
        breakdown: { prefix: 'macro', root: 'biotic', suffix: '' },
        meaning: '长寿的',
        explanation: '大生命→长寿'
      }
    ],
    quiz: {
      question: 'macroeconomics 的意思是什么？',
      options: ["宏观经济学", "宇宙", "宏观的", "长寿的"],
      correctAnswer: 0
    }
  },

  {
    id: 20,
    root: 'mini-',
    origin: 'Latin',
    meaning: '小',
    meaningEn: 'mini',
    description: `mini- 代表「小、迷你」。minimum（最小值）、miniature（微型）。记住：mini- 强调「小型化」，如 miniskirt（迷你裙）。`,
    examples: [
      {
        word: 'minimum',
        breakdown: { prefix: 'mini', root: 'mum', suffix: '' },
        meaning: '最小值',
        explanation: '最小→最小值'
      },
      {
        word: 'miniature',
        breakdown: { prefix: 'mini', root: 'ature', suffix: '' },
        meaning: '微型的',
        explanation: '小的→微型的'
      },
      {
        word: 'minimize',
        breakdown: { prefix: 'mini', root: 'mize', suffix: '' },
        meaning: '最小化',
        explanation: '使变小→最小化'
      },
      {
        word: 'miniskirt',
        breakdown: { prefix: 'mini', root: 'skirt', suffix: '' },
        meaning: '迷你裙',
        explanation: '小裙子→迷你裙'
      }
    ],
    quiz: {
      question: 'minimum 的意思是什么？',
      options: ["最小化", "迷你裙", "微型的", "最小值"],
      correctAnswer: 3
    }
  },

  {
    id: 21,
    root: 'auto-',
    origin: 'Greek',
    meaning: '自己，自动',
    meaningEn: 'auto',
    description: `auto- 来自希腊语「自己」。automobile（汽车）= auto-（自己）+ mobile（移动）→ 自己会动的车。autobiography（自传）= auto-（自己）+ bio（生命）+ graphy（写）→ 写自己的人生。`,
    examples: [
      {
        word: 'automatic',
        breakdown: { prefix: 'auto', root: 'matic', suffix: '' },
        meaning: '自动的',
        explanation: '自己动→自动的'
      },
      {
        word: 'autobiography',
        breakdown: { prefix: 'auto', root: 'biography', suffix: '' },
        meaning: '自传',
        explanation: '自己写传→自传'
      },
      {
        word: 'autonomous',
        breakdown: { prefix: 'auto', root: 'nomous', suffix: '' },
        meaning: '自治的',
        explanation: '自己管理→自治的'
      },
      {
        word: 'automobile',
        breakdown: { prefix: 'auto', root: 'mobile', suffix: '' },
        meaning: '汽车',
        explanation: '自己动→汽车'
      }
    ],
    quiz: {
      question: 'automatic 的意思是什么？',
      options: ["自治的", "自动的", "汽车", "自传"],
      correctAnswer: 1
    }
  },

  {
    id: 22,
    root: 'co-/com-/con-',
    origin: 'Latin',
    meaning: '一起 / 共同',
    meaningEn: 'co',
    description: `co-/com-/con- 代表「共同、一起」。cooperate（合作）= co-（共同）+ operate（操作）→ 一起做事。company（公司）= com-（一起）+ pan（面包）+ -y → 一起吃面包的人 → 伙伴 → 公司。`,
    examples: [
      {
        word: 'cooperation',
        breakdown: { prefix: 'co', root: 'operation', suffix: '' },
        meaning: '合作',
        explanation: '共同操作→合作'
      },
      {
        word: 'combine',
        breakdown: { prefix: 'com', root: 'bine', suffix: '' },
        meaning: '结合',
        explanation: '放在一起→结合'
      },
      {
        word: 'connect',
        breakdown: { prefix: 'con', root: 'nect', suffix: '' },
        meaning: '连接',
        explanation: '绑在一起→连接'
      },
      {
        word: 'collect',
        breakdown: { prefix: 'col', root: 'lect', suffix: '' },
        meaning: '收集',
        explanation: '一起选→收集'
      }
    ],
    quiz: {
      question: 'cooperation 的意思是什么？',
      options: ["收集", "结合", "连接", "合作"],
      correctAnswer: 3
    }
  },

  {
    id: 23,
    root: 'tele-',
    origin: 'Greek',
    meaning: '远',
    meaningEn: 'tele',
    description: `tele- 来自希腊语「远」。television（电视）= tele-（远）+ vision（看）→ 看远处的东西。telephone（电话）= tele-（远）+ phone（声音）→ 远距离传声。`,
    examples: [
      {
        word: 'telephone',
        breakdown: { prefix: 'tele', root: 'phone', suffix: '' },
        meaning: '电话',
        explanation: '远距离声音→电话'
      },
      {
        word: 'television',
        breakdown: { prefix: 'tele', root: 'vision', suffix: '' },
        meaning: '电视',
        explanation: '远距离看→电视'
      },
      {
        word: 'telescope',
        breakdown: { prefix: 'tele', root: 'scope', suffix: '' },
        meaning: '望远镜',
        explanation: '看远处→望远镜'
      },
      {
        word: 'telegram',
        breakdown: { prefix: 'tele', root: 'gram', suffix: '' },
        meaning: '电报',
        explanation: '远距离写→电报'
      }
    ],
    quiz: {
      question: 'telephone 的意思是什么？',
      options: ["望远镜", "电报", "电视", "电话"],
      correctAnswer: 3
    }
  },

  {
    id: 24,
    root: 'trans-',
    origin: 'Latin',
    meaning: '穿过，转换',
    meaningEn: 'trans',
    description: `trans- 代表「穿过、转变」。transport（运输）= trans-（穿过）+ port（运）→ 运送穿越。translate（翻译）= trans-（转）+ late（搬运）→ 把意思从一种语言转到另一种。`,
    examples: [
      {
        word: 'transport',
        breakdown: { prefix: 'trans', root: 'port', suffix: '' },
        meaning: '运输',
        explanation: '带过去→运输'
      },
      {
        word: 'translate',
        breakdown: { prefix: 'trans', root: 'late', suffix: '' },
        meaning: '翻译',
        explanation: '转换语言→翻译'
      },
      {
        word: 'transfer',
        breakdown: { prefix: 'trans', root: 'fer', suffix: '' },
        meaning: '转移',
        explanation: '带过去→转移'
      },
      {
        word: 'transform',
        breakdown: { prefix: 'trans', root: 'form', suffix: '' },
        meaning: '变形',
        explanation: '改变形式→变形'
      }
    ],
    quiz: {
      question: 'transport 的意思是什么？',
      options: ["转移", "变形", "翻译", "运输"],
      correctAnswer: 3
    }
  },

  {
    id: 25,
    root: 'uni-',
    origin: 'Latin',
    meaning: '单一，统一',
    meaningEn: 'uni',
    description: `uni- 来自拉丁语「一」。uniform（制服）= uni-（统一）+ form（形式）→ 统一的形式。unique（独特的）= uni-（一）+ -que → 唯一的 → 独特的。universe（宇宙）= uni-（一）+ verse（转）→ 作为一个整体旋转的东西。`,
    examples: [
      {
        word: 'uniform',
        breakdown: { prefix: 'uni', root: 'form', suffix: '' },
        meaning: '制服；统一的',
        explanation: '一种形式→制服'
      },
      {
        word: 'unique',
        breakdown: { prefix: 'uni', root: 'que', suffix: '' },
        meaning: '独特的',
        explanation: '唯一的→独特的'
      },
      {
        word: 'unite',
        breakdown: { prefix: 'uni', root: 'te', suffix: '' },
        meaning: '联合',
        explanation: '成为一体→联合'
      },
      {
        word: 'universe',
        breakdown: { prefix: 'uni', root: 'verse', suffix: '' },
        meaning: '宇宙',
        explanation: '统一的世界→宇宙'
      }
    ],
    quiz: {
      question: 'uniform 的意思是什么？',
      options: ["联合", "独特的", "宇宙", "制服；统一的"],
      correctAnswer: 3
    }
  },

  {
    id: 26,
    root: 'spect/spec',
    origin: 'Latin',
    meaning: '看',
    meaningEn: 'spect',
    description: `spect/spec 来自拉丁语「看」。respect（尊重）= re-（再）+ spect（看）→ 再看一眼 → 重视。inspect（检查）= in-（向内）+ spect（看）→ 仔细看里面。这是最重要的词根之一，衍生出50+单词。`,
    examples: [
      {
        word: 'inspect',
        breakdown: { prefix: 'in', root: 'spect', suffix: '' },
        meaning: '检查',
        explanation: '向内看→检查'
      },
      {
        word: 'respect',
        breakdown: { prefix: 're', root: 'spect', suffix: '' },
        meaning: '尊重',
        explanation: '再看→尊重'
      },
      {
        word: 'prospect',
        breakdown: { prefix: 'pro', root: 'spect', suffix: '' },
        meaning: '前景',
        explanation: '向前看→前景'
      },
      {
        word: 'spectator',
        breakdown: { prefix: '', root: 'spect', suffix: 'ator' },
        meaning: '观众',
        explanation: '看的人→观众'
      },
      {
        word: 'aspect',
        breakdown: { prefix: 'a', root: 'spect', suffix: '' },
        meaning: '方面',
        explanation: '朝向看→方面'
      }
    ],
    quiz: {
      question: 'inspect 的意思是什么？',
      options: ["检查", "尊重", "前景", "观众"],
      correctAnswer: 0
    }
  },

  {
    id: 27,
    root: 'vis/vid',
    origin: 'Latin',
    meaning: '看见',
    meaningEn: 'vis',
    description: `vis/vid 也代表「看见」，但更强调「视觉」。television = tele-（远）+ vis（看）+ -ion → 看远处的东西。video（视频）直接来自拉丁语「我看到」。`,
    examples: [
      {
        word: 'visible',
        breakdown: { prefix: '', root: 'vis', suffix: 'ible' },
        meaning: '可见的',
        explanation: '能看见→可见的'
      },
      {
        word: 'invisible',
        breakdown: { prefix: 'in', root: 'vis', suffix: 'ible' },
        meaning: '看不见的',
        explanation: '不能看见→隐形的'
      },
      {
        word: 'supervise',
        breakdown: { prefix: 'super', root: 'vis', suffix: 'e' },
        meaning: '监督',
        explanation: '从上面看→监督'
      },
      {
        word: 'television',
        breakdown: { prefix: 'tele', root: 'vis', suffix: 'ion' },
        meaning: '电视',
        explanation: '远距离看→电视'
      },
      {
        word: 'video',
        breakdown: { prefix: '', root: 'vid', suffix: 'eo' },
        meaning: '视频',
        explanation: '看的东西→视频'
      }
    ],
    quiz: {
      question: 'visible 的意思是什么？',
      options: ["监督", "可见的", "看不见的", "电视"],
      correctAnswer: 1
    }
  },

  {
    id: 28,
    root: 'aud/audit',
    origin: 'Latin',
    meaning: '听',
    meaningEn: 'aud',
    description: `aud/audit 代表「听」。audio（音频）、audience（观众）= aud（听）+ -ience（人）→ 听的人。auditorium（礼堂）= audit（听）+ -orium（地方）→ 听的地方。`,
    examples: [
      {
        word: 'audio',
        breakdown: { prefix: '', root: 'aud', suffix: 'io' },
        meaning: '音频',
        explanation: '用来听→音频'
      },
      {
        word: 'audience',
        breakdown: { prefix: '', root: 'aud', suffix: 'ience' },
        meaning: '观众',
        explanation: '听的人→观众'
      },
      {
        word: 'audible',
        breakdown: { prefix: '', root: 'aud', suffix: 'ible' },
        meaning: '听得见的',
        explanation: '能听见→听得见的'
      },
      {
        word: 'auditorium',
        breakdown: { prefix: '', root: 'aud', suffix: 'itorium' },
        meaning: '礼堂',
        explanation: '听的地方→礼堂'
      },
      {
        word: 'audit',
        breakdown: { prefix: '', root: 'audit', suffix: '' },
        meaning: '审计',
        explanation: '听取报告→审计'
      }
    ],
    quiz: {
      question: 'audio 的意思是什么？',
      options: ["音频", "听得见的", "礼堂", "观众"],
      correctAnswer: 0
    }
  },

  {
    id: 29,
    root: 'dict',
    origin: 'Latin',
    meaning: '说',
    meaningEn: 'dict',
    description: `dict 代表「说」。dictionary（字典）= dict（说）+ -ion（名词）+ -ary（的）→ 说明词语的书。predict（预测）= pre-（提前）+ dict（说）→ 提前说出来。`,
    examples: [
      {
        word: 'predict',
        breakdown: { prefix: 'pre', root: 'dict', suffix: '' },
        meaning: '预测',
        explanation: '提前说→预测'
      },
      {
        word: 'dictionary',
        breakdown: { prefix: '', root: 'dict', suffix: 'ionary' },
        meaning: '字典',
        explanation: '说话的书→字典'
      },
      {
        word: 'contradict',
        breakdown: { prefix: 'contra', root: 'dict', suffix: '' },
        meaning: '反驳',
        explanation: '说相反的→反驳'
      },
      {
        word: 'verdict',
        breakdown: { prefix: 'ver', root: 'dict', suffix: '' },
        meaning: '裁决',
        explanation: '说真话→裁决'
      },
      {
        word: 'dictate',
        breakdown: { prefix: '', root: 'dict', suffix: 'ate' },
        meaning: '口述',
        explanation: '说出来→口述'
      }
    ],
    quiz: {
      question: 'predict 的意思是什么？',
      options: ["字典", "反驳", "裁决", "预测"],
      correctAnswer: 3
    }
  },

  {
    id: 30,
    root: 'scrib/script',
    origin: 'Latin',
    meaning: '写',
    meaningEn: 'scrib',
    description: `scrib/script 代表「写」。describe（描述）= de-（完全）+ scrib（写）→ 详细写出来。manuscript（手稿）= manu-（手）+ script（写）→ 手写的东西。`,
    examples: [
      {
        word: 'describe',
        breakdown: { prefix: 'de', root: 'scrib', suffix: 'e' },
        meaning: '描述',
        explanation: '写下来→描述'
      },
      {
        word: 'prescribe',
        breakdown: { prefix: 'pre', root: 'scrib', suffix: 'e' },
        meaning: '开处方',
        explanation: '提前写→开处方'
      },
      {
        word: 'subscribe',
        breakdown: { prefix: 'sub', root: 'scrib', suffix: 'e' },
        meaning: '订阅',
        explanation: '在下面签名→订阅'
      },
      {
        word: 'manuscript',
        breakdown: { prefix: 'manu', root: 'script', suffix: '' },
        meaning: '手稿',
        explanation: '手写的→手稿'
      },
      {
        word: 'transcript',
        breakdown: { prefix: 'trans', root: 'script', suffix: '' },
        meaning: '抄本',
        explanation: '抄写过来→抄本'
      }
    ],
    quiz: {
      question: 'describe 的意思是什么？',
      options: ["手稿", "订阅", "开处方", "描述"],
      correctAnswer: 3
    }
  },

  {
    id: 31,
    root: 'graph',
    origin: 'Greek',
    meaning: '写，画',
    meaningEn: 'graph',
    description: `graph 代表「写、画、记录」。photograph（照片）= photo-（光）+ graph（画）→ 用光画出来的图。biography（传记）= bio-（生命）+ graph（写）→ 写人生的书。`,
    examples: [
      {
        word: 'photograph',
        breakdown: { prefix: 'photo', root: 'graph', suffix: '' },
        meaning: '照片',
        explanation: '用光画→照片'
      },
      {
        word: 'paragraph',
        breakdown: { prefix: 'para', root: 'graph', suffix: '' },
        meaning: '段落',
        explanation: '写在旁边→段落'
      },
      {
        word: 'autograph',
        breakdown: { prefix: 'auto', root: 'graph', suffix: '' },
        meaning: '亲笔签名',
        explanation: '自己写→签名'
      },
      {
        word: 'biography',
        breakdown: { prefix: 'bio', root: 'graph', suffix: 'y' },
        meaning: '传记',
        explanation: '写生平→传记'
      },
      {
        word: 'graphic',
        breakdown: { prefix: '', root: 'graph', suffix: 'ic' },
        meaning: '图形的',
        explanation: '画的→图形的'
      }
    ],
    quiz: {
      question: 'photograph 的意思是什么？',
      options: ["传记", "段落", "照片", "亲笔签名"],
      correctAnswer: 2
    }
  },

  {
    id: 32,
    root: 'port',
    origin: 'Latin',
    meaning: '拿，带',
    meaningEn: 'port',
    description: `port 代表「拿、带、运」。export（出口）= ex-（向外）+ port（运）→ 运出去。portable（便携的）= port（带）+ -able（可...的）→ 可以带着走的。`,
    examples: [
      {
        word: 'transport',
        breakdown: { prefix: 'trans', root: 'port', suffix: '' },
        meaning: '运输',
        explanation: '带过去→运输'
      },
      {
        word: 'export',
        breakdown: { prefix: 'ex', root: 'port', suffix: '' },
        meaning: '出口',
        explanation: '带出去→出口'
      },
      {
        word: 'import',
        breakdown: { prefix: 'im', root: 'port', suffix: '' },
        meaning: '进口',
        explanation: '带进来→进口'
      },
      {
        word: 'support',
        breakdown: { prefix: 'sup', root: 'port', suffix: '' },
        meaning: '支持',
        explanation: '从下托起→支持'
      },
      {
        word: 'portable',
        breakdown: { prefix: '', root: 'port', suffix: 'able' },
        meaning: '便携的',
        explanation: '能带的→便携的'
      }
    ],
    quiz: {
      question: 'transport 的意思是什么？',
      options: ["运输", "出口", "进口", "支持"],
      correctAnswer: 0
    }
  },

  {
    id: 33,
    root: 'duct/duc',
    origin: 'Latin',
    meaning: '引导',
    meaningEn: 'duct',
    description: `duct/duc 代表「引导、带领」。conduct（引导）、educate（教育）= e-（向外）+ duc（引）+ -ate（使）→ 把知识引出来 → 教育。`,
    examples: [
      {
        word: 'conduct',
        breakdown: { prefix: 'con', root: 'duct', suffix: '' },
        meaning: '引导',
        explanation: '一起引导→指挥'
      },
      {
        word: 'produce',
        breakdown: { prefix: 'pro', root: 'duce', suffix: '' },
        meaning: '生产',
        explanation: '向前引→生产'
      },
      {
        word: 'reduce',
        breakdown: { prefix: 're', root: 'duce', suffix: '' },
        meaning: '减少',
        explanation: '向后引→减少'
      },
      {
        word: 'educate',
        breakdown: { prefix: 'e', root: 'duc', suffix: 'ate' },
        meaning: '教育',
        explanation: '引出来→教育'
      },
      {
        word: 'introduce',
        breakdown: { prefix: 'intro', root: 'duce', suffix: '' },
        meaning: '介绍',
        explanation: '引进来→介绍'
      }
    ],
    quiz: {
      question: 'conduct 的意思是什么？',
      options: ["教育", "生产", "引导", "减少"],
      correctAnswer: 2
    }
  },

  {
    id: 34,
    root: 'fer',
    origin: 'Latin',
    meaning: '带，拿',
    meaningEn: 'fer',
    description: `fer 代表「带、拿」。transfer（转移）= trans-（穿过）+ fer（带）→ 带过去。refer（提到）= re-（回）+ fer（带）→ 带回来说 → 提到。`,
    examples: [
      {
        word: 'transfer',
        breakdown: { prefix: 'trans', root: 'fer', suffix: '' },
        meaning: '转移',
        explanation: '带过去→转移'
      },
      {
        word: 'refer',
        breakdown: { prefix: 're', root: 'fer', suffix: '' },
        meaning: '参考',
        explanation: '带回来→参考'
      },
      {
        word: 'prefer',
        breakdown: { prefix: 'pre', root: 'fer', suffix: '' },
        meaning: '偏爱',
        explanation: '带到前面→偏爱'
      },
      {
        word: 'differ',
        breakdown: { prefix: 'dif', root: 'fer', suffix: '' },
        meaning: '不同',
        explanation: '带开→不同'
      },
      {
        word: 'offer',
        breakdown: { prefix: 'of', root: 'fer', suffix: '' },
        meaning: '提供',
        explanation: '带向→提供'
      }
    ],
    quiz: {
      question: 'transfer 的意思是什么？',
      options: ["转移", "偏爱", "参考", "不同"],
      correctAnswer: 0
    }
  },

  {
    id: 35,
    root: 'mit/miss',
    origin: 'Latin',
    meaning: '送，放',
    meaningEn: 'mit',
    description: `mit/miss 代表「送、放」。submit（提交）= sub-（向下）+ mit（送）→ 向下送 → 提交。mission（任务）= miss（送）+ -ion → 被派遣去做的事 → 任务。`,
    memoryHint: 'mit/miss 的核心不是“递东西”，而是把人、信息或许可“送入某个状态”。',
    commonPitfall: 'admit 不要硬记成“向……送”，可以理解为“让事实进入记录/承认范围”。',
    examples: [
      {
        word: 'admit',
        breakdown: { prefix: 'ad', root: 'mit', suffix: '' },
        partMeanings: { prefix: '朝向 / 进入', root: '送入 / 放入' },
        meaning: '承认',
        explanation: '让事实进入承认范围→承认',
        literalMeaning: '送入某个范围',
        learningNote: '语义已经抽象化：admit 也可表示“准许进入”。',
      },
      {
        word: 'commit',
        breakdown: { prefix: 'com', root: 'mit', suffix: '' },
        meaning: '承诺',
        explanation: '一起送→承诺'
      },
      {
        word: 'dismiss',
        breakdown: { prefix: 'dis', root: 'miss', suffix: '' },
        meaning: '解散',
        explanation: '送开→解散'
      },
      {
        word: 'permit',
        breakdown: { prefix: 'per', root: 'mit', suffix: '' },
        partMeanings: { prefix: '通过', root: '送 / 放行' },
        meaning: '允许',
        explanation: '让通过→允许',
        literalMeaning: '放行通过',
      },
      {
        word: 'transmit',
        breakdown: { prefix: 'trans', root: 'mit', suffix: '' },
        meaning: '传送',
        explanation: '送过去→传送'
      }
    ],
    quiz: {
      question: 'admit 的意思是什么？',
      options: ["解散", "承认", "承诺", "允许"],
      correctAnswer: 1
    }
  },

  {
    id: 36,
    root: 'pos/posit',
    origin: 'Latin',
    meaning: '放',
    meaningEn: 'pos',
    description: `pos/pon 代表「放置」。compose（组成）= com-（一起）+ pos（放）→ 放在一起 → 组成。postpone（推迟）= post-（后）+ pon（放）→ 往后放 → 推迟。`,
    examples: [
      {
        word: 'position',
        breakdown: { prefix: '', root: 'posit', suffix: 'ion' },
        meaning: '位置',
        explanation: '放的地方→位置'
      },
      {
        word: 'compose',
        breakdown: { prefix: 'com', root: 'pose', suffix: '' },
        meaning: '组成',
        explanation: '放在一起→组成'
      },
      {
        word: 'dispose',
        breakdown: { prefix: 'dis', root: 'pose', suffix: '' },
        meaning: '处理',
        explanation: '分开放→处理'
      },
      {
        word: 'expose',
        breakdown: { prefix: 'ex', root: 'pose', suffix: '' },
        meaning: '暴露',
        explanation: '放出来→暴露'
      },
      {
        word: 'oppose',
        breakdown: { prefix: 'op', root: 'pose', suffix: '' },
        meaning: '反对',
        explanation: '对着放→反对'
      }
    ],
    quiz: {
      question: 'position 的意思是什么？',
      options: ["组成", "暴露", "处理", "位置"],
      correctAnswer: 3
    }
  },

  {
    id: 37,
    root: 'st/sta/stat',
    origin: 'Latin',
    meaning: '站',
    meaningEn: 'st',
    description: `st/sta/stat 代表「站、立」。stand（站立）来自同源。station（车站）= stat（站）+ -ion → 站的地方。stable（稳定的）= sta（站）+ -ble（能...的）→ 能站稳的 → 稳定的。statue（雕像）= stat（站）+ -ue → 站着的东西。`,
    examples: [
      {
        word: 'stand',
        breakdown: { prefix: '', root: 'st', suffix: 'and' },
        meaning: '站',
        explanation: '站立'
      },
      {
        word: 'stable',
        breakdown: { prefix: '', root: 'sta', suffix: 'ble' },
        meaning: '稳定的',
        explanation: '能站→稳定的'
      },
      {
        word: 'statue',
        breakdown: { prefix: '', root: 'stat', suffix: 'ue' },
        meaning: '雕像',
        explanation: '站着的→雕像'
      },
      {
        word: 'station',
        breakdown: { prefix: '', root: 'stat', suffix: 'ion' },
        meaning: '车站',
        explanation: '站的地方→车站'
      },
      {
        word: 'status',
        breakdown: { prefix: '', root: 'stat', suffix: 'us' },
        meaning: '状态',
        explanation: '站的样子→状态'
      }
    ],
    quiz: {
      question: 'stand 的意思是什么？',
      options: ["稳定的", "车站", "雕像", "站"],
      correctAnswer: 3
    }
  },

  {
    id: 38,
    root: 'ject',
    origin: 'Latin',
    meaning: '投，掷',
    meaningEn: 'ject',
    description: `ject 代表「扔、投」。project（项目）= pro-（向前）+ ject（扔）→ 向前扔的计划。reject（拒绝）= re-（回）+ ject（扔）→ 扔回去 → 拒绝。inject（注射）= in-（进入）+ ject（扔）→ 扔进去 → 注射。`,
    examples: [
      {
        word: 'project',
        breakdown: { prefix: 'pro', root: 'ject', suffix: '' },
        meaning: '投射',
        explanation: '向前掷→投射'
      },
      {
        word: 'reject',
        breakdown: { prefix: 're', root: 'ject', suffix: '' },
        meaning: '拒绝',
        explanation: '往回扔→拒绝'
      },
      {
        word: 'inject',
        breakdown: { prefix: 'in', root: 'ject', suffix: '' },
        meaning: '注射',
        explanation: '扔进去→注射'
      },
      {
        word: 'object',
        breakdown: { prefix: 'ob', root: 'ject', suffix: '' },
        meaning: '反对',
        explanation: '对着扔→反对'
      },
      {
        word: 'subject',
        breakdown: { prefix: 'sub', root: 'ject', suffix: '' },
        meaning: '主题',
        explanation: '扔在下面→主题'
      }
    ],
    quiz: {
      question: 'project 的意思是什么？',
      options: ["注射", "投射", "拒绝", "反对"],
      correctAnswer: 1
    }
  },

  {
    id: 39,
    root: 'ment',
    origin: 'Latin',
    meaning: '心智',
    meaningEn: 'ment',
    description: `ment 代表「心智、思考」。mental（精神的）、mention（提及）= ment（心智）+ -ion → 心里想到 → 提及。comment（评论）= com-（一起）+ ment（心智）+ -t → 一起思考 → 评论。`,
    examples: [
      {
        word: 'mental',
        breakdown: { prefix: '', root: 'ment', suffix: 'al' },
        meaning: '精神的',
        explanation: '心智的→精神的'
      },
      {
        word: 'comment',
        breakdown: { prefix: 'com', root: 'ment', suffix: '' },
        meaning: '评论',
        explanation: '用心想→评论'
      },
      {
        word: 'mention',
        breakdown: { prefix: '', root: 'ment', suffix: 'ion' },
        meaning: '提及',
        explanation: '心里想到→提及'
      },
      {
        word: 'sentiment',
        breakdown: { prefix: 'sent', root: 'ment', suffix: '' },
        meaning: '情感',
        explanation: '感受→情感'
      },
      {
        word: 'monument',
        breakdown: { prefix: 'monu', root: 'ment', suffix: '' },
        meaning: '纪念碑',
        explanation: '提醒的东西→纪念碑'
      }
    ],
    quiz: {
      question: 'mental 的意思是什么？',
      options: ["评论", "情感", "精神的", "提及"],
      correctAnswer: 2
    }
  },

  {
    id: 40,
    root: 'sens/sent',
    origin: 'Latin',
    meaning: '感觉',
    meaningEn: 'sens',
    description: `sens/sent 代表「感觉」。sense（感觉）、sensitive（敏感的）= sens（感觉）+ -itive → 有感觉的 → 敏感的。sentiment（情感）= sent（感觉）+ -iment → 感受 → 情感。`,
    examples: [
      {
        word: 'sense',
        breakdown: { prefix: '', root: 'sens', suffix: 'e' },
        meaning: '感觉',
        explanation: '感觉'
      },
      {
        word: 'sensitive',
        breakdown: { prefix: '', root: 'sens', suffix: 'itive' },
        meaning: '敏感的',
        explanation: '能感觉→敏感的'
      },
      {
        word: 'consent',
        breakdown: { prefix: 'con', root: 'sent', suffix: '' },
        meaning: '同意',
        explanation: '一起感觉→同意'
      },
      {
        word: 'resent',
        breakdown: { prefix: 're', root: 'sent', suffix: '' },
        meaning: '愤恨',
        explanation: '反感→愤恨'
      },
      {
        word: 'sentiment',
        breakdown: { prefix: '', root: 'sent', suffix: 'iment' },
        meaning: '情感',
        explanation: '感觉→情感'
      }
    ],
    quiz: {
      question: 'sense 的意思是什么？',
      options: ["敏感的", "愤恨", "感觉", "同意"],
      correctAnswer: 2
    }
  },

  {
    id: 41,
    root: 'mem/memor',
    origin: 'Latin',
    meaning: '记忆',
    meaningEn: 'mem',
    description: `mem/memor 代表「记忆」。memory（记忆）、remember（记得）= re-（再）+ member（记忆）→ 再次记起。memorial（纪念碑）= memor（记忆）+ -ial → 记忆的东西 → 纪念碑。`,
    examples: [
      {
        word: 'memory',
        breakdown: { prefix: '', root: 'memor', suffix: 'y' },
        meaning: '记忆',
        explanation: '记忆'
      },
      {
        word: 'remember',
        breakdown: { prefix: 're', root: 'member', suffix: '' },
        meaning: '记得',
        explanation: '再次想起→记得'
      },
      {
        word: 'memorize',
        breakdown: { prefix: '', root: 'memor', suffix: 'ize' },
        meaning: '记住',
        explanation: '使记住→记住'
      },
      {
        word: 'memorial',
        breakdown: { prefix: '', root: 'memor', suffix: 'ial' },
        meaning: '纪念的',
        explanation: '记忆的→纪念的'
      },
      {
        word: 'commemorate',
        breakdown: { prefix: 'com', root: 'memor', suffix: 'ate' },
        meaning: '纪念',
        explanation: '共同记忆→纪念'
      }
    ],
    quiz: {
      question: 'memory 的意思是什么？',
      options: ["记住", "纪念的", "记得", "记忆"],
      correctAnswer: 3
    }
  },

  {
    id: 42,
    root: 'bio',
    origin: 'Greek',
    meaning: '生命',
    meaningEn: 'bio',
    description: `bio 代表「生命」（希腊语）。biology（生物学）= bio（生命）+ log（学）+ -y → 研究生命的学问。biography（传记）= bio（生命）+ graph（写）+ -y → 写人生的书。antibiotic（抗生素）= anti-（对抗）+ bio（生命）+ -tic → 对抗生命的（细菌）。`,
    examples: [
      {
        word: 'biology',
        breakdown: { prefix: '', root: 'bio', suffix: 'logy' },
        meaning: '生物学',
        explanation: '生命学→生物学'
      },
      {
        word: 'biography',
        breakdown: { prefix: '', root: 'bio', suffix: 'graphy' },
        meaning: '传记',
        explanation: '写生命→传记'
      },
      {
        word: 'antibiotic',
        breakdown: { prefix: 'anti', root: 'bio', suffix: 'tic' },
        meaning: '抗生素',
        explanation: '对抗微生物→抗生素'
      },
      {
        word: 'symbiosis',
        breakdown: { prefix: 'sym', root: 'bio', suffix: 'sis' },
        meaning: '共生',
        explanation: '一起生活→共生'
      },
      {
        word: 'biochemistry',
        breakdown: { prefix: '', root: 'bio', suffix: 'chemistry' },
        meaning: '生物化学',
        explanation: '生命化学→生物化学'
      }
    ],
    quiz: {
      question: 'biology 的意思是什么？',
      options: ["生物学", "共生", "抗生素", "传记"],
      correctAnswer: 0
    }
  },

  {
    id: 43,
    root: 'vit/viv',
    origin: 'Latin',
    meaning: '生命，活',
    meaningEn: 'vit',
    description: `vit/viv 代表「生命、活」。vital（至关重要的）= vit（生命）+ -al → 生命的 → 重要的。survive（生存）= sur-（超过）+ viv（活）+ -e → 活过来 → 生存。revive（复活）= re-（再）+ viv（活）+ -e → 再活过来 → 复活。`,
    examples: [
      {
        word: 'vital',
        breakdown: { prefix: '', root: 'vit', suffix: 'al' },
        meaning: '至关重要的',
        explanation: '生命的→重要的'
      },
      {
        word: 'vitamin',
        breakdown: { prefix: '', root: 'vit', suffix: 'amin' },
        meaning: '维生素',
        explanation: '生命素→维生素'
      },
      {
        word: 'survive',
        breakdown: { prefix: 'sur', root: 'viv', suffix: 'e' },
        meaning: '生存',
        explanation: '活下来→生存'
      },
      {
        word: 'revive',
        breakdown: { prefix: 're', root: 'viv', suffix: 'e' },
        meaning: '复活',
        explanation: '再次活→复活'
      },
      {
        word: 'vivid',
        breakdown: { prefix: '', root: 'viv', suffix: 'id' },
        meaning: '生动的',
        explanation: '活的→生动的'
      }
    ],
    quiz: {
      question: 'vital 的意思是什么？',
      options: ["至关重要的", "复活", "生存", "维生素"],
      correctAnswer: 0
    }
  },

  {
    id: 44,
    root: 'anim',
    origin: 'Latin',
    meaning: '生命，心',
    meaningEn: 'anim',
    description: `anim 代表「生命、心」。animal（动物）= anim（生命）+ -al → 有生命的东西。animate（使有生气）= anim（生命）+ -ate → 使有生命。animation（动画）= anim（生命）+ -ation → 让画面像有生命一样动起来。`,
    examples: [
      {
        word: 'animal',
        breakdown: { prefix: '', root: 'anim', suffix: 'al' },
        meaning: '动物',
        explanation: '有生命的→动物'
      },
      {
        word: 'animate',
        breakdown: { prefix: '', root: 'anim', suffix: 'ate' },
        meaning: '使有生气',
        explanation: '使活→使有生气'
      },
      {
        word: 'magnanimous',
        breakdown: { prefix: 'magn', root: 'anim', suffix: 'ous' },
        meaning: '宽宏大量的',
        explanation: '大心的→宽宏的'
      },
      {
        word: 'animation',
        breakdown: { prefix: '', root: 'anim', suffix: 'ation' },
        meaning: '动画',
        explanation: '使活的→动画'
      }
    ],
    quiz: {
      question: 'animal 的意思是什么？',
      options: ["动画", "宽宏大量的", "动物", "使有生气"],
      correctAnswer: 2
    }
  },

  {
    id: 45,
    root: 'mort',
    origin: 'Latin',
    meaning: '死',
    meaningEn: 'mort',
    description: `mort 代表「死」。mortal（凡人）= mort（死）+ -al → 会死的人 → 凡人。immortal（不朽的）= im-（不）+ mort（死）+ -al → 不会死的 → 不朽的。mortgage（抵押贷款）= mort（死）+ gage（承诺）→ 死约/不可更改的承诺 → 抵押。`,
    examples: [
      {
        word: 'mortal',
        breakdown: { prefix: '', root: 'mort', suffix: 'al' },
        meaning: '会死的',
        explanation: '死的→凡人的'
      },
      {
        word: 'immortal',
        breakdown: { prefix: 'im', root: 'mort', suffix: 'al' },
        meaning: '不朽的',
        explanation: '不会死→不朽的'
      },
      {
        word: 'mortgage',
        breakdown: { prefix: '', root: 'mort', suffix: 'gage' },
        meaning: '抵押',
        explanation: '死约/不可更改的承诺→抵押'
      },
      {
        word: 'mortuary',
        breakdown: { prefix: '', root: 'mort', suffix: 'uary' },
        meaning: '太平间',
        explanation: '死的地方→太平间'
      },
      {
        word: 'mortify',
        breakdown: { prefix: '', root: 'mort', suffix: 'ify' },
        meaning: '使屈辱',
        explanation: '使如死→屈辱'
      }
    ],
    quiz: {
      question: 'mortal 的意思是什么？',
      options: ["会死的", "不朽的", "抵押", "太平间"],
      correctAnswer: 0
    }
  },

  {
    id: 46,
    root: 'chron',
    origin: 'Greek',
    meaning: '时间',
    meaningEn: 'chron',
    description: `chron 代表「时间」（希腊语）。chronic（慢性的）= chron（时间）+ -ic → 持续很长时间的 → 慢性的。chronological（按时间顺序的）= chron（时间）+ log（学）+ -ical → 时间顺序的。synchronize（同步）= syn-（一起）+ chron（时间）+ -ize → 时间一起 → 同步。`,
    examples: [
      {
        word: 'chronic',
        breakdown: { prefix: '', root: 'chron', suffix: 'ic' },
        meaning: '慢性的',
        explanation: '时间长的→慢性的'
      },
      {
        word: 'chronology',
        breakdown: { prefix: '', root: 'chron', suffix: 'ology' },
        meaning: '年代学',
        explanation: '时间学→年代学'
      },
      {
        word: 'synchronize',
        breakdown: { prefix: 'syn', root: 'chron', suffix: 'ize' },
        meaning: '同步',
        explanation: '同时间→同步'
      },
      {
        word: 'anachronism',
        breakdown: { prefix: 'ana', root: 'chron', suffix: 'ism' },
        meaning: '时代错误',
        explanation: '错误时间→时代错误'
      },
      {
        word: 'chronicle',
        breakdown: { prefix: '', root: 'chron', suffix: 'icle' },
        meaning: '编年史',
        explanation: '时间记录→编年史'
      }
    ],
    quiz: {
      question: 'chronic 的意思是什么？',
      options: ["时代错误", "慢性的", "同步", "年代学"],
      correctAnswer: 1
    }
  },

  {
    id: 47,
    root: 'temp/tempor',
    origin: 'Latin',
    meaning: '时间',
    meaningEn: 'temp',
    description: `temp/tempor 代表「时间」（拉丁语）。temporary（临时的）= tempor（时间）+ -ary → 时间性的 → 临时的。contemporary（当代的）= con-（一起）+ tempor（时间）+ -ary → 同一时间的 → 当代的。`,
    variants: ['tempo', 'temper'],
    commonPitfall: 'tempo 和 temper 不是“时间的”直译题：前者偏音乐节拍，后者偏情绪状态/调和后的性情。',
    examples: [
      {
        word: 'temporary',
        breakdown: { prefix: '', root: 'tempor', suffix: 'ary' },
        meaning: '临时的',
        explanation: '时间的→临时的'
      },
      {
        word: 'contemporary',
        breakdown: { prefix: 'con', root: 'tempor', suffix: 'ary' },
        meaning: '当代的',
        explanation: '同时间→当代的'
      },
      {
        word: 'tempo',
        breakdown: { prefix: '', root: 'tempo', suffix: '' },
        partMeanings: { root: '时间 / 拍子' },
        meaning: '节奏',
        explanation: '按时间组织的拍子→节奏',
        literalMeaning: '时间节拍',
        learningNote: '音乐里 tempo 指速度/拍速，不直接翻成“时间”。',
      },
      {
        word: 'temporal',
        breakdown: { prefix: '', root: 'tempor', suffix: 'al' },
        meaning: '时间的',
        explanation: '与时间有关→时间的',
        literalMeaning: '关于时间的',
      },
      {
        word: 'temper',
        breakdown: { prefix: '', root: 'temper', suffix: '' },
        partMeanings: { root: '调和 / 状态' },
        meaning: '脾气',
        explanation: '被调和出的情绪状态→脾气',
        literalMeaning: '调和后的状态',
        learningNote: 'temper 与 temp 同源链较远，适合当联想，不适合硬拆成“时间”。',
      }
    ],
    quiz: {
      question: 'temporary 的意思是什么？',
      options: ["临时的", "节奏", "时间的", "当代的"],
      correctAnswer: 0
    }
  },

  {
    id: 48,
    root: 'ann/enn',
    origin: 'Latin',
    meaning: '年',
    meaningEn: 'ann',
    description: `ann/enn 代表「年」。annual（年度的）= ann（年）+ -ual → 每年的。anniversary（周年纪念）= anni-（年）+ vers（转）+ -ary → 年份转一圈 → 周年。millennium（千年）= mill-（千）+ enn（年）+ -ium → 一千年。`,
    examples: [
      {
        word: 'annual',
        breakdown: { prefix: '', root: 'ann', suffix: 'ual' },
        meaning: '每年的',
        explanation: '年的→每年的'
      },
      {
        word: 'anniversary',
        breakdown: { prefix: '', root: 'ann', suffix: 'iversary' },
        meaning: '周年纪念',
        explanation: '年的转折→周年'
      },
      {
        word: 'annuity',
        breakdown: { prefix: '', root: 'ann', suffix: 'uity' },
        meaning: '年金',
        explanation: '年的钱→年金'
      },
      {
        word: 'perennial',
        breakdown: { prefix: 'per', root: 'enn', suffix: 'ial' },
        meaning: '长期的',
        explanation: '穿过年→长期的'
      },
      {
        word: 'biennial',
        breakdown: { prefix: 'bi', root: 'enn', suffix: 'ial' },
        meaning: '两年一次',
        explanation: '两年→两年一次'
      }
    ],
    quiz: {
      question: 'annual 的意思是什么？',
      options: ["每年的", "周年纪念", "长期的", "年金"],
      correctAnswer: 0
    }
  },

  {
    id: 49,
    root: 'uni',
    origin: 'Latin',
    meaning: '一',
    meaningEn: 'uni',
    description: `uni 来自拉丁语「一」。uniform（制服）= uni-（统一）+ form（形式）→ 统一的形式。unique（独特的）= uni-（一）+ -que → 唯一的 → 独特的。universe（宇宙）= uni-（一）+ verse（转）→ 作为一个整体旋转的东西。`,
    examples: [
      {
        word: 'unite',
        breakdown: { prefix: '', root: 'uni', suffix: 'te' },
        meaning: '联合',
        explanation: '成为一体→联合'
      },
      {
        word: 'uniform',
        breakdown: { prefix: '', root: 'uni', suffix: 'form' },
        meaning: '制服',
        explanation: '一种形式→制服'
      },
      {
        word: 'unique',
        breakdown: { prefix: '', root: 'uni', suffix: 'que' },
        meaning: '独特的',
        explanation: '唯一的→独特的'
      },
      {
        word: 'universe',
        breakdown: { prefix: '', root: 'uni', suffix: 'verse' },
        meaning: '宇宙',
        explanation: '统一世界→宇宙'
      },
      {
        word: 'union',
        breakdown: { prefix: '', root: 'uni', suffix: 'on' },
        meaning: '联盟',
        explanation: '成一体→联盟'
      }
    ],
    quiz: {
      question: 'unite 的意思是什么？',
      options: ["独特的", "宇宙", "制服", "联合"],
      correctAnswer: 3
    }
  },

  {
    id: 50,
    root: 'du/duo',
    origin: 'Latin',
    meaning: '二',
    meaningEn: 'du',
    description: `du/duo 代表「二、双」。dual（双的）、duet（二重奏）= du（二）+ -et → 两个人的表演。duplicate（复制）= du（二）+ plic（折）+ -ate → 折成两份 → 复制。`,
    examples: [
      {
        word: 'dual',
        breakdown: { prefix: '', root: 'du', suffix: 'al' },
        meaning: '双重的',
        explanation: '二的→双重的'
      },
      {
        word: 'duplicate',
        breakdown: { prefix: '', root: 'du', suffix: 'plicate' },
        meaning: '复制',
        explanation: '使成二→复制'
      },
      {
        word: 'duet',
        breakdown: { prefix: '', root: 'du', suffix: 'et' },
        meaning: '二重奏',
        explanation: '二人→二重奏'
      },
      {
        word: 'double',
        breakdown: { prefix: '', root: 'du', suffix: 'ble' },
        meaning: '双倍的',
        explanation: '二的→双倍的'
      },
      {
        word: 'dubious',
        breakdown: { prefix: '', root: 'dub', suffix: 'ious' },
        meaning: '怀疑的',
        explanation: '两种想法→怀疑的'
      }
    ],
    quiz: {
      question: 'dual 的意思是什么？',
      options: ["双重的", "复制", "双倍的", "二重奏"],
      correctAnswer: 0
    }
  },

  {
    id: 51,
    root: 'ab-/abs-',
    origin: 'Latin',
    meaning: '偏离 / 离去',
    meaningEn: 'away from',
    description: `ab-/abs- 代表「离开、相反」。abnormal（异常的）= ab-（离开）+ normal（正常）→ 偏离正常 → 异常。absorb（吸收）= ab-（离开）+ sorb（吸）→ 把东西吸走。注意：元音前用 ab-，辅音前用 abs-。`,
    examples: [
      {
        word: 'abnormal',
        breakdown: { prefix: 'ab', root: 'normal', suffix: '' },
        meaning: '反常的',
        explanation: '偏离正常→反常的'
      },
      {
        word: 'abuse',
        breakdown: { prefix: 'ab', root: 'use', suffix: '' },
        meaning: '滥用',
        explanation: '偏离正用→滥用'
      },
      {
        word: 'absorb',
        breakdown: { prefix: 'ab', root: 'sorb', suffix: '' },
        meaning: '吸收',
        explanation: '吸掉→吸收'
      },
      {
        word: 'absent',
        breakdown: { prefix: 'ab', root: 'sent', suffix: '' },
        meaning: '缺席的',
        explanation: '离去的→缺席的'
      },
      {
        word: 'abstract',
        breakdown: { prefix: 'abs', root: 'tract', suffix: '' },
        meaning: '抽象的',
        explanation: '拉离→抽象的'
      }
    ],
    quiz: {
    question: 'absorb 的意思是什么？',
    options: ["抽象的", "反常的", "吸收", "滥用"],
    correctAnswer: 2
  }
  },

  {
    id: 52,
    root: 'ad-',
    origin: 'Latin',
    meaning: '加强，朝向',
    meaningEn: 'to, toward',
    description: `ad- 代表「朝向、加强」，是最常见的前缀之一。adapt（适应）= ad-（朝向）+ apt（合适）→ 朝着合适的方向调整 → 适应。注意：ad- 会同化，在不同辅音前变形，如 accept = ac-（朝向）+ cept（拿）。`,
    examples: [
      {
        word: 'adapt',
        breakdown: { prefix: 'ad', root: 'apt', suffix: '' },
        meaning: '适应',
        explanation: '朝向能力→适应'
      },
      {
        word: 'adhere',
        breakdown: { prefix: 'ad', root: 'here', suffix: '' },
        meaning: '坚持',
        explanation: '粘在一起→坚持'
      },
      {
        word: 'adjacent',
        breakdown: { prefix: 'ad', root: 'jacent', suffix: '' },
        meaning: '邻近的',
        explanation: '躺在旁边→邻近的'
      },
      {
        word: 'adopt',
        breakdown: { prefix: 'ad', root: 'opt', suffix: '' },
        meaning: '采纳',
        explanation: '选向→采纳'
      },
      {
        word: 'advocate',
        breakdown: { prefix: 'ad', root: 'voc', suffix: 'ate' },
        meaning: '提倡',
        explanation: '朝向说→提倡'
      }
    ],
    quiz: {
    question: 'advocate 的意思是什么？',
    options: ["适应", "采纳", "提倡", "坚持"],
    correctAnswer: 2
  }
  },

  {
    id: 53,
    root: 'en-/em-',
    origin: 'Latin',
    meaning: '进入，使',
    meaningEn: 'in, into',
    description: `en-/em- 代表「使成为、进入」。enable（使能够）= en-（使）+ able（能）→ 使能够。encourage（鼓励）= en-（使）+ courage（勇气）→ 使有勇气。辅音 b/p/m 前用 em-，如 empower（授权）。`,
    examples: [
      {
        word: 'enable',
        breakdown: { prefix: 'en', root: 'able', suffix: '' },
        meaning: '使能够',
        explanation: '使能→使能够'
      },
      {
        word: 'encourage',
        breakdown: { prefix: 'en', root: 'courage', suffix: '' },
        meaning: '鼓励',
        explanation: '使有勇气→鼓励'
      },
      {
        word: 'enrich',
        breakdown: { prefix: 'en', root: 'rich', suffix: '' },
        meaning: '丰富',
        explanation: '使富有→丰富'
      },
      {
        word: 'embrace',
        breakdown: { prefix: 'em', root: 'brace', suffix: '' },
        meaning: '拥抱',
        explanation: '进入怀抱→拥抱'
      },
      {
        word: 'employ',
        breakdown: { prefix: 'em', root: 'ploy', suffix: '' },
        meaning: '雇用',
        explanation: '使用→雇用'
      }
    ],
    quiz: {
    question: 'enable 的意思是什么？',
    options: ["鼓励", "拥抱", "使能够", "雇用"],
    correctAnswer: 2
  }
  },

  {
    id: 54,
    root: 'circum-',
    origin: 'Latin',
    meaning: '环绕，周围',
    meaningEn: 'around',
    description: `circum- 来自拉丁语「环绕」。circumstance（环境）= circum-（周围）+ stance（站）→ 站在周围的东西 → 环境。circumference（圆周）= circum-（环绕）+ fer（带）+ -ence → 绕一圈的距离。`,
    examples: [
      {
        word: 'circumference',
        breakdown: { prefix: 'circum', root: 'fer', suffix: 'ence' },
        meaning: '圆周',
        explanation: '环绕拿→圆周'
      },
      {
        word: 'circumstance',
        breakdown: { prefix: 'circum', root: 'st', suffix: 'ance' },
        meaning: '环境',
        explanation: '周围站的→环境'
      },
      {
        word: 'circumscribe',
        breakdown: { prefix: 'circum', root: 'scribe', suffix: '' },
        meaning: '限制',
        explanation: '周围写→限制'
      },
      {
        word: 'circumvent',
        breakdown: { prefix: 'circum', root: 'vent', suffix: '' },
        meaning: '规避',
        explanation: '绕着走→规避'
      }
    ],
    quiz: {
    question: 'circumscribe 的意思是什么？',
    options: ["圆周", "限制", "环境", "规避"],
    correctAnswer: 1
  }
  },

  {
    id: 55,
    root: 'con-/com-/co-',
    origin: 'Latin',
    meaning: '一起 / 共同',
    meaningEn: 'together',
    description: `co-/com-/con- 代表「共同、一起」。collaborate（合作）= co-（共同）+ labor（劳动）+ -ate → 一起劳动 → 合作。这个前缀会同化：com- 用于 b/p/m 前，con- 用于其他辅音前，co- 用于元音前。`,
    examples: [
      {
        word: 'cooperate',
        breakdown: { prefix: 'co', root: 'oper', suffix: 'ate' },
        meaning: '合作',
        explanation: '一起操作→合作'
      },
      {
        word: 'combine',
        breakdown: { prefix: 'com', root: 'bine', suffix: '' },
        meaning: '结合',
        explanation: '一起二→结合'
      },
      {
        word: 'connect',
        breakdown: { prefix: 'con', root: 'nect', suffix: '' },
        meaning: '连接',
        explanation: '一起绑→连接'
      },
      {
        word: 'coordinate',
        breakdown: { prefix: 'co', root: 'ordin', suffix: 'ate' },
        meaning: '协调',
        explanation: '一起排序→协调'
      },
      {
        word: 'accompany',
        breakdown: { prefix: 'ac', root: 'company', suffix: '' },
        meaning: '陪伴',
        explanation: '一起→陪伴'
      }
    ],
    quiz: {
    question: 'connect 的意思是什么？',
    options: ["协调", "合作", "连接", "结合"],
    correctAnswer: 2
  }
  },

  {
    id: 56,
    root: 'contra-/counter-',
    origin: 'Latin',
    meaning: '相反 / 对抗',
    meaningEn: 'against',
    description: `contra-/counter- 代表「相反、对抗」。contradict（矛盾）= contra-（相反）+ dict（说）→ 说相反的话 → 矛盾。contrast（对比）= contra-（相反）+ st（站）→ 站在对立面 → 对比。`,
    examples: [
      {
        word: 'contradict',
        breakdown: { prefix: 'contra', root: 'dict', suffix: '' },
        meaning: '反驳',
        explanation: '相反说→反驳'
      },
      {
        word: 'contrary',
        breakdown: { prefix: 'contr', root: 'ary', suffix: '' },
        meaning: '相反的',
        explanation: '相反的'
      },
      {
        word: 'counteract',
        breakdown: { prefix: 'counter', root: 'act', suffix: '' },
        meaning: '抵消',
        explanation: '相反行动→抵消'
      },
      {
        word: 'counterpart',
        breakdown: { prefix: 'counter', root: 'part', suffix: '' },
        meaning: '对应物',
        explanation: '相对部分→对应物'
      }
    ],
    quiz: {
    question: 'contradict 的意思是什么？',
    options: ["抵消", "反驳", "对应物", "相反的"],
    correctAnswer: 1
  }
  },

  {
    id: 57,
    root: 'fore-',
    origin: 'Old English',
    meaning: '前，预先',
    meaningEn: 'before',
    description: `fore- 代表「在前、预先」。forecast（预报）= fore-（预先）+ cast（投）→ 预先投射出来 → 预报。foresee（预见）= fore-（预先）+ see（看）→ 预先看到。和 pre- 意思相近，但 fore- 更强调「时间或空间上在前面」。`,
    examples: [
      {
        word: 'forecast',
        breakdown: { prefix: 'fore', root: 'cast', suffix: '' },
        meaning: '预测',
        explanation: '预先投→预测'
      },
      {
        word: 'foresee',
        breakdown: { prefix: 'fore', root: 'see', suffix: '' },
        meaning: '预见',
        explanation: '预先看→预见'
      },
      {
        word: 'forehead',
        breakdown: { prefix: 'fore', root: 'head', suffix: '' },
        meaning: '前额',
        explanation: '头的前面→前额'
      },
      {
        word: 'foremost',
        breakdown: { prefix: 'fore', root: 'most', suffix: '' },
        meaning: '首要的',
        explanation: '最前的→首要的'
      }
    ],
    quiz: {
    question: 'foresee 的意思是什么？',
    options: ["预测", "首要的", "前额", "预见"],
    correctAnswer: 3
  }
  },

  {
    id: 58,
    root: 'mal-',
    origin: 'Latin',
    meaning: '坏的 / 错误',
    meaningEn: 'bad',
    description: `mal- 代表「坏、恶」。malfunction（故障）= mal-（坏）+ function（功能）→ 功能坏了 → 故障。malicious（恶意的）= mal-（恶）+ -icious（的）→ 有恶意的。记住：mal- 的反义词是 bene-（好）。`,
    examples: [
      {
        word: 'malfunction',
        breakdown: { prefix: 'mal', root: 'function', suffix: '' },
        meaning: '故障',
        explanation: '坏的功能→故障'
      },
      {
        word: 'maltreat',
        breakdown: { prefix: 'mal', root: 'treat', suffix: '' },
        meaning: '虐待',
        explanation: '坏对待→虐待'
      },
      {
        word: 'malicious',
        breakdown: { prefix: 'mal', root: 'icious', suffix: '' },
        meaning: '恶意的',
        explanation: '坏意→恶意的'
      },
      {
        word: 'malpractice',
        breakdown: { prefix: 'mal', root: 'practice', suffix: '' },
        meaning: '渎职',
        explanation: '坏实践→渎职'
      }
    ],
    quiz: {
    question: 'malicious 的意思是什么？',
    options: ["虐待", "恶意的", "故障", "渎职"],
    correctAnswer: 1
  }
  },

  {
    id: 59,
    root: 'mis-',
    origin: 'Old English',
    meaning: '错误',
    meaningEn: 'wrong, bad',
    description: `mis- 代表「错误、不当」，已在前面讲过。misfortune（不幸）= mis-（坏）+ fortune（运气）→ 坏运气 → 不幸。mislead（误导）= mis-（错）+ lead（引导）→ 引导错了 → 误导。`,
    examples: [
      {
        word: 'mistake',
        breakdown: { prefix: 'mis', root: 'take', suffix: '' },
        meaning: '错误',
        explanation: '拿错→错误'
      },
      {
        word: 'misunderstand',
        breakdown: { prefix: 'mis', root: 'understand', suffix: '' },
        meaning: '误解',
        explanation: '错理解→误解'
      },
      {
        word: 'mislead',
        breakdown: { prefix: 'mis', root: 'lead', suffix: '' },
        meaning: '误导',
        explanation: '错引导→误导'
      },
      {
        word: 'misjudge',
        breakdown: { prefix: 'mis', root: 'judge', suffix: '' },
        meaning: '误判',
        explanation: '错判断→误判'
      }
    ],
    quiz: {
    question: 'mistake 的意思是什么？',
    options: ["误解", "误导", "误判", "错误"],
    correctAnswer: 3
  }
  },

  {
    id: 60,
    root: 'out-',
    origin: 'Old English',
    meaning: '超过，外出',
    meaningEn: 'beyond, out',
    description: `out- 代表「超出、向外」，已在前面讲过。output（输出）= out-（向外）+ put（放）→ 放出来的东西 → 输出。outlook（前景）= out-（向外）+ look（看）→ 向外看到的景象 → 前景。`,
    examples: [
      {
        word: 'outcome',
        breakdown: { prefix: 'out', root: 'come', suffix: '' },
        meaning: '结果',
        explanation: '出来→结果'
      },
      {
        word: 'outdo',
        breakdown: { prefix: 'out', root: 'do', suffix: '' },
        meaning: '超过',
        explanation: '做得更多→超过'
      },
      {
        word: 'outstanding',
        breakdown: { prefix: 'out', root: 'stand', suffix: 'ing' },
        meaning: '杰出的',
        explanation: '站出来→杰出的'
      },
      {
        word: 'outbreak',
        breakdown: { prefix: 'out', root: 'break', suffix: '' },
        meaning: '爆发',
        explanation: '突破出来→爆发'
      }
    ],
    quiz: {
    question: 'outbreak 的意思是什么？',
    options: ["杰出的", "爆发", "结果", "超过"],
    correctAnswer: 1
  }
  },

  {
    id: 61,
    root: 'over-',
    origin: 'Old English',
    meaning: '过度 / 在上方',
    meaningEn: 'too much, above',
    description: `over- 代表「过度、在上」，已在前面讲过。overlap（重叠）= over-（在上）+ lap（圈）→ 一圈压在另一圈上 → 重叠。overseas（海外的）= over-（越过）+ seas（海）→ 越过大海的 → 海外的。`,
    examples: [
      {
        word: 'overcome',
        breakdown: { prefix: 'over', root: 'come', suffix: '' },
        meaning: '克服',
        explanation: '越过→克服'
      },
      {
        word: 'overlook',
        breakdown: { prefix: 'over', root: 'look', suffix: '' },
        meaning: '忽略',
        explanation: '看过→忽略'
      },
      {
        word: 'overweight',
        breakdown: { prefix: 'over', root: 'weight', suffix: '' },
        meaning: '超重',
        explanation: '过重→超重'
      },
      {
        word: 'overwhelm',
        breakdown: { prefix: 'over', root: 'whelm', suffix: '' },
        meaning: '压倒',
        explanation: '压过→压倒'
      }
    ],
    quiz: {
    question: 'overcome 的意思是什么？',
    options: ["忽略", "克服", "超重", "压倒"],
    correctAnswer: 1
  }
  },

  {
    id: 62,
    root: 'per-',
    origin: 'Latin',
    meaning: '贯穿 / 始终',
    meaningEn: 'through',
    description: `per- 代表「贯穿、彻底、完全」。perfect（完美的）= per-（完全）+ fect（做）→ 完全做好的 → 完美的。persist（坚持）= per-（彻底）+ sist（站）→ 彻底站稳 → 坚持。这是个强调「程度」的前缀。`,
    examples: [
      {
        word: 'perfect',
        breakdown: { prefix: 'per', root: 'fect', suffix: '' },
        meaning: '完美的',
        explanation: '做完→完美的'
      },
      {
        word: 'persist',
        breakdown: { prefix: 'per', root: 'sist', suffix: '' },
        meaning: '持续坚持',
        explanation: '始终站住→持续坚持'
      },
      {
        word: 'pervade',
        breakdown: { prefix: 'per', root: 'vade', suffix: '' },
        meaning: '弥漫',
        explanation: '走遍→弥漫'
      },
      {
        word: 'permit',
        breakdown: { prefix: 'per', root: 'mit', suffix: '' },
        meaning: '允许',
        explanation: '让通过→允许'
      }
    ],
    quiz: {
    question: 'permit 的意思是什么？',
    options: ["弥漫", "允许", "完美的", "坚持"],
    correctAnswer: 1
  }
  },

  {
    id: 63,
    root: 'pro-',
    origin: 'Latin',
    meaning: '向前 / 支持',
    meaningEn: 'forward, before',
    description: `pro- 代表「向前、支持」，已在前面讲过。promote（促进）= pro-（向前）+ mot（移动）+ -e → 向前推动 → 促进。propose（提议）= pro-（向前）+ pos（放）+ -e → 向前放出来 → 提议。`,
    examples: [
      {
        word: 'progress',
        breakdown: { prefix: 'pro', root: 'gress', suffix: '' },
        meaning: '进步',
        explanation: '向前走→进步'
      },
      {
        word: 'promote',
        breakdown: { prefix: 'pro', root: 'mote', suffix: '' },
        meaning: '促进',
        explanation: '向前移→促进'
      },
      {
        word: 'project',
        breakdown: { prefix: 'pro', root: 'ject', suffix: '' },
        meaning: '项目',
        explanation: '向前投→项目'
      },
      {
        word: 'propose',
        breakdown: { prefix: 'pro', root: 'pose', suffix: '' },
        meaning: '提议',
        explanation: '向前放→提议'
      }
    ],
    quiz: {
    question: 'propose 的意思是什么？',
    options: ["提议", "项目", "进步", "促进"],
    correctAnswer: 0
  }
  },

  {
    id: 64,
    root: 'retro-',
    origin: 'Latin',
    meaning: '向后 / 回退',
    meaningEn: 'backward',
    description: `retro- 代表「向后、回顾」。retrospect（回顾）= retro-（向后）+ spect（看）→ 向后看 → 回顾。retrograde（倒退的）= retro-（向后）+ grade（走）→ 往后走的 → 倒退的。`,
    examples: [
      {
        word: 'retrospect',
        breakdown: { prefix: 'retro', root: 'spect', suffix: '' },
        meaning: '回顾',
        explanation: '向后看→回顾'
      },
      {
        word: 'retrograde',
        breakdown: { prefix: 'retro', root: 'grade', suffix: '' },
        meaning: '倒退',
        explanation: '向后走→倒退'
      },
      {
        word: 'retroactive',
        breakdown: { prefix: 'retro', root: 'act', suffix: 'ive' },
        meaning: '追溯的',
        explanation: '向后作用→追溯的'
      }
    ],
    quiz: {
    question: 'retrograde 的意思是什么？',
    options: ["回顾", "倒退", "变成动词", "追溯的"],
    correctAnswer: 1
  }
  },

  {
    id: 65,
    root: 'under-',
    origin: 'Old English',
    meaning: '下方 / 不足',
    meaningEn: 'below, beneath',
    description: `under- 代表「在下、不足」，已在前面讲过。undergo（经历）= under-（在下）+ go（走）→ 在下面走过 → 经历。undermine（削弱）= under-（在下）+ mine（挖）→ 在下面挖 → 削弱根基。`,
    examples: [
      {
        word: 'understand',
        breakdown: { prefix: 'under', root: 'stand', suffix: '' },
        meaning: '理解',
        explanation: '站在下面→理解'
      },
      {
        word: 'underestimate',
        breakdown: { prefix: 'under', root: 'estimate', suffix: '' },
        meaning: '低估',
        explanation: '估计不足→低估'
      },
      {
        word: 'undergo',
        breakdown: { prefix: 'under', root: 'go', suffix: '' },
        meaning: '经历',
        explanation: '从下走过→经历'
      },
      {
        word: 'underline',
        breakdown: { prefix: 'under', root: 'line', suffix: '' },
        meaning: '强调',
        explanation: '在下划线→强调'
      }
    ],
    quiz: {
    question: 'understand 的意思是什么？',
    options: ["低估", "强调", "经历", "理解"],
    correctAnswer: 3
  }
  },

  {
    id: 66,
    root: 'with-',
    origin: 'Old English',
    meaning: '向后，反对',
    meaningEn: 'back, against',
    description: `with- 代表「反对、向后」（古英语）。withdraw（撤退）= with-（向后）+ draw（拉）→ 向后拉 → 撤退。withstand（抵抗）= with-（反对）+ stand（站）→ 站着反对 → 抵抗。这个前缀比较少见。`,
    examples: [
      {
        word: 'withdraw',
        breakdown: { prefix: 'with', root: 'draw', suffix: '' },
        meaning: '撤退',
        explanation: '向后拉→撤退'
      },
      {
        word: 'withhold',
        breakdown: { prefix: 'with', root: 'hold', suffix: '' },
        meaning: '保留',
        explanation: '向后拿→保留'
      },
      {
        word: 'withstand',
        breakdown: { prefix: 'with', root: 'stand', suffix: '' },
        meaning: '抵抗',
        explanation: '反对站→抵抗'
      }
    ],
    quiz: {
    question: 'withdraw 的意思是什么？',
    options: ["相关场所", "撤退", "抵抗", "保留"],
    correctAnswer: 1
  }
  },

  {
    id: 67,
    root: 'up-',
    origin: 'Old English',
    meaning: '向上，增强',
    meaningEn: 'up, upward',
    description: `up- 代表「向上、增强」，已在前面讲过。update（更新）= up-（向上）+ date（日期）→ 更新到最新日期 → 更新。upright（直立的）= up-（向上）+ right（正）→ 向上站正 → 直立的。`,
    examples: [
      {
        word: 'upgrade',
        breakdown: { prefix: 'up', root: 'grade', suffix: '' },
        meaning: '升级',
        explanation: '向上等级→升级'
      },
      {
        word: 'uphold',
        breakdown: { prefix: 'up', root: 'hold', suffix: '' },
        meaning: '支持',
        explanation: '向上举→支持'
      },
      {
        word: 'uplift',
        breakdown: { prefix: 'up', root: 'lift', suffix: '' },
        meaning: '提升',
        explanation: '向上举→提升'
      },
      {
        word: 'upset',
        breakdown: { prefix: 'up', root: 'set', suffix: '' },
        meaning: '打乱',
        explanation: '向上设置→打乱'
      }
    ],
    quiz: {
    question: 'upgrade 的意思是什么？',
    options: ["支持", "升级", "提升", "打乱"],
    correctAnswer: 1
  }
  },

  {
    id: 68,
    root: 'extra-',
    origin: 'Latin',
    meaning: '超出 / 额外',
    meaningEn: 'beyond, outside',
    description: `extra- 代表「超出、额外」。extraordinary（非凡的）= extra-（超出）+ ordinary（普通）→ 超出普通 → 非凡的。extracurricular（课外的）= extra-（额外）+ curricular（课程的）→ 课程以外的 → 课外的。`,
    examples: [
      {
        word: 'extraordinary',
        breakdown: { prefix: 'extra', root: 'ordinary', suffix: '' },
        meaning: '非凡的',
        explanation: '超出普通→非凡的'
      },
      {
        word: 'extracurricular',
        breakdown: { prefix: 'extra', root: 'curricular', suffix: '' },
        meaning: '课外的',
        explanation: '超出课程→课外的'
      },
      {
        word: 'extraterrestrial',
        breakdown: { prefix: 'extra', root: 'terrestrial', suffix: '' },
        meaning: '外星的',
        explanation: '超出地球→外星的'
      }
    ],
    quiz: {
    question: 'extracurricular 的意思是什么？',
    options: ["状态", "外星的", "课外的", "非凡的"],
    correctAnswer: 2
  }
  },

  {
    id: 69,
    root: 'intra-/intro-',
    origin: 'Latin',
    meaning: '内部 / 向内',
    meaningEn: 'within, inside',
    description: `intra-/intro- 代表「内部、向内」。introduce（介绍）= intro-（向内）+ duc（引）+ -e → 引进来 → 介绍。intranet（内网）= intra-（内部）+ net（网）→ 内部网络。和 inter-（之间）区分开。`,
    examples: [
      {
        word: 'introduce',
        breakdown: { prefix: 'intro', root: 'duce', suffix: '' },
        meaning: '介绍',
        explanation: '向内引→介绍'
      },
      {
        word: 'introspect',
        breakdown: { prefix: 'intro', root: 'spect', suffix: '' },
        meaning: '内省',
        explanation: '向内看→内省'
      },
      {
        word: 'intranet',
        breakdown: { prefix: 'intra', root: 'net', suffix: '' },
        meaning: '内网',
        explanation: '内部网→内网'
      }
    ],
    quiz: {
    question: 'introduce 的意思是什么？',
    options: ["介绍", "内网", "内省", "向外"],
    correctAnswer: 0
  }
  },

  {
    id: 70,
    root: 'ultra-',
    origin: 'Latin',
    meaning: '超，极',
    meaningEn: 'beyond, extremely',
    description: `ultra- 代表「超、极」。ultraviolet（紫外线的）= ultra-（超）+ violet（紫色）→ 超越紫色的 → 紫外线的。ultrasound（超声波）= ultra-（超）+ sound（声音）→ 超出人耳听力范围的声音。`,
    examples: [
      {
        word: 'ultramodern',
        breakdown: { prefix: 'ultra', root: 'modern', suffix: '' },
        meaning: '超现代的',
        explanation: '超级现代→超现代的'
      },
      {
        word: 'ultrasound',
        breakdown: { prefix: 'ultra', root: 'sound', suffix: '' },
        meaning: '超声波',
        explanation: '超级声音→超声波'
      },
      {
        word: 'ultraviolet',
        breakdown: { prefix: 'ultra', root: 'violet', suffix: '' },
        meaning: '紫外线',
        explanation: '超紫色→紫外线'
      }
    ],
    quiz: {
    question: 'ultrasound 的意思是什么？',
    options: ["紫外线", "超现代的", "相反", "超声波"],
    correctAnswer: 3
  }
  },

  {
    id: 71,
    root: 'act/ag',
    origin: 'Latin',
    meaning: '做，行动',
    meaningEn: 'do, act',
    description: `act/ag 代表「做、行动」。action（行动）、agent（代理人）= ag（做）+ -ent（人）→ 做事的人 → 代理人。react（反应）= re-（回）+ act（做）→ 做出回应 → 反应。`,
    examples: [
      {
        word: 'action',
        breakdown: { prefix: '', root: 'act', suffix: 'ion' },
        meaning: '行动',
        explanation: '做→行动'
      },
      {
        word: 'active',
        breakdown: { prefix: '', root: 'act', suffix: 'ive' },
        meaning: '积极的',
        explanation: '做的→积极的'
      },
      {
        word: 'agent',
        breakdown: { prefix: '', root: 'ag', suffix: 'ent' },
        meaning: '代理人',
        explanation: '做的人→代理人'
      },
      {
        word: 'react',
        breakdown: { prefix: 're', root: 'act', suffix: '' },
        meaning: '反应',
        explanation: '反做→反应'
      },
      {
        word: 'transact',
        breakdown: { prefix: 'trans', root: 'act', suffix: '' },
        meaning: '交易',
        explanation: '跨越做→交易'
      }
    ],
    quiz: {
    question: 'active 的意思是什么？',
    options: ["代理人", "反应", "交易", "积极的"],
    correctAnswer: 3
  }
  },

  {
    id: 72,
    root: 'ceed/cess/cede',
    origin: 'Latin',
    meaning: '走，前进',
    meaningEn: 'go, yield',
    description: `ceed/cess/cede 代表「走、进行」，已在前面讲过。exceed（超过）= ex-（向外）+ ceed（走）→ 走出去 → 超过。recession（衰退）= re-（回）+ cess（走）+ -ion → 往回走 → 衰退。`,
    examples: [
      {
        word: 'proceed',
        breakdown: { prefix: 'pro', root: 'ceed', suffix: '' },
        meaning: '前进',
        explanation: '向前走→前进'
      },
      {
        word: 'succeed',
        breakdown: { prefix: 'suc', root: 'ceed', suffix: '' },
        meaning: '成功',
        explanation: '向上走→成功'
      },
      {
        word: 'access',
        breakdown: { prefix: 'ac', root: 'cess', suffix: '' },
        meaning: '接近',
        explanation: '走向→接近'
      },
      {
        word: 'process',
        breakdown: { prefix: 'pro', root: 'cess', suffix: '' },
        meaning: '过程',
        explanation: '向前走→过程'
      },
      {
        word: 'recede',
        breakdown: { prefix: 're', root: 'cede', suffix: '' },
        meaning: '后退',
        explanation: '向后走→后退'
      }
    ],
    quiz: {
    question: 'proceed 的意思是什么？',
    options: ["前进", "后退", "接近", "成功"],
    correctAnswer: 0
  }
  },

  {
    id: 73,
    root: 'cur/curs/cours',
    origin: 'Latin',
    meaning: '跑，流',
    meaningEn: 'run, flow',
    description: `cur/curs/cours 代表「跑、流」。current（当前的）= cur（流）+ -ent → 正在流动的 → 当前的。occur（发生）= oc-（朝向）+ cur（跑）→ 跑过来 → 发生。course（课程）= cours（跑）+ -e → 跑的路线 → 课程。`,
    examples: [
      {
        word: 'current',
        breakdown: { prefix: '', root: 'cur', suffix: 'ent' },
        meaning: '当前的',
        explanation: '流动的→当前的'
      },
      {
        word: 'occur',
        breakdown: { prefix: 'oc', root: 'cur', suffix: '' },
        meaning: '发生',
        explanation: '跑来→发生'
      },
      {
        word: 'course',
        breakdown: { prefix: '', root: 'cours', suffix: 'e' },
        meaning: '课程',
        explanation: '流程→课程'
      },
      {
        word: 'excursion',
        breakdown: { prefix: 'ex', root: 'curs', suffix: 'ion' },
        meaning: '远足',
        explanation: '跑出→远足'
      },
      {
        word: 'recur',
        breakdown: { prefix: 're', root: 'cur', suffix: '' },
        meaning: '复发',
        explanation: '再跑→复发'
      }
    ],
    quiz: {
    question: 'current 的意思是什么？',
    options: ["课程", "发生", "远足", "当前的"],
    correctAnswer: 3
  }
  },

  {
    id: 74,
    root: 'fac/fact/fect/fic',
    origin: 'Latin',
    meaning: '做，制作',
    meaningEn: 'make, do',
    description: `fac/fact/fect/fic 代表「做、制作」，已在前面讲过。manufacture（制造）= manu-（手）+ fact（做）+ -ure → 用手做 → 制造。artificial（人造的）= art（艺术）+ fic（做）+ -ial → 人工做的。`,
    examples: [
      {
        word: 'factory',
        breakdown: { prefix: '', root: 'fact', suffix: 'ory' },
        meaning: '工厂',
        explanation: '制作地→工厂'
      },
      {
        word: 'effect',
        breakdown: { prefix: 'ef', root: 'fect', suffix: '' },
        meaning: '效果',
        explanation: '做出→效果'
      },
      {
        word: 'sufficient',
        breakdown: { prefix: 'suf', root: 'fic', suffix: 'ient' },
        meaning: '足够的',
        explanation: '做够→足够的'
      },
      {
        word: 'manufacture',
        breakdown: { prefix: 'manu', root: 'fact', suffix: 'ure' },
        meaning: '制造',
        explanation: '手做→制造'
      },
      {
        word: 'artificial',
        breakdown: { prefix: 'arti', root: 'fic', suffix: 'ial' },
        meaning: '人造的',
        explanation: '艺术做→人造的'
      }
    ],
    quiz: {
    question: 'manufacture 的意思是什么？',
    options: ["人造的", "制造", "足够的", "效果"],
    correctAnswer: 1
  }
  },

  {
    id: 75,
    root: 'ject',
    origin: 'Latin',
    meaning: '投掷，扔',
    meaningEn: 'throw',
    description: `ject 代表「投掷、扔」，已在前面讲过。inject（注射）= in-（进入）+ ject（扔）→ 扔进去 → 注射。trajectory（轨迹）= tra-（穿过）+ ject（扔）+ -ory → 扔过去的路径 → 轨迹。`,
    examples: [
      {
        word: 'project',
        breakdown: { prefix: 'pro', root: 'ject', suffix: '' },
        meaning: '项目',
        explanation: '向前投→项目'
      },
      {
        word: 'reject',
        breakdown: { prefix: 're', root: 'ject', suffix: '' },
        meaning: '拒绝',
        explanation: '向后扔→拒绝'
      },
      {
        word: 'inject',
        breakdown: { prefix: 'in', root: 'ject', suffix: '' },
        meaning: '注射',
        explanation: '向内投→注射'
      },
      {
        word: 'object',
        breakdown: { prefix: 'ob', root: 'ject', suffix: '' },
        meaning: '物体',
        explanation: '对着扔→物体'
      },
      {
        word: 'subject',
        breakdown: { prefix: 'sub', root: 'ject', suffix: '' },
        meaning: '主题',
        explanation: '在下投→主题'
      }
    ],
    quiz: {
    question: 'inject 的意思是什么？',
    options: ["拒绝", "物体", "主题", "注射"],
    correctAnswer: 3
  }
  },

  {
    id: 76,
    root: 'ven/vent',
    origin: 'Latin',
    meaning: '来',
    meaningEn: 'come',
    description: `ven/vent 代表「来」。event（事件）= e-（向外）+ vent（来）→ 出来的事情 → 事件。prevent（预防）= pre-（提前）+ vent（来）→ 提前来到前面阻挡 → 预防。convention（大会）= con-（一起）+ ven（来）+ -tion → 一起来的聚会 → 大会。`,
    examples: [
      {
        word: 'event',
        breakdown: { prefix: 'e', root: 'vent', suffix: '' },
        meaning: '事件',
        explanation: '出来→事件'
      },
      {
        word: 'prevent',
        breakdown: { prefix: 'pre', root: 'vent', suffix: '' },
        meaning: '预防',
        explanation: '提前来→预防'
      },
      {
        word: 'convention',
        breakdown: { prefix: 'con', root: 'vent', suffix: 'ion' },
        meaning: '大会',
        explanation: '一起来→大会'
      },
      {
        word: 'adventure',
        breakdown: { prefix: 'ad', root: 'vent', suffix: 'ure' },
        meaning: '冒险',
        explanation: '朝向来→冒险'
      },
      {
        word: 'intervene',
        breakdown: { prefix: 'inter', root: 'ven', suffix: 'e' },
        meaning: '干预',
        explanation: '之间来→干预'
      }
    ],
    quiz: {
    question: 'event 的意思是什么？',
    options: ["冒险", "事件", "预防", "干预"],
    correctAnswer: 1
  }
  },

  {
    id: 77,
    root: 'cap/cept/ceiv/cip',
    origin: 'Latin',
    meaning: '拿，抓，接受',
    meaningEn: 'take, seize',
    description: `cap/cept/ceiv/cip 代表「拿、抓、接受」。capture（捕获）= cap（抓）+ -ture → 抓住。accept（接受）= ac-（朝向）+ cept（拿）→ 朝着拿过来 → 接受。receive（收到）= re-（回）+ ceiv（拿）+ -e → 拿回来 → 收到。`,
    examples: [
      {
        word: 'capture',
        breakdown: { prefix: '', root: 'cap', suffix: 'ture' },
        meaning: '捕获',
        explanation: '抓→捕获'
      },
      {
        word: 'accept',
        breakdown: { prefix: 'ac', root: 'cept', suffix: '' },
        meaning: '接受',
        explanation: '朝向拿→接受'
      },
      {
        word: 'receive',
        breakdown: { prefix: 're', root: 'ceiv', suffix: 'e' },
        meaning: '收到',
        explanation: '拿回→收到'
      },
      {
        word: 'concept',
        breakdown: { prefix: 'con', root: 'cept', suffix: '' },
        meaning: '概念',
        explanation: '一起拿→概念'
      },
      {
        word: 'participate',
        breakdown: { prefix: 'parti', root: 'cip', suffix: 'ate' },
        meaning: '参与',
        explanation: '部分拿→参与'
      }
    ],
    quiz: {
    question: 'receive 的意思是什么？',
    options: ["概念", "参与", "捕获", "收到"],
    correctAnswer: 3
  }
  },

  {
    id: 78,
    root: 'ten/tin/tain',
    origin: 'Latin',
    meaning: '拿住，保持',
    meaningEn: 'hold',
    description: `ten/tin/tain 代表「拿住、保持」。contain（包含）= con-（一起）+ tain（拿住）→ 一起拿住 → 包含。maintain（维持）= main-（手）+ tain（拿）→ 用手拿住 → 维持。continuous（连续的）= con-（一起）+ tin（拿住）+ -uous → 拿在一起不放 → 连续的。`,
    examples: [
      {
        word: 'contain',
        breakdown: { prefix: 'con', root: 'tain', suffix: '' },
        meaning: '包含',
        explanation: '一起拿住→包含'
      },
      {
        word: 'maintain',
        breakdown: { prefix: 'main', root: 'tain', suffix: '' },
        meaning: '维持',
        explanation: '手拿住→维持'
      },
      {
        word: 'obtain',
        breakdown: { prefix: 'ob', root: 'tain', suffix: '' },
        meaning: '获得',
        explanation: '对着拿→获得'
      },
      {
        word: 'detain',
        breakdown: { prefix: 'de', root: 'tain', suffix: '' },
        meaning: '拘留',
        explanation: '向下拿住→拘留'
      },
      {
        word: 'sustain',
        breakdown: { prefix: 'sus', root: 'tain', suffix: '' },
        meaning: '支撑',
        explanation: '从下拿住→支撑'
      }
    ],
    quiz: {
    question: 'detain 的意思是什么？',
    options: ["拘留", "获得", "包含", "维持"],
    correctAnswer: 0
  }
  },

  {
    id: 79,
    root: 'pend/pens/pond',
    origin: 'Latin',
    meaning: '悬挂，支付',
    meaningEn: 'hang, weigh, pay',
    description: `pend/pens/pond 代表「悬挂、支付」，已在前面讲过。suspend（暂停）= sus-（在下）+ pend（挂）→ 挂起来 → 暂停。compensate（补偿）= com-（一起）+ pens（支付）+ -ate → 一起支付 → 补偿。`,
    examples: [
      {
        word: 'depend',
        breakdown: { prefix: 'de', root: 'pend', suffix: '' },
        meaning: '依靠',
        explanation: '向下挂→依靠'
      },
      {
        word: 'suspend',
        breakdown: { prefix: 'sus', root: 'pend', suffix: '' },
        meaning: '暂停',
        explanation: '从下挂→暂停'
      },
      {
        word: 'expense',
        breakdown: { prefix: 'ex', root: 'pens', suffix: 'e' },
        meaning: '花费',
        explanation: '往外支付→花费'
      },
      {
        word: 'independent',
        breakdown: { prefix: 'in', root: 'depend', suffix: 'ent' },
        meaning: '独立的',
        explanation: '不依靠→独立的'
      },
      {
        word: 'compensate',
        breakdown: { prefix: 'com', root: 'pens', suffix: 'ate' },
        meaning: '补偿',
        explanation: '一起支付→补偿'
      }
    ],
    quiz: {
    question: 'expense 的意思是什么？',
    options: ["独立的", "依靠", "花费", "补偿"],
    correctAnswer: 2
  }
  },

  {
    id: 80,
    root: 'tract',
    origin: 'Latin',
    meaning: '拉，抽',
    meaningEn: 'draw, pull',
    description: `tract 代表「拉、抽」，已在前面讲过。extract（提取）= ex-（向外）+ tract（拉）→ 拉出来 → 提取。distract（分心）= dis-（分开）+ tract（拉）→ 把注意力拉开 → 分心。`,
    examples: [
      {
        word: 'attract',
        breakdown: { prefix: 'at', root: 'tract', suffix: '' },
        meaning: '吸引',
        explanation: '朝向拉→吸引'
      },
      {
        word: 'extract',
        breakdown: { prefix: 'ex', root: 'tract', suffix: '' },
        meaning: '提取',
        explanation: '向外拉→提取'
      },
      {
        word: 'contract',
        breakdown: { prefix: 'con', root: 'tract', suffix: '' },
        meaning: '合同',
        explanation: '一起拉→合同'
      },
      {
        word: 'distract',
        breakdown: { prefix: 'dis', root: 'tract', suffix: '' },
        meaning: '分心',
        explanation: '分开拉→分心'
      },
      {
        word: 'subtract',
        breakdown: { prefix: 'sub', root: 'tract', suffix: '' },
        meaning: '减去',
        explanation: '从下拉→减去'
      }
    ],
    quiz: {
    question: 'attract 的意思是什么？',
    options: ["吸引", "分心", "合同", "提取"],
    correctAnswer: 0
  }
  },

  {
    id: 81,
    root: 'press',
    origin: 'Latin',
    meaning: '压，挤',
    meaningEn: 'press',
    description: `press 代表「压」，已在前面讲过。compress（压缩）= com-（一起）+ press（压）→ 压在一起 → 压缩。suppress（压制）= sup-（在下）+ press（压）→ 压在下面 → 压制。`,
    examples: [
      {
        word: 'pressure',
        breakdown: { prefix: '', root: 'press', suffix: 'ure' },
        meaning: '压力',
        explanation: '压→压力'
      },
      {
        word: 'express',
        breakdown: { prefix: 'ex', root: 'press', suffix: '' },
        meaning: '表达',
        explanation: '向外压→表达'
      },
      {
        word: 'impress',
        breakdown: { prefix: 'im', root: 'press', suffix: '' },
        meaning: '印象',
        explanation: '向内压→印象'
      },
      {
        word: 'depress',
        breakdown: { prefix: 'de', root: 'press', suffix: '' },
        meaning: '沮丧',
        explanation: '向下压→沮丧'
      },
      {
        word: 'compress',
        breakdown: { prefix: 'com', root: 'press', suffix: '' },
        meaning: '压缩',
        explanation: '一起压→压缩'
      }
    ],
    quiz: {
    question: 'depress 的意思是什么？',
    options: ["印象", "压力", "表达", "沮丧"],
    correctAnswer: 3
  }
  },

  {
    id: 82,
    root: 'sist',
    origin: 'Latin',
    meaning: '站立',
    meaningEn: 'stand',
    description: `sist 代表「站立」。consist（组成）= con-（一起）+ sist（站）→ 站在一起 → 组成。resist（抵抗）= re-（反）+ sist（站）→ 反着站 → 抵抗。insist（坚持）= in-（进入）+ sist（站）→ 站进去不动 → 坚持。`,
    examples: [
      {
        word: 'assist',
        breakdown: { prefix: 'as', root: 'sist', suffix: '' },
        meaning: '帮助',
        explanation: '站在旁边→帮助'
      },
      {
        word: 'resist',
        breakdown: { prefix: 're', root: 'sist', suffix: '' },
        meaning: '抵抗',
        explanation: '反站→抵抗'
      },
      {
        word: 'persist',
        breakdown: { prefix: 'per', root: 'sist', suffix: '' },
        meaning: '坚持',
        explanation: '始终站→坚持'
      },
      {
        word: 'consist',
        breakdown: { prefix: 'con', root: 'sist', suffix: '' },
        meaning: '由...组成',
        explanation: '一起站→组成'
      },
      {
        word: 'insist',
        breakdown: { prefix: 'in', root: 'sist', suffix: '' },
        meaning: '坚持主张',
        explanation: '站进去不动→坚持主张'
      }
    ],
    quiz: {
    question: 'assist 的意思是什么？',
    options: ["坚持", "抵抗", "由...组成", "帮助"],
    correctAnswer: 3
  }
  },

  {
    id: 83,
    root: 'struct',
    origin: 'Latin',
    meaning: '建造',
    meaningEn: 'build',
    description: `struct 代表「建造」，已在前面讲过。instruct（指导）= in-（进入）+ struct（建造）→ 在里面建造知识 → 指导。obstruct（阻碍）= ob-（反对）+ struct（建造）→ 建造障碍物 → 阻碍。`,
    examples: [
      {
        word: 'structure',
        breakdown: { prefix: '', root: 'struct', suffix: 'ure' },
        meaning: '结构',
        explanation: '建造→结构'
      },
      {
        word: 'construct',
        breakdown: { prefix: 'con', root: 'struct', suffix: '' },
        meaning: '建设',
        explanation: '一起建→建设'
      },
      {
        word: 'instruct',
        breakdown: { prefix: 'in', root: 'struct', suffix: '' },
        meaning: '指导',
        explanation: '向内建→指导'
      },
      {
        word: 'destroy',
        breakdown: { prefix: 'de', root: 'stroy', suffix: '' },
        meaning: '破坏',
        explanation: '向下建→破坏'
      },
      {
        word: 'obstruct',
        breakdown: { prefix: 'ob', root: 'struct', suffix: '' },
        meaning: '阻碍',
        explanation: '对着建→阻碍'
      }
    ],
    quiz: {
    question: 'instruct 的意思是什么？',
    options: ["结构", "阻碍", "破坏", "指导"],
    correctAnswer: 3
  }
  },

  {
    id: 84,
    root: 'form',
    origin: 'Latin',
    meaning: '形状，形成',
    meaningEn: 'shape, form',
    description: `form 代表「形状、形成」，已在前面讲过。inform（通知）= in-（进入）+ form（形成）→ 在脑中形成认知 → 通知。deform（变形）= de-（去除）+ form（形状）→ 去掉原来的形状 → 变形。`,
    examples: [
      {
        word: 'format',
        breakdown: { prefix: '', root: 'form', suffix: 'at' },
        meaning: '格式',
        explanation: '形状→格式'
      },
      {
        word: 'transform',
        breakdown: { prefix: 'trans', root: 'form', suffix: '' },
        meaning: '转换',
        explanation: '跨越形成→转换'
      },
      {
        word: 'inform',
        breakdown: { prefix: 'in', root: 'form', suffix: '' },
        meaning: '通知',
        explanation: '向内形成→通知'
      },
      {
        word: 'perform',
        breakdown: { prefix: 'per', root: 'form', suffix: '' },
        meaning: '表演',
        explanation: '完全形成→表演'
      },
      {
        word: 'reform',
        breakdown: { prefix: 're', root: 'form', suffix: '' },
        meaning: '改革',
        explanation: '再形成→改革'
      }
    ],
    quiz: {
    question: 'transform 的意思是什么？',
    options: ["通知", "格式", "表演", "转换"],
    correctAnswer: 3
  }
  },

  {
    id: 85,
    root: 'vers/vert',
    origin: 'Latin',
    meaning: '转',
    meaningEn: 'turn',
    description: `vers/vert 代表「转」，已在前面讲过。reverse（颠倒）= re-（回）+ vers（转）→ 转回去 → 颠倒。divert（转移）= di-（分开）+ vert（转）→ 转到别的方向 → 转移。`,
    examples: [
      {
        word: 'convert',
        breakdown: { prefix: 'con', root: 'vert', suffix: '' },
        meaning: '转换',
        explanation: '一起转→转换'
      },
      {
        word: 'reverse',
        breakdown: { prefix: 're', root: 'vers', suffix: 'e' },
        meaning: '反转',
        explanation: '向后转→反转'
      },
      {
        word: 'universe',
        breakdown: { prefix: 'uni', root: 'vers', suffix: 'e' },
        meaning: '宇宙',
        explanation: '统一转→宇宙'
      },
      {
        word: 'diverse',
        breakdown: { prefix: 'di', root: 'vers', suffix: 'e' },
        meaning: '多样的',
        explanation: '分开转→多样的'
      },
      {
        word: 'advertise',
        breakdown: { prefix: 'ad', root: 'vert', suffix: 'ise' },
        meaning: '广告',
        explanation: '使注意力转向→广告'
      }
    ],
    quiz: {
    question: 'diverse 的意思是什么？',
    options: ["反转", "广告", "宇宙", "多样的"],
    correctAnswer: 3
  }
  },

  {
    id: 86,
    root: 'plic/plex/ply',
    origin: 'Latin',
    meaning: '重叠，折叠',
    meaningEn: 'fold',
    description: `plic/plex/ply 代表「折叠、编织」，已在前面讲过。duplicate（复制）= du-（二）+ plic（折）+ -ate → 折成两份 → 复制。complex（复杂的）= com-（一起）+ plex（折）→ 折在一起 → 复杂的。`,
    examples: [
      {
        word: 'complex',
        breakdown: { prefix: 'com', root: 'plex', suffix: '' },
        meaning: '复杂的',
        explanation: '一起叠→复杂的'
      },
      {
        word: 'simple',
        breakdown: { prefix: 'sim', root: 'ple', suffix: '' },
        meaning: '简单的',
        explanation: '一次折→简单的'
      },
      {
        word: 'duplicate',
        breakdown: { prefix: 'du', root: 'plic', suffix: 'ate' },
        meaning: '复制',
        explanation: '双倍叠→复制'
      },
      {
        word: 'apply',
        breakdown: { prefix: 'ap', root: 'ply', suffix: '' },
        meaning: '应用',
        explanation: '朝向叠→应用'
      },
      {
        word: 'reply',
        breakdown: { prefix: 're', root: 'ply', suffix: '' },
        meaning: '回复',
        explanation: '向后叠→回复'
      }
    ],
    quiz: {
    question: 'duplicate 的意思是什么？',
    options: ["复杂的", "回复", "应用", "复制"],
    correctAnswer: 3
  }
  },

  {
    id: 87,
    root: 'loc',
    origin: 'Latin',
    meaning: '地方',
    meaningEn: 'place',
    description: `loc 代表「地方」。location（位置）= loc（地方）+ -ation → 所在的地方 → 位置。allocate（分配）= al-（朝向）+ loc（地方）+ -ate → 分配到各个地方 → 分配。local（当地的）直接来自「地方」。`,
    examples: [
      {
        word: 'location',
        breakdown: { prefix: '', root: 'loc', suffix: 'ation' },
        meaning: '位置',
        explanation: '地方→位置'
      },
      {
        word: 'local',
        breakdown: { prefix: '', root: 'loc', suffix: 'al' },
        meaning: '当地的',
        explanation: '地方的→当地的'
      },
      {
        word: 'allocate',
        breakdown: { prefix: 'al', root: 'loc', suffix: 'ate' },
        meaning: '分配',
        explanation: '向地方→分配'
      },
      {
        word: 'dislocate',
        breakdown: { prefix: 'dis', root: 'loc', suffix: 'ate' },
        meaning: '脱位',
        explanation: '离开地方→脱位'
      }
    ],
    quiz: {
    question: 'location 的意思是什么？',
    options: ["分配", "脱位", "位置", "当地的"],
    correctAnswer: 2
  }
  },

  {
    id: 88,
    root: 'path',
    origin: 'Greek',
    meaning: '感情，痛苦',
    meaningEn: 'feeling, suffering',
    description: `path 代表「感情、痛苦」。sympathy（同情）= sym-（共同）+ path（感情）+ -y → 共同的感情 → 同情。pathetic（可怜的）= path（痛苦）+ -etic（的）→ 让人感到痛苦的 → 可怜的。`,
    examples: [
      {
        word: 'sympathy',
        breakdown: { prefix: 'sym', root: 'path', suffix: 'y' },
        meaning: '同情',
        explanation: '一起感受→同情'
      },
      {
        word: 'empathy',
        breakdown: { prefix: 'em', root: 'path', suffix: 'y' },
        meaning: '共鸣',
        explanation: '进入感受→共鸣'
      },
      {
        word: 'apathy',
        breakdown: { prefix: 'a', root: 'path', suffix: 'y' },
        meaning: '冷漠',
        explanation: '无感受→冷漠'
      },
      {
        word: 'pathetic',
        breakdown: { prefix: '', root: 'path', suffix: 'etic' },
        meaning: '可怜的',
        explanation: '痛苦的→可怜的'
      },
      {
        word: 'pathology',
        breakdown: { prefix: '', root: 'path', suffix: 'ology' },
        meaning: '病理学',
        explanation: '疾病学→病理学'
      }
    ],
    quiz: {
    question: 'empathy 的意思是什么？',
    options: ["可怜的", "同情", "冷漠", "共鸣"],
    correctAnswer: 3
  }
  },

  {
    id: 89,
    root: 'log/logu/logue',
    origin: 'Greek',
    meaning: '说，言',
    meaningEn: 'word, speech',
    description: `log/logu/logue 代表「说、言、学」。dialogue（对话）= dia-（穿过）+ logue（说）→ 说来说去 → 对话。biology（生物学）= bio（生命）+ log（学）+ -y → 研究生命的学问 → 生物学。`,
    examples: [
      {
        word: 'dialogue',
        breakdown: { prefix: 'dia', root: 'logue', suffix: '' },
        meaning: '对话',
        explanation: '对着说→对话'
      },
      {
        word: 'monologue',
        breakdown: { prefix: 'mono', root: 'logue', suffix: '' },
        meaning: '独白',
        explanation: '一个说→独白'
      },
      {
        word: 'logic',
        breakdown: { prefix: '', root: 'log', suffix: 'ic' },
        meaning: '逻辑',
        explanation: '言说→逻辑'
      },
      {
        word: 'apology',
        breakdown: { prefix: 'apo', root: 'log', suffix: 'y' },
        meaning: '道歉',
        explanation: '说明→道歉'
      },
      {
        word: 'catalog',
        breakdown: { prefix: 'cata', root: 'log', suffix: '' },
        meaning: '目录',
        explanation: '向下说→目录'
      }
    ],
    quiz: {
    question: 'dialogue 的意思是什么？',
    options: ["独白", "目录", "对话", "逻辑"],
    correctAnswer: 2
  }
  },

  {
    id: 90,
    root: 'scop',
    origin: 'Greek',
    meaning: '看，观察',
    meaningEn: 'see, watch',
    description: `scop 代表「看、观察」。telescope（望远镜）= tele-（远）+ scop（看）+ -e → 看远处的工具 → 望远镜。microscope（显微镜）= micro-（微小）+ scop（看）+ -e → 看微小东西的工具 → 显微镜。`,
    examples: [
      {
        word: 'telescope',
        breakdown: { prefix: 'tele', root: 'scop', suffix: 'e' },
        meaning: '望远镜',
        explanation: '远看→望远镜'
      },
      {
        word: 'microscope',
        breakdown: { prefix: 'micro', root: 'scop', suffix: 'e' },
        meaning: '显微镜',
        explanation: '微小看→显微镜'
      },
      {
        word: 'scope',
        breakdown: { prefix: '', root: 'scop', suffix: 'e' },
        meaning: '范围',
        explanation: '看的范围→范围'
      },
      {
        word: 'horoscope',
        breakdown: { prefix: 'horo', root: 'scop', suffix: 'e' },
        meaning: '占星术',
        explanation: '看时间→占星术'
      }
    ],
    quiz: {
    question: 'scope 的意思是什么？',
    options: ["显微镜", "范围", "望远镜", "占星术"],
    correctAnswer: 1
  }
  },

  {
    id: 91,
    root: 'phil',
    origin: 'Greek',
    meaning: '爱',
    meaningEn: 'love',
    description: `phil 代表「爱」。philosophy（哲学）= philo-（爱）+ soph（智慧）+ -y → 爱智慧 → 哲学。Philadelphia（费城）= phil（爱）+ adelph（兄弟）+ -ia → 兄弟之爱的城市 → 费城（友爱之城）。`,
    examples: [
      {
        word: 'philosophy',
        breakdown: { prefix: '', root: 'phil', suffix: 'osophy' },
        meaning: '哲学',
        explanation: '爱智慧→哲学'
      },
      {
        word: 'philanthropist',
        breakdown: { prefix: '', root: 'phil', suffix: 'anthropist' },
        meaning: '慈善家',
        explanation: '爱人类→慈善家'
      },
      {
        word: 'bibliophile',
        breakdown: { prefix: 'biblio', root: 'phil', suffix: 'e' },
        meaning: '爱书者',
        explanation: '爱书→爱书者'
      },
      {
        word: 'Philadelphia',
        breakdown: { prefix: '', root: 'phil', suffix: 'adelphia' },
        meaning: '费城',
        explanation: '兄弟之爱→费城'
      }
    ],
    quiz: {
    question: 'Philadelphia 的意思是什么？',
    options: ["爱书者", "慈善家", "哲学", "费城"],
    correctAnswer: 3
  }
  },

  {
    id: 92,
    root: 'phon',
    origin: 'Greek',
    meaning: '声音',
    meaningEn: 'sound',
    description: `phon 代表「声音」。telephone（电话）= tele-（远）+ phon（声音）+ -e → 远距离传声 → 电话。symphony（交响乐）= sym-（共同）+ phon（声音）+ -y → 共同的声音 → 交响乐。`,
    examples: [
      {
        word: 'phone',
        breakdown: { prefix: '', root: 'phon', suffix: 'e' },
        meaning: '电话',
        explanation: '声音→电话'
      },
      {
        word: 'symphony',
        breakdown: { prefix: 'sym', root: 'phon', suffix: 'y' },
        meaning: '交响乐',
        explanation: '一起声音→交响乐'
      },
      {
        word: 'microphone',
        breakdown: { prefix: 'micro', root: 'phon', suffix: 'e' },
        meaning: '麦克风',
        explanation: '小声音→麦克风'
      },
      {
        word: 'phonetic',
        breakdown: { prefix: '', root: 'phon', suffix: 'etic' },
        meaning: '语音的',
        explanation: '声音的→语音的'
      }
    ],
    quiz: {
    question: 'phonetic 的意思是什么？',
    options: ["麦克风", "语音的", "交响乐", "电话"],
    correctAnswer: 1
  }
  },

  {
    id: 93,
    root: 'psych',
    origin: 'Greek',
    meaning: '精神，心理',
    meaningEn: 'mind, soul',
    description: `psych 代表「精神、心理」。psychology（心理学）= psych（心理）+ log（学）+ -y → 研究心理的学问。psychiatrist（精神科医生）= psych（精神）+ iatr（治疗）+ -ist（人）→ 治疗精神的人 → 精神科医生。`,
    examples: [
      {
        word: 'psychology',
        breakdown: { prefix: '', root: 'psych', suffix: 'ology' },
        meaning: '心理学',
        explanation: '心灵学→心理学'
      },
      {
        word: 'psychic',
        breakdown: { prefix: '', root: 'psych', suffix: 'ic' },
        meaning: '精神的',
        explanation: '心灵的→精神的'
      },
      {
        word: 'psychiatry',
        breakdown: { prefix: '', root: 'psych', suffix: 'iatry' },
        meaning: '精神病学',
        explanation: '治疗心灵→精神病学'
      },
      {
        word: 'psychotherapy',
        breakdown: { prefix: '', root: 'psych', suffix: 'otherapy' },
        meaning: '心理疗法',
        explanation: '治疗心理→心理疗法'
      }
    ],
    quiz: {
    question: 'psychic 的意思是什么？',
    options: ["精神的", "心理学", "精神病学", "心理疗法"],
    correctAnswer: 0
  }
  },

  {
    id: 94,
    root: 'therm',
    origin: 'Greek',
    meaning: '热',
    meaningEn: 'heat',
    description: `therm 代表「热」。thermometer（温度计）= thermo（热）+ meter（测量）→ 测量热度的工具 → 温度计。thermal（热的）= therm（热）+ -al（的）→ 关于热的。`,
    examples: [
      {
        word: 'thermometer',
        breakdown: { prefix: '', root: 'therm', suffix: 'ometer' },
        meaning: '温度计',
        explanation: '测热→温度计'
      },
      {
        word: 'thermal',
        breakdown: { prefix: '', root: 'therm', suffix: 'al' },
        meaning: '热的',
        explanation: '热的'
      },
      {
        word: 'thermos',
        breakdown: { prefix: '', root: 'therm', suffix: 'os' },
        meaning: '保温瓶',
        explanation: '保热→保温瓶'
      },
      {
        word: 'hypothermia',
        breakdown: { prefix: 'hypo', root: 'therm', suffix: 'ia' },
        meaning: '低体温',
        explanation: '低热→低体温'
      }
    ],
    quiz: {
    question: 'hypothermia 的意思是什么？',
    options: ["低体温", "热的", "温度计", "保温瓶"],
    correctAnswer: 0
  }
  },

  {
    id: 95,
    root: 'geo',
    origin: 'Greek',
    meaning: '地，地球',
    meaningEn: 'earth',
    description: `geo 代表「地、地球」。geography（地理）= geo（地）+ graph（写）+ -y → 描写地球的学问 → 地理。geology（地质学）= geo（地）+ log（学）+ -y → 研究地球的学问 → 地质学。`,
    examples: [
      {
        word: 'geography',
        breakdown: { prefix: '', root: 'geo', suffix: 'graphy' },
        meaning: '地理',
        explanation: '地写→地理'
      },
      {
        word: 'geology',
        breakdown: { prefix: '', root: 'geo', suffix: 'logy' },
        meaning: '地质学',
        explanation: '地学→地质学'
      },
      {
        word: 'geometry',
        breakdown: { prefix: '', root: 'geo', suffix: 'metry' },
        meaning: '几何',
        explanation: '测地→几何'
      },
      {
        word: 'geothermal',
        breakdown: { prefix: '', root: 'geo', suffix: 'thermal' },
        meaning: '地热的',
        explanation: '地热→地热的'
      }
    ],
    quiz: {
    question: 'geology 的意思是什么？',
    options: ["地质学", "地理", "地热的", "几何"],
    correctAnswer: 0
  }
  },

  {
    id: 96,
    root: 'hydr/hydro',
    origin: 'Greek',
    meaning: '水',
    meaningEn: 'water',
    description: `hydr/hydro 代表「水」。hydrogen（氢）= hydro（水）+ gen（产生）→ 产生水的元素 → 氢（氢燃烧生成水）。dehydrate（脱水）= de-（去除）+ hydr（水）+ -ate → 去除水分 → 脱水。`,
    examples: [
      {
        word: 'hydraulic',
        breakdown: { prefix: '', root: 'hydr', suffix: 'aulic' },
        meaning: '水力的',
        explanation: '水的→水力的'
      },
      {
        word: 'hydrogen',
        breakdown: { prefix: '', root: 'hydro', suffix: 'gen' },
        meaning: '氢',
        explanation: '产生水→氢'
      },
      {
        word: 'dehydrate',
        breakdown: { prefix: 'de', root: 'hydr', suffix: 'ate' },
        meaning: '脱水',
        explanation: '去水→脱水'
      },
      {
        word: 'hydrology',
        breakdown: { prefix: '', root: 'hydro', suffix: 'logy' },
        meaning: '水文学',
        explanation: '水学→水文学'
      }
    ],
    quiz: {
    question: 'hydrogen 的意思是什么？',
    options: ["脱水", "氢", "水文学", "水力的"],
    correctAnswer: 1
  }
  },

  {
    id: 97,
    root: 'aer/aero',
    origin: 'Greek',
    meaning: '空气',
    meaningEn: 'air',
    description: `aer/aero 代表「空气」。airplane（飞机）= aero（空气）+ plane（平面）→ 在空中飞的平面 → 飞机。aerobic（有氧的）= aero（空气）+ bio（生命）+ -ic → 需要空气的生命活动 → 有氧的。`,
    examples: [
      {
        word: 'aeroplane',
        breakdown: { prefix: '', root: 'aero', suffix: 'plane' },
        meaning: '飞机',
        explanation: '空中平面→飞机'
      },
      {
        word: 'aerobic',
        breakdown: { prefix: '', root: 'aero', suffix: 'bic' },
        meaning: '有氧的',
        explanation: '空气生活→有氧的'
      },
      {
        word: 'aerospace',
        breakdown: { prefix: '', root: 'aero', suffix: 'space' },
        meaning: '航空航天',
        explanation: '空气空间→航空航天'
      },
      {
        word: 'aerial',
        breakdown: { prefix: '', root: 'aer', suffix: 'ial' },
        meaning: '空中的',
        explanation: '空气的→空中的'
      }
    ],
    quiz: {
    question: 'aerial 的意思是什么？',
    options: ["有氧的", "空中的", "飞机", "航空航天"],
    correctAnswer: 1
  }
  },

  {
    id: 98,
    root: 'astro/aster',
    origin: 'Greek',
    meaning: '星星',
    meaningEn: 'star',
    description: `astro/aster 代表「星星」。astronaut（宇航员）= astro（星）+ naut（航行者）→ 在星空中航行的人 → 宇航员。astronomy（天文学）= astro（星）+ nom（法则）+ -y → 研究星星运行规律的学问 → 天文学。`,
    examples: [
      {
        word: 'astronomy',
        breakdown: { prefix: '', root: 'astro', suffix: 'nomy' },
        meaning: '天文学',
        explanation: '星星规律→天文学'
      },
      {
        word: 'astronaut',
        breakdown: { prefix: '', root: 'astro', suffix: 'naut' },
        meaning: '宇航员',
        explanation: '星星航行者→宇航员'
      },
      {
        word: 'asteroid',
        breakdown: { prefix: '', root: 'aster', suffix: 'oid' },
        meaning: '小行星',
        explanation: '像星星→小行星'
      },
      {
        word: 'disaster',
        breakdown: { prefix: 'dis', root: 'aster', suffix: '' },
        meaning: '灾难',
        explanation: '星星不好→灾难'
      }
    ],
    quiz: {
    question: 'astronomy 的意思是什么？',
    options: ["天文学", "宇航员", "灾难", "小行星"],
    correctAnswer: 0
  }
  },

  {
    id: 99,
    root: 'photo',
    origin: 'Greek',
    meaning: '光',
    meaningEn: 'light',
    description: `photo 代表「光」。photograph（照片）= photo（光）+ graph（画）→ 用光画出来的图 → 照片。photosynthesis（光合作用）= photo（光）+ synthesis（合成）→ 利用光合成 → 光合作用。`,
    examples: [
      {
        word: 'photograph',
        breakdown: { prefix: '', root: 'photo', suffix: 'graph' },
        meaning: '照片',
        explanation: '光写→照片'
      },
      {
        word: 'photosynthesis',
        breakdown: { prefix: '', root: 'photo', suffix: 'synthesis' },
        meaning: '光合作用',
        explanation: '光合成→光合作用'
      },
      {
        word: 'photocopy',
        breakdown: { prefix: '', root: 'photo', suffix: 'copy' },
        meaning: '影印',
        explanation: '光复制→影印'
      },
      {
        word: 'photogenic',
        breakdown: { prefix: '', root: 'photo', suffix: 'genic' },
        meaning: '上镜的',
        explanation: '产生光→上镜的'
      }
    ],
    quiz: {
    question: 'photocopy 的意思是什么？',
    options: ["影印", "光合作用", "照片", "上镜的"],
    correctAnswer: 0
  }
  },

  {
    id: 100,
    root: 'meter/metr',
    origin: 'Greek',
    meaning: '测量',
    meaningEn: 'measure',
    description: `meter/metr 代表「测量」。thermometer（温度计）= thermo（热）+ meter（测量）→ 测量温度的工具。diameter（直径）= dia-（穿过）+ meter（测量）→ 穿过圆心测量的距离 → 直径。`,
    examples: [
      {
        word: 'thermometer',
        breakdown: { prefix: 'thermo', root: 'meter', suffix: '' },
        meaning: '温度计',
        explanation: '测热→温度计'
      },
      {
        word: 'kilometer',
        breakdown: { prefix: 'kilo', root: 'meter', suffix: '' },
        meaning: '千米',
        explanation: '千测量→千米'
      },
      {
        word: 'diameter',
        breakdown: { prefix: 'dia', root: 'meter', suffix: '' },
        meaning: '直径',
        explanation: '穿过测量→直径'
      },
      {
        word: 'geometry',
        breakdown: { prefix: 'geo', root: 'metr', suffix: 'y' },
        meaning: '几何',
        explanation: '测地→几何'
      }
    ],
    quiz: {
    question: 'diameter 的意思是什么？',
    options: ["几何", "直径", "千米", "温度计"],
    correctAnswer: 1
  }
  },

  {
    id: 101,
    root: 'man/manu',
    origin: 'Latin',
    meaning: '手',
    meaningEn: 'hand',
    description: `man/manu 代表「手」。manual（手册）= manu（手）+ -al（的）→ 手边的书 → 手册。manufacture（制造）= manu（手）+ fact（做）+ -ure → 用手做 → 制造。manicure（修指甲）= mani（手）+ cure（护理）→ 护理手 → 修指甲。`,
    examples: [
      {
        word: 'manual',
        breakdown: { prefix: '', root: 'manu', suffix: 'al' },
        meaning: '手册',
        explanation: '手的→手册'
      },
      {
        word: 'manufacture',
        breakdown: { prefix: '', root: 'manu', suffix: 'facture' },
        meaning: '制造',
        explanation: '手做→制造'
      },
      {
        word: 'manuscript',
        breakdown: { prefix: '', root: 'manu', suffix: 'script' },
        meaning: '手稿',
        explanation: '手写→手稿'
      },
      {
        word: 'manipulate',
        breakdown: { prefix: '', root: 'mani', suffix: 'pulate' },
        meaning: '操纵',
        explanation: '用手→操纵'
      }
    ],
    quiz: {
    question: 'manufacture 的意思是什么？',
    options: ["手稿", "制造", "手册", "操纵"],
    correctAnswer: 1
  }
  },

  {
    id: 102,
    root: 'ped/pod',
    origin: 'Latin/Greek',
    meaning: '脚',
    meaningEn: 'foot',
    description: `ped/pod 代表「脚」。pedestrian（行人）= ped（脚）+ -estrian → 用脚走的人 → 行人。pedal（踏板）= ped（脚）+ -al → 用脚踩的东西 → 踏板。tripod（三脚架）= tri-（三）+ pod（脚）→ 三只脚的架子。注意：ped 来自拉丁语，pod 来自希腊语。`,
    examples: [
      {
        word: 'pedestrian',
        breakdown: { prefix: '', root: 'ped', suffix: 'estrian' },
        meaning: '行人',
        explanation: '用脚→行人'
      },
      {
        word: 'pedal',
        breakdown: { prefix: '', root: 'ped', suffix: 'al' },
        meaning: '踏板',
        explanation: '脚的→踏板'
      },
      {
        word: 'tripod',
        breakdown: { prefix: 'tri', root: 'pod', suffix: '' },
        meaning: '三脚架',
        explanation: '三脚→三脚架'
      },
      {
        word: 'podium',
        breakdown: { prefix: '', root: 'pod', suffix: 'ium' },
        meaning: '讲台',
        explanation: '放脚的地方→讲台'
      }
    ],
    quiz: {
    question: 'pedestrian 的意思是什么？',
    options: ["三脚架", "行人", "讲台", "踏板"],
    correctAnswer: 1
  }
  },

  {
    id: 103,
    root: 'cap/capit',
    origin: 'Latin',
    meaning: '头',
    meaningEn: 'head',
    description: `cap/capit 代表「头」。captain（队长）= capit（头）+ -ain → 头头 → 队长。capital（首都）= capit（头）+ -al → 头等重要的城市 → 首都。decapitate（斩首）= de-（去除）+ capit（头）+ -ate → 去掉头 → 斩首。`,
    examples: [
      {
        word: 'capital',
        breakdown: { prefix: '', root: 'capit', suffix: 'al' },
        meaning: '首都',
        explanation: '头部→首都'
      },
      {
        word: 'captain',
        breakdown: { prefix: '', root: 'capit', suffix: 'ain' },
        meaning: '船长',
        explanation: '头领→船长'
      },
      {
        word: 'decapitate',
        breakdown: { prefix: 'de', root: 'capit', suffix: 'ate' },
        meaning: '斩首',
        explanation: '去头→斩首'
      },
      {
        word: 'per capita',
        breakdown: { prefix: 'per', root: 'capita', suffix: '' },
        meaning: '人均',
        explanation: '每个头→人均'
      }
    ],
    quiz: {
    question: 'decapitate 的意思是什么？',
    options: ["船长", "首都", "斩首", "人均"],
    correctAnswer: 2
  }
  },

  {
    id: 104,
    root: 'corp/corpor',
    origin: 'Latin',
    meaning: '身体',
    meaningEn: 'body',
    description: `corp/corpor 代表「身体、团体」。corporation（公司）= corpor（团体）+ -ation → 团体组织 → 公司。corpse（尸体）= corp（身体）+ -se → 死亡的身体 → 尸体。incorporate（合并）= in-（进入）+ corpor（团体）+ -ate → 合并成一个团体。`,
    examples: [
      {
        word: 'corporation',
        breakdown: { prefix: '', root: 'corpor', suffix: 'ation' },
        meaning: '公司',
        explanation: '团体→公司'
      },
      {
        word: 'corpse',
        breakdown: { prefix: '', root: 'corp', suffix: 'se' },
        meaning: '尸体',
        explanation: '身体→尸体'
      },
      {
        word: 'incorporate',
        breakdown: { prefix: 'in', root: 'corp', suffix: 'orate' },
        meaning: '合并',
        explanation: '进入身体→合并'
      },
      {
        word: 'corporal',
        breakdown: { prefix: '', root: 'corpor', suffix: 'al' },
        meaning: '身体的',
        explanation: '身体的'
      }
    ],
    quiz: {
    question: 'corpse 的意思是什么？',
    options: ["合并", "尸体", "身体的", "公司"],
    correctAnswer: 1
  }
  },

  {
    id: 105,
    root: 'cord/cor',
    origin: 'Latin',
    meaning: '心',
    meaningEn: 'heart',
    description: `cord/cor 代表「心」。cordial（热情的）= cord（心）+ -ial（的）→ 发自内心的 → 热情的。record（记录）= re-（回）+ cord（心）→ 放回心里记住 → 记录。courage（勇气）= cor（心）+ -age → 心的力量 → 勇气。`,
    examples: [
      {
        word: 'record',
        breakdown: { prefix: 're', root: 'cord', suffix: '' },
        meaning: '记录',
        explanation: '回到心里→记录'
      },
      {
        word: 'accord',
        breakdown: { prefix: 'ac', root: 'cord', suffix: '' },
        meaning: '一致',
        explanation: '心向→一致'
      },
      {
        word: 'discord',
        breakdown: { prefix: 'dis', root: 'cord', suffix: '' },
        meaning: '不和',
        explanation: '心分→不和'
      },
      {
        word: 'core',
        breakdown: { prefix: '', root: 'cor', suffix: 'e' },
        meaning: '核心',
        explanation: '心→核心'
      }
    ],
    quiz: {
    question: 'discord 的意思是什么？',
    options: ["核心", "不和", "记录", "一致"],
    correctAnswer: 1
  }
  },

  {
    id: 106,
    root: 'dent/dont',
    origin: 'Latin',
    meaning: '牙齿',
    meaningEn: 'tooth',
    description: `dent/dont 代表「牙齿」。dentist（牙医）= dent（牙齿）+ -ist（人）→ 治牙齿的人 → 牙医。dental（牙科的）= dent（牙齿）+ -al（的）→ 关于牙齿的。orthodontist（正畸医生）= ortho-（正）+ dont（牙齿）+ -ist → 矫正牙齿的医生。`,
    examples: [
      {
        word: 'dentist',
        breakdown: { prefix: '', root: 'dent', suffix: 'ist' },
        meaning: '牙医',
        explanation: '牙齿专家→牙医'
      },
      {
        word: 'dental',
        breakdown: { prefix: '', root: 'dent', suffix: 'al' },
        meaning: '牙齿的',
        explanation: '牙齿的'
      },
      {
        word: 'denture',
        breakdown: { prefix: '', root: 'dent', suffix: 'ure' },
        meaning: '假牙',
        explanation: '牙齿→假牙'
      },
      {
        word: 'orthodontist',
        breakdown: { prefix: 'ortho', root: 'dont', suffix: 'ist' },
        meaning: '正畸医生',
        explanation: '正牙齿→正畸医生'
      }
    ],
    quiz: {
    question: 'orthodontist 的意思是什么？',
    options: ["假牙", "牙齿的", "正畸医生", "牙医"],
    correctAnswer: 2
  }
  },

  {
    id: 107,
    root: 'fac/face',
    origin: 'Latin',
    meaning: '脸，面',
    meaningEn: 'face',
    description: `fac/face 代表「脸、面」。surface（表面）= sur-（在上）+ face（面）→ 在上面的一层 → 表面。interface（界面）= inter-（之间）+ face（面）→ 两者之间的接触面 → 界面。deface（损坏外观）= de-（去除）+ face（面）→ 破坏表面 → 损坏外观。`,
    examples: [
      {
        word: 'surface',
        breakdown: { prefix: 'sur', root: 'face', suffix: '' },
        meaning: '表面',
        explanation: '上面→表面'
      },
      {
        word: 'interface',
        breakdown: { prefix: 'inter', root: 'face', suffix: '' },
        meaning: '界面',
        explanation: '之间的面→界面'
      },
      {
        word: 'preface',
        breakdown: { prefix: 'pre', root: 'face', suffix: '' },
        meaning: '序言',
        explanation: '在前面→序言'
      },
      {
        word: 'facial',
        breakdown: { prefix: '', root: 'fac', suffix: 'ial' },
        meaning: '面部的',
        explanation: '脸的→面部的'
      }
    ],
    quiz: {
    question: 'surface 的意思是什么？',
    options: ["表面", "面部的", "界面", "序言"],
    correctAnswer: 0
  }
  },

  {
    id: 108,
    root: 'greg',
    origin: 'Latin',
    meaning: '群体',
    meaningEn: 'flock, gather',
    description: `greg 代表「群体、聚集」。congregation（集会）= con-（一起）+ greg（群）+ -ation → 聚成一群 → 集会。segregate（隔离）= se-（分开）+ greg（群）+ -ate → 从群体中分开 → 隔离。aggregate（总计）= ag-（朝向）+ greg（群）+ -ate → 聚到一起 → 总计。`,
    examples: [
      {
        word: 'gregarious',
        breakdown: { prefix: '', root: 'greg', suffix: 'arious' },
        meaning: '群居的',
        explanation: '群体的→群居的'
      },
      {
        word: 'congregate',
        breakdown: { prefix: 'con', root: 'greg', suffix: 'ate' },
        meaning: '聚集',
        explanation: '一起群→聚集'
      },
      {
        word: 'aggregate',
        breakdown: { prefix: 'ag', root: 'greg', suffix: 'ate' },
        meaning: '聚合',
        explanation: '向群→聚合'
      },
      {
        word: 'segregate',
        breakdown: { prefix: 'se', root: 'greg', suffix: 'ate' },
        meaning: '隔离',
        explanation: '分开群→隔离'
      }
    ],
    quiz: {
    question: 'gregarious 的意思是什么？',
    options: ["聚集", "隔离", "群居的", "聚合"],
    correctAnswer: 2
  }
  },

  {
    id: 109,
    root: 'habit/hibit',
    origin: 'Latin',
    meaning: '拿住，居住',
    meaningEn: 'have, dwell',
    description: `habit/hibit 代表「拿住、居住」。inhabit（居住）= in-（里面）+ habit（住）→ 住在里面 → 居住。exhibit（展览）= ex-（向外）+ hibit（拿）→ 拿出来给人看 → 展览。prohibit（禁止）= pro-（在前）+ hibit（拿）→ 提前拿住阻止 → 禁止。`,
    commonPitfall: 'habit 作普通词是“习惯”，不是“拿住”的直译；这里用它提示“长期持有/保持”的语义线索。',
    examples: [
      {
        word: 'habit',
        breakdown: { prefix: '', root: 'habit', suffix: '' },
        partMeanings: { root: '持有 / 保持' },
        meaning: '习惯',
        explanation: '长期保持的行为→习惯',
        literalMeaning: '被持续持有的行为模式',
        learningNote: '这是自由词，不是最佳拆词例；真正高价值例词是 inhabit / exhibit / prohibit。',
      },
      {
        word: 'inhabit',
        breakdown: { prefix: 'in', root: 'habit', suffix: '' },
        meaning: '居住',
        explanation: '在里面拿→居住'
      },
      {
        word: 'exhibit',
        breakdown: { prefix: 'ex', root: 'hibit', suffix: '' },
        meaning: '展览',
        explanation: '向外拿→展览'
      },
      {
        word: 'prohibit',
        breakdown: { prefix: 'pro', root: 'hibit', suffix: '' },
        meaning: '禁止',
        explanation: '向前拿住→禁止'
      }
    ],
    quiz: {
    question: 'prohibit 的意思是什么？',
    options: ["展览", "居住", "习惯", "禁止"],
    correctAnswer: 3
  }
  },

  {
    id: 110,
    root: 'leg/lect',
    origin: 'Latin',
    meaning: '读，选',
    meaningEn: 'read, choose',
    description: `leg/lect 代表「读、选、收集」。legend（传奇）= leg（读）+ -end → 值得阅读的故事 → 传奇。select（选择）= se-（分开）+ lect（选）→ 分开挑选 → 选择。collect（收集）= col-（一起）+ lect（收集）→ 收集到一起。`,
    examples: [
      {
        word: 'legible',
        breakdown: { prefix: '', root: 'leg', suffix: 'ible' },
        meaning: '可读的',
        explanation: '能读→可读的'
      },
      {
        word: 'select',
        breakdown: { prefix: 'se', root: 'lect', suffix: '' },
        meaning: '选择',
        explanation: '分开选→选择'
      },
      {
        word: 'collect',
        breakdown: { prefix: 'col', root: 'lect', suffix: '' },
        meaning: '收集',
        explanation: '一起选→收集'
      },
      {
        word: 'elect',
        breakdown: { prefix: 'e', root: 'lect', suffix: '' },
        meaning: '选举',
        explanation: '向外选→选举'
      }
    ],
    quiz: {
    question: 'select 的意思是什么？',
    options: ["收集", "选择", "可读的", "选举"],
    correctAnswer: 1
  }
  },

  {
    id: 111,
    root: 'liber',
    origin: 'Latin',
    meaning: '自由',
    meaningEn: 'free',
    description: `liber 代表「自由」。liberal（自由的）= liber（自由）+ -al（的）→ 自由的。liberty（自由）= liber（自由）+ -ty → 自由状态。liberate（解放）= liber（自由）+ -ate（使）→ 使自由 → 解放。`,
    examples: [
      {
        word: 'liberty',
        breakdown: { prefix: '', root: 'liber', suffix: 'ty' },
        meaning: '自由',
        explanation: '自由'
      },
      {
        word: 'liberal',
        breakdown: { prefix: '', root: 'liber', suffix: 'al' },
        meaning: '自由的',
        explanation: '自由的'
      },
      {
        word: 'liberate',
        breakdown: { prefix: '', root: 'liber', suffix: 'ate' },
        meaning: '解放',
        explanation: '使自由→解放'
      },
      {
        word: 'deliberate',
        breakdown: { prefix: 'de', root: 'liber', suffix: 'ate' },
        meaning: '深思熟虑',
        explanation: '完全自由→深思熟虑'
      }
    ],
    quiz: {
    question: 'liberal 的意思是什么？',
    options: ["自由的", "解放", "深思熟虑", "自由"],
    correctAnswer: 0
  }
  },

  {
    id: 112,
    root: 'lingu/langu',
    origin: 'Latin',
    meaning: '语言，舌头',
    meaningEn: 'language, tongue',
    description: `lingu/langu 代表「语言、舌头」。language（语言）直接来自 langu。bilingual（双语的）= bi-（双）+ lingu（语言）+ -al → 会两种语言的。linguistics（语言学）= lingu（语言）+ -istics（学）→ 研究语言的学问。`,
    examples: [
      {
        word: 'language',
        breakdown: { prefix: '', root: 'langu', suffix: 'age' },
        meaning: '语言',
        explanation: '语言'
      },
      {
        word: 'linguist',
        breakdown: { prefix: '', root: 'lingu', suffix: 'ist' },
        meaning: '语言学家',
        explanation: '语言专家→语言学家'
      },
      {
        word: 'bilingual',
        breakdown: { prefix: 'bi', root: 'lingu', suffix: 'al' },
        meaning: '双语的',
        explanation: '两种语言→双语的'
      },
      {
        word: 'linguistic',
        breakdown: { prefix: '', root: 'lingu', suffix: 'istic' },
        meaning: '语言的',
        explanation: '语言的'
      }
    ],
    quiz: {
    question: 'bilingual 的意思是什么？',
    options: ["双语的", "语言的", "语言学家", "语言"],
    correctAnswer: 0
  }
  },

  {
    id: 113,
    root: 'liter',
    origin: 'Latin',
    meaning: '文字，字母',
    meaningEn: 'letter',
    description: `liter 代表「文字、字母」。literature（文学）= liter（文字）+ -ature → 文字作品 → 文学。literal（字面的）= liter（字母）+ -al（的）→ 按字母理解的 → 字面的。literate（有文化的）= liter（文字）+ -ate（的）→ 认识字的 → 有文化的。`,
    examples: [
      {
        word: 'literature',
        breakdown: { prefix: '', root: 'liter', suffix: 'ature' },
        meaning: '文学',
        explanation: '文字→文学'
      },
      {
        word: 'literal',
        breakdown: { prefix: '', root: 'liter', suffix: 'al' },
        meaning: '字面的',
        explanation: '文字的→字面的'
      },
      {
        word: 'literate',
        breakdown: { prefix: '', root: 'liter', suffix: 'ate' },
        meaning: '有文化的',
        explanation: '懂文字→有文化的'
      },
      {
        word: 'illiterate',
        breakdown: { prefix: 'il', root: 'liter', suffix: 'ate' },
        meaning: '文盲的',
        explanation: '不懂文字→文盲的'
      }
    ],
    quiz: {
    question: 'illiterate 的意思是什么？',
    options: ["文盲的", "有文化的", "字面的", "文学"],
    correctAnswer: 0
  }
  },

  {
    id: 114,
    root: 'magn/maj/max',
    origin: 'Latin',
    meaning: '大',
    meaningEn: 'great, large',
    description: `magn/maj/max 代表「大」。magnificent（壮丽的）= magn（大）+ -ificent（的）→ 很大很华丽的 → 壮丽的。major（主要的）= maj（大）+ -or → 更大的 → 主要的。maximum（最大值）= max（大）+ -imum（最）→ 最大的。`,
    examples: [
      {
        word: 'magnificent',
        breakdown: { prefix: '', root: 'magn', suffix: 'ificent' },
        meaning: '壮丽的',
        explanation: '大做→壮丽的'
      },
      {
        word: 'major',
        breakdown: { prefix: '', root: 'maj', suffix: 'or' },
        meaning: '主要的',
        explanation: '大的→主要的'
      },
      {
        word: 'maximum',
        breakdown: { prefix: '', root: 'max', suffix: 'imum' },
        meaning: '最大',
        explanation: '最大'
      },
      {
        word: 'magnify',
        breakdown: { prefix: '', root: 'magn', suffix: 'ify' },
        meaning: '放大',
        explanation: '使大→放大'
      }
    ],
    quiz: {
    question: 'maximum 的意思是什么？',
    options: ["最大", "主要的", "放大", "壮丽的"],
    correctAnswer: 0
  }
  },

  {
    id: 115,
    root: 'min/mini',
    origin: 'Latin',
    meaning: '小',
    meaningEn: 'small',
    description: `min/mini 代表「小」。minimum（最小值）= min（小）+ -imum（最）→ 最小的。minimize（最小化）= min（小）+ -imize（使）→ 使最小化。miniature（微型的）= mini（小）+ -ature → 小型的东西 → 微型的。`,
    examples: [
      {
        word: 'minimum',
        breakdown: { prefix: '', root: 'min', suffix: 'imum' },
        meaning: '最小',
        explanation: '最小'
      },
      {
        word: 'minor',
        breakdown: { prefix: '', root: 'min', suffix: 'or' },
        meaning: '较小的',
        explanation: '小的→较小的'
      },
      {
        word: 'minimize',
        breakdown: { prefix: '', root: 'min', suffix: 'imize' },
        meaning: '最小化',
        explanation: '使最小→最小化'
      },
      {
        word: 'miniature',
        breakdown: { prefix: '', root: 'mini', suffix: 'ature' },
        meaning: '微型',
        explanation: '小的→微型'
      }
    ],
    quiz: {
    question: 'minimum 的意思是什么？',
    options: ["微型", "较小的", "最小化", "最小"],
    correctAnswer: 3
  }
  },

  {
    id: 116,
    root: 'nov',
    origin: 'Latin',
    meaning: '新',
    meaningEn: 'new',
    description: `nov 代表「新」。novel（小说）= nov（新）+ -el → 新奇的故事 → 小说。innovate（创新）= in-（进入）+ nov（新）+ -ate → 引入新东西 → 创新。renovate（翻新）= re-（再）+ nov（新）+ -ate → 重新变新 → 翻新。`,
    examples: [
      {
        word: 'novel',
        breakdown: { prefix: '', root: 'nov', suffix: 'el' },
        meaning: '小说',
        explanation: '新的→小说'
      },
      {
        word: 'novelty',
        breakdown: { prefix: '', root: 'nov', suffix: 'elty' },
        meaning: '新奇',
        explanation: '新的→新奇'
      },
      {
        word: 'innovate',
        breakdown: { prefix: 'in', root: 'nov', suffix: 'ate' },
        meaning: '创新',
        explanation: '向内新→创新'
      },
      {
        word: 'renovate',
        breakdown: { prefix: 're', root: 'nov', suffix: 'ate' },
        meaning: '翻新',
        explanation: '再新→翻新'
      }
    ],
    quiz: {
    question: 'renovate 的意思是什么？',
    options: ["翻新", "创新", "新奇", "小说"],
    correctAnswer: 0
  }
  },

  {
    id: 117,
    root: 'number/numer',
    origin: 'Latin',
    meaning: '数',
    meaningEn: 'number',
    description: `number/numer 代表「数」。numeral（数字）= numer（数）+ -al → 数的符号 → 数字。numerous（许多的）= numer（数）+ -ous（的）→ 数量多的 → 许多的。enumerate（列举）= e-（向外）+ numer（数）+ -ate → 数出来 → 列举。`,
    examples: [
      {
        word: 'numerous',
        breakdown: { prefix: '', root: 'numer', suffix: 'ous' },
        meaning: '众多的',
        explanation: '数多→众多的'
      },
      {
        word: 'numeral',
        breakdown: { prefix: '', root: 'numer', suffix: 'al' },
        meaning: '数字',
        explanation: '数的→数字'
      },
      {
        word: 'enumerate',
        breakdown: { prefix: 'e', root: 'numer', suffix: 'ate' },
        meaning: '列举',
        explanation: '向外数→列举'
      },
      {
        word: 'innumerable',
        breakdown: { prefix: 'in', root: 'numer', suffix: 'able' },
        meaning: '无数的',
        explanation: '不能数→无数的'
      }
    ],
    quiz: {
    question: 'enumerate 的意思是什么？',
    options: ["列举", "数字", "众多的", "无数的"],
    correctAnswer: 0
  }
  },

  {
    id: 118,
    root: 'ord/ordin',
    origin: 'Latin',
    meaning: '顺序',
    meaningEn: 'order',
    description: `ord/ordin 代表「顺序」。order（顺序）直接来自 ord。ordinary（普通的）= ordin（顺序）+ -ary（的）→ 按常规顺序的 → 普通的。coordinate（协调）= co-（一起）+ ordin（顺序）+ -ate → 按相同顺序一起 → 协调。`,
    examples: [
      {
        word: 'order',
        breakdown: { prefix: '', root: 'ord', suffix: 'er' },
        meaning: '顺序',
        explanation: '顺序'
      },
      {
        word: 'ordinary',
        breakdown: { prefix: '', root: 'ordin', suffix: 'ary' },
        meaning: '普通的',
        explanation: '按顺序→普通的'
      },
      {
        word: 'subordinate',
        breakdown: { prefix: 'sub', root: 'ordin', suffix: 'ate' },
        meaning: '下级',
        explanation: '在下顺序→下级'
      },
      {
        word: 'extraordinary',
        breakdown: { prefix: 'extra', root: 'ordin', suffix: 'ary' },
        meaning: '非凡的',
        explanation: '超出顺序→非凡的'
      }
    ],
    quiz: {
    question: 'subordinate 的意思是什么？',
    options: ["非凡的", "普通的", "下级", "顺序"],
    correctAnswer: 2
  }
  },

  {
    id: 119,
    root: 'par/peer',
    origin: 'Latin',
    meaning: '相等',
    meaningEn: 'equal',
    description: `par/peer 代表「相等」。compare（比较）= com-（一起）+ par（相等）+ -e → 放在一起看是否相等 → 比较。peer（同辈）= peer（相等）→ 地位相等的人 → 同辈。parity（平等）= par（相等）+ -ity → 相等状态 → 平等。`,
    variants: ['pare'],
    commonPitfall: 'prepare 中的 pare 更接近“安排/整理”，不要机械理解为“提前相等”。',
    examples: [
      {
        word: 'compare',
        breakdown: { prefix: 'com', root: 'par', suffix: 'e' },
        meaning: '比较',
        explanation: '一起等→比较'
      },
      {
        word: 'prepare',
        breakdown: { prefix: 'pre', root: 'pare', suffix: '' },
        partMeanings: { prefix: '预先', root: '安排 / 备好' },
        meaning: '准备',
        explanation: '预先安排好→准备',
        literalMeaning: '提前备好',
        learningNote: '这个词保留在本卡作为近缘提醒；不要把 par=相等 套得过硬。',
      },
      {
        word: 'peer',
        breakdown: { prefix: '', root: 'peer', suffix: '' },
        meaning: '同伴',
        explanation: '地位相等的人→同伴',
        literalMeaning: '同等地位者',
        learningNote: 'peer 是自由词，重点记“同级/同辈”的相等感。',
      },
      {
        word: 'parity',
        breakdown: { prefix: '', root: 'par', suffix: 'ity' },
        meaning: '平等',
        explanation: '相等→平等'
      }
    ],
    quiz: {
    question: 'compare 的意思是什么？',
    options: ["比较", "同伴", "平等", "准备"],
    correctAnswer: 0
  }
  },

  {
    id: 120,
    root: 'part/port',
    origin: 'Latin',
    meaning: '部分',
    meaningEn: 'part',
    description: `part/port 代表「部分」。part（部分）直接使用。participate（参与）= part（部分）+ -icip（拿）+ -ate → 拿一部分 → 参与。portion（一份）= port（部分）+ -ion → 分出的一部分 → 一份。`,
    examples: [
      {
        word: 'partition',
        breakdown: { prefix: '', root: 'part', suffix: 'ition' },
        meaning: '分割',
        explanation: '分部分→分割'
      },
      {
        word: 'partial',
        breakdown: { prefix: '', root: 'part', suffix: 'ial' },
        meaning: '部分的',
        explanation: '部分的'
      },
      {
        word: 'participate',
        breakdown: { prefix: '', root: 'part', suffix: 'icipate' },
        meaning: '参与',
        explanation: '成为部分→参与'
      },
      {
        word: 'proportion',
        breakdown: { prefix: 'pro', root: 'port', suffix: 'ion' },
        meaning: '比例',
        explanation: '向前部分→比例'
      }
    ],
    quiz: {
    question: 'participate 的意思是什么？',
    options: ["比例", "部分的", "参与", "分割"],
    correctAnswer: 2
  }
  },

  {
    id: 121,
    root: 'pass',
    origin: 'Latin',
    meaning: '通过，走',
    meaningEn: 'pass',
    description: `pass 代表「通过、走」。passage（通道）= pass（通过）+ -age → 通过的地方 → 通道。passport（护照）= pass（通过）+ port（港口）→ 通过港口的文件 → 护照。surpass（超越）= sur-（超过）+ pass（走）→ 走过前面 → 超越。`,
    examples: [
      {
        word: 'passage',
        breakdown: { prefix: '', root: 'pass', suffix: 'age' },
        meaning: '通道',
        explanation: '通过→通道'
      },
      {
        word: 'passenger',
        breakdown: { prefix: '', root: 'pass', suffix: 'enger' },
        meaning: '乘客',
        explanation: '通过的人→乘客'
      },
      {
        word: 'surpass',
        breakdown: { prefix: 'sur', root: 'pass', suffix: '' },
        meaning: '超过',
        explanation: '在上通过→超过'
      },
      {
        word: 'compass',
        breakdown: { prefix: 'com', root: 'pass', suffix: '' },
        meaning: '罗盘',
        explanation: '一起走→罗盘'
      }
    ],
    quiz: {
    question: 'passenger 的意思是什么？',
    options: ["超过", "罗盘", "乘客", "通道"],
    correctAnswer: 2
  }
  },

  {
    id: 122,
    root: 'quest/quir/quis',
    origin: 'Latin',
    meaning: '寻求，问',
    meaningEn: 'seek, ask',
    description: `quest/quir/quis 代表「寻求、问」。question（问题）= quest（问）+ -ion → 提出来问的事情 → 问题。require（需要）= re-（回）+ quir（寻求）+ -e → 寻求得到 → 需要。acquire（获得）= ac-（朝向）+ quir（寻求）+ -e → 寻求到 → 获得。`,
    examples: [
      {
        word: 'question',
        breakdown: { prefix: '', root: 'quest', suffix: 'ion' },
        meaning: '问题',
        explanation: '问→问题'
      },
      {
        word: 'require',
        breakdown: { prefix: 're', root: 'quir', suffix: 'e' },
        meaning: '需要',
        explanation: '反复求→需要'
      },
      {
        word: 'acquire',
        breakdown: { prefix: 'ac', root: 'quir', suffix: 'e' },
        meaning: '获得',
        explanation: '朝目标寻求→获得'
      },
      {
        word: 'inquire',
        breakdown: { prefix: 'in', root: 'quir', suffix: 'e' },
        meaning: '询问',
        explanation: '向内问→询问'
      }
    ],
    quiz: {
    question: 'require 的意思是什么？',
    options: ["询问", "需要", "问题", "获得"],
    correctAnswer: 1
  }
  },

  {
    id: 123,
    root: 'reg/rect',
    origin: 'Latin',
    meaning: '统治，直',
    meaningEn: 'rule, straight',
    description: `reg/rect 代表「统治、直」。region（地区）= reg（统治）+ -ion → 统治的区域 → 地区。correct（正确的）= cor-（完全）+ rect（直）→ 完全笔直的 → 正确的。direct（直接的）= di-（分开）+ rect（直）→ 笔直分开 → 直接的。`,
    examples: [
      {
        word: 'regulate',
        breakdown: { prefix: '', root: 'reg', suffix: 'ulate' },
        meaning: '调节',
        explanation: '规则→调节'
      },
      {
        word: 'correct',
        breakdown: { prefix: 'cor', root: 'rect', suffix: '' },
        meaning: '正确',
        explanation: '一起直→正确'
      },
      {
        word: 'direct',
        breakdown: { prefix: 'di', root: 'rect', suffix: '' },
        meaning: '直接',
        explanation: '直的→直接'
      },
      {
        word: 'rectangle',
        breakdown: { prefix: '', root: 'rect', suffix: 'angle' },
        meaning: '矩形',
        explanation: '直角→矩形'
      }
    ],
    quiz: {
    question: 'regulate 的意思是什么？',
    options: ["直接", "正确", "调节", "矩形"],
    correctAnswer: 2
  }
  },

  {
    id: 124,
    root: 'sal/sult',
    origin: 'Latin',
    meaning: '跳',
    meaningEn: 'jump, leap',
    description: `sal/sult 代表「跳」。assault（攻击）= as-（朝向）+ sault（跳）→ 跳向敌人 → 攻击。result（结果）= re-（回）+ sult（跳）→ 跳回来的东西 → 结果。insult（侮辱）= in-（进入）+ sult（跳）→ 跳到脸上 → 侮辱。`,
    examples: [
      {
        word: 'salute',
        breakdown: { prefix: '', root: 'sal', suffix: 'ute' },
        meaning: '敬礼',
        explanation: '跳起→敬礼'
      },
      {
        word: 'assault',
        breakdown: { prefix: 'as', root: 'sault', suffix: '' },
        meaning: '攻击',
        explanation: '跳向→攻击'
      },
      {
        word: 'result',
        breakdown: { prefix: 're', root: 'sult', suffix: '' },
        meaning: '结果',
        explanation: '跳回→结果'
      },
      {
        word: 'insult',
        breakdown: { prefix: 'in', root: 'sult', suffix: '' },
        meaning: '侮辱',
        explanation: '跳上→侮辱'
      }
    ],
    quiz: {
    question: 'assault 的意思是什么？',
    options: ["敬礼", "攻击", "侮辱", "结果"],
    correctAnswer: 1
  }
  },

  {
    id: 125,
    root: 'serv',
    origin: 'Latin',
    meaning: '服务，保持',
    meaningEn: 'serve, keep',
    description: `serv 代表「服务、保持」。service（服务）= serv（服务）+ -ice → 服务。preserve（保存）= pre-（提前）+ serv（保持）+ -e → 提前保持住 → 保存。deserve（值得）= de-（完全）+ serv（服务）→ 完全为之服务 → 值得。`,
    examples: [
      {
        word: 'serve',
        breakdown: { prefix: '', root: 'serv', suffix: 'e' },
        meaning: '服务',
        explanation: '服务'
      },
      {
        word: 'reserve',
        breakdown: { prefix: 're', root: 'serv', suffix: 'e' },
        meaning: '保留',
        explanation: '保持→保留'
      },
      {
        word: 'preserve',
        breakdown: { prefix: 'pre', root: 'serv', suffix: 'e' },
        meaning: '保护',
        explanation: '提前保持→保护'
      },
      {
        word: 'deserve',
        breakdown: { prefix: 'de', root: 'serv', suffix: 'e' },
        meaning: '应得',
        explanation: '完全服务→应得'
      }
    ],
    quiz: {
    question: 'reserve 的意思是什么？',
    options: ["服务", "应得", "保留", "保护"],
    correctAnswer: 2
  }
  },

  {
    id: 126,
    root: 'sign',
    origin: 'Latin',
    meaning: '记号，信号',
    meaningEn: 'mark, sign',
    description: `sign 代表「记号、信号」。signal（信号）= sign（记号）+ -al → 标记 → 信号。significant（重要的）= sign（记号）+ -ificant（的）→ 有标志性的 → 重要的。assign（分配）= as-（朝向）+ sign（标记）→ 做标记分配 → 分配。`,
    examples: [
      {
        word: 'signal',
        breakdown: { prefix: '', root: 'sign', suffix: 'al' },
        meaning: '信号',
        explanation: '记号→信号'
      },
      {
        word: 'design',
        breakdown: { prefix: 'de', root: 'sign', suffix: '' },
        meaning: '设计',
        explanation: '做记号→设计'
      },
      {
        word: 'assign',
        breakdown: { prefix: 'as', root: 'sign', suffix: '' },
        meaning: '分配',
        explanation: '给对象做标记→分配'
      },
      {
        word: 'signature',
        breakdown: { prefix: '', root: 'sign', suffix: 'ature' },
        meaning: '签名',
        explanation: '记号→签名'
      }
    ],
    quiz: {
    question: 'assign 的意思是什么？',
    options: ["设计", "信号", "签名", "分配"],
    correctAnswer: 3
  }
  },

  {
    id: 127,
    root: 'simil/sembl',
    origin: 'Latin',
    meaning: '相似',
    meaningEn: 'like, similar',
    description: `simil/sembl 代表「相似」。similar（相似的）= simil（相似）+ -ar（的）→ 相似的。resemble（相像）= re-（回）+ sembl（相似）+ -e → 看起来相似 → 相像。assemble（集合）= as-（朝向）+ sembl（一起）+ -e → 聚到一起 → 集合。`,
    examples: [
      {
        word: 'similar',
        breakdown: { prefix: '', root: 'simil', suffix: 'ar' },
        meaning: '相似的',
        explanation: '相似的'
      },
      {
        word: 'resemble',
        breakdown: { prefix: 're', root: 'sembl', suffix: 'e' },
        meaning: '像',
        explanation: '再相似→像'
      },
      {
        word: 'assemble',
        breakdown: { prefix: 'as', root: 'sembl', suffix: 'e' },
        meaning: '集合',
        explanation: '使变得相似→集合'
      },
      {
        word: 'dissemble',
        breakdown: { prefix: 'dis', root: 'sembl', suffix: 'e' },
        meaning: '掩饰',
        explanation: '不相似→掩饰'
      }
    ],
    quiz: {
    question: 'similar 的意思是什么？',
    options: ["掩饰", "集合", "像", "相似的"],
    correctAnswer: 3
  }
  },

  {
    id: 128,
    root: 'sol/soli',
    origin: 'Latin',
    meaning: '单独',
    meaningEn: 'alone',
    description: `sol/soli 代表「单独」。sole（唯一的）= sol（单独）+ -e → 单独一个 → 唯一的。solitary（孤独的）= soli（单独）+ -ary（的）→ 单独的 → 孤独的。desolate（荒凉的）= de-（完全）+ sol（单独）+ -ate → 完全单独 → 荒凉的。`,
    examples: [
      {
        word: 'solo',
        breakdown: { prefix: '', root: 'sol', suffix: 'o' },
        meaning: '独奏',
        explanation: '单独→独奏'
      },
      {
        word: 'solitary',
        breakdown: { prefix: '', root: 'soli', suffix: 'tary' },
        meaning: '孤独的',
        explanation: '单独的→孤独的'
      },
      {
        word: 'sole',
        breakdown: { prefix: '', root: 'sol', suffix: 'e' },
        meaning: '唯一的',
        explanation: '单独一个→唯一的'
      },
      {
        word: 'desolate',
        breakdown: { prefix: 'de', root: 'sol', suffix: 'ate' },
        meaning: '荒凉的',
        explanation: '完全单独→荒凉的'
      }
    ],
    quiz: {
    question: 'solitary 的意思是什么？',
    options: ["唯一的", "荒凉的", "孤独的", "独奏"],
    correctAnswer: 2
  }
  },

  {
    id: 129,
    root: 'spir',
    origin: 'Latin',
    meaning: '呼吸，精神',
    meaningEn: 'breathe, spirit',
    description: `spir 代表「呼吸、精神」。spirit（精神）= spir（呼吸）+ -it → 呼吸 → 精神（古人认为呼吸是生命和精神的象征）。inspire（激励）= in-（进入）+ spir（呼吸）+ -e → 吹气进去 → 激励。expire（到期）= ex-（向外）+ spir（呼吸）+ -e → 呼出最后一口气 → 到期。`,
    examples: [
      {
        word: 'spirit',
        breakdown: { prefix: '', root: 'spir', suffix: 'it' },
        meaning: '精神',
        explanation: '呼吸→精神'
      },
      {
        word: 'inspire',
        breakdown: { prefix: 'in', root: 'spir', suffix: 'e' },
        meaning: '激励',
        explanation: '向内呼吸→激励'
      },
      {
        word: 'expire',
        breakdown: { prefix: 'ex', root: 'spir', suffix: 'e' },
        meaning: '到期',
        explanation: '向外呼吸→到期'
      },
      {
        word: 'conspire',
        breakdown: { prefix: 'con', root: 'spir', suffix: 'e' },
        meaning: '密谋',
        explanation: '一起呼吸→密谋'
      }
    ],
    quiz: {
    question: 'conspire 的意思是什么？',
    options: ["密谋", "精神", "激励", "到期"],
    correctAnswer: 0
  }
  },

  {
    id: 130,
    root: 'tang/tact/ting',
    origin: 'Latin',
    meaning: '触摸',
    meaningEn: 'touch',
    description: `tang/tact/ting 代表「触摸」。tangible（有形的）= tang（触摸）+ -ible（能...的）→ 能触摸到的 → 有形的。contact（接触）= con-（一起）+ tact（触摸）→ 一起触摸 → 接触。intact（完整的）= in-（不）+ tact（触摸）→ 没被触碰过的 → 完整的。`,
    examples: [
      {
        word: 'tangible',
        breakdown: { prefix: '', root: 'tang', suffix: 'ible' },
        meaning: '有形的',
        explanation: '能触摸→有形的'
      },
      {
        word: 'contact',
        breakdown: { prefix: 'con', root: 'tact', suffix: '' },
        meaning: '接触',
        explanation: '一起触→接触'
      },
      {
        word: 'intact',
        breakdown: { prefix: 'in', root: 'tact', suffix: '' },
        meaning: '完整的',
        explanation: '不触→完整的'
      },
      {
        word: 'distinguish',
        breakdown: { prefix: 'dis', root: 'ting', suffix: 'uish' },
        meaning: '区分',
        explanation: '分开触→区分'
      }
    ],
    quiz: {
    question: 'intact 的意思是什么？',
    options: ["接触", "有形的", "区分", "完整的"],
    correctAnswer: 3
  }
  },

  {
    id: 131,
    root: '-able/-ible',
    origin: 'Latin',
    meaning: '可以...的',
    meaningEn: 'capable of',
    description: `-able/-ible 是最常见的形容词后缀，代表「能...的、可...的」。readable = read（读）+ -able → 可读的。visible = vis（看）+ -ible → 可见的。注意：-able 用于完整单词后，-ible 多用于词根后。`,
    examples: [
      {
        word: 'readable',
        breakdown: { prefix: '', root: 'read', suffix: 'able' },
        meaning: '可读的',
        explanation: '能读→可读的'
      },
      {
        word: 'visible',
        breakdown: { prefix: '', root: 'vis', suffix: 'ible' },
        meaning: '可见的',
        explanation: '能看→可见的'
      },
      {
        word: 'comfortable',
        breakdown: { prefix: 'com', root: 'fort', suffix: 'able' },
        meaning: '舒适的',
        explanation: '能使舒服→舒适的'
      },
      {
        word: 'flexible',
        breakdown: { prefix: '', root: 'flex', suffix: 'ible' },
        meaning: '灵活的',
        explanation: '能弯→灵活的'
      }
    ],
    quiz: {
    question: 'readable 的意思是什么？',
    options: ["灵活的", "可读的", "舒适的", "可见的"],
    correctAnswer: 1
  }
  },

  {
    id: 132,
    root: '-al/-ial',
    origin: 'Latin',
    meaning: '变成形容词',
    meaningEn: 'of, relating to',
    description: `-al/-ial 是形容词后缀，代表「...的、关于...的」。national = nation（国家）+ -al → 国家的。social = soci（社会）+ -al → 社会的。encial = essence（本质）+ -ial → 本质的。`,
    memoryHint: '-al/-ial 不是给词义“加料”，主要负责把名词/词根变成“与……有关的”形容词。',
    commonPitfall: 'natural/social/material/special 这类词如果只写“自然的→自然的”，学习价值很低；要看词根义和后缀功能。',
    examples: [
      {
        word: 'natural',
        breakdown: { prefix: '', root: 'natur', suffix: 'al' },
        partMeanings: { root: '自然 / 出生', suffix: '与……有关的' },
        meaning: '自然的',
        explanation: '与自然有关→自然的',
        literalMeaning: '关于自然的',
      },
      {
        word: 'social',
        breakdown: { prefix: '', root: 'soci', suffix: 'al' },
        partMeanings: { root: '同伴 / 社会', suffix: '与……有关的' },
        meaning: '社会的',
        explanation: '与社会或群体有关→社会的',
        literalMeaning: '关于社会关系的',
      },
      {
        word: 'material',
        breakdown: { prefix: '', root: 'mater', suffix: 'ial' },
        partMeanings: { root: '物质 / 材料', suffix: '与……有关的' },
        meaning: '物质的',
        explanation: '与材料或物质有关→物质的',
        literalMeaning: '关于物质材料的',
      },
      {
        word: 'special',
        breakdown: { prefix: '', root: 'spec', suffix: 'ial' },
        partMeanings: { root: '种类 / 看', suffix: '与……有关的' },
        meaning: '特殊的',
        explanation: '归为特定一类→特殊的',
        literalMeaning: '属于特定类别的',
        learningNote: 'special 的 spec 与“看/种类”语义有历史分化，适合建立联想，不要逐字硬译。',
      }
    ],
    quiz: {
    question: 'natural 的意思是什么？',
    options: ["特殊的", "社会的", "物质的", "自然的"],
    correctAnswer: 3
  }
  },

  {
    id: 133,
    root: '-ance/-ence',
    origin: 'Latin',
    meaning: '变成名词',
    meaningEn: 'state, quality',
    description: `-ance/-ence 是名词后缀，代表「状态、性质、行为」。importance = import（重要）+ -ance → 重要性。confidence = confid（信任）+ -ence → 信心。-ance 和 -ence 的区别主要看前面的词根。`,
    examples: [
      {
        word: 'importance',
        breakdown: { prefix: 'im', root: 'port', suffix: 'ance' },
        meaning: '重要性',
        explanation: '重要状态→重要性'
      },
      {
        word: 'difference',
        breakdown: { prefix: 'dif', root: 'fer', suffix: 'ence' },
        meaning: '差异',
        explanation: '不同状态→差异'
      },
      {
        word: 'performance',
        breakdown: { prefix: 'per', root: 'form', suffix: 'ance' },
        meaning: '表演',
        explanation: '表演状态→表演'
      },
      {
        word: 'confidence',
        breakdown: { prefix: 'con', root: 'fid', suffix: 'ence' },
        meaning: '信心',
        explanation: '信任状态→信心'
      }
    ],
    quiz: {
    question: 'difference 的意思是什么？',
    options: ["重要性", "信心", "差异", "表演"],
    correctAnswer: 2
  }
  },

  {
    id: 134,
    root: '-ant/-ent',
    origin: 'Latin',
    meaning: '变成形容词 / 人',
    meaningEn: 'doing, person',
    description: `-ant/-ent 既可作形容词（...的），也可作名词（...人/物）。important（重要的）、assistant（助手）用 -ant。different（不同的）、student（学生）用 -ent。`,
    examples: [
      {
        word: 'important',
        breakdown: { prefix: 'im', root: 'port', suffix: 'ant' },
        meaning: '重要的',
        explanation: '重要的'
      },
      {
        word: 'student',
        breakdown: { prefix: '', root: 'stud', suffix: 'ent' },
        meaning: '学生',
        explanation: '学习的人→学生'
      },
      {
        word: 'pleasant',
        breakdown: { prefix: '', root: 'pleas', suffix: 'ant' },
        meaning: '愉快的',
        explanation: '愉快的'
      },
      {
        word: 'evident',
        breakdown: { prefix: 'e', root: 'vid', suffix: 'ent' },
        meaning: '明显的',
        explanation: '能看见的→明显的'
      }
    ],
    quiz: {
    question: 'pleasant 的意思是什么？',
    options: ["明显的", "学生", "愉快的", "重要的"],
    correctAnswer: 2
  }
  },

  {
    id: 135,
    root: '-ate',
    origin: 'Latin',
    meaning: '变成动词',
    meaningEn: 'make, do',
    description: `-ate 是动词后缀，代表「使、做」。activate = activ（活）+ -ate → 使活跃。educate = educ（引出）+ -ate → 引出知识 → 教育。也可作形容词/名词后缀。`,
    examples: [
      {
        word: 'create',
        breakdown: { prefix: '', root: 'cre', suffix: 'ate' },
        meaning: '创造',
        explanation: '使生长→创造'
      },
      {
        word: 'educate',
        breakdown: { prefix: 'e', root: 'duc', suffix: 'ate' },
        meaning: '教育',
        explanation: '引导出→教育'
      },
      {
        word: 'activate',
        breakdown: { prefix: '', root: 'act', suffix: 'ivate' },
        meaning: '激活',
        explanation: '使行动→激活'
      },
      {
        word: 'separate',
        breakdown: { prefix: 'se', root: 'par', suffix: 'ate' },
        meaning: '分离',
        explanation: '使分开→分离'
      }
    ],
    quiz: {
    question: 'activate 的意思是什么？',
    options: ["创造", "分离", "激活", "教育"],
    correctAnswer: 2
  }
  },

  {
    id: 136,
    root: '-ful',
    origin: 'Old English',
    meaning: '充满...的',
    meaningEn: 'full of',
    description: `-ful 是形容词后缀，代表「充满...的」。beautiful = beauty（美）+ -ful → 充满美的 → 美丽的。careful = care（关心）+ -ful → 充满关心的 → 小心的。注意：只有一个 l。`,
    examples: [
      {
        word: 'beautiful',
        breakdown: { prefix: '', root: 'beaut', suffix: 'iful' },
        meaning: '美丽的',
        explanation: '充满美→美丽的'
      },
      {
        word: 'careful',
        breakdown: { prefix: '', root: 'care', suffix: 'ful' },
        meaning: '小心的',
        explanation: '充满关心→小心的'
      },
      {
        word: 'powerful',
        breakdown: { prefix: '', root: 'power', suffix: 'ful' },
        meaning: '强大的',
        explanation: '充满力量→强大的'
      },
      {
        word: 'successful',
        breakdown: { prefix: 'suc', root: 'cess', suffix: 'ful' },
        meaning: '成功的',
        explanation: '充满成功→成功的'
      }
    ],
    quiz: {
    question: 'careful 的意思是什么？',
    options: ["强大的", "成功的", "美丽的", "小心的"],
    correctAnswer: 3
  }
  },

  {
    id: 137,
    root: '-ify/-fy',
    origin: 'Latin',
    meaning: '变成动词',
    meaningEn: 'make',
    description: `-ify/-fy 是动词后缀，代表「使、做」。simplify = simpl（简单）+ -ify → 使简单化。clarify = clar（清楚）+ -ify → 使清楚 → 澄清。satisfy = satis（足够）+ -fy → 使满足。`,
    examples: [
      {
        word: 'simplify',
        breakdown: { prefix: '', root: 'simpl', suffix: 'ify' },
        meaning: '简化',
        explanation: '使简单→简化'
      },
      {
        word: 'classify',
        breakdown: { prefix: '', root: 'class', suffix: 'ify' },
        meaning: '分类',
        explanation: '使成类→分类'
      },
      {
        word: 'identify',
        breakdown: { prefix: '', root: 'ident', suffix: 'ify' },
        meaning: '识别',
        explanation: '使相同→识别'
      },
      {
        word: 'satisfy',
        breakdown: { prefix: '', root: 'satis', suffix: 'fy' },
        meaning: '满足',
        explanation: '使满→满足'
      }
    ],
    quiz: {
    question: 'identify 的意思是什么？',
    options: ["简化", "满足", "识别", "分类"],
    correctAnswer: 2
  }
  },

  {
    id: 138,
    root: '-ing',
    origin: 'Old English',
    meaning: '进行中 / 变名词',
    meaningEn: 'action, process',
    description: `-ing 是最常用的后缀之一：①现在分词（running）②动名词（swimming）③形容词（interesting）。understanding = under（理解）+ stand（站）+ -ing → 理解。`,
    examples: [
      {
        word: 'learning',
        breakdown: { prefix: '', root: 'learn', suffix: 'ing' },
        meaning: '学习',
        explanation: '学习过程→学习'
      },
      {
        word: 'thinking',
        breakdown: { prefix: '', root: 'think', suffix: 'ing' },
        meaning: '思考',
        explanation: '思考行为→思考'
      },
      {
        word: 'building',
        breakdown: { prefix: '', root: 'build', suffix: 'ing' },
        meaning: '建筑',
        explanation: '建造过程→建筑'
      },
      {
        word: 'swimming',
        breakdown: { prefix: '', root: 'swim', suffix: 'ing' },
        meaning: '游泳',
        explanation: '游泳行为→游泳'
      }
    ],
    quiz: {
    question: 'swimming 的意思是什么？',
    options: ["建筑", "思考", "学习", "游泳"],
    correctAnswer: 3
  }
  },

  {
    id: 139,
    root: '-ion/-tion/-ation',
    origin: 'Latin',
    meaning: '变成名词',
    meaningEn: 'act, state, result',
    description: `-ion/-tion/-ation 是名词后缀，代表「行为、状态、结果」。action、education、creation。-tion 是最常见的形式，-ation 用于 -ate 动词后。`,
    examples: [
      {
        word: 'action',
        breakdown: { prefix: '', root: 'act', suffix: 'ion' },
        meaning: '行动',
        explanation: '行动'
      },
      {
        word: 'creation',
        breakdown: { prefix: '', root: 'cre', suffix: 'ation' },
        meaning: '创造',
        explanation: '创造行为→创造'
      },
      {
        word: 'education',
        breakdown: { prefix: 'e', root: 'duc', suffix: 'ation' },
        meaning: '教育',
        explanation: '教育行为→教育'
      },
      {
        word: 'attention',
        breakdown: { prefix: 'at', root: 'tent', suffix: 'ion' },
        meaning: '注意',
        explanation: '注意状态→注意'
      }
    ],
    quiz: {
    question: 'action 的意思是什么？',
    options: ["行动", "创造", "注意", "教育"],
    correctAnswer: 0
  }
  },

  {
    id: 140,
    root: '-ism',
    origin: 'Greek/Latin',
    meaning: '主义 / 思想',
    meaningEn: 'doctrine, practice, state',
    description: `-ism 是名词后缀，代表「主义、行为、状态、学说」。capitalism（资本主义）、heroism（英雄主义）、tourism（旅游业）。常见于表示信仰、理论、制度的词。`,
    examples: [
      {
        word: 'socialism',
        breakdown: { prefix: '', root: 'social', suffix: 'ism' },
        meaning: '社会主义',
        explanation: '社会主义'
      },
      {
        word: 'realism',
        breakdown: { prefix: '', root: 'real', suffix: 'ism' },
        meaning: '现实主义',
        explanation: '现实主义'
      },
      {
        word: 'criticism',
        breakdown: { prefix: '', root: 'critic', suffix: 'ism' },
        meaning: '批评',
        explanation: '批评行为→批评'
      },
      {
        word: 'optimism',
        breakdown: { prefix: '', root: 'optim', suffix: 'ism' },
        meaning: '乐观主义',
        explanation: '乐观主义'
      }
    ],
    quiz: {
    question: 'socialism 的意思是什么？',
    options: ["社会主义", "现实主义", "乐观主义", "批评"],
    correctAnswer: 0
  }
  },

  {
    id: 141,
    root: '-ist',
    origin: 'Greek/Latin',
    meaning: '做这事的人',
    meaningEn: 'person who',
    description: `-ist 是名词后缀，代表「...的人、...家」。artist（艺术家）、scientist（科学家）、pianist（钢琴家）。通常和 -ism 配对使用。`,
    examples: [
      {
        word: 'artist',
        breakdown: { prefix: '', root: 'art', suffix: 'ist' },
        meaning: '艺术家',
        explanation: '艺术的人→艺术家'
      },
      {
        word: 'scientist',
        breakdown: { prefix: '', root: 'scien', suffix: 'tist' },
        meaning: '科学家',
        explanation: '科学的人→科学家'
      },
      {
        word: 'pianist',
        breakdown: { prefix: '', root: 'pian', suffix: 'ist' },
        meaning: '钢琴家',
        explanation: '钢琴的人→钢琴家'
      },
      {
        word: 'journalist',
        breakdown: { prefix: '', root: 'journal', suffix: 'ist' },
        meaning: '记者',
        explanation: '日记的人→记者'
      }
    ],
    quiz: {
    question: 'journalist 的意思是什么？',
    options: ["记者", "艺术家", "钢琴家", "科学家"],
    correctAnswer: 0
  }
  },

  {
    id: 142,
    root: '-ity/-ty',
    origin: 'Latin',
    meaning: '变成名词',
    meaningEn: 'quality, state',
    description: `-ity/-ty 是名词后缀，代表「性质、状态」。ability = abl（能）+ -ity → 能力。quality = qual（质量）+ -ity → 质量。safety = safe（安全）+ -ty → 安全。`,
    examples: [
      {
        word: 'ability',
        breakdown: { prefix: '', root: 'abil', suffix: 'ity' },
        meaning: '能力',
        explanation: '能的性质→能力'
      },
      {
        word: 'reality',
        breakdown: { prefix: '', root: 'real', suffix: 'ity' },
        meaning: '现实',
        explanation: '真实性质→现实'
      },
      {
        word: 'quality',
        breakdown: { prefix: '', root: 'qual', suffix: 'ity' },
        meaning: '质量',
        explanation: '质的性质→质量'
      },
      {
        word: 'safety',
        breakdown: { prefix: '', root: 'safe', suffix: 'ty' },
        meaning: '安全',
        explanation: '安全状态→安全'
      }
    ],
    quiz: {
    question: 'reality 的意思是什么？',
    options: ["质量", "安全", "现实", "能力"],
    correctAnswer: 2
  }
  },

  {
    id: 143,
    root: '-ive',
    origin: 'Latin',
    meaning: '变成形容词',
    meaningEn: 'having the nature of',
    description: `-ive 是形容词后缀，代表「...的、有...性质的」。active（活跃的）、creative（创造性的）、effective（有效的）。也可作名词（detective侦探）。`,
    examples: [
      {
        word: 'active',
        breakdown: { prefix: '', root: 'act', suffix: 'ive' },
        meaning: '活跃的',
        explanation: '行动的→活跃的'
      },
      {
        word: 'creative',
        breakdown: { prefix: '', root: 'cre', suffix: 'ative' },
        meaning: '创造性的',
        explanation: '创造性的'
      },
      {
        word: 'effective',
        breakdown: { prefix: 'ef', root: 'fect', suffix: 'ive' },
        meaning: '有效的',
        explanation: '有效果的→有效的'
      },
      {
        word: 'positive',
        breakdown: { prefix: '', root: 'posit', suffix: 'ive' },
        meaning: '积极的',
        explanation: '放置的→积极的'
      }
    ],
    quiz: {
    question: 'positive 的意思是什么？',
    options: ["下方", "有效的", "积极的", "创造性的"],
    correctAnswer: 2
  }
  },

  {
    id: 144,
    root: '-ize/-ise',
    origin: 'Greek/Latin',
    meaning: '变成动词',
    meaningEn: 'make, cause to be',
    description: `-ize/-ise 是动词后缀，代表「使成为、变成」。realize = real（真实）+ -ize → 使变真实 → 实现。organize = organ（器官/结构）+ -ize → 使有组织 → 组织。`,
    examples: [
      {
        word: 'realize',
        breakdown: { prefix: '', root: 'real', suffix: 'ize' },
        meaning: '实现',
        explanation: '使真实→实现'
      },
      {
        word: 'organize',
        breakdown: { prefix: '', root: 'organ', suffix: 'ize' },
        meaning: '组织',
        explanation: '使有机→组织'
      },
      {
        word: 'modernize',
        breakdown: { prefix: '', root: 'modern', suffix: 'ize' },
        meaning: '现代化',
        explanation: '使现代→现代化'
      },
      {
        word: 'recognize',
        breakdown: { prefix: 're', root: 'cogn', suffix: 'ize' },
        meaning: '认出',
        explanation: '再知→认出'
      }
    ],
    quiz: {
    question: 'organize 的意思是什么？',
    options: ["实现", "组织", "现代化", "认出"],
    correctAnswer: 1
  }
  },

  {
    id: 145,
    root: '-less',
    origin: 'Old English',
    meaning: '没有...的',
    meaningEn: 'without',
    description: `-less 是形容词后缀，代表「没有...的、缺乏...的」。homeless = home（家）+ -less → 没有家的。hopeless = hope（希望）+ -less → 没有希望的。和 -ful 相反。`,
    examples: [
      {
        word: 'hopeless',
        breakdown: { prefix: '', root: 'hope', suffix: 'less' },
        meaning: '绝望的',
        explanation: '无希望→绝望的'
      },
      {
        word: 'careless',
        breakdown: { prefix: '', root: 'care', suffix: 'less' },
        meaning: '粗心的',
        explanation: '无关心→粗心的'
      },
      {
        word: 'endless',
        breakdown: { prefix: '', root: 'end', suffix: 'less' },
        meaning: '无尽的',
        explanation: '无终点→无尽的'
      },
      {
        word: 'wireless',
        breakdown: { prefix: '', root: 'wire', suffix: 'less' },
        meaning: '无线的',
        explanation: '无线→无线的'
      }
    ],
    quiz: {
    question: 'hopeless 的意思是什么？',
    options: ["绝望的", "无尽的", "无线的", "粗心的"],
    correctAnswer: 0
  }
  },

  {
    id: 146,
    root: '-ly',
    origin: 'Old English',
    meaning: '变成副词',
    meaningEn: 'in a manner',
    description: `-ly 是副词后缀，也偶尔变成形容词。quickly = quick（快）+ -ly → 快速地。friendly = friend（朋友）+ -ly → 友好的。`,
    examples: [
      {
        word: 'quickly',
        breakdown: { prefix: '', root: 'quick', suffix: 'ly' },
        meaning: '快速地',
        explanation: '快速方式→快速地'
      },
      {
        word: 'carefully',
        breakdown: { prefix: '', root: 'careful', suffix: 'ly' },
        meaning: '小心地',
        explanation: '小心方式→小心地'
      },
      {
        word: 'friendly',
        breakdown: { prefix: '', root: 'friend', suffix: 'ly' },
        meaning: '友好的',
        explanation: '朋友的→友好的'
      },
      {
        word: 'slowly',
        breakdown: { prefix: '', root: 'slow', suffix: 'ly' },
        meaning: '慢慢地',
        explanation: '慢方式→慢慢地'
      }
    ],
    quiz: {
    question: 'slowly 的意思是什么？',
    options: ["小心地", "友好的", "慢慢地", "快速地"],
    correctAnswer: 2
  }
  },

  {
    id: 147,
    root: '-ment',
    origin: 'Latin',
    meaning: '变成名词',
    meaningEn: 'act, result, means',
    description: `-ment 是名词后缀，代表「行为、结果、手段」。movement = move（移动）+ -ment → 运动。development = develop（发展）+ -ment → 发展的过程或结果。`,
    examples: [
      {
        word: 'movement',
        breakdown: { prefix: '', root: 'move', suffix: 'ment' },
        meaning: '运动',
        explanation: '移动行为→运动'
      },
      {
        word: 'development',
        breakdown: { prefix: 'de', root: 'velop', suffix: 'ment' },
        meaning: '发展',
        explanation: '发展过程→发展'
      },
      {
        word: 'agreement',
        breakdown: { prefix: 'a', root: 'gree', suffix: 'ment' },
        meaning: '协议',
        explanation: '同意结果→协议'
      },
      {
        word: 'treatment',
        breakdown: { prefix: '', root: 'treat', suffix: 'ment' },
        meaning: '治疗',
        explanation: '对待行为→治疗'
      }
    ],
    quiz: {
    question: 'agreement 的意思是什么？',
    options: ["发展", "协议", "运动", "治疗"],
    correctAnswer: 1
  }
  },

  {
    id: 148,
    root: '-ness',
    origin: 'Old English',
    meaning: '状态，性质',
    meaningEn: 'state, quality',
    description: `-ness 是名词后缀，代表「状态、性质」。happiness = happy（快乐）+ -ness → 快乐的状态。kindness = kind（善良）+ -ness → 善良。最简单的名词化后缀之一。`,
    examples: [
      {
        word: 'happiness',
        breakdown: { prefix: '', root: 'happy', suffix: 'ness' },
        meaning: '幸福',
        explanation: '快乐状态→幸福'
      },
      {
        word: 'kindness',
        breakdown: { prefix: '', root: 'kind', suffix: 'ness' },
        meaning: '善良',
        explanation: '善良性质→善良'
      },
      {
        word: 'darkness',
        breakdown: { prefix: '', root: 'dark', suffix: 'ness' },
        meaning: '黑暗',
        explanation: '黑暗状态→黑暗'
      },
      {
        word: 'weakness',
        breakdown: { prefix: '', root: 'weak', suffix: 'ness' },
        meaning: '虚弱',
        explanation: '虚弱状态→虚弱'
      }
    ],
    quiz: {
    question: 'darkness 的意思是什么？',
    options: ["黑暗", "善良", "幸福", "虚弱"],
    correctAnswer: 0
  }
  },

  {
    id: 149,
    root: '-ous/-ious',
    origin: 'Latin',
    meaning: '变成形容词',
    meaningEn: 'full of, having',
    description: `-ous/-ious 是形容词后缀，代表「充满...的、有...性质的」。famous（著名的）、dangerous（危险的）、curious（好奇的）。-ious 常用于词根或以 i 结尾的词后。`,
    examples: [
      {
        word: 'famous',
        breakdown: { prefix: '', root: 'fam', suffix: 'ous' },
        meaning: '著名的',
        explanation: '充满名声→著名的'
      },
      {
        word: 'dangerous',
        breakdown: { prefix: '', root: 'danger', suffix: 'ous' },
        meaning: '危险的',
        explanation: '充满危险→危险的'
      },
      {
        word: 'curious',
        breakdown: { prefix: '', root: 'cur', suffix: 'ious' },
        meaning: '好奇的',
        explanation: '充满好奇→好奇的'
      },
      {
        word: 'previous',
        breakdown: { prefix: 'pre', root: 'vi', suffix: 'ous' },
        meaning: '先前的',
        explanation: '在前的→先前的'
      }
    ],
    quiz: {
    question: 'curious 的意思是什么？',
    options: ["先前的", "著名的", "好奇的", "危险的"],
    correctAnswer: 2
  }
  },

  {
    id: 150,
    root: '-ure',
    origin: 'Latin',
    meaning: '变成名词',
    meaningEn: 'act, result, state',
    description: `-ure 是名词后缀，代表「行为、结果、状态」。pleasure（快乐）、pressure（压力）、failure（失败）。常用于拉丁词根后。`,
    examples: [
      {
        word: 'failure',
        breakdown: { prefix: '', root: 'fail', suffix: 'ure' },
        meaning: '失败',
        explanation: '失败行为→失败'
      },
      {
        word: 'pleasure',
        breakdown: { prefix: '', root: 'pleas', suffix: 'ure' },
        meaning: '快乐',
        explanation: '快乐状态→快乐'
      },
      {
        word: 'capture',
        breakdown: { prefix: '', root: 'capt', suffix: 'ure' },
        meaning: '捕获',
        explanation: '捕获行为→捕获'
      },
      {
        word: 'pressure',
        breakdown: { prefix: '', root: 'press', suffix: 'ure' },
        meaning: '压力',
        explanation: '压的状态→压力'
      }
    ],
    quiz: {
    question: 'failure 的意思是什么？',
    options: ["捕获", "压力", "失败", "快乐"],
    correctAnswer: 2
  }
  },

  {
    id: 151,
    root: 'cre/cresc',
    origin: 'Latin',
    meaning: '生长',
    meaningEn: 'grow',
    description: `cre/cresc 来自拉丁语「生长」。想象植物的「逐渐生长(crescendo)」过程。concrete（混凝土）= con-（一起）+ cre（生长）→ 长在一起/凝结成块的东西 → 具体的。create（创造）= cre（生长）+ -ate → 让东西生长出来 → 创造。记住：increase = in-（向内）+ crease（生长）→ 向内生长 → 增加。`,
    memoryHint: 'cre/cresc 的核心画面是“长出来、变多、形成”。',
    examples: [
      {
        word: 'create',
        breakdown: { prefix: '', root: 'cre', suffix: 'ate' },
        partMeanings: { root: '生长 / 产生', suffix: '变成动词' },
        meaning: '创造',
        explanation: '让新事物生长出来→创造',
        literalMeaning: '使其产生',
      },
      {
        word: 'increase',
        breakdown: { prefix: 'in', root: 'cre', suffix: 'ase' },
        partMeanings: { prefix: '向内 / 进入', root: '生长' },
        meaning: '增加',
        explanation: '数量继续生长→增加',
        literalMeaning: '生长变多',
      },
      {
        word: 'decrease',
        breakdown: { prefix: 'de', root: 'cre', suffix: 'ase' },
        partMeanings: { prefix: '向下', root: '生长 / 数量' },
        meaning: '减少',
        explanation: '数量往下变化→减少',
        literalMeaning: '数量下降',
      },
      {
        word: 'concrete',
        breakdown: { prefix: 'con', root: 'cre', suffix: 'te' },
        partMeanings: { prefix: '一起', root: '生长 / 凝结' },
        meaning: '具体的',
        explanation: '凝结成可感知的整体→具体的',
        literalMeaning: '长合在一起',
      }
    ],
    quiz: {
    question: 'decrease 的意思是什么？',
    options: ["减少", "具体的", "创造", "增加"],
    correctAnswer: 0
  }
  },

  {
    id: 152,
    root: 'cred',
    origin: 'Latin',
    meaning: '相信',
    meaningEn: 'believe',
    description: `cred 来自拉丁语「相信」。credit（信用）= cred（相信）+ -it → 被相信的能力 → 信用。incredible（难以置信的）= in-（不）+ cred（相信）+ -ible → 不能相信的 → 难以置信的。credentials（证书）= cred（相信）+ -entials → 让人相信的凭证。`,
    examples: [
      {
        word: 'credit',
        breakdown: { prefix: '', root: 'cred', suffix: 'it' },
        meaning: '信用',
        explanation: '相信→信用'
      },
      {
        word: 'incredible',
        breakdown: { prefix: 'in', root: 'cred', suffix: 'ible' },
        meaning: '难以置信',
        explanation: '不能信→难以置信'
      },
      {
        word: 'credible',
        breakdown: { prefix: '', root: 'cred', suffix: 'ible' },
        meaning: '可信的',
        explanation: '能信→可信的'
      },
      {
        word: 'credential',
        breakdown: { prefix: '', root: 'cred', suffix: 'ential' },
        meaning: '证书',
        explanation: '信用→证书'
      }
    ],
    quiz: {
    question: 'credential 的意思是什么？',
    options: ["信用", "可信的", "证书", "难以置信"],
    correctAnswer: 2
  }
  },

  {
    id: 153,
    root: 'don/dot',
    origin: 'Latin',
    meaning: '给',
    meaningEn: 'give',
    description: `don/dot 代表「给予」。donate（捐赠）= don（给）+ -ate → 给出去 → 捐赠。pardon（原谅）= par-（完全）+ don（给）→ 完全给予（宽恕）→ 原谅。antidote（解毒剂）= anti-（对抗）+ dot（给）→ 给出对抗物 → 解毒剂。记住：gift 和 give 都与 don 同源。`,
    examples: [
      {
        word: 'donate',
        breakdown: { prefix: '', root: 'don', suffix: 'ate' },
        meaning: '捐赠',
        explanation: '给→捐赠'
      },
      {
        word: 'pardon',
        breakdown: { prefix: 'par', root: 'don', suffix: '' },
        meaning: '原谅',
        explanation: '完全给→原谅'
      },
      {
        word: 'anecdote',
        breakdown: { prefix: 'anec', root: 'dot', suffix: 'e' },
        meaning: '轶事',
        explanation: '不公开给→轶事'
      },
      {
        word: 'antidote',
        breakdown: { prefix: 'anti', root: 'dot', suffix: 'e' },
        meaning: '解药',
        explanation: '反给→解药'
      }
    ],
    quiz: {
    question: 'antidote 的意思是什么？',
    options: ["轶事", "解药", "捐赠", "原谅"],
    correctAnswer: 1
  }
  },

  {
    id: 154,
    root: 'equ',
    origin: 'Latin',
    meaning: '相等',
    meaningEn: 'equal',
    description: `equ 代表「相等」。equal（相等的）、equation（方程式）= equ（相等）+ -ation → 相等的式子。adequate（足够的）= ad-（向）+ equ（相等）+ -ate → 达到相等水平 → 足够的。equity（公平）= equ（相等）+ -ity → 相等的状态 → 公平。`,
    examples: [
      {
        word: 'equal',
        breakdown: { prefix: '', root: 'equ', suffix: 'al' },
        meaning: '相等',
        explanation: '相等'
      },
      {
        word: 'equation',
        breakdown: { prefix: '', root: 'equ', suffix: 'ation' },
        meaning: '方程',
        explanation: '相等→方程'
      },
      {
        word: 'adequate',
        breakdown: { prefix: 'ad', root: 'equ', suffix: 'ate' },
        meaning: '足够的',
        explanation: '达到相等水平→足够的'
      },
      {
        word: 'equity',
        breakdown: { prefix: '', root: 'equ', suffix: 'ity' },
        meaning: '公平',
        explanation: '相等→公平'
      }
    ],
    quiz: {
    question: 'adequate 的意思是什么？',
    options: ["足够的", "方程", "公平", "相等"],
    correctAnswer: 0
  }
  },

  {
    id: 155,
    root: 'flu/flux',
    origin: 'Latin',
    meaning: '流',
    meaningEn: 'flow',
    description: `flu/flux 代表「流动」。fluid（流体）、fluent（流利的）= flu（流）+ -ent → 流动的 → 流利的。influence（影响）= in-（进入）+ flu（流）+ -ence → 流进来 → 影响。influx（涌入）= in-（进入）+ flux（流）→ 流入 → 涌入。记住：flush（冲洗）也来自这个词根。`,
    examples: [
      {
        word: 'fluid',
        breakdown: { prefix: '', root: 'flu', suffix: 'id' },
        meaning: '流体',
        explanation: '流→流体'
      },
      {
        word: 'influence',
        breakdown: { prefix: 'in', root: 'flu', suffix: 'ence' },
        meaning: '影响',
        explanation: '流入→影响'
      },
      {
        word: 'fluent',
        breakdown: { prefix: '', root: 'flu', suffix: 'ent' },
        meaning: '流利的',
        explanation: '流动→流利的'
      },
      {
        word: 'affluent',
        breakdown: { prefix: 'af', root: 'flu', suffix: 'ent' },
        meaning: '富裕的',
        explanation: '流向→富裕的'
      }
    ],
    quiz: {
    question: 'influence 的意思是什么？',
    options: ["富裕的", "流体", "流利的", "影响"],
    correctAnswer: 3
  }
  },

  {
    id: 156,
    root: 'found/fund',
    origin: 'Latin',
    meaning: '基础',
    meaningEn: 'base',
    description: `found/fund 代表「基础、底部」。foundation（基础）= found（基）+ -ation → 打地基。profound（深刻的）= pro-（向前）+ found（底）→ 深到底部的 → 深刻的。fundamental（基本的）= fund（基）+ -amental → 基础的。`,
    commonPitfall: 'found 既可以是“建立”，也可能是 find 的过去式“找到”；本卡只讲“建立/打基础”的 found。',
    examples: [
      {
        word: 'found',
        breakdown: { prefix: '', root: 'found', suffix: '' },
        partMeanings: { root: '打基础 / 建立' },
        meaning: '建立',
        explanation: '打下基础→建立',
        literalMeaning: '把基础放下',
        learningNote: '自由词示例，注意不要和 find-found-found 混淆。',
      },
      {
        word: 'foundation',
        breakdown: { prefix: '', root: 'found', suffix: 'ation' },
        partMeanings: { root: '基础', suffix: '变成名词' },
        meaning: '基础',
        explanation: '打基础这件事或结果→基础',
        literalMeaning: '被建立起来的底部',
      },
      {
        word: 'fundamental',
        breakdown: { prefix: '', root: 'fund', suffix: 'amental' },
        partMeanings: { root: '基础', suffix: '相关的' },
        meaning: '基本的',
        explanation: '属于基础层面的→基本的',
        literalMeaning: '与基础有关的',
      },
      {
        word: 'profound',
        breakdown: { prefix: 'pro', root: 'found', suffix: '' },
        partMeanings: { prefix: '向前 / 深入', root: '底部' },
        meaning: '深刻的',
        explanation: '深入到底部→深刻的',
        literalMeaning: '深到底部',
      }
    ],
    quiz: {
    question: '单词 found 的意思是什么？',
    options: ["基础", "深刻的", "建立", "基本的"],
    correctAnswer: 2
  }
  },

  {
    id: 157,
    root: 'grat',
    origin: 'Latin',
    meaning: '感激',
    meaningEn: 'thanks',
    description: `grat 代表「感激、令人愉快」。grateful（感激的）、gratitude（感恩）= grat（感激）+ -itude。congratulate（祝贺）= con-（一起）+ grat（高兴）+ -ulate → 一起高兴 → 祝贺。ingratiate（讨好）= in-（使）+ grat（令人愉快）+ -iate → 使人高兴 → 讨好。`,
    examples: [
      {
        word: 'grateful',
        breakdown: { prefix: '', root: 'grat', suffix: 'eful' },
        meaning: '感激的',
        explanation: '感激的'
      },
      {
        word: 'gratitude',
        breakdown: { prefix: '', root: 'grat', suffix: 'itude' },
        meaning: '感激',
        explanation: '感激'
      },
      {
        word: 'congratulate',
        breakdown: { prefix: 'con', root: 'grat', suffix: 'ulate' },
        meaning: '祝贺',
        explanation: '一起感激→祝贺'
      },
      {
        word: 'ingratiate',
        breakdown: { prefix: 'in', root: 'grat', suffix: 'iate' },
        meaning: '讨好',
        explanation: '向内感激→讨好'
      }
    ],
    quiz: {
    question: 'gratitude 的意思是什么？',
    options: ["感激", "感激的", "祝贺", "讨好"],
    correctAnswer: 0
  }
  },

  {
    id: 158,
    root: 'her/hes',
    origin: 'Latin',
    meaning: '粘',
    meaningEn: 'stick',
    description: `her/hes 代表「粘附、坚持」。adhere（坚持）= ad-（向）+ here（粘）→ 粘着 → 坚持。coherent（连贯的）= co-（一起）+ her（粘）+ -ent → 粘在一起的 → 连贯的。hesitate（犹豫）= hes（粘）+ -itate → 粘住不动 → 犹豫。`,
    variants: ['here'],
    memoryHint: 'her/hes 的画面是“黏在一起”或“卡住不动”。',
    examples: [
      {
        word: 'adhere',
        breakdown: { prefix: 'ad', root: 'here', suffix: '' },
        partMeanings: { prefix: '朝向', root: '粘' },
        meaning: '粘附',
        explanation: '向某物粘住→粘附',
        literalMeaning: '朝向并粘住',
      },
      {
        word: 'cohere',
        breakdown: { prefix: 'co', root: 'here', suffix: '' },
        meaning: '连贯',
        explanation: '一起粘→连贯'
      },
      {
        word: 'inherent',
        breakdown: { prefix: 'in', root: 'her', suffix: 'ent' },
        partMeanings: { prefix: '在里面', root: '粘', suffix: '变成形容词' },
        meaning: '固有的',
        explanation: '粘在内部不分离→固有的',
        literalMeaning: '内在粘连的',
      },
      {
        word: 'hesitate',
        breakdown: { prefix: '', root: 'hes', suffix: 'itate' },
        partMeanings: { root: '粘住 / 停住', suffix: '变成动词' },
        meaning: '犹豫',
        explanation: '行动像被粘住一样停顿→犹豫',
        literalMeaning: '卡住不动',
      }
    ],
    quiz: {
    question: 'hesitate 的意思是什么？',
    options: ["犹豫", "粘附", "固有的", "连贯"],
    correctAnswer: 0
  }
  },

  {
    id: 159,
    root: 'jud/judic',
    origin: 'Latin',
    meaning: '判断',
    meaningEn: 'judge',
    description: `jud/judic 代表「判断」。judge（法官）、prejudice（偏见）= pre-（提前）+ judice（判断）→ 提前判断 → 偏见。judicial（司法的）= judic（判断）+ -ial → 判断的 → 司法的。记住：justice（正义）也来自这个词根家族。`,
    examples: [
      {
        word: 'judge',
        breakdown: { prefix: '', root: 'jud', suffix: 'ge' },
        meaning: '判断',
        explanation: '判断'
      },
      {
        word: 'prejudice',
        breakdown: { prefix: 'pre', root: 'jud', suffix: 'ice' },
        meaning: '偏见',
        explanation: '预先判断→偏见'
      },
      {
        word: 'judicial',
        breakdown: { prefix: '', root: 'judic', suffix: 'ial' },
        meaning: '司法的',
        explanation: '判断的→司法的'
      },
      {
        word: 'adjudicate',
        breakdown: { prefix: 'ad', root: 'judic', suffix: 'ate' },
        meaning: '裁决',
        explanation: '对案件作判断→裁决'
      }
    ],
    quiz: {
    question: 'judge 的意思是什么？',
    options: ["司法的", "判断", "裁决", "偏见"],
    correctAnswer: 1
  }
  },

  {
    id: 160,
    root: 'jur/jus',
    origin: 'Latin',
    meaning: '法律,发誓',
    meaningEn: 'law, swear',
    description: `jur/jus 代表「法律、发誓」。jury（陪审团）、justice（正义）= jus（法律）+ -tice。injure（伤害）= in-（违反）+ jur（法律）→ 违反正义 → 伤害。perjury（伪证）= per-（彻底）+ jur（发誓）+ -y → 违背誓言 → 伪证。`,
    examples: [
      {
        word: 'jury',
        breakdown: { prefix: '', root: 'jur', suffix: 'y' },
        meaning: '陪审团',
        explanation: '发誓→陪审团'
      },
      {
        word: 'justice',
        breakdown: { prefix: '', root: 'jus', suffix: 'tice' },
        meaning: '正义',
        explanation: '法律→正义'
      },
      {
        word: 'injury',
        breakdown: { prefix: 'in', root: 'jur', suffix: 'y' },
        meaning: '伤害',
        explanation: '不法→伤害'
      },
      {
        word: 'adjust',
        breakdown: { prefix: 'ad', root: 'just', suffix: '' },
        meaning: '调整',
        explanation: '使其变正→调整'
      }
    ],
    quiz: {
    question: 'jury 的意思是什么？',
    options: ["陪审团", "正义", "伤害", "调整"],
    correctAnswer: 0
  }
  },

  {
    id: 161,
    root: 'later',
    origin: 'Latin',
    meaning: '边',
    meaningEn: 'side',
    description: `later 代表「边、侧面」。lateral（侧面的）、collateral（抵押品）= col-（一起）+ later（边）+ -al → 在旁边的东西 → 抵押品。unilateral（单边的）= uni-（一）+ later（边）+ -al → 一边的。`,
    examples: [
      {
        word: 'lateral',
        breakdown: { prefix: '', root: 'later', suffix: 'al' },
        meaning: '侧面的',
        explanation: '边的→侧面的'
      },
      {
        word: 'bilateral',
        breakdown: { prefix: 'bi', root: 'later', suffix: 'al' },
        meaning: '双边的',
        explanation: '两边→双边的'
      },
      {
        word: 'unilateral',
        breakdown: { prefix: 'uni', root: 'later', suffix: 'al' },
        meaning: '单边的',
        explanation: '一边→单边的'
      },
      {
        word: 'collateral',
        breakdown: { prefix: 'col', root: 'later', suffix: 'al' },
        meaning: '抵押品',
        explanation: '一起边→抵押品'
      }
    ],
    quiz: {
    question: 'lateral 的意思是什么？',
    options: ["抵押品", "单边的", "侧面的", "双边的"],
    correctAnswer: 2
  }
  },

  {
    id: 162,
    root: 'lev',
    origin: 'Latin',
    meaning: '举起',
    meaningEn: 'raise',
    description: `lev 代表「举起、轻」。elevator（电梯）= e-（向外）+ lev（举）+ -ator → 举起来的东西。lever（杠杆）= lev（举）+ -er → 举东西的工具。relevant（相关的）= re-（再）+ lev（举）+ -ant → 再次提起的 → 相关的。relieve（减轻）= re-（再）+ liev（举）→ 举起负担 → 减轻。`,
    examples: [
      {
        word: 'elevate',
        breakdown: { prefix: 'e', root: 'lev', suffix: 'ate' },
        meaning: '提升',
        explanation: '向外举→提升'
      },
      {
        word: 'elevator',
        breakdown: { prefix: 'e', root: 'lev', suffix: 'ator' },
        meaning: '电梯',
        explanation: '举起器→电梯'
      },
      {
        word: 'relieve',
        breakdown: { prefix: 're', root: 'liev', suffix: 'e' },
        meaning: '减轻',
        explanation: '再举→减轻'
      },
      {
        word: 'lever',
        breakdown: { prefix: '', root: 'lev', suffix: 'er' },
        meaning: '杠杆',
        explanation: '举起→杠杆'
      }
    ],
    quiz: {
    question: 'lever 的意思是什么？',
    options: ["提升", "杠杆", "电梯", "减轻"],
    correctAnswer: 1
  }
  },

  {
    id: 163,
    root: 'liqu',
    origin: 'Latin',
    meaning: '液体',
    meaningEn: 'liquid',
    description: `liqu 代表「液体」。liquid（液体）、liquidate（清算）= liqu（液体）+ -idate → 变成液体 → 清算（资产变现）。liquor（烈酒）直接来自 liqu。记住：liqu 暗示「流动性」，所以 liquid assets（流动资产）很形象。`,
    examples: [
      {
        word: 'liquid',
        breakdown: { prefix: '', root: 'liqu', suffix: 'id' },
        meaning: '液体',
        explanation: '液体'
      },
      {
        word: 'liquidate',
        breakdown: { prefix: '', root: 'liqu', suffix: 'idate' },
        meaning: '清算',
        explanation: '变液体→清算'
      },
      {
        word: 'liquor',
        breakdown: { prefix: '', root: 'liqu', suffix: 'or' },
        meaning: '酒',
        explanation: '液体→酒'
      }
    ],
    quiz: {
    question: 'liquidate 的意思是什么？',
    options: ["清算", "液体", "酒", "一起"],
    correctAnswer: 0
  }
  },

  {
    id: 164,
    root: 'mark',
    origin: 'Germanic',
    meaning: '标记',
    meaningEn: 'mark',
    description: `mark 来自日耳曼语「标记」。market（市场）= mark（标记）+ -et → 有标记的地方 → 市场（古代市场用标记划分摊位）。landmark（地标）= land（土地）+ mark（标记）→ 土地上的标记。trademark（商标）= trade（贸易）+ mark（标记）。`,
    examples: [
      {
        word: 'mark',
        breakdown: { prefix: '', root: 'mark', suffix: '' },
        meaning: '标记',
        explanation: '标记'
      },
      {
        word: 'remark',
        breakdown: { prefix: 're', root: 'mark', suffix: '' },
        meaning: '评论',
        explanation: '再标记→评论'
      },
      {
        word: 'landmark',
        breakdown: { prefix: 'land', root: 'mark', suffix: '' },
        meaning: '地标',
        explanation: '土地标记→地标'
      },
      {
        word: 'bookmark',
        breakdown: { prefix: 'book', root: 'mark', suffix: '' },
        meaning: '书签',
        explanation: '书标记→书签'
      }
    ],
    quiz: {
    question: 'bookmark 的意思是什么？',
    options: ["标记", "地标", "评论", "书签"],
    correctAnswer: 3
  }
  },

  {
    id: 165,
    root: 'medi',
    origin: 'Latin',
    meaning: '中间',
    meaningEn: 'middle',
    description: `medi 代表「中间」。medium（中等的）、mediate（调解）= medi（中间）+ -ate → 站在中间 → 调解。medieval（中世纪的）= medi（中间）+ ev（时代）+ -al → 中间时代的。immediate（立即的）= im-（不）+ medi（中间）+ -ate → 没有中间环节的 → 立即的。`,
    examples: [
      {
        word: 'medium',
        breakdown: { prefix: '', root: 'medi', suffix: 'um' },
        meaning: '中等',
        explanation: '中间→中等'
      },
      {
        word: 'mediate',
        breakdown: { prefix: '', root: 'medi', suffix: 'ate' },
        meaning: '调解',
        explanation: '居中→调解'
      },
      {
        word: 'immediate',
        breakdown: { prefix: 'im', root: 'medi', suffix: 'ate' },
        meaning: '立即的',
        explanation: '不居中→立即的'
      },
      {
        word: 'medieval',
        breakdown: { prefix: '', root: 'medi', suffix: 'eval' },
        meaning: '中世纪',
        explanation: '中间时代→中世纪'
      }
    ],
    quiz: {
    question: 'immediate 的意思是什么？',
    options: ["立即的", "中世纪", "中等", "调解"],
    correctAnswer: 0
  }
  },

  {
    id: 166,
    root: 'migr',
    origin: 'Latin',
    meaning: '迁移',
    meaningEn: 'move',
    description: `migr 代表「迁移」。migrate（迁徙）、immigrant（移民）= im-（进入）+ migr（迁移）+ -ant → 迁移进来的人。emigrate（移出）= e-（向外）+ migr（迁移）+ -ate → 迁移出去。记住：候鸟叫 migratory birds。`,
    examples: [
      {
        word: 'migrate',
        breakdown: { prefix: '', root: 'migr', suffix: 'ate' },
        meaning: '迁移',
        explanation: '迁移'
      },
      {
        word: 'immigrate',
        breakdown: { prefix: 'im', root: 'migr', suffix: 'ate' },
        meaning: '移入',
        explanation: '向内迁→移入'
      },
      {
        word: 'emigrate',
        breakdown: { prefix: 'e', root: 'migr', suffix: 'ate' },
        meaning: '移出',
        explanation: '向外迁→移出'
      },
      {
        word: 'immigrant',
        breakdown: { prefix: 'im', root: 'migr', suffix: 'ant' },
        meaning: '移民',
        explanation: '迁入者→移民'
      }
    ],
    quiz: {
    question: 'immigrate 的意思是什么？',
    options: ["移民", "移入", "移出", "迁移"],
    correctAnswer: 1
  }
  },

  {
    id: 167,
    root: 'mod',
    origin: 'Latin',
    meaning: '方式,度量',
    meaningEn: 'manner, measure',
    description: `mod 代表「方式、度量、适度」。mode（模式）、moderate（适度的）= mod（度量）+ -erate → 有度量的。modify（修改）= mod（方式）+ -ify → 改变方式。accommodate（容纳）= ac-（向）+ com-（一起）+ mod（适应）+ -ate → 使适应 → 容纳。`,
    examples: [
      {
        word: 'mode',
        breakdown: { prefix: '', root: 'mod', suffix: 'e' },
        meaning: '模式',
        explanation: '方式→模式'
      },
      {
        word: 'model',
        breakdown: { prefix: '', root: 'mod', suffix: 'el' },
        meaning: '模型',
        explanation: '度量→模型'
      },
      {
        word: 'moderate',
        breakdown: { prefix: '', root: 'mod', suffix: 'erate' },
        meaning: '适度的',
        explanation: '有度量→适度的'
      },
      {
        word: 'modify',
        breakdown: { prefix: '', root: 'mod', suffix: 'ify' },
        meaning: '修改',
        explanation: '改变方式→修改'
      }
    ],
    quiz: {
    question: 'modify 的意思是什么？',
    options: ["模型", "适度的", "模式", "修改"],
    correctAnswer: 3
  }
  },

  {
    id: 168,
    root: 'mot/mob/mov',
    origin: 'Latin',
    meaning: '移动',
    meaningEn: 'move',
    description: `mot/mob/mov 代表「移动」。motion（运动）、mobile（移动的）= mob（动）+ -ile → 能动的。automobile（汽车）= auto-（自己）+ mobile（移动）→ 自己会动的。promote（促进）= pro-（向前）+ mot（动）→ 向前推动 → 促进。`,
    examples: [
      {
        word: 'motion',
        breakdown: { prefix: '', root: 'mot', suffix: 'ion' },
        meaning: '运动',
        explanation: '移动→运动'
      },
      {
        word: 'mobile',
        breakdown: { prefix: '', root: 'mob', suffix: 'ile' },
        meaning: '移动的',
        explanation: '能动→移动的'
      },
      {
        word: 'remove',
        breakdown: { prefix: 're', root: 'mov', suffix: 'e' },
        meaning: '移除',
        explanation: '再移动→移除'
      },
      {
        word: 'promote',
        breakdown: { prefix: 'pro', root: 'mot', suffix: 'e' },
        meaning: '促进',
        explanation: '向前移→促进'
      }
    ],
    quiz: {
    question: 'remove 的意思是什么？',
    options: ["促进", "移除", "运动", "移动的"],
    correctAnswer: 1
  }
  },

  {
    id: 169,
    root: 'nat/nasc',
    origin: 'Latin',
    meaning: '出生',
    meaningEn: 'born',
    description: `nat/nasc 代表「出生」。nature（自然）、native（本地的）= nat（出生）+ -ive → 出生的地方。renaissance（文艺复兴）= re-（再）+ naiss（生）+ -ance → 再生 → 文艺复兴。nascent（新生的）= nasc（生）+ -ent → 正在出生的。`,
    examples: [
      {
        word: 'nature',
        breakdown: { prefix: '', root: 'nat', suffix: 'ure' },
        meaning: '自然',
        explanation: '出生→自然'
      },
      {
        word: 'native',
        breakdown: { prefix: '', root: 'nat', suffix: 'ive' },
        meaning: '本地的',
        explanation: '出生的→本地的'
      },
      {
        word: 'nascent',
        breakdown: { prefix: '', root: 'nasc', suffix: 'ent' },
        meaning: '新生的',
        explanation: '正出生→新生的'
      },
      {
        word: 'innate',
        breakdown: { prefix: 'in', root: 'nat', suffix: 'e' },
        meaning: '天生的',
        explanation: '在内出生→天生的'
      }
    ],
    quiz: {
    question: 'nature 的意思是什么？',
    options: ["新生的", "本地的", "天生的", "自然"],
    correctAnswer: 3
  }
  },

  {
    id: 170,
    root: 'neg',
    origin: 'Latin',
    meaning: '否定',
    meaningEn: 'deny',
    description: `neg 代表「否定」。negative（消极的）、neglect（忽视）= neg（否定）+ lect（选择）→ 不选择 → 忽视。negate（否定）= neg（否定）+ -ate。negotiate（谈判）= neg（否定）+ oti（闲暇）+ -ate → 不闲着 → 谈判（拉丁商人不闲着时就在谈生意）。`,
    examples: [
      {
        word: 'negative',
        breakdown: { prefix: '', root: 'neg', suffix: 'ative' },
        meaning: '否定的',
        explanation: '否定的'
      },
      {
        word: 'negate',
        breakdown: { prefix: '', root: 'neg', suffix: 'ate' },
        meaning: '否定',
        explanation: '否定'
      },
      {
        word: 'neglect',
        breakdown: { prefix: '', root: 'neg', suffix: 'lect' },
        meaning: '忽视',
        explanation: '不选→忽视'
      },
      {
        word: 'negotiate',
        breakdown: { prefix: '', root: 'neg', suffix: 'otiate' },
        meaning: '谈判',
        explanation: '不闲着→谈判'
      }
    ],
    quiz: {
    question: 'negotiate 的意思是什么？',
    options: ["否定的", "谈判", "忽视", "否定"],
    correctAnswer: 1
  }
  },

  {
    id: 171,
    root: 'nom/nym',
    origin: 'Greek',
    meaning: '名字',
    meaningEn: 'name',
    description: `nom/nym 代表「名字」。name 来自同源词。anonymous（匿名的）= an-（无）+ onym（名字）+ -ous → 没有名字的。synonym（同义词）= syn-（相同）+ onym（名字）→ 名字相同的词。nominate（提名）= nomin（名字）+ -ate → 叫出名字 → 提名。`,
    examples: [
      {
        word: 'name',
        breakdown: { prefix: '', root: 'nom', suffix: 'e' },
        meaning: '名字',
        explanation: '名字'
      },
      {
        word: 'nominate',
        breakdown: { prefix: '', root: 'nom', suffix: 'inate' },
        meaning: '提名',
        explanation: '命名→提名'
      },
      {
        word: 'anonymous',
        breakdown: { prefix: 'an', root: 'onym', suffix: 'ous' },
        meaning: '匿名的',
        explanation: '无名→匿名的'
      },
      {
        word: 'synonym',
        breakdown: { prefix: 'syn', root: 'onym', suffix: '' },
        meaning: '同义词',
        explanation: '同名→同义词'
      }
    ],
    quiz: {
    question: 'name 的意思是什么？',
    options: ["提名", "同义词", "名字", "匿名的"],
    correctAnswer: 2
  }
  },

  {
    id: 172,
    root: 'not',
    origin: 'Latin',
    meaning: '标记',
    meaningEn: 'mark',
    description: `not 代表「标记、注意」。note（笔记）、notice（注意）= not（标记）+ -ice → 看到标记 → 注意。notable（著名的）= not（标记）+ -able → 值得标记的 → 著名的。denote（表示）= de-（向下）+ not（标记）→ 向下标记 → 表示。`,
    examples: [
      {
        word: 'note',
        breakdown: { prefix: '', root: 'not', suffix: 'e' },
        meaning: '笔记',
        explanation: '标记→笔记'
      },
      {
        word: 'notice',
        breakdown: { prefix: '', root: 'not', suffix: 'ice' },
        meaning: '注意',
        explanation: '标记→注意'
      },
      {
        word: 'notify',
        breakdown: { prefix: '', root: 'not', suffix: 'ify' },
        meaning: '通知',
        explanation: '做标记→通知'
      },
      {
        word: 'notorious',
        breakdown: { prefix: '', root: 'not', suffix: 'orious' },
        meaning: '臭名昭著',
        explanation: '被标记→臭名昭著'
      }
    ],
    quiz: {
    question: 'notify 的意思是什么？',
    options: ["笔记", "通知", "臭名昭著", "注意"],
    correctAnswer: 1
  }
  },

  {
    id: 173,
    root: 'oper',
    origin: 'Latin',
    meaning: '工作',
    meaningEn: 'work',
    description: `oper 代表「工作」。operate（操作）、cooperate（合作）= co-（一起）+ oper（工作）+ -ate → 一起工作。opera（歌剧）原意是「作品」。operation（手术）= oper（工作）+ -ation → 工作过程 → 手术。`,
    examples: [
      {
        word: 'operate',
        breakdown: { prefix: '', root: 'oper', suffix: 'ate' },
        meaning: '操作',
        explanation: '工作→操作'
      },
      {
        word: 'cooperate',
        breakdown: { prefix: 'co', root: 'oper', suffix: 'ate' },
        meaning: '合作',
        explanation: '一起工作→合作'
      },
      {
        word: 'opera',
        breakdown: { prefix: '', root: 'oper', suffix: 'a' },
        meaning: '歌剧',
        explanation: '作品→歌剧'
      }
    ],
    quiz: {
    question: 'opera 的意思是什么？',
    options: ["提前", "操作", "歌剧", "合作"],
    correctAnswer: 2
  }
  },

  {
    id: 174,
    root: 'paci/peac',
    origin: 'Latin',
    meaning: '和平',
    meaningEn: 'peace',
    description: `paci/peac 代表「和平」。pacific（和平的）、peace（和平）来自同源。pacify（使平静）= paci（和平）+ -fy → 使和平。appease（安抚）= ap-（向）+ pease（和平）→ 带向和平 → 安抚。`,
    examples: [
      {
        word: 'peace',
        breakdown: { prefix: '', root: 'peac', suffix: 'e' },
        meaning: '和平',
        explanation: '和平'
      },
      {
        word: 'pacify',
        breakdown: { prefix: '', root: 'paci', suffix: 'fy' },
        meaning: '使平静',
        explanation: '使和平→使平静'
      },
      {
        word: 'pacific',
        breakdown: { prefix: '', root: 'paci', suffix: 'fic' },
        meaning: '太平洋',
        explanation: '和平的→太平洋'
      }
    ],
    quiz: {
    question: 'pacific 的意思是什么？',
    options: ["和平", "否定含义", "使平静", "太平洋"],
    correctAnswer: 3
  }
  },

  {
    id: 175,
    root: 'pan',
    origin: 'Greek',
    meaning: '全部',
    meaningEn: 'all',
    description: `pan 代表「全部」（希腊语）。panorama（全景）= pan（全）+ orama（看）→ 全部看到 → 全景。pandemic（大流行病）= pan（全）+ dem（人民）+ -ic → 影响全体人民的。panacea（万能药）= pan（全）+ acea（治疗）→ 治疗一切的药。`,
    examples: [
      {
        word: 'panorama',
        breakdown: { prefix: '', root: 'pan', suffix: 'orama' },
        meaning: '全景',
        explanation: '全看→全景'
      },
      {
        word: 'pandemic',
        breakdown: { prefix: '', root: 'pan', suffix: 'demic' },
        meaning: '大流行',
        explanation: '全人民→大流行'
      },
      {
        word: 'panacea',
        breakdown: { prefix: '', root: 'pan', suffix: 'acea' },
        meaning: '万能药',
        explanation: '全治→万能药'
      }
    ],
    quiz: {
    question: 'pandemic 的意思是什么？',
    options: ["全景", "万能药", "变成名词", "大流行"],
    correctAnswer: 3
  }
  },

  {
    id: 176,
    root: 'patr/pater',
    origin: 'Latin',
    meaning: '父亲',
    meaningEn: 'father',
    description: `patr/pater 代表「父亲」。father 来自同源词。patriot（爱国者）= patr（父）+ -iot → 爱祖国（父之国）的人。patron（赞助人）= patr（父）+ -on → 像父亲一样的人。patriarch（族长）= patr（父）+ arch（统治者）。`,
    examples: [
      {
        word: 'patriot',
        breakdown: { prefix: '', root: 'patr', suffix: 'iot' },
        meaning: '爱国者',
        explanation: '父国→爱国者'
      },
      {
        word: 'paternal',
        breakdown: { prefix: '', root: 'pater', suffix: 'nal' },
        meaning: '父亲的',
        explanation: '父亲的'
      },
      {
        word: 'patron',
        breakdown: { prefix: '', root: 'patr', suffix: 'on' },
        meaning: '赞助人',
        explanation: '父亲→赞助人'
      }
    ],
    quiz: {
    question: 'patriot 的意思是什么？',
    options: ["赞助人", "父亲的", "爱国者", "做这事的人"],
    correctAnswer: 2
  }
  },

  {
    id: 177,
    root: 'pel/puls',
    origin: 'Latin',
    meaning: '推,驱动',
    meaningEn: 'drive',
    description: `pel/puls 代表「推、驱动」。push 来自同源词。compel（强迫）= com-（一起）+ pel（推）→ 推在一起 → 强迫。propel（推进）= pro-（向前）+ pel（推）→ 向前推。impulse（冲动）= im-（进入）+ puls（推）→ 内心的推力 → 冲动。`,
    examples: [
      {
        word: 'propel',
        breakdown: { prefix: 'pro', root: 'pel', suffix: '' },
        meaning: '推进',
        explanation: '向前推→推进'
      },
      {
        word: 'expel',
        breakdown: { prefix: 'ex', root: 'pel', suffix: '' },
        meaning: '驱逐',
        explanation: '向外推→驱逐'
      },
      {
        word: 'compel',
        breakdown: { prefix: 'com', root: 'pel', suffix: '' },
        meaning: '强迫',
        explanation: '一起推→强迫'
      },
      {
        word: 'pulse',
        breakdown: { prefix: '', root: 'puls', suffix: 'e' },
        meaning: '脉搏',
        explanation: '推动→脉搏'
      }
    ],
    quiz: {
    question: 'propel 的意思是什么？',
    options: ["脉搏", "驱逐", "推进", "强迫"],
    correctAnswer: 2
  }
  },

  {
    id: 178,
    root: 'phan/phen',
    origin: 'Greek',
    meaning: '显示',
    meaningEn: 'show',
    description: `phan/phen 代表「显示、显现」（希腊语）。phantom（幽灵）= phan（显现）+ -tom → 显现出来的东西。phenomenon（现象）= phen（显现）+ -omenon → 显现出来的事物。emphasis（强调）= em-（使）+ phas（显现）+ -is → 使显现 → 强调。`,
    examples: [
      {
        word: 'phantom',
        breakdown: { prefix: '', root: 'phan', suffix: 'tom' },
        meaning: '幽灵',
        explanation: '显示→幽灵'
      },
      {
        word: 'phenomenon',
        breakdown: { prefix: '', root: 'phen', suffix: 'omenon' },
        meaning: '现象',
        explanation: '显示→现象'
      },
      {
        word: 'emphasis',
        breakdown: { prefix: 'em', root: 'phas', suffix: 'is' },
        meaning: '强调',
        explanation: '在内显示→强调'
      }
    ],
    quiz: {
    question: 'phenomenon 的意思是什么？',
    options: ["幽灵", "现象", "强调", "可以...的"],
    correctAnswer: 1
  }
  },

  {
    id: 179,
    root: 'plic',
    origin: 'Latin',
    meaning: '折叠',
    meaningEn: 'fold',
    description: `plic 代表「折叠」。complicate（使复杂）= com-（一起）+ plic（折）+ -ate → 折在一起 → 复杂化。explicit（明确的）= ex-（向外）+ plic（折）+ -it → 展开折叠 → 明确的。implicate（牵连）= im-（进入）+ plic（折）+ -ate → 折进去 → 牵连。`,
    examples: [
      {
        word: 'complicate',
        breakdown: { prefix: 'com', root: 'plic', suffix: 'ate' },
        meaning: '复杂',
        explanation: '一起折→复杂'
      },
      {
        word: 'explicit',
        breakdown: { prefix: 'ex', root: 'plic', suffix: 'it' },
        meaning: '明确的',
        explanation: '展开→明确的'
      },
      {
        word: 'implicit',
        breakdown: { prefix: 'im', root: 'plic', suffix: 'it' },
        meaning: '含蓄的',
        explanation: '折入→含蓄的'
      },
      {
        word: 'duplicate',
        breakdown: { prefix: 'du', root: 'plic', suffix: 'ate' },
        meaning: '复制',
        explanation: '双折→复制'
      }
    ],
    quiz: {
    question: 'complicate 的意思是什么？',
    options: ["明确的", "含蓄的", "复杂", "复制"],
    correctAnswer: 2
  }
  },

  {
    id: 180,
    root: 'pon/pos/pound',
    origin: 'Latin',
    meaning: '放',
    meaningEn: 'put',
    description: `pon/pos/pound 代表「放置」。position（位置）= pos（放）+ -ition → 被放的地方。compose（组成）= com-（一起）+ pos（放）→ 放在一起 → 组成。expound（阐述）= ex-（向外）+ pound（放）→ 把想法放出来 → 阐述。`,
    examples: [
      {
        word: 'component',
        breakdown: { prefix: 'com', root: 'pon', suffix: 'ent' },
        meaning: '组成部分',
        explanation: '一起放→组成'
      },
      {
        word: 'compose',
        breakdown: { prefix: 'com', root: 'pos', suffix: 'e' },
        meaning: '组成',
        explanation: '一起放→组成'
      },
      {
        word: 'propose',
        breakdown: { prefix: 'pro', root: 'pos', suffix: 'e' },
        meaning: '提议',
        explanation: '向前放→提议'
      },
      {
        word: 'compound',
        breakdown: { prefix: 'com', root: 'pound', suffix: '' },
        meaning: '复合',
        explanation: '一起放→复合'
      }
    ],
    quiz: {
    question: 'compound 的意思是什么？',
    options: ["组成部分", "提议", "组成", "复合"],
    correctAnswer: 3
  }
  },

  {
    id: 181,
    root: 'punct',
    origin: 'Latin',
    meaning: '点,刺',
    meaningEn: 'point, prick',
    description: `punct 代表「点、刺」。puncture（刺穿）、punctual（准时的）= punct（点）+ -ual → 在点上的 → 准时的。punctuation（标点）= punct（点）+ -uation → 打点 → 标点。acupuncture（针灸）= acu（尖）+ punct（刺）+ -ure → 用尖刺 → 针灸。`,
    examples: [
      {
        word: 'puncture',
        breakdown: { prefix: '', root: 'punct', suffix: 'ure' },
        meaning: '刺穿',
        explanation: '刺→刺穿'
      },
      {
        word: 'punctual',
        breakdown: { prefix: '', root: 'punct', suffix: 'ual' },
        meaning: '准时的',
        explanation: '在点上→准时的'
      },
      {
        word: 'acupuncture',
        breakdown: { prefix: 'acu', root: 'punct', suffix: 'ure' },
        meaning: '针灸',
        explanation: '针刺→针灸'
      }
    ],
    quiz: {
    question: 'punctual 的意思是什么？',
    options: ["针灸", "刺穿", "变成动词", "准时的"],
    correctAnswer: 3
  }
  },

  {
    id: 182,
    root: 'quer/quis/quir',
    origin: 'Latin',
    meaning: '寻求',
    meaningEn: 'seek',
    description: `quer/quis/quir 代表「寻求、询问」。question 来自同源。require（需要）= re-（再）+ quir（寻求）→ 再次寻求 → 需要。acquire（获得）= ac-（向）+ quir（寻求）→ 寻求到 → 获得。inquire（询问）= in-（向内）+ quir（寻求）→ 向内寻求 → 询问。`,
    examples: [
      {
        word: 'require',
        breakdown: { prefix: 're', root: 'quir', suffix: 'e' },
        meaning: '需要',
        explanation: '反复求→需要'
      },
      {
        word: 'acquire',
        breakdown: { prefix: 'ac', root: 'quir', suffix: 'e' },
        meaning: '获得',
        explanation: '朝目标寻求→获得'
      },
      {
        word: 'inquire',
        breakdown: { prefix: 'in', root: 'quir', suffix: 'e' },
        meaning: '询问',
        explanation: '向内求→询问'
      },
      {
        word: 'query',
        breakdown: { prefix: '', root: 'quer', suffix: 'y' },
        meaning: '查询',
        explanation: '寻求→查询'
      }
    ],
    quiz: {
    question: 'inquire 的意思是什么？',
    options: ["查询", "需要", "获得", "询问"],
    correctAnswer: 3
  }
  },

  {
    id: 183,
    root: 'radi',
    origin: 'Latin',
    meaning: '光线',
    meaningEn: 'ray',
    description: `radi 代表「光线」。ray 来自同源。radio（广播）= radi（光线）+ -o → 辐射传播（无线电波）。radiant（光芒四射的）= radi（光线）+ -ant → 发射光线的。eradicate（根除）= e-（向外）+ radic（根）+ -ate → 连根拔起 → 根除。`,
    examples: [
      {
        word: 'radiate',
        breakdown: { prefix: '', root: 'radi', suffix: 'ate' },
        meaning: '辐射',
        explanation: '发光→辐射'
      },
      {
        word: 'radio',
        breakdown: { prefix: '', root: 'radi', suffix: 'o' },
        meaning: '无线电',
        explanation: '光线→无线电'
      },
      {
        word: 'radius',
        breakdown: { prefix: '', root: 'radi', suffix: 'us' },
        meaning: '半径',
        explanation: '光线→半径'
      }
    ],
    quiz: {
    question: 'radio 的意思是什么？',
    options: ["无线电", "半径", "相关场所", "辐射"],
    correctAnswer: 0
  }
  },

  {
    id: 184,
    root: 'rog',
    origin: 'Latin',
    meaning: '要求,问',
    meaningEn: 'ask',
    description: `rog 代表「要求、询问」。interrogate（审问）= inter-（之间）+ rog（问）+ -ate → 反复问 → 审问。arrogant（傲慢的）= ar-（向）+ rog（要求）+ -ant → 向自己要求太多 → 傲慢的。prerogative（特权）= pre-（提前）+ rog（要求）+ -ative → 提前要求的权利 → 特权。`,
    examples: [
      {
        word: 'interrogate',
        breakdown: { prefix: 'inter', root: 'rog', suffix: 'ate' },
        meaning: '审问',
        explanation: '之间问→审问'
      },
      {
        word: 'arrogant',
        breakdown: { prefix: 'ar', root: 'rog', suffix: 'ant' },
        meaning: '傲慢的',
        explanation: '不断索求→傲慢的'
      },
      {
        word: 'prerogative',
        breakdown: { prefix: 'pre', root: 'rog', suffix: 'ative' },
        meaning: '特权',
        explanation: '预先问→特权'
      }
    ],
    quiz: {
    question: 'prerogative 的意思是什么？',
    options: ["状态", "特权", "傲慢的", "审问"],
    correctAnswer: 1
  }
  },

  {
    id: 185,
    root: 'sacr/secr',
    origin: 'Latin',
    meaning: '神圣',
    meaningEn: 'sacred',
    description: `sacr/secr 代表「神圣」。sacred（神圣的）、sacrifice（牺牲）= sacr（神圣）+ -ifice（做）→ 为神做的事 → 牺牲。consecrate（奉献）= con-（完全）+ secr（神圣）+ -ate → 使完全神圣 → 奉献。`,
    examples: [
      {
        word: 'sacred',
        breakdown: { prefix: '', root: 'sacr', suffix: 'ed' },
        meaning: '神圣的',
        explanation: '神圣的'
      },
      {
        word: 'sacrifice',
        breakdown: { prefix: '', root: 'sacr', suffix: 'ifice' },
        meaning: '牺牲',
        explanation: '神圣做→牺牲'
      },
      {
        word: 'secret',
        breakdown: { prefix: '', root: 'secr', suffix: 'et' },
        meaning: '秘密',
        explanation: '神圣→秘密'
      }
    ],
    quiz: {
    question: 'secret 的意思是什么？',
    options: ["神圣的", "牺牲", "向外", "秘密"],
    correctAnswer: 3
  }
  },

  {
    id: 186,
    root: 'sat',
    origin: 'Latin',
    meaning: '足够',
    meaningEn: 'enough',
    description: `sat 代表「足够」。satisfy（满足）= sat（足够）+ -isfy → 使足够 → 满足。saturate（饱和）= sat（足够）+ -urate → 达到足够的程度 → 饱和。insatiable（贪得无厌的）= in-（不）+ sat（足够）+ -iable → 永不满足的。`,
    examples: [
      {
        word: 'satisfy',
        breakdown: { prefix: '', root: 'sat', suffix: 'isfy' },
        meaning: '满足',
        explanation: '足够做→满足'
      },
      {
        word: 'saturate',
        breakdown: { prefix: '', root: 'sat', suffix: 'urate' },
        meaning: '饱和',
        explanation: '足够→饱和'
      },
      {
        word: 'insatiable',
        breakdown: { prefix: 'in', root: 'sat', suffix: 'iable' },
        meaning: '贪得无厌',
        explanation: '不足够→贪得无厌'
      }
    ],
    quiz: {
    question: 'insatiable 的意思是什么？',
    options: ["满足", "饱和", "贪得无厌", "相反"],
    correctAnswer: 2
  }
  },

  {
    id: 187,
    root: 'sci',
    origin: 'Latin',
    meaning: '知道',
    meaningEn: 'know',
    description: `sci 代表「知道」。science（科学）= sci（知道）+ -ence → 知识。conscience（良心）= con-（一起）+ sci（知道）+ -ence → 内心知道的东西 → 良心。conscious（有意识的）= con-（一起）+ sci（知道）+ -ous → 知道的 → 有意识的。`,
    examples: [
      {
        word: 'science',
        breakdown: { prefix: '', root: 'sci', suffix: 'ence' },
        meaning: '科学',
        explanation: '知识→科学'
      },
      {
        word: 'conscious',
        breakdown: { prefix: 'con', root: 'sci', suffix: 'ous' },
        meaning: '意识到的',
        explanation: '一起知→意识到'
      },
      {
        word: 'conscience',
        breakdown: { prefix: 'con', root: 'sci', suffix: 'ence' },
        meaning: '良心',
        explanation: '一起知→良心'
      }
    ],
    quiz: {
    question: 'science 的意思是什么？',
    options: ["良心", "科学", "下方", "意识到的"],
    correctAnswer: 1
  }
  },

  {
    id: 188,
    root: 'sequ/secu',
    origin: 'Latin',
    meaning: '跟随',
    meaningEn: 'follow',
    description: `sequ/secu 代表「跟随」。sequence（顺序）、consequence（结果）= con-（一起）+ sequ（跟随）+ -ence → 跟随而来的东西 → 结果。execute（执行）= ex-（向外）+ secu（跟随）+ -te → 跟着做出来 → 执行。`,
    examples: [
      {
        word: 'sequence',
        breakdown: { prefix: '', root: 'sequ', suffix: 'ence' },
        meaning: '顺序',
        explanation: '跟随→顺序'
      },
      {
        word: 'consequence',
        breakdown: { prefix: 'con', root: 'sequ', suffix: 'ence' },
        meaning: '结果',
        explanation: '跟着来→结果'
      },
      {
        word: 'execute',
        breakdown: { prefix: 'ex', root: 'ecu', suffix: 'te' },
        meaning: '执行',
        explanation: '跟着做→执行'
      },
      {
        word: 'pursue',
        breakdown: { prefix: 'pur', root: 'sue', suffix: '' },
        meaning: '追求',
        explanation: '跟着→追求'
      }
    ],
    quiz: {
    question: 'sequence 的意思是什么？',
    options: ["结果", "顺序", "执行", "追求"],
    correctAnswer: 1
  }
  },

  {
    id: 189,
    root: 'sid/sess',
    origin: 'Latin',
    meaning: '坐',
    meaningEn: 'sit',
    description: `sid/sess 代表「坐」。sit 来自同源。session（会议）= sess（坐）+ -ion → 坐在一起 → 会议。resident（居民）= re-（反复）+ sid（坐）+ -ent → 反复坐在那里的人 → 居民。preside（主持）= pre-（在前）+ sid（坐）→ 坐在前面 → 主持。`,
    examples: [
      {
        word: 'reside',
        breakdown: { prefix: 're', root: 'sid', suffix: 'e' },
        meaning: '居住',
        explanation: '坐着→居住'
      },
      {
        word: 'preside',
        breakdown: { prefix: 'pre', root: 'sid', suffix: 'e' },
        meaning: '主持',
        explanation: '坐在前→主持'
      },
      {
        word: 'session',
        breakdown: { prefix: '', root: 'sess', suffix: 'ion' },
        meaning: '会议',
        explanation: '坐→会议'
      },
      {
        word: 'possess',
        breakdown: { prefix: 'pos', root: 'sess', suffix: '' },
        meaning: '拥有',
        explanation: '坐在旁→拥有'
      }
    ],
    quiz: {
    question: 'preside 的意思是什么？',
    options: ["主持", "会议", "居住", "拥有"],
    correctAnswer: 0
  }
  },

  {
    id: 190,
    root: 'simil/sembl',
    origin: 'Latin',
    meaning: '相似',
    meaningEn: 'like',
    description: `simil/sembl 代表「相似」。similar（相似的）、resemble（类似）= re-（再）+ sembl（相似）→ 再次相似 → 类似。assemble（组装）= as-（向）+ sembl（一起）→ 聚集在一起 → 组装。simulate（模拟）= simul（相似）+ -ate → 做得相似 → 模拟。`,
    examples: [
      {
        word: 'similar',
        breakdown: { prefix: '', root: 'simil', suffix: 'ar' },
        meaning: '相似',
        explanation: '相似'
      },
      {
        word: 'assimilate',
        breakdown: { prefix: 'as', root: 'simil', suffix: 'ate' },
        meaning: '吸收',
        explanation: '使相似→吸收'
      },
      {
        word: 'resemble',
        breakdown: { prefix: 're', root: 'sembl', suffix: 'e' },
        meaning: '像',
        explanation: '再相似→像'
      },
      {
        word: 'simulate',
        breakdown: { prefix: '', root: 'simul', suffix: 'ate' },
        meaning: '模拟',
        explanation: '相似→模拟'
      }
    ],
    quiz: {
    question: 'assimilate 的意思是什么？',
    options: ["相似", "吸收", "像", "模拟"],
    correctAnswer: 1
  }
  },

  {
    id: 191,
    root: 'son',
    origin: 'Latin',
    meaning: '声音',
    meaningEn: 'sound',
    description: `son 代表「声音」。sound 来自同源。sonic（声音的）、resonance（共鸣）= re-（再）+ son（声音）+ -ance → 再次发声 → 共鸣。unison（一致）= uni-（一）+ son（声音）→ 一个声音 → 一致。`,
    examples: [
      {
        word: 'sound',
        breakdown: { prefix: '', root: 'son', suffix: '' },
        meaning: '声音',
        explanation: '声音'
      },
      {
        word: 'sonic',
        breakdown: { prefix: '', root: 'son', suffix: 'ic' },
        meaning: '声波的',
        explanation: '声音的→声波的'
      },
      {
        word: 'resonate',
        breakdown: { prefix: 're', root: 'son', suffix: 'ate' },
        meaning: '共鸣',
        explanation: '再响→共鸣'
      },
      {
        word: 'consonant',
        breakdown: { prefix: 'con', root: 'son', suffix: 'ant' },
        meaning: '辅音',
        explanation: '一起音→辅音'
      }
    ],
    quiz: {
    question: 'sonic 的意思是什么？',
    options: ["声波的", "辅音", "声音", "共鸣"],
    correctAnswer: 0
  }
  },

  {
    id: 192,
    root: 'soph',
    origin: 'Greek',
    meaning: '智慧',
    meaningEn: 'wisdom',
    description: `soph 代表「智慧」（希腊语）。philosophy（哲学）= philo-（爱）+ soph（智慧）+ -y → 爱智慧 → 哲学。sophisticated（复杂的、老练的）= soph（智慧）+ -isticated → 有智慧的 → 老练的。sophomore（大二学生）= soph（智慧）+ mor（愚蠢）+ -e → 一半智慧一半愚蠢 → 大二学生。`,
    examples: [
      {
        word: 'philosophy',
        breakdown: { prefix: 'philo', root: 'soph', suffix: 'y' },
        meaning: '哲学',
        explanation: '爱智慧→哲学'
      },
      {
        word: 'sophisticated',
        breakdown: { prefix: '', root: 'soph', suffix: 'isticated' },
        meaning: '复杂的',
        explanation: '有智慧→复杂的'
      },
      {
        word: 'sophomore',
        breakdown: { prefix: '', root: 'soph', suffix: 'omore' },
        meaning: '大二学生',
        explanation: '一半智慧一半愚蠢→大二学生'
      }
    ],
    quiz: {
    question: 'sophomore 的意思是什么？',
    options: ["大二学生", "复杂的", "哲学", "一起"],
    correctAnswer: 0
  }
  },

  {
    id: 193,
    root: 'spec/spic',
    origin: 'Latin',
    meaning: '看',
    meaningEn: 'look',
    description: `spec/spic 代表「看」。respect（尊重）= re-（再）+ spect（看）→ 再看一眼 → 重视。inspect（检查）= in-（向内）+ spect（看）→ 向内看 → 检查。conspicuous（显眼的）= con-（完全）+ spic（看）+ -uous → 完全能看到的 → 显眼的。`,
    examples: [
      {
        word: 'spectacle',
        breakdown: { prefix: '', root: 'spec', suffix: 'tacle' },
        meaning: '景象',
        explanation: '看→景象'
      },
      {
        word: 'suspect',
        breakdown: { prefix: 'sus', root: 'spec', suffix: 't' },
        meaning: '怀疑',
        explanation: '从下看→怀疑'
      },
      {
        word: 'conspicuous',
        breakdown: { prefix: 'con', root: 'spic', suffix: 'uous' },
        meaning: '显眼的',
        explanation: '一起看→显眼的'
      },
      {
        word: 'perspective',
        breakdown: { prefix: 'per', root: 'spec', suffix: 'tive' },
        meaning: '视角',
        explanation: '通过看→视角'
      }
    ],
    quiz: {
    question: 'suspect 的意思是什么？',
    options: ["景象", "显眼的", "怀疑", "视角"],
    correctAnswer: 2
  }
  },

  {
    id: 194,
    root: 'sphere',
    origin: 'Greek',
    meaning: '球',
    meaningEn: 'ball',
    description: `sphere 代表「球」（希腊语）。atmosphere（大气层）= atmo-（蒸汽）+ sphere（球）→ 蒸汽球 → 大气层。hemisphere（半球）= hemi-（半）+ sphere（球）→ 半个球。biosphere（生物圈）= bio-（生命）+ sphere（球）→ 生命球层。`,
    examples: [
      {
        word: 'sphere',
        breakdown: { prefix: '', root: 'sphere', suffix: '' },
        meaning: '球体',
        explanation: '球体'
      },
      {
        word: 'atmosphere',
        breakdown: { prefix: 'atmo', root: 'sphere', suffix: '' },
        meaning: '大气',
        explanation: '空气球→大气'
      },
      {
        word: 'hemisphere',
        breakdown: { prefix: 'hemi', root: 'sphere', suffix: '' },
        meaning: '半球',
        explanation: '半球→半球'
      }
    ],
    quiz: {
    question: '单词 sphere 的意思是什么？',
    options: ["半球", "大气", "提前", "球体"],
    correctAnswer: 3
  }
  },

  {
    id: 195,
    root: 'strain/strict',
    origin: 'Latin',
    meaning: '拉紧',
    meaningEn: 'draw tight',
    description: `strain/strict 代表「拉紧」。strain（拉紧）、strict（严格的）= strict（拉紧）→ 拉得紧的 → 严格的。restrict（限制）= re-（反复）+ strict（拉紧）→ 反复拉紧 → 限制。constrict（收缩）= con-（一起）+ strict（拉紧）→ 一起拉紧 → 收缩。`,
    examples: [
      {
        word: 'strain',
        breakdown: { prefix: '', root: 'strain', suffix: '' },
        meaning: '拉紧',
        explanation: '拉紧'
      },
      {
        word: 'restrain',
        breakdown: { prefix: 're', root: 'strain', suffix: '' },
        meaning: '约束',
        explanation: '再拉紧→约束'
      },
      {
        word: 'restrict',
        breakdown: { prefix: 're', root: 'strict', suffix: '' },
        meaning: '限制',
        explanation: '拉紧→限制'
      },
      {
        word: 'district',
        breakdown: { prefix: 'dis', root: 'strict', suffix: '' },
        meaning: '区域',
        explanation: '拉开→区域'
      }
    ],
    quiz: {
    question: 'restrain 的意思是什么？',
    options: ["区域", "拉紧", "约束", "否定含义"],
    correctAnswer: 2
  }
  },

  {
    id: 196,
    root: 'sum/sumpt',
    origin: 'Latin',
    meaning: '拿取',
    meaningEn: 'take',
    description: `sum/sumpt 代表「拿取」。consume（消费）= con-（完全）+ sum（拿）→ 完全拿走 → 消费。assume（假设）= as-（向）+ sum（拿）→ 拿来（作为前提）→ 假设。presume（假定）= pre-（提前）+ sum（拿）→ 提前拿来 → 假定。`,
    examples: [
      {
        word: 'assume',
        breakdown: { prefix: 'as', root: 'sum', suffix: 'e' },
        meaning: '假设',
        explanation: '拿来作为前提→假设'
      },
      {
        word: 'consume',
        breakdown: { prefix: 'con', root: 'sum', suffix: 'e' },
        meaning: '消费',
        explanation: '一起拿→消费'
      },
      {
        word: 'presume',
        breakdown: { prefix: 'pre', root: 'sum', suffix: 'e' },
        meaning: '假定',
        explanation: '预先拿→假定'
      },
      {
        word: 'resume',
        breakdown: { prefix: 're', root: 'sum', suffix: 'e' },
        meaning: '恢复',
        explanation: '再拿→恢复'
      }
    ],
    quiz: {
    question: 'presume 的意思是什么？',
    options: ["消费", "假设", "恢复", "假定"],
    correctAnswer: 3
  }
  },

  {
    id: 197,
    root: 'tain/ten/tin',
    origin: 'Latin',
    meaning: '持有',
    meaningEn: 'hold',
    description: `tain/ten/tin 代表「持有、保持」。contain（包含）= con-（一起）+ tain（持有）→ 持有在一起 → 包含。maintain（维持）= main-（手）+ tain（持有）→ 用手持有 → 维持。continue（继续）= con-（一起）+ tin（持有）+ -ue → 持续持有 → 继续。`,
    examples: [
      {
        word: 'sustain',
        breakdown: { prefix: 'sus', root: 'tain', suffix: '' },
        meaning: '维持',
        explanation: '从下持→维持'
      },
      {
        word: 'retain',
        breakdown: { prefix: 're', root: 'tain', suffix: '' },
        meaning: '保留',
        explanation: '再持→保留'
      },
      {
        word: 'entertain',
        breakdown: { prefix: 'enter', root: 'tain', suffix: '' },
        meaning: '娱乐',
        explanation: '在内持→娱乐'
      },
      {
        word: 'continue',
        breakdown: { prefix: 'con', root: 'tin', suffix: 'ue' },
        meaning: '继续',
        explanation: '一起持→继续'
      }
    ],
    quiz: {
    question: 'retain 的意思是什么？',
    options: ["保留", "娱乐", "继续", "维持"],
    correctAnswer: 0
  }
  },

  {
    id: 198,
    root: 'techn',
    origin: 'Greek',
    meaning: '技术',
    meaningEn: 'art, skill',
    description: `techn 代表「技术」（希腊语）。technology（技术）= techn（技术）+ log（学）+ -y → 技术学。technique（技巧）= techn（技术）+ -ique → 技术方法。technician（技术员）= techn（技术）+ -ician（人）→ 技术人员。`,
    examples: [
      {
        word: 'technique',
        breakdown: { prefix: '', root: 'techn', suffix: 'ique' },
        meaning: '技术',
        explanation: '技术'
      },
      {
        word: 'technology',
        breakdown: { prefix: '', root: 'techn', suffix: 'ology' },
        meaning: '科技',
        explanation: '技术学→科技'
      },
      {
        word: 'technical',
        breakdown: { prefix: '', root: 'techn', suffix: 'ical' },
        meaning: '技术的',
        explanation: '技术的'
      }
    ],
    quiz: {
    question: 'technology 的意思是什么？',
    options: ["技术", "变成名词", "技术的", "科技"],
    correctAnswer: 3
  }
  },

  {
    id: 199,
    root: 'terr',
    origin: 'Latin',
    meaning: '地,土',
    meaningEn: 'earth, land',
    description: `terr 代表「地、土」。territory（领土）= terr（地）+ -itory → 一块土地 → 领土。terrain（地形）= terr（地）+ -ain → 土地的样子 → 地形。subterranean（地下的）= sub-（在下）+ terr（地）+ -anean → 在地下的。`,
    examples: [
      {
        word: 'territory',
        breakdown: { prefix: '', root: 'terr', suffix: 'itory' },
        meaning: '领土',
        explanation: '土地→领土'
      },
      {
        word: 'terrain',
        breakdown: { prefix: '', root: 'terr', suffix: 'ain' },
        meaning: '地形',
        explanation: '土地→地形'
      },
      {
        word: 'terrestrial',
        breakdown: { prefix: '', root: 'terr', suffix: 'estrial' },
        meaning: '陆地的',
        explanation: '土地的→陆地的'
      }
    ],
    quiz: {
    question: 'territory 的意思是什么？',
    options: ["陆地的", "做这事的人", "领土", "地形"],
    correctAnswer: 2
  }
  },

  {
    id: 200,
    root: 'test',
    origin: 'Latin',
    meaning: '证明',
    meaningEn: 'witness',
    description: `test 代表「证明、见证」。testimony（证词）= test（证明）+ -imony → 证明的话 → 证词。testify（作证）= test（证明）+ -ify → 去证明 → 作证。contest（竞赛）= con-（一起）+ test（证明）→ 一起证明（谁更强）→ 竞赛。`,
    examples: [
      {
        word: 'test',
        breakdown: { prefix: '', root: 'test', suffix: '' },
        meaning: '测试',
        explanation: '证明→测试'
      },
      {
        word: 'testify',
        breakdown: { prefix: '', root: 'test', suffix: 'ify' },
        meaning: '作证',
        explanation: '证明→作证'
      },
      {
        word: 'testimony',
        breakdown: { prefix: '', root: 'test', suffix: 'imony' },
        meaning: '证词',
        explanation: '证明→证词'
      },
      {
        word: 'attest',
        breakdown: { prefix: 'at', root: 'test', suffix: '' },
        meaning: '证实',
        explanation: '拿证据指向结论→证实'
      }
    ],
    quiz: {
    question: '单词 test 的意思是什么？',
    options: ["证实", "作证", "测试", "证词"],
    correctAnswer: 2
  }
  },

  {
    id: 201,
    root: 'theor',
    origin: 'Greek',
    meaning: '看,思考',
    meaningEn: 'see, consider',
    description: `theor 来自希腊语「看、思考」。theory（理论）= theor（思考）+ -y → 思考出来的东西 → 理论。theorem（定理）= theor（思考）+ -em → 思考得出的结论 → 定理。记住：ancient Greeks 把「看」和「思考」视为同一回事（用心眼看）。`,
    examples: [
      {
        word: 'theory',
        breakdown: { prefix: '', root: 'theor', suffix: 'y' },
        meaning: '理论',
        explanation: '思考→理论'
      },
      {
        word: 'theorem',
        breakdown: { prefix: '', root: 'theor', suffix: 'em' },
        meaning: '定理',
        explanation: '思考→定理'
      },
      {
        word: 'theoretical',
        breakdown: { prefix: '', root: 'theor', suffix: 'etical' },
        meaning: '理论的',
        explanation: '思考的→理论的'
      }
    ],
    quiz: {
    question: 'theorem 的意思是什么？',
    options: ["理论", "定理", "理论的", "可以...的"],
    correctAnswer: 1
  }
  },

  {
    id: 202,
    root: 'thes/thet',
    origin: 'Greek',
    meaning: '放置',
    meaningEn: 'put, place',
    description: `thes/thet 代表「放置」（希腊语）。thesis（论文）= thes（放置）+ -is → 放置的观点 → 论文。synthesize（合成）= syn-（一起）+ thes（放置）+ -ize → 放在一起 → 合成。hypothesis（假设）= hypo-（在下）+ thes（放置）+ -is → 放在下面的观点 → 假设（作为基础）。`,
    examples: [
      {
        word: 'thesis',
        breakdown: { prefix: '', root: 'thes', suffix: 'is' },
        meaning: '论文',
        explanation: '放置→论文'
      },
      {
        word: 'hypothesis',
        breakdown: { prefix: 'hypo', root: 'thes', suffix: 'is' },
        meaning: '假设',
        explanation: '下面放→假设'
      },
      {
        word: 'synthetic',
        breakdown: { prefix: 'syn', root: 'thet', suffix: 'ic' },
        meaning: '合成的',
        explanation: '一起放→合成的'
      }
    ],
    quiz: {
    question: 'thesis 的意思是什么？',
    options: ["论文", "合成的", "假设", "变成动词"],
    correctAnswer: 0
  }
  },

  {
    id: 203,
    root: 'tom',
    origin: 'Greek',
    meaning: '切',
    meaningEn: 'cut',
    description: `tom 代表「切」（希腊语）。atom（原子）= a-（不）+ tom（切）→ 不可再切的东西 → 原子（古希腊人认为原子是最小单位）。anatomy（解剖学）= ana-（向上）+ tom（切）+ -y → 向上切开研究 → 解剖学。`,
    examples: [
      {
        word: 'atom',
        breakdown: { prefix: 'a', root: 'tom', suffix: '' },
        meaning: '原子',
        explanation: '不可切→原子'
      },
      {
        word: 'anatomy',
        breakdown: { prefix: 'ana', root: 'tom', suffix: 'y' },
        meaning: '解剖',
        explanation: '向上切→解剖'
      },
      {
        word: 'epitome',
        breakdown: { prefix: 'epi', root: 'tom', suffix: 'e' },
        meaning: '缩影',
        explanation: '在上切→缩影'
      }
    ],
    quiz: {
    question: 'epitome 的意思是什么？',
    options: ["原子", "解剖", "缩影", "相关场所"],
    correctAnswer: 2
  }
  },

  {
    id: 204,
    root: 'tour/torn',
    origin: 'Latin',
    meaning: '转',
    meaningEn: 'turn',
    description: `tour/torn 代表「转」。tour（旅行）原意「转一圈」。tournament（锦标赛）= tourn（转）+ -ament → 骑士转着打比武 → 锦标赛。detour（绕道）= de-（离开）+ tour（转）→ 转离主路 → 绕道。attorney（律师）= at-（向）+ torn（转）+ -ey → 转向（代表）别人的人 → 律师。`,
    examples: [
      {
        word: 'tour',
        breakdown: { prefix: '', root: 'tour', suffix: '' },
        meaning: '旅游',
        explanation: '转→旅游'
      },
      {
        word: 'return',
        breakdown: { prefix: 're', root: 'turn', suffix: '' },
        meaning: '返回',
        explanation: '再转→返回'
      },
      {
        word: 'attorney',
        breakdown: { prefix: 'at', root: 'torn', suffix: 'ey' },
        meaning: '律师',
        explanation: '转向→律师'
      }
    ],
    quiz: {
    question: 'return 的意思是什么？',
    options: ["旅游", "律师", "状态", "返回"],
    correctAnswer: 3
  }
  },

  {
    id: 205,
    root: 'trad',
    origin: 'Latin',
    meaning: '给予',
    meaningEn: 'give',
    description: `trad 代表「给予、交付」。trade（贸易）= trad（交付）+ -e → 互相交付 → 贸易。tradition（传统）= trad（交付）+ -ition → 代代交付下来的东西 → 传统。betray（背叛）= be-（完全）+ tray（交付）→ 把秘密交出去 → 背叛。`,
    examples: [
      {
        word: 'tradition',
        breakdown: { prefix: '', root: 'trad', suffix: 'ition' },
        meaning: '传统',
        explanation: '给予→传统'
      },
      {
        word: 'trade',
        breakdown: { prefix: '', root: 'trad', suffix: 'e' },
        meaning: '贸易',
        explanation: '给予→贸易'
      },
      {
        word: 'betray',
        breakdown: { prefix: 'be', root: 'tray', suffix: '' },
        meaning: '背叛',
        explanation: '给出→背叛'
      }
    ],
    quiz: {
    question: 'betray 的意思是什么？',
    options: ["背叛", "向外", "传统", "贸易"],
    correctAnswer: 0
  }
  },

  {
    id: 206,
    root: 'tribute',
    origin: 'Latin',
    meaning: '给予',
    meaningEn: 'give',
    description: `tribute 代表「给予、贡献」。tribute（贡品）、contribute（贡献）= con-（一起）+ tribute（给予）→ 一起给予 → 贡献。distribute（分发）= dis-（分开）+ tribute（给予）→ 分开给予 → 分发。attribute（归因于）= at-（向）+ tribute（给予）→ 给予（原因）→ 归因。`,
    examples: [
      {
        word: 'contribute',
        breakdown: { prefix: 'con', root: 'tribute', suffix: '' },
        meaning: '贡献',
        explanation: '一起给→贡献'
      },
      {
        word: 'distribute',
        breakdown: { prefix: 'dis', root: 'tribute', suffix: '' },
        meaning: '分配',
        explanation: '分开给→分配'
      },
      {
        word: 'attribute',
        breakdown: { prefix: 'at', root: 'tribute', suffix: '' },
        meaning: '归因',
        explanation: '把原因给予某对象→归因'
      }
    ],
    quiz: {
    question: 'distribute 的意思是什么？',
    options: ["分配", "贡献", "归因", "相反"],
    correctAnswer: 0
  }
  },

  {
    id: 207,
    root: 'trit',
    origin: 'Latin',
    meaning: '磨擦',
    meaningEn: 'rub',
    description: `trit 代表「磨擦、磨碎」。attrition（消耗）= at-（向）+ trit（磨）+ -ion → 磨损 → 消耗。contrite（悔恨的）= con-（完全）+ trit（磨）+ -e → 心灵被完全磨碎的 → 悔恨的。detritus（碎屑）= de-（向下）+ trit（磨）+ -us → 磨下来的东西 → 碎屑。`,
    examples: [
      {
        word: 'attrition',
        breakdown: { prefix: 'at', root: 'trit', suffix: 'ion' },
        meaning: '磨损',
        explanation: '磨擦→磨损'
      },
      {
        word: 'contrite',
        breakdown: { prefix: 'con', root: 'trit', suffix: 'e' },
        meaning: '悔恨的',
        explanation: '磨碎→悔恨的'
      },
      {
        word: 'detritus',
        breakdown: { prefix: 'de', root: 'trit', suffix: 'us' },
        meaning: '碎屑',
        explanation: '磨下→碎屑'
      }
    ],
    quiz: {
    question: 'contrite 的意思是什么？',
    options: ["悔恨的", "碎屑", "磨损", "下方"],
    correctAnswer: 0
  }
  },

  {
    id: 208,
    root: 'trop',
    origin: 'Greek',
    meaning: '转',
    meaningEn: 'turn',
    description: `trop 代表「转」（希腊语）。tropical（热带的）= trop（转）+ -ical → 太阳转到最高处的地方 → 热带。otropism（向性）= trop（转）+ -ism → 植物朝某方向转 → 向性。entropy（熵）= en-（内）+ trop（转）+ -y → 内部转变 → 熵（热力学概念）。`,
    examples: [
      {
        word: 'trophy',
        breakdown: { prefix: '', root: 'trop', suffix: 'hy' },
        meaning: '奖杯',
        explanation: '转变→奖杯'
      },
      {
        word: 'tropical',
        breakdown: { prefix: '', root: 'trop', suffix: 'ical' },
        meaning: '热带的',
        explanation: '转回点→热带的'
      },
      {
        word: 'entropy',
        breakdown: { prefix: 'en', root: 'trop', suffix: 'y' },
        meaning: '熵',
        explanation: '向内转→熵'
      }
    ],
    quiz: {
    question: 'entropy 的意思是什么？',
    options: ["熵", "一起", "热带的", "奖杯"],
    correctAnswer: 0
  }
  },

  {
    id: 209,
    root: 'turb',
    origin: 'Latin',
    meaning: '搅动',
    meaningEn: 'stir',
    description: `turb 代表「搅动、混乱」。disturb（打扰）= dis-（分开）+ turb（搅动）→ 搅乱 → 打扰。turbulent（动荡的）= turb（搅动）+ -ulent → 搅动的 → 动荡的。perturb（使不安）= per-（完全）+ turb（搅动）→ 完全搅乱 → 使不安。`,
    examples: [
      {
        word: 'disturb',
        breakdown: { prefix: 'dis', root: 'turb', suffix: '' },
        meaning: '打扰',
        explanation: '分开搅→打扰'
      },
      {
        word: 'turbulent',
        breakdown: { prefix: '', root: 'turb', suffix: 'ulent' },
        meaning: '动荡的',
        explanation: '搅动的→动荡的'
      },
      {
        word: 'perturb',
        breakdown: { prefix: 'per', root: 'turb', suffix: '' },
        meaning: '使不安',
        explanation: '完全搅→使不安'
      }
    ],
    quiz: {
    question: 'perturb 的意思是什么？',
    options: ["提前", "使不安", "打扰", "动荡的"],
    correctAnswer: 1
  }
  },

  {
    id: 210,
    root: 'typ',
    origin: 'Greek',
    meaning: '类型',
    meaningEn: 'type',
    description: `typ 代表「类型、印记」（希腊语）。type（类型）、typical（典型的）= typ（类型）+ -ical → 属于某类型的。prototype（原型）= proto-（最初）+ typ（类型）+ -e → 最初的类型 → 原型。stereotype（刻板印象）= stereo-（固定）+ typ（印）+ -e → 固定的印象。`,
    examples: [
      {
        word: 'type',
        breakdown: { prefix: '', root: 'typ', suffix: 'e' },
        meaning: '类型',
        explanation: '类型'
      },
      {
        word: 'typical',
        breakdown: { prefix: '', root: 'typ', suffix: 'ical' },
        meaning: '典型的',
        explanation: '类型的→典型的'
      },
      {
        word: 'prototype',
        breakdown: { prefix: 'proto', root: 'typ', suffix: 'e' },
        meaning: '原型',
        explanation: '最初类型→原型'
      }
    ],
    quiz: {
    question: 'typical 的意思是什么？',
    options: ["类型", "否定含义", "典型的", "原型"],
    correctAnswer: 2
  }
  },

  {
    id: 211,
    root: 'val',
    origin: 'Latin',
    meaning: '价值,强',
    meaningEn: 'worth, strong',
    description: `val 代表「价值、强」。value（价值）、valid（有效的）= val（强）+ -id → 强有力的 → 有效的。prevalent（流行的）= pre-（在前）+ val（强）+ -ent → 力量在前的 → 流行的。evaluate（评估）= e-（向外）+ val（价值）+ -uate → 看出价值 → 评估。`,
    examples: [
      {
        word: 'value',
        breakdown: { prefix: '', root: 'val', suffix: 'ue' },
        meaning: '价值',
        explanation: '价值'
      },
      {
        word: 'valid',
        breakdown: { prefix: '', root: 'val', suffix: 'id' },
        meaning: '有效的',
        explanation: '强的→有效的'
      },
      {
        word: 'equivalent',
        breakdown: { prefix: 'equi', root: 'val', suffix: 'ent' },
        meaning: '相等的',
        explanation: '等价→相等的'
      }
    ],
    quiz: {
    question: 'valid 的意思是什么？',
    options: ["变成名词", "有效的", "相等的", "价值"],
    correctAnswer: 1
  }
  },

  {
    id: 212,
    root: 'var',
    origin: 'Latin',
    meaning: '变化',
    meaningEn: 'change',
    description: `var 代表「变化」。vary（变化）、variable（变量）= var（变化）+ -iable → 可变化的东西 → 变量。various（各种各样的）= var（变化）+ -ious → 变化多端的。invariable（不变的）= in-（不）+ var（变化）+ -iable → 不变的。`,
    examples: [
      {
        word: 'vary',
        breakdown: { prefix: '', root: 'var', suffix: 'y' },
        meaning: '变化',
        explanation: '变化'
      },
      {
        word: 'various',
        breakdown: { prefix: '', root: 'var', suffix: 'ious' },
        meaning: '各种各样',
        explanation: '变化的→各种'
      },
      {
        word: 'variety',
        breakdown: { prefix: '', root: 'var', suffix: 'iety' },
        meaning: '多样性',
        explanation: '变化→多样性'
      }
    ],
    quiz: {
    question: 'vary 的意思是什么？',
    options: ["各种各样", "做这事的人", "变化", "多样性"],
    correctAnswer: 2
  }
  },

  {
    id: 213,
    root: 'vac/van',
    origin: 'Latin',
    meaning: '空',
    meaningEn: 'empty',
    description: `vac/van 代表「空」。vacant（空的）、vacuum（真空）= vac（空）+ -uum。vanish（消失）= van（空）+ -ish → 变空 → 消失。evacuate（撤离）= e-（向外）+ vac（空）+ -uate → 把空间清空 → 撤离。`,
    examples: [
      {
        word: 'vacant',
        breakdown: { prefix: '', root: 'vac', suffix: 'ant' },
        meaning: '空的',
        explanation: '空的'
      },
      {
        word: 'vacation',
        breakdown: { prefix: '', root: 'vac', suffix: 'ation' },
        meaning: '假期',
        explanation: '空闲→假期'
      },
      {
        word: 'vanish',
        breakdown: { prefix: '', root: 'van', suffix: 'ish' },
        meaning: '消失',
        explanation: '空→消失'
      }
    ],
    quiz: {
    question: 'vanish 的意思是什么？',
    options: ["空的", "假期", "消失", "可以...的"],
    correctAnswer: 2
  }
  },

  {
    id: 214,
    root: 'vail/val',
    origin: 'Latin',
    meaning: '价值',
    meaningEn: 'value',
    description: `vail/val 代表「价值、力量」。available（可用的）= a-（向）+ vail（价值）+ -able → 有价值可用的。prevail（盛行）= pre-（在前）+ vail（力量）→ 力量在前 → 盛行。equivalent（等价的）= equi-（相等）+ val（价值）+ -ent → 价值相等的。`,
    examples: [
      {
        word: 'avail',
        breakdown: { prefix: 'a', root: 'vail', suffix: '' },
        meaning: '有用',
        explanation: '有价值→有用'
      },
      {
        word: 'prevail',
        breakdown: { prefix: 'pre', root: 'vail', suffix: '' },
        meaning: '盛行',
        explanation: '提前价值→盛行'
      },
      {
        word: 'evaluate',
        breakdown: { prefix: 'e', root: 'val', suffix: 'uate' },
        meaning: '评估',
        explanation: '向外价值→评估'
      }
    ],
    quiz: {
    question: 'prevail 的意思是什么？',
    options: ["变成动词", "评估", "有用", "盛行"],
    correctAnswer: 3
  }
  },

  {
    id: 215,
    root: 'veh/vect',
    origin: 'Latin',
    meaning: '运送',
    meaningEn: 'carry',
    description: `veh/vect 代表「运送」。vehicle（车辆）= veh（运送）+ -icle → 运送工具 → 车辆。vector（向量）= vect（运送）+ -or → 运送的方向 → 向量。convey（传达）= con-（一起）+ vey（运送）→ 运送过去 → 传达。`,
    examples: [
      {
        word: 'vehicle',
        breakdown: { prefix: '', root: 'veh', suffix: 'icle' },
        meaning: '车辆',
        explanation: '运送→车辆'
      },
      {
        word: 'vector',
        breakdown: { prefix: '', root: 'vect', suffix: 'or' },
        meaning: '矢量',
        explanation: '运送者→矢量'
      },
      {
        word: 'convey',
        breakdown: { prefix: 'con', root: 'vey', suffix: '' },
        meaning: '传达',
        explanation: '一起运→传达'
      }
    ],
    quiz: {
    question: 'vector 的意思是什么？',
    options: ["传达", "相关场所", "矢量", "车辆"],
    correctAnswer: 2
  }
  },

  {
    id: 216,
    root: 'venge',
    origin: 'Latin',
    meaning: '报复',
    meaningEn: 'avenge',
    description: `venge 代表「报复」。revenge（复仇）= re-（反）+ venge（报复）→ 反向报复 → 复仇。avenge（为...报仇）= a-（向）+ venge（报复）→ 向某人报复 → 为...报仇。vengeance（复仇心）= venge（报复）+ -ance → 报复之心。`,
    examples: [
      {
        word: 'revenge',
        breakdown: { prefix: 're', root: 'venge', suffix: '' },
        meaning: '报复',
        explanation: '报复'
      },
      {
        word: 'avenge',
        breakdown: { prefix: 'a', root: 'venge', suffix: '' },
        meaning: '为...报仇',
        explanation: '报复'
      },
      {
        word: 'vengeance',
        breakdown: { prefix: '', root: 'venge', suffix: 'ance' },
        meaning: '复仇',
        explanation: '报复→复仇'
      }
    ],
    quiz: {
    question: 'vengeance 的意思是什么？',
    options: ["状态", "报复", "复仇", "为...报仇"],
    correctAnswer: 2
  }
  },

  {
    id: 217,
    root: 'verg',
    origin: 'Latin',
    meaning: '倾向',
    meaningEn: 'incline',
    description: `verg 代表「倾向、转向」。converge（汇聚）= con-（一起）+ verg（转）→ 转到一起 → 汇聚。diverge（分歧）= di-（分开）+ verg（转）→ 转向不同方向 → 分歧。verge（边缘）= verg（转）+ -e → 转折点 → 边缘。`,
    examples: [
      {
        word: 'verge',
        breakdown: { prefix: '', root: 'verg', suffix: 'e' },
        meaning: '边缘',
        explanation: '倾向→边缘'
      },
      {
        word: 'converge',
        breakdown: { prefix: 'con', root: 'verg', suffix: 'e' },
        meaning: '汇聚',
        explanation: '一起倾→汇聚'
      },
      {
        word: 'diverge',
        breakdown: { prefix: 'di', root: 'verg', suffix: 'e' },
        meaning: '分歧',
        explanation: '分开倾→分歧'
      }
    ],
    quiz: {
    question: 'converge 的意思是什么？',
    options: ["分歧", "向外", "汇聚", "边缘"],
    correctAnswer: 2
  }
  },

  {
    id: 218,
    root: 'vi/via',
    origin: 'Latin',
    meaning: '路',
    meaningEn: 'way',
    description: `vi/via 代表「路」。via（经由）、deviate（偏离）= de-（离开）+ vi（路）+ -ate → 离开道路 → 偏离。obvious（明显的）= ob-（在前）+ vi（路）+ -ous → 挡在路上/摆在面前的 → 明显的。previous（以前的）= pre-（在前）+ vi（路）+ -ous → 在路前面的 → 以前的。`,
    examples: [
      {
        word: 'via',
        breakdown: { prefix: '', root: 'via', suffix: '' },
        meaning: '通过',
        explanation: '路→通过'
      },
      {
        word: 'obvious',
        breakdown: { prefix: 'ob', root: 'vi', suffix: 'ous' },
        meaning: '明显的',
        explanation: '挡在路上/摆在面前→明显的'
      },
      {
        word: 'deviate',
        breakdown: { prefix: 'de', root: 'via', suffix: 'te' },
        meaning: '偏离',
        explanation: '离开路→偏离'
      }
    ],
    quiz: {
    question: 'deviate 的意思是什么？',
    options: ["偏离", "相反", "明显的", "通过"],
    correctAnswer: 0
  }
  },

  {
    id: 219,
    root: 'viol',
    origin: 'Latin',
    meaning: '力,伤害',
    meaningEn: 'force, harm',
    description: `viol 代表「力量、伤害」。violence（暴力）= viol（力）+ -ence → 使用力量 → 暴力。violate（违反）= viol（伤害）+ -ate → 伤害（规则）→ 违反。inviolate（未受侵犯的）= in-（不）+ viol（伤害）+ -ate → 未被伤害的。`,
    examples: [
      {
        word: 'violence',
        breakdown: { prefix: '', root: 'viol', suffix: 'ence' },
        meaning: '暴力',
        explanation: '力→暴力'
      },
      {
        word: 'violate',
        breakdown: { prefix: '', root: 'viol', suffix: 'ate' },
        meaning: '违反',
        explanation: '用力→违反'
      },
      {
        word: 'inviolate',
        breakdown: { prefix: 'in', root: 'viol', suffix: 'ate' },
        meaning: '不受侵犯',
        explanation: '不伤害→不受侵犯'
      }
    ],
    quiz: {
    question: 'violence 的意思是什么？',
    options: ["不受侵犯", "违反", "下方", "暴力"],
    correctAnswer: 3
  }
  },

  {
    id: 220,
    root: 'vir',
    origin: 'Latin',
    meaning: '男人,美德',
    meaningEn: 'man, virtue',
    description: `vir 代表「男人、美德」。virtue（美德）原意「男子气概」。virile（有男子气概的）= vir（男人）+ -ile → 男人的 → 有男子气概的。`,
    examples: [
      {
        word: 'virtue',
        breakdown: { prefix: '', root: 'vir', suffix: 'tue' },
        meaning: '美德',
        explanation: '男人→美德'
      },
      {
        word: 'virile',
        breakdown: { prefix: '', root: 'vir', suffix: 'ile' },
        meaning: '有男子气概',
        explanation: '男人的→男子气概'
      }
    ],
    quiz: {
    question: 'virile 的意思是什么？',
    options: ["虚拟的", "一起", "有男子气概", "美德"],
    correctAnswer: 2
  }
  },

  {
    id: 221,
    root: '-age',
    origin: 'French',
    meaning: '变成名词',
    meaningEn: 'state, action',
    description: `-age 是法语后缀，代表「状态、行为、结果」。package（包裹）= pack（打包）+ -age → 打包的结果。storage（储存）= store（储存）+ -age → 储存的状态。courage（勇气）= cor（心）+ -age → 心的状态 → 勇气。`,
    examples: [
      {
        word: 'storage',
        breakdown: { prefix: '', root: 'stor', suffix: 'age' },
        meaning: '存储',
        explanation: '存储状态'
      },
      {
        word: 'package',
        breakdown: { prefix: '', root: 'pack', suffix: 'age' },
        meaning: '包裹',
        explanation: '打包行为'
      },
      {
        word: 'damage',
        breakdown: { prefix: '', root: 'dam', suffix: 'age' },
        meaning: '损害',
        explanation: '损害状态'
      }
    ],
    quiz: {
    question: 'storage 的意思是什么？',
    options: ["包裹", "损害", "提前", "存储"],
    correctAnswer: 3
  }
  },

  {
    id: 222,
    root: '-ary/-ery/-ory',
    origin: 'Latin',
    meaning: '相关场所 / 形容词',
    meaningEn: 'place, person',
    description: `-ary/-ery/-ory 代表「地方、与...相关的人或物」。library（图书馆）= libr（书）+ -ary → 书的地方。bakery（面包店）= bake（烘焙）+ -ery → 烘焙的地方。factory（工厂）= fact（做）+ -ory → 做东西的地方。`,
    examples: [
      {
        word: 'library',
        breakdown: { prefix: '', root: 'libr', suffix: 'ary' },
        meaning: '图书馆',
        explanation: '书的地方'
      },
      {
        word: 'bakery',
        breakdown: { prefix: '', root: 'bak', suffix: 'ery' },
        meaning: '面包店',
        explanation: '烤的地方'
      },
      {
        word: 'factory',
        breakdown: { prefix: '', root: 'fact', suffix: 'ory' },
        meaning: '工厂',
        explanation: '做的地方'
      }
    ],
    quiz: {
    question: 'library 的意思是什么？',
    options: ["否定含义", "图书馆", "工厂", "面包店"],
    correctAnswer: 1
  }
  },

  {
    id: 223,
    root: '-dom',
    origin: 'Old English',
    meaning: '领域 / 状态',
    meaningEn: 'state, domain',
    description: `-dom 是古英语后缀，代表「状态、领域」。freedom（自由）= free（自由）+ -dom → 自由的状态。kingdom（王国）= king（国王）+ -dom → 国王的领域。wisdom（智慧）= wise（智慧）+ -dom → 智慧的状态。`,
    examples: [
      {
        word: 'freedom',
        breakdown: { prefix: '', root: 'free', suffix: 'dom' },
        meaning: '自由',
        explanation: '自由状态'
      },
      {
        word: 'kingdom',
        breakdown: { prefix: '', root: 'king', suffix: 'dom' },
        meaning: '王国',
        explanation: '国王领域'
      },
      {
        word: 'wisdom',
        breakdown: { prefix: '', root: 'wis', suffix: 'dom' },
        meaning: '智慧',
        explanation: '智慧状态'
      }
    ],
    quiz: {
    question: 'wisdom 的意思是什么？',
    options: ["智慧", "变成名词", "自由", "王国"],
    correctAnswer: 0
  }
  },

  {
    id: 224,
    root: '-en',
    origin: 'Old English',
    meaning: '变成动词',
    meaningEn: 'make, become',
    description: `-en 是古英语后缀，代表「使、变成」。widen（加宽）= wide（宽）+ -en → 使变宽。shorten（缩短）= short（短）+ -en → 使变短。strengthen（加强）= strength（力量）+ -en → 使变强。`,
    examples: [
      {
        word: 'soften',
        breakdown: { prefix: '', root: 'soft', suffix: 'en' },
        meaning: '使软化',
        explanation: '使软'
      },
      {
        word: 'strengthen',
        breakdown: { prefix: '', root: 'strength', suffix: 'en' },
        meaning: '加强',
        explanation: '使强'
      },
      {
        word: 'widen',
        breakdown: { prefix: '', root: 'wid', suffix: 'en' },
        meaning: '加宽',
        explanation: '使宽'
      }
    ],
    quiz: {
    question: 'soften 的意思是什么？',
    options: ["加强", "使软化", "做这事的人", "加宽"],
    correctAnswer: 1
  }
  },

  {
    id: 225,
    root: '-er/-or',
    origin: 'Latin',
    meaning: '人,物',
    meaningEn: 'person, thing',
    description: `-er/-or 代表「做...的人或物」。teacher（老师）= teach（教）+ -er → 教书的人。actor（演员）= act（表演）+ -or → 表演的人。computer（计算机）= compute（计算）+ -er → 计算的机器。`,
    examples: [
      {
        word: 'teacher',
        breakdown: { prefix: '', root: 'teach', suffix: 'er' },
        meaning: '教师',
        explanation: '教的人'
      },
      {
        word: 'actor',
        breakdown: { prefix: '', root: 'act', suffix: 'or' },
        meaning: '演员',
        explanation: '行动的人'
      },
      {
        word: 'computer',
        breakdown: { prefix: 'com', root: 'put', suffix: 'er' },
        meaning: '计算机',
        explanation: '计算的物'
      }
    ],
    quiz: {
    question: 'computer 的意思是什么？',
    options: ["计算机", "可以...的", "演员", "教师"],
    correctAnswer: 0
  }
  },

  {
    id: 226,
    root: '-ess',
    origin: 'Latin',
    meaning: '女性身份',
    meaningEn: 'female',
    description: `-ess 代表「女性」。actress（女演员）= actor（演员）+ -ess → 女性演员。princess（公主）= prince（王子）+ -ess → 女性王子。lioness（母狮）= lion（狮子）+ -ess → 女性狮子。`,
    examples: [
      {
        word: 'actress',
        breakdown: { prefix: '', root: 'act', suffix: 'ress' },
        meaning: '女演员',
        explanation: '女性演员'
      },
      {
        word: 'waitress',
        breakdown: { prefix: '', root: 'wait', suffix: 'ress' },
        meaning: '女服务员',
        explanation: '女性服务员'
      },
      {
        word: 'hostess',
        breakdown: { prefix: '', root: 'host', suffix: 'ess' },
        meaning: '女主人',
        explanation: '女性主人'
      }
    ],
    quiz: {
    question: 'actress 的意思是什么？',
    options: ["女演员", "女服务员", "女主人", "变成动词"],
    correctAnswer: 0
  }
  },

  {
    id: 227,
    root: '-hood',
    origin: 'Old English',
    meaning: '时期 / 状态',
    meaningEn: 'state, condition',
    description: `-hood 是古英语后缀，代表「状态、身份、时期」。childhood（童年）= child（孩子）+ -hood → 孩子的时期。neighborhood（邻里）= neighbor（邻居）+ -hood → 邻居的群体。motherhood（母亲身份）= mother（母亲）+ -hood → 母亲的状态。`,
    examples: [
      {
        word: 'childhood',
        breakdown: { prefix: '', root: 'child', suffix: 'hood' },
        meaning: '童年',
        explanation: '儿童状态'
      },
      {
        word: 'neighborhood',
        breakdown: { prefix: '', root: 'neighbor', suffix: 'hood' },
        meaning: '社区',
        explanation: '邻居状态'
      },
      {
        word: 'likelihood',
        breakdown: { prefix: '', root: 'likely', suffix: 'hood' },
        meaning: '可能性',
        explanation: '可能状态'
      }
    ],
    quiz: {
    question: 'likelihood 的意思是什么？',
    options: ["可能性", "社区", "相关场所", "童年"],
    correctAnswer: 0
  }
  },

  {
    id: 228,
    root: '-ic/-ical',
    origin: 'Greek',
    meaning: '变成形容词',
    meaningEn: 'of, pertaining to',
    description: `-ic/-ical 来自希腊语，代表「...的」。historic（历史的）= histor（历史）+ -ic → 历史的。logical（逻辑的）= log（逻辑）+ -ical → 逻辑的。automatic（自动的）= auto（自己）+ mat（动）+ -ic → 自己动的。`,
    examples: [
      {
        word: 'electric',
        breakdown: { prefix: '', root: 'electr', suffix: 'ic' },
        meaning: '电的',
        explanation: '电的'
      },
      {
        word: 'logical',
        breakdown: { prefix: '', root: 'log', suffix: 'ical' },
        meaning: '逻辑的',
        explanation: '逻辑的'
      },
      {
        word: 'basic',
        breakdown: { prefix: '', root: 'bas', suffix: 'ic' },
        meaning: '基本的',
        explanation: '基础的'
      }
    ],
    quiz: {
    question: 'electric 的意思是什么？',
    options: ["电的", "逻辑的", "基本的", "状态"],
    correctAnswer: 0
  }
  },

  {
    id: 229,
    root: '-ship',
    origin: 'Old English',
    meaning: '关系 / 身份',
    meaningEn: 'state, skill',
    description: `-ship 是古英语后缀，代表「状态、技能、关系」。friendship（友谊）= friend（朋友）+ -ship → 朋友的关系。leadership（领导力）= leader（领导者）+ -ship → 领导的能力。ownership（所有权）= owner（所有者）+ -ship → 所有者的状态。`,
    examples: [
      {
        word: 'friendship',
        breakdown: { prefix: '', root: 'friend', suffix: 'ship' },
        meaning: '友谊',
        explanation: '朋友状态'
      },
      {
        word: 'leadership',
        breakdown: { prefix: '', root: 'leader', suffix: 'ship' },
        meaning: '领导',
        explanation: '领导能力'
      },
      {
        word: 'relationship',
        breakdown: { prefix: '', root: 'relation', suffix: 'ship' },
        meaning: '关系',
        explanation: '关系状态'
      }
    ],
    quiz: {
    question: 'leadership 的意思是什么？',
    options: ["友谊", "向外", "关系", "领导"],
    correctAnswer: 3
  }
  },

  {
    id: 230,
    root: '-ward',
    origin: 'Old English',
    meaning: '向...',
    meaningEn: 'toward',
    description: `-ward 是古英语后缀，代表「向...方向」。forward（向前）= for（前）+ -ward → 向前方。backward（向后）= back（后）+ -ward → 向后方。toward（朝向）= to + -ward → 朝向某处。homeward（向家）= home（家）+ -ward → 向家的方向。`,
    examples: [
      {
        word: 'forward',
        breakdown: { prefix: '', root: 'for', suffix: 'ward' },
        meaning: '向前',
        explanation: '向前'
      },
      {
        word: 'backward',
        breakdown: { prefix: '', root: 'back', suffix: 'ward' },
        meaning: '向后',
        explanation: '向后'
      },
      {
        word: 'upward',
        breakdown: { prefix: '', root: 'up', suffix: 'ward' },
        meaning: '向上',
        explanation: '向上'
      }
    ],
    quiz: {
    question: 'forward 的意思是什么？',
    options: ["向前", "相反", "向后", "向上"],
    correctAnswer: 0
  }
  },
  ...wordRootReplacements,
]

const extraExamplesById = new Map<number, WordExample>([
  [
    220,
    {
      word: 'virtuous',
      breakdown: { prefix: '', root: 'virtu', suffix: 'ous' },
      meaning: '品德高尚的',
      explanation: '美德 + 变成形容词→品德高尚的',
    },
  ],
])

export const wordRoots: WordRoot[] = baseWordRoots.map((root) => {
  const extraExample = extraExamplesById.get(root.id)

  if (!extraExample || root.examples.length >= 3) {
    return root
  }

  return {
    ...root,
    examples: [...root.examples, extraExample],
  }
})

export const totalWordRoots = wordRoots.length

export function getWordRootById(id: number) {
  return wordRoots.find((root) => root.id === id)
}
