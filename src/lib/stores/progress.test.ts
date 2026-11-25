import { beforeEach, describe, expect, it } from 'vitest'
import {
  preferences,
  SETTINGS_STORAGE_KEY,
} from '$lib/stores/preferences.svelte'
import {
  ACHIEVEMENTS_STORAGE_KEY,
  progress,
  PROGRESS_STORAGE_KEY,
} from '$lib/stores/progress.svelte'

describe('preferences & progress Svelte 5 stores', () => {
  beforeEach(() => {
    localStorage.clear()
    progress.resetAll()
    preferences.reset()
  })

  it('losslessly migrates legacy wordRootSettings and wordRootProgress', () => {
    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({
        readingTheme: 'classic',
        audioEnabled: false,
        audioAccent: 'uk',
      }),
    )
    localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({
        level: 2,
        masteredRoots: [1, 2, 3],
        currentRootIndex: 8,
        totalScore: 30,
        lastStudyDate: '2026-06-15T00:00:00.000Z',
        studyStreak: 4,
        sessionCount: 4,
      }),
    )

    preferences.loadFromStorage()
    progress.loadFromStorage()

    expect(preferences.settings.palette).toBe('warm-sand')
    expect(preferences.settings.colorMode).toBe('system')
    expect(preferences.settings.audioEnabled).toBe(false)
    expect(preferences.settings.audioAccent).toBe('uk')

    expect(progress.data.masteredRoots).toEqual([1, 2, 3])
    expect(progress.data.currentRootIndex).toBe(8)
    expect(progress.data.flashcardIndex).toBe(0)
    expect(progress.data.reviewQueue).toEqual({})
  })

  it('handles 3-grade Leitner recall scheduling and due root derivation', () => {
    const day0 = new Date('2026-11-25T08:00:00.000Z')
    const day2 = new Date('2026-11-27T08:00:00.000Z')

    progress.recordRecall(10, 'again', day0)
    progress.recordRecall(11, 'hard', day0)
    const good = progress.recordRecall(12, 'good', day0)

    expect(good.newlyMastered).toBe(true)
    expect(good.unlocked.some((a) => a.id === 'first_root')).toBe(true)
    expect(progress.data.reviewQueue[10]?.lapses).toBe(1)
    expect(progress.getDueRootIds(day0)).toEqual([10])
    expect(progress.getDueRootIds(day2)).toEqual([10, 11])
    expect(progress.getStatus(12, day2)).toBe('mastered')
  })

  it('deduplicates achievements and updates study streaks across days', () => {
    const d1 = new Date('2026-11-20T08:00:00.000Z')
    const d2 = new Date('2026-11-21T08:00:00.000Z')
    const d5 = new Date('2026-11-24T08:00:00.000Z')

    progress.touchStudySession(d1)
    expect(progress.data.studyStreak).toBe(1)
    progress.touchStudySession(d1)
    expect(progress.data.studyStreak).toBe(1)
    progress.touchStudySession(d2)
    expect(progress.data.studyStreak).toBe(2)
    progress.touchStudySession(d5)
    expect(progress.data.studyStreak).toBe(1)

    progress.recordRecall(1, 'good', d5)
    progress.recordRecall(1, 'good', d5)
    expect(
      progress.achievements.filter((a) => a.id === 'first_root'),
    ).toHaveLength(1)
  })

  it('exports, resets, re-imports safely and rejects corrupt JSON payloads', () => {
    progress.recordRecall(7, 'good')
    preferences.setPalette('ink')
    const backup = progress.exportBackup()

    progress.resetAll()
    expect(progress.masteredCount).toBe(0)
    expect(localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY)).toBeNull()

    progress.importBackup(backup)
    expect(progress.data.masteredRoots).toEqual([7])
    expect(preferences.settings.palette).toBe('ink')

    expect(() => progress.importBackup('bad')).toThrow()
    expect(() => progress.importBackup({ unrelated: true })).toThrow()
    expect(() =>
      progress.importBackup({ progress: { masteredRoots: 'not-array' } }),
    ).toThrow()
  })

  it('suppresses CSS transitions momentarily during light/dark and palette switches', () => {
    const rafQueue: FrameRequestCallback[] = []
    const origRaf = window.requestAnimationFrame
    const origCancel = window.cancelAnimationFrame
    window.requestAnimationFrame = (cb) => {
      rafQueue.push(cb)
      return rafQueue.length
    }
    window.cancelAnimationFrame = () => {}

    try {
      document.documentElement.classList.remove(
        'light',
        'dark',
        'theme-switching',
      )
      delete document.documentElement.dataset.palette

      preferences.setColorMode('light')
      while (rafQueue.length) rafQueue.shift()?.(0)
      expect(
        document.documentElement.classList.contains('theme-switching'),
      ).toBe(false)

      // Switch light -> dark: attaches theme-switching immediately
      preferences.setColorMode('dark')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(
        document.documentElement.classList.contains('theme-switching'),
      ).toBe(true)

      // Double RAF removes theme-switching cleanly
      rafQueue.shift()?.(0)
      expect(
        document.documentElement.classList.contains('theme-switching'),
      ).toBe(true)
      rafQueue.shift()?.(0)
      expect(
        document.documentElement.classList.contains('theme-switching'),
      ).toBe(false)

      // Palette switch also attaches theme-switching
      preferences.setPalette('warm-sand')
      expect(document.documentElement.dataset.palette).toBe('warm-sand')
      expect(
        document.documentElement.classList.contains('theme-switching'),
      ).toBe(true)
      while (rafQueue.length) rafQueue.shift()?.(0)
      expect(
        document.documentElement.classList.contains('theme-switching'),
      ).toBe(false)
    } finally {
      window.requestAnimationFrame = origRaf
      window.cancelAnimationFrame = origCancel
    }
  })
})
