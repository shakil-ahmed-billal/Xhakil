export type IpodSong = {
  id: string
  name: string

  artistName: string
  albumName?: string

  previewUrl: string

  url?: string
}

export type IpodPlaylist = {
  id: string
  name: string

  songIds: string[]
}

export type IpodLibrary = {
  songs: IpodSong[]

  playlists: IpodPlaylist[]
}

export type IpodArtist = {
  id: string
  name: string
  songIds: string[]
}

export type IpodCatalog = {
  songs: IpodSong[]
  artists: IpodArtist[]
  playlists: IpodPlaylist[]
  songsById: Map<string, IpodSong>
}

export type RepeatMode = "none" | "one" | "all"

type ShuffleSetting = "off" | "songs"
type RepeatSetting = "off" | "one" | "all"
type ClickerSetting = "off" | "on"
export type IpodSettings = {
  shuffle: ShuffleSetting
  repeat: RepeatSetting
  clicker: ClickerSetting
  volume: number
}

export type ScrollTarget = "list" | "seek" | "volume" | "brick"
