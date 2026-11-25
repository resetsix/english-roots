<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import type { HeroExample } from '$lib/data/heroExamples'
  import { MORPHEME_KIND_LABELS, type MorphemePart } from '$lib/data/taxonomy'
  import { navigation } from '$lib/stores/navigation.svelte'
  import { progress } from '$lib/stores/progress.svelte'
  import {
    getViewportTopObstruction,
    highlightLocatedElement,
    scrollElementIntoComfortableView,
    waitForPaint,
  } from '$lib/utils/locate-card'
  import ArrowRightIcon from '$lib/components/icons/ArrowRightIcon.svelte'
  import ShuffleIcon from '$lib/components/icons/ShuffleIcon.svelte'
  import MorphemeFormula from '$lib/components/MorphemeFormula.svelte'
  import WordAudioButton from '$lib/components/WordAudioButton.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  const CURATED_WORDS = [
    'invisible',
    'transport',
    'biology',
    'counteract',
    'synchronize',
  ] as const

  let curated = $derived.by(() => {
    const byWord = new Map(data.heroExamples.map((item) => [item.word, item]))
    const picked = CURATED_WORDS.map((word) => byWord.get(word)).filter(
      (item): item is HeroExample => Boolean(item),
    )
    return picked.length > 0 ? picked : data.heroExamples.slice(0, 5)
  })

  let activeWord = $state<string>('invisible')
  let isPaused = $state(false)
  let manuallyPicked = $state(false)

  let activeExample = $derived.by(() => {
    return (
      data.heroExamples.find((item) => item.word === activeWord) ??
      curated[0] ??
      data.heroExamples[0]
    )
  })

  let activeParts = $derived.by((): MorphemePart[] => {
    const parts: MorphemePart[] = []
    if (activeExample.prefix) {
      parts.push({
        kind: 'prefix',
        text: activeExample.prefix,
        meaning: activeExample.prefixMeaning,
      })
    }
    if (activeExample.root) {
      parts.push({
        kind: 'root',
        text: activeExample.root,
        meaning: activeExample.rootMeaning,
      })
    }
    if (activeExample.suffix) {
      parts.push({
        kind: 'suffix',
        text: activeExample.suffix,
        meaning: activeExample.suffixMeaning,
      })
    }
    return parts
  })

  let wordSegments = $derived.by(() => {
    const word = activeExample.word
    const lower = word.toLowerCase()
    const prefix = activeExample.prefix.toLowerCase()
    const suffix = activeExample.suffix.toLowerCase()
    const prefixLen = prefix && lower.startsWith(prefix) ? prefix.length : 0
    const suffixLen =
      suffix &&
      lower.endsWith(suffix) &&
      lower.length - prefixLen > suffix.length
        ? suffix.length
        : 0

    return {
      prefix: word.slice(0, prefixLen),
      root: word.slice(prefixLen, word.length - suffixLen),
      suffix: suffixLen ? word.slice(word.length - suffixLen) : '',
    }
  })

  // Gentle auto-cycle that automatically pauses on hover/focus/manual selection and honors reduced motion
  $effect(() => {
    if (isPaused || manuallyPicked) return
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const timer = window.setInterval(() => {
      const idx = curated.findIndex((item) => item.word === activeExample.word)
      const next = curated[(idx + 1) % curated.length]
      if (next) activeWord = next.word
    }, 5200)

    return () => window.clearInterval(timer)
  })

  function pickRandom() {
    if (data.heroExamples.length <= 1) return
    manuallyPicked = true
    let candidate = activeExample
    for (let i = 0; i < 6 && candidate.word === activeExample.word; i += 1) {
      candidate =
        data.heroExamples[Math.floor(Math.random() * data.heroExamples.length)]
    }
    activeWord = candidate.word
  }

  function selectExample(word: string) {
    manuallyPicked = true
    activeWord = word
  }

  afterNavigate(() => {
    const pending = navigation.consumePendingRestore('/')
    if (!pending || typeof window === 'undefined') return
    void waitForPaint().then(() => {
      if (pending.scrollY !== null && pending.scrollY > 0) {
        window.scrollTo({ top: pending.scrollY, behavior: 'instant' })
      }
      if (pending.highlightRootId !== null) {
        const cardEl = document.querySelector<HTMLElement>(
          `[data-root-card-id="${pending.highlightRootId}"]`,
        )
        if (cardEl) {
          scrollElementIntoComfortableView(cardEl, getViewportTopObstruction())
          highlightLocatedElement(cardEl)
        }
      }
    })
  })

  let resumeIndex = $derived(
    Math.max(
      0,
      Math.min(data.rootTitles.length - 1, progress.data.currentRootIndex),
    ),
  )
  let resumeRootTitle = $derived(data.rootTitles[resumeIndex] ?? '')
  let dueCount = $derived(progress.dueRootIds.length)
  let masteredCount = $derived(progress.masteredCount)
  let masteredPct = $derived(
    Math.round((masteredCount / Math.max(1, data.stats.totalRoots)) * 100),
  )

  const kindCards = $derived([
    {
      href: '/roots?kind=prefix',
      label: '前缀',
      count: data.stats.byKind.prefix,
      badge: 'bg-prefix-bg text-prefix',
      samples: ['anti-', 'trans-', 'pre-', 'sub-'],
      desc: '放在词首，表方向、否定或程度。',
    },
    {
      href: '/roots?kind=root',
      label: '词根',
      count: data.stats.byKind.root,
      badge: 'bg-root-bg text-root',
      samples: ['port', 'spect', 'duc', 'bio'],
      desc: '决定单词的核心意思。',
    },
    {
      href: '/roots?kind=suffix',
      label: '后缀',
      count: data.stats.byKind.suffix,
      badge: 'bg-suffix-bg text-suffix',
      samples: ['-tion', '-able', '-ment', '-ive'],
      desc: '放在词尾，改变词性或用法。',
    },
  ])

  const originCards = $derived([
    {
      href: '/roots?origin=Latin',
      label: '拉丁语',
      count: data.stats.byOrigin.Latin,
    },
    {
      href: '/roots?origin=Greek',
      label: '希腊语',
      count: data.stats.byOrigin.Greek,
    },
    {
      href: '/roots?origin=Old%20English',
      label: '古英语',
      count: data.stats.byOrigin['Old English'],
    },
    {
      href: '/roots?origin=rare',
      label: '其他',
      count: data.stats.byOrigin.rare,
    },
  ])
</script>

<svelte:head>
  <title>词根树 · 英语词根词缀</title>
  <meta
    name="description"
    content="收录 300 组常用英语前缀、词根与后缀，配合例词拆解、自测与闪卡记忆单词。"
  />
</svelte:head>

<div
  class="animate-content-enter mx-auto w-full max-w-4xl space-y-12 px-4 py-8 sm:space-y-14 sm:px-6 sm:py-12"
>
  <!-- Hero + Interactive Morpheme Lab -->
  <section
    class="grid items-start gap-8 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-10"
  >
    <div class="min-w-0">
      <h1
        class="text-text-primary m-0 text-3xl leading-[1.18] font-bold tracking-tight sm:text-4xl"
      >
        从词根词缀
        <br />
        看懂英语单词
      </h1>
      <p
        class="text-text-secondary mt-4 mb-0 max-w-lg text-base leading-relaxed"
      >
        收录 {data.stats.totalRoots} 组常用<span class="text-prefix font-medium"
          >前缀</span
        >、<span class="text-root font-medium">词根</span>与<span
          class="text-suffix font-medium">后缀</span
        >，以及 {data.stats.totalExamples} 个拆解例词。按
        <kbd class="kbd-key mx-0.5 align-middle">⌘K</kbd> 随时搜索。
      </p>

      <div class="mt-6 flex flex-wrap items-center gap-2.5">
        {#if dueCount > 0}
          <a
            href="/flashcard?mode=due"
            class="bg-accent text-accent-foreground inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium no-underline transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            <span>复习 {dueCount} 个</span>
            <ArrowRightIcon class="h-4 w-4" />
          </a>
          <a
            href="/learn"
            class="border-border-secondary bg-bg-primary text-text-primary hover:bg-bg-secondary inline-flex h-10 items-center rounded-lg border px-4 text-sm font-medium no-underline transition-colors"
          >
            继续 #{resumeIndex + 1}
            {resumeRootTitle}
          </a>
        {:else if masteredCount > 0 || progress.data.currentRootIndex > 0}
          <a
            href="/learn"
            class="bg-accent text-accent-foreground inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium no-underline transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            <span>继续学习 #{resumeIndex + 1} {resumeRootTitle}</span>
            <ArrowRightIcon class="h-4 w-4" />
          </a>
          <a
            href="/roots"
            class="border-border-secondary bg-bg-primary text-text-primary hover:bg-bg-secondary inline-flex h-10 items-center rounded-lg border px-4 text-sm font-medium no-underline transition-colors"
          >
            浏览词库
          </a>
        {:else}
          <a
            href="/learn"
            class="bg-accent text-accent-foreground inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium no-underline transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            <span>开始学习</span>
            <ArrowRightIcon class="h-4 w-4" />
          </a>
          <a
            href="/roots"
            class="border-border-secondary bg-bg-primary text-text-primary hover:bg-bg-secondary inline-flex h-10 items-center rounded-lg border px-4 text-sm font-medium no-underline transition-colors"
          >
            浏览词库
          </a>
        {/if}

        <a
          href="/flashcard"
          class="text-text-secondary hover:bg-bg-secondary hover:text-text-primary inline-flex h-10 items-center rounded-lg px-3 text-sm font-medium no-underline transition-colors"
        >
          闪卡
        </a>
      </div>

      {#if masteredCount > 0 || progress.data.studyStreak > 0}
        <div
          class="border-border bg-bg-secondary/50 mt-6 rounded-lg border p-3.5"
        >
          <div class="flex items-center justify-between gap-3 text-xs">
            <span class="text-text-secondary font-medium">
              已掌握 {masteredCount} / {data.stats.totalRoots}（{masteredPct}%）
              {#if progress.data.studyStreak > 0}
                · 连续 {progress.data.studyStreak} 天
              {/if}
            </span>
            <a
              href="/progress"
              class="text-text-tertiary hover:text-text-primary"
            >
              查看进度
            </a>
          </div>
          <div class="bg-bg-tertiary mt-2 h-1.5 overflow-hidden rounded-full">
            <div
              class="bg-accent h-full rounded-full transition-[width] duration-300"
              style={`width: ${Math.max(masteredPct, masteredCount > 0 ? 2 : 0)}%`}
            ></div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Interactive Morpheme Workbench -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <section
      aria-label="拆词示例"
      onmouseenter={() => (isPaused = true)}
      onmouseleave={() => (isPaused = false)}
      onfocusin={() => (isPaused = true)}
      onfocusout={() => (isPaused = false)}
      class="border-border bg-bg-secondary/45 rounded-xl border p-5"
    >
      <div class="flex items-center justify-between gap-2">
        <span class="text-text-tertiary text-xs font-medium">拆词示例</span>
        <button
          type="button"
          onclick={pickRandom}
          class="border-border bg-bg-primary text-text-secondary hover:border-border-tertiary hover:text-text-primary inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors active:scale-95"
        >
          <ShuffleIcon class="h-3.5 w-3.5" />
          <span>换一个</span>
        </button>
      </div>

      <div class="mt-4 flex items-center gap-2.5">
        <div class="font-mono text-3xl font-bold tracking-tight sm:text-4xl">
          {#if wordSegments.prefix}<span class="text-prefix"
              >{wordSegments.prefix}</span
            >{/if}<span class="text-root">{wordSegments.root}</span
          >{#if wordSegments.suffix}<span class="text-suffix"
              >{wordSegments.suffix}</span
            >{/if}
        </div>
        <WordAudioButton word={activeExample.word} size="md" />
      </div>

      <div class="mt-4">
        <MorphemeFormula
          parts={activeParts}
          ariaLabel={`${activeExample.word} 的拆词`}
        />
      </div>

      <div
        class="border-border mt-4 flex items-baseline justify-between gap-2 border-t pt-3 text-sm"
      >
        <span class="text-text-tertiary">释义</span>
        <span class="text-text-primary font-semibold">
          {activeExample.meaning}
        </span>
      </div>

      <div class="border-border mt-3.5 flex flex-wrap gap-1.5 border-t pt-3.5">
        {#each curated as item (item.word)}
          {@const selected = item.word === activeExample.word}
          <button
            type="button"
            onclick={() => selectExample(item.word)}
            class={`rounded-md border px-2 py-1 font-mono text-xs transition-colors ${
              selected
                ? 'border-accent/40 bg-accent/10 text-accent font-medium'
                : 'border-border bg-bg-primary text-text-secondary hover:border-border-tertiary hover:text-text-primary'
            }`}
          >
            {item.word}
          </button>
        {/each}
      </div>
    </section>
  </section>

  <div class="border-border border-t"></div>

  <!-- Explore by Morpheme Kind & Origin -->
  <section aria-labelledby="explore-dimensions" class="space-y-6">
    <div class="flex flex-wrap items-baseline justify-between gap-2">
      <h2
        id="explore-dimensions"
        class="text-text-primary m-0 text-lg font-semibold tracking-tight"
      >
        分类浏览
      </h2>
      <span class="text-text-tertiary text-xs">
        共 {data.stats.totalRoots} 组 · {data.stats.totalExamples} 个例词
      </span>
    </div>

    <div class="grid gap-3.5 sm:grid-cols-3">
      {#each kindCards as card (card.href)}
        <a
          href={card.href}
          class="border-border bg-bg-primary hover:border-border-tertiary flex flex-col justify-between rounded-xl border p-4 no-underline transition-colors"
        >
          <div>
            <div class="flex items-center justify-between gap-2">
              <span
                class={`rounded-md px-2 py-0.5 text-xs font-medium ${card.badge}`}
              >
                {card.label}
              </span>
              <span class="text-text-tertiary font-mono text-xs tabular-nums">
                {card.count} 组
              </span>
            </div>
            <p class="text-text-secondary mt-3 mb-0 text-sm leading-relaxed">
              {card.desc}
            </p>
          </div>
          <div class="border-border mt-4 flex flex-wrap gap-1.5 border-t pt-3">
            {#each card.samples as sample (sample)}
              <span
                class="bg-bg-secondary text-text-secondary rounded px-1.5 py-0.5 font-mono text-xs"
              >
                {sample}
              </span>
            {/each}
          </div>
        </a>
      {/each}
    </div>

    <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {#each originCards as item (item.href)}
        <a
          href={item.href}
          class="border-border bg-bg-secondary/40 hover:border-border-tertiary hover:bg-bg-secondary flex items-baseline justify-between rounded-lg border px-3.5 py-2.5 no-underline transition-colors"
        >
          <span class="text-text-primary text-sm font-medium">{item.label}</span
          >
          <span class="text-text-tertiary font-mono text-xs tabular-nums">
            {item.count}
          </span>
        </a>
      {/each}
    </div>
  </section>

  <!-- Featured Core Morphemes -->
  <section aria-labelledby="featured-heading" class="space-y-4">
    <div class="flex items-baseline justify-between gap-2">
      <h2
        id="featured-heading"
        class="text-text-primary m-0 text-lg font-semibold tracking-tight"
      >
        常见词素
      </h2>
      <a
        href="/roots"
        class="text-text-tertiary hover:text-text-primary text-xs"
      >
        全部 {data.stats.totalRoots} 组 →
      </a>
    </div>

    <div class="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {#each data.featuredRoots as item (item.id)}
        <a
          href={`/roots/${item.id}`}
          data-root-card-id={item.id}
          class="border-border bg-bg-primary hover:border-border-tertiary flex items-center justify-between gap-3 rounded-lg border px-4 py-3 no-underline transition-colors"
        >
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-text-primary font-mono text-sm font-semibold">
                {item.root}
              </span>
              <span
                class={`rounded px-1.5 py-0.5 text-[11px] font-medium ${
                  item.kind === 'prefix'
                    ? 'bg-prefix-bg text-prefix'
                    : item.kind === 'suffix'
                      ? 'bg-suffix-bg text-suffix'
                      : 'bg-root-bg text-root'
                }`}
              >
                {MORPHEME_KIND_LABELS[item.kind]}
              </span>
            </div>
            <div class="text-text-secondary mt-0.5 truncate text-xs">
              {item.meaning}
            </div>
          </div>
          <span class="text-text-tertiary shrink-0 text-xs">
            {item.originLabel}
          </span>
        </a>
      {/each}
    </div>
  </section>
</div>
