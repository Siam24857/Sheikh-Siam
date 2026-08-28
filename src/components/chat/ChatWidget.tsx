"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

interface Message {
  _id?: string;
  senderName: string;
  sessionId: string;
  content: string;
  isAdmin: boolean;
  timestamp: string;
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const [user, setUser] = useState<{ name: string; sessionId: string } | null>(
    null,
  );
  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus logic
  useEffect(() => {
    if (user && isOpen && messageInputRef.current) {
      setTimeout(() => {
        messageInputRef.current?.focus();
      }, 100);
    }
  }, [user, isOpen]);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("chat_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      // If it's a legacy user object without sessionId, clear it
      if (!parsed.sessionId) {
        localStorage.removeItem("chat_user");
        setUser(null);
      } else {
        setUser(parsed);
      }
    }
  }, []);

  // Fetch messages if user exists
  useEffect(() => {
    if (user && isOpen) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [user, isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (nameInput && nameInput.length < 2) {
      setNameError("Name must be at least 2 characters");
    } else {
      setNameError("");
    }
  }, [nameInput]);

  const fetchMessages = async () => {
    if (!user?.sessionId) return;
    try {
      const res = await fetch(
        `/api/chat/messages?sessionId=${encodeURIComponent(user.sessionId)}`,
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    setNameTouched(true);

    if (!nameInput || nameError) {
      toast.error("Please provide valid information");
      return;
    }

    const sessionId = crypto.randomUUID();
    const newUser = { name: nameInput, sessionId };
    localStorage.setItem("chat_user", JSON.stringify(newUser));
    setUser(newUser);
    toast.success(`Welcome, ${nameInput}!`);
    setTimeout(() => {
      messageInputRef.current?.focus();
    }, 300);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !user) return;

    setLoading(true);
    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: user.name,
          sessionId: user.sessionId,
          content: messageInput,
        }),
      });

      if (res.ok) {
        setMessageInput("");
        fetchMessages();
      }
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed z-50 flex flex-col items-end transition-all duration-300 ${isOpen ? "inset-0 sm:inset-auto sm:bottom-6 sm:right-6" : "bottom-6 right-6"}`}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full h-full sm:h-auto sm:w-auto"
          >
            <Card className="w-full h-full sm:w-96 sm:h-[500px] flex flex-col shadow-2xl border-primary/20 bg-card/95 backdrop-blur-md overflow-hidden rounded-none sm:rounded-2xl">
              <div className="p-4 sm:p-4 bg-primary text-primary-foreground flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-semibold text-lg sm:text-base">
                    Live Chat
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 sm:h-8 sm:w-8 text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6 sm:h-5 sm:w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-hidden">
                {!user ? (
                  <div className="p-6 h-full flex flex-col justify-center gap-4">
                    <div className="text-center mb-4">
                      <h2 className="text-lg font-bold">Get Started</h2>
                      <p className="text-sm text-muted-foreground">
                        Introduce yourself to start messaging.
                      </p>
                    </div>
                    <form onSubmit={handleOnboarding} className="space-y-4">
                      <div className="space-y-1">
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Your Name"
                            className={`pl-9 ${nameError && nameTouched ? "border-destructive focus-visible:ring-destructive" : ""}`}
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            onBlur={() => setNameTouched(true)}
                          />
                        </div>
                        {nameError && nameTouched && (
                          <p className="text-[10px] text-destructive ml-1">
                            {nameError}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={!nameInput || !!nameError}
                      >
                        Start Chatting
                      </Button>
                    </form>
                  </div>
                ) : (
                  <div className="h-full flex flex-col p-4">
                    <div
                      ref={scrollRef}
                      className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar"
                    >
                      {messages.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                          <p>No messages yet.</p>
                          <p className="text-xs">
                            Send a message to start reality.
                          </p>
                        </div>
                      )}
                      {messages.map((msg, i) => (
                        <div
                          key={msg._id || i}
                          className={`flex ${msg.isAdmin ? "justify-start" : "justify-end"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isAdmin ? "bg-muted text-foreground rounded-tl-none" : "bg-primary text-primary-foreground rounded-tr-none shadow-md"}`}
                          >
                            {msg.content}
                            <div
                              className={`text-[10px] mt-1 opacity-60 ${msg.isAdmin ? "text-left" : "text-right"}`}
                            >
                              {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <form
                      onSubmit={sendMessage}
                      className="mt-4 flex gap-2 border-t pt-4"
                    >
                      <Input
                        ref={messageInputRef}
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        size="icon"
                        disabled={loading || !messageInput.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg border border-primary/30 hover:bg-primary/80 hover:shadow-primary/40 transition-all duration-300 relative"
      >
        <svg className="absolute inset-0 w-0 h-0">
          <defs>
            <linearGradient
              id="chat-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle
                className="h-6 w-6"
                style={{ stroke: "url(#chat-gradient)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
