import {
  getAudioAccent,
  getAudioEnabled,
  setAudioAccent,
  setAudioEnabled,
  type AudioAccent,
} from '@/lib/storage'

const WORD_AUDIO_BASE_URL = 'https://words.resetsix223.serv00.net'
const WORD_AUDIO_EVENT = 'word-audio-accent-change'
const WORD_AUDIO_ENABLED_EVENT = 'word-audio-enabled-change'

let controlsInitialized = false
let toggleInitialized = false
let activeAudio: HTMLAudioElement | null = null
let activeButton: HTMLElement | null = null
let playbackSession = 0

function escapeAttribute(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return entities[char]
  })
}

export function isPlayableWord(word: string) {
  return /^[a-z]+$/.test(word)
}

export function getWordAudioUrl(word: string, accent: AudioAccent = 'us') {
  if (!isPlayableWord(word)) return null
  return `${WORD_AUDIO_BASE_URL}/${accent}/${word}.mp3`
}

export function renderWordAudioButton(word: string) {
  if (!isPlayableWord(word)) return ''

  const safeWord = escapeAttribute(word)
  const label = `播放 ${safeWord} 发音`

  return `<button class="word-audio-button" type="button" data-word-audio="${safeWord}" aria-label="${label}" title="${label}"><span class="word-audio-button__icon" aria-hidden="true"><span></span><span></span><span></span></span><span class="sr-only">${label}</span></button>`
}

function resetButton(button: HTMLElement | null) {
  if (!button) return
  button.dataset.audioState = 'idle'
  const word = button.dataset.wordAudio ?? ''
  const label = word ? `播放 ${word} 发音` : '播放单词发音'
  button.setAttribute('aria-label', label)
  button.setAttribute('title', label)
}

function setButtonState(
  button: HTMLElement | null,
  state: 'idle' | 'loading' | 'playing' | 'error',
) {
  if (!button) return
  button.dataset.audioState = state

  const word = button.dataset.wordAudio ?? ''
  const labels = {
    idle: word ? `播放 ${word} 发音` : '播放单词发音',
    loading: word ? `正在载入 ${word} 发音` : '正在载入单词发音',
    playing: word ? `停止 ${word} 发音` : '停止单词发音',
    error: word ? `${word} 发音加载失败，点击重试` : '发音加载失败，点击重试',
  }

  button.setAttribute('aria-label', labels[state])
  button.setAttribute('title', labels[state])
}

function stopActivePlayback() {
  playbackSession += 1
  activeAudio?.pause()
  if (activeAudio) activeAudio.src = ''
  activeAudio = null
  resetButton(activeButton)
  activeButton = null
}

async function playWord(button: HTMLElement) {
  const word = button.dataset.wordAudio ?? ''
  if (!isPlayableWord(word)) return

  if (button === activeButton && activeAudio && !activeAudio.paused) {
    stopActivePlayback()
    return
  }

  stopActivePlayback()

  const url = getWordAudioUrl(word, getAudioAccent())
  if (!url) return

  const session = playbackSession + 1
  playbackSession = session
  activeButton = button
  setButtonState(button, 'loading')

  const audio = new Audio(url)
  activeAudio = audio
  audio.preload = 'auto'

  audio.addEventListener('playing', () => {
    if (playbackSession === session && activeButton === button) {
      setButtonState(button, 'playing')
    }
  })

  audio.addEventListener('ended', () => {
    if (playbackSession === session && activeButton === button) {
      stopActivePlayback()
    }
  })

  audio.addEventListener('error', () => {
    if (playbackSession === session && activeButton === button) {
      activeAudio = null
      activeButton = null
      setButtonState(button, 'error')
    }
  })

  try {
    await audio.play()
    if (playbackSession === session && activeButton === button) {
      setButtonState(button, 'playing')
    }
  } catch {
    if (playbackSession === session && activeButton === button) {
      activeAudio = null
      activeButton = null
      setButtonState(button, 'error')
    }
  }
}

function syncAccentToggle(accent = getAudioAccent()) {
  document
    .querySelectorAll<HTMLButtonElement>('[data-word-audio-accent]')
    .forEach((button) => {
      const isSelected = button.dataset.wordAudioAccent === accent
      const label =
        button.dataset.wordAudioAccent === 'uk'
          ? '使用英式发音'
          : '使用美式发音'
      button.setAttribute('aria-pressed', String(isSelected))
      button.setAttribute('aria-label', label)
      button.setAttribute('title', label)
    })
}

function syncAudioEnabledToggle(enabled = getAudioEnabled()) {
  document.documentElement.dataset.wordAudioEnabled = String(enabled)
  document
    .querySelectorAll<HTMLButtonElement>('[data-word-audio-enabled-toggle]')
    .forEach((button) => {
      const label = enabled ? '关闭单词发音' : '开启单词发音'
      button.setAttribute('aria-pressed', String(enabled))
      button.setAttribute('aria-label', label)
      button.setAttribute('title', label)
    })
}

export function initWordAudioControls() {
  if (controlsInitialized) return
  controlsInitialized = true

  document.addEventListener('click', (event) => {
    const target = event.target
    if (!(target instanceof Element)) return

    const button = target.closest<HTMLElement>('[data-word-audio]')
    if (!button) return

    event.preventDefault()
    event.stopPropagation()
    if (!getAudioEnabled()) return
    void playWord(button)
  })
}

export function initAudioAccentToggle() {
  if (toggleInitialized) return
  toggleInitialized = true

  syncAudioEnabledToggle()
  syncAccentToggle()

  document.addEventListener('click', (event) => {
    const target = event.target
    if (!(target instanceof Element)) return

    const enabledButton = target.closest<HTMLButtonElement>(
      '[data-word-audio-enabled-toggle]',
    )
    if (enabledButton) {
      const enabled = !getAudioEnabled()
      setAudioEnabled(enabled)
      stopActivePlayback()
      syncAudioEnabledToggle(enabled)
      window.dispatchEvent(
        new CustomEvent(WORD_AUDIO_ENABLED_EVENT, { detail: enabled }),
      )
      return
    }

    const button = target.closest<HTMLButtonElement>('[data-word-audio-accent]')
    if (!button) return

    const accent = button.dataset.wordAudioAccent === 'uk' ? 'uk' : 'us'
    setAudioAccent(accent)
    stopActivePlayback()
    syncAccentToggle(accent)
    window.dispatchEvent(new CustomEvent(WORD_AUDIO_EVENT, { detail: accent }))
  })

  window.addEventListener(WORD_AUDIO_EVENT, () => syncAccentToggle())
  window.addEventListener(WORD_AUDIO_ENABLED_EVENT, () =>
    syncAudioEnabledToggle(),
  )
}
