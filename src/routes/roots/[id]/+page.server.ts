import { error } from '@sveltejs/kit'
import { getAllRootIds, getRootDetailBundle } from '$lib/data/root-index.server'
import type { EntryGenerator, PageServerLoad } from './$types'

export const entries: EntryGenerator = () => {
  return getAllRootIds().map((id) => ({ id: String(id) }))
}

export const load: PageServerLoad = ({ params }) => {
  const id = Number(params.id)
  if (!Number.isInteger(id)) {
    error(404, '未找到该词素')
  }

  const bundle = getRootDetailBundle(id)
  if (!bundle) {
    error(404, '未找到该词素')
  }

  return bundle
}
