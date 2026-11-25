import { getRootMetaMap, getSiteStats } from '$lib/data/root-index.server'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
  return {
    stats: getSiteStats(),
    rootMetaMap: getRootMetaMap(),
  }
}
