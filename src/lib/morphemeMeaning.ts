import type { WordExample } from '@/data/wordRoots'

export type MorphemeKind = 'prefix' | 'root' | 'suffix'

const prefixMeanings: Record<string, string> = {
  a: '否定含义',
  an: '否定含义',
  anti: '反对 / 抗击',
  co: '一起 / 共同',
  com: '一起 / 共同',
  con: '一起 / 共同',
  counter: '相反 / 对抗',
  de: '向下 / 去除',
  dis: '否定含义 / 分开',
  e: '向外',
  em: '放入 / 使变成',
  en: '放入 / 使变成',
  ex: '向外 / 前任',
  fore: '提前 / 在前面',
  im: '否定含义 / 向内',
  in: '否定含义 / 向内',
  inter: '在...之间',
  micro: '微小',
  mid: '中间',
  mis: '错误',
  mono: '单一',
  non: '否定含义',
  out: '超出 / 向外',
  over: '过度 / 在上方',
  post: '在...之后',
  pre: '提前',
  pro: '向前 / 支持',
  re: '再次 / 回退',
  sub: '下方 / 次级',
  super: '超级 / 超越',
  syn: '一起 / 同步',
  tele: '远程',
  trans: '穿过 / 转换',
  un: '否定含义',
  under: '下方 / 不足',
}

const suffixMeanings: Record<string, string> = {
  able: '可以...的',
  al: '变成形容词',
  ary: '变成形容词',
  ate: '变成动词',
  ation: '变成名词',
  dom: '领域 / 状态',
  e: '词尾 / 变动词',
  ence: '变成名词',
  ent: '变成形容词 / 人',
  er: '做这事的人',
  ful: '充满...的',
  hood: '时期 / 状态',
  ia: '疾病 / 状态',
  ial: '变成形容词',
  ible: '可以...的',
  ic: '变成形容词',
  ing: '进行中 / 变名词',
  ion: '变成名词',
  ition: '变成名词',
  ism: '主义 / 思想',
  ist: '做这事的人',
  ity: '变成名词',
  ive: '变成形容词',
  ize: '变成动词',
  less: '没有...的',
  logy: '学科 / 学问',
  ly: '变成副词',
  ment: '变成名词',
  ness: '状态',
  or: '做这事的人',
  ous: '变成形容词',
  ship: '关系 / 身份',
  tic: '变成形容词',
  tion: '变成名词',
  ty: '变成名词',
  ure: '变成名词',
  y: '变成形容词 / 名词',
}

function normalizeMorpheme(value: string) {
  return value.toLowerCase().replace(/^-+|-+$/g, '')
}

function simplifyRootMeaning(value: string) {
  let text = value
    .replace(/[，。；;,.!?！？、]/g, '')
    .replace(/一个|一种|这个|那个|的$/g, '')
    .trim()

  const candidates = [
    ['不关心政治', '政治'],
    ['不道德', '道德'],
    ['无政府', '政府'],
    ['没有名字', '名字'],
    ['没有统治', '统治'],
    ['反对战争', '战争'],
    ['相反的观点', '观点'],
    ['相反的感情', '感情'],
    ['相反行动', '行动'],
    ['反向平衡', '平衡'],
  ] as const

  const match = candidates.find(([source]) => text.includes(source))
  if (match) return match[1]

  text = text
    .replace(/^不/, '')
    .replace(/^无/, '')
    .replace(/^没有/, '')
    .replace(/^反对/, '')
    .replace(/^对抗/, '')
    .replace(/^相反的?/, '')
    .replace(/^向[上下内外前后]/, '')
    .replace(/^去掉/, '')
    .replace(/^去除/, '')
    .replace(/^再次?/, '')
    .replace(/^重新?/, '')
    .replace(/^提前/, '')
    .replace(/^预先/, '')
    .replace(/^超级/, '')
    .replace(/^(过度|错误|穿过|微小|共同|一起)/, '')
    .trim()

  if (text.length > 6) return ''
  return text
}

function inferRootMeaning(example: WordExample) {
  const [leftSide] = example.explanation.split('→')
  if (!leftSide) return ''
  const meaning = simplifyRootMeaning(leftSide)
  return meaning && meaning !== example.meaning ? meaning : ''
}

export function getMorphemeMeaning(
  example: WordExample,
  kind: MorphemeKind,
  text: string,
) {
  const key = normalizeMorpheme(text)
  if (kind === 'prefix') return prefixMeanings[key] ?? ''
  if (kind === 'suffix') return suffixMeanings[key] ?? ''
  return inferRootMeaning(example)
}
