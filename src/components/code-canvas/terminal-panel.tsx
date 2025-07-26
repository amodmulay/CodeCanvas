
"use client"

import * as React from "react";
import { Terminal } from "lucide-react";

export function TerminalPanel() {
  const [lines, setLines] = React.useState<React.ReactNode[]>([
    <p key="welcome">Welcome to the terminal!</p>,
    <p key="npm-install" className="text-green-400">$ npm install</p>,
    <p key="npm-install-output">up to date, audited 15 packages in 1s</p>,
    <p key="br1"><br /></p>,
    <p key="npm-dev" className="text-green-400">$ npm run dev</p>,
    <p key="npm-dev-output">> Ready on http://localhost:3000</p>,
  ]);
  const [input, setInput] = React.useState("");
  const endOfTerminalRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [lines]);

  const handleCommand = (command: string) => {
    const newLines = [...lines, <p key={lines.length}><span className="text-green-400">$ </span>{command}</p>];
    const [cmd, ...args] = command.trim().split(" ");
    
    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = <p key={lines.length + 1}>Available commands: `help`, `ls`, `git status`, `npm install`, `clear`</p>;
        break;
      case "ls":
        output = <p key={lines.length + 1} className="text-blue-300">src  public  package.json  README.md</p>;
        break;
      case "git":
        if (args[0] === "status") {
            output = (
                <div key={lines.length + 1}>
                    <p>On branch main</p>
                    <p>Your branch is up to date with 'origin/main'.</p>
                    <br/>
                    <p>nothing to commit, working tree clean</p>
                </div>
            );
        } else {
            output = <p key={lines.length + 1}>git: command not found: {args.join(" ")}</p>;
        }
        break;
      case "npm":
        if (args[0] === "install") {
            output = <p key={lines.length + 1}>up to date, audited 15 packages in 1s</p>
        } else {
            output = <p key={lines.length + 1}>npm: command not found: {args.join(" ")}</p>;
        }
        break;
      case "clear":
        setLines([]);
        return;
      case "":
        break;
      default:
        output = <p key={lines.length + 1}>command not found: {command}</p>;
    }
    
    if (output) {
      setLines([...newLines, output]);
    } else {
      setLines(newLines);
    }
  };

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
        <div className="flex-grow bg-background p-4 overflow-auto" onClick={() => endOfTerminalRef.current?.querySelector('input')?.focus()}>
            <pre className="font-code text-sm text-muted-foreground">
                {lines}
                <div className="flex items-center">
                    <span className="text-green-400">$ </span>
                    <input
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
}
