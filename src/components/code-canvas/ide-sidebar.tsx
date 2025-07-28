
"use client"

import * as React from "react"
import { BookMarked, Cpu, Smartphone, Puzzle } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { type File, apiDocs } from "@/lib/code-canvas-data"

const containers = [
    { name: 'prod-app-server-1', type: 'Graviton', region: 'us-east-1' },
    { name: 'prod-app-server-2', type: 'Graviton', region: 'us-east-1' },
    { name: 'cuttlefish-emulator-1', type: 'Cuttlefish', region: 'us-west-2' },
    { name: 'cuttlefish-emulator-2', type: 'Cuttlefish', region: 'us-west-2' },
    { name: 'staging-db-master', type: 'Graviton', region: 'eu-west-1' },
];

interface IdeSidebarProps {
    onFileClick: (file: File) => void;
}

export function IdeSidebar({ onFileClick }: IdeSidebarProps) {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarGroup>
              <SidebarGroupLabel>API Documentation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {apiDocs.map((doc) => (
                    <SidebarMenuItem key={doc.id}>
                      <SidebarMenuButton
                        onClick={() => onFileClick(doc)}
                        variant="ghost"
                        className="w-full justify-start"
                      >
                        <BookMarked />
                        {doc.name}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarGroup>
              <SidebarGroupLabel>Running Containers (AWS)</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {containers.map((container, index) => (
                    <SidebarMenuItem key={index}>
                      <div className="flex items-center p-2 text-sm">
                        {container.type === 'Graviton' ? <Cpu className="h-4 w-4 mr-2 flex-shrink-0 text-green-400" /> : <Smartphone className="h-4 w-4 mr-2 flex-shrink-0 text-purple-400" />}
                        <div className="flex flex-col">
                            <span className="font-medium">{container.name}</span>
                            <span className="text-xs text-muted-foreground">{container.region} - {container.type}</span>
                        </div>
                      </div>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarGroup>
              <SidebarGroupLabel>Extensions</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                     <SidebarMenuItem>
                       <div className="flex items-center p-2 text-sm">
                         <Puzzle className="h-4 w-4 mr-2 flex-shrink-0" />
                         <div className="flex flex-col">
                             <span className="font-medium">Extension Marketplace</span>
                         </div>
                       </div>
                     </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
