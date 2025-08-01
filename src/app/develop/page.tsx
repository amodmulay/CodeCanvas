
"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { File, GitMerge, Play, Bug, BookMarked, Cpu, Puzzle, Archive, Package, GitCommit, Tag, Send, CheckCircle, XCircle, Clock, TestTubeDiagonal, RefreshCw, StopCircle, ArrowRight, User, LogOut, Moon, Sun, Server, GitFork, HardDrive, Share2 } from "lucide-react";
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
} from "@/components/ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MermaidChart } from "@/components/code-canvas/mermaid-chart";


type View = "files" | "source-control" | "run" | "api-docs" | "containers" | "extensions" | "build" | "testing";

const containers = [
    { name: 'prod-app-converix-1', type: 'Graviton', region: 'us-east-1' },
    { name: 'prod-app-converix-2', type: 'Graviton', region: 'us-east-1' },
    { name: 'converix-sandbox', type: 'Cuttlefish', region: 'us-west-2' },
    { name: 'cuttlefish-emulator-2', type: 'Cuttlefish', region: 'us-west-2' },
    { name: 'staging-db-master', type: 'Graviton', region: 'eu-west-1' },
];

const loadingMessages = [
    "Fetching workspace...",
    "Setting up container...",
    "Starting services...",
    "Finalizing setup...",
];

const UserProfile = () => {
    const router = useRouter();
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="focus:outline-none rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://api.dicebear.com/8.x/pixel-art/svg?seed=Jane" alt="Developer" data-ai-hint="pixel art avatar" />
                        <AvatarFallback>
                            <User size={20} />
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    <p>Jane Doe</p>
                    <p className="text-xs text-muted-foreground font-normal">jane.doe@example.com</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light Theme</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark Theme</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/login')}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};


export default function CodeCanvas() {
  const [isMounted, setIsMounted] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [openFiles, setOpenFiles] = useState<FileType[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<View>("files");
  const terminalRef = useRef<TerminalHandle>(null);
  const { toast } = useToast();

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
        onClick={() => setActiveView("build")}
        className={`p-2 mt-4 rounded-md ${activeView === 'build' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
        title="Build"
      >
        <Archive size={24} />
      </button>
       <button 
        onClick={() => setActiveView("testing")}
        className={`p-2 mt-4 rounded-md ${activeView === 'testing' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
        title="Automated Testing"
      >
        <TestTubeDiagonal size={24} />
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
  
    const BuildSystemPanel = () => {
    const [selectedApp, setSelectedApp] = useState("avionics-portal");
    
    const apps = [
        { id: "avionics-portal", name: "avionics-portal", status: "Synced", health: "Healthy" },
        { id: "inflight-entertainment-api", name: "inflight-entertainment-api", status: "Synced", health: "Healthy" },
        { id: "telemetry-service", name: "telemetry-service", status: "Progressing", health: "Degraded" },
        { id: "ota-update-service", name: "ota-update-service", status: "Synced", health: "Healthy" },
    ];
    
    const buildArchitectureDiagram = `
\`\`\`mermaid
graph TD
    subgraph "CI/CD Pipeline (ArgoCD)"
        A[Git Commit] --> B{Build Trigger};
        B --> C[Build & Test];
        C --> D{Containerize};
        D --> E[Push to Registry];
        E --> F[Deploy to Staging];
        F --> G{Automated Tests};
        G -- Success --> H[Promote to Production];
        G -- Failure --> I[Rollback];
    end
\`\`\`
`;

    return (
        <div className="p-4 bg-card h-full space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Server className="mr-2 h-5 w-5" />
                        ArgoCD Build System
                    </CardTitle>
                    <CardDescription>Continuous Delivery for Avionics Services</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {apps.map((app) => (
                            <li key={app.id}>
                                <button 
                                    onClick={() => setSelectedApp(app.id)}
                                    className={`w-full p-2 rounded-md text-left ${selectedApp === app.id ? 'bg-accent' : 'hover:bg-muted'}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium text-sm">{app.name}</p>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs px-2 py-1 rounded-full ${app.status === 'Synced' ? 'bg-blue-500/20 text-blue-300' : 'bg-yellow-500/20 text-yellow-300 animate-pulse'}`}>{app.status}</span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${app.health === 'Healthy' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>{app.health}</span>
                                        </div>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            
            <Separator />

            {selectedApp && (
                <Card>
                    <CardHeader>
                        <CardTitle>Build Architecture</CardTitle>
                        <CardDescription>Diagram for {selectedApp}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MermaidChart content={buildArchitectureDiagram} />
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

    const TestingPanel = () => {
    const [isTesting, setIsTesting] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleRunTests = () => {
        setIsTesting(true);
        setProgress(0);
        
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsTesting(false);
                     toast({
                        title: "Testing Complete",
                        description: "All tests passed successfully.",
                    });
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
    }
    
    const testRuns = [
        { id: 'run-1', type: 'E2E Suite', status: 'Success', duration: '5m 12s', time: '1h ago' },
        { id: 'run-2', type: 'Performance', status: 'Success', duration: '2m 34s', time: '3h ago' },
        { id: 'run-3', type: 'Regression', status: 'Failed', duration: '7m 45s', time: '1d ago' },
    ]

    return (
        <div className="p-4 bg-card h-full space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Automated Testing Harness</CardTitle>
                    <CardDescription>Run tests in a sandboxed environment.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="test-suite">Test Suite</Label>
                        <Select defaultValue="all">
                            <SelectTrigger id="test-suite">
                                <SelectValue placeholder="Select a suite" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Run All Suites</SelectItem>
                                <SelectItem value="e2e">End-to-End Tests</SelectItem>
                                <SelectItem value="performance">Performance Tests</SelectItem>
                                <SelectItem value="regression">Regression Tests</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleRunTests} className="w-full" disabled={isTesting}>
                        {isTesting ? (
                           <>
                             <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                             Running Tests...
                           </>
                        ) : "Run Tests"}
                       
                    </Button>
                    {isTesting && <Progress value={progress} className="w-full mt-2" />}
                </CardContent>
            </Card>

            <Separator />
            
            <Card>
                <CardHeader>
                    <CardTitle>Recent Test Runs</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {testRuns.map((run) => (
                            <li key={run.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    {run.status === 'Success' ? <CheckCircle className="h-5 w-5 mr-3 text-green-500" /> : <XCircle className="h-5 w-5 mr-3 text-red-500" />}
                                    <div>
                                        <p className="font-medium">{run.type}</p>
                                        <p className="text-sm text-muted-foreground">{run.status} - {run.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {run.time}
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}
const RunAndDebugPanel = () => {
    const [isDebugging, setIsDebugging] = useState(false);

    const handleToggleDebug = () => {
        setIsDebugging(!isDebugging);
        toast({
            title: isDebugging ? "Debugger Detached" : "Debugger Attached",
            description: isDebugging ? "Stopped debugging process." : "Attached to process. Ready to debug.",
        });
    }

    const variables = {
        Local: [
            { name: 'props', value: '{...}', type: 'object' },
            { name: 'state', value: '{...}', type: 'object' },
            { name: 'id', value: '"readme"', type: 'string' },
        ],
        Global: [
            { name: 'window', value: 'Window', type: 'object' },
            { name: 'document', value: 'Document', type: 'object' },
        ]
    };

    const callStack = [
        { func: 'handleOpenFile', file: 'page.tsx:150', status: 'active' },
        { func: 'onClick', file: 'file-explorer.tsx:45', status: 'paused' },
        { func: 'Node', file: 'file-explorer.tsx:30', status: 'paused' },
    ];

    const breakpoints = [
        { file: 'page.tsx', line: 152 },
        { file: 'editor-tabs.tsx', line: 40 },
    ];

    return (
        <div className="p-4 bg-card h-full flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
                <Button onClick={handleToggleDebug} size="sm" className="flex-grow">
                    {isDebugging ? <StopCircle className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                    {isDebugging ? 'Stop Debugging' : 'Run and Debug'}
                </Button>
                <Select defaultValue="launch-program">
                    <SelectTrigger className="w-[180px] text-xs">
                        <SelectValue placeholder="Select a configuration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="launch-program">Launch Program</SelectItem>
                        <SelectItem value="attach-process">Attach to Process</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Accordion type="multiple" defaultValue={['variables', 'call-stack', 'breakpoints']} className="w-full">
                <AccordionItem value="variables">
                    <AccordionTrigger className="text-sm font-medium">Variables</AccordionTrigger>
                    <AccordionContent>
                        <div className="pl-2 space-y-2">
                            <p className="text-xs font-semibold">Local</p>
                            <ul className="pl-2 font-mono text-xs space-y-1">
                                {variables.Local.map(v => <li key={v.name}><span className="text-red-400">{v.name}</span>: <span className="text-blue-400">{v.value}</span></li>)}
                            </ul>
                            <p className="text-xs font-semibold pt-2">Global</p>
                             <ul className="pl-2 font-mono text-xs space-y-1">
                                {variables.Global.map(v => <li key={v.name}><span className="text-red-400">{v.name}</span>: <span className="text-blue-400">{v.value}</span></li>)}
                            </ul>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="watch">
                    <AccordionTrigger className="text-sm font-medium">Watch</AccordionTrigger>
                    <AccordionContent>
                        <p className="text-xs text-muted-foreground pl-2">No watch expressions.</p>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="call-stack">
                    <AccordionTrigger className="text-sm font-medium">Call Stack</AccordionTrigger>
                    <AccordionContent>
                         <ul className="pl-2 space-y-1">
                            {callStack.map((c, i) => (
                                <li key={i} className={`text-xs ${c.status === 'active' ? 'font-bold' : ''}`}>
                                    <p>{c.func}</p>
                                    <p className="text-muted-foreground">{c.file}</p>
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="breakpoints">
                    <AccordionTrigger className="text-sm font-medium">Breakpoints</AccordionTrigger>
                    <AccordionContent>
                        <ul className="pl-2 space-y-2">
                          {breakpoints.map((b, i) => (
                              <li key={i} className="flex items-center text-xs space-x-2">
                                  <Checkbox defaultChecked />
                                  <span className="text-red-500">•</span>
                                  <span>{b.file}:{b.line}</span>
                              </li>
                          ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

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
          <div className="flex items-center justify-between border-b border-border px-2 h-[41px]">
              <Menubar className="rounded-none border-b-0 px-2 h-auto">
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
              <div className="pr-4">
                <UserProfile />
              </div>
          </div>
        <div className="flex flex-grow overflow-hidden">
          <ActivityBar />
          <ResizablePanelGroup direction="horizontal" className="h-full w-full">
            <ResizablePanel defaultSize={18} minSize={15} maxSize={30}>
              {activeView === 'files' && <FileExplorer fileSystem={fileSystem} onFileClick={handleOpenFile} />}
              {activeView === 'source-control' && <SourceControlPanel />}
              {activeView === 'run' && <RunAndDebugPanel />}
              {activeView === 'build' && <BuildSystemPanel />}
              {activeView === 'testing' && <TestingPanel />}
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
