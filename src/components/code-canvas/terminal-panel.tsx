"use client"

import * as React from "react";
import { ChevronUp, Terminal } from "lucide-react";

export function TerminalPanel() {
  return (
    <div className="h-full w-full bg-card flex flex-col border-t">
        <div className="flex items-center p-2 border-b bg-card flex-shrink-0">
            <Terminal className="w-4 h-4 mr-2" />
            <h3 className="text-sm font-medium">TERMINAL</h3>
        </div>
        <div className="flex-grow bg-background p-4 overflow-auto">
            <pre className="font-code text-sm text-muted-foreground">
                <p>Welcome to the terminal!</p>
                <p className="text-green-400">$ npm install</p>
                <p>up to date, audited 15 packages in 1s</p>
                <br />
                <p className="text-green-400">$ npm run dev</p>
                <p>> Ready on http://localhost:3000</p>
                <div className="flex items-center">
                    <span className="text-green-400">$ </span>
                    <span className="inline-block w-2 h-4 ml-1 animate-blink"></span>
                </div>
            </pre>
        </div>
    </div>
  );
}
