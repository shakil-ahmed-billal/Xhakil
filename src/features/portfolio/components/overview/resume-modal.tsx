"use client"

import { DownloadIcon, EyeIcon, FileTextIcon } from "lucide-react"

import { Button } from "@/components/base/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/base/ui/dialog"
import { ScrollFadeEffect } from "@/registry/components/scroll-fade-effect/scroll-fade-effect"
import { RESUME_DATA } from "@/features/portfolio/data/resumes"

import { IntroItem, IntroItemContent, IntroItemIcon } from "./intro-item"

export function ResumeModal() {
  return (
    <Dialog>
      <DialogTrigger
        nativeButton={false}
        render={
          <IntroItem>
            <IntroItemIcon>
              <FileTextIcon />
            </IntroItemIcon>
            <IntroItemContent>
              <button className="cursor-pointer underline-offset-4 hover:underline">
                Resume
              </button>
            </IntroItemContent>
          </IntroItem>
        }
      />
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Professional Resumes</DialogTitle>
          <DialogDescription>
            Select a specialized resume to preview or download.
          </DialogDescription>
        </DialogHeader>

        <ScrollFadeEffect className="-mr-2 max-h-[60vh] overflow-y-auto pr-2">
          <div className="space-y-4">
            {Object.entries(RESUME_DATA).map(([category, files]) => (
              <div key={category} className="space-y-2">
                <h3 className="pl-1 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase opacity-60">
                  {category}
                </h3>
                <div className="grid gap-1.5">
                  {files.map((resume) => {
                    const filePath = `/resume/${category}/${resume.file}`
                    return (
                      <div
                        key={resume.file}
                        className="group flex items-center justify-between rounded-lg border border-edge/50 bg-muted/5 px-2.5 py-1.5 transition-all hover:border-edge hover:bg-muted/20"
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <div className="flex-shrink-0 rounded-md border border-edge/50 bg-background p-1.5 transition-colors group-hover:border-primary/20">
                            <FileTextIcon className="size-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
                          </div>
                          <span className="truncate text-sm font-medium tracking-tight">
                            {resume.name}
                          </span>
                        </div>
                        <div className="ml-4 flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            nativeButton={false}
                            render={
                              <a
                                href={filePath}
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            }
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            title="Preview"
                          >
                            <EyeIcon className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            nativeButton={false}
                            render={<a href={filePath} download />}
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            title="Download"
                          >
                            <DownloadIcon className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollFadeEffect>
      </DialogContent>
    </Dialog>
  )
}
