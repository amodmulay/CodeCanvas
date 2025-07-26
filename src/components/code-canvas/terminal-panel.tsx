
"use client"

import * as React from "react";
import { Terminal } from "lucide-react";
import { useImperativeHandle } from "react";

export interface TerminalHandle {
    executeCommand: (command: string) => void;
}

const TerminalPanel = React.forwardRef<TerminalHandle, {}>((props, ref) => {
    const [lines, setLines] = React.useState<React.ReactNode[]>([
        <p key="welcome">Welcome to the terminal!</p>,
    ]);
    const [input, setInput] = React.useState("");
    const endOfTerminalRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        endOfTerminalRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [lines]);

    const addLines = async (newLines: React.ReactNode[]) => {
        for (const line of newLines) {
            setLines(prev => [...prev, line]);
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    }

    const handleCommand = async (command: string) => {
        const newLines = [...lines, <p key={lines.length}><span className="text-green-400">$ </span>{command}</p>];
        setLines(newLines);
        const [cmd, ...args] = command.trim().split(" ");
        
        let output: React.ReactNode | React.ReactNode[] | null = null;

        switch (cmd) {
            case "help":
                output = <p key={Date.now()}>Available commands: `help`, `ls`, `git status`, `npm install`, `npm run dev`, `clear`</p>;
                break;
            case "ls":
                output = <p key={Date.now()} className="text-blue-300">src  public  package.json  README.md</p>;
                break;
            case "git":
                if (args[0] === "status") {
                    output = (
                        <div key={Date.now()}>
                            <p>On branch main</p>
                            <p>Your branch is up to date with 'origin/main'.</p>
                            <br/>
                            <p>nothing to commit, working tree clean</p>
                        </div>
                    );
                } else {
                    output = <p key={Date.now()}>git: command not found: {args.join(" ")}</p>;
                }
                break;
            case "npm":
                if (args[0] === "install") {
                    output = <p key={Date.now()}>up to date, audited 15 packages in 1s</p>
                } else if (args[0] === "run" && args[1] === "dev") {
                    await addLines([
                        <p key={Date.now() + 1}>VITE v4.4.9  ready in 780 ms</p>,
                        <p key={Date.now() + 2}>➜  Local:   <a href="#" className="text-cyan-400">http://localhost:3000/</a></p>,
                        <p key={Date.now() + 3}>➜  Network: use --host to expose</p>,
                        <p key={Date.now() + 4}>➜  press h to show help</p>,
                    ]);
                    return;
                } else {
                    output = <p key={Date.now()}>npm: command not found: {args.join(" ")}</p>;
                }
                break;
            case "clear":
                setLines([]);
                return;
            case "":
                break;
            default:
                output = <p key={Date.now()}>command not found: {command}</p>;
        }
        
        if (output) {
            setLines(prev => [...prev, output].flat());
        }
    };

    useImperativeHandle(ref, () => ({
        executeCommand: (command: string) => {
            handleCommand(command);
        }
    }));

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommand(input);
            setInput("");
        }
    };

    return (
        <div className="h-full w-full bg-card flex flex-col border-t">
            <div className="flex items-center p-2 border-b bg-card flex-shrink-0">
                <Terminal className="w-4 h-4 mr-2" />
                <h3 className="text-sm font-medium">TERMINAL</h3>
            </div>
            <div className="flex-grow bg-background p-4 overflow-auto" onClick={() => inputRef.current?.focus()}>
                <pre className="font-code text-sm text-muted-foreground">
                    {lines}
                    <div className="flex items-center">
                        <span className="text-green-400">$ </span>
                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="bg-transparent border-none text-muted-foreground focus:ring-0 outline-none w-full ml-2"
                          autoFocus
                        />
                    </div>
                    <div ref={endOfTerminalRef} />
                </pre>
            </div>
        </div>
    );
});

TerminalPanel.displayName = "TerminalPanel";
export { TerminalPanel };
