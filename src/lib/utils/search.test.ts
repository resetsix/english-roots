import { describe, expect, it } from 'vitest'
import { getRootIndexItems } from '$lib/data/root-index.server'
import { searchRoots } from '$lib/utils/search'

const items = getRootIndexItems()

describe('root search & multi-dimension filtering', () => {
  it('ranks exact morpheme and case-insensitive matches first', () => {
    const anti = searchRoots(items, 'ANTI')
    expect(anti[0]?.item.root).toBe('anti-')

    const port = searchRoots(items, 'port')
    expect(
      port.slice(0, 3).some((match) => match.item.root.includes('port')),
    ).toBe(true)
  })

  it('matches example words and Chinese meanings cleanly', () => {
    const wordHit = searchRoots(items, 'anonymous')
    expect(wordHit[0]?.item.id).toBe(1)
    expect(wordHit[0]?.matchedWord).toBe('anonymous')

    const cnHit = searchRoots(items, '反战')
    expect(cnHit[0]?.item.root).toBe('anti-')
  })

  it('combines kind, origin, and mastery status filters accurately', () => {
    const masteredIds = new Set([1, 2])
    const dueIds = new Set([3])

    const prefixesLatin = searchRoots(items, '', {
      kind: 'prefix',
      origin: 'Latin',
    })
    expect(prefixesLatin.length).toBeGreaterThan(0)
    expect(
      prefixesLatin.every(
        ({ item }) => item.kind === 'prefix' && item.originBucket === 'Latin',
      ),
    ).toBe(true)

    const onlyMastered = searchRoots(items, '', {
      status: 'mastered',
      masteredIds,
      dueIds,
    })
    expect(onlyMastered.map((m) => m.item.id)).toEqual([1, 2])

    const onlyDue = searchRoots(items, '', {
      status: 'due',
      masteredIds,
      dueIds,
    })
    expect(onlyDue.map((m) => m.item.id)).toEqual([3])
  })
})
