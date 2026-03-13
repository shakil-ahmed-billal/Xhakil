export function ChanhDaiMark({
  className,
  ...props
}: React.ComponentProps<"img">) {
  return (
    <>
      <img
        src="/shakil/dark-logo.webp"
        alt="Shakil Logo"
        className={`${className || ""} hidden dark:block`}
        {...props}
      />
      <img
        src="/shakil/light-logo.webp"
        alt="Shakil Logo"
        className={`${className || ""} block dark:hidden`}
        {...props}
      />
    </>
  )
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><text x="50" y="50" fill="${color}">S</text></svg>`
}
