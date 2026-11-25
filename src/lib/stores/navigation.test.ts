import { beforeEach, describe, expect, it } from 'vitest'
import {
  buildRootsSearch,
  describeRootsFilter,
  NAV_MEMORY_STORAGE_KEY,
  navigation,
  parseRootDetailId,
  ROOTS_BATCH_SIZE,
} from '$lib/stores/navigation.svelte'

describe('navigation session memory store', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
    navigation.resetAll()
  })

  it('parses detail IDs, builds canonical queries, and formats filter tooltips', () => {
    expect(parseRootDetailId('/roots/42')).toBe(42)
    expect(parseRootDetailId('/roots')).toBeNull()
    expect(parseRootDetailId('/roots/abc')).toBeNull()

    const query = buildRootsSearch({
      query: '  bio ',
      kind: 'root',
      origin: 'Greek',
      status: 'unmastered',
    })
    expect(query).toBe('?q=bio&kind=root&origin=Greek&status=unmastered')
    expect(describeRootsFilter(query)).toBe(
      '搜索“bio” · 词根 · 希腊语 · 未掌握',
    )

    expect(
      buildRootsSearch({
        query: '',
        kind: 'all',
        origin: 'all',
        status: 'all',
      }),
    ).toBe('')
    expect(describeRootsFilter('')).toBe('')
  })

  it('shows neutral 词根库 on direct landing without history and pushes detail on related drill-down', () => {
    expect(navigation.backAction).toEqual({
      hasHistory: false,
      kind: 'roots',
      href: '/roots',
      title: '词根库',
      tooltip: '浏览词根库',
      rootShortcut: null,
    })

    // User directly opens /roots/7 and clicks related root /roots/1
    navigation.prepareDetailDrillDown({
      fromRootId: 7,
      fromRootTitle: 'in-/im-',
      fromRootMeaning: '向内 / 否定含义',
      targetRootId: 1,
      isRelatedCard: true,
    })
    navigation.recordDeparture({
      fromPath: '/roots/7',
      fromSearch: '',
      toPath: '/roots/1',
      toSearch: '',
      navType: 'link',
      scrollY: 880,
    })

    expect(navigation.backAction).toEqual({
      hasHistory: true,
      kind: 'detail',
      href: '/roots/7',
      title: 'in-/im-',
      tooltip: '返回上一个词素：in-/im- · 向内 / 否定含义',
      rootShortcut: {
        kind: 'roots',
        href: '/roots',
        title: '词根库',
        tooltip: '前往词根库',
      },
    })

    // Pop back to /roots/7 restores scroll and highlights related card #1
    navigation.preparePopBack()
    navigation.recordDeparture({
      fromPath: '/roots/1',
      fromSearch: '',
      toPath: '/roots/7',
      toSearch: '',
      navType: 'link',
      scrollY: 0,
    })

    expect(navigation.consumePendingRestore('/roots/7')).toEqual({
      path: '/roots/7',
      scrollY: 880,
      highlightRootId: 1,
      fallbackHighlightRootId: null,
      preferCardScroll: false,
    })
    expect(navigation.backAction.hasHistory).toBe(false)
    expect(navigation.backAction.title).toBe('词根库')
  })

  it('preserves /roots filters, batch limit, scroll, and locate target when returning from /roots/[id]', () => {
    navigation.saveRootsView({
      query: 'spec',
      kind: 'root',
      origin: 'Latin',
      status: 'all',
      visibleLimit: ROOTS_BATCH_SIZE * 3,
    })

    navigation.recordDeparture({
      fromPath: '/roots',
      fromSearch: '?q=spec&kind=root&origin=Latin',
      toPath: '/roots/26',
      toSearch: '',
      navType: 'link',
      scrollY: 1640,
    })

    expect(navigation.backAction).toEqual({
      hasHistory: true,
      kind: 'roots',
      href: '/roots?q=spec&kind=root&origin=Latin',
      title: '词根库',
      tooltip: '返回词根库（上次筛选：搜索“spec” · 词根 · 拉丁语）',
      rootShortcut: null,
    })
    expect(navigation.rootsView?.scrollY).toBe(1640)
    expect(navigation.rootsView?.visibleLimit).toBe(ROOTS_BATCH_SIZE * 3)

    navigation.preparePopBack()
    navigation.recordDeparture({
      fromPath: '/roots/26',
      fromSearch: '',
      toPath: '/roots',
      toSearch: '?q=spec&kind=root&origin=Latin',
      navType: 'link',
      scrollY: 0,
    })

    const restore = navigation.consumePendingRestore('/roots')
    expect(restore).toEqual({
      path: '/roots',
      scrollY: 1640,
      highlightRootId: 26,
      fallbackHighlightRootId: 26,
      preferCardScroll: false,
    })
    expect(navigation.consumePendingRestore('/roots')).toBeNull()
  })

  it('unwinds multi-level related root drill-downs step by step (and supports browser Back & direct origin jump)', () => {
    navigation.saveRootsView({
      query: '',
      kind: 'prefix',
      origin: 'all',
      status: 'all',
      visibleLimit: ROOTS_BATCH_SIZE * 2,
    })

    // /roots?kind=prefix -> /roots/7
    navigation.recordDeparture({
      fromPath: '/roots',
      fromSearch: '?kind=prefix',
      toPath: '/roots/7',
      toSearch: '',
      navType: 'link',
      scrollY: 720,
    })

    // /roots/7 -> related /roots/1
    navigation.prepareDetailDrillDown({
      fromRootId: 7,
      fromRootTitle: 'in-/im-',
      fromRootMeaning: '向内 / 否定含义',
      targetRootId: 1,
      isRelatedCard: true,
    })
    navigation.recordDeparture({
      fromPath: '/roots/7',
      fromSearch: '',
      toPath: '/roots/1',
      toSearch: '',
      navType: 'link',
      scrollY: 940,
    })

    // /roots/1 -> related /roots/3
    navigation.prepareDetailDrillDown({
      fromRootId: 1,
      fromRootTitle: 'a-/an-',
      fromRootMeaning: '无、没有',
      targetRootId: 3,
      isRelatedCard: true,
    })
    navigation.recordDeparture({
      fromPath: '/roots/1',
      fromSearch: '',
      toPath: '/roots/3',
      toSearch: '',
      navType: 'link',
      scrollY: 810,
    })

    expect(navigation.backAction).toEqual({
      hasHistory: true,
      kind: 'detail',
      href: '/roots/1',
      title: 'a-/an-',
      tooltip: '返回上一个词素：a-/an- · 无、没有',
      rootShortcut: {
        kind: 'roots',
        href: '/roots?kind=prefix',
        title: '词根库',
        tooltip: '直接返回词根库（上次筛选：前缀）',
      },
    })

    // Step 1: Browser Back from /roots/3 -> /roots/1
    navigation.recordDeparture({
      fromPath: '/roots/3',
      fromSearch: '',
      toPath: '/roots/1',
      toSearch: '',
      navType: 'popstate',
      scrollY: 0,
    })
    expect(navigation.consumePendingRestore('/roots/1')).toEqual({
      path: '/roots/1',
      scrollY: 810,
      highlightRootId: 3,
      fallbackHighlightRootId: null,
      preferCardScroll: false,
    })
    expect(navigation.backAction.title).toBe('in-/im-')

    // Step 2: In-page Back from /roots/1 -> /roots/7
    navigation.preparePopBack()
    navigation.recordDeparture({
      fromPath: '/roots/1',
      fromSearch: '',
      toPath: '/roots/7',
      toSearch: '',
      navType: 'link',
      scrollY: 0,
    })
    expect(navigation.consumePendingRestore('/roots/7')).toEqual({
      path: '/roots/7',
      scrollY: 940,
      highlightRootId: 1,
      fallbackHighlightRootId: null,
      preferCardScroll: false,
    })
    expect(navigation.backAction.kind).toBe('roots')
    expect(navigation.backAction.title).toBe('词根库')
    expect(navigation.backAction.rootShortcut).toBeNull()

    // Drill down again, then test 1-click direct origin shortcut back to /roots
    navigation.prepareDetailDrillDown({
      fromRootId: 7,
      fromRootTitle: 'in-/im-',
      fromRootMeaning: '向内 / 否定含义',
      targetRootId: 1,
      isRelatedCard: true,
    })
    navigation.recordDeparture({
      fromPath: '/roots/7',
      fromSearch: '',
      toPath: '/roots/1',
      toSearch: '',
      navType: 'link',
      scrollY: 940,
    })

    navigation.prepareJumpToOrigin()
    navigation.recordDeparture({
      fromPath: '/roots/1',
      fromSearch: '',
      toPath: '/roots',
      toSearch: '?kind=prefix',
      navType: 'link',
      scrollY: 0,
    })
    expect(navigation.consumePendingRestore('/roots')).toEqual({
      path: '/roots',
      scrollY: 720,
      highlightRootId: 7,
      fallbackHighlightRootId: 7,
      preferCardScroll: false,
    })
  })

  it('keeps outer origin across prev/next sibling browsing and locates latest sibling card', () => {
    navigation.saveRootsView({
      query: '',
      kind: 'prefix',
      origin: 'all',
      status: 'all',
      visibleLimit: ROOTS_BATCH_SIZE * 2,
    })

    navigation.recordDeparture({
      fromPath: '/roots',
      fromSearch: '?kind=prefix',
      toPath: '/roots/7',
      toSearch: '',
      navType: 'link',
      scrollY: 900,
    })

    // Browse sibling prev/next: 7 -> 8 -> 9 (no drill-down)
    navigation.recordDeparture({
      fromPath: '/roots/7',
      fromSearch: '',
      toPath: '/roots/8',
      toSearch: '',
      navType: 'link',
      scrollY: 0,
    })
    navigation.recordDeparture({
      fromPath: '/roots/8',
      fromSearch: '',
      toPath: '/roots/9',
      toSearch: '',
      navType: 'link',
      scrollY: 0,
    })

    expect(navigation.backAction.kind).toBe('roots')
    expect(navigation.backAction.href).toBe('/roots?kind=prefix')
    expect(navigation.backAction.rootShortcut).toBeNull()

    navigation.preparePopBack()
    navigation.recordDeparture({
      fromPath: '/roots/9',
      fromSearch: '',
      toPath: '/roots',
      toSearch: '?kind=prefix',
      navType: 'link',
      scrollY: 0,
    })

    expect(navigation.consumePendingRestore('/roots')).toEqual({
      path: '/roots',
      scrollY: 900,
      highlightRootId: 9,
      fallbackHighlightRootId: 7,
      preferCardScroll: true,
    })
  })

  it('pushes current detail when jumping via CommandSearch and preserves trail on browser Back from /learn', () => {
    navigation.recordDeparture({
      fromPath: '/learn',
      fromSearch: '',
      toPath: '/roots/15',
      toSearch: '',
      navType: 'link',
      scrollY: 0,
    })
    expect(navigation.backAction.title).toBe('学习')
    expect(navigation.backAction.href).toBe('/learn')

    // Jump from /roots/15 to /roots/26 via CommandSearch
    navigation.setCurrentDetailMeta(15, 'pro-', '向前')
    navigation.prepareDetailDrillDownFromCurrent(26)
    navigation.recordDeparture({
      fromPath: '/roots/15',
      fromSearch: '',
      toPath: '/roots/26',
      toSearch: '',
      navType: 'goto',
      scrollY: 320,
    })

    expect(navigation.backAction.kind).toBe('detail')
    expect(navigation.backAction.title).toBe('pro-')
    expect(navigation.backAction.rootShortcut?.title).toBe('学习')

    // Click "从这里学习" (/roots/26 -> /learn?index=25), then browser Back to /roots/26
    navigation.recordDeparture({
      fromPath: '/roots/26',
      fromSearch: '',
      toPath: '/learn',
      toSearch: '?index=25',
      navType: 'link',
      scrollY: 140,
    })
    navigation.recordDeparture({
      fromPath: '/learn',
      fromSearch: '?index=25',
      toPath: '/roots/26',
      toSearch: '',
      navType: 'popstate',
      scrollY: 0,
    })

    // Trail is preserved (still points back to pro-, NOT back to /learn)
    expect(navigation.backAction.kind).toBe('detail')
    expect(navigation.backAction.title).toBe('pro-')
    expect(navigation.consumePendingRestore('/roots/26')).toEqual({
      path: '/roots/26',
      scrollY: 140,
      highlightRootId: null,
      fallbackHighlightRootId: null,
      preferCardScroll: false,
    })
  })

  it('tracks contextual return targets from /flashcard, /progress, and /', () => {
    navigation.recordDeparture({
      fromPath: '/flashcard',
      fromSearch: '',
      toPath: '/roots/16',
      toSearch: '',
      navType: 'link',
      scrollY: 0,
    })
    expect(navigation.backAction.title).toBe('闪卡')
    expect(navigation.backAction.href).toBe('/flashcard')

    navigation.recordDeparture({
      fromPath: '/',
      fromSearch: '',
      toPath: '/roots/26',
      toSearch: '',
      navType: 'link',
      scrollY: 1200,
    })
    expect(navigation.backAction.title).toBe('首页')
    expect(navigation.backAction.href).toBe('/')

    navigation.preparePopBack()
    navigation.recordDeparture({
      fromPath: '/roots/26',
      fromSearch: '',
      toPath: '/',
      toSearch: '',
      navType: 'link',
      scrollY: 0,
    })
    expect(navigation.consumePendingRestore('/')).toEqual({
      path: '/',
      scrollY: 1200,
      highlightRootId: 26,
      fallbackHighlightRootId: null,
      preferCardScroll: false,
    })
  })

  it('does not arm stale scroll restore when jumping to a different explicit /roots category filter', () => {
    navigation.saveRootsView({
      query: '',
      kind: 'suffix',
      origin: 'all',
      status: 'all',
      visibleLimit: ROOTS_BATCH_SIZE * 2,
      scrollY: 720,
    })

    navigation.recordDeparture({
      fromPath: '/',
      fromSearch: '',
      toPath: '/roots',
      toSearch: '?kind=prefix',
      navType: 'link',
      scrollY: 400,
    })

    expect(navigation.consumePendingRestore('/roots')).toBeNull()
  })

  it('persists learn, flashcard, and detailTrail session states to sessionStorage', () => {
    navigation.saveLearnState({
      mode: 'prefix',
      isShuffled: true,
      queueIds: [5, 1, 3],
      queueIndex: 2,
      stage: 'quiz',
    })
    navigation.saveFlashcardState({
      mode: 'root',
      deckIds: [26, 27, 28],
      cursor: 1,
      revealed: true,
      hintShown: false,
      reviewedCount: 6,
    })

    const raw = window.sessionStorage.getItem(NAV_MEMORY_STORAGE_KEY)
    expect(raw).not.toBeNull()
    const parsed = JSON.parse(raw!)
    expect(parsed.learnState).toEqual({
      mode: 'prefix',
      isShuffled: true,
      queueIds: [5, 1, 3],
      queueIndex: 2,
      stage: 'quiz',
    })
    expect(parsed.flashcardState).toEqual({
      mode: 'root',
      deckIds: [26, 27, 28],
      cursor: 1,
      revealed: true,
      hintShown: false,
      reviewedCount: 6,
    })
  })
})
