import { cn } from "@/lib/utils"

export function SiteMark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1600 1000"
      fill="currentColor"
      aria-hidden
      className={cn("h-6 w-auto shrink-0", className)}
      {...props}
    >
      <path d="M200 0h400v200H200ZM1000 0h400v200H1000ZM0 800h400v200H0ZM1000 500h400v200H1000ZM0 200h200v400H0ZM400 400h200v400H400ZM800 200h200v800H800ZM1400 200h200v800H1400ZM200 400h200v200H200Z" />
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" fill="currentColor"><path d="M200 0h400v200H200ZM1000 0h400v200H1000ZM0 800h400v200H0ZM1000 500h400v200H1000ZM0 200h200v400H0ZM400 400h200v400H400ZM800 200h200v800H800ZM1400 200h200v800H1400ZM200 400h200v200H200Z"/></svg>`
}
