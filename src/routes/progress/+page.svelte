<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import { MORPHEME_KIND_LABELS, type MorphemeKind } from '$lib/data/taxonomy'
  import { audio } from '$lib/stores/audio.svelte'
  import { navigation } from '$lib/stores/navigation.svelte'
  import {
    preferences,
    type ColorMode,
    type FontPreset,
    type PalettePreset,
  } from '$lib/stores/preferences.svelte'
  import { MILESTONE_CATALOG, progress } from '$lib/stores/progress.svelte'
  import { ui } from '$lib/stores/ui.svelte'
  import {
    getViewportTopObstruction,
    highlightLocatedElement,
    scrollElementIntoComfortableView,
    waitForPaint,
  } from '$lib/utils/locate-card'
  import ArrowRightIcon from '$lib/components/icons/ArrowRightIcon.svelte'
  import CheckIcon from '$lib/components/icons/CheckIcon.svelte'
  import DownloadIcon from '$lib/components/icons/DownloadIcon.svelte'
  import TrashIcon from '$lib/components/icons/TrashIcon.svelte'
  import UploadIcon from '$lib/components/icons/UploadIcon.svelte'
  import VolumeIcon from '$lib/components/icons/VolumeIcon.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  const PALETTES: Array<{
    id: PalettePreset
    name: string
    hint: string
    swatches: [string, string, string]
  }> = [
    {
      id: 'default',
      name: '默认',
      hint: '中性黑白灰配色',
      swatches: ['#fcfcfc', '#18181b', '#2957b8'],
    },
    {
      id: 'warm-sand',
      name: '暖沙',
      hint: '米黄与暖褐底色',
      swatches: ['#faf8f2', '#1e1b17', '#9d4b29'],
    },
    {
      id: 'ink',
      name: '墨灰',
      hint: '浅蓝灰与深蓝黑底色',
      swatches: ['#f7f9fb', '#11151c', '#286a9b'],
    },
  ]

  let masteredCount = $derived(progress.masteredCount)
  let percentage = $derived(
    Math.round((masteredCount / Math.max(1, data.stats.totalRoots)) * 100),
  )
  let toNextLevel = $derived(
    Math.max(0, progress.data.level * 10 - masteredCount),
  )
  let dueIds = $derived(progress.dueRootIds)

  let byKindMastered = $derived.by(() => {
    const counts: Record<MorphemeKind, number> = {
      prefix: 0,
      root: 0,
      suffix: 0,
    }
    for (const id of progress.data.masteredRoots) {
      const meta = data.rootMetaMap[id]
      if (meta) counts[meta.kind] += 1
    }
    return counts
  })

  let unlockedIds = $derived(new Set(progress.achievements.map((a) => a.id)))
  let levelAchievements = $derived(
    progress.achievements.filter((a) => a.type === 'level'),
  )

  function formatLastStudy(iso: string): string {
    const diffDays = Math.floor((Date.now() - Date.parse(iso)) / 86_400_000)
    if (!Number.isFinite(diffDays) || diffDays <= 0) return '今天'
    if (diffDays === 1) return '昨天'
    return `${diffDays} 天前`
  }

  function handleExport() {
    const backup = progress.exportBackup()
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `english-roots-backup-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
    ui.toast({
      id: 'export-ok',
      message: '已导出备份',
      variant: 'success',
    })
  }

  function handleImport() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json,.json'
    input.addEventListener('change', () => {
      const file = input.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        try {
          progress.importBackup(JSON.parse(String(reader.result)))
          ui.toast({
            id: 'import-ok',
            message: '已导入备份',
            variant: 'success',
          })
        } catch (err) {
          ui.toast({
            id: 'import-err',
            message:
              err instanceof Error
                ? `导入失败：${err.message}`
                : '导入失败：JSON 格式无效',
            variant: 'error',
          })
        }
      })
      reader.readAsText(file)
    })
    input.click()
  }

  async function handleClear() {
    const confirmed = await ui.confirm({
      title: '清除本地数据？',
      description: '将清空学习进度、成就与偏好设置，不可恢复。',
      confirmLabel: '清除',
      cancelLabel: '取消',
      danger: true,
    })
    if (!confirmed) return
    progress.resetAll()
    navigation.resetAll()
    ui.toast({
      id: 'clear-ok',
      message: '已清除本地数据',
      variant: 'info',
    })
  }

  afterNavigate(() => {
    const pending = navigation.consumePendingRestore('/progress')
    if (!pending || typeof window === 'undefined') return
    void waitForPaint().then(() => {
      if (pending.scrollY !== null && pending.scrollY > 0) {
        window.scrollTo({ top: pending.scrollY, behavior: 'instant' })
      }
      if (pending.highlightRootId !== null) {
        const cardEl = document.querySelector<HTMLElement>(
          `[data-root-card-id="${pending.highlightRootId}"]`,
        )
        if (cardEl) {
          scrollElementIntoComfortableView(cardEl, getViewportTopObstruction())
          highlightLocatedElement(cardEl)
        }
      }
    })
  })
</script>

<svelte:head>
  <title>进度与偏好 · 词根树</title>
  <meta
    name="description"
    content="查看学习进度与待复习清单，设置主题、字体、发音与本地数据备份。"
  />
</svelte:head>

<div
  class="animate-content-enter mx-auto w-full max-w-4xl space-y-8 px-4 py-8 sm:px-6 sm:py-10"
>
  <header>
    <h1
      class="text-text-primary m-0 text-2xl font-bold tracking-tight sm:text-3xl"
    >
      进度与偏好
    </h1>
    <p class="text-text-secondary mt-1.5 mb-0 text-sm">
      数据保存在当前浏览器本地，可随时导出备份。
    </p>
  </header>

  <!-- 1. Overview Stats -->
  <section class="grid grid-cols-2 gap-3 sm:grid-cols-4">
    <div class="border-border bg-bg-secondary/45 rounded-xl border p-4">
      <div class="text-text-primary font-mono text-2xl font-bold tabular-nums">
        {masteredCount}<span class="text-text-tertiary text-sm font-normal"
          >/{data.stats.totalRoots}</span
        >
      </div>
      <div class="text-text-tertiary mt-1 text-xs">已掌握</div>
    </div>
    <div class="border-border bg-bg-secondary/45 rounded-xl border p-4">
      <div class="text-text-primary font-mono text-2xl font-bold tabular-nums">
        {dueIds.length}
      </div>
      <div class="text-text-tertiary mt-1 text-xs">待复习</div>
    </div>
    <div class="border-border bg-bg-secondary/45 rounded-xl border p-4">
      <div class="text-text-primary font-mono text-2xl font-bold tabular-nums">
        {progress.data.studyStreak}<span
          class="text-text-tertiary ml-0.5 text-sm font-normal">天</span
        >
      </div>
      <div class="text-text-tertiary mt-1 text-xs">连续学习</div>
    </div>
    <div class="border-border bg-bg-secondary/45 rounded-xl border p-4">
      <div class="text-text-primary font-mono text-2xl font-bold tabular-nums">
        Lv.{progress.data.level}
      </div>
      <div class="text-text-tertiary mt-1 text-xs">
        再掌握 {toNextLevel} 个升级
      </div>
    </div>
  </section>

  <!-- Category Breakdown -->
  <section class="border-border bg-bg-primary space-y-5 rounded-xl border p-5">
    <div>
      <div class="flex items-center justify-between text-sm">
        <h2 class="text-text-primary m-0 text-base font-semibold">掌握分布</h2>
        <span class="text-text-secondary font-mono font-semibold tabular-nums">
          {percentage}%
        </span>
      </div>
      <div class="bg-bg-tertiary mt-2.5 h-2 overflow-hidden rounded-full">
        <div
          class="bg-accent h-full rounded-full transition-[width] duration-300"
          style={`width: ${percentage}%`}
        ></div>
      </div>
    </div>

    <div class="grid gap-3 sm:grid-cols-3">
      {#each ['prefix', 'root', 'suffix'] as MorphemeKind[] as cat (cat)}
        {@const done = byKindMastered[cat]}
        {@const total = data.stats.byKind[cat]}
        {@const ratio = Math.round((done / Math.max(1, total)) * 100)}
        <div class="border-border bg-bg-secondary/40 rounded-lg border p-3">
          <div class="flex items-center justify-between text-xs">
            <span
              class={`font-medium ${
                cat === 'prefix'
                  ? 'text-prefix'
                  : cat === 'suffix'
                    ? 'text-suffix'
                    : 'text-root'
              }`}
            >
              {MORPHEME_KIND_LABELS[cat]}
            </span>
            <span class="text-text-tertiary font-mono tabular-nums">
              {done}/{total}
            </span>
          </div>
          <div class="bg-bg-tertiary mt-2 h-1.5 overflow-hidden rounded-full">
            <div
              class={`h-full rounded-full transition-[width] duration-300 ${
                cat === 'prefix'
                  ? 'bg-prefix'
                  : cat === 'suffix'
                    ? 'bg-suffix'
                    : 'bg-root'
              }`}
              style={`width: ${ratio}%`}
            ></div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- 2. Due Review List -->
  {#if dueIds.length > 0}
    <section
      class="border-warning-border bg-warning-bg/50 rounded-xl border p-5"
    >
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-text-primary m-0 text-base font-semibold">
          待复习（{dueIds.length}）
        </h2>
        <a
          href="/flashcard?mode=due"
          class="bg-accent text-accent-foreground inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-medium no-underline transition-opacity hover:opacity-90"
        >
          <span>开始复习</span>
          <ArrowRightIcon class="h-3.5 w-3.5" />
        </a>
      </div>
      <div class="mt-3.5 flex flex-wrap gap-1.5">
        {#each dueIds.slice(0, 20) as id (id)}
          {@const meta = data.rootMetaMap[id]}
          <a
            href={`/roots/${id}`}
            data-root-card-id={id}
            class="border-border bg-bg-primary text-text-primary hover:border-border-tertiary rounded-md border px-2.5 py-1 font-mono text-xs no-underline transition-colors"
          >
            {meta ? `${meta.root} · ${meta.meaning}` : `#${id}`}
          </a>
        {/each}
      </div>
    </section>
  {/if}

  <!-- 3. Milestones -->
  <section class="border-border bg-bg-primary rounded-xl border p-5">
    <h2 class="text-text-primary m-0 text-base font-semibold">里程碑</h2>
    <div class="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {#each MILESTONE_CATALOG as item (item.id)}
        {@const unlocked = unlockedIds.has(item.id)}
        <div
          class={`flex items-start gap-3 rounded-lg border p-3 ${
            unlocked
              ? 'border-success-border bg-success-bg/50'
              : 'border-border bg-bg-secondary/35'
          }`}
        >
          <span
            class={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold ${
              unlocked
                ? 'bg-success-bg text-success'
                : 'bg-bg-tertiary text-text-tertiary'
            }`}
          >
            {#if unlocked}
              <CheckIcon class="h-4 w-4" />
            {:else}
              {item.icon}
            {/if}
          </span>
          <div class="min-w-0">
            <div
              class={`text-sm font-medium ${
                unlocked ? 'text-text-primary' : 'text-text-secondary'
              }`}
            >
              {item.title}
            </div>
            <div class="text-text-tertiary text-xs">{item.description}</div>
          </div>
        </div>
      {/each}

      {#each levelAchievements as ach (ach.id)}
        <div
          class="border-success-border bg-success-bg/50 flex items-start gap-3 rounded-lg border p-3"
        >
          <span
            class="bg-success-bg text-success inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold"
          >
            {ach.icon}
          </span>
          <div class="min-w-0">
            <div class="text-text-primary text-sm font-medium">{ach.title}</div>
            <div class="text-text-tertiary text-xs">{ach.description}</div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- 4. Preferences & Data Backup -->
  <section class="border-border bg-bg-primary space-y-5 rounded-xl border p-5">
    <h2 class="text-text-primary m-0 text-base font-semibold">偏好设置</h2>

    <!-- Color Mode -->
    <div
      class="border-border flex flex-col justify-between gap-2.5 border-t pt-4 sm:flex-row sm:items-center"
    >
      <div class="text-text-primary text-sm font-medium">外观</div>
      <div
        role="group"
        aria-label="外观模式"
        class="border-border bg-bg-secondary inline-flex self-start rounded-lg border p-0.5 text-xs"
      >
        {#each [['system', '跟随系统'], ['light', '浅色'], ['dark', '深色']] as [value, label] (value)}
          <button
            type="button"
            aria-pressed={preferences.settings.colorMode === value}
            onclick={() => preferences.setColorMode(value as ColorMode)}
            class={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              preferences.settings.colorMode === value
                ? 'bg-bg-primary text-text-primary shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {label}
          </button>
        {/each}
      </div>
    </div>

    <!-- Palette -->
    <div class="border-border space-y-2.5 border-t pt-4">
      <div class="text-text-primary text-sm font-medium">风格</div>
      <div class="grid gap-2.5 sm:grid-cols-3">
        {#each PALETTES as option (option.id)}
          {@const selected = preferences.settings.palette === option.id}
          <button
            type="button"
            aria-pressed={selected}
            onclick={() => preferences.setPalette(option.id)}
            class={`flex items-start justify-between gap-2 rounded-lg border p-3 text-left transition-colors ${
              selected
                ? 'border-accent bg-accent/8'
                : 'border-border bg-bg-secondary/40 hover:border-border-tertiary'
            }`}
          >
            <div>
              <div class="text-text-primary text-sm font-medium">
                {option.name}
              </div>
              <div class="text-text-tertiary mt-0.5 text-xs">{option.hint}</div>
            </div>
            <div class="flex shrink-0 items-center gap-1 pt-0.5">
              {#each option.swatches as hex (hex)}
                <span
                  class="border-border-secondary block h-3.5 w-3.5 rounded-full border"
                  style={`background-color: ${hex}`}
                ></span>
              {/each}
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Font Preset -->
    <div
      class="border-border flex flex-col justify-between gap-2.5 border-t pt-4 sm:flex-row sm:items-center"
    >
      <div class="text-text-primary text-sm font-medium">
        字体
        {#if preferences.loadingFont}
          <span class="text-accent ml-1.5 text-xs font-normal">加载中...</span>
        {/if}
      </div>
      <div
        role="group"
        aria-label="正文字体"
        class="border-border bg-bg-secondary inline-flex self-start rounded-lg border p-0.5 text-xs"
      >
        {#each [['default', '默认'], ['lxgw-wenkai-screen', '霞鹜文楷']] as [value, label] (value)}
          <button
            type="button"
            aria-pressed={preferences.settings.fontPreset === value}
            onclick={() => preferences.setFontPreset(value as FontPreset)}
            class={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              preferences.settings.fontPreset === value
                ? 'bg-bg-primary text-text-primary shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {label}
          </button>
        {/each}
      </div>
    </div>

    <!-- Pronunciation -->
    <div
      class="border-border flex flex-col justify-between gap-2.5 border-t pt-4 sm:flex-row sm:items-center"
    >
      <div class="text-text-primary text-sm font-medium">发音</div>
      <div class="flex flex-wrap items-center gap-2">
        <div
          role="group"
          aria-label="发音口音"
          class="border-border bg-bg-secondary inline-flex rounded-lg border p-0.5 text-xs"
        >
          {#each ['us', 'uk'] as const as accent (accent)}
            <button
              type="button"
              aria-pressed={preferences.settings.audioAccent === accent}
              onclick={() => {
                preferences.setAudioAccent(accent)
                audio.stop()
              }}
              class={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                preferences.settings.audioAccent === accent
                  ? 'bg-bg-primary text-text-primary shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {accent === 'us' ? '美式' : '英式'}
            </button>
          {/each}
        </div>
        <button
          type="button"
          onclick={() => void audio.play('example')}
          class="border-border bg-bg-primary text-text-secondary hover:border-border-tertiary hover:text-text-primary inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs transition-colors"
        >
          <VolumeIcon class="h-3.5 w-3.5" />
          <span>试听</span>
        </button>
      </div>
    </div>
  </section>

  <!-- Data Backup & Reset -->
  <section class="border-border bg-bg-primary rounded-xl border p-5">
    <div
      class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
    >
      <div>
        <h2 class="text-text-primary m-0 text-base font-semibold">数据备份</h2>
        <p class="text-text-tertiary mt-1 mb-0 text-xs">
          上次学习：{formatLastStudy(progress.data.lastStudyDate)} · 累计
          {progress.data.sessionCount} 次
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onclick={handleExport}
          class="border-border-secondary bg-bg-primary text-text-primary hover:bg-bg-secondary inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors"
        >
          <DownloadIcon class="h-3.5 w-3.5" />
          <span>导出 JSON</span>
        </button>
        <button
          type="button"
          onclick={handleImport}
          class="border-border-secondary bg-bg-primary text-text-primary hover:bg-bg-secondary inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors"
        >
          <UploadIcon class="h-3.5 w-3.5" />
          <span>导入 JSON</span>
        </button>
        <button
          type="button"
          onclick={() => void handleClear()}
          class="border-danger-border bg-danger-bg text-danger inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-opacity hover:opacity-90"
        >
          <TrashIcon class="h-3.5 w-3.5" />
          <span>清除数据</span>
        </button>
      </div>
    </div>
  </section>
</div>
