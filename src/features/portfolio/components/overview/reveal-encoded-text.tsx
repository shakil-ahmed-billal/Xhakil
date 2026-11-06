import { InlineScript } from "@/components/inline-script"

type RevealEncodedTextScriptProps = {
  id: string
  textB64: string
}

export function RevealEncodedTextScript({
  id,
  textB64,
}: RevealEncodedTextScriptProps) {
  return (
    <InlineScript
      html={`(${revealEncodedText.toString()})(${JSON.stringify(id)},${JSON.stringify(textB64)})`}
    />
  )
}

function revealEncodedText(id: string, textB64: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.textContent = atob(textB64)
}
