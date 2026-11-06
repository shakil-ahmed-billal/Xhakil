"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"

import styles from "../ipod-classic.module.css"

export function Marquee({
  text,
  resetKey,
}: {
  text: string

  resetKey?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLSpanElement>(null)
  const [widths, setWidths] = useState({ container: 0, copy: 0 })

  useEffect(() => {
    const container = containerRef.current
    const copy = copyRef.current
    if (!container || !copy) return
    const observer = new ResizeObserver(() =>
      setWidths({ container: container.clientWidth, copy: copy.offsetWidth })
    )
    observer.observe(container)
    observer.observe(copy)
    return () => observer.disconnect()
  }, [text, resetKey])

  const isScrolling = widths.copy - widths.container > 1

  return (
    <div
      ref={containerRef}
      className={styles.marquee}
      data-scrolling={isScrolling || undefined}
      dir="auto"
    >
      <div
        key={`${resetKey ?? ""}\0${text}`}
        className={styles.marqueeTrack}
        style={{ "--marquee-copy-width": widths.copy } as CSSProperties}
      >
        <span ref={copyRef} className={styles.marqueeCopy}>
          {text}
        </span>
        {isScrolling && (
          <span className={styles.marqueeCopy} aria-hidden>
            {text}
          </span>
        )}
      </div>
    </div>
  )
}
