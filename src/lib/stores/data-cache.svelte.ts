import type { FullRootItem, RootIndexItem } from '$lib/data/taxonomy'

class DataCacheStore {
  indexItems = $state<RootIndexItem[] | null>(null)
  indexLoading = $state(false)
  indexError = $state<string | null>(null)

  fullItems = $state<FullRootItem[] | null>(null)
  fullLoading = $state(false)
  fullError = $state<string | null>(null)

  private pendingIndex: Promise<RootIndexItem[]> | null = null
  private pendingFull: Promise<FullRootItem[]> | null = null

  async loadIndex(force = false): Promise<RootIndexItem[]> {
    if (this.indexItems && !force) return this.indexItems
    if (this.pendingIndex) return this.pendingIndex

    this.indexLoading = true
    this.indexError = null

    this.pendingIndex = fetch('/data/roots-index.json')
      .then((res) => {
        if (!res.ok) throw new Error(`词素索引加载失败 (${res.status})`)
        return res.json() as Promise<RootIndexItem[]>
      })
      .then((data) => {
        this.indexItems = data
        return data
      })
      .catch((err) => {
        this.indexError =
          err instanceof Error ? err.message : '词素索引加载失败'
        throw err
      })
      .finally(() => {
        this.indexLoading = false
        this.pendingIndex = null
      })

    return this.pendingIndex
  }

  preloadIndex() {
    if (this.indexItems || this.pendingIndex || typeof window === 'undefined') {
      return
    }
    void this.loadIndex().catch(() => {})
  }

  async loadFullRoots(force = false): Promise<FullRootItem[]> {
    if (this.fullItems && !force) return this.fullItems
    if (this.pendingFull) return this.pendingFull

    this.fullLoading = true
    this.fullError = null

    this.pendingFull = fetch('/data/roots-full.json')
      .then((res) => {
        if (!res.ok) throw new Error(`词素学习数据加载失败 (${res.status})`)
        return res.json() as Promise<FullRootItem[]>
      })
      .then((data) => {
        this.fullItems = data
        return data
      })
      .catch((err) => {
        this.fullError =
          err instanceof Error ? err.message : '词素学习数据加载失败'
        throw err
      })
      .finally(() => {
        this.fullLoading = false
        this.pendingFull = null
      })

    return this.pendingFull
  }
}

export const dataCache = new DataCacheStore()
