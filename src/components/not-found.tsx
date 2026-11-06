import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Daikanoid } from "@/registry/blocks/not-found-01/components/daikanoid"

export function NotFound() {
  return (
    <div className="grid min-h-svh place-items-center py-6">
      <h1 className="sr-only">Page Not Found - 404</h1>

      <section className="max-lg:hidden">
        <Daikanoid />
      </section>

      <section className="flex flex-col items-center gap-6 lg:hidden">
        <p className="font-mono text-8xl font-medium" aria-hidden>
          404
        </p>
        <Button
          variant="outline"
          nativeButton={false}
          render={
            <Link href="/">
              Go to Home
              <ArrowRightIcon />
            </Link>
          }
        />
      </section>
    </div>
  )
}
