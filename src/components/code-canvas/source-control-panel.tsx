
"use client"

import * as React from "react"
import { GitMerge, GitBranch, ChevronDown } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "../ui/separator"

const repositories = [
  {
    name: 'panasonic-avionics-app',
    branches: ['main', 'develop', 'feature/new-ui'],
    activeBranch: 'main',
  },
  {
    name: 'inflight-entertainment-system',
    branches: ['master', 'release/q2-2024', 'hotfix/bug-123'],
    activeBranch: 'master',
  },
  {
    name: 'aero-data-services',
    branches: ['production', 'staging'],
    activeBranch: 'production',
  }
];

export function SourceControlPanel() {
  return (
    <div className="h-full w-full bg-card flex flex-col">
      <div className="p-4 flex-shrink-0">
        <h2 className="text-lg font-semibold tracking-tight">Source Control</h2>
        <p className="text-sm text-muted-foreground">Git Repositories</p>
      </div>
      <ScrollArea className="flex-grow">
        <Accordion type="multiple" defaultValue={['panasonic-avionics-app']} className="w-full p-2">
          {repositories.map(repo => (
            <AccordionItem key={repo.name} value={repo.name} className="border-none">
              <AccordionTrigger className="text-sm font-medium hover:no-underline p-2 rounded-md hover:bg-muted">
                <div className="flex items-center">
                  <GitMerge className="h-4 w-4 mr-2 flex-shrink-0 text-blue-400" />
                  <span>{repo.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 space-y-2 pt-2">
                  {repo.branches.map(branch => (
                    <div key={branch} className="flex items-center text-sm p-1 rounded-md">
                      <GitBranch className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
                      <span className={`${branch === repo.activeBranch ? 'font-bold text-foreground' : ''}`}>{branch}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  )
}
