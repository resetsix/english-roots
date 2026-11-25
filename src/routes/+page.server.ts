import { heroExamples } from '$lib/data/heroExamples'
import {
  getFeaturedRoots,
  getRootMetaMap,
  getSiteStats,
} from '$lib/data/root-index.server'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
  const stats = getSiteStats()
  const featuredRoots = getFeaturedRoots()
  const metaMap = getRootMetaMap()
  const rootTitles = Object.values(metaMap).map((entry) => entry.root)

  return {
    stats,
    featuredRoots,
    heroExamples,
    rootTitles,
  }
}
