<script lang="ts">
  import '$lib/styles/global.css'
  import { afterNavigate, beforeNavigate } from '$app/navigation'
  import { onMount, type Snippet } from 'svelte'
  import BackToTop from '$lib/components/BackToTop.svelte'
  import CommandSearchModal from '$lib/components/CommandSearchModal.svelte'
  import ConfirmModal from '$lib/components/ConfirmModal.svelte'
  import GlobalTooltip from '$lib/components/GlobalTooltip.svelte'
  import ShortcutsModal from '$lib/components/ShortcutsModal.svelte'
  import SiteFooter from '$lib/components/SiteFooter.svelte'
  import SiteHeader from '$lib/components/SiteHeader.svelte'
  import ToastHost from '$lib/components/ToastHost.svelte'
  import { navigation } from '$lib/stores/navigation.svelte'
  import {
    COLOR_MODE_LABELS,
    preferences,
  } from '$lib/stores/preferences.svelte'
  import { progress } from '$lib/stores/progress.svelte'
  import { ui } from '$lib/stores/ui.svelte'
  import { bindGlobalShortcuts } from '$lib/utils/shortcuts'

  let { children }: { children: Snippet } = $props()

  onMount(() => {
    navigation.init()
    preferences.init()
    progress.init()
    const streakUnlocked = progress.touchStudySession()
    if (streakUnlocked[0]) {
      ui.toast({
        id: `ach-${streakUnlocked[0].id}`,
        message: `解锁成就：${streakUnlocked[0].title}`,
        variant: 'success',
      })
    }

    return bindGlobalShortcuts({
      getContext: () => ({
        searchOpen: ui.searchOpen,
        shortcutsOpen: ui.shortcutsOpen,
        confirmOpen: ui.confirmState !== null,
      }),
      closeOverlay: () => ui.closeTopOverlay(),
      toggleSearch: () => ui.toggleSearch(),
      openSearch: () => ui.openSearch(),
      toggleShortcuts: () => ui.toggleShortcuts(),
      cycleTheme: () => {
        const next = preferences.cycleColorMode()
        ui.toast({
          id: 'theme-mode',
          message: `已切至${COLOR_MODE_LABELS[next]}`,
          durationMs: 1600,
        })
      },
    })
  })

  beforeNavigate((nav) => {
    if (!nav.from || !nav.to || typeof window === 'undefined') return
    navigation.recordDeparture({
      fromPath: nav.from.url.pathname,
      fromSearch: nav.from.url.search,
      toPath: nav.to.url.pathname,
      toSearch: nav.to.url.search,
      navType: nav.type,
      scrollY: window.scrollY,
    })
  })

  afterNavigate(() => {
    ui.closeSearch()
    ui.closeShortcuts()
    ui.setHeaderContext(null)
  })
</script>

<div class="relative flex min-h-dvh flex-col overflow-y-clip">
  <a
    href="#main-content"
    class="border-border bg-bg-primary text-text-primary sr-only no-underline focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-70 focus:rounded-md focus:border focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md"
  >
    跳到正文
  </a>

  <SiteHeader />

  <div aria-hidden="true" class="h-12 shrink-0 sm:h-14"></div>

  <main id="main-content" tabindex="-1" class="no-focus flex-1">
    {@render children()}
  </main>

  <SiteFooter />
</div>

<CommandSearchModal />
<ShortcutsModal />
<ConfirmModal />
<ToastHost />
<GlobalTooltip />
<BackToTop />
