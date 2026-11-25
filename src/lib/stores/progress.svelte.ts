import { preferences, type UserSettings } from '$lib/stores/preferences.svelte'

export const PROGRESS_STORAGE_KEY = 'wordRootProgress'
export const ACHIEVEMENTS_STORAGE_KEY = 'wordRootAchievements'

export type RecallGrade = 'again' | 'hard' | 'good'
export type RootMasteryStatus = 'new' | 'learning' | 'due' | 'mastered'

export interface ReviewRecord {
  /** 0=待重学, 1=1天后, 2=3天后, 3=7天后, 4=21天后(已稳固) */
  box: 0 | 1 | 2 | 3 | 4
  nextReviewAt: string
  lastReviewedAt: string
  lapses: number
}

export interface ProgressData {
  level: number
  masteredRoots: number[]
  currentRootIndex: number
  flashcardIndex: number
  totalScore: number
  lastStudyDate: string
  studyStreak: number
  sessionCount: number
  reviewQueue: Record<number, ReviewRecord>
}

export interface Achievement {
  id: string
  type: 'level' | 'streak' | 'milestone'
  title: string
  description: string
  icon: string
  unlockedAt: string
}

export interface BackupPayload {
  version: number
  progress: ProgressData
  achievements: Achievement[]
  settings: UserSettings
  exportDate: string
}

const REVIEW_INTERVAL_DAYS = [0, 1, 3, 7, 21] as const
const DAY_MS = 86_400_000

export const MILESTONE_CATALOG = [
  {
    id: 'first_root',
    icon: '01',
    title: '初出茅庐',
    description: '掌握第 1 个词素',
  },
  {
    id: 'roots_50',
    icon: '50',
    title: '小有所成',
    description: '掌握 50 个词素',
  },
  {
    id: 'roots_100',
    icon: '100',
    title: '百词宗师',
    description: '掌握 100 个词素',
  },
  {
    id: 'streak_7',
    icon: '7d',
    title: '七日修行',
    description: '连续学习 7 天',
  },
  {
    id: 'streak_30',
    icon: '30d',
    title: '月度大师',
    description: '连续学习 30 天',
  },
] as const

function isBrowser() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

export function createInitialProgress(now = new Date()): ProgressData {
  return {
    level: 1,
    masteredRoots: [],
    currentRootIndex: 0,
    flashcardIndex: 0,
    totalScore: 0,
    lastStudyDate: now.toISOString(),
    studyStreak: 0,
    sessionCount: 0,
    reviewQueue: {},
  }
}

function clampBox(value: number): 0 | 1 | 2 | 3 | 4 {
  const n = Math.max(0, Math.min(4, Math.floor(value)))
  return n as 0 | 1 | 2 | 3 | 4
}

export function normalizeProgress(raw: unknown): ProgressData {
  const initial = createInitialProgress()
  if (!raw || typeof raw !== 'object') return initial

  const input = raw as Record<string, unknown>

  const masteredRoots = Array.isArray(input.masteredRoots)
    ? Array.from(
        new Set(
          input.masteredRoots.filter(
            (id): id is number =>
              typeof id === 'number' && Number.isInteger(id) && id > 0,
          ),
        ),
      )
    : []

  const reviewQueue: Record<number, ReviewRecord> = {}
  if (input.reviewQueue && typeof input.reviewQueue === 'object') {
    for (const [key, entry] of Object.entries(
      input.reviewQueue as Record<string, unknown>,
    )) {
      const id = Number(key)
      if (
        !Number.isInteger(id) ||
        id <= 0 ||
        !entry ||
        typeof entry !== 'object'
      ) {
        continue
      }
      const rec = entry as Record<string, unknown>
      if (
        typeof rec.box === 'number' &&
        typeof rec.nextReviewAt === 'string' &&
        !Number.isNaN(Date.parse(rec.nextReviewAt))
      ) {
        const lastReviewedAt =
          typeof rec.lastReviewedAt === 'string' &&
          !Number.isNaN(Date.parse(rec.lastReviewedAt))
            ? rec.lastReviewedAt
            : typeof rec.updatedAt === 'string' &&
                !Number.isNaN(Date.parse(rec.updatedAt))
              ? rec.updatedAt
              : rec.nextReviewAt

        reviewQueue[id] = {
          box: clampBox(rec.box),
          nextReviewAt: rec.nextReviewAt,
          lastReviewedAt,
          lapses:
            typeof rec.lapses === 'number' && Number.isFinite(rec.lapses)
              ? Math.max(0, Math.floor(rec.lapses))
              : 0,
        }
      }
    }
  }

  const minLevel = Math.floor(masteredRoots.length / 10) + 1
  const level =
    typeof input.level === 'number' &&
    Number.isFinite(input.level) &&
    input.level >= 1
      ? Math.max(Math.floor(input.level), minLevel)
      : minLevel

  return {
    level,
    masteredRoots,
    currentRootIndex:
      typeof input.currentRootIndex === 'number' &&
      Number.isInteger(input.currentRootIndex) &&
      input.currentRootIndex >= 0
        ? input.currentRootIndex
        : 0,
    flashcardIndex:
      typeof input.flashcardIndex === 'number' &&
      Number.isInteger(input.flashcardIndex) &&
      input.flashcardIndex >= 0
        ? input.flashcardIndex
        : 0,
    totalScore:
      typeof input.totalScore === 'number' && Number.isFinite(input.totalScore)
        ? Math.max(0, Math.floor(input.totalScore))
        : masteredRoots.length * 10,
    lastStudyDate:
      typeof input.lastStudyDate === 'string' &&
      !Number.isNaN(Date.parse(input.lastStudyDate))
        ? input.lastStudyDate
        : initial.lastStudyDate,
    studyStreak:
      typeof input.studyStreak === 'number' &&
      Number.isFinite(input.studyStreak)
        ? Math.max(0, Math.floor(input.studyStreak))
        : 0,
    sessionCount:
      typeof input.sessionCount === 'number' &&
      Number.isFinite(input.sessionCount)
        ? Math.max(0, Math.floor(input.sessionCount))
        : 0,
    reviewQueue,
  }
}

function normalizeAchievements(raw: unknown): Achievement[] {
  if (!Array.isArray(raw)) return []
  const seen = new Set<string>()
  const result: Achievement[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const rec = item as Record<string, unknown>
    if (
      typeof rec.id !== 'string' ||
      typeof rec.title !== 'string' ||
      seen.has(rec.id)
    ) {
      continue
    }
    seen.add(rec.id)
    result.push({
      id: rec.id,
      type:
        rec.type === 'level' || rec.type === 'streak' ? rec.type : 'milestone',
      title: rec.title,
      description: typeof rec.description === 'string' ? rec.description : '',
      icon: typeof rec.icon === 'string' ? rec.icon : '★',
      unlockedAt:
        typeof rec.unlockedAt === 'string'
          ? rec.unlockedAt
          : new Date().toISOString(),
    })
  }
  return result
}

class ProgressStore {
  data = $state<ProgressData>(createInitialProgress())
  achievements = $state<Achievement[]>([])
  private clockTick = $state(0)

  masteredSet = $derived(new Set(this.data.masteredRoots))
  masteredCount = $derived(this.data.masteredRoots.length)
  dueRootIds = $derived.by(() => {
    void this.clockTick
    return this.getDueRootIds(new Date())
  })
  dueSet = $derived(new Set(this.dueRootIds))

  init() {
    if (!isBrowser()) return
    this.loadFromStorage()
  }

  loadFromStorage() {
    if (!isBrowser()) return
    try {
      const rawProgress = localStorage.getItem(PROGRESS_STORAGE_KEY)
      this.data = rawProgress
        ? normalizeProgress(JSON.parse(rawProgress))
        : createInitialProgress()
    } catch {
      this.data = createInitialProgress()
    }

    try {
      const rawAch = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY)
      this.achievements = rawAch
        ? normalizeAchievements(JSON.parse(rawAch))
        : []
    } catch {
      this.achievements = []
    }
    this.clockTick += 1
  }

  private persistProgress() {
    if (!isBrowser()) return
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(this.data))
    this.clockTick += 1
  }

  private persistAchievements() {
    if (!isBrowser()) return
    localStorage.setItem(
      ACHIEVEMENTS_STORAGE_KEY,
      JSON.stringify(this.achievements),
    )
  }

  private unlock(
    type:
      | 'levelUp'
      | 'firstRoot'
      | 'roots50'
      | 'roots100'
      | 'streak7'
      | 'streak30',
    value?: number,
    now = new Date(),
  ): Achievement | null {
    const timestamp = now.toISOString()
    let candidate: Achievement | null = null

    if (type === 'levelUp' && value) {
      candidate = {
        id: `level_${value}`,
        type: 'level',
        title: `等级 ${value}`,
        description: `升级到 Lv.${value}`,
        icon: `L${value}`,
        unlockedAt: timestamp,
      }
    } else if (type === 'firstRoot') {
      candidate = {
        id: 'first_root',
        type: 'milestone',
        title: '初出茅庐',
        description: '掌握第 1 个词素',
        icon: '01',
        unlockedAt: timestamp,
      }
    } else if (type === 'roots50') {
      candidate = {
        id: 'roots_50',
        type: 'milestone',
        title: '小有所成',
        description: '掌握 50 个词素',
        icon: '50',
        unlockedAt: timestamp,
      }
    } else if (type === 'roots100') {
      candidate = {
        id: 'roots_100',
        type: 'milestone',
        title: '百词宗师',
        description: '掌握 100 个词素',
        icon: '100',
        unlockedAt: timestamp,
      }
    } else if (type === 'streak7') {
      candidate = {
        id: 'streak_7',
        type: 'streak',
        title: '七日修行',
        description: '连续学习 7 天',
        icon: '7d',
        unlockedAt: timestamp,
      }
    } else if (type === 'streak30') {
      candidate = {
        id: 'streak_30',
        type: 'streak',
        title: '月度大师',
        description: '连续学习 30 天',
        icon: '30d',
        unlockedAt: timestamp,
      }
    }

    if (
      !candidate ||
      this.achievements.some((existing) => existing.id === candidate.id)
    ) {
      return null
    }

    this.achievements = [...this.achievements, candidate]
    this.persistAchievements()
    return candidate
  }

  private checkMilestones(now = new Date()): Achievement[] {
    const unlocked: Achievement[] = []
    const count = this.data.masteredRoots.length
    const nextLevel = Math.floor(count / 10) + 1

    if (nextLevel > this.data.level) {
      this.data.level = nextLevel
      const ach = this.unlock('levelUp', nextLevel, now)
      if (ach) unlocked.push(ach)
    }
    if (count >= 1) {
      const ach = this.unlock('firstRoot', undefined, now)
      if (ach) unlocked.push(ach)
    }
    if (count >= 50) {
      const ach = this.unlock('roots50', undefined, now)
      if (ach) unlocked.push(ach)
    }
    if (count >= 100) {
      const ach = this.unlock('roots100', undefined, now)
      if (ach) unlocked.push(ach)
    }
    return unlocked
  }

  touchStudySession(now = new Date()): Achievement[] {
    const unlocked: Achievement[] = []
    const today = now.toDateString()
    const lastStudy = new Date(this.data.lastStudyDate).toDateString()

    if (this.data.sessionCount === 0) {
      this.data = {
        ...this.data,
        studyStreak: Math.max(1, this.data.studyStreak),
        sessionCount: 1,
        lastStudyDate: now.toISOString(),
      }
      this.persistProgress()
      return unlocked
    }

    if (today === lastStudy) return unlocked

    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    const nextStreak =
      lastStudy === yesterday.toDateString() ? this.data.studyStreak + 1 : 1

    this.data = {
      ...this.data,
      studyStreak: nextStreak,
      sessionCount: this.data.sessionCount + 1,
      lastStudyDate: now.toISOString(),
    }

    if (nextStreak >= 7) {
      const a = this.unlock('streak7', undefined, now)
      if (a) unlocked.push(a)
    }
    if (nextStreak >= 30) {
      const a = this.unlock('streak30', undefined, now)
      if (a) unlocked.push(a)
    }

    this.persistProgress()
    return unlocked
  }

  recordRecall(
    rootId: number,
    grade: RecallGrade,
    now = new Date(),
  ): { newlyMastered: boolean; unlocked: Achievement[] } {
    const prev = this.data.reviewQueue[rootId]
    const alreadyMastered = this.data.masteredRoots.includes(rootId)
    let nextBox: 0 | 1 | 2 | 3 | 4
    let lapses = prev?.lapses ?? 0
    let masteredRoots = this.data.masteredRoots
    let totalScore = this.data.totalScore
    let newlyMastered = false

    if (grade === 'good') {
      nextBox = clampBox(Math.max(2, (prev?.box ?? 1) + 1))
      if (!alreadyMastered) {
        masteredRoots = [...masteredRoots, rootId]
        totalScore += 10
        newlyMastered = true
      }
    } else if (grade === 'hard') {
      nextBox = 1
    } else {
      nextBox = 0
      lapses += 1
      if (alreadyMastered) {
        masteredRoots = masteredRoots.filter((id) => id !== rootId)
      }
    }

    const nextReviewAt = new Date(
      now.getTime() + REVIEW_INTERVAL_DAYS[nextBox] * DAY_MS,
    ).toISOString()

    this.data = {
      ...this.data,
      masteredRoots,
      totalScore,
      reviewQueue: {
        ...this.data.reviewQueue,
        [rootId]: {
          box: nextBox,
          nextReviewAt,
          lastReviewedAt: now.toISOString(),
          lapses,
        },
      },
    }

    const unlocked = grade === 'good' ? this.checkMilestones(now) : []
    this.persistProgress()
    return { newlyMastered, unlocked }
  }

  toggleMastered(
    rootId: number,
    now = new Date(),
  ): { mastered: boolean; unlocked: Achievement[] } {
    if (this.data.masteredRoots.includes(rootId)) {
      this.recordRecall(rootId, 'again', now)
      return { mastered: false, unlocked: [] }
    }
    const { unlocked } = this.recordRecall(rootId, 'good', now)
    return { mastered: true, unlocked }
  }

  setCurrentRootIndex(index: number) {
    const safe = Math.max(0, Math.floor(index))
    if (this.data.currentRootIndex === safe) return
    this.data = { ...this.data, currentRootIndex: safe }
    this.persistProgress()
  }

  setFlashcardIndex(index: number) {
    const safe = Math.max(0, Math.floor(index))
    if (this.data.flashcardIndex === safe) return
    this.data = { ...this.data, flashcardIndex: safe }
    this.persistProgress()
  }

  getDueRootIds(now = new Date()): number[] {
    const nowMs = now.getTime()
    return Object.entries(this.data.reviewQueue)
      .filter(([, record]) => Date.parse(record.nextReviewAt) <= nowMs)
      .sort(
        ([, a], [, b]) =>
          a.box - b.box ||
          Date.parse(a.nextReviewAt) - Date.parse(b.nextReviewAt),
      )
      .map(([id]) => Number(id))
  }

  getStatus(rootId: number, now = new Date()): RootMasteryStatus {
    const rec = this.data.reviewQueue[rootId]
    if (rec && Date.parse(rec.nextReviewAt) <= now.getTime()) {
      return 'due'
    }
    if (this.data.masteredRoots.includes(rootId)) {
      return 'mastered'
    }
    if (rec) {
      return 'learning'
    }
    return 'new'
  }

  exportBackup(): BackupPayload {
    return {
      version: 3,
      progress: structuredClone($state.snapshot(this.data)),
      achievements: structuredClone($state.snapshot(this.achievements)),
      settings: structuredClone($state.snapshot(preferences.settings)),
      exportDate: new Date().toISOString(),
    }
  }

  importBackup(rawJson: unknown) {
    if (!rawJson || typeof rawJson !== 'object' || Array.isArray(rawJson)) {
      throw new Error('备份文件不是有效的 JSON 对象')
    }

    const input = rawJson as Record<string, unknown>
    const hasProgress =
      input.progress !== undefined &&
      typeof input.progress === 'object' &&
      input.progress !== null &&
      !Array.isArray(input.progress)
    const hasAchievements = Array.isArray(input.achievements)
    const hasSettings =
      input.settings !== undefined &&
      typeof input.settings === 'object' &&
      input.settings !== null &&
      !Array.isArray(input.settings)

    if (!hasProgress && !hasAchievements && !hasSettings) {
      throw new Error('文件中未包含可识别的学习进度或偏好配置')
    }

    if (hasProgress) {
      const candidate = input.progress as Record<string, unknown>
      if (
        candidate.masteredRoots !== undefined &&
        !Array.isArray(candidate.masteredRoots)
      ) {
        throw new Error('progress.masteredRoots 字段格式无效')
      }
      this.data = normalizeProgress(candidate)
      this.persistProgress()
    }

    if (hasAchievements) {
      this.achievements = normalizeAchievements(input.achievements)
      this.persistAchievements()
    }

    if (hasSettings) {
      preferences.importSettings(input.settings)
    }
  }

  resetAll() {
    this.data = createInitialProgress()
    this.achievements = []
    if (isBrowser()) {
      localStorage.removeItem(PROGRESS_STORAGE_KEY)
      localStorage.removeItem(ACHIEVEMENTS_STORAGE_KEY)
    }
    preferences.reset()
    this.clockTick += 1
  }
}

export const progress = new ProgressStore()
