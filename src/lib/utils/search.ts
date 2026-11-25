import type {
  MorphemeKind,
  OriginBucket,
  RootIndexItem,
  RootPreviewExample,
} from '$lib/data/taxonomy'

export interface SearchMatch {
  item: RootIndexItem
  score: number
  reason: 'root' | 'word' | 'meaning' | 'text' | 'none'
  matchedWord?: string
  matchedExample?: RootPreviewExample
}

export interface RootFilterOptions {
  kind?: 'all' | MorphemeKind
  origin?: 'all' | OriginBucket
  status?: 'all' | 'unmastered' | 'due' | 'mastered'
  masteredIds?: ReadonlySet<number>
  dueIds?: ReadonlySet<number>
}

export function scoreRootMatch(
  item: RootIndexItem,
  rawQuery: string,
): SearchMatch | null {
  const query = rawQuery.trim().toLowerCase()
  if (!query) {
    return { item, score: 0, reason: 'none' }
  }

  const cleanRoot = item.root.toLowerCase()
  const tokens = cleanRoot
    .split(/[/,\s]+/)
    .map((token) => token.replace(/^-+|-+$/g, ''))
    .filter(Boolean)

  let score = 0
  let reason: SearchMatch['reason'] = 'none'
  let matchedWord: string | undefined
  let matchedExample: RootPreviewExample | undefined

  if (cleanRoot === query || tokens.includes(query)) {
    score = 130
    reason = 'root'
  } else if (
    cleanRoot.startsWith(query) ||
    tokens.some((token) => token.startsWith(query))
  ) {
    score = 105
    reason = 'root'
  }

  for (const example of item.previewExamples) {
    const lowerWord = example.word.toLowerCase()
    if (lowerWord === query) {
      if (120 > score) {
        score = 120
        reason = 'word'
      }
      matchedWord = example.word
      matchedExample = example
      break
    }
    if (lowerWord.startsWith(query)) {
      if (92 > score) {
        score = 92
        reason = 'word'
      }
      if (!matchedExample) {
        matchedWord = example.word
        matchedExample = example
      }
    } else if (
      lowerWord.includes(query) ||
      example.meaning.toLowerCase().includes(query)
    ) {
      if (70 > score) {
        score = 70
        reason = 'word'
      }
      if (!matchedExample) {
        matchedWord = example.word
        matchedExample = example
      }
    }
  }

  if (!matchedWord) {
    for (const entry of item.allWords) {
      const lower = entry.word.toLowerCase()
      if (lower === query) {
        if (115 > score) {
          score = 115
          reason = 'word'
        }
        matchedWord = entry.word
        break
      }
      if (lower.startsWith(query)) {
        if (88 > score) {
          score = 88
          reason = 'word'
        }
        matchedWord = entry.word
      } else if (
        lower.includes(query) ||
        entry.meaning.toLowerCase().includes(query)
      ) {
        if (64 > score) {
          score = 64
          reason = 'word'
        }
        if (!matchedWord) matchedWord = entry.word
      }
    }
  }

  if (item.meaning.toLowerCase().includes(query)) {
    if (84 > score) {
      score = 84
      reason = 'meaning'
    }
  } else if (item.meaningEn.toLowerCase().includes(query)) {
    if (74 > score) {
      score = 74
      reason = 'meaning'
    }
  }

  if (score === 0 && item.searchText.includes(query)) {
    score = 45
    reason = 'text'
  }

  if (score === 0) return null
  return { item, score, reason, matchedWord, matchedExample }
}

export function searchRoots(
  items: readonly RootIndexItem[],
  query: string,
  options: RootFilterOptions = {},
  limit?: number,
): SearchMatch[] {
  const {
    kind = 'all',
    origin = 'all',
    status = 'all',
    masteredIds,
    dueIds,
  } = options

  const filtered = items.filter((item) => {
    if (kind !== 'all' && item.kind !== kind) return false
    if (origin !== 'all' && item.originBucket !== origin) return false
    if (status !== 'all') {
      const isMastered = masteredIds?.has(item.id) ?? false
      const isDue = dueIds?.has(item.id) ?? false
      if (status === 'mastered' && !isMastered) return false
      if (status === 'due' && !isDue) return false
      if (status === 'unmastered' && isMastered) return false
    }
    return true
  })

  const trimmed = query.trim()
  if (!trimmed) {
    const base = filtered.map((item) => ({
      item,
      score: 0,
      reason: 'none' as const,
    }))
    return typeof limit === 'number' ? base.slice(0, limit) : base
  }

  const matches: SearchMatch[] = []
  for (const item of filtered) {
    const matched = scoreRootMatch(item, trimmed)
    if (matched) matches.push(matched)
  }

  matches.sort((a, b) => b.score - a.score || a.item.id - b.item.id)
  return typeof limit === 'number' ? matches.slice(0, limit) : matches
}
