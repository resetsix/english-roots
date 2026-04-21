const STORAGE_KEYS = {
  progress: 'wordRootProgress',
  achievements: 'wordRootAchievements',
  settings: 'wordRootSettings',
} as const

export type ProgressData = {
  level: number
  masteredRoots: number[]
  currentRootIndex: number
  totalScore: number
  lastStudyDate: string
  studyStreak: number
  sessionCount: number
}

export type Achievement = {
  id: string
  type: 'level' | 'streak' | 'milestone'
  title: string
  description: string
  icon: string
  unlockedAt: string
}

function readJson<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key)
    return data ? (JSON.parse(data) as T) : null
  } catch {
    return null
  }
}

function createInitialProgress(): ProgressData {
  return {
    level: 1,
    masteredRoots: [],
    currentRootIndex: 0,
    totalScore: 0,
    lastStudyDate: new Date().toISOString(),
    studyStreak: 0,
    sessionCount: 0,
  }
}

export function getProgress(): ProgressData {
  const progress = readJson<ProgressData>(STORAGE_KEYS.progress)
  if (progress) return progress

  const initialProgress = createInitialProgress()
  saveProgress(initialProgress)
  return initialProgress
}

export function saveProgress(progress: ProgressData) {
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progress))
}

export function getAchievements(): Achievement[] {
  return readJson<Achievement[]>(STORAGE_KEYS.achievements) ?? []
}

export function saveAchievements(achievements: Achievement[]) {
  localStorage.setItem(STORAGE_KEYS.achievements, JSON.stringify(achievements))
}

export function unlockAchievement(
  type: string,
  value?: number,
): Achievement | null {
  const achievements = getAchievements()
  const timestamp = new Date().toISOString()
  let achievement: Achievement | null = null

  if (type === 'levelUp' && value) {
    achievement = {
      id: `level_${value}`,
      type: 'level',
      title: `等级 ${value}`,
      description: `升级到 Lv.${value}`,
      icon: 'Lv',
      unlockedAt: timestamp,
    }
  }

  if (type === 'firstRoot') {
    achievement = {
      id: 'first_root',
      type: 'milestone',
      title: '初出茅庐',
      description: '掌握第一个词根',
      icon: '01',
      unlockedAt: timestamp,
    }
  }

  if (type === 'roots50') {
    achievement = {
      id: 'roots_50',
      type: 'milestone',
      title: '小有所成',
      description: '掌握 50 个词根',
      icon: '50',
      unlockedAt: timestamp,
    }
  }

  if (type === 'roots100') {
    achievement = {
      id: 'roots_100',
      type: 'milestone',
      title: '百词宗师',
      description: '掌握 100 个词根',
      icon: '100',
      unlockedAt: timestamp,
    }
  }

  if (type === 'streak7') {
    achievement = {
      id: 'streak_7',
      type: 'streak',
      title: '七日修行',
      description: '连续学习 7 天',
      icon: '7d',
      unlockedAt: timestamp,
    }
  }

  if (type === 'streak30') {
    achievement = {
      id: 'streak_30',
      type: 'streak',
      title: '月度大师',
      description: '连续学习 30 天',
      icon: '30d',
      unlockedAt: timestamp,
    }
  }

  if (!achievement || achievements.some((item) => item.id === achievement.id)) {
    return null
  }

  saveAchievements([...achievements, achievement])
  return achievement
}

export function markRootAsMastered(rootId: number): ProgressData {
  const progress = getProgress()
  if (progress.masteredRoots.includes(rootId)) return progress

  progress.masteredRoots.push(rootId)
  progress.totalScore += 10

  const newLevel = Math.floor(progress.masteredRoots.length / 10) + 1
  if (newLevel > progress.level) {
    progress.level = newLevel
    unlockAchievement('levelUp', newLevel)
  }

  saveProgress(progress)

  if (progress.masteredRoots.length === 1) unlockAchievement('firstRoot')
  if (progress.masteredRoots.length === 50) unlockAchievement('roots50')
  if (progress.masteredRoots.length === 100) unlockAchievement('roots100')

  return progress
}

export function updateStudyStreak(): ProgressData {
  const progress = getProgress()
  const today = new Date().toDateString()
  const lastStudy = new Date(progress.lastStudyDate).toDateString()

  if (today === lastStudy) return progress

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  progress.studyStreak =
    lastStudy === yesterday.toDateString() ? progress.studyStreak + 1 : 1
  progress.lastStudyDate = new Date().toISOString()
  progress.sessionCount += 1

  if (progress.studyStreak === 7) unlockAchievement('streak7')
  if (progress.studyStreak === 30) unlockAchievement('streak30')

  saveProgress(progress)
  return progress
}

export function exportLearningData() {
  return {
    progress: getProgress(),
    achievements: getAchievements(),
    exportDate: new Date().toISOString(),
  }
}

export function importLearningData(data: {
  progress?: ProgressData
  achievements?: Achievement[]
}) {
  if (data.progress) saveProgress(data.progress)
  if (data.achievements) saveAchievements(data.achievements)
}

export function clearLearningData() {
  localStorage.removeItem(STORAGE_KEYS.progress)
  localStorage.removeItem(STORAGE_KEYS.achievements)
  localStorage.removeItem(STORAGE_KEYS.settings)
}
