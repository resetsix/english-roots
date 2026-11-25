<script lang="ts">
  import { getScrollBehavior } from '$lib/utils/shortcuts'
  import ChevronUpIcon from '$lib/components/icons/ChevronUpIcon.svelte'

  let visible = $state(false)

  $effect(() => {
    const onScroll = () => {
      const next = (window.scrollY || document.documentElement.scrollTop) > 320
      if (visible !== next) visible = next
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  })
</script>

<button
  type="button"
  onclick={() => window.scrollTo({ top: 0, behavior: getScrollBehavior() })}
  tabindex={visible ? 0 : -1}
  aria-hidden={!visible}
  aria-label="回到顶部"
  data-tooltip="回到顶部"
  class={`border-border bg-bg-secondary text-text-secondary hover:text-text-primary fixed right-4 bottom-6 z-30 flex h-10 w-10 transform-gpu items-center justify-center rounded-full border shadow-md transition-[opacity,translate] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-90 sm:right-6 sm:bottom-8 ${
    visible
      ? 'translate-y-0 opacity-100'
      : 'pointer-events-none translate-y-2 opacity-0'
  }`}
>
  <ChevronUpIcon class="h-5 w-5" />
</button>
