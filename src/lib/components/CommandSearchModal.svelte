<script lang="ts">
  import { goto } from '$app/navigation'
  import { MORPHEME_KIND_LABELS } from '$lib/data/taxonomy'
  import { dataCache } from '$lib/stores/data-cache.svelte'
  import { navigation } from '$lib/stores/navigation.svelte'
  import { progress } from '$lib/stores/progress.svelte'
  import { ui } from '$lib/stores/ui.svelte'
  import { lockBodyScroll, unlockBodyScroll } from '$lib/utils/scroll-lock'
  import { searchRoots } from '$lib/utils/search'
  import { isEscapeKey } from '$lib/utils/shortcuts'
  import ArrowRightIcon from '$lib/components/icons/ArrowRightIcon.svelte'
  import SearchIcon from '$lib/components/icons/SearchIcon.svelte'
  import XIcon from '$lib/components/icons/XIcon.svelte'
  import WordAudioButton from '$lib/components/WordAudioButton.svelte'

  const SUGGESTIONS = ['anti', 'port', 'spect', 'bio', '-tion', '看']

  let query = $state('')
  let activeIndex = $state(0)
  let inputEl = $state<HTMLInputElement | null>(null)
  let listEl = $state<HTMLDivElement | null>(null)

  let results = $derived.by(() => {
    const items = dataCache.indexItems ?? []
    return searchRoots(items, query, {}, query.trim() ? 24 : 8)
  })

  $effect(() => {
    if (!ui.searchOpen) return

    lockBodyScroll()
    activeIndex = 0
    void dataCache.loadIndex().catch(() => {})

    const frame = requestAnimationFrame(() => {
      inputEl?.focus()
      inputEl?.select()
    })

    return () => {
      cancelAnimationFrame(frame)
      unlockBodyScroll()
    }
  })

  $effect(() => {
    void query
    activeIndex = 0
  })

  $effect(() => {
    if (!ui.searchOpen || !listEl) return
    const target = listEl.querySelector<HTMLElement>(
      `[data-search-index="${activeIndex}"]`,
    )
    target?.scrollIntoView({ block: 'nearest' })
  })

  function openRoot(id: number) {
    navigation.prepareDetailDrillDownFromCurrent(id)
    ui.closeSearch()
    void goto(`/roots/${id}`)
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (isEscapeKey(event)) {
      if (event.isComposing) return
      event.preventDefault()
      ui.closeSearch()
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (results.length > 0) activeIndex = (activeIndex + 1) % results.length
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (results.length > 0) {
        activeIndex = (activeIndex - 1 + results.length) % results.length
      }
      return
    }
    if (event.key === 'Enter' && results[activeIndex]) {
      event.preventDefault()
      openRoot(results[activeIndex].item.id)
    }
  }
</script>

{#if ui.searchOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    data-modal-overlay="true"
    role="dialog"
    aria-modal="true"
    aria-label="全局词素与例词搜索"
    tabindex="-1"
    onclick={(event) => {
      if (event.target === event.currentTarget) ui.closeSearch()
    }}
    onkeydown={handleKeyDown}
    class="fixed inset-0 z-60 flex items-start justify-center bg-black/45 px-4 pt-[10vh] backdrop-blur-[2px] sm:pt-[12vh]"
  >
    <div
      class="animate-modal-enter border-border bg-bg-primary flex max-h-[74vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border shadow-2xl"
    >
      <div class="border-border flex items-center gap-2.5 border-b px-4 py-3">
        <SearchIcon class="text-text-tertiary h-4 w-4 shrink-0" />
        <input
          bind:this={inputEl}
          bind:value={query}
          type="search"
          placeholder="搜索词根、释义或例词..."
          class="text-text-primary placeholder:text-text-tertiary min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        {#if query}
          <button
            type="button"
            onclick={() => {
              query = ''
              inputEl?.focus()
            }}
            aria-label="清空搜索"
            class="text-text-tertiary hover:text-text-primary rounded p-1 transition-colors"
          >
            <XIcon class="h-3.5 w-3.5" />
          </button>
        {/if}
        <button
          type="button"
          onclick={() => ui.closeSearch()}
          aria-label="关闭搜索"
          class="kbd-key hidden sm:inline-flex"
        >
          Esc
        </button>
      </div>

      {#if !query.trim()}
        <div
          class="border-border flex flex-wrap items-center gap-1.5 border-b px-4 py-2 text-xs"
        >
          <span class="text-text-tertiary">试试搜：</span>
          {#each SUGGESTIONS as keyword (keyword)}
            <button
              type="button"
              onclick={() => (query = keyword)}
              class="border-border bg-bg-secondary text-text-secondary hover:border-border-tertiary hover:text-text-primary rounded-md border px-2 py-0.5 font-mono transition-colors"
            >
              {keyword}
            </button>
          {/each}
        </div>
      {/if}

      <div bind:this={listEl} class="flex-1 overflow-y-auto p-2">
        {#if dataCache.indexLoading && !dataCache.indexItems}
          <div class="text-text-tertiary py-10 text-center text-sm">
            加载中...
          </div>
        {:else if dataCache.indexError && !dataCache.indexItems}
          <div class="text-danger py-10 text-center text-sm">
            {dataCache.indexError}
          </div>
        {:else if results.length === 0}
          <div class="text-text-tertiary py-10 text-center text-sm">
            没有找到「{query}」
          </div>
        {:else}
          <div class="flex flex-col gap-1">
            {#each results as match, idx (match.item.id)}
              {@const item = match.item}
              {@const isSelected = idx === activeIndex}
              {@const status = progress.getStatus(item.id)}
              {@const preview = match.matchedExample ?? item.previewExamples[0]}
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div
                data-search-index={idx}
                onmouseenter={() => (activeIndex = idx)}
                onclick={() => openRoot(item.id)}
                class={`group flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                  isSelected ? 'bg-bg-secondary' : 'hover:bg-bg-secondary/60'
                }`}
              >
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <span
                      class="text-text-primary font-mono text-sm font-semibold"
                    >
                      {item.root}
                    </span>
                    <span class="text-text-secondary text-sm">
                      {item.meaning}
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
                    {#if status === 'mastered'}
                      <span
                        class="bg-success-bg text-success rounded px-1.5 py-0.5 text-[11px]"
                      >
                        已掌握
                      </span>
                    {:else if status === 'due'}
                      <span
                        class="bg-warning-bg text-warning rounded px-1.5 py-0.5 text-[11px]"
                      >
                        待复习
                      </span>
                    {/if}
                  </div>

                  {#if preview}
                    <div
                      class="text-text-tertiary mt-1 flex flex-wrap items-center gap-1.5 text-xs"
                    >
                      <WordAudioButton word={preview.word} size="sm" />
                      <span class="text-text-secondary font-mono font-medium">
                        {preview.word}
                      </span>
                      <span>=</span>
                      <span class="truncate">
                        {preview.parts
                          .map((p) =>
                            p.meaning ? `${p.text}(${p.meaning})` : p.text,
                          )
                          .join(' + ')}
                        {' → '}
                        {preview.meaning}
                      </span>
                    </div>
                  {/if}
                </div>

                <ArrowRightIcon
                  class={`h-4 w-4 shrink-0 transition-transform ${
                    isSelected
                      ? 'text-text-primary translate-x-0.5'
                      : 'text-text-quaternary'
                  }`}
                />
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <div
        class="border-border bg-bg-secondary/60 text-text-tertiary flex items-center justify-between border-t px-4 py-2 text-xs"
      >
        <div class="flex items-center gap-3">
          <span class="inline-flex items-center gap-1">
            <kbd class="kbd-key">↑</kbd>
            <kbd class="kbd-key">↓</kbd>
            选择
          </span>
          <span class="inline-flex items-center gap-1">
            <kbd class="kbd-key">↵</kbd>
            打开
          </span>
        </div>
        <span>共 {dataCache.indexItems?.length ?? 300} 组</span>
      </div>
    </div>
  </div>
{/if}
