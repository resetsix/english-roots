<script lang="ts">
  import { tick } from 'svelte'
  import { ui } from '$lib/stores/ui.svelte'
  import { lockBodyScroll, unlockBodyScroll } from '$lib/utils/scroll-lock'

  let modalEl = $state<HTMLDivElement | null>(null)
  let cancelBtn = $state<HTMLButtonElement | null>(null)

  $effect(() => {
    if (!ui.confirmState) return
    lockBodyScroll()
    void tick().then(() => cancelBtn?.focus({ preventScroll: true }))
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
</script>

{#if ui.confirmState}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    bind:this={modalEl}
    data-modal-overlay="true"
    role="dialog"
    aria-modal="true"
    aria-label={ui.confirmState.title}
    tabindex="-1"
    onclick={(event) => {
      if (event.target === event.currentTarget) ui.resolveConfirm(false)
    }}
    onkeydown={handleKeyDown}
    class="fixed inset-0 z-60 flex items-center justify-center bg-black/45 px-4 backdrop-blur-[2px]"
  >
    <div
      class="animate-modal-enter border-border bg-bg-primary w-full max-w-sm rounded-xl border p-5 shadow-2xl"
    >
      <h3 class="text-text-primary m-0 text-base font-semibold">
        {ui.confirmState.title}
      </h3>
      <p class="text-text-secondary mt-2 mb-0 text-sm leading-relaxed">
        {ui.confirmState.description}
      </p>
      <div class="mt-5 flex justify-end gap-2">
        <button
          bind:this={cancelBtn}
          type="button"
          onclick={() => ui.resolveConfirm(false)}
          class="border-border bg-bg-primary text-text-secondary hover:bg-bg-secondary inline-flex h-8 items-center rounded-lg border px-3.5 text-xs font-medium transition-colors"
        >
          {ui.confirmState.cancelLabel}
        </button>
        <button
          type="button"
          onclick={() => ui.resolveConfirm(true)}
          class={`inline-flex h-8 items-center rounded-lg px-3.5 text-xs font-medium transition-opacity hover:opacity-90 ${
            ui.confirmState.danger
              ? 'bg-danger text-bg-primary'
              : 'bg-accent text-accent-foreground'
          }`}
        >
          {ui.confirmState.confirmLabel}
        </button>
      </div>
    </div>
  </div>
{/if}
