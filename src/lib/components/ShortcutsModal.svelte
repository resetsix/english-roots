<script lang="ts">
  import { tick } from 'svelte'
  import { ui } from '$lib/stores/ui.svelte'
  import { lockBodyScroll, unlockBodyScroll } from '$lib/utils/scroll-lock'
  import { isApplePlatform } from '$lib/utils/shortcuts'
  import XIcon from '$lib/components/icons/XIcon.svelte'

  let isApple = $state(true)
  let closeBtn = $state<HTMLButtonElement | null>(null)
  let modalEl = $state<HTMLDivElement | null>(null)

  $effect(() => {
    isApple = isApplePlatform()
  })

  $effect(() => {
    if (!ui.shortcutsOpen) return
    lockBodyScroll()
    void tick().then(() => closeBtn?.focus({ preventScroll: true }))
    return () => unlockBodyScroll()
  })

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Tab' || !modalEl) return
    const focusables = Array.from(
      modalEl.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      ),
    )
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  let modKey = $derived(isApple ? '⌘' : 'Ctrl')

  let sections = $derived([
    {
      title: '全局',
      items: [
        { keys: [modKey, 'K'], label: '搜索' },
        { keys: ['/'], label: '快捷搜索' },
        { keys: ['Shift', 'T'], label: '切换主题' },
        { keys: ['?'], label: '快捷键' },
        { keys: ['Esc'], label: '关闭弹窗' },
      ],
    },
    {
      title: '学习',
      items: [
        { keys: ['Space'], label: '切换精读 / 自测' },
        { keys: ['1', '4'], label: '选择选项（1–4）' },
        { keys: ['↵'], label: '答完后下一组' },
        { keys: ['←', '→'], label: '上一组 / 下一组' },
        { keys: ['M'], label: '标记掌握' },
        { keys: ['A'], label: '朗读首词' },
      ],
    },
    {
      title: '闪卡',
      items: [
        { keys: ['Space'], label: '翻面' },
        { keys: ['1'], label: '没记住（3 张后重现）' },
        { keys: ['2'], label: '模糊（明日复习）' },
        { keys: ['3'], label: '记住了（标记掌握）' },
        { keys: ['←', '→'], label: '上一张 / 下一张' },
        { keys: ['A'], label: '朗读首词' },
      ],
    },
  ])
</script>

{#if ui.shortcutsOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    bind:this={modalEl}
    data-modal-overlay="true"
    role="dialog"
    aria-modal="true"
    aria-label="键盘快捷键速查"
    tabindex="-1"
    onclick={(event) => {
      if (event.target === event.currentTarget) ui.closeShortcuts()
    }}
    onkeydown={handleKeyDown}
    class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 px-4 backdrop-blur-[2px]"
  >
    <div
      class="animate-modal-enter border-border bg-bg-primary w-full max-w-md rounded-xl border p-5 shadow-2xl"
    >
      <div
        class="border-border flex items-center justify-between border-b pb-3"
      >
        <h2 class="text-text-primary m-0 text-base font-semibold">快捷键</h2>
        <button
          bind:this={closeBtn}
          type="button"
          onclick={() => ui.closeShortcuts()}
          aria-label="关闭快捷键面板"
          class="text-text-tertiary hover:bg-bg-secondary hover:text-text-primary rounded-md p-1 transition-colors"
        >
          <XIcon class="h-4 w-4" />
        </button>
      </div>

      <div class="mt-4 space-y-5">
        {#each sections as section (section.title)}
          <div>
            <h3 class="text-text-tertiary mb-2 text-xs font-medium">
              {section.title}
            </h3>
            <ul class="m-0 list-none space-y-2 p-0">
              {#each section.items as item (item.label)}
                <li class="flex items-center justify-between gap-4 text-sm">
                  <span class="text-text-secondary">{item.label}</span>
                  <span class="flex shrink-0 items-center gap-1">
                    {#each item.keys as key (key)}
                      <kbd class="kbd-key">{key}</kbd>
                    {/each}
                  </span>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>

      <p
        class="border-border text-text-tertiary mt-5 mb-0 border-t pt-3 text-center text-xs"
      >
        按 <kbd class="kbd-key mx-0.5">Esc</kbd> 或
        <kbd class="kbd-key mx-0.5">?</kbd> 关闭
      </p>
    </div>
  </div>
{/if}
