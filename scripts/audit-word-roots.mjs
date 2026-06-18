import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
)
const dataFiles = ['src/data/wordRoots.ts', 'src/data/wordRootReplacements.ts']

function readRepoFile(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8')
}

function evaluateTsDataModule(relativePath, context, exportedNames) {
  const source = readRepoFile(relativePath)
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText

  const runnableSource = output
    .replace(/^import .*$/gm, '')
    .replace(/^export \{\};?$/gm, '')
    .replace(/export const /g, 'const ')
    .replace(/export function /g, 'function ')

  const contextNames = Object.keys(context)
  const contextValues = Object.values(context)
  const moduleFactory = new Function(
    ...contextNames,
    `${runnableSource}\nreturn { ${exportedNames.join(', ')} }`,
  )

  return moduleFactory(...contextValues)
}

function normalizeAnswer(value) {
  return String(value)
    .replace(/\s+/g, '')
    .replace(/[，,、/／;；]/g, '/')
    .trim()
}

function normalizeLetters(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z]/g, '')
}

function normalizeLooseMeaning(value) {
  return normalizeAnswer(value)
    .replace(/^与/, '')
    .replace(/有关$/, '')
    .replace(/(的|地|状态|行为|过程|结果)$/g, '')
}

function rootTokens(root) {
  return root
    .split(/[\-/／,，\s]+/)
    .map((token) => token.trim())
    .filter(Boolean)
}

function formatLocation(id) {
  for (const relativePath of dataFiles) {
    const lines = readRepoFile(relativePath).split('\n')
    const index = lines.findIndex((line) => line.includes(`id: ${id},`))
    if (index >= 0) return `${relativePath}:${index + 1}`
  }

  return 'unknown location'
}

function parseQuizTarget(root) {
  const question = root.quiz.question.trim()
  const rootQuestion = question.match(/^(.+?) 这个词根的意思是什么？$/)
  if (rootQuestion) return { type: 'root', target: rootQuestion[1].trim() }

  const explicitExampleQuestion = question.match(/^单词 (.+?) 的意思是什么？$/)
  if (explicitExampleQuestion) {
    return { type: 'example', target: explicitExampleQuestion[1].trim() }
  }

  const legacyQuestion = question.match(/^(.+?) 的意思是什么？$/)
  if (legacyQuestion) {
    const target = legacyQuestion[1].trim()
    const correctAnswer = root.quiz.options[root.quiz.correctAnswer]
    const looksLikeRoot =
      normalizeAnswer(target) === normalizeAnswer(root.root) ||
      rootTokens(root.root).some(
        (token) => normalizeAnswer(token) === normalizeAnswer(target),
      )

    if (
      looksLikeRoot &&
      normalizeAnswer(correctAnswer) === normalizeAnswer(root.meaning)
    ) {
      return { type: 'root', target }
    }

    return { type: 'example', target }
  }

  return { type: 'unknown', target: question }
}

function addIssue(issues, root, message) {
  issues.push({
    location: formatLocation(root.id),
    id: root.id,
    root: root.root,
    message,
  })
}

function addWarning(warnings, root, message) {
  warnings.push(
    `${formatLocation(root.id)} [id=${root.id} ${root.root}] ${message}`,
  )
}

const { wordRootReplacements } = evaluateTsDataModule(
  'src/data/wordRootReplacements.ts',
  {},
  ['wordRootReplacements'],
)
const { wordRoots } = evaluateTsDataModule(
  'src/data/wordRoots.ts',
  { wordRootReplacements },
  ['wordRoots'],
)

const issues = []
const warnings = []
const ids = new Map()
const globalExampleMeanings = new Map()

for (const root of wordRoots) {
  const previousId = ids.get(root.id)
  if (previousId) {
    addIssue(issues, root, `重复 id；已在 ${previousId} 出现过`)
  } else {
    ids.set(root.id, formatLocation(root.id))
  }

  if (!root.quiz || !Array.isArray(root.quiz.options)) {
    addIssue(issues, root, '缺少 quiz.options')
    continue
  }

  if (root.quiz.options.length !== 4) {
    addIssue(
      issues,
      root,
      `quiz.options 应为 4 个，实际为 ${root.quiz.options.length} 个`,
    )
  }

  if (
    !Number.isInteger(root.quiz.correctAnswer) ||
    root.quiz.correctAnswer < 0 ||
    root.quiz.correctAnswer >= root.quiz.options.length
  ) {
    addIssue(issues, root, `correctAnswer 越界：${root.quiz.correctAnswer}`)
    continue
  }

  const optionsByAnswer = new Map()
  const optionsByLooseAnswer = new Map()
  root.quiz.options.forEach((option, index) => {
    const key = normalizeAnswer(option)
    optionsByAnswer.set(key, [...(optionsByAnswer.get(key) ?? []), index])

    const looseKey = normalizeLooseMeaning(option)
    optionsByLooseAnswer.set(looseKey, [
      ...(optionsByLooseAnswer.get(looseKey) ?? []),
      index,
    ])
  })

  for (const indexes of optionsByAnswer.values()) {
    if (indexes.length > 1) {
      addIssue(
        issues,
        root,
        `quiz 选项重复：${root.quiz.options[indexes[0]]} @ ${indexes.join(', ')}`,
      )
    }
  }

  for (const indexes of optionsByLooseAnswer.values()) {
    if (indexes.length > 1) {
      addWarning(
        warnings,
        root,
        `quiz 选项可能同义或过近：${indexes.map((index) => root.quiz.options[index]).join(' / ')}`,
      )
    }
  }

  const wordsByText = new Map()
  const meaningsByText = new Map()
  const rootSpellings = new Set(
    [
      ...rootTokens(root.root),
      ...(Array.isArray(root.variants) ? root.variants : []),
    ].map(normalizeLetters),
  )
  for (const example of root.examples) {
    const wordKey = normalizeAnswer(example.word)
    wordsByText.set(wordKey, [
      ...(wordsByText.get(wordKey) ?? []),
      example.word,
    ])

    const meaningKey = normalizeAnswer(example.meaning)
    meaningsByText.set(meaningKey, [
      ...(meaningsByText.get(meaningKey) ?? []),
      `${example.word}=${example.meaning}`,
    ])

    globalExampleMeanings.set(meaningKey, [
      ...(globalExampleMeanings.get(meaningKey) ?? []),
      `${root.id}:${example.word}`,
    ])

    if (example.explanation.includes('->')) {
      addIssue(issues, root, `${example.word} 使用 ASCII 箭头，请改为「→」`)
    }

    if (example.explanation.includes('...')) {
      addWarning(
        warnings,
        root,
        `${example.word} 解释含「...」占位，建议改成明确方向或对象`,
      )
    }

    const [literalSide] = example.explanation.split('→')
    const literalIsBareRepeat =
      literalSide &&
      normalizeAnswer(literalSide) === normalizeAnswer(example.meaning)
    const explanationHasNoArrow = !example.explanation.includes('→')
    const noArrowIsNearRepeat =
      explanationHasNoArrow &&
      literalSide &&
      normalizeLooseMeaning(literalSide) ===
        normalizeLooseMeaning(example.meaning)
    if (literalIsBareRepeat || noArrowIsNearRepeat) {
      addWarning(
        warnings,
        root,
        `${example.word} 字面义和自然义过近：${example.explanation}`,
      )
    }

    const wordLetters = normalizeLetters(example.word)
    const breakdownRoot = normalizeLetters(example.breakdown?.root ?? '')
    if (
      breakdownRoot &&
      wordLetters === breakdownRoot &&
      !example.learningNote
    ) {
      addWarning(
        warnings,
        root,
        `${example.word} 是自由词/同词示例，建议补 learningNote 或换成派生词`,
      )
    }

    if (
      breakdownRoot &&
      !wordLetters.includes(breakdownRoot) &&
      !rootSpellings.has(breakdownRoot) &&
      !example.partMeanings?.root
    ) {
      addWarning(
        warnings,
        root,
        `${example.word} 的拆分 root=${example.breakdown.root} 不在拼写中，建议补 variants 或 partMeanings.root`,
      )
    }
  }

  for (const [, words] of wordsByText) {
    if (words.length > 1)
      addIssue(issues, root, `同卡例词重复：${words.join(', ')}`)
  }

  for (const [, examples] of meaningsByText) {
    if (examples.length > 1) {
      addIssue(issues, root, `同卡例词释义重复：${examples.join('；')}`)
    }
  }

  const correctAnswer = root.quiz.options[root.quiz.correctAnswer]
  const target = parseQuizTarget(root)
  if (target.type === 'root') {
    if (normalizeAnswer(correctAnswer) !== normalizeAnswer(root.meaning)) {
      addIssue(
        issues,
        root,
        `词根题正确项应为「${root.meaning}」，实际为「${correctAnswer}」`,
      )
    }
  } else if (target.type === 'example') {
    const example = root.examples.find((item) => item.word === target.target)
    if (!example) {
      addIssue(issues, root, `单词题目标未出现在 examples：${target.target}`)
    } else if (
      normalizeAnswer(correctAnswer) !== normalizeAnswer(example.meaning)
    ) {
      addIssue(
        issues,
        root,
        `单词题正确项应为「${example.meaning}」，实际为「${correctAnswer}」`,
      )
    }
  } else {
    addIssue(issues, root, `无法识别 quiz.question：${root.quiz.question}`)
  }
}

for (const [meaning, examples] of globalExampleMeanings) {
  if (examples.length > 3) {
    warnings.push(
      `跨卡高频重复释义「${meaning}」：${examples.slice(0, 8).join(', ')}`,
    )
  }
}

if (issues.length > 0) {
  console.error(`wordRoots audit failed: ${issues.length} blocking issue(s)`)
  for (const issue of issues) {
    console.error(
      `- ${issue.location} [id=${issue.id} ${issue.root}] ${issue.message}`,
    )
  }
  process.exitCode = 1
} else {
  console.log(`wordRoots audit passed: ${wordRoots.length} roots checked`)
}

if (warnings.length > 0) {
  console.log(
    `wordRoots audit warnings: ${warnings.length} non-blocking item(s)`,
  )
  for (const warning of warnings.slice(0, 20)) console.log(`- ${warning}`)
  if (warnings.length > 20) {
    console.log(`- ... ${warnings.length - 20} more warning(s) omitted`)
  }
}
