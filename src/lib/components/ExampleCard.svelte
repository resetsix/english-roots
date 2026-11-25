<script lang="ts">
  import type { WordExample } from '$lib/data/wordRoots'
  import {
    buildExampleParts,
    getLiteralMeaning,
    getNaturalMeaning,
  } from '$lib/data/taxonomy'
  import MorphemeFormula from '$lib/components/MorphemeFormula.svelte'
  import WordAudioButton from '$lib/components/WordAudioButton.svelte'

  let {
    example,
    rootMeaningFallback = '',
    compact = false,
  }: {
    example: WordExample
    rootMeaningFallback?: string
    compact?: boolean
  } = $props()

  let parts = $derived(buildExampleParts(example, rootMeaningFallback))
  let literal = $derived(getLiteralMeaning(example))
  let natural = $derived(getNaturalMeaning(example))
  let showBridge = $derived(Boolean(literal && literal !== natural))
</script>

<article
  class={`border-border bg-bg-primary flex flex-col rounded-lg border ${
    compact ? 'gap-2.5 p-3.5' : 'gap-3 p-4'
  }`}
>
  <div class="flex flex-wrap items-center justify-between gap-2">
    <div class="flex min-w-0 items-center gap-2">
      <WordAudioButton word={example.word} size="sm" />
      <span
        class="text-text-primary font-mono text-base font-semibold tracking-tight sm:text-[1.0625rem]"
      >
        {example.word}
      </span>
    </div>
    <span
      class="border-border bg-bg-secondary text-text-secondary rounded-md border px-2 py-0.5 text-xs font-medium"
    >
      {example.meaning}
    </span>
  </div>

  <MorphemeFormula
    {parts}
    size={compact ? 'compact' : 'full'}
    ariaLabel={`${example.word} 的词素拆解`}
  />

  <div
    class="text-text-tertiary border-border border-t pt-2.5 text-sm leading-relaxed"
  >
    {#if showBridge}
      <p class="m-0 flex flex-wrap items-baseline gap-1.5">
        <span>{literal}</span>
        <span aria-hidden="true" class="text-text-quaternary">→</span>
        <span class="text-text-primary font-medium">{natural}</span>
      </p>
    {:else}
      <p class="text-text-secondary m-0">{example.explanation}</p>
    {/if}

    {#if example.learningNote}
      <p
        class="border-warning-border bg-warning-bg text-warning mt-2 mb-0 rounded-md border-l-2 px-2.5 py-1.5 text-xs leading-relaxed"
      >
        {example.learningNote}
      </p>
    {/if}
  </div>
</article>
