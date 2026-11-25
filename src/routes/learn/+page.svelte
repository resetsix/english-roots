<script lang="ts">
  import { page } from '$app/state'
  import {
    MORPHEME_KIND_LABELS,
    normalizeQuizAnswer,
    type FullRootItem,
  } from '$lib/data/taxonomy'
  import { audio } from '$lib/stores/audio.svelte'
  import { dataCache } from '$lib/stores/data-cache.svelte'
  import {
    navigation,
    type LearnQueueMode,
  } from '$lib/stores/navigation.svelte'
  import { progress } from '$lib/stores/progress.svelte'
  import { ui } from '$lib/stores/ui.svelte'
  import {
    getScrollBehavior,
    hasBlockingOverlay,
    isComposingEvent,
    isEditableTarget,
  } from '$lib/utils/shortcuts'
  import ExampleCard from '$lib/components/ExampleCard.svelte'
  import RootNotes from '$lib/components/RootNotes.svelte'
  import CheckIcon from '$lib/components/icons/CheckIcon.svelte'
  import ChevronLeftIcon from '$lib/components/icons/ChevronLeftIcon.svelte'
  import ChevronRightIcon from '$lib/components/icons/ChevronRightIcon.svelte'
  import ShuffleIcon from '$lib/components/icons/ShuffleIcon.svelte'
  import XIcon from '$lib/components/icons/XIcon.svelte'

  type QueueMode = LearnQueueMode

  const QUEUE_MODES: Array<[QueueMode, string]> = [
    ['all', '顺序'],
    ['unmastered', '未掌握'],
    ['due', '待复习'],
    ['prefix', '前缀'],
    ['root', '词根'],
    ['suffix', '后缀'],
  ]

  let mode = $state<QueueMode>('all')
  let isShuffled = $state(false)
  let queueIds = $state<number[]>([])
  let queueIndex = $state(0)
  let stage = $state<'read' | 'quiz'>('read')
  let selectedOption = $state<number | null>(null)
  let initializedFromQuery = $state(false)

  let allRoots = $derived(dataCache.fullItems ?? [])
  let rootsById = $derived(new Map(allRoots.map((item) => [item.id, item])))

  function buildQueueIds(
    roots: FullRootItem[],
    nextMode: QueueMode,
    shuffle = false,
  ): number[] {
    let list: FullRootItem[]
    if (nextMode === 'unmastered') {
      list = roots.filter((item) => !progress.masteredSet.has(item.id))
    } else if (nextMode === 'due') {
      list = roots.filter((item) => progress.dueSet.has(item.id))
    } else if (
      nextMode === 'prefix' ||
      nextMode === 'root' ||
      nextMode === 'suffix'
    ) {
      list = roots.filter((item) => item.kind === nextMode)
    } else {
      list = roots
    }

    const ids = list.map((item) => item.id)
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
      if (initializedFromQuery) return
      initializedFromQuery = true

      const params = page.url.searchParams
      const rawId = params.get('id')
      const rawIndex = params.get('index')

      if (rawId && Number.isInteger(Number(rawId))) {
        const ids = buildQueueIds(roots, 'all', false)
        const idx = roots.findIndex((item) => item.id === Number(rawId))
        mode = 'all'
        isShuffled = false
        queueIds = ids
        if (idx >= 0) {
          queueIndex = idx
          progress.setCurrentRootIndex(idx)
          return
        }
      }
      if (rawIndex !== null && Number.isFinite(Number(rawIndex))) {
        const ids = buildQueueIds(roots, 'all', false)
        const idx = Math.max(
          0,
          Math.min(roots.length - 1, Math.floor(Number(rawIndex))),
        )
        mode = 'all'
        isShuffled = false
        queueIds = ids
        queueIndex = idx
        progress.setCurrentRootIndex(idx)
        return
      }

      const saved = navigation.learnState
      if (saved && saved.queueIds.length > 0) {
        const validSet = new Set(roots.map((item) => item.id))
        const restoredIds = saved.queueIds.filter((id) => validSet.has(id))
        if (restoredIds.length > 0) {
          mode = saved.mode
          isShuffled = saved.isShuffled
          queueIds = restoredIds
          queueIndex = Math.min(saved.queueIndex, restoredIds.length - 1)
          stage = saved.stage
          return
        }
      }

      mode = 'all'
      isShuffled = false
      queueIds = buildQueueIds(roots, 'all', false)
      queueIndex = Math.max(
        0,
        Math.min(roots.length - 1, progress.data.currentRootIndex),
      )
    })
  })

  $effect(() => {
    if (!initializedFromQuery || queueIds.length === 0) return
    navigation.saveLearnState({
      mode,
      isShuffled,
      queueIds,
      queueIndex: safeIndex,
      stage,
    })
  })

  let queue = $derived.by((): FullRootItem[] => {
    if (queueIds.length === 0 || allRoots.length === 0) return []
    return queueIds
      .map((id) => rootsById.get(id))
      .filter((item): item is FullRootItem => Boolean(item))
  })

  let safeIndex = $derived(
    queue.length > 0
      ? ((queueIndex % queue.length) + queue.length) % queue.length
      : 0,
  )
  let current = $derived(queue[safeIndex] ?? null)
  let currentStatus = $derived(current ? progress.getStatus(current.id) : 'new')
  let correctText = $derived(
    current ? (current.quiz.options[current.quiz.correctAnswer] ?? '') : '',
  )
  let normalizedCorrect = $derived(normalizeQuizAnswer(correctText))
  let answeredCorrect = $derived(
    selectedOption !== null &&
      current !== null &&
      (selectedOption === current.quiz.correctAnswer ||
        normalizeQuizAnswer(current.quiz.options[selectedOption] ?? '') ===
          normalizedCorrect),
  )

  function isClearedFromDynamicMode(rootId: number): boolean {
    if (mode === 'due') return !progress.dueSet.has(rootId)
    if (mode === 'unmastered') return progress.masteredSet.has(rootId)
    return false
  }

  function goTo(nextIndex: number) {
    if (queue.length === 0) return

    // Defer removing mastered/reviewed item from due/unmastered snapshot until leaving it
    if (current && isClearedFromDynamicMode(current.id)) {
      const nextIds = queueIds.filter((_, idx) => idx !== safeIndex)
      queueIds = nextIds
      stage = 'read'
      selectedOption = null
      if (nextIds.length === 0) {
        queueIndex = 0
      } else {
        const goingForward = nextIndex >= safeIndex
        const targetIdx = goingForward ? safeIndex : safeIndex - 1
        queueIndex =
          ((targetIdx % nextIds.length) + nextIds.length) % nextIds.length
      }
      window.scrollTo({ top: 0, behavior: getScrollBehavior() })
      return
    }

    const normalized =
      ((nextIndex % queue.length) + queue.length) % queue.length
    queueIndex = normalized
    stage = 'read'
    selectedOption = null

    if (mode === 'all' && !isShuffled) {
      const target = queue[normalized]
      if (target) progress.setCurrentRootIndex(Math.max(0, target.id - 1))
    }
    window.scrollTo({ top: 0, behavior: getScrollBehavior() })
  }

  function changeMode(nextMode: QueueMode) {
    mode = nextMode
    isShuffled = false
    queueIds = buildQueueIds(allRoots, nextMode, false)
    queueIndex = 0
    stage = 'read'
    selectedOption = null
  }

  function toggleShuffle() {
    if (allRoots.length === 0) return
    mode = 'all'
    isShuffled = true
    queueIds = buildQueueIds(allRoots, 'all', true)
    queueIndex = 0
    stage = 'read'
    selectedOption = null
    ui.toast({
      id: 'learn-shuffle',
      message: '已切换为随机顺序',
      durationMs: 1500,
    })
  }

  function toggleMasteredCurrent() {
    if (!current) return
    const { mastered, unlocked } = progress.toggleMastered(current.id)
    if (unlocked[0]) {
      ui.toast({
        id: `ach-${unlocked[0].id}`,
        message: `解锁成就：${unlocked[0].title}`,
        variant: 'success',
      })
    } else {
      ui.toast({
        id: `learn-master-${current.id}`,
        message: mastered ? '已标记掌握' : '已取消掌握',
        variant: mastered ? 'success' : 'info',
        durationMs: 1500,
      })
    }
  }

  function handleAnswer(index: number) {
    if (!current || selectedOption !== null) return
    selectedOption = index
    const right =
      index === current.quiz.correctAnswer ||
      normalizeQuizAnswer(current.quiz.options[index] ?? '') ===
        normalizedCorrect

    if (right) {
      const { unlocked } = progress.recordRecall(current.id, 'good')
      if (unlocked[0]) {
        ui.toast({
          id: `ach-${unlocked[0].id}`,
          message: `解锁成就：${unlocked[0].title}`,
          variant: 'success',
        })
      }
    } else {
      progress.recordRecall(current.id, 'again')
    }
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

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(safeIndex - 1)
      return
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(safeIndex + 1)
      return
    }
    if (event.key === ' ') {
      event.preventDefault()
      stage = stage === 'read' ? 'quiz' : 'read'
      return
    }
    if (event.key.toLowerCase() === 'm') {
      event.preventDefault()
      toggleMasteredCurrent()
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
    if (stage === 'quiz') {
      if (selectedOption === null && ['1', '2', '3', '4'].includes(event.key)) {
        const idx = Number(event.key) - 1
        if (idx < current.quiz.options.length) {
          event.preventDefault()
          handleAnswer(idx)
        }
        return
      }
      if (selectedOption !== null && event.key === 'Enter') {
        event.preventDefault()
        goTo(safeIndex + 1)
      }
    }
  }
</script>

<svelte:window onkeydown={handleKeyDown} />

<svelte:head>
  <title>学习 · 词根树</title>
  <meta
    name="description"
    content="逐组学习英语前缀、词根与后缀，配合例词发音与自测。"
  />
</svelte:head>

<div
  class="animate-content-enter mx-auto w-full max-w-4xl space-y-5 px-4 py-8 sm:px-6 sm:py-10"
>
  <!-- Queue Selector & Progress -->
  <div
    class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
  >
    <div class="flex flex-wrap items-center gap-1.5">
      {#each QUEUE_MODES as [value, label] (value)}
        <button
          type="button"
          aria-pressed={mode === value && !isShuffled}
          onclick={() => changeMode(value)}
          class={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors sm:py-1 ${
            mode === value && !isShuffled
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
        onclick={toggleShuffle}
        class={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors sm:py-1 ${
          isShuffled
            ? 'border-accent/40 bg-accent/10 text-accent'
            : 'border-border bg-bg-primary text-text-secondary hover:border-border-tertiary hover:text-text-primary'
        }`}
      >
        <ShuffleIcon class="h-3 w-3" />
        <span>随机</span>
      </button>
    </div>

    <div
      class="text-text-tertiary flex items-center gap-3 font-mono text-xs tabular-nums"
    >
      <span>
        当前 <strong class="text-text-primary"
          >{queue.length ? safeIndex + 1 : 0}</strong
        >/{queue.length}
      </span>
      <span>
        已掌握 <strong class="text-text-primary"
          >{progress.masteredCount}</strong
        >/{allRoots.length || 300}
      </span>
    </div>
  </div>

  {#if dataCache.fullLoading && allRoots.length === 0}
    <h1 class="sr-only">学习</h1>
    <div class="border-border bg-bg-secondary/40 rounded-xl border p-8">
      <div class="bg-bg-tertiary h-6 w-32 animate-pulse rounded"></div>
      <div class="bg-bg-tertiary mt-4 h-12 w-48 animate-pulse rounded"></div>
      <div class="mt-6 grid gap-3 sm:grid-cols-2">
        <div class="bg-bg-tertiary h-32 animate-pulse rounded-lg"></div>
        <div class="bg-bg-tertiary h-32 animate-pulse rounded-lg"></div>
      </div>
    </div>
  {:else if dataCache.fullError && allRoots.length === 0}
    <h1 class="sr-only">学习</h1>
    <div
      class="border-danger-border bg-danger-bg text-danger flex items-center justify-between gap-3 rounded-xl border p-5 text-sm"
    >
      <span>{dataCache.fullError}</span>
      <button
        type="button"
        onclick={() => void dataCache.loadFullRoots(true)}
        class="underline underline-offset-4"
      >
        重试
      </button>
    </div>
  {:else if !current}
    <h1 class="sr-only">学习</h1>
    <div
      class="border-border bg-bg-secondary/40 rounded-xl border py-14 text-center"
    >
      <p class="text-text-secondary m-0 text-sm">
        {mode === 'due' ? '暂无待复习内容。' : '这一组已全部掌握。'}
      </p>
      <button
        type="button"
        onclick={() => changeMode('all')}
        class="border-border-secondary bg-bg-primary text-text-primary hover:bg-bg-secondary mt-3 rounded-lg border px-4 py-1.5 text-xs font-medium transition-colors"
      >
        切回顺序模式
      </button>
    </div>
  {:else}
    <article class="border-border bg-bg-primary rounded-xl border p-5 sm:p-7">
      <!-- Top Controls -->
      <div
        class="border-border flex flex-wrap items-center justify-between gap-3 border-b pb-4"
      >
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-text-tertiary font-mono text-xs">
            #{String(current.id).padStart(3, '0')}
          </span>
          <span
            class={`rounded px-1.5 py-0.5 text-xs font-medium ${
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
            class="border-border bg-bg-secondary text-text-secondary rounded border px-1.5 py-0.5 text-xs"
          >
            {current.originLabel}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <div
            role="tablist"
            aria-label="学习阶段"
            class="border-border bg-bg-secondary inline-flex rounded-lg border p-0.5 text-xs"
          >
            <button
              type="button"
              role="tab"
              aria-selected={stage === 'read'}
              onclick={() => (stage = 'read')}
              class={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                stage === 'read'
                  ? 'bg-bg-primary text-text-primary shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              精读
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={stage === 'quiz'}
              onclick={() => (stage = 'quiz')}
              class={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                stage === 'quiz'
                  ? 'bg-bg-primary text-text-primary shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              自测
            </button>
          </div>

          <button
            type="button"
            onclick={toggleMasteredCurrent}
            data-tooltip="标记或取消掌握 (M)"
            class={`inline-flex h-8 items-center gap-1 rounded-lg border px-2.5 text-xs font-medium transition-colors ${
              currentStatus === 'mastered'
                ? 'border-success-border bg-success-bg text-success'
                : 'border-border bg-bg-primary text-text-secondary hover:border-border-tertiary hover:text-text-primary'
            }`}
          >
            <CheckIcon class="h-3.5 w-3.5" />
            <span>{currentStatus === 'mastered' ? '已掌握' : '标记掌握'}</span>
          </button>
        </div>
      </div>

      {#if stage === 'read'}
        <div class="mt-6 space-y-6">
          <div>
            <h1
              class="text-text-primary m-0 font-mono text-3xl font-bold tracking-tight sm:text-5xl"
            >
              {current.root}
            </h1>
            <div class="mt-2.5 flex flex-wrap items-baseline gap-2.5">
              <span class="text-text-primary text-lg font-semibold">
                {current.meaning}
              </span>
              {#if current.meaningEn}
                <span class="text-text-tertiary font-mono text-sm">
                  {current.meaningEn}
                </span>
              {/if}
            </div>
            <div class="mt-3">
              <RootNotes root={current} />
            </div>
          </div>

          <div>
            <div class="mb-3 flex items-center justify-between">
              <h2 class="text-text-primary m-0 text-sm font-semibold">
                例词（{current.examples.length}）
              </h2>
              <span class="text-text-tertiary hidden text-xs sm:inline">
                <kbd class="kbd-key">A</kbd> 朗读首词 ·
                <kbd class="kbd-key">Space</kbd> 自测
              </span>
            </div>
            <div class="grid gap-3 sm:grid-cols-2">
              {#each current.examples as example (example.word)}
                <ExampleCard {example} rootMeaningFallback={current.meaning} />
              {/each}
            </div>
          </div>
        </div>
      {:else}
        <h1 class="sr-only">自测：{current.root}</h1>
        <div class="mt-6">
          <div class="border-border bg-bg-secondary/50 rounded-xl border p-5">
            <div class="text-text-tertiary text-xs font-medium">自测</div>
            <p class="text-text-primary mt-2 mb-0 text-lg font-semibold">
              {current.quiz.question}
            </p>

            <div class="mt-4 grid gap-2.5 sm:grid-cols-2">
              {#each current.quiz.options as option, idx (`${option}-${idx}`)}
                {@const isAnswered = selectedOption !== null}
                {@const isRightOpt =
                  normalizeQuizAnswer(option) === normalizedCorrect}
                {@const showRight = isAnswered && isRightOpt}
                {@const showWrong =
                  isAnswered &&
                  idx === selectedOption &&
                  !answeredCorrect &&
                  !isRightOpt}
                <button
                  type="button"
                  disabled={isAnswered}
                  onclick={() => handleAnswer(idx)}
                  class={`flex min-h-12 items-center justify-between gap-2 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                    showRight
                      ? 'border-success-border bg-success-bg text-success font-medium'
                      : showWrong
                        ? 'border-danger-border bg-danger-bg text-danger'
                        : isAnswered
                          ? 'border-border bg-bg-primary text-text-tertiary'
                          : 'border-border bg-bg-primary text-text-primary hover:border-accent/50 hover:bg-bg-secondary'
                  }`}
                >
                  <span class="flex items-center gap-2.5">
                    <span class="kbd-key">{idx + 1}</span>
                    <span>{option}</span>
                  </span>
                  {#if showRight}
                    <CheckIcon class="h-4 w-4 shrink-0" />
                  {:else if showWrong}
                    <XIcon class="h-4 w-4 shrink-0" />
                  {/if}
                </button>
              {/each}
            </div>

            {#if selectedOption !== null}
              <div
                class={`mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border px-4 py-3 text-sm ${
                  answeredCorrect
                    ? 'border-success-border bg-success-bg text-success'
                    : 'border-danger-border bg-danger-bg text-danger'
                }`}
              >
                <span>
                  {answeredCorrect
                    ? '答对了，按 Enter 下一组。'
                    : `答错了，正确答案是「${correctText}」，已加入复习。`}
                </span>
                <button
                  type="button"
                  onclick={() => (stage = 'read')}
                  class="text-xs underline underline-offset-4"
                >
                  查看例词
                </button>
              </div>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Bottom Action Bar -->
      <div
        class="border-border mt-7 flex flex-wrap items-center justify-between gap-3 border-t pt-4"
      >
        <button
          type="button"
          onclick={() => goTo(safeIndex - 1)}
          class="border-border bg-bg-primary text-text-secondary hover:border-border-tertiary hover:text-text-primary inline-flex h-9 items-center gap-1 rounded-lg border px-3 text-sm font-medium transition-colors"
        >
          <ChevronLeftIcon class="h-4 w-4" />
          <span>上一组</span>
        </button>

        <div class="flex flex-wrap items-center gap-2">
          <a
            href={`/roots/${current.id}`}
            class="text-text-tertiary hover:text-text-primary px-2 py-1 text-xs"
          >
            查看详情
          </a>
          {#if stage === 'read'}
            <button
              type="button"
              onclick={() => (stage = 'quiz')}
              class="bg-accent text-accent-foreground inline-flex h-9 items-center rounded-lg px-4 text-sm font-medium transition-opacity hover:opacity-90"
            >
              自测
            </button>
            <button
              type="button"
              onclick={() => goTo(safeIndex + 1)}
              class="border-border bg-bg-primary text-text-secondary hover:border-border-tertiary hover:text-text-primary inline-flex h-9 items-center gap-1 rounded-lg border px-3 text-sm font-medium transition-colors"
            >
              <span>下一组</span>
              <ChevronRightIcon class="h-4 w-4" />
            </button>
          {:else}
            <button
              type="button"
              onclick={() => goTo(safeIndex + 1)}
              class="bg-accent text-accent-foreground inline-flex h-9 items-center gap-1 rounded-lg px-4 text-sm font-medium transition-opacity hover:opacity-90"
            >
              <span>下一组</span>
              <ChevronRightIcon class="h-4 w-4" />
            </button>
          {/if}
        </div>
      </div>
    </article>
  {/if}
</div>
