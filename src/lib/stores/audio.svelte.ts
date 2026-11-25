import { preferences, type AudioAccent } from '$lib/stores/preferences.svelte'
import { ui } from '$lib/stores/ui.svelte'

const WORD_AUDIO_BASE_URL = 'https://words.resetsix223.serv00.net'

export type AudioStatus = 'idle' | 'loading' | 'playing' | 'error'

export function isPlayableWord(word: string): boolean {
  return /^[a-z]+$/i.test(word.trim())
}

export function getWordAudioUrl(
  word: string,
  accent: AudioAccent = 'us',
): string | null {
  const normalized = word.trim().toLowerCase()
  if (!isPlayableWord(normalized)) return null
  return `${WORD_AUDIO_BASE_URL}/${accent}/${normalized}.mp3`
}

class AudioStore {
  playingWord = $state<string | null>(null)
  status = $state<AudioStatus>('idle')
  private element: HTMLAudioElement | null = null
  private session = 0

  getWordStatus(word: string): AudioStatus {
    const normalized = word.trim().toLowerCase()
    return this.playingWord === normalized ? this.status : 'idle'
  }

  stop() {
    this.session += 1
    if (this.element) {
      this.element.pause()
      this.element.src = ''
      this.element = null
    }
    this.playingWord = null
    this.status = 'idle'
  }

  async play(rawWord: string, accentOverride?: AudioAccent) {
    const word = rawWord.trim().toLowerCase()
    if (!isPlayableWord(word)) return

    if (
      this.playingWord === word &&
      (this.status === 'playing' || this.status === 'loading')
    ) {
      this.stop()
      return
    }

    this.stop()

    const accent = accentOverride ?? preferences.settings.audioAccent
    const url = getWordAudioUrl(word, accent)
    if (!url || typeof Audio === 'undefined') return

    const currentSession = ++this.session
    this.playingWord = word
    this.status = 'loading'

    const audio = new Audio(url)
    this.element = audio
    audio.preload = 'auto'

    audio.addEventListener('playing', () => {
      if (this.session === currentSession) {
        this.status = 'playing'
      }
    })

    audio.addEventListener('ended', () => {
      if (this.session === currentSession) {
        this.stop()
      }
    })

    audio.addEventListener('error', () => {
      if (this.session === currentSession) {
        this.element = null
        this.status = 'error'
        ui.toast({
          id: `audio-err-${word}`,
          message: `${word} 发音加载失败，可稍后重试`,
          variant: 'error',
        })
      }
    })

    try {
      await audio.play()
      if (this.session === currentSession) {
        this.status = 'playing'
      }
    } catch {
      if (this.session === currentSession) {
        this.element = null
        this.status = 'error'
      }
    }
  }
}

export const audio = new AudioStore()
