export interface LogoDef {
  name: string

  brickWidth: number
  pattern: string[]

  colScale?: number

  rowScale?: number

  colOffset?: number

  rowOffset?: number
}

const shakil: LogoDef = {
  name: "SA",
  brickWidth: 80,
  rowScale: 2,
  colOffset: 1,
  rowOffset: 0,
  pattern: [".XXX.XX.", "X...X..X", ".XX.XXXX", "...XX..X", "XXX.X..X"],
}

const vercel: LogoDef = {
  name: "Vercel",
  brickWidth: 40,
  colOffset: 4,
  rowOffset: 0,
  pattern: [
    ".....XX.....",
    ".....XX.....",
    "....XXXX....",
    "....XXXX....",
    "...XXXXXX...",
    "...XXXXXX...",
    "..XXXXXXXX..",
    "..XXXXXXXX..",
    ".XXXXXXXXXX.",
    ".XXXXXXXXXX.",
    "XXXXXXXXXXXX",
    "XXXXXXXXXXXX",
  ],
}

export const LOGOS: LogoDef[] = [shakil, vercel]

export function getLogoIndex(name?: string | null): number {
  if (!name) return 0
  const index = LOGOS.findIndex(
    (logo) => logo.name.toLowerCase() === name.toLowerCase()
  )
  return index === -1 ? 0 : index
}
