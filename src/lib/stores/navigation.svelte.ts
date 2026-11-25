import type { MorphemeKind, OriginBucket } from '$lib/data/taxonomy'

export type ReturnSourceKind =
  | 'roots'
  | 'learn'
  | 'flashcard'
  | 'progress'
  | 'home'

export type TrailFrameKind = ReturnSourceKind | 'detail'

export type RootsKindFilter = 'all' | MorphemeKind
export type RootsOriginFilter = 'all' | OriginBucket
export type RootsStatusFilter = 'all' | 'unmastered' | 'due' | 'mastered'

export type LearnQueueMode =
  | 'all'
  | 'unmastered'
  | 'due'
  | 'prefix'
  | 'root'
  | 'suffix'

export type FlashcardDeckMode =
  | 'due'
  | 'unmastered'
  | 'all'
  | 'prefix'
  | 'root'
  | 'suffix'

export interface TrailFrame {
  kind: TrailFrameKind
  href: string
  /** Plain target title without the leading "返回" verb (e.g. "词根库", "学习", "in-/im-") */
  title: string
  /** Extra context shown in tooltip (e.g. root meaning or active roots filter summary) */
  subtitle?: string
  /** For non-detail origins: the root ID originally opened from that page */
  entryRootId?: number | null
  /** For non-detail origins: updated when browsing prev/next siblings at depth 1 */
  lastRootId?: number | null
  /** For detail frames: the source detail root ID */
  rootId?: number
  /** For detail frames: scroll position captured when leaving that detail page */
  scrollY?: number
  /** For detail frames: related card ID clicked to trigger locate-pulse upon return */
  clickedRelatedRootId?: number | null
}

export interface BackShortcut {
  kind: ReturnSourceKind
  href: string
  title: string
  tooltip: string
}

export interface DetailBackAction {
  hasHistory: boolean
  kind: TrailFrameKind
  href: string
  title: string
  tooltip: string
  /** Secondary 1-click escape back to the outer origin when drilled into related roots */
  rootShortcut: BackShortcut | null
}

export interface RootsViewMemory {
  query: string
  kind: RootsKindFilter
  origin: RootsOriginFilter
  status: RootsStatusFilter
  visibleLimit: number
  scrollY: number
}

export interface LearnViewMemory {
  mode: LearnQueueMode
  isShuffled: boolean
  queueIds: number[]
  queueIndex: number
  stage: 'read' | 'quiz'
}

export interface FlashcardViewMemory {
  mode: FlashcardDeckMode
  deckIds: number[]
  cursor: number
  revealed: boolean
  hintShown: boolean
  reviewedCount: number
}

export interface PendingRestore {
  path: string
  scrollY: number | null
  highlightRootId: number | null
  fallbackHighlightRootId: number | null
  preferCardScroll: boolean
}

interface CurrentDetailMeta {
  id: number
  title: string
  meaning: string
}

interface PendingDrillDown {
  fromRootId: number
  fromRootTitle: string
  fromRootMeaning: string
  targetRootId: number
  isRelatedCard: boolean
}

interface LastDetailExit {
  rootId: number
  toPath: string
  scrollY: number
}

interface PersistedNavMemory {
  detailTrail?: TrailFrame[]
  /** Legacy field kept only for seamless sessionStorage migration */
  detailOrigin?: {
    kind: ReturnSourceKind
    href: string
    label: string
    entryRootId: number | null
    lastRootId: number | null
  } | null
  rootsView: RootsViewMemory | null
  learnState: LearnViewMemory | null
  flashcardState: FlashcardViewMemory | null
  scrollByPath: Record<string, number>
}

export const NAV_MEMORY_STORAGE_KEY = 'wordRootNavMemory'
export const ROOTS_BATCH_SIZE = 36
const MAX_TRAIL_DEPTH = 20

const KIND_LABELS: Record<MorphemeKind, string> = {
  prefix: '前缀',
  root: '词根',
  suffix: '后缀',
}

const ORIGIN_LABELS: Record<OriginBucket, string> = {
  Latin: '拉丁语',
  Greek: '希腊语',
  'Old English': '古英语',
  rare: '其他语源',
}

const STATUS_LABELS: Record<Exclude<RootsStatusFilter, 'all'>, string> = {
  unmastered: '未掌握',
  due: '待复习',
  mastered: '已掌握',
}

export function parseRootDetailId(pathname: string): number | null {
  const match = pathname.match(/^\/roots\/(\d+)$/)
  if (!match) return null
  const id = Number(match[1])
  return Number.isInteger(id) && id > 0 ? id : null
}

export function buildRootsSearch(
  view: Pick<RootsViewMemory, 'query' | 'kind' | 'origin' | 'status'>,
): string {
  const params = new URLSearchParams()
  if (view.query.trim()) params.set('q', view.query.trim())
  if (view.kind !== 'all') params.set('kind', view.kind)
  if (view.origin !== 'all') params.set('origin', view.origin)
  if (view.status !== 'all') params.set('status', view.status)
  const serialized = params.toString()
  return serialized ? `?${serialized}` : ''
}

export function hasExplicitRootsFilterParams(params: URLSearchParams): boolean {
  return (
    params.has('q') ||
    params.has('kind') ||
    params.has('origin') ||
    params.has('status')
  )
}

export function describeRootsFilter(search: string): string {
  const params = new URLSearchParams(search)
  const parts: string[] = []
  const query = params.get('q')?.trim()
  if (query) parts.push(`搜索“${query}”`)
  const kind = params.get('kind')
  if (kind === 'prefix' || kind === 'root' || kind === 'suffix') {
    parts.push(KIND_LABELS[kind])
  }
  const origin = params.get('origin')
  if (
    origin === 'Latin' ||
    origin === 'Greek' ||
    origin === 'Old English' ||
    origin === 'rare'
  ) {
    parts.push(ORIGIN_LABELS[origin])
  }
  const status = params.get('status')
  if (status === 'unmastered' || status === 'due' || status === 'mastered') {
    parts.push(STATUS_LABELS[status])
  }
  return parts.join(' · ')
}

function isValidKindFilter(value: unknown): value is RootsKindFilter {
  return (
    value === 'all' ||
    value === 'prefix' ||
    value === 'root' ||
    value === 'suffix'
  )
}

function isValidOriginFilter(value: unknown): value is RootsOriginFilter {
  return (
    value === 'all' ||
    value === 'Latin' ||
    value === 'Greek' ||
    value === 'Old English' ||
    value === 'rare'
  )
}

function isValidStatusFilter(value: unknown): value is RootsStatusFilter {
  return (
    value === 'all' ||
    value === 'unmastered' ||
    value === 'due' ||
    value === 'mastered'
  )
}

function isValidReturnKind(value: unknown): value is ReturnSourceKind {
  return (
    value === 'roots' ||
    value === 'learn' ||
    value === 'flashcard' ||
    value === 'progress' ||
    value === 'home'
  )
}

function isValidTrailKind(value: unknown): value is TrailFrameKind {
  return value === 'detail' || isValidReturnKind(value)
}

function isValidLearnMode(value: unknown): value is LearnQueueMode {
  return (
    value === 'all' ||
    value === 'unmastered' ||
    value === 'due' ||
    value === 'prefix' ||
    value === 'root' ||
    value === 'suffix'
  )
}

function isValidFlashcardMode(value: unknown): value is FlashcardDeckMode {
  return (
    value === 'due' ||
    value === 'unmastered' ||
    value === 'all' ||
    value === 'prefix' ||
    value === 'root' ||
    value === 'suffix'
  )
}

function sanitizeNumberArray(value: unknown): number[] {
  if (!Array.isArray(value)) return []
  return value.filter(
    (item): item is number =>
      typeof item === 'number' && Number.isInteger(item) && item > 0,
  )
}

function sanitizeScroll(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? Math.round(value)
    : 0
}

function splitHrefPath(href: string): string {
  const idx = href.indexOf('?')
  return idx >= 0 ? href.slice(0, idx) : href
}

function stripLegacyReturnPrefix(label: string): string {
  return label.startsWith('返回') && label.length > 2 ? label.slice(2) : label
}

function sanitizeTrailFrame(raw: unknown): TrailFrame | null {
  if (!raw || typeof raw !== 'object') return null
  const candidate = raw as Partial<TrailFrame>
  if (
    !isValidTrailKind(candidate.kind) ||
    typeof candidate.href !== 'string' ||
    !candidate.href.startsWith('/') ||
    typeof candidate.title !== 'string' ||
    !candidate.title.trim()
  ) {
    return null
  }

  const frame: TrailFrame = {
    kind: candidate.kind,
    href: candidate.href,
    title: candidate.title,
  }
  if (typeof candidate.subtitle === 'string' && candidate.subtitle.trim()) {
    frame.subtitle = candidate.subtitle
  }
  if (candidate.kind === 'detail') {
    if (
      typeof candidate.rootId !== 'number' ||
      !Number.isInteger(candidate.rootId) ||
      candidate.rootId <= 0
    ) {
      return null
    }
    frame.rootId = candidate.rootId
    frame.scrollY = sanitizeScroll(candidate.scrollY)
    frame.clickedRelatedRootId =
      typeof candidate.clickedRelatedRootId === 'number' &&
      Number.isInteger(candidate.clickedRelatedRootId) &&
      candidate.clickedRelatedRootId > 0
        ? candidate.clickedRelatedRootId
        : null
  } else {
    frame.entryRootId =
      typeof candidate.entryRootId === 'number' ? candidate.entryRootId : null
    frame.lastRootId =
      typeof candidate.lastRootId === 'number' ? candidate.lastRootId : null
  }
  return frame
}

function buildFrameTooltip(frame: TrailFrame): string {
  if (frame.kind === 'detail') {
    return frame.subtitle
      ? `返回上一个词素：${frame.title} · ${frame.subtitle}`
      : `返回上一个词素：${frame.title}`
  }
  if (frame.kind === 'roots') {
    return frame.subtitle
      ? `返回词根库（上次筛选：${frame.subtitle}）`
      : '返回词根库（上次浏览位置）'
  }
  if (frame.kind === 'learn') return '返回当前学习进度'
  if (frame.kind === 'flashcard') return '返回当前闪卡进度'
  if (frame.kind === 'progress') return '返回进度与偏好'
  return '返回首页上次位置'
}

function createNavigationStore() {
  let initialized = false
  let detailTrail = $state<TrailFrame[]>([])
  let rootsView = $state<RootsViewMemory | null>(null)
  let learnState = $state<LearnViewMemory | null>(null)
  let flashcardState = $state<FlashcardViewMemory | null>(null)
  let scrollByPath = $state<Record<string, number>>({})
  let pendingRestore = $state<PendingRestore | null>(null)

  let currentDetailMeta: CurrentDetailMeta | null = null
  let pendingDrillDown: PendingDrillDown | null = null
  let pendingNavIntent: 'pop-back' | 'jump-origin' | null = null
  let lastDetailExit: LastDetailExit | null = null

  function persist() {
    if (typeof window === 'undefined') return
    try {
      const payload: PersistedNavMemory = {
        detailTrail,
        rootsView,
        learnState,
        flashcardState,
        scrollByPath,
      }
      window.sessionStorage.setItem(
        NAV_MEMORY_STORAGE_KEY,
        JSON.stringify(payload),
      )
    } catch {
      // Ignore storage quota or private browsing errors
    }
  }

  function hydrateFromSession() {
    if (initialized || typeof window === 'undefined') return
    initialized = true
    try {
      const raw = window.sessionStorage.getItem(NAV_MEMORY_STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as Partial<PersistedNavMemory>
      if (!parsed || typeof parsed !== 'object') return

      if (Array.isArray(parsed.detailTrail)) {
        const frames = parsed.detailTrail
          .map((item) => sanitizeTrailFrame(item))
          .filter((item): item is TrailFrame => item !== null)
          .slice(-MAX_TRAIL_DEPTH)
        detailTrail = frames
      } else if (
        parsed.detailOrigin &&
        typeof parsed.detailOrigin === 'object' &&
        isValidReturnKind(parsed.detailOrigin.kind) &&
        typeof parsed.detailOrigin.href === 'string' &&
        parsed.detailOrigin.href.startsWith('/') &&
        typeof parsed.detailOrigin.label === 'string'
      ) {
        const searchIdx = parsed.detailOrigin.href.indexOf('?')
        const filterSummary =
          parsed.detailOrigin.kind === 'roots' && searchIdx >= 0
            ? describeRootsFilter(parsed.detailOrigin.href.slice(searchIdx))
            : ''
        detailTrail = [
          {
            kind: parsed.detailOrigin.kind,
            href: parsed.detailOrigin.href,
            title: stripLegacyReturnPrefix(parsed.detailOrigin.label),
            subtitle: filterSummary || undefined,
            entryRootId:
              typeof parsed.detailOrigin.entryRootId === 'number'
                ? parsed.detailOrigin.entryRootId
                : null,
            lastRootId:
              typeof parsed.detailOrigin.lastRootId === 'number'
                ? parsed.detailOrigin.lastRootId
                : null,
          },
        ]
      }

      if (parsed.rootsView && typeof parsed.rootsView === 'object') {
        rootsView = {
          query:
            typeof parsed.rootsView.query === 'string'
              ? parsed.rootsView.query
              : '',
          kind: isValidKindFilter(parsed.rootsView.kind)
            ? parsed.rootsView.kind
            : 'all',
          origin: isValidOriginFilter(parsed.rootsView.origin)
            ? parsed.rootsView.origin
            : 'all',
          status: isValidStatusFilter(parsed.rootsView.status)
            ? parsed.rootsView.status
            : 'all',
          visibleLimit:
            typeof parsed.rootsView.visibleLimit === 'number' &&
            parsed.rootsView.visibleLimit >= ROOTS_BATCH_SIZE
              ? Math.floor(parsed.rootsView.visibleLimit)
              : ROOTS_BATCH_SIZE,
          scrollY: sanitizeScroll(parsed.rootsView.scrollY),
        }
      }

      if (
        parsed.learnState &&
        typeof parsed.learnState === 'object' &&
        isValidLearnMode(parsed.learnState.mode)
      ) {
        learnState = {
          mode: parsed.learnState.mode,
          isShuffled: Boolean(parsed.learnState.isShuffled),
          queueIds: sanitizeNumberArray(parsed.learnState.queueIds),
          queueIndex:
            typeof parsed.learnState.queueIndex === 'number' &&
            Number.isFinite(parsed.learnState.queueIndex)
              ? Math.max(0, Math.floor(parsed.learnState.queueIndex))
              : 0,
          stage: parsed.learnState.stage === 'quiz' ? 'quiz' : 'read',
        }
      }

      if (
        parsed.flashcardState &&
        typeof parsed.flashcardState === 'object' &&
        isValidFlashcardMode(parsed.flashcardState.mode)
      ) {
        flashcardState = {
          mode: parsed.flashcardState.mode,
          deckIds: sanitizeNumberArray(parsed.flashcardState.deckIds),
          cursor:
            typeof parsed.flashcardState.cursor === 'number' &&
            Number.isFinite(parsed.flashcardState.cursor)
              ? Math.max(0, Math.floor(parsed.flashcardState.cursor))
              : 0,
          revealed: Boolean(parsed.flashcardState.revealed),
          hintShown: Boolean(parsed.flashcardState.hintShown),
          reviewedCount:
            typeof parsed.flashcardState.reviewedCount === 'number' &&
            Number.isFinite(parsed.flashcardState.reviewedCount)
              ? Math.max(0, Math.floor(parsed.flashcardState.reviewedCount))
              : 0,
        }
      }

      if (parsed.scrollByPath && typeof parsed.scrollByPath === 'object') {
        const nextScrolls: Record<string, number> = {}
        for (const [key, value] of Object.entries(parsed.scrollByPath)) {
          if (key.startsWith('/')) {
            nextScrolls[key] = sanitizeScroll(value)
          }
        }
        scrollByPath = nextScrolls
      }
    } catch {
      // Ignore malformed session data
    }
  }

  function resolveSourceFrame(
    pathname: string,
    search: string,
    entryRootId: number,
  ): TrailFrame {
    if (pathname === '/roots') {
      const filterSummary = describeRootsFilter(search)
      return {
        kind: 'roots',
        href: `${pathname}${search}`,
        title: '词根库',
        subtitle: filterSummary || undefined,
        entryRootId,
        lastRootId: entryRootId,
      }
    }
    if (pathname === '/learn') {
      return {
        kind: 'learn',
        href: '/learn',
        title: '学习',
        entryRootId,
        lastRootId: entryRootId,
      }
    }
    if (pathname === '/flashcard') {
      return {
        kind: 'flashcard',
        href: '/flashcard',
        title: '闪卡',
        entryRootId,
        lastRootId: entryRootId,
      }
    }
    if (pathname === '/progress') {
      return {
        kind: 'progress',
        href: '/progress',
        title: '进度',
        entryRootId,
        lastRootId: entryRootId,
      }
    }
    if (pathname === '/') {
      return {
        kind: 'home',
        href: '/',
        title: '首页',
        entryRootId,
        lastRootId: entryRootId,
      }
    }
    const fallbackSearch = rootsView ? buildRootsSearch(rootsView) : ''
    const filterSummary = describeRootsFilter(fallbackSearch)
    return {
      kind: 'roots',
      href: `/roots${fallbackSearch}`,
      title: '词根库',
      subtitle: filterSummary || undefined,
      entryRootId,
      lastRootId: entryRootId,
    }
  }

  function getBaseOriginFrame(): TrailFrame | null {
    const first = detailTrail[0]
    if (!first || first.kind === 'detail') return null
    return first
  }

  function buildBackAction(): DetailBackAction {
    hydrateFromSession()
    const top = detailTrail[detailTrail.length - 1]
    const defaultRootsHref = rootsView
      ? `/roots${buildRootsSearch(rootsView)}`
      : '/roots'

    if (!top) {
      return {
        hasHistory: false,
        kind: 'roots',
        href: defaultRootsHref,
        title: '词根库',
        tooltip: '浏览词根库',
        rootShortcut: null,
      }
    }

    let rootShortcut: BackShortcut | null = null
    if (top.kind === 'detail') {
      const base = getBaseOriginFrame()
      if (base && base.kind !== 'detail') {
        rootShortcut = {
          kind: base.kind,
          href: base.href,
          title: base.title,
          tooltip: `直接${buildFrameTooltip(base)}`,
        }
      } else {
        rootShortcut = {
          kind: 'roots',
          href: defaultRootsHref,
          title: '词根库',
          tooltip: '前往词根库',
        }
      }
    }

    return {
      hasHistory: true,
      kind: top.kind,
      href: top.href,
      title: top.title,
      tooltip: buildFrameTooltip(top),
      rootShortcut,
    }
  }

  return {
    get detailTrail(): readonly TrailFrame[] {
      hydrateFromSession()
      return detailTrail
    },
    get backAction(): DetailBackAction {
      return buildBackAction()
    },
    get rootsView(): RootsViewMemory | null {
      hydrateFromSession()
      return rootsView
    },
    get rootsHref(): string {
      hydrateFromSession()
      return rootsView ? `/roots${buildRootsSearch(rootsView)}` : '/roots'
    },
    get learnState(): LearnViewMemory | null {
      hydrateFromSession()
      return learnState
    },
    get flashcardState(): FlashcardViewMemory | null {
      hydrateFromSession()
      return flashcardState
    },
    get pendingRestore(): PendingRestore | null {
      return pendingRestore
    },

    init() {
      hydrateFromSession()
    },

    setCurrentDetailMeta(id: number, title: string, meaning: string) {
      currentDetailMeta = { id, title, meaning }
    },

    clearCurrentDetailMeta(id?: number) {
      if (id === undefined || currentDetailMeta?.id === id) {
        currentDetailMeta = null
      }
    },

    prepareDetailDrillDown(options: {
      fromRootId: number
      fromRootTitle: string
      fromRootMeaning: string
      targetRootId: number
      isRelatedCard?: boolean
    }) {
      if (options.fromRootId === options.targetRootId) return
      pendingNavIntent = null
      pendingDrillDown = {
        fromRootId: options.fromRootId,
        fromRootTitle: options.fromRootTitle,
        fromRootMeaning: options.fromRootMeaning,
        targetRootId: options.targetRootId,
        isRelatedCard: options.isRelatedCard ?? true,
      }
    },

    prepareDetailDrillDownFromCurrent(targetRootId: number) {
      if (!currentDetailMeta || currentDetailMeta.id === targetRootId) return
      pendingNavIntent = null
      pendingDrillDown = {
        fromRootId: currentDetailMeta.id,
        fromRootTitle: currentDetailMeta.title,
        fromRootMeaning: currentDetailMeta.meaning,
        targetRootId,
        isRelatedCard: false,
      }
    },

    preparePopBack() {
      pendingDrillDown = null
      pendingNavIntent = 'pop-back'
    },

    prepareJumpToOrigin() {
      pendingDrillDown = null
      pendingNavIntent = 'jump-origin'
    },

    recordDeparture(options: {
      fromPath: string
      fromSearch: string
      toPath: string
      toSearch: string
      navType: string
      scrollY: number
    }) {
      hydrateFromSession()
      const { fromPath, fromSearch, toPath, toSearch, navType } = options
      const safeScrollY = sanitizeScroll(options.scrollY)
      const fromRootId = parseRootDetailId(fromPath)
      const toRootId = parseRootDetailId(toPath)

      const drillDown = pendingDrillDown
      const navIntent = pendingNavIntent
      pendingDrillDown = null
      pendingNavIntent = null

      // 1. Save departure scroll position for non-detail pages
      if (fromPath === '/' || fromPath === '/progress') {
        scrollByPath = { ...scrollByPath, [fromPath]: safeScrollY }
      } else if (fromPath === '/roots') {
        if (rootsView) {
          rootsView = { ...rootsView, scrollY: safeScrollY }
        } else {
          const params = new URLSearchParams(fromSearch)
          const rawKind = params.get('kind')
          const rawOrigin = params.get('origin')
          const rawStatus = params.get('status')
          rootsView = {
            query: params.get('q') ?? '',
            kind: isValidKindFilter(rawKind) ? rawKind : 'all',
            origin: isValidOriginFilter(rawOrigin) ? rawOrigin : 'all',
            status: isValidStatusFilter(rawStatus) ? rawStatus : 'all',
            visibleLimit: ROOTS_BATCH_SIZE,
            scrollY: safeScrollY,
          }
        }
      }

      // 2. Navigating INTO a detail page (/roots/[id])
      if (toRootId !== null) {
        // Case 2a: Browser Back returning from a page opened via detail (e.g. /roots/7 -> /learn -> Back)
        if (
          fromRootId === null &&
          navType === 'popstate' &&
          lastDetailExit &&
          lastDetailExit.rootId === toRootId &&
          lastDetailExit.toPath === fromPath
        ) {
          pendingRestore = {
            path: toPath,
            scrollY: lastDetailExit.scrollY,
            highlightRootId: null,
            fallbackHighlightRootId: null,
            preferCardScroll: false,
          }
          lastDetailExit = null
          persist()
          return
        }

        lastDetailExit = null

        // Case 2b: Entering detail freshly from a non-detail page (/roots, /, /learn, /flashcard, /progress)
        if (fromRootId === null) {
          const sourceFrame = resolveSourceFrame(fromPath, fromSearch, toRootId)
          detailTrail = [sourceFrame]
          pendingRestore = null
          persist()
          return
        }

        // Case 2c: Returning to the previous detail on top of the stack (via in-page Back or browser Back)
        const top = detailTrail[detailTrail.length - 1]
        const isPoppingToTopDetail =
          top?.kind === 'detail' &&
          top.rootId === toRootId &&
          (navIntent === 'pop-back' || navType === 'popstate')

        if (isPoppingToTopDetail && top) {
          detailTrail = detailTrail.slice(0, -1)
          pendingRestore = {
            path: toPath,
            scrollY: top.scrollY ?? null,
            highlightRootId: top.clickedRelatedRootId ?? null,
            fallbackHighlightRootId: null,
            preferCardScroll: false,
          }
          persist()
          return
        }

        // Case 2d: Drilling down into a related root or CommandSearch result from current detail
        if (
          drillDown &&
          drillDown.fromRootId === fromRootId &&
          drillDown.targetRootId === toRootId
        ) {
          const pushedFrame: TrailFrame = {
            kind: 'detail',
            href: `/roots/${fromRootId}`,
            title: drillDown.fromRootTitle,
            subtitle: drillDown.fromRootMeaning || undefined,
            rootId: fromRootId,
            scrollY: safeScrollY,
            clickedRelatedRootId: drillDown.isRelatedCard ? toRootId : null,
          }
          detailTrail = [...detailTrail, pushedFrame].slice(-MAX_TRAIL_DEPTH)
          pendingRestore = null
          persist()
          return
        }

        // Case 2e: Horizontal sibling paging (prev / next) at the same depth
        if (top && top.kind !== 'detail') {
          detailTrail = [
            ...detailTrail.slice(0, -1),
            { ...top, lastRootId: toRootId },
          ]
        }
        pendingRestore = null
        persist()
        return
      }

      // 3. Leaving a detail page to a non-detail page
      const top = detailTrail[detailTrail.length - 1]
      const baseOrigin = getBaseOriginFrame()
      const isDirectOriginJump =
        fromRootId !== null && navIntent === 'jump-origin'
      const isPoppingToOrigin =
        fromRootId !== null &&
        top !== undefined &&
        top.kind !== 'detail' &&
        splitHrefPath(top.href) === toPath &&
        (navIntent === 'pop-back' ||
          navType === 'popstate' ||
          navType === 'link')

      const matchedOriginFrame = isDirectOriginJump
        ? baseOrigin
        : isPoppingToOrigin
          ? top
          : null

      if (matchedOriginFrame || isDirectOriginJump) {
        detailTrail = []
        lastDetailExit = null
      } else if (fromRootId !== null) {
        // Preserve trail in case user hits browser Back from /learn ("从这里学习") etc.
        lastDetailExit = {
          rootId: fromRootId,
          toPath,
          scrollY: safeScrollY,
        }
      } else {
        lastDetailExit = null
      }

      // 4. Arm restoration when arriving at /roots, /, or /progress
      if (toPath === '/roots') {
        const savedSearch = rootsView ? buildRootsSearch(rootsView) : ''
        const toParams = new URLSearchParams(toSearch)
        const hasExplicitFilter = hasExplicitRootsFilterParams(toParams)
        const matchesSaved =
          rootsView !== null && (!hasExplicitFilter || toSearch === savedSearch)

        if (matchesSaved && rootsView) {
          const returningToRootsOrigin =
            matchedOriginFrame?.kind === 'roots' && fromRootId !== null
          // When jumping straight back from nested related roots, locate the original entry card
          // instead of teleporting to an unrelated card elsewhere in the list.
          const lastId = returningToRootsOrigin
            ? isDirectOriginJump
              ? (matchedOriginFrame.entryRootId ?? fromRootId)
              : (matchedOriginFrame.lastRootId ?? fromRootId)
            : baseOrigin?.kind === 'roots'
              ? (baseOrigin.entryRootId ?? null)
              : null
          const entryId = returningToRootsOrigin
            ? (matchedOriginFrame.entryRootId ?? fromRootId)
            : baseOrigin?.kind === 'roots'
              ? (baseOrigin.entryRootId ?? null)
              : null
          const switchedSibling =
            !isDirectOriginJump &&
            returningToRootsOrigin &&
            lastId !== null &&
            entryId !== null &&
            lastId !== entryId

          pendingRestore = {
            path: '/roots',
            scrollY: rootsView.scrollY,
            highlightRootId: fromRootId !== null ? lastId : null,
            fallbackHighlightRootId: fromRootId !== null ? entryId : null,
            preferCardScroll: switchedSibling,
          }
        } else {
          pendingRestore = null
        }
      } else if (toPath === '/' || toPath === '/progress') {
        const expectedKind: ReturnSourceKind =
          toPath === '/' ? 'home' : 'progress'
        const returningToOrigin =
          fromRootId !== null && matchedOriginFrame?.kind === expectedKind
        const shouldRestoreScroll =
          returningToOrigin ||
          navType === 'popstate' ||
          (toPath === '/progress' && scrollByPath[toPath] !== undefined)

        if (shouldRestoreScroll) {
          pendingRestore = {
            path: toPath,
            scrollY: scrollByPath[toPath] ?? null,
            highlightRootId: returningToOrigin
              ? (matchedOriginFrame?.entryRootId ?? fromRootId)
              : null,
            fallbackHighlightRootId: null,
            preferCardScroll: false,
          }
        } else {
          pendingRestore = null
        }
      } else {
        pendingRestore = null
      }

      persist()
    },

    consumePendingRestore(path: string): PendingRestore | null {
      if (!pendingRestore || pendingRestore.path !== path) return null
      const next = pendingRestore
      pendingRestore = null
      return next
    },

    saveRootsView(
      next: Omit<RootsViewMemory, 'scrollY'> & { scrollY?: number },
    ) {
      hydrateFromSession()
      const currentScroll =
        next.scrollY !== undefined
          ? sanitizeScroll(next.scrollY)
          : (rootsView?.scrollY ?? 0)
      rootsView = {
        query: next.query,
        kind: next.kind,
        origin: next.origin,
        status: next.status,
        visibleLimit: Math.max(ROOTS_BATCH_SIZE, Math.floor(next.visibleLimit)),
        scrollY: currentScroll,
      }
      persist()
    },

    clearRootsView() {
      hydrateFromSession()
      rootsView = null
      pendingRestore = null
      persist()
    },

    saveLearnState(next: LearnViewMemory) {
      hydrateFromSession()
      learnState = {
        mode: next.mode,
        isShuffled: next.isShuffled,
        queueIds: [...next.queueIds],
        queueIndex: Math.max(0, Math.floor(next.queueIndex)),
        stage: next.stage,
      }
      persist()
    },

    saveFlashcardState(next: FlashcardViewMemory) {
      hydrateFromSession()
      flashcardState = {
        mode: next.mode,
        deckIds: [...next.deckIds],
        cursor: Math.max(0, Math.floor(next.cursor)),
        revealed: next.revealed,
        hintShown: next.hintShown,
        reviewedCount: Math.max(0, Math.floor(next.reviewedCount)),
      }
      persist()
    },

    resetAll() {
      initialized = true
      detailTrail = []
      rootsView = null
      learnState = null
      flashcardState = null
      scrollByPath = {}
      pendingRestore = null
      currentDetailMeta = null
      pendingDrillDown = null
      pendingNavIntent = null
      lastDetailExit = null
      if (typeof window !== 'undefined') {
        try {
          window.sessionStorage.removeItem(NAV_MEMORY_STORAGE_KEY)
        } catch {
          // Ignore
        }
      }
    },
  }
}

export const navigation = createNavigationStore()
