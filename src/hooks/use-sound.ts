"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const audioCache = new Map<
  string,
  {
    buffer: AudioBuffer
    loading: Promise<AudioBuffer>
  } | null
>()

let sharedAudioContext: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (sharedAudioContext) return sharedAudioContext

  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext

  if (!AudioContextClass) {
    console.warn("Web Audio API is not supported in this browser.")
    return null
  }

  sharedAudioContext = new AudioContextClass()
  return sharedAudioContext
}

export function useSound(url: string) {
  const audioCtxRef = useRef<AudioContext | null>(null)
  const bufferRef = useRef<AudioBuffer | null>(null)

  useEffect(() => {
    const audioCtx = getAudioContext()
    if (!audioCtx) return

    audioCtxRef.current = audioCtx

    const cached = audioCache.get(url)
    if (cached?.buffer) {
      bufferRef.current = cached.buffer
      return
    }

    if (cached?.loading) {
      cached.loading
        .then((decoded) => {
          bufferRef.current = decoded
        })
        .catch(() => {})
      return
    }

    const loadingPromise = fetch(url)
      .then((res) => res.arrayBuffer())
      .then((data) => audioCtx.decodeAudioData(data))
      .then((decoded) => {
        audioCache.set(url, { buffer: decoded, loading: loadingPromise })
        bufferRef.current = decoded
        return decoded
      })
      .catch((err) => {
        console.log(`Failed to load sound from ${url}:`, err)

        audioCache.set(url, null)
        throw err
      })

    audioCache.set(url, { buffer: null!, loading: loadingPromise })
  }, [url])

  const play = useCallback((volume: number = 1) => {
    if (audioCtxRef.current && bufferRef.current) {
      const source = audioCtxRef.current.createBufferSource()
      const gainNode = audioCtxRef.current.createGain()

      source.buffer = bufferRef.current
      gainNode.gain.value = volume

      source.connect(gainNode)
      gainNode.connect(audioCtxRef.current.destination)
      source.start(0)
    }
  }, [])

  return play
}

export function useSoundLazy(url: string) {
  const audioCtxRef = useRef<AudioContext | null>(null)
  const bufferRef = useRef<AudioBuffer | null>(null)
  const loadingPromiseRef = useRef<Promise<AudioBuffer | void> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(() => {
    const cached = audioCache.get(url)
    return !!cached?.buffer
  })

  useEffect(() => {
    const audioCtx = getAudioContext()
    if (audioCtx) {
      audioCtxRef.current = audioCtx
    }

    const cached = audioCache.get(url)
    if (cached?.buffer) {
      bufferRef.current = cached.buffer
    }
  }, [url])

  const load = useCallback(() => {
    if (bufferRef.current) {
      return Promise.resolve(bufferRef.current)
    }

    if (loadingPromiseRef.current) {
      return loadingPromiseRef.current
    }

    const audioCtx = getAudioContext()
    if (!audioCtx) {
      return Promise.reject(new Error("Web Audio API not supported"))
    }

    audioCtxRef.current = audioCtx

    const cached = audioCache.get(url)
    if (cached?.buffer) {
      bufferRef.current = cached.buffer
      setIsLoaded(true)
      return Promise.resolve(cached.buffer)
    }

    if (cached?.loading) {
      setIsLoading(true)
      const promise = cached.loading
        .then((decoded) => {
          bufferRef.current = decoded
          setIsLoaded(true)
          return decoded
        })
        .catch((err) => {
          throw err
        })
        .finally(() => {
          setIsLoading(false)
          loadingPromiseRef.current = null
        })

      loadingPromiseRef.current = promise
      return promise
    }

    setIsLoading(true)
    const loadingPromise = fetch(url)
      .then((res) => res.arrayBuffer())
      .then((data) => audioCtx.decodeAudioData(data))
      .then((decoded) => {
        audioCache.set(url, { buffer: decoded, loading: loadingPromise })
        bufferRef.current = decoded
        setIsLoaded(true)
        return decoded
      })
      .catch((err) => {
        console.log(`Failed to load sound from ${url}:`, err)
        audioCache.set(url, null)
        throw err
      })
      .finally(() => {
        setIsLoading(false)
        loadingPromiseRef.current = null
      })

    audioCache.set(url, { buffer: null!, loading: loadingPromise })
    loadingPromiseRef.current = loadingPromise
    return loadingPromise
  }, [url])

  const preload = useCallback(() => {
    load().catch(() => {})
  }, [load])

  const play = useCallback(
    (volume: number = 1) => {
      const playSound = () => {
        if (audioCtxRef.current && bufferRef.current) {
          const source = audioCtxRef.current.createBufferSource()
          const gainNode = audioCtxRef.current.createGain()

          source.buffer = bufferRef.current
          gainNode.gain.value = volume

          source.connect(gainNode)
          gainNode.connect(audioCtxRef.current.destination)
          source.start(0)
        }
      }

      if (bufferRef.current) {
        playSound()
        return
      }

      load()
        .then(() => {
          playSound()
        })
        .catch(() => {})
    },
    [load]
  )

  return { play, preload, isLoading, isLoaded }
}
