<script lang="ts">
  import { afterNavigate, replaceState } from '$app/navigation'
  import { page } from '$app/state'
  import { onMount, tick } from 'svelte'
  import { MORPHEME_KIND_LABELS } from '$lib/data/taxonomy'
  import { dataCache } from '$lib/stores/data-cache.svelte'
  import {
    buildRootsSearch,
    hasExplicitRootsFilterParams,
    navigation,
    ROOTS_BATCH_SIZE,
    type RootsKindFilter,
    type RootsOriginFilter,
    type RootsStatusFilter,
  } from '$lib/stores/navigation.svelte'
  import { progress } from '$lib/stores/progress.svelte'
  import {
    getViewportTopObstruction,
    highlightLocatedElement,
    scrollElementIntoComfortableView,
    waitForPaint,
  } from '$lib/utils/locate-card'
  import { searchRoots } from '$lib/utils/search'
  import CheckIcon from '$lib/components/icons/CheckIcon.svelte'
  import SearchIcon from '$lib/components/icons/SearchIcon.svelte'
  import XIcon from '$lib/components/icons/XIcon.svelte'
  import WordAudioButton from '$lib/components/WordAudioButton.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  type KindFilter = RootsKindFilter
  type OriginFilter = RootsOriginFilter
  type StatusFilter = RootsStatusFilter

  const BATCH_SIZE = ROOTS_BATCH_SIZE

  function parseFiltersFromParams(params: URLSearchParams) {
    const rawKind = params.get('kind')
    const rawOrigin = params.get('origin')
    const rawStatus = params.get('status')
    return {
      query: params.get('q') ?? '',
      kind: (rawKind === 'prefix' || rawKind === 'root' || rawKind === 'suffix'
        ? rawKind
        : 'all') as KindFilter,
      origin: (rawOrigin === 'Latin' ||
      rawOrigin === 'Greek' ||
      rawOrigin === 'Old English' ||
      rawOrigin === 'rare'
        ? rawOrigin
        : 'all') as OriginFilter,
      status: (rawStatus === 'unmastered' ||
      rawStatus === 'due' ||
      rawStatus === 'mastered'
        ? rawStatus
        : 'all') as StatusFilter,
    }
  }

  function resolveInitialView() {
    if (typeof window === 'undefined') {
      return {
        query: '',
        kind: 'all' as KindFilter,
        origin: 'all' as OriginFilter,
        status: 'all' as StatusFilter,
        visibleLimit: BATCH_SIZE,
      }
    }

    const params = page.url.searchParams
    const saved = navigation.rootsView
    const hasExplicit = hasExplicitRootsFilterParams(params)

    if (hasExplicit) {
      const fromUrl = parseFiltersFromParams(params)
      const matchesSaved =
        saved !== null && buildRootsSearch(fromUrl) === buildRootsSearch(saved)
      return {
        ...fromUrl,
        visibleLimit: matchesSaved
          ? Math.max(BATCH_SIZE, saved.visibleLimit)
          : BATCH_SIZE,
      }
    }

    if (saved) {
      return {
        query: saved.query,
        kind: saved.kind,
        origin: saved.origin,
        status: saved.status,
        visibleLimit: Math.max(BATCH_SIZE, saved.visibleLimit),
      }
    }

    return {
      query: '',
      kind: 'all' as KindFilter,
      origin: 'all' as OriginFilter,
      status: 'all' as StatusFilter,
      visibleLimit: BATCH_SIZE,
    }
  }

  const initialView = resolveInitialView()

  let query = $state(initialView.query)
  let kind = $state<KindFilter>(initialView.kind)
  let origin = $state<OriginFilter>(initialView.origin)
  let status = $state<StatusFilter>(initialView.status)
  let visibleLimit = $state(initialView.visibleLimit)
  let filterBarEl = $state<HTMLElement | null>(null)
  let mounted = $state(false)
  let lastFilterSignature = buildRootsSearch(initialView)
  let restoreSeq = 0

  onMount(() => {
    mounted = true
  })

  let sourceItems = $derived(dataCache.indexItems ?? data.initialItems)
  let fullLoaded = $derived(dataCache.indexItems !== null)

  let matches = $derived(
    searchRoots(sourceItems, query, {
      kind,
      origin,
      status,
      masteredIds: progress.masteredSet,
      dueIds: progress.dueSet,
    }),
  )

  let visibleMatches = $derived(matches.slice(0, visibleLimit))
  let remainingCount = $derived(
    Math.max(0, matches.length - visibleMatches.length),
  )
  let hasActiveFilter = $derived(
    Boolean(query.trim()) ||
      kind !== 'all' ||
      origin !== 'all' ||
      status !== 'all',
  )

  // Reset batch count only when the user actively modifies filters (never on initial mount/restore)
  $effect(() => {
    const nextSignature = buildRootsSearch({ query, kind, origin, status })
    if (nextSignature !== lastFilterSignature) {
      lastFilterSignature = nextSignature
      visibleLimit = BATCH_SIZE
    }
  })

  // Bidirectional URL sync + in-session memory persistence
  $effect(() => {
    if (!mounted || typeof window === 'undefined') return
    const nextSearch = buildRootsSearch({ query, kind, origin, status })
    const nextUrl = nextSearch ? `/roots${nextSearch}` : '/roots'
    const currentUrl = window.location.pathname + window.location.search
    if (nextUrl !== currentUrl) {
      try {
        replaceState(nextUrl, {})
      } catch {
        // Ignore if router is mid-transition
      }
    }
    navigation.saveRootsView({ query, kind, origin, status, visibleLimit })
  })

  async function applyPendingRestore() {
    const seq = ++restoreSeq
    const pending = navigation.consumePendingRestore('/roots')
    await dataCache.loadIndex().catch(() => {})
    if (seq !== restoreSeq || !pending || typeof window === 'undefined') return

    const candidateId = pending.highlightRootId
    const fallbackId = pending.fallbackHighlightRootId

    let targetId: number | null = null
    let targetIndex = -1

    if (candidateId !== null) {
      const idx = matches.findIndex((entry) => entry.item.id === candidateId)
      if (idx >= 0) {
        targetId = candidateId
        targetIndex = idx
      }
    }
    if (targetId === null && fallbackId !== null) {
      const idx = matches.findIndex((entry) => entry.item.id === fallbackId)
      if (idx >= 0) {
        targetId = fallbackId
        targetIndex = idx
      }
    }

    if (targetIndex >= 0 && targetIndex >= visibleLimit) {
      visibleLimit = Math.ceil((targetIndex + 1) / BATCH_SIZE) * BATCH_SIZE
    }

    await tick()
    await waitForPaint()
    if (seq !== restoreSeq) return

    const topOffset = getViewportTopObstruction(filterBarEl)
    const cardEl =
      targetId !== null
        ? document.querySelector<HTMLElement>(
            `[data-root-card-id="${targetId}"]`,
          )
        : null

    if (pending.preferCardScroll && cardEl) {
      scrollElementIntoComfortableView(cardEl, topOffset)
    } else if (pending.scrollY !== null && pending.scrollY > 0) {
      window.scrollTo({ top: pending.scrollY, behavior: 'instant' })
      if (cardEl) {
        scrollElementIntoComfortableView(cardEl, topOffset)
      }
    } else if (cardEl) {
      scrollElementIntoComfortableView(cardEl, topOffset)
    }

    if (cardEl) {
      highlightLocatedElement(cardEl)
    }
  }

  afterNavigate(() => {
    const params = page.url.searchParams
    if (hasExplicitRootsFilterParams(params)) {
      const fromUrl = parseFiltersFromParams(params)
      const urlSig = buildRootsSearch(fromUrl)
      if (urlSig !== lastFilterSignature) {
        lastFilterSignature = urlSig
        query = fromUrl.query
        kind = fromUrl.kind
        origin = fromUrl.origin
        status = fromUrl.status
        const saved = navigation.rootsView
        visibleLimit =
          saved && buildRootsSearch(saved) === urlSig
            ? Math.max(BATCH_SIZE, saved.visibleLimit)
            : BATCH_SIZE
      }
    }
    void applyPendingRestore()
  })

  function resetFilters() {
    query = ''
    kind = 'all'
    origin = 'all'
    status = 'all'
    visibleLimit = BATCH_SIZE
    lastFilterSignature = ''
    navigation.clearRootsView()
  }
</script>

<svelte:head>
  <title>词根库 · 词根树</title>
  <meta
    name="description"
    content="浏览并筛选全部 300 组英语前缀、词根与后缀。"
  />
</svelte:head>

<div
  class="animate-content-enter mx-auto w-full max-w-4xl space-y-6 px-4 py-8 sm:px-6 sm:py-10"
>
  <header class="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
    <div>
      <h1
        class="text-text-primary m-0 text-2xl font-bold tracking-tight sm:text-3xl"
      >
        词根库
      </h1>
      <p class="text-text-secondary mt-1.5 mb-0 text-sm">
        共 {data.stats.totalRoots} 组，按类型、语源或掌握状态筛选。
      </p>
    </div>
    <div class="text-text-tertiary shrink-0 font-mono text-sm tabular-nums">
      <span class="text-text-primary text-lg font-semibold">
        {fullLoaded || hasActiveFilter ? matches.length : data.stats.totalRoots}
      </span>
      / {data.stats.totalRoots}
    </div>
  </header>

  <!-- Filter Bar (sticky on desktop, natural scroll on mobile to preserve viewport) -->
  <section
    bind:this={filterBarEl}
    aria-label="词根筛选与搜索"
    class="border-border bg-bg-primary/95 -mx-4 border-y px-4 py-3 backdrop-blur-sm sm:sticky sm:top-14 sm:z-20 sm:mx-0 sm:rounded-xl sm:border"
  >
    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <label class="relative flex-1">
          <span class="sr-only">搜索词根、释义或例词</span>
          <SearchIcon
            class="text-text-tertiary pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
          />
          <input
            bind:value={query}
            type="search"
            placeholder="搜索词根、释义或例词..."
            class="border-border bg-bg-secondary/60 text-text-primary placeholder:text-text-tertiary focus-visible:border-accent focus-visible:ring-accent/25 h-10 w-full rounded-lg border pr-8 pl-9 text-sm transition-colors outline-none focus-visible:ring-2 sm:h-9"
          />
          {#if query}
            <button
              type="button"
              onclick={() => (query = '')}
              aria-label="清空搜索词"
              class="text-text-tertiary hover:text-text-primary absolute top-1/2 right-2 -translate-y-1/2 rounded p-1"
            >
              <XIcon class="h-3.5 w-3.5" />
            </button>
          {/if}
        </label>

        <div
          role="group"
          aria-label="按词素类型筛选"
          class="border-border bg-bg-secondary grid shrink-0 grid-cols-4 items-center rounded-lg border p-0.5 text-xs sm:inline-flex"
        >
          {#each [['all', `全部 ${data.stats.totalRoots}`], ['prefix', `前缀 ${data.stats.byKind.prefix}`], ['root', `词根 ${data.stats.byKind.root}`], ['suffix', `后缀 ${data.stats.byKind.suffix}`]] as [value, label] (value)}
            <button
              type="button"
              aria-pressed={kind === value}
              onclick={() => (kind = value as KindFilter)}
              class={`rounded-md px-2 py-1.5 text-center font-medium transition-colors sm:px-2.5 ${
                kind === value
                  ? 'bg-bg-primary text-text-primary shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {label}
            </button>
          {/each}
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div class="flex flex-wrap items-center gap-1.5">
          <span class="text-text-tertiary mr-0.5">语源</span>
          {#each [['all', '全部'], ['Latin', '拉丁语'], ['Greek', '希腊语'], ['Old English', '古英语'], ['rare', '其他']] as [value, label] (value)}
            <button
              type="button"
              aria-pressed={origin === value}
              onclick={() => (origin = value as OriginFilter)}
              class={`rounded-md border px-2.5 py-1.5 transition-colors sm:px-2 sm:py-1 ${
                origin === value
                  ? 'border-accent/40 bg-accent/10 text-accent font-medium'
                  : 'border-border bg-bg-primary text-text-secondary hover:border-border-tertiary hover:text-text-primary'
              }`}
            >
              {label}
            </button>
          {/each}
        </div>

        <div class="flex flex-wrap items-center gap-1.5">
          <span class="text-text-tertiary mr-0.5">状态</span>
          {#each [['all', '全部'], ['unmastered', '未掌握'], ['due', '待复习'], ['mastered', '已掌握']] as [value, label] (value)}
            <button
              type="button"
              aria-pressed={status === value}
              onclick={() => (status = value as StatusFilter)}
              class={`rounded-md border px-2.5 py-1.5 transition-colors sm:px-2 sm:py-1 ${
                status === value
                  ? 'border-accent/40 bg-accent/10 text-accent font-medium'
                  : 'border-border bg-bg-primary text-text-secondary hover:border-border-tertiary hover:text-text-primary'
              }`}
            >
              {label}
            </button>
          {/each}

          {#if hasActiveFilter}
            <button
              type="button"
              onclick={resetFilters}
              class="text-text-tertiary hover:text-text-primary ml-1 px-1.5 py-1 underline underline-offset-4"
            >
              重置
            </button>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- Cards Grid -->
  {#if visibleMatches.length === 0}
    <div
      class="border-border bg-bg-secondary/40 rounded-xl border py-14 text-center"
    >
      <p class="text-text-secondary m-0 text-sm">没有匹配结果。</p>
      <button
        type="button"
        onclick={resetFilters}
        class="border-border-secondary bg-bg-primary text-text-primary hover:bg-bg-secondary mt-3 rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors"
      >
        重置筛选
      </button>
    </div>
  {:else}
    <div class="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {#each visibleMatches as { item } (item.id)}
        {@const itemStatus = progress.getStatus(item.id)}
        <article data-root-card-id={item.id} class="root-explorer-card rc-card">
          <div>
            <a href={`/roots/${item.id}`} class="rc-head-link no-underline">
              <div class="rc-top">
                <span class="rc-title">{item.root}</span>
                <div class="rc-badges">
                  {#if itemStatus === 'mastered'}
                    <span data-tooltip="已掌握" class="rc-mastered">
                      <CheckIcon class="h-3 w-3" />
                    </span>
                  {:else if itemStatus === 'due'}
                    <span class="rc-due">待复习</span>
                  {/if}
                  <span class={`rc-kind rc-kind--${item.kind}`}>
                    {MORPHEME_KIND_LABELS[item.kind]}
                  </span>
                </div>
              </div>
              <p class="rc-meaning">{item.meaning}</p>
            </a>

            <div class="rc-examples">
              {#each item.previewExamples as example (example.word)}
                <div class="rc-ex">
                  <div class="rc-ex-row">
                    <WordAudioButton word={example.word} size="sm" />
                    <span class="rc-ex-word">{example.word}</span>
                    <span class="rc-dot">·</span>
                    <span class="rc-ex-meaning">{example.meaning}</span>
                  </div>
                  <div class="rc-ex-parts">
                    {#each example.parts as part, pIdx (`${part.kind}-${pIdx}`)}
                      {#if pIdx > 0}
                        <span class="rc-dot"> + </span>
                      {/if}
                      <span class="rc-part-text">{part.text}</span
                      >{#if part.meaning}<span>({part.meaning})</span>{/if}
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <div class="rc-foot">
            <span>{item.originLabel}</span>
            <div class="rc-foot-meta">
              <span>{item.exampleCount} 例</span>
              <span class="rc-dot">#{item.id}</span>
            </div>
          </div>
        </article>
      {/each}
    </div>

    {#if remainingCount > 0}
      <div class="flex justify-center pt-2">
        <button
          type="button"
          onclick={() => (visibleLimit += BATCH_SIZE)}
          class="border-border-secondary bg-bg-primary text-text-primary hover:bg-bg-secondary rounded-lg border px-5 py-2 text-sm font-medium transition-colors"
        >
          加载更多（剩余 {remainingCount} 组）
        </button>
      </div>
    {/if}
  {/if}
</div>

<style>
  .rc-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    background-color: var(--color-bg-primary);
    padding: 1rem;
    transition: border-color 150ms ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .rc-card:hover {
      border-color: var(--color-border-tertiary);
    }

    .rc-head-link:hover .rc-title {
      color: var(--color-accent);
    }
  }

  .rc-head-link {
    display: block;
  }

  .rc-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .rc-title {
    color: var(--color-text-primary);
    font-family: var(--font-mono);
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    transition: color 150ms ease;
  }

  .rc-badges {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 0.375rem;
  }

  .rc-mastered {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 9999px;
    background-color: var(--color-success-bg);
    color: var(--color-success);
  }

  .rc-due {
    border-radius: 0.25rem;
    background-color: var(--color-warning-bg);
    color: var(--color-warning);
    padding: 0.125rem 0.375rem;
    font-size: 11px;
    font-weight: 500;
  }

  .rc-kind {
    border-radius: 0.25rem;
    padding: 0.125rem 0.375rem;
    font-size: 11px;
    font-weight: 500;
  }

  .rc-kind--prefix {
    background-color: var(--color-prefix-bg);
    color: var(--color-prefix);
  }

  .rc-kind--root {
    background-color: var(--color-root-bg);
    color: var(--color-root);
  }

  .rc-kind--suffix {
    background-color: var(--color-suffix-bg);
    color: var(--color-suffix);
  }

  .rc-meaning {
    margin: 0.25rem 0 0;
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
  }

  .rc-examples {
    margin-top: 0.75rem;
    border-top: 1px solid var(--color-border);
    padding-top: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .rc-ex {
    font-size: 0.75rem;
    line-height: 1.5;
  }

  .rc-ex-row {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  .rc-ex-word {
    color: var(--color-text-primary);
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 600;
  }

  .rc-ex-meaning {
    color: var(--color-text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .rc-ex-parts {
    margin-top: 0.125rem;
    padding-left: 1.875rem;
    color: var(--color-text-tertiary);
  }

  .rc-part-text {
    color: var(--color-text-secondary);
    font-family: var(--font-mono);
  }

  .rc-dot {
    color: var(--color-text-quaternary);
  }

  .rc-foot {
    margin-top: 0.875rem;
    border-top: 1px solid var(--color-border);
    padding-top: 0.625rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-text-tertiary);
    font-size: 0.75rem;
  }

  .rc-foot-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
  }
</style>
