<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import { page } from '$app/state'
  import { tick } from 'svelte'
  import { MORPHEME_KIND_LABELS, normalizeQuizAnswer } from '$lib/data/taxonomy'
  import { navigation } from '$lib/stores/navigation.svelte'
  import { progress } from '$lib/stores/progress.svelte'
  import { ui } from '$lib/stores/ui.svelte'
  import {
    getViewportTopObstruction,
    highlightLocatedElement,
    scrollElementIntoComfortableView,
    waitForPaint,
  } from '$lib/utils/locate-card'
  import {
    hasBlockingOverlay,
    isComposingEvent,
    isEditableTarget,
  } from '$lib/utils/shortcuts'
  import ExampleCard from '$lib/components/ExampleCard.svelte'
  import RootNotes from '$lib/components/RootNotes.svelte'
  import ArrowRightIcon from '$lib/components/icons/ArrowRightIcon.svelte'
  import CheckIcon from '$lib/components/icons/CheckIcon.svelte'
  import ChevronLeftIcon from '$lib/components/icons/ChevronLeftIcon.svelte'
  import RotateCcwIcon from '$lib/components/icons/RotateCcwIcon.svelte'
  import XIcon from '$lib/components/icons/XIcon.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  let quizOpen = $state(false)
  let selectedOption = $state<number | null>(null)
  let heroTitleEl = $state<HTMLElement | null>(null)
  let restoreSeq = 0

  let root = $derived(data.root)
  let backAction = $derived(navigation.backAction)
  let status = $derived(progress.getStatus(root.id))
  let correctText = $derived(root.quiz.options[root.quiz.correctAnswer] ?? '')
  let normalizedCorrect = $derived(normalizeQuizAnswer(correctText))
  let isAnswered = $derived(selectedOption !== null)
  let isCorrect = $derived(
    selectedOption !== null &&
      (selectedOption === root.quiz.correctAnswer ||
        normalizeQuizAnswer(root.quiz.options[selectedOption] ?? '') ===
          normalizedCorrect),
  )

  function isPlainLeftClick(event: MouseEvent): boolean {
    return (
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    )
  }

  // Register current detail metadata (for CommandSearch drill-down) & reset quiz state on root change
  $effect(() => {
    const id = root.id
    navigation.setCurrentDetailMeta(id, root.root, root.meaning)
    quizOpen = false
    selectedOption = null

    return () => {
      navigation.clearCurrentDetailMeta(id)
    }
  })

  afterNavigate(() => {
    const seq = ++restoreSeq
    const pending = navigation.consumePendingRestore(page.url.pathname)
    if (!pending || typeof window === 'undefined') return

    void tick()
      .then(() => waitForPaint())
      .then(() => {
        if (seq !== restoreSeq) return
        if (pending.scrollY !== null && pending.scrollY > 0) {
          window.scrollTo({ top: pending.scrollY, behavior: 'instant' })
        }
        if (pending.highlightRootId !== null) {
          const relatedCard = document.querySelector<HTMLElement>(
            `[data-related-root-id="${pending.highlightRootId}"]`,
          )
          if (relatedCard) {
            scrollElementIntoComfortableView(
              relatedCard,
              getViewportTopObstruction(),
            )
            highlightLocatedElement(relatedCard)
          }
        }
      })
  })

  // Header dynamic scroll title takeover (aligned with blog-main)
  $effect(() => {
    ui.setHeaderContext({
      title: root.root,
      subtitle: `${root.meaning} · ${root.originLabel}`,
    })

    if (!heroTitleEl || typeof IntersectionObserver === 'undefined') {
      return () => ui.setHeaderContext(null)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        ui.setShowHeaderContext(!entry.isIntersecting)
      },
      { rootMargin: '-56px 0px 0px 0px', threshold: 0 },
    )
    observer.observe(heroTitleEl)

    return () => {
      observer.disconnect()
      ui.setHeaderContext(null)
    }
  })

  function handleToggleMastered() {
    const { mastered, unlocked } = progress.toggleMastered(root.id)
    if (unlocked[0]) {
      ui.toast({
        id: `ach-${unlocked[0].id}`,
        message: `解锁成就：${unlocked[0].title}`,
        variant: 'success',
      })
    } else {
      ui.toast({
        id: `master-${root.id}`,
        message: mastered ? '已标记掌握' : '已取消掌握',
        variant: mastered ? 'success' : 'info',
      })
    }
  }

  function handleAddToReview() {
    progress.recordRecall(root.id, 'again')
    ui.toast({
      id: `review-${root.id}`,
      message: '已加入待复习',
      variant: 'info',
    })
  }

  function handleSelectOption(index: number) {
    if (selectedOption !== null) return
    selectedOption = index
    const right =
      index === root.quiz.correctAnswer ||
      normalizeQuizAnswer(root.quiz.options[index] ?? '') === normalizedCorrect

    if (right) {
      const { unlocked } = progress.recordRecall(root.id, 'good')
      if (unlocked[0]) {
        ui.toast({
          id: `ach-${unlocked[0].id}`,
          message: `解锁成就：${unlocked[0].title}`,
          variant: 'success',
        })
      }
    } else {
      progress.recordRecall(root.id, 'again')
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (
      !quizOpen ||
      isAnswered ||
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
    if (['1', '2', '3', '4'].includes(event.key)) {
      const idx = Number(event.key) - 1
      if (idx < root.quiz.options.length) {
        event.preventDefault()
        handleSelectOption(idx)
      }
    }
  }
</script>

<svelte:window onkeydown={handleKeyDown} />

<svelte:head>
  <title>{root.root} ({root.meaning}) · 词根树</title>
  <meta
    name="description"
    content={`${root.root}（${root.originLabel}）：${root.meaning}。${root.description.replace(/\n+/g, '')}`}
  />
</svelte:head>

<article
  class="animate-content-enter mx-auto w-full max-w-4xl space-y-8 px-4 py-8 sm:px-6 sm:py-10"
>
  <!-- Breadcrumb & Neighbors -->
  <nav
    aria-label="词条导航"
    class="flex flex-wrap items-center justify-between gap-2 text-xs"
  >
    <div class="-ml-1.5 flex min-w-0 items-center gap-1">
      <a
        href={backAction.href}
        data-tooltip={backAction.tooltip}
        onclick={(event) => {
          if (isPlainLeftClick(event) && backAction.hasHistory) {
            navigation.preparePopBack()
          }
        }}
        class="text-text-secondary hover:text-text-primary inline-flex min-h-8 items-center rounded-md px-1.5 font-medium whitespace-nowrap no-underline transition-colors"
      >
        <ChevronLeftIcon class="h-3.5 w-3.5 shrink-0" />
        {#if backAction.kind === 'detail'}
          <span class="ml-0.5 shrink-0">返回</span>
          <span class="ml-1 max-w-44 truncate font-mono"
            >{backAction.title}</span
          >
        {:else if backAction.hasHistory}
          <span class="ml-0.5">返回{backAction.title}</span>
        {:else}
          <span class="ml-0.5">{backAction.title}</span>
        {/if}
      </a>
      {#if backAction.rootShortcut}
        <span aria-hidden="true" class="text-border select-none">｜</span>
        <a
          href={backAction.rootShortcut.href}
          data-tooltip={backAction.rootShortcut.tooltip}
          onclick={(event) => {
            if (isPlainLeftClick(event)) {
              navigation.prepareJumpToOrigin()
            }
          }}
          class="text-text-tertiary hover:text-text-primary inline-flex min-h-8 shrink-0 items-center rounded-md px-1.5 whitespace-nowrap no-underline transition-colors"
        >
          {backAction.rootShortcut.title}
        </a>
      {/if}
    </div>
    <div class="text-text-tertiary flex items-center gap-3 font-mono">
      {#if data.prev}
        <a
          href={`/roots/${data.prev.id}`}
          class="text-text-secondary hover:text-text-primary"
        >
          ← {data.prev.root}
        </a>
      {/if}
      <span>#{root.id}/{data.totalRoots}</span>
      {#if data.next}
        <a
          href={`/roots/${data.next.id}`}
          class="text-text-secondary hover:text-text-primary"
        >
          {data.next.root} →
        </a>
      {/if}
    </div>
  </nav>

  <!-- Hero -->
  <header class="border-border space-y-5 border-b pb-7">
    <div class="flex flex-wrap items-center gap-2 text-xs">
      <span
        class={`rounded px-2 py-0.5 font-medium ${
          root.kind === 'prefix'
            ? 'bg-prefix-bg text-prefix'
            : root.kind === 'suffix'
              ? 'bg-suffix-bg text-suffix'
              : 'bg-root-bg text-root'
        }`}
      >
        {MORPHEME_KIND_LABELS[root.kind]}
      </span>
      <span
        class="border-border bg-bg-secondary text-text-secondary rounded border px-2 py-0.5"
      >
        {root.originLabel}
      </span>
      <span class="text-text-tertiary font-mono">#{root.id}</span>
    </div>

    <div bind:this={heroTitleEl} data-header-scroll-title>
      <h1
        class="text-text-primary m-0 font-mono text-4xl font-bold tracking-tight sm:text-5xl"
      >
        {root.root}
      </h1>
      <div class="mt-3 flex flex-wrap items-baseline gap-3">
        <span class="text-text-primary text-xl font-semibold">
          {root.meaning}
        </span>
        {#if root.meaningEn}
          <span class="text-text-tertiary font-mono text-sm">
            {root.meaningEn}
          </span>
        {/if}
      </div>
    </div>

    <RootNotes {root} />

    <div class="flex flex-wrap items-center gap-2 pt-1">
      <button
        type="button"
        onclick={handleToggleMastered}
        class={`inline-flex h-9 items-center gap-1.5 rounded-lg border px-3.5 text-sm font-medium transition-colors active:scale-[0.98] ${
          status === 'mastered'
            ? 'border-success-border bg-success-bg text-success'
            : 'border-border-secondary bg-bg-primary text-text-primary hover:bg-bg-secondary'
        }`}
      >
        <CheckIcon class="h-4 w-4" />
        <span>{status === 'mastered' ? '已掌握' : '标记掌握'}</span>
      </button>

      {#if status !== 'due'}
        <button
          type="button"
          onclick={handleAddToReview}
          class="border-border bg-bg-primary text-text-secondary hover:border-border-tertiary hover:text-text-primary inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm transition-colors"
        >
          <RotateCcwIcon class="h-3.5 w-3.5" />
          <span>加入复习</span>
        </button>
      {/if}

      <a
        href={`/learn?index=${root.id - 1}`}
        class="bg-accent text-accent-foreground inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-sm font-medium no-underline transition-opacity hover:opacity-90"
      >
        <span>从这里学习</span>
        <ArrowRightIcon class="h-3.5 w-3.5" />
      </a>
    </div>
  </header>

  <!-- Unified Examples Grid -->
  <section aria-labelledby="examples-heading" class="space-y-3.5">
    <h2
      id="examples-heading"
      class="text-text-primary m-0 text-base font-semibold"
    >
      例词（{root.examples.length}）
    </h2>
    <div class="grid gap-3.5 sm:grid-cols-2">
      {#each root.examples as example (example.word)}
        <ExampleCard {example} rootMeaningFallback={root.meaning} />
      {/each}
    </div>
  </section>

  <!-- Self-check Quiz -->
  <section class="border-border bg-bg-secondary/40 rounded-xl border p-5">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-text-primary m-0 text-base font-semibold">自测</h2>
        <p class="text-text-tertiary mt-1 mb-0 text-xs">支持数字键 1–4 作答</p>
      </div>
      {#if !quizOpen}
        <button
          type="button"
          onclick={() => (quizOpen = true)}
          class="border-border-secondary bg-bg-primary text-text-primary hover:bg-bg-secondary rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors"
        >
          开始自测
        </button>
      {/if}
    </div>

    {#if quizOpen}
      <div class="border-border mt-4 border-t pt-4">
        <p class="text-text-primary m-0 text-sm font-semibold sm:text-base">
          {root.quiz.question}
        </p>
        <div class="mt-3 grid gap-2 sm:grid-cols-2">
          {#each root.quiz.options as option, index (`${option}-${index}`)}
            {@const equivalentRight =
              normalizeQuizAnswer(option) === normalizedCorrect}
            {@const showRight = isAnswered && equivalentRight}
            {@const showWrong =
              isAnswered &&
              index === selectedOption &&
              !isCorrect &&
              !equivalentRight}
            <button
              type="button"
              disabled={isAnswered}
              onclick={() => handleSelectOption(index)}
              class={`flex min-h-11 items-center justify-between gap-2 rounded-lg border px-3.5 py-2.5 text-left text-sm transition-colors ${
                showRight
                  ? 'border-success-border bg-success-bg text-success font-medium'
                  : showWrong
                    ? 'border-danger-border bg-danger-bg text-danger'
                    : isAnswered
                      ? 'border-border bg-bg-primary text-text-tertiary'
                      : 'border-border bg-bg-primary text-text-primary hover:border-accent/50 hover:bg-bg-secondary/60'
              }`}
            >
              <span class="flex items-center gap-2">
                <span class="kbd-key">{index + 1}</span>
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

        {#if isAnswered}
          <div
            class={`mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3.5 py-2.5 text-sm ${
              isCorrect
                ? 'border-success-border bg-success-bg text-success'
                : 'border-danger-border bg-danger-bg text-danger'
            }`}
          >
            <span>
              {isCorrect
                ? '答对了，已标记掌握。'
                : `答错了，正确答案是「${correctText}」，已加入复习。`}
            </span>
            <button
              type="button"
              onclick={() => (selectedOption = null)}
              class="text-xs underline underline-offset-4"
            >
              再做一次
            </button>
          </div>
        {/if}
      </div>
    {/if}
  </section>

  <!-- Related Roots -->
  {#if data.related.length > 0}
    <section
      aria-labelledby="related-heading"
      class="border-border space-y-3.5 border-t pt-7"
    >
      <h2
        id="related-heading"
        class="text-text-primary m-0 text-base font-semibold"
      >
        相关词素
      </h2>
      <div class="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {#each data.related as item (item.id)}
          <a
            href={`/roots/${item.id}`}
            data-related-root-id={item.id}
            onclick={(event) => {
              if (isPlainLeftClick(event)) {
                navigation.prepareDetailDrillDown({
                  fromRootId: root.id,
                  fromRootTitle: root.root,
                  fromRootMeaning: root.meaning,
                  targetRootId: item.id,
                  isRelatedCard: true,
                })
              }
            }}
            class="border-border bg-bg-secondary/35 hover:border-border-tertiary hover:bg-bg-secondary/70 flex flex-col gap-0.5 rounded-lg border px-3.5 py-2.5 no-underline transition-colors"
          >
            <span class="text-text-primary font-mono text-sm font-semibold">
              {item.root}
            </span>
            <span class="text-text-secondary truncate text-xs">
              {item.meaning}
            </span>
          </a>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Prev / Next Footer Bar -->
  <nav
    aria-label="上下词素切换"
    class="border-border flex items-center justify-between gap-3 border-t pt-5 text-sm"
  >
    {#if data.prev}
      <a
        href={`/roots/${data.prev.id}`}
        class="border-border bg-bg-primary text-text-secondary hover:border-border-tertiary hover:text-text-primary inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 no-underline transition-colors"
      >
        <span>←</span>
        <span class="font-mono font-medium">{data.prev.root}</span>
      </a>
    {:else}
      <span></span>
    {/if}

    {#if data.next}
      <a
        href={`/roots/${data.next.id}`}
        class="border-border bg-bg-primary text-text-secondary hover:border-border-tertiary hover:text-text-primary inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 no-underline transition-colors"
      >
        <span class="font-mono font-medium">{data.next.root}</span>
        <span>→</span>
      </a>
    {/if}
  </nav>
</article>
