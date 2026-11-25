<script lang="ts">
  import type { MorphemePart } from '$lib/data/taxonomy'

  let {
    parts,
    size = 'full',
    ariaLabel = '词素公式拆解',
  }: {
    parts: readonly MorphemePart[]
    size?: 'compact' | 'full'
    ariaLabel?: string
  } = $props()
</script>

<div class="flex flex-wrap items-center gap-1.5" aria-label={ariaLabel}>
  {#each parts as part, index (`${part.kind}-${part.text}-${index}`)}
    {#if index > 0}
      <span
        aria-hidden="true"
        class="text-text-quaternary px-0.5 text-xs font-medium"
      >
        +
      </span>
    {/if}
    <span
      class={`morpheme-chip morpheme-chip--${part.kind} ${
        size === 'compact' ? 'morpheme-chip--compact' : ''
      }`}
    >
      <span class="font-mono font-semibold">{part.text}</span>
      {#if part.meaning}
        <span class="text-xs">
          · {part.meaning}
        </span>
      {/if}
    </span>
  {/each}
</div>
