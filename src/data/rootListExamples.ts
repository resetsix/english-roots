import { wordRoots, type WordExample, type WordRoot } from '@/data/wordRoots'
import { getMorphemeMeaning, type MorphemeKind } from '@/lib/morphemeMeaning'

export type RootListExamplePart = {
  text: string
  meaning: string
}

export type RootListExample = {
  word: string
  parts: RootListExamplePart[]
  meaning: string
}

export type RootListExamplesEntry = {
  id: number
  root: string
  listExamples: RootListExample[]
}

const curatedListExampleLimit = 230
const examplesPerCard = 2

function normalizePartMeaning(value: string, fallback = '') {
  return value.trim() || fallback.trim()
}

function toListExamplePart(
  example: WordExample,
  kind: MorphemeKind,
  text: string,
  fallback = '',
): RootListExamplePart | null {
  const value = text.trim()
  if (!value) return null

  return {
    text: value,
    meaning: normalizePartMeaning(
      getMorphemeMeaning(example, kind, value),
      fallback,
    ),
  }
}

function toListExample(root: WordRoot, example: WordExample): RootListExample {
  const prefix = toListExamplePart(example, 'prefix', example.breakdown.prefix)
  const rootPart = toListExamplePart(
    example,
    'root',
    example.breakdown.root,
    root.meaning,
  )
  const suffix = toListExamplePart(example, 'suffix', example.breakdown.suffix)

  return {
    word: example.word,
    parts: [prefix, rootPart, suffix].filter(
      (part): part is RootListExamplePart => Boolean(part),
    ),
    meaning: example.meaning,
  }
}

function toListExamplesEntry(root: WordRoot): RootListExamplesEntry {
  return {
    id: root.id,
    root: root.root,
    listExamples: root.examples
      .slice(0, examplesPerCard)
      .map((example) => toListExample(root, example)),
  }
}

export const rootListExamples: RootListExamplesEntry[] = wordRoots
  .slice(0, curatedListExampleLimit)
  .map(toListExamplesEntry)

const rootListExamplesById = new Map(
  rootListExamples.map((entry) => [entry.id, entry.listExamples]),
)

export function getRootListExamples(root: WordRoot) {
  return (
    rootListExamplesById.get(root.id) ??
    root.examples
      .slice(0, examplesPerCard)
      .map((example) => toListExample(root, example))
  )
}

export function getRootListExampleSearchText(root: WordRoot) {
  return getRootListExamples(root)
    .map((example) =>
      [
        example.word,
        example.meaning,
        ...example.parts.flatMap((part) => [part.text, part.meaning]),
      ].join(' '),
    )
    .join(' ')
}
