<script lang="ts">
  import { audio, isPlayableWord } from '$lib/stores/audio.svelte'
  import PlayIcon from '$lib/components/icons/PlayIcon.svelte'

  let {
    word,
    size = 'sm',
    class: className = '',
  }: {
    word: string
    size?: 'sm' | 'md'
    class?: string
  } = $props()

  let normalized = $derived(word.trim().toLowerCase())
  let playable = $derived(isPlayableWord(normalized))
  let state = $derived(audio.getWordStatus(normalized))

  let label = $derived(
    state === 'loading'
      ? `正在载入 ${word} 发音`
      : state === 'playing'
        ? `停止 ${word} 发音`
        : state === 'error'
          ? `${word} 发音失败，点击重试`
          : `播放 ${word} 发音`,
  )

  function handleClick(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    void audio.play(normalized)
  }
</script>

{#if playable}
  <button
    type="button"
    onclick={handleClick}
    data-audio-state={state}
    aria-label={label}
    data-tooltip={label}
    class={`audio-btn ${size === 'md' ? 'audio-btn--md' : ''} ${className}`}
  >
    {#if state === 'loading'}
      <span
        aria-hidden="true"
        class="audio-spinner block h-3 w-3 rounded-full border-[1.5px] border-current border-t-transparent"
      ></span>
    {:else if state === 'playing'}
      <span
        aria-hidden="true"
        class="inline-flex h-3 items-center justify-center gap-[2px]"
      >
        <span class="audio-wave-bar h-1.5" style="animation-delay: -160ms"
        ></span>
        <span class="audio-wave-bar h-2.5"></span>
        <span class="audio-wave-bar h-2" style="animation-delay: -80ms"></span>
      </span>
    {:else if state === 'error'}
      <span
        aria-hidden="true"
        class="font-mono text-[11px] leading-none font-bold"
      >
        !
      </span>
    {:else}
      <PlayIcon
        class={size === 'sm'
          ? 'h-3 w-3 translate-x-[0.5px]'
          : 'h-3.5 w-3.5 translate-x-[0.5px]'}
      />
    {/if}
  </button>
{/if}
