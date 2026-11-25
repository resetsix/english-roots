<script lang="ts">
  let { class: className = 'h-4 w-4' }: { class?: string } = $props()
</script>

<svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.75"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
  class={className}
>
  <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
  <path d="M3 3v5h5" />
</svg>
