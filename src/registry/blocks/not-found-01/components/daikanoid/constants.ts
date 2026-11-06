export const BALL_SIZE = 21
export const BALL_SPEED = 10

export const PADDLE_WIDTH = 96
export const PADDLE_HEIGHT = 24
export const PADDLE_SPEED = 16

export const BRICK_HEIGHT = 24
export const BRICK_SHADOW_THICKNESS = 3
export const BRICK_SCORE = 10

export const FONT_URL = "/game/DepartureMono-Regular.otf"

export const SOUND_BOUNCE_URL = "/game/bounce.mp3"
export const SOUND_BREAK_URL = "/game/break.mp3"
export const SOUND_GAME_OVER_URL = "/game/game-over.mp3"

export const BALL_LIGHT_URL = "/game/ball-light.png"
export const BALL_DARK_URL = "/game/ball-dark.png"

export const PADDLE_LIGHT_URL = "/game/paddle-light.png"
export const PADDLE_DARK_URL = "/game/paddle-dark.png"

export function uncheckedClamp(
  min: number,
  max: number,
  value: number
): number {
  return Math.min(Math.max(value, min), max)
}
