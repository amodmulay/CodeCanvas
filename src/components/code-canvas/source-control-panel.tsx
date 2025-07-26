
"use client"

import * as React from "react"
import { GitMerge, GitBranch, File as FileIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

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

const initialChangedFiles = [
    { name: 'src/app/page.tsx', status: 'M' },
    { name: 'src/components/code-canvas/ide-sidebar.tsx', status: 'M' },
    { name: 'src/lib/code-canvas-data.ts', status: 'A' },
];

export function SourceControlPanel() {
  const [commitMessage, setCommitMessage] = React.useState("");
  const [changedFiles, setChangedFiles] = React.useState(initialChangedFiles);
  const { toast } = useToast();

  const handleCommit = () => {
    if (!commitMessage) {
        toast({
            title: "Commit message cannot be empty",
            variant: "destructive",
        });
        return;
    }
    toast({
        title: "Changes committed",
        description: `"${commitMessage}"`,
    });
    setCommitMessage("");
    setChangedFiles([]);
  };

  return (
    <div className="h-full w-full bg-card flex flex-col">
      <div className="p-4 flex-shrink-0 border-b">
        <h2 className="text-lg font-semibold tracking-tight">Source Control</h2>
        <div className="mt-4">
          <Input 
            placeholder="Commit message"
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            className="w-full"
          />
          <Button onClick={handleCommit} className="w-full mt-2">
            Commit to main
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <Accordion type="multiple" defaultValue={['changes', 'panasonic-avionics-app']} className="w-full p-2">
          <AccordionItem value="changes" className="border-none">
            <AccordionTrigger className="text-sm font-medium hover:no-underline p-2 rounded-md hover:bg-muted">
              <div className="flex items-center">
                <span>Changes ({changedFiles.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-4 space-y-2 pt-2">
                {changedFiles.map(file => (
                  <div key={file.name} className="flex items-center text-sm p-1 rounded-md">
                    <FileIcon className="h-4 w-4 mr-2 flex-shrink-0 text-blue-400" />
                    <span className="truncate flex-grow">{file.name}</span>
                    <span className={`ml-2 font-mono text-xs ${file.status === 'M' ? 'text-yellow-400' : 'text-green-400'}`}>{file.status}</span>
                  </div>
                ))}
                {changedFiles.length === 0 && <p className="text-sm text-muted-foreground p-1">No changes.</p>}
              </div>
            </AccordionContent>
          </AccordionItem>

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
