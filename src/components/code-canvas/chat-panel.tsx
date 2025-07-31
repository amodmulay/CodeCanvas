
"use client"

import * as React from "react"
import { Sparkles, Send, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  text: string
  sender: "user" | "agent"
}

export function ChatPanel() {
  const [messages, setMessages] = React.useState<Message[]>([
    { id: "1", text: "Hello! I'm your vibe coding agent. How can I help you accelerate your development today?", sender: "agent" },
  ])
  const [input, setInput] = React.useState("")
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (input.trim() === "") return
    const newMessages: Message[] = [...messages, { id: Date.now().toString(), text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    
    // Simulate agent response
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: `I'm processing your request for: "${input}". Let me see what I can do about that.`, sender: "agent"}])
    }, 1000);
  }

  React.useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }
  }, [messages])

  return (
    <div className="h-full w-full bg-card flex flex-col border-l">
      <div className="flex items-center p-2 border-b bg-card flex-shrink-0">
        <Sparkles className="w-5 h-5 mr-2 text-primary" />
        <h3 className="text-sm font-medium">Vibe Coding Agent</h3>
      </div>
      <div className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
            <div ref={scrollAreaRef} className="p-4 space-y-4">
            {messages.map((message) => (
                <div
                key={message.id}
                className={`flex items-start gap-3 ${
                    message.sender === "user" ? "justify-end" : ""
                }`}
                >
                {message.sender === "agent" && (
                    <Avatar className="h-8 w-8 border-2 border-primary">
                    <AvatarFallback>
                        <Sparkles className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                    </Avatar>
                )}
                <div
                    className={`rounded-lg px-3 py-2 text-sm max-w-[80%] ${
                    message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
                {message.sender === "user" && (
                    <Avatar className="h-8 w-8">
                    <AvatarFallback>
                        <User className="h-4 w-4" />
                    </AvatarFallback>
                    </Avatar>
                )}
                </div>
            ))}
            </div>
        </ScrollArea>
      </div>
      <div className="p-2 border-t bg-card flex-shrink-0">
        <div className="relative">
          <Input
            placeholder="Ask your vibe agent..."
            className="pr-10"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={handleSendMessage}
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

    