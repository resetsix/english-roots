<script lang="ts">
  import { ui } from '$lib/stores/ui.svelte'
</script>

{#if ui.toasts.length > 0}
  <div
    aria-live="polite"
    aria-atomic="false"
    class="pointer-events-none fixed inset-x-0 top-16 z-70 flex flex-col items-center gap-2 px-4 sm:top-18"
  >
    {#each ui.toasts as item (item.id)}
      <div role="status" class="pointer-events-auto">
        <button
          type="button"
          onclick={() => ui.dismissToast(item.id)}
          class={`animate-toast-enter flex max-w-md items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium shadow-md backdrop-blur-sm sm:text-sm ${
            item.variant === 'success'
              ? 'border-success-border bg-success-bg text-success'
              : item.variant === 'error'
                ? 'border-danger-border bg-danger-bg text-danger'
                : 'border-border-secondary bg-bg-primary/95 text-text-primary'
          }`}
        >
          <span>{item.message}</span>
        </button>
      </div>
    {/each}
  </div>
{/if}
