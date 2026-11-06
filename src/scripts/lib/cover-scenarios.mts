import type { ElementHandle, Page } from "puppeteer"

export type CoverScenario = (context: {
  page: Page
  preview: ElementHandle<HTMLElement>
}) => Promise<void>


export const coverScenarios: Record<string, CoverScenario> = {
  wallet: async ({ preview }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    
    await preview.evaluate((el) => {
      const cards = el.querySelectorAll('[data-slot="wallet-card"]')
      const pocket = el.querySelector('[data-slot="wallet-pocket"]')
      if (!cards.length || !pocket) return

      const top = Math.min(
        ...Array.from(cards, (card) => card.getBoundingClientRect().top)
      )
      const { bottom } = pocket.getBoundingClientRect()
      el.style.translate = `0 ${(window.innerHeight - bottom - top) / 2}px`
    })
  },
}
