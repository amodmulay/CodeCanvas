
"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { File, GitMerge, Play, Bug, BookMarked, Cpu, Puzzle } from "lucide-react";
import { FileExplorer } from "@/components/code-canvas/file-explorer";
import { EditorTabs } from "@/components/code-canvas/editor-tabs";
import { TerminalPanel, type TerminalHandle } from "@/components/code-canvas/terminal-panel";
import { ChatPanel } from "@/components/code-canvas/chat-panel";
import { type File as FileType, getFileById, fileSystem, apiDocs } from "@/lib/code-canvas-data";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { SourceControlPanel } from "@/components/code-canvas/source-control-panel";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@/components/ui/menubar"

type View = "files" | "source-control" | "run" | "api-docs" | "containers" | "extensions";

const containers = [
    { name: 'prod-app-server-1', type: 'Graviton', region: 'us-east-1' },
    { name: 'prod-app-server-2', type: 'Graviton', region: 'us-east-1' },
    { name: 'cuttlefish-emulator-1', type: 'Cuttlefish', region: 'us-west-2' },
    { name: 'cuttlefish-emulator-2', type: 'Cuttlefish', region: 'us-west-2' },
    { name: 'staging-db-master', type: 'Graviton', region: 'eu-west-1' },
];

const loadingMessages = [
    "Fetching workspace...",
    "Setting up container...",
    "Starting services...",
    "Finalizing setup...",
];

export default function CodeCanvas() {
  const [isMounted, setIsMounted] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [openFiles, setOpenFiles] = useState<FileType[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<View>("files");
  const terminalRef = useRef<TerminalHandle>(null);

  useEffect(() => {
    const messageInterval = setInterval(() => {
        setLoadingMessage(prev => {
            const currentIndex = loadingMessages.indexOf(prev);
            if (currentIndex < loadingMessages.length - 1) {
                return loadingMessages[currentIndex + 1];
            }
            return prev;
        });
    }, 1200);

    const mountTimeout = setTimeout(() => {
      setIsMounted(true);
      clearInterval(messageInterval);
    }, loadingMessages.length * 1200 + 500);

    return () => {
        clearInterval(messageInterval);
        clearTimeout(mountTimeout);
    };
}, []);


  useEffect(() => {
    if (!isMounted) return;
    try {
      const savedOpenFiles = localStorage.getItem("codeCanvas-openFiles");
      const savedActiveFileId = localStorage.getItem("codeCanvas-activeFileId");

      let initialOpenFiles: FileType[] = savedOpenFiles ? JSON.parse(savedOpenFiles) : [];
      let initialActiveFileId: string | null = savedActiveFileId ? JSON.parse(savedActiveFileId) : null;
      
      const readmeFile = getFileById("readme");

      if (readmeFile) {
        const isReadmeOpen = initialOpenFiles.some(f => f.id === readmeFile.id);
        if (!isReadmeOpen) {
          initialOpenFiles = [readmeFile, ...initialOpenFiles];
        }
        if (!initialActiveFileId || !initialOpenFiles.some(f => f.id === initialActiveFileId)) {
          initialActiveFileId = readmeFile.id;
        }
      }
      
      if (initialOpenFiles.length > 0) {
        setOpenFiles(initialOpenFiles);
        if (initialActiveFileId && initialOpenFiles.some((f: FileType) => f.id === initialActiveFileId)) {
          setActiveFileId(initialActiveFileId);
        } else {
          setActiveFileId(initialOpenFiles[0].id);
        }
      } else {
        const telemetryFile = getFileById("telemetry.ts");
        const filesToOpen = [readmeFile, telemetryFile].filter((f): f is FileType => !!f);
        if (filesToOpen.length > 0) {
          setOpenFiles(filesToOpen);
          setActiveFileId(filesToOpen[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
    }
  }, [isMounted]);

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

  const handleRun = () => {
    setActiveView('run');
    if (terminalRef.current) {
        terminalRef.current.executeCommand('npm run dev');
    }
  }

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
      <button 
        onClick={handleRun}
        className={`p-2 mt-4 rounded-md ${activeView === 'run' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
        title="Run and Debug"
      >
        <Play size={24} />
      </button>
       <button 
        onClick={() => setActiveView("api-docs")}
        className={`p-2 mt-4 rounded-md ${activeView === 'api-docs' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
        title="API Documentation"
      >
        <BookMarked size={24} />
      </button>
      <button 
        onClick={() => setActiveView("containers")}
        className={`p-2 mt-4 rounded-md ${activeView === 'containers' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
        title="Running Containers"
      >
        <Cpu size={24} />
      </button>
      <button 
        onClick={() => setActiveView("extensions")}
        className={`p-2 mt-4 rounded-md ${activeView === 'extensions' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
        title="Extensions"
      >
        <Puzzle size={24} />
      </button>
      <div className="flex-grow" />
      <button 
        className="p-2 mt-4 rounded-md text-muted-foreground"
        title="Debug"
        disabled
      >
        <Bug size={24} />
      </button>
    </div>
  );

  const ApiDocsPanel = () => (
      <div className="p-4 bg-card h-full">
          <h3 className="text-lg font-semibold mb-2">API Documentation</h3>
          <ul className="space-y-2">
              {apiDocs.map((doc) => (
                  <li key={doc.id}>
                      <button onClick={() => handleOpenFile(doc)} className="flex items-center text-sm p-1 rounded-md hover:bg-muted w-full text-left">
                          <BookMarked className="h-4 w-4 mr-2 flex-shrink-0" />
                          {doc.name}
                      </button>
                  </li>
              ))}
          </ul>
      </div>
  )

  const ContainersPanel = () => (
      <div className="p-4 bg-card h-full">
          <h3 className="text-lg font-semibold mb-2">Running Containers (AWS)</h3>
          <ul className="space-y-2">
            {containers.map((container, index) => (
                <li key={index}>
                    <div className="flex items-center p-2 text-sm">
                        {container.type === 'Graviton' ? <Cpu className="h-4 w-4 mr-2 flex-shrink-0 text-green-400" /> : <File className="h-4 w-4 mr-2 flex-shrink-0 text-purple-400" />}
                        <div className="flex flex-col">
                            <span className="font-medium">{container.name}</span>
                            <span className="text-xs text-muted-foreground">{container.region} - {container.type}</span>
                        </div>
                    </div>
                </li>
            ))}
          </ul>
      </div>
  )

  const ExtensionsPanel = () => (
      <div className="p-4 bg-card h-full">
          <h3 className="text-lg font-semibold mb-2">Extensions</h3>
          <div className="flex items-center p-2 text-sm">
            <Puzzle className="h-4 w-4 mr-2 flex-shrink-0" />
            <div className="flex flex-col">
                <span className="font-medium">Extension Marketplace</span>
            </div>
          </div>
      </div>
  )
  
  if (!isMounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-card">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-foreground text-lg">{loadingMessage}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="h-screen w-full bg-background text-foreground font-body flex flex-col">
        <Menubar className="rounded-none border-b border-border px-2">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New File</MenubarItem>
              <MenubarItem>Open File</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Save</MenubarItem>
              <MenubarItem>Save As...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Close File</MenubarItem>
              <MenubarItem>Close All Files</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Exit</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Explorer</MenubarItem>
              <MenubarItem>Source Control</MenubarItem>
              <MenubarItem>Run and Debug</MenubarItem>
              <MenubarItem>API Documentation</MenubarItem>
              <MenubarItem>Running Containers</MenubarItem>
              <MenubarItem>Extensions</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Terminal</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Extensions</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Browse Extensions</MenubarItem>
              <MenubarItem>Installed Extensions</MenubarItem>
              <MenubarItem>Check for Updates</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Options</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Settings</MenubarItem>
              <MenubarItem>Keyboard Shortcuts</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Color Theme</MenubarItem>
              <MenubarItem>File Icon Theme</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Terminal</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Terminal</MenubarItem>
              <MenubarItem>Split Terminal</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Run Task</MenubarItem>
              <MenubarItem>Run Build Task</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Run</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Start Debugging</MenubarItem>
              <MenubarItem>Run Without Debugging</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Stop Debugging</MenubarItem>
              <MenubarItem>Restart Debugging</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Go</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Go to File...</MenubarItem>
              <MenubarItem>Go to Symbol in Workspace...</MenubarItem>
              <MenubarItem>Go to Definition</MenubarItem>
              <MenubarItem>Go to Declaration</MenubarItem>
              <MenubarItem>Go to Type Definition</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Help</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Welcome</MenubarItem>
              <MenubarItem>About</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>View Logs</MenubarItem>
              <MenubarItem>Report Issue</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <div className="flex flex-grow">
          <ActivityBar />
          <ResizablePanelGroup direction="horizontal" className="h-full w-full">
            <ResizablePanel defaultSize={18} minSize={15} maxSize={30}>
              {activeView === 'files' && <FileExplorer fileSystem={fileSystem} onFileClick={handleOpenFile} />}
              {activeView === 'source-control' && <SourceControlPanel />}
              {activeView === 'run' && <div className="p-4 bg-card h-full"><h3 className="text-lg font-semibold">Run and Debug</h3><p className="text-sm text-muted-foreground">Click the play button to run.</p></div>}
              {activeView === 'api-docs' && <ApiDocsPanel />}
              {activeView === 'containers' && <ContainersPanel />}
              {activeView === 'extensions' && <ExtensionsPanel />}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={52}>
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
                        <TerminalPanel ref={terminalRef} />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={20} collapsible={true}>
                <ChatPanel />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
  );
}

    