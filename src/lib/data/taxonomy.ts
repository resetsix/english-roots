import type { WordExample, WordRoot } from '$lib/data/wordRoots'

export type MorphemeKind = 'prefix' | 'root' | 'suffix'
export type OriginBucket = 'Latin' | 'Greek' | 'Old English' | 'rare'

export interface MorphemePart {
  kind: MorphemeKind
  text: string
  meaning: string
}

export interface RootPreviewExample {
  word: string
  parts: MorphemePart[]
  meaning: string
}

export interface RootIndexItem {
  id: number
  root: string
  meaning: string
  meaningEn: string
  origin: string
  originBucket: OriginBucket
  originLabel: string
  kind: MorphemeKind
  exampleCount: number
  previewExamples: RootPreviewExample[]
  allWords: Array<{ word: string; meaning: string }>
  searchText: string
}

export interface FullRootItem extends WordRoot {
  kind: MorphemeKind
  originBucket: OriginBucket
  originLabel: string
}

export interface RootMetaEntry {
  id: number
  root: string
  meaning: string
  kind: MorphemeKind
}

export interface SiteStats {
  totalRoots: number
  totalExamples: number
  byKind: Record<MorphemeKind, number>
  byOrigin: Record<OriginBucket, number>
}

export interface RootSummary {
  id: number
  root: string
  meaning: string
  kind: MorphemeKind
  originLabel: string
}

export interface ExtraFormulaItem {
  word: string
  meaning: string
  steps: string[]
}

export interface ParsedRootKnowledge {
  summary: string
  summaryParagraphs: string[]
  extraFormulas: ExtraFormulaItem[]
  memoryHints: string[]
  usageNotes: string[]
  variants: string[]
}

export const MORPHEME_KIND_LABELS: Record<MorphemeKind, string> = {
  prefix: '前缀',
  root: '词根',
  suffix: '后缀',
}

export const ORIGIN_BUCKET_LABELS: Record<OriginBucket, string> = {
  Latin: '拉丁语',
  Greek: '希腊语',
  'Old English': '古英语',
  rare: '其他',
}

const ORIGIN_PART_LABELS: Record<string, string> = {
  French: '法语',
  Germanic: '日耳曼语',
  Greek: '希腊语',
  Latin: '拉丁语',
  'Old English': '古英语',
}

export function classifyMorpheme(rootText: string): MorphemeKind {
  const trimmed = rootText.trim()
  if (trimmed.startsWith('-')) return 'suffix'
  if (trimmed.endsWith('-')) return 'prefix'
  return 'root'
}

export function normalizeOriginBucket(origin: string): OriginBucket {
  if (origin === 'Latin' || origin === 'Greek' || origin === 'Old English') {
    return origin
  }
  return 'rare'
}

export function displayOrigin(origin: string): string {
  return origin
    .split('/')
    .map((part) => ORIGIN_PART_LABELS[part] ?? part)
    .join('/')
}

const PREFIX_MEANINGS: Record<string, string> = {
  a: '否定含义',
  ac: '朝向',
  ad: '朝向',
  an: '否定含义',
  anti: '反对 / 抗击',
  ambi: '两边',
  co: '一起 / 共同',
  com: '一起 / 共同',
  con: '一起 / 共同',
  counter: '相反 / 对抗',
  de: '向下 / 去除',
  di: '分开',
  dis: '否定含义 / 分开',
  e: '向外',
  ef: '向外',
  em: '放入 / 使变成',
  en: '放入 / 使变成',
  epi: '在人群中',
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
  pen: '几乎',
  port: '携带',
  post: '在...之后',
  pre: '提前',
  pro: '向前 / 支持',
  re: '再次 / 回退',
  sub: '下方 / 次级',
  sug: '下方',
  super: '超级 / 超越',
  sur: '在上方',
  syn: '一起 / 同步',
  tele: '远程',
  trans: '穿过 / 转换',
  un: '否定含义',
  under: '下方 / 不足',
}

const SUFFIX_MEANINGS: Record<string, string> = {
  a: '变成名词',
  able: '可以...的',
  acy: '变成名词',
  age: '变成名词',
  al: '变成形容词',
  ain: '变成形容词',
  ament: '变成名词',
  an: '变成名词',
  ant: '变成形容词 / 人',
  ar: '变成形容词',
  ary: '变成形容词',
  atic: '变成形容词',
  ate: '变成动词',
  ble: '可以...的',
  centric: '中心',
  cracy: '统治',
  ation: '变成名词',
  dom: '领域 / 状态',
  e: '词尾 / 变动词',
  ee: '做这事的人',
  ence: '变成名词',
  ent: '变成形容词 / 人',
  er: '做这事的人',
  eur: '做这事的人',
  ful: '充满...的',
  hood: '时期 / 状态',
  ia: '疾病 / 状态',
  ial: '变成形容词',
  ian: '变成名词 / 形容词',
  ible: '可以...的',
  ic: '变成形容词',
  ical: '变成形容词',
  icism: '主义 / 思想',
  id: '变成形容词',
  il: '变成形容词',
  ile: '可以...的',
  ing: '进行中 / 变名词',
  ion: '变成名词',
  ition: '变成名词',
  itory: '相关场所',
  itude: '变成名词',
  ivore: '吞食',
  ivorous: '变成形容词',
  ious: '变成形容词',
  ius: '变成名词',
  ism: '主义 / 思想',
  ist: '做这事的人',
  ity: '变成名词',
  ive: '变成形容词',
  ize: '变成动词',
  le: '变成名词',
  less: '没有...的',
  logy: '学科 / 学问',
  ly: '变成副词',
  ment: '变成名词',
  ness: '状态',
  o: '变成名词',
  or: '做这事的人',
  ous: '变成形容词',
  ship: '关系 / 身份',
  tic: '变成形容词',
  tion: '变成名词',
  ty: '变成名词',
  us: '变成名词',
  ure: '变成名词',
  y: '变成形容词 / 名词',
}

function normalizeMorphemeKey(value: string) {
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
): string {
  const explicit = example.partMeanings?.[kind]?.trim()
  if (explicit) return explicit

  const key = normalizeMorphemeKey(text)
  if (kind === 'prefix') return PREFIX_MEANINGS[key] ?? ''
  if (kind === 'suffix') return SUFFIX_MEANINGS[key] ?? ''
  return inferRootMeaning(example)
}

export function buildExampleParts(
  example: WordExample,
  rootMeaningFallback = '',
): MorphemePart[] {
  const raw: Array<[MorphemeKind, string]> = []
  if (example.breakdown.prefix) raw.push(['prefix', example.breakdown.prefix])
  if (example.breakdown.root) raw.push(['root', example.breakdown.root])
  if (example.breakdown.suffix) raw.push(['suffix', example.breakdown.suffix])

  return raw.map(([kind, text]) => {
    const resolved = getMorphemeMeaning(example, kind, text).trim()
    return {
      kind,
      text,
      meaning: resolved || (kind === 'root' ? rootMeaningFallback.trim() : ''),
    }
  })
}

export function getLiteralMeaning(example: {
  literalMeaning?: string
  explanation: string
}): string {
  return (
    example.literalMeaning?.trim() ||
    example.explanation.split('→')[0]?.trim() ||
    ''
  )
}

export function getNaturalMeaning(example: {
  meaning: string
  explanation: string
}): string {
  return example.explanation.split('→')[1]?.trim() || example.meaning
}

export function normalizeQuizAnswer(answer: string): string {
  return answer
    .replace(/\s+/g, '')
    .replace(/[，,、/／;；]/g, '/')
    .trim()
}

const INLINE_FORMULA_RE =
  /^(?:(?:[a-zA-Z][a-zA-Z-]*(?:（[^）]+）)?[、,，]\s*)*)([a-zA-Z][a-zA-Z-]*)(?:（([^）]+)）)?\s*=\s*(.+)$/
const INLINE_NOTE_RE = /^(注意|记住|提示|小心)[：:]\s*(.+)$/
const REMEMBER_FORMULA_RE = /^记住「?([^」：:]+?)」?(?:这个词)?[：:]\s*(.+)$/
const PURE_WORD_LIST_RE =
  /^([a-zA-Z-]+(?:（[^）]+）)?)(?:[、,，]\s*[a-zA-Z-]+(?:（[^）]+）)?)+[。！？]?$/

function splitFormulaSteps(rawExpression: string): string[] {
  return rawExpression
    .replace(/[。！？]+$/, '')
    .split(/\s*(?:→|=)\s*/)
    .map((part) => part.trim())
    .filter(Boolean)
}

function pushUnique(target: string[], value: string | undefined) {
  const trimmed = value?.trim()
  if (!trimmed) return
  if (!target.includes(trimmed)) {
    target.push(trimmed)
  }
}

export function parseRootKnowledge(
  root: Pick<
    WordRoot,
    'description' | 'memoryHint' | 'commonPitfall' | 'variants' | 'examples'
  >,
  visibleExampleWords?: readonly string[],
): ParsedRootKnowledge {
  const exampleSet = new Set(
    (visibleExampleWords ?? root.examples.map((item) => item.word)).map(
      (word) => word.toLowerCase(),
    ),
  )

  const cleaned = root.description.replace(/[，,]\s*已在前面讲过/g, '').trim()
  const blocks = cleaned
    .split(/\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
  const sentences = blocks.flatMap((block) =>
    block
      .split(/(?<=[。！？])/)
      .map((sentence) => sentence.trim())
      .filter(Boolean),
  )

  const summaryParts: string[] = []
  const extraFormulas: ExtraFormulaItem[] = []
  const seenExtraWords = new Set<string>()
  const memoryHints: string[] = []
  const usageNotes: string[] = []

  pushUnique(memoryHints, root.memoryHint)
  pushUnique(usageNotes, root.commonPitfall)

  const addExtraFormula = (
    word: string,
    meaning: string,
    expression: string,
  ) => {
    const key = word.toLowerCase()
    if (exampleSet.has(key) || seenExtraWords.has(key)) return
    const steps = splitFormulaSteps(expression)
    if (steps.length === 0) return
    seenExtraWords.add(key)
    extraFormulas.push({
      word,
      meaning: meaning.trim(),
      steps,
    })
  }

  for (const sentence of sentences) {
    const noteMatch = sentence.match(INLINE_NOTE_RE)
    if (noteMatch) {
      const [, prefix, body] = noteMatch
      const bodyFormula = body.match(INLINE_FORMULA_RE)
      if (bodyFormula) {
        addExtraFormula(bodyFormula[1], bodyFormula[2] ?? '', bodyFormula[3])
        continue
      }
      if (prefix === '注意' || prefix === '小心') {
        pushUnique(usageNotes, body)
      } else {
        pushUnique(memoryHints, body)
      }
      continue
    }

    const formulaMatch = sentence.match(INLINE_FORMULA_RE)
    if (formulaMatch) {
      addExtraFormula(formulaMatch[1], formulaMatch[2] ?? '', formulaMatch[3])
      continue
    }

    const rememberMatch = sentence.match(REMEMBER_FORMULA_RE)
    if (rememberMatch && /[=→+]/.test(rememberMatch[2])) {
      const engWord = rememberMatch[1].match(/[a-zA-Z][a-zA-Z-]*/)?.[0]
      if (engWord) {
        const cnMeaning = rememberMatch[1]
          .replace(engWord, '')
          .replace(/这个词/g, '')
          .replace(/[（）()「」]/g, '')
          .trim()
        addExtraFormula(engWord, cnMeaning, rememberMatch[2])
        continue
      }
    }

    if (PURE_WORD_LIST_RE.test(sentence)) {
      const words = [...sentence.matchAll(/[a-zA-Z-]+/g)].map((m) =>
        m[0].toLowerCase(),
      )
      if (words.length > 0 && words.every((w) => exampleSet.has(w))) {
        continue
      }
    }

    summaryParts.push(sentence)
  }

  const fallback = cleaned.replace(/\n+/g, '')
  const joinedSummary = summaryParts.join('').trim()
  const summary = joinedSummary || fallback
  const summaryParagraphs =
    summaryParts.length > 1 && (blocks.length > 1 || summary.length > 30)
      ? summaryParts
      : [summary]

  return {
    summary,
    summaryParagraphs,
    extraFormulas,
    memoryHints,
    usageNotes,
    variants: root.variants ?? [],
  }
}
