export function SiteWordmark({
  className,
  ...props
}: React.ComponentProps<"img">) {
  return (
    <>
      <img
        src="/shakil/shakil-light.svg"
        alt="Shakil Wordmark"
        className={`${className || ""} hidden dark:block`}
        {...props}
      />
      <img
        src="/shakil/shakil-dark.svg"
        alt="Shakil Wordmark"
        className={`${className || ""} block dark:hidden`}
        {...props}
      />
    </>
  )
}

export function getWordmarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100"><text x="100" y="50" fill="${color}">SHAKIL</text></svg>`
}
