
"use client"

import * as React from "react"
import { Sparkles, Send, User, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"


interface Message {
  id: string
  text: string
  sender: "user" | "agent"
}

const models = [
    { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
    { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" },
    { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash" },
]

export function ChatPanel() {
  const [messages, setMessages] = React.useState<Message[]>([
    { id: "1", text: "Hello! I'm your coding agent. I can help you accelerate your development! What can I do for you today?", sender: "agent" },
  ])
  const [input, setInput] = React.useState("")
  const [selectedModel, setSelectedModel] = React.useState(models[0].id)
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
      <div className="flex items-center justify-between p-2 border-b bg-card flex-shrink-0">
        <div className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-primary" />
            <h3 className="text-sm font-medium">PAC Coding Agent</h3>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Settings className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-4">
                <div className="space-y-2">
                    <Label htmlFor="model-select">Agent Model</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger id="model-select">
                            <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                        <SelectContent>
                            {models.map(model => (
                                <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
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
            placeholder="Ask your agent..."
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
