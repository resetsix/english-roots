<script lang="ts">
  import { page } from '$app/state'
</script>

<svelte:head>
  <title>{page.status} · 词根树</title>
</svelte:head>

<section
  class="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-6"
>
  <span class="text-text-tertiary font-mono text-sm font-medium">
    {page.status}
  </span>
  <h1 class="text-text-primary mt-2 mb-0 text-2xl font-bold tracking-tight">
    {page.status === 404 ? '页面不存在' : '页面出错了'}
  </h1>
  <p class="text-text-secondary mt-2 mb-0 max-w-md text-sm leading-relaxed">
    {page.status === 404
      ? '链接可能已失效，或对应词条不存在。'
      : '请刷新重试，或返回首页。'}
  </p>
  <div class="mt-6 flex flex-wrap items-center justify-center gap-2.5">
    <a
      href="/"
      class="bg-accent text-accent-foreground inline-flex h-9 items-center rounded-lg px-4 text-sm font-medium no-underline transition-opacity hover:opacity-90"
    >
      返回首页
    </a>
    <a
      href="/roots"
      class="border-border-secondary bg-bg-primary text-text-primary hover:bg-bg-secondary inline-flex h-9 items-center rounded-lg border px-4 text-sm font-medium no-underline transition-colors"
    >
      浏览词根库
    </a>
  </div>
</section>
