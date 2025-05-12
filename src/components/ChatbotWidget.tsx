"use client";

import { customerSupportChat } from "@/ai/flows/customer-support-chat-flow";
import type { CustomerSupportChatInput, CustomerSupportChatOutput } from "@/types/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { MessageCircle, Send, Loader2, User, Bot } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollViewportRef.current) {
        // The viewport is the direct child of the ScrollArea's content wrapper
        const viewport = scrollViewportRef.current.children[0] as HTMLDivElement;
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Slight delay to ensure the scroll area is rendered and messages are populated
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);
  
  useEffect(() => {
    if (isOpen && messages.length === 0 && !isLoading) {
      setMessages([
        {
          id: Date.now().toString(),
          role: "bot",
          content: "Hello! I'm ShareBot, your assistant for ShareBites. How can I help you today?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length, isLoading]);


  const handleSend = async () => {
    if (inputValue.trim() === "" || isLoading) return;

    const userMessageContent = inputValue.trim();
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: userMessageContent,
      timestamp: new Date(),
    };
    
    setInputValue("");
    // Update messages state *after* preparing historyForAI to not include current message in history
    const currentMessages = [...messages, newUserMessage];
    setMessages(currentMessages);


    setIsLoading(true);

    const historyForAI: Array<{role: 'user' | 'model', parts: Array<{text: string}>}> = messages // use 'messages' state before adding the new user message
      .map((msg) => ({
        role: msg.role === "bot" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));
      
    try {
      const aiInput: CustomerSupportChatInput = {
        userMessage: userMessageContent,
        history: historyForAI,
      };
      const result: CustomerSupportChatOutput = await customerSupportChat(aiInput);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(), 
        role: "bot",
        content: result.botResponse,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "Sorry, I encountered an error. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="default" 
            size="icon"
            className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-xl hover:scale-105 transition-transform z-50"
            aria-label="Open Chat"
          >
            <MessageCircle className="h-8 w-8" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 shadow-2xl" onOpenAutoFocus={(e) => e.preventDefault()}>
          <SheetHeader className="p-4 pb-2 border-b">
            <SheetTitle className="text-xl flex items-center">
              <Bot className="mr-2 h-6 w-6 text-primary" /> ShareBot Assistance
            </SheetTitle>
            <SheetDescription className="text-sm">
              Ask me anything about ShareBites!
            </SheetDescription>
          </SheetHeader>
          
          <ScrollArea className="flex-grow bg-background/90" viewportRef={scrollViewportRef}>
            <div className="p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-end space-x-2 animate-in fade-in-50 duration-300",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "bot" && (
                  <Avatar className="h-8 w-8 self-start">
                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={18}/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-xl px-3.5 py-2 text-sm shadow-md",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-card text-card-foreground rounded-bl-none border"
                  )}
                >
                  <p style={{ whiteSpace: "pre-wrap" }}>{msg.content}</p>
                  <p className={cn("text-xs mt-1.5", msg.role === "user" ? "text-primary-foreground/80 text-right" : "text-muted-foreground text-left")}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                 {msg.role === "user" && (
                  <Avatar className="h-8 w-8 self-start">
                    <AvatarFallback className="bg-secondary text-secondary-foreground"><User size={18} /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
                <div className="flex items-end space-x-2 justify-start">
                    <Avatar className="h-8 w-8 self-start">
                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={18}/></AvatarFallback>
                    </Avatar>
                    <div className="max-w-[80%] rounded-xl px-4 py-2.5 text-sm shadow-md bg-card text-card-foreground rounded-bl-none border">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                </div>
            )}
            </div>
          </ScrollArea>

          <SheetFooter className="p-3 border-t bg-card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex w-full items-center space-x-2"
            >
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow h-10 text-base"
                disabled={isLoading}
                aria-label="Chat message input"
              />
              <Button type="submit" size="icon" disabled={isLoading || inputValue.trim() === ""} className="h-10 w-10 bg-primary hover:bg-primary/90">
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
