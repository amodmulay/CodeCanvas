
"use client"

import * as React from "react"
import { useState } from "react"
import { ChevronRight, Folder, File as FileIcon, FileJson, FileText } from "lucide-react"

import { type FileSystemNode, type File } from "@/lib/code-canvas-data"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FileExplorerProps {
  fileSystem: FileSystemNode[]
  onFileClick: (file: File) => void
}

const getFileIcon = (fileName: string) => {
  if (fileName.endsWith('.json')) {
    return <FileJson className="h-4 w-4 mr-2 flex-shrink-0 text-yellow-400" />
  }
  if (fileName.endsWith('.tsx')) {
    return <FileIcon className="h-4 w-4 mr-2 flex-shrink-0 text-blue-400" />
  }
  if (fileName.endsWith('.md')) {
    return <FileText className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
  }
  return <FileIcon className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
}

const Node: React.FC<{ node: FileSystemNode; onFileClick: (file: File) => void; level: number }> = ({ node, onFileClick, level }) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleToggle = () => {
    if (node.type === 'folder') {
      setIsOpen(!isOpen)
    }
  }

  const handleClick = () => {
    if (node.type === 'file') {
      onFileClick(node)
    } else {
      handleToggle()
    }
  }
  
  const isFolder = node.type === 'folder';

  return (
    <>
      <div
        onClick={handleClick}
        style={{ paddingLeft: `${level * 1}rem` }}
        className="flex items-center py-1.5 px-2 rounded-md cursor-pointer hover:bg-muted"
        role="button"
        tabIndex={0}
      >
        {isFolder ? (
          <>
            <ChevronRight className={`h-4 w-4 mr-1 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
            <Folder className={`h-4 w-4 mr-2 flex-shrink-0 ${isOpen ? 'text-primary' : 'text-gray-500'}`} />
          </>
        ) : (
          <div className="w-5 mr-1 flex-shrink-0" />
        )}
        {!isFolder && getFileIcon(node.name)}
        <span className="truncate text-sm">{node.name}</span>
      </div>
      {isFolder && isOpen && (
        <div>
          {node.children.map((child) => (
            <Node key={child.id} node={child} onFileClick={onFileClick} level={level + 1} />
          ))}
        </div>
      )}
    </>
  )
}

export function FileExplorer({ fileSystem, onFileClick }: FileExplorerProps) {
  return (
    <div className="h-full w-full bg-card flex flex-col">
        <div className="p-4 flex-shrink-0">
            <h2 className="text-lg font-semibold tracking-tight">Panasonic Avionics Corporation</h2>
            <p className="text-sm text-muted-foreground">File Explorer</p>
        </div>
        <ScrollArea className="flex-grow">
            <div className="p-2">
                {fileSystem.map((node) => (
                    <Node key={node.id} node={node} onFileClick={onFileClick} level={0} />
                ))}
            </div>
        </ScrollArea>
    </div>
  )
}
