import { json } from '@sveltejs/kit'
import { getRootIndexItems } from '$lib/data/root-index.server'
import type { RequestHandler } from './$types'

export const prerender = true

export const GET: RequestHandler = () => {
  return json(getRootIndexItems())
}
