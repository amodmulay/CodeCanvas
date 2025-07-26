
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { File, GitMerge, List } from "lucide-react";
import { FileExplorer } from "@/components/code-canvas/file-explorer";
import { EditorTabs } from "@/components/code-canvas/editor-tabs";
import { TerminalPanel } from "@/components/code-canvas/terminal-panel";
import { type File as FileType, getFileById, fileSystem } from "@/lib/code-canvas-data";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { SourceControlPanel } from "@/components/code-canvas/source-control-panel";

type View = "files" | "source-control";

export default function CodeCanvas() {
  const [isMounted, setIsMounted] = useState(false);
  const [openFiles, setOpenFiles] = useState<FileType[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<View>("files");

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedOpenFiles = localStorage.getItem("codeCanvas-openFiles");
      const savedActiveFileId = localStorage.getItem("codeCanvas-activeFileId");

      const initialOpenFiles = savedOpenFiles ? JSON.parse(savedOpenFiles) : [];
      const initialActiveFileId = savedActiveFileId ? JSON.parse(savedActiveFileId) : null;
      
      if (initialOpenFiles.length > 0) {
        setOpenFiles(initialOpenFiles);
        if (initialActiveFileId && initialOpenFiles.some((f: FileType) => f.id === initialActiveFileId)) {
          setActiveFileId(initialActiveFileId);
        } else {
          setActiveFileId(initialOpenFiles[0].id);
        }
      } else {
        const readmeFile = getFileById("readme");
        if (readmeFile) {
          setOpenFiles([readmeFile]);
          setActiveFileId(readmeFile.id);
        }
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("codeCanvas-openFiles", JSON.stringify(openFiles));
      localStorage.setItem("codeCanvas-activeFileId", JSON.stringify(activeFileId));
    }
  }, [openFiles, activeFileId, isMounted]);

  const handleOpenFile = (file: FileType) => {
    if (!openFiles.some((f) => f.id === file.id)) {
      setOpenFiles((prev) => [...prev, file]);
    }
    setActiveFileId(file.id);
  };

  const handleCloseFile = (fileId: string) => {
    setOpenFiles((prev) => {
      const newOpenFiles = prev.filter((f) => f.id !== fileId);
      if (activeFileId === fileId) {
        if (newOpenFiles.length > 0) {
          const closingFileIndex = prev.findIndex(f => f.id === fileId);
          const newActiveIndex = Math.max(0, closingFileIndex - 1);
          setActiveFileId(newOpenFiles[newActiveIndex].id);
        } else {
          setActiveFileId(null);
        }
      }
      return newOpenFiles;
    });
  };

  const handleSetActiveFile = (fileId: string) => {
    setActiveFileId(fileId);
  };

  const ActivityBar = () => (
    <div className="flex flex-col items-center w-12 py-4 bg-card border-r border-border">
      <button 
        onClick={() => setActiveView("files")}
        className={`p-2 rounded-md ${activeView === 'files' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
        title="Files"
      >
        <File size={24} />
      </button>
      <button 
        onClick={() => setActiveView("source-control")}
        className={`p-2 mt-4 rounded-md ${activeView === 'source-control' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
        title="Source Control"
      >
        <GitMerge size={24} />
      </button>
    </div>
  );
  
  if (!isMounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-card">
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-background text-foreground font-body flex">
      <ActivityBar />
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        <ResizablePanel defaultSize={18} minSize={15} maxSize={30}>
          {activeView === 'files' && <FileExplorer fileSystem={fileSystem} onFileClick={handleOpenFile} />}
          {activeView === 'source-control' && <SourceControlPanel />}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={82}>
            <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={70} minSize={30}>
                    <EditorTabs
                        openFiles={openFiles}
                        activeFileId={activeFileId}
                        onCloseFile={handleCloseFile}
                        onSetActiveFile={handleSetActiveFile}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30} minSize={10} collapsible={true}>
                    <TerminalPanel />
                </ResizablePanel>
            </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
