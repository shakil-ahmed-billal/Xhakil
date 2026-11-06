export interface UseSoundOptions {
  volume?: number

  playbackRate?: number

  interrupt?: boolean

  soundEnabled?: boolean

  lazy?: boolean

  onPlay?: () => void

  onEnd?: () => void

  onPause?: () => void

  onStop?: () => void
}

export type PlayFunction = (overrides?: {
  volume?: number
  playbackRate?: number
}) => void

export interface SoundControls {
  stop: () => void
  pause: () => void
  isPlaying: boolean
}

export type UseSoundReturn = readonly [PlayFunction, SoundControls]
