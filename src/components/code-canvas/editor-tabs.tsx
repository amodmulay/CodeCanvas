
"use client"

import * as React from "react"
import { X } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { type File } from "@/lib/code-canvas-data"
import { MermaidChart } from "./mermaid-chart"

interface EditorTabsProps {
  openFiles: File[]
  activeFileId: string | null
  onCloseFile: (fileId: string) => void
  onSetActiveFile: (fileId:string) => void
}

export function EditorTabs({ openFiles, activeFileId, onCloseFile, onSetActiveFile }: EditorTabsProps) {
  if (openFiles.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-background text-muted-foreground">
        <p>Select a file to begin editing.</p>
      </div>
    )
  }
  
  return (
    <Tabs value={activeFileId ?? undefined} onValueChange={onSetActiveFile} className="flex flex-col h-full w-full">
      <TabsList className="flex-shrink-0 justify-start rounded-none bg-card p-0 border-b">
        {openFiles.map((file) => (
          <div key={file.id} className="relative group flex items-center">
            <TabsTrigger
              value={file.id}
              className="rounded-none border-r border-t-2 border-transparent bg-card pr-10 pl-4 py-2 text-sm text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border-t-accent"
            >
              {file.name}
            </TabsTrigger>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onCloseFile(file.id)
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground opacity-50 hover:bg-muted-foreground/20 hover:opacity-100 group-data-[state=active]:opacity-100"
              aria-label={`Close ${file.name}`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </TabsList>
      
      <div className="flex-grow bg-background overflow-hidden">
        {openFiles.map((file) => (
          <TabsContent key={file.id} value={file.id} className="h-full m-0">
              <ScrollArea className="h-full w-full">
                {file.name === 'README.md' && file.content.includes("```mermaid") ? (
                  <MermaidChart content={file.content} />
                ) : (
                  <pre className="p-4 font-code text-sm leading-relaxed">
                    <code className="text-foreground">{file.content}</code>
                  </pre>
                )}
              </ScrollArea>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}
