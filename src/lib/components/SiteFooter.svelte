<script lang="ts">
  import { ui } from '$lib/stores/ui.svelte'
  import KeyboardIcon from '$lib/components/icons/KeyboardIcon.svelte'

  const currentYear = new Date().getFullYear()
</script>

<footer
  class="border-border mt-16 border-t pt-8 pb-16 sm:mt-20 sm:pt-10 sm:pb-10"
>
  <div
    class="mx-auto flex w-full max-w-4xl flex-col gap-3 px-4 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6"
  >
    <div class="flex flex-col gap-1.5">
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-text-secondary font-medium">词根树</span>
        <button
          type="button"
          onclick={() => ui.openShortcuts()}
          class="text-text-tertiary hover:text-text-primary hidden items-center gap-1 transition-colors sm:inline-flex"
          data-tooltip="快捷键 (?)"
        >
          <KeyboardIcon class="h-3.5 w-3.5" />
          <span>快捷键</span>
          <kbd class="kbd-key">?</kbd>
        </button>
      </div>
      <span class="text-text-tertiary">
        © {currentYear} 未有期 · 数据保存在本地
      </span>
    </div>

    <div
      class="text-text-tertiary flex flex-wrap items-center gap-x-4 gap-y-1 sm:justify-end"
    >
      <a class="text-text-secondary hover:text-text-primary" href="/roots">
        词根库
      </a>
      <a class="text-text-secondary hover:text-text-primary" href="/progress">
        进度与偏好
      </a>
      <a
        class="link-inline text-text-secondary hover:text-text-primary"
        href="https://english-ipa.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        音标表 ↗
      </a>
    </div>
  </div>
</footer>
