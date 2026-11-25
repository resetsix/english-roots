<script lang="ts">
  import { page } from '$app/state'
  import { MORPHEME_KIND_LABELS, type FullRootItem } from '$lib/data/taxonomy'
  import { audio } from '$lib/stores/audio.svelte'
  import { dataCache } from '$lib/stores/data-cache.svelte'
  import {
    navigation,
    type FlashcardDeckMode,
  } from '$lib/stores/navigation.svelte'
  import { progress, type RecallGrade } from '$lib/stores/progress.svelte'
  import { ui } from '$lib/stores/ui.svelte'
  import {
    hasBlockingOverlay,
    isComposingEvent,
    isEditableTarget,
  } from '$lib/utils/shortcuts'
  import ExampleCard from '$lib/components/ExampleCard.svelte'
  import RootNotes from '$lib/components/RootNotes.svelte'
  import ChevronLeftIcon from '$lib/components/icons/ChevronLeftIcon.svelte'
  import ChevronRightIcon from '$lib/components/icons/ChevronRightIcon.svelte'
  import ShuffleIcon from '$lib/components/icons/ShuffleIcon.svelte'

  type DeckMode = FlashcardDeckMode

  const DECK_TABS: Array<[DeckMode, string]> = [
    ['due', '待复习'],
    ['unmastered', '未掌握'],
    ['all', '全部'],
    ['prefix', '前缀'],
    ['root', '词根'],
    ['suffix', '后缀'],
  ]

  let mode = $state<DeckMode>('all')
  let deckIds = $state<number[]>([])
  let cursor = $state(0)
  let revealed = $state(false)
  let hintShown = $state(false)
  let reviewedCount = $state(0)
  let initialized = $state(false)
  let touchStartX = 0

  let allRoots = $derived(dataCache.fullItems ?? [])
  let rootsById = $derived(new Map(allRoots.map((item) => [item.id, item])))

  function buildDeckIds(
    roots: FullRootItem[],
    nextMode: DeckMode,
    shuffle = false,
  ): number[] {
    let filtered: FullRootItem[]
    if (nextMode === 'due') {
      filtered = roots.filter((item) => progress.dueSet.has(item.id))
    } else if (nextMode === 'unmastered') {
      filtered = roots.filter((item) => !progress.masteredSet.has(item.id))
    } else if (
      nextMode === 'prefix' ||
      nextMode === 'root' ||
      nextMode === 'suffix'
    ) {
      filtered = roots.filter((item) => item.kind === nextMode)
    } else {
      filtered = roots
    }

    const ids = filtered.map((item) => item.id)
    if (shuffle) {
      for (let i = ids.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
        const tmp = ids[i]
        ids[i] = ids[j]
        ids[j] = tmp
      }
    }
    return ids
  }

  $effect(() => {
    void dataCache.loadFullRoots().then((roots) => {
      if (initialized) return
      initialized = true

      const rawMode = page.url.searchParams.get('mode')
      const explicitMode: DeckMode | null =
        rawMode === 'due' ||
        rawMode === 'unmastered' ||
        rawMode === 'all' ||
        rawMode === 'prefix' ||
        rawMode === 'root' ||
        rawMode === 'suffix'
          ? rawMode
          : null

      const saved = navigation.flashcardState
      const validSet = new Set(roots.map((item) => item.id))
      const savedIds = saved
        ? saved.deckIds.filter((id) => validSet.has(id))
        : []

      if (
        saved &&
        savedIds.length > 0 &&
        (explicitMode === null || explicitMode === saved.mode)
      ) {
        mode = saved.mode
        deckIds = savedIds
        cursor = Math.min(saved.cursor, savedIds.length - 1)
        revealed = saved.revealed
        hintShown = saved.hintShown
        reviewedCount = saved.reviewedCount
        return
      }

      const initialMode: DeckMode =
        explicitMode ?? (progress.dueRootIds.length > 0 ? 'due' : 'all')

      mode = initialMode
      const ids = buildDeckIds(roots, initialMode, false)
      deckIds = ids
      if (initialMode === 'all' && ids.length > 0) {
        cursor = Math.max(
          0,
          Math.min(ids.length - 1, progress.data.flashcardIndex),
        )
      } else {
        cursor = 0
      }
    })
  })

  $effect(() => {
    if (!initialized) return
    navigation.saveFlashcardState({
      mode,
      deckIds,
      cursor: safeCursor,
      revealed,
      hintShown,
      reviewedCount,
    })
  })

  let safeCursor = $derived(
    deckIds.length > 0
      ? ((cursor % deckIds.length) + deckIds.length) % deckIds.length
      : 0,
  )
  let current = $derived(
    deckIds.length > 0 ? (rootsById.get(deckIds[safeCursor]) ?? null) : null,
  )
  let pct = $derived(
    deckIds.length > 0
      ? Math.round(((safeCursor + 1) / deckIds.length) * 100)
      : 0,
  )

  function moveTo(nextCursor: number, nextDeck = deckIds) {
    if (nextDeck.length === 0) return
    const normalized =
      ((nextCursor % nextDeck.length) + nextDeck.length) % nextDeck.length
    cursor = normalized
    revealed = false
    hintShown = false
    if (mode === 'all') {
      progress.setFlashcardIndex(normalized)
    }
  }

  function switchDeck(nextMode: DeckMode, shuffle = false) {
    mode = nextMode
    deckIds = buildDeckIds(allRoots, nextMode, shuffle)
    cursor = 0
    revealed = false
    hintShown = false
    if (shuffle) {
      ui.toast({
        id: 'flash-shuffle',
        message: '已打乱顺序',
        durationMs: 1400,
      })
    }
  }

  function handleRate(grade: RecallGrade) {
    if (!current) return
    const { unlocked } = progress.recordRecall(current.id, grade)
    reviewedCount += 1

    if (unlocked[0]) {
      ui.toast({
        id: `ach-${unlocked[0].id}`,
        message: `解锁成就：${unlocked[0].title}`,
        variant: 'success',
      })
    }

    if (grade === 'again') {
      const nextDeck = [...deckIds]
      const insertAt = Math.min(nextDeck.length, safeCursor + 4)
      nextDeck.splice(insertAt, 0, current.id)
      deckIds = nextDeck
      moveTo(safeCursor + 1, nextDeck)
      ui.toast({
        id: 'flash-again',
        message: '3 张后再次出现',
        durationMs: 1400,
      })
      return
    }

    const shouldRemoveFromDeck =
      (mode === 'due' && (grade === 'good' || grade === 'hard')) ||
      (mode === 'unmastered' && grade === 'good')

    if (shouldRemoveFromDeck) {
      const nextDeck = deckIds.filter((_, idx) => idx !== safeCursor)
      deckIds = nextDeck
      revealed = false
      hintShown = false
      cursor = nextDeck.length > 0 ? safeCursor % nextDeck.length : 0
      return
    }

    moveTo(safeCursor + 1)
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (
      !current ||
      event.defaultPrevented ||
      isComposingEvent(event) ||
      hasBlockingOverlay() ||
      isEditableTarget(event.target) ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey
    ) {
      return
    }

    if (event.key === ' ') {
      event.preventDefault()
      revealed = !revealed
      return
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveTo(safeCursor - 1)
      return
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveTo(safeCursor + 1)
      return
    }
    if (event.key.toLowerCase() === 'a') {
      const word = current.examples[0]?.word
      if (word) {
        event.preventDefault()
        void audio.play(word)
      }
      return
    }
    if (revealed) {
      if (event.key === '1') {
        event.preventDefault()
        handleRate('again')
      } else if (event.key === '2') {
        event.preventDefault()
        handleRate('hard')
      } else if (event.key === '3') {
        event.preventDefault()
        handleRate('good')
      }
    }
  }
</script>

<svelte:window onkeydown={handleKeyDown} />

<svelte:head>
  <title>闪卡 · 词根树</title>
  <meta
    name="description"
    content="用闪卡复习英语前缀、词根与后缀，按记忆程度安排下次复习。"
  />
</svelte:head>

<div
  class="animate-content-enter mx-auto w-full max-w-4xl space-y-5 px-4 py-8 sm:px-6 sm:py-10"
>
  <!-- Deck Tabs & Counter -->
  <div
    class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
  >
    <div class="flex flex-wrap items-center gap-1.5">
      {#each DECK_TABS as [value, label] (value)}
        <button
          type="button"
          aria-pressed={mode === value}
          onclick={() => switchDeck(value, false)}
          class={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors sm:py-1 ${
            mode === value
              ? 'border-accent/40 bg-accent/10 text-accent'
              : 'border-border bg-bg-primary text-text-secondary hover:border-border-tertiary hover:text-text-primary'
          }`}
        >
          {label}
          {#if value === 'due' && progress.dueRootIds.length > 0}
            <span class="ml-1 font-mono">({progress.dueRootIds.length})</span>
          {/if}
        </button>
      {/each}

      <button
        type="button"
        onclick={() => switchDeck(mode, true)}
        class="border-border bg-bg-primary text-text-secondary hover:border-border-tertiary hover:text-text-primary inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors sm:py-1"
      >
        <ShuffleIcon class="h-3 w-3" />
        <span>洗牌</span>
      </button>
    </div>

    <div
      class="text-text-tertiary flex items-center gap-3 font-mono text-xs tabular-nums"
    >
      <span>
        卡片 <strong class="text-text-primary"
          >{deckIds.length ? safeCursor + 1 : 0}</strong
        >/{deckIds.length}
      </span>
      <span
        >本轮 <strong class="text-text-primary">{reviewedCount}</strong></span
      >
      <span>
        已掌握 <strong class="text-text-primary"
          >{progress.masteredCount}</strong
        >
      </span>
    </div>
  </div>

  <!-- Progress Track -->
  <div class="bg-bg-tertiary h-1 overflow-hidden rounded-full">
    <div
      class="bg-accent h-full rounded-full transition-[width] duration-200"
      style={`width: ${pct}%`}
    ></div>
  </div>

  {#if dataCache.fullLoading && allRoots.length === 0}
    <h1 class="sr-only">闪卡</h1>
    <div class="border-border bg-bg-secondary/40 rounded-xl border p-10">
      <div class="bg-bg-tertiary mx-auto h-10 w-40 animate-pulse rounded"></div>
      <div
        class="bg-bg-tertiary mx-auto mt-6 h-36 max-w-md animate-pulse rounded-lg"
      ></div>
    </div>
  {:else if !current}
    <h1 class="sr-only">闪卡</h1>
    <div
      class="border-border bg-bg-secondary/40 rounded-xl border py-16 text-center"
    >
      <p class="text-text-secondary m-0 text-sm">
        {#if mode === 'due'}
          {reviewedCount > 0 ? '本轮待复习已全部完成。' : '暂无待复习卡片。'}
        {:else if mode === 'unmastered'}
          {reviewedCount > 0 ? '这一组已全部掌握。' : '当前分组为空。'}
        {:else}
          当前分组为空。
        {/if}
      </p>
      <button
        type="button"
        onclick={() => switchDeck('all', false)}
        class="border-border-secondary bg-bg-primary text-text-primary hover:bg-bg-secondary mt-3 rounded-lg border px-4 py-1.5 text-xs font-medium transition-colors"
      >
        查看全部
      </button>
    </div>
  {:else}
    <article
      ontouchstart={(event) => {
        touchStartX = event.changedTouches[0]?.screenX ?? 0
      }}
      ontouchend={(event) => {
        const diff = touchStartX - (event.changedTouches[0]?.screenX ?? 0)
        if (Math.abs(diff) < 55) return
        moveTo(diff > 0 ? safeCursor + 1 : safeCursor - 1)
      }}
      class="border-border bg-bg-primary overflow-hidden rounded-xl border"
    >
      <!-- Front (Recall Prompt) -->
      <div class="p-6 text-center sm:p-10">
        <div class="flex items-center justify-center gap-2 text-xs">
          <span class="text-text-tertiary font-mono">
            #{String(current.id).padStart(3, '0')}
          </span>
          <span
            class={`rounded px-1.5 py-0.5 font-medium ${
              current.kind === 'prefix'
                ? 'bg-prefix-bg text-prefix'
                : current.kind === 'suffix'
                  ? 'bg-suffix-bg text-suffix'
                  : 'bg-root-bg text-root'
            }`}
          >
            {MORPHEME_KIND_LABELS[current.kind]}
          </span>
          <span
            class="border-border bg-bg-secondary text-text-secondary rounded border px-1.5 py-0.5"
          >
            {current.originLabel}
          </span>
        </div>

        <h1
          class="text-text-primary m-0 mt-5 font-mono text-4xl font-bold tracking-tight sm:text-6xl"
        >
          {current.root}
        </h1>

        {#if !revealed}
          <div class="mt-6 flex flex-col items-center gap-3">
            {#if hintShown && current.examples[0]}
              <p class="text-text-secondary m-0 text-sm">
                提示：
                <span class="text-text-primary font-mono font-semibold">
                  {current.examples[0].word}
                </span>
              </p>
            {:else}
              <button
                type="button"
                onclick={() => (hintShown = true)}
                class="text-text-tertiary hover:text-text-primary text-xs underline underline-offset-4"
              >
                提示一个例词
              </button>
            {/if}

            <button
              type="button"
              onclick={() => (revealed = true)}
              class="bg-accent text-accent-foreground mt-2 inline-flex h-10 items-center gap-2 rounded-lg px-6 text-sm font-medium transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              <span>查看释义</span>
              <kbd
                class="border-accent-foreground/35 rounded border px-1.5 py-0.5 font-mono text-xs leading-none"
              >
                Space
              </kbd>
            </button>
          </div>
        {:else}
          <div class="mt-4 flex flex-col items-center gap-1">
            <div class="text-text-primary text-xl font-semibold sm:text-2xl">
              {current.meaning}
            </div>
            {#if current.meaningEn}
              <div class="text-text-tertiary font-mono text-xs">
                {current.meaningEn}
              </div>
            {/if}
          </div>
        {/if}
      </div>

      <!-- Back (Verify & Recall Rating) -->
      {#if revealed}
        <div
          class="animate-content-enter border-border bg-bg-secondary/35 space-y-5 border-t p-5 sm:p-7"
        >
          <RootNotes
            root={current}
            visibleExampleWords={current.examples
              .slice(0, 3)
              .map((item) => item.word)}
            compact
          />

          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {#each current.examples.slice(0, 3) as example (example.word)}
              <ExampleCard
                {example}
                rootMeaningFallback={current.meaning}
                compact
              />
            {/each}
          </div>

          <div class="border-border border-t pt-4">
            <div class="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onclick={() => handleRate('again')}
                class="border-danger-border bg-danger-bg text-danger flex flex-col items-center gap-0.5 rounded-lg border px-2.5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 active:scale-[0.98] sm:px-3"
              >
                <span>没记住</span>
                <span class="text-xs font-normal">1 · 3 张后重现</span>
              </button>
              <button
                type="button"
                onclick={() => handleRate('hard')}
                class="border-warning-border bg-warning-bg text-warning flex flex-col items-center gap-0.5 rounded-lg border px-2.5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 active:scale-[0.98] sm:px-3"
              >
                <span>模糊</span>
                <span class="text-xs font-normal">2 · 明日复习</span>
              </button>
              <button
                type="button"
                onclick={() => handleRate('good')}
                class="border-success-border bg-success-bg text-success flex flex-col items-center gap-0.5 rounded-lg border px-2.5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90 active:scale-[0.98] sm:px-3"
              >
                <span>记住了</span>
                <span class="text-xs font-normal">3 · 标记掌握</span>
              </button>
            </div>
          </div>
        </div>
      {/if}

      <!-- Footer Navigation -->
      <div
        class="border-border flex items-center justify-between border-t px-4 py-3 text-xs sm:px-6"
      >
        <button
          type="button"
          onclick={() => moveTo(safeCursor - 1)}
          class="text-text-secondary hover:text-text-primary inline-flex items-center gap-1 font-medium"
        >
          <ChevronLeftIcon class="h-4 w-4" />
          <span>上一张</span>
        </button>

        <a
          href={`/roots/${current.id}`}
          class="text-text-tertiary hover:text-text-primary"
        >
          查看详情
        </a>

        <button
          type="button"
          onclick={() => moveTo(safeCursor + 1)}
          class="text-text-secondary hover:text-text-primary inline-flex items-center gap-1 font-medium"
        >
          <span>下一张</span>
          <ChevronRightIcon class="h-4 w-4" />
        </button>
      </div>
    </article>
  {/if}

  <p class="text-text-tertiary m-0 text-center text-xs">
    <kbd class="kbd-key">Space</kbd> 翻面 ·
    <kbd class="kbd-key">1</kbd>/<kbd class="kbd-key">2</kbd>/<kbd
      class="kbd-key">3</kbd
    >
    评分 · <kbd class="kbd-key">←</kbd>/<kbd class="kbd-key">→</kbd> 切换 ·
    <kbd class="kbd-key">A</kbd> 朗读
  </p>
</div>
