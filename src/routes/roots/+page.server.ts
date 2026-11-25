import { getRootIndexItems, getSiteStats } from '$lib/data/root-index.server'
import type { RootIndexItem } from '$lib/data/taxonomy'
import type { PageServerLoad } from './$types'

const INITIAL_SSR_COUNT = 12

export const load: PageServerLoad = () => {
  const initialItems: RootIndexItem[] = getRootIndexItems()
    .slice(0, INITIAL_SSR_COUNT)
    .map((item) => ({
      ...item,
      allWords: [],
      searchText: '',
    }))

  return {
    initialItems,
    stats: getSiteStats(),
  }
}
