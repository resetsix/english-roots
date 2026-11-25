import { wordRoots, type WordRoot } from '$lib/data/wordRoots'
import {
  buildExampleParts,
  classifyMorpheme,
  displayOrigin,
  normalizeOriginBucket,
  type FullRootItem,
  type MorphemeKind,
  type OriginBucket,
  type RootIndexItem,
  type RootMetaEntry,
  type RootSummary,
  type SiteStats,
} from '$lib/data/taxonomy'

const PREVIEW_EXAMPLES_PER_CARD = 2

let cachedStats: SiteStats | null = null
let cachedIndex: RootIndexItem[] | null = null
let cachedFull: FullRootItem[] | null = null
let cachedMetaMap: Record<number, RootMetaEntry> | null = null

export function getSiteStats(): SiteStats {
  if (cachedStats) return cachedStats

  const byKind: Record<MorphemeKind, number> = {
    prefix: 0,
    root: 0,
    suffix: 0,
  }
  const byOrigin: Record<OriginBucket, number> = {
    Latin: 0,
    Greek: 0,
    'Old English': 0,
    rare: 0,
  }
  let totalExamples = 0

  for (const root of wordRoots) {
    byKind[classifyMorpheme(root.root)] += 1
    byOrigin[normalizeOriginBucket(root.origin)] += 1
    totalExamples += root.examples.length
  }

  cachedStats = {
    totalRoots: wordRoots.length,
    totalExamples,
    byKind,
    byOrigin,
  }
  return cachedStats
}

export function getRootIndexItems(): RootIndexItem[] {
  if (cachedIndex) return cachedIndex

  cachedIndex = wordRoots.map((root) => {
    const kind = classifyMorpheme(root.root)
    const originBucket = normalizeOriginBucket(root.origin)
    const originLabel = displayOrigin(root.origin)

    const previewExamples = root.examples
      .slice(0, PREVIEW_EXAMPLES_PER_CARD)
      .map((example) => ({
        word: example.word,
        parts: buildExampleParts(example, root.meaning),
        meaning: example.meaning,
      }))

    const allWords = root.examples.map((example) => ({
      word: example.word,
      meaning: example.meaning,
    }))

    const searchText = [
      root.root,
      root.meaning,
      root.meaningEn,
      originLabel,
      root.origin,
      ...(root.variants ?? []),
      ...root.examples.flatMap((example) => [
        example.word,
        example.meaning,
        example.breakdown.prefix,
        example.breakdown.root,
        example.breakdown.suffix,
      ]),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return {
      id: root.id,
      root: root.root,
      meaning: root.meaning,
      meaningEn: root.meaningEn,
      origin: root.origin,
      originBucket,
      originLabel,
      kind,
      exampleCount: root.examples.length,
      previewExamples,
      allWords,
      searchText,
    }
  })

  return cachedIndex
}

export function getFullRootItems(): FullRootItem[] {
  if (cachedFull) return cachedFull

  cachedFull = wordRoots.map((root) => ({
    ...root,
    kind: classifyMorpheme(root.root),
    originBucket: normalizeOriginBucket(root.origin),
    originLabel: displayOrigin(root.origin),
  }))
  return cachedFull
}

export function getRootMetaMap(): Record<number, RootMetaEntry> {
  if (cachedMetaMap) return cachedMetaMap

  const map: Record<number, RootMetaEntry> = {}
  for (const root of wordRoots) {
    map[root.id] = {
      id: root.id,
      root: root.root,
      meaning: root.meaning,
      kind: classifyMorpheme(root.root),
    }
  }
  cachedMetaMap = map
  return map
}

function toSummary(root: WordRoot): RootSummary {
  return {
    id: root.id,
    root: root.root,
    meaning: root.meaning,
    kind: classifyMorpheme(root.root),
    originLabel: displayOrigin(root.origin),
  }
}

export function getFeaturedRoots(): RootSummary[] {
  // 2 prefixes, 2 core roots, 2 suffixes
  const preferredIds = [2, 24, 29, 32, 131, 139]
  const byId = new Map(wordRoots.map((item) => [item.id, item]))
  const picked = preferredIds
    .map((id) => byId.get(id))
    .filter((item): item is WordRoot => Boolean(item))
    .map(toSummary)

  return picked.length === 6 ? picked : wordRoots.slice(0, 6).map(toSummary)
}

export function getAllRootIds(): number[] {
  return wordRoots.map((root) => root.id)
}

export function getRootDetailBundle(id: number): {
  root: FullRootItem
  prev: RootSummary | null
  next: RootSummary | null
  related: RootSummary[]
  totalRoots: number
} | null {
  const index = wordRoots.findIndex((item) => item.id === id)
  if (index < 0) return null

  const raw = wordRoots[index]
  const kind = classifyMorpheme(raw.root)
  const root: FullRootItem = {
    ...raw,
    kind,
    originBucket: normalizeOriginBucket(raw.origin),
    originLabel: displayOrigin(raw.origin),
  }

  const prev = index > 0 ? toSummary(wordRoots[index - 1]) : null
  const next =
    index < wordRoots.length - 1 ? toSummary(wordRoots[index + 1]) : null

  const candidates = wordRoots.filter((item) => item.id !== raw.id)
  const sameOriginAndKind = candidates.filter(
    (item) =>
      item.origin === raw.origin && classifyMorpheme(item.root) === kind,
  )
  const sameKind = candidates.filter(
    (item) =>
      item.origin !== raw.origin && classifyMorpheme(item.root) === kind,
  )
  const pool = [...sameOriginAndKind, ...sameKind]

  const related: RootSummary[] = []
  const start = raw.id % Math.max(1, pool.length)
  for (let i = 0; i < pool.length && related.length < 4; i += 1) {
    related.push(toSummary(pool[(start + i * 7) % pool.length]))
  }

  return {
    root,
    prev,
    next,
    related,
    totalRoots: wordRoots.length,
  }
}
