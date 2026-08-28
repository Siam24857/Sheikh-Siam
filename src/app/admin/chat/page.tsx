"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, User, Clock, Search, MessageSquare } from "lucide-react";
import { toast } from "react-hot-toast";

interface Message {
  _id: string;
  senderName: string;
  senderEmail: string;
  sessionId: string;
  content: string;
  isAdmin: boolean;
  timestamp: string;
}

export default function AdminChat() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [secretInput, setSecretInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const [replyInput, setReplyInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      setIsAuthorized(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, selectedSessionId]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretInput === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      sessionStorage.setItem("admin_auth", secretInput);
      setIsAuthorized(true);
      toast.success("Welcome back, Admin!");
    } else {
      toast.error("Invalid Secret Key");
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/chat/messages");
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim() || !selectedSessionId) return;

    setLoading(true);
    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: "Admin",
          sessionId: selectedSessionId,
          content: replyInput,
          isAdmin: true,
        }),
      });

      if (res.ok) {
        setReplyInput("");
        fetchMessages();
      }
    } catch (error) {
      toast.error("Failed to send reply");
    } finally {
      setLoading(false);
    }
  };

  const users = Array.from(
    new Set(messages.filter((m) => !m.isAdmin).map((m) => m.sessionId)),
  )
    .map((sid) => {
      const userMessages = messages.filter((m) => m.sessionId === sid);
      return {
        sessionId: sid,
        name: userMessages[0]?.senderName || "Unknown User",
        lastMessage: userMessages[userMessages.length - 1].content,
        lastTime: userMessages[userMessages.length - 1].timestamp,
      };
    })
    .sort(
      (a, b) => new Date(b.lastTime).getTime() - new Date(a.lastTime).getTime(),
    );

  const selectedUserMessages = messages.filter(
    (m) => m.sessionId === selectedSessionId,
  );

  if (!isAuthorized) {
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card/50 backdrop-blur-md border-primary/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Admin Messenger Access</CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter your secret key to continue
            </p>
          </CardHeader>
          <div className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Secret Key"
                value={secretInput}
                onChange={(e) => setSecretInput(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Verify Identity
              </Button>
            </form>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-100px)] max-w-6xl mt-12">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold">Admin Chat Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        <Card className="md:col-span-1 flex flex-col bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardHeader className="border-b">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-9" />
            </div>
          </CardHeader>
          <div className="flex-1 overflow-y-auto">
            {users.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No conversations yet.
              </div>
            )}
            {users.map((user) => (
              <div
                key={user.sessionId}
                onClick={() => setSelectedSessionId(user.sessionId)}
                className={`p-4 border-b cursor-pointer transition-colors hover:bg-primary/5 ${selectedSessionId === user.sessionId ? "bg-primary/10" : ""}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm truncate">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(user.lastTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {user.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="md:col-span-2 flex flex-col bg-card/50 backdrop-blur-sm overflow-hidden">
          {selectedSessionId ? (
            <>
              <CardHeader className="border-b p-4 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">
                    {users.find((u) => u.sessionId === selectedSessionId)?.name}
                  </CardTitle>
                  <p className="text-[10px] text-muted-foreground">
                    Session ID: {selectedSessionId.slice(0, 8)}...
                  </p>
                </div>
                <Badge variant="outline">Live</Badge>
              </CardHeader>

              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20"
              >
                {selectedUserMessages.map((msg, i) => (
                  <div
                    key={msg._id || i}
                    className={`flex ${msg.isAdmin ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl text-sm ${msg.isAdmin ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-card text-foreground border rounded-tl-none shadow-sm"}`}
                    >
                      <p>{msg.content}</p>
                      <div className="text-[10px] mt-1 opacity-60 text-right">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={sendReply} className="p-4 border-t flex gap-2">
                <Input
                  placeholder="Type your reply..."
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  className="flex-1"
                />
                <Button disabled={loading || !replyInput.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Reply
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <div className="bg-primary/5 p-4 rounded-full mb-4">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
