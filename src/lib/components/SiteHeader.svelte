<script lang="ts">
  import { page } from '$app/state'
  import { audio } from '$lib/stores/audio.svelte'
  import { dataCache } from '$lib/stores/data-cache.svelte'
  import { navigation } from '$lib/stores/navigation.svelte'
  import { preferences } from '$lib/stores/preferences.svelte'
  import { ui } from '$lib/stores/ui.svelte'
  import { getScrollBehavior, isApplePlatform } from '$lib/utils/shortcuts'
  import MoonIcon from '$lib/components/icons/MoonIcon.svelte'
  import SearchIcon from '$lib/components/icons/SearchIcon.svelte'
  import SunIcon from '$lib/components/icons/SunIcon.svelte'

  const NAV_ITEMS = [
    { href: '/roots', label: '探索' },
    { href: '/learn', label: '学习' },
    { href: '/flashcard', label: '闪卡' },
    { href: '/progress', label: '进度' },
  ] as const

  let isApple = $state(true)

  $effect(() => {
    isApple = isApplePlatform()
  })

  function isActive(href: string): boolean {
    const pathname = page.url.pathname
    return (
      pathname === href || (href === '/roots' && pathname.startsWith('/roots/'))
    )
  }

  function handleToggleAccent() {
    const next = preferences.toggleAudioAccent()
    audio.stop()
    ui.toast({
      id: 'accent-toggle',
      message: next === 'uk' ? '已切为英式发音' : '已切为美式发音',
      durationMs: 1500,
    })
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: getScrollBehavior() })
  }
</script>

<header
  class="border-border bg-bg-primary/85 fixed inset-x-0 top-0 z-40 border-b backdrop-blur-sm select-none"
>
  <div
    class="mx-auto flex h-12 w-full max-w-4xl items-center justify-between gap-1.5 px-4 sm:h-14 sm:gap-2 sm:px-6"
  >
    <!-- Left brand / dynamic scroll title -->
    <div class="relative h-full min-w-0 flex-1 overflow-hidden">
      <a
        href="/"
        aria-label="词根树首页"
        aria-hidden={ui.showHeaderContext}
        tabindex={ui.showHeaderContext ? -1 : undefined}
        class={`absolute inset-y-0 left-0 flex max-w-full items-center gap-2 no-underline transition-opacity duration-160 ${
          ui.showHeaderContext
            ? 'pointer-events-none opacity-0'
            : 'opacity-100 hover:opacity-80'
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          fill="none"
          class="h-6 w-6 shrink-0"
        >
          <rect
            x="0.5"
            y="0.5"
            width="31"
            height="31"
            rx="7"
            fill="#18181b"
            stroke="#393941"
            stroke-width="1"
          />
          <text
            x="16"
            y="19.8"
            text-anchor="middle"
            font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            font-size="14.2"
            font-weight="700"
            letter-spacing="-0.4"
          >
            <tspan fill="#f4f4f5">A</tspan><tspan fill="#8ec0f6">b</tspan>
          </text>
          <rect x="6.5" y="24.2" width="4.8" height="2" rx="1" fill="#eba094" />
          <rect x="12.5" y="24.2" width="7" height="2" rx="1" fill="#8ec0f6" />
          <rect
            x="20.7"
            y="24.2"
            width="4.8"
            height="2"
            rx="1"
            fill="#86d1b6"
          />
        </svg>
        <span
          class="text-text-primary hidden truncate text-sm font-semibold tracking-tight sm:inline sm:text-[15px]"
        >
          词根树
        </span>
      </a>

      {#if ui.headerContext}
        <button
          type="button"
          onclick={scrollToTop}
          aria-hidden={!ui.showHeaderContext}
          tabindex={ui.showHeaderContext ? undefined : -1}
          class={`absolute inset-y-0 left-0 flex max-w-full flex-col justify-center text-left transition-opacity duration-160 ${
            ui.showHeaderContext
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        >
          <span
            class="text-text-primary truncate font-mono text-sm font-semibold sm:text-base"
          >
            {ui.headerContext.title}
          </span>
          {#if ui.headerContext.subtitle}
            <span class="text-text-tertiary hidden truncate text-xs sm:block">
              {ui.headerContext.subtitle}
            </span>
          {/if}
        </button>
      {/if}
    </div>

    <!-- Primary nav -->
    <nav
      aria-label="主导航"
      class="flex shrink-0 items-center gap-0.5 sm:gap-1"
    >
      {#each NAV_ITEMS as item (item.href)}
        {@const active = isActive(item.href)}
        {@const targetHref =
          item.href === '/roots' ? navigation.rootsHref : item.href}
        <a
          href={targetHref}
          aria-current={active ? 'page' : undefined}
          class="ui-nav-link rounded-md px-1.5 py-1.5 text-xs no-underline transition-colors sm:px-2.5 sm:text-sm"
        >
          {item.label}
        </a>
      {/each}
    </nav>

    <!-- Utility cluster -->
    <div class="flex shrink-0 items-center gap-1 sm:ml-1">
      <button
        type="button"
        data-surface="bordered"
        onclick={() => ui.openSearch()}
        onmouseenter={() => dataCache.preloadIndex()}
        onfocus={() => dataCache.preloadIndex()}
        aria-label={`打开搜索 (${isApple ? 'Cmd+K' : 'Ctrl+K'})`}
        data-tooltip={`搜索词素与例词 (${isApple ? '⌘K' : 'Ctrl+K'})`}
        class="ui-icon-btn inline-flex h-8 items-center gap-1.5 rounded-md border px-2 text-xs transition-colors active:scale-95"
      >
        <SearchIcon class="h-3.5 w-3.5" />
        <span class="hidden md:inline">搜索</span>
        <kbd class="text-text-tertiary hidden font-mono text-[11px] sm:inline">
          {isApple ? '⌘K' : 'Ctrl K'}
        </kbd>
      </button>

      <button
        type="button"
        data-surface="bordered"
        onclick={handleToggleAccent}
        aria-label={preferences.settings.audioAccent === 'us'
          ? '当前美式发音，点击切为英式'
          : '当前英式发音，点击切为美式'}
        data-tooltip="切换美式 / 英式发音"
        class="ui-icon-btn inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-1.5 text-xs font-medium transition-colors active:scale-95"
      >
        {preferences.settings.audioAccent === 'us' ? '美' : '英'}
      </button>

      <button
        type="button"
        onclick={() => preferences.toggleDarkMode()}
        aria-label={preferences.resolvedDark
          ? '切换到浅色模式'
          : '切换到深色模式'}
        data-tooltip={preferences.resolvedDark
          ? '切换到浅色模式 (Shift+T 循环主题)'
          : '切换到深色模式 (Shift+T 循环主题)'}
        class="ui-icon-btn inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors active:scale-95"
      >
        {#if preferences.resolvedDark}
          <SunIcon class="h-4 w-4" />
        {:else}
          <MoonIcon class="h-4 w-4" />
        {/if}
      </button>
    </div>
  </div>
</header>
