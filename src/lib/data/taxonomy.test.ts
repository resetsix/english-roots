import { describe, expect, it } from 'vitest'
import {
  getRootDetailBundle,
  getRootIndexItems,
  getRootMetaMap,
  getSiteStats,
} from '$lib/data/root-index.server'
import {
  classifyMorpheme,
  displayOrigin,
  normalizeOriginBucket,
  parseRootKnowledge,
} from '$lib/data/taxonomy'
import { wordRoots } from '$lib/data/wordRoots'

describe('morpheme taxonomy & index builder', () => {
  it('classifies all 300 roots into exact 45 prefixes, 225 roots, and 30 suffixes', () => {
    expect(classifyMorpheme('anti-')).toBe('prefix')
    expect(classifyMorpheme('a-/an-')).toBe('prefix')
    expect(classifyMorpheme('-tion')).toBe('suffix')
    expect(classifyMorpheme('-able/-ible')).toBe('suffix')
    expect(classifyMorpheme('spect/spic')).toBe('root')

    const stats = getSiteStats()
    expect(stats.totalRoots).toBe(300)
    expect(stats.byKind).toEqual({
      prefix: 45,
      root: 225,
      suffix: 30,
    })
    expect(stats.totalExamples).toBeGreaterThanOrEqual(1000)
  })

  it('maps every origin cleanly into Chinese labels and buckets', () => {
    expect(displayOrigin('Latin')).toBe('拉丁语')
    expect(displayOrigin('Greek')).toBe('希腊语')
    expect(displayOrigin('Old English')).toBe('古英语')
    expect(displayOrigin('Latin/Greek')).toBe('拉丁语/希腊语')
    expect(normalizeOriginBucket('Latin/Greek')).toBe('rare')
  })

  it('builds complete index items, meta map, and detail bundles without empty fields', () => {
    const items = getRootIndexItems()
    expect(items).toHaveLength(300)
    for (const item of items) {
      expect(item.id).toBeGreaterThan(0)
      expect(item.root.trim().length).toBeGreaterThan(0)
      expect(item.meaning.trim().length).toBeGreaterThan(0)
      expect(item.originLabel.trim().length).toBeGreaterThan(0)
      expect(item.previewExamples.length).toBeGreaterThan(0)
      expect(item.searchText.length).toBeGreaterThan(0)
    }

    const metaMap = getRootMetaMap()
    expect(Object.keys(metaMap)).toHaveLength(300)

    const bundle = getRootDetailBundle(1)
    expect(bundle).not.toBeNull()
    expect(bundle?.prev).toBeNull()
    expect(bundle?.next?.id).toBe(2)
    expect(bundle?.related).toHaveLength(4)
  })

  it('parses root descriptions cleanly across all 300 entries without empty summaries or duplicate formulas', () => {
    const sample = parseRootKnowledge({
      description:
        '-able/-ible 是最常见的形容词后缀，代表「能...的、可...的」。readable = read（读）+ -able → 可读的。visible = vis（看）+ -ible → 可见的。注意：-able 用于完整单词后，-ible 多用于词根后。',
      examples: [
        {
          word: 'readable',
          breakdown: { prefix: '', root: 'read', suffix: 'able' },
          meaning: '可读的',
          explanation: '能读→可读的',
        },
        {
          word: 'visible',
          breakdown: { prefix: '', root: 'vis', suffix: 'ible' },
          meaning: '可见的',
          explanation: '能看→可见的',
        },
      ],
    })

    expect(sample.summary).toBe(
      '-able/-ible 是最常见的形容词后缀，代表「能...的、可...的」。',
    )
    expect(sample.summaryParagraphs).toEqual([
      '-able/-ible 是最常见的形容词后缀，代表「能...的、可...的」。',
    ])
    expect(sample.extraFormulas).toEqual([])
    expect(sample.usageNotes).toEqual([
      '-able 用于完整单词后，-ible 多用于词根后。',
    ])

    const multiWordFormula = parseRootKnowledge({
      description:
        'vac/van 代表「空」。vacant（空的）、vacuum（真空）= vac（空）+ -uum。',
      examples: [
        {
          word: 'vacant',
          breakdown: { prefix: '', root: 'vac', suffix: 'ant' },
          meaning: '空的',
          explanation: '空的',
        },
      ],
    })
    expect(multiWordFormula.summaryParagraphs).toEqual(['vac/van 代表「空」。'])
    expect(multiWordFormula.extraFormulas).toEqual([
      { word: 'vacuum', meaning: '真空', steps: ['vac（空）+ -uum'] },
    ])

    const firstRoot = parseRootKnowledge(wordRoots[0])
    expect(firstRoot.summaryParagraphs.length).toBe(2)
    expect(firstRoot.extraFormulas.map((item) => item.word)).toEqual(['anemia'])
    expect(firstRoot.usageNotes.length).toBeGreaterThan(0)

    const bannedPatterns = [
      /已在前面讲过/,
      /想象一个|想象拳击|想象植物/,
      /从此你就能理解/,
      /轻松记|衍生出50\+/,
      /ancient Greeks/i,
      /\botropism\b/i,
    ]

    for (const root of wordRoots) {
      const parsed = parseRootKnowledge(root)
      expect(parsed.summary.length).toBeGreaterThan(0)
      expect(parsed.summaryParagraphs.length).toBeGreaterThan(0)
      expect(parsed.summary).not.toMatch(/[=→]/)
      expect(parsed.summary).not.toContain('...')
      for (const paragraph of parsed.summaryParagraphs) {
        expect(
          paragraph.length,
          `root #${root.id} ${root.root}: ${paragraph}`,
        ).toBeLessThanOrEqual(52)
      }
      for (const formula of parsed.extraFormulas) {
        expect(formula.meaning).not.toContain('这个词')
      }
      const allText = [
        parsed.summary,
        ...parsed.usageNotes,
        ...parsed.memoryHints,
        ...parsed.extraFormulas.map((f) => `${f.word} ${f.steps.join(' ')}`),
      ].join(' ')
      for (const pattern of bannedPatterns) {
        expect(allText, `root #${root.id} ${root.root}`).not.toMatch(pattern)
      }
    }
  })
})
