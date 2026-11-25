<script lang="ts">
  import type { WordRoot } from '$lib/data/wordRoots'
  import { parseRootKnowledge } from '$lib/data/taxonomy'
  import WordAudioButton from '$lib/components/WordAudioButton.svelte'

  let {
    root,
    visibleExampleWords,
    compact = false,
  }: {
    root: Pick<
      WordRoot,
      'description' | 'memoryHint' | 'commonPitfall' | 'variants' | 'examples'
    >
    visibleExampleWords?: readonly string[]
    compact?: boolean
  } = $props()

  let knowledge = $derived(parseRootKnowledge(root, visibleExampleWords))
  let hasCallouts = $derived(
    knowledge.usageNotes.length > 0 ||
      knowledge.memoryHints.length > 0 ||
      knowledge.variants.length > 0,
  )

  function formatReadableText(text: string): string {
    return text.replace(/([（(]如|如)\s+(?=[A-Za-z-])/g, '$1\u00A0')
  }
</script>

<div class={compact ? 'space-y-3' : 'space-y-4'}>
  <div
    class={`text-text-secondary space-y-1.5 leading-relaxed ${
      compact ? 'text-sm' : 'text-sm sm:text-base'
    }`}
  >
    {#each knowledge.summaryParagraphs as paragraph, index (`summary-${index}`)}
      <p class="m-0 text-pretty">{formatReadableText(paragraph)}</p>
    {/each}
  </div>

  {#if !compact && knowledge.extraFormulas.length > 0}
    <div class="border-border bg-bg-secondary/40 rounded-lg border p-3.5">
      <div class="text-text-tertiary mb-2 text-xs font-medium">延伸拆词</div>
      <ul class="m-0 list-none space-y-2 p-0">
        {#each knowledge.extraFormulas as item (item.word)}
          <li
            class="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs leading-relaxed sm:text-sm"
          >
            <span class="inline-flex items-center gap-1.5">
              <WordAudioButton word={item.word} size="sm" />
              <span class="text-text-primary font-mono font-semibold">
                {item.word}
              </span>
            </span>
            {#if item.meaning}
              <span class="text-text-secondary font-medium">
                {item.meaning}
              </span>
            {/if}
            <span class="text-text-tertiary">
              {#each item.steps as step, idx (`${item.word}-${idx}`)}
                {#if idx > 0}
                  <span aria-hidden="true" class="text-text-quaternary mx-1">
                    →
                  </span>
                {/if}
                <span
                  class={idx === item.steps.length - 1 && item.steps.length > 1
                    ? 'text-text-primary font-medium'
                    : ''}
                >
                  {step}
                </span>
              {/each}
            </span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  {#if hasCallouts}
    <div class={`grid gap-2.5 ${compact ? '' : 'sm:grid-cols-2'}`}>
      {#each knowledge.usageNotes as note (note)}
        <div
          class={`border-warning-border bg-warning-bg text-warning rounded-lg border leading-relaxed ${
            compact ? 'p-3 text-xs' : 'p-3.5 text-sm'
          }`}
        >
          <div class="text-xs font-medium">用法注意</div>
          <p class="mt-1 mb-0 text-pretty">{formatReadableText(note)}</p>
        </div>
      {/each}

      {#each knowledge.memoryHints as hint (hint)}
        <div
          class={`border-border bg-bg-secondary/50 rounded-lg border leading-relaxed ${
            compact ? 'p-3 text-xs' : 'p-3.5 text-sm'
          }`}
        >
          <div class="text-text-tertiary text-xs font-medium">记忆提示</div>
          <p class="text-text-secondary mt-1 mb-0 text-pretty">
            {formatReadableText(hint)}
          </p>
        </div>
      {/each}

      {#if knowledge.variants.length > 0 && !compact}
        <div
          class="border-border bg-bg-secondary/50 rounded-lg border p-3.5 text-sm"
        >
          <div class="text-text-tertiary text-xs font-medium">常见变体</div>
          <p class="text-text-primary mt-1 mb-0 font-mono font-medium">
            {knowledge.variants.join(' / ')}
          </p>
        </div>
      {/if}
    </div>
  {/if}
</div>
