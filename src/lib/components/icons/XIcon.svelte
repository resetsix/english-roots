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
  <path d="M18 6 6 18M6 6l12 12" />
</svg>
