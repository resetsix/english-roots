import { json } from '@sveltejs/kit'
import { getFullRootItems } from '$lib/data/root-index.server'
import type { RequestHandler } from './$types'

export const prerender = true

export const GET: RequestHandler = () => {
  return json(getFullRootItems())
}
