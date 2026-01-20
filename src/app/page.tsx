"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface PdfFile {
  id: string;
  fileName: string;
  pages: number;
  text: string;
  uploadedAt: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  pdfs: PdfFile[];
  createdAt: Date;
  updatedAt: Date;
}

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#071222]" />
      
      <div className="stars-container absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${(i * 0.1) % 5}s`,
              opacity: 0.3 + (i % 5) * 0.15,
            }}
          />
        ))}
      </div>
      
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradV" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="30%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="50%" stopColor="rgba(56, 189, 248, 0.6)" />
            <stop offset="70%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
          <linearGradient id="lineGradH" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
            <stop offset="50%" stopColor="rgba(6, 182, 212, 0.4)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
          </linearGradient>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.8)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {[...Array(12)].map((_, i) => (
          <line
            key={`vline-${i}`}
            x1={`${8 + i * 8}%`}
            y1="0"
            x2={`${8 + i * 8}%`}
            y2="100%"
            stroke="url(#lineGradV)"
            strokeWidth="1"
            className="animate-pulse-line"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
        
        {[...Array(6)].map((_, i) => (
          <line
            key={`hline-${i}`}
            x1="0"
            y1={`${20 + i * 15}%`}
            x2="100%"
            y2={`${20 + i * 15}%`}
            stroke="url(#lineGradH)"
            strokeWidth="1"
            className="animate-scan-line"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </svg>
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-80">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full">
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[100px] rounded-[100%] border border-cyan-500/30 animate-ring-pulse" style={{ animationDelay: "0s" }} />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[400px] h-[80px] rounded-[100%] border border-cyan-400/40 animate-ring-pulse" style={{ animationDelay: "0.3s" }} />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[300px] h-[60px] rounded-[100%] border border-sky-400/50 animate-ring-pulse" style={{ animationDelay: "0.6s" }} />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[200px] h-[40px] rounded-[100%] border-2 border-sky-300/60 animate-ring-pulse shadow-[0_0_30px_rgba(56,189,248,0.5)]" style={{ animationDelay: "0.9s" }} />
          </div>
          
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-60 bg-gradient-to-t from-cyan-500/40 via-blue-500/20 to-transparent blur-2xl animate-beam" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-40 bg-gradient-to-t from-sky-400/60 via-cyan-400/30 to-transparent blur-xl animate-beam" style={{ animationDelay: "0.5s" }} />
        </div>
      </div>
      
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float-up"
            style={{
              left: `${10 + (i * 37) % 80}%`,
              bottom: `${(i * 13) % 30}%`,
              animationDelay: `${(i * 0.3) % 8}s`,
              animationDuration: `${4 + (i % 4)}s`,
            }}
          />
        ))}
      </div>
      
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-sky-500/10 rounded-full blur-[90px] animate-pulse-slow" style={{ animationDelay: "4s" }} />
    </div>
  );
}

function RobotIcon({ linkTo }: { linkTo?: string }) {
  const content = (
    <div className="relative cursor-pointer group">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/40 animate-float-gentle group-hover:shadow-cyan-500/60 group-hover:scale-105 transition-all duration-300">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 bg-slate-800 rounded-lg" />
          <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-blink shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-blink shadow-[0_0_10px_rgba(34,211,238,0.8)]" style={{ animationDelay: "0.1s" }} />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-cyan-400/60 rounded-full" />
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full" />
        </div>
      </div>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-3 rounded-[100%] bg-cyan-500/20 blur-sm" />
      <div className="absolute -inset-2 border border-cyan-500/30 rounded-full animate-ring-spin group-hover:border-cyan-400/50" />
    </div>
  );

  if (linkTo) {
    return <Link href={linkTo}>{content}</Link>;
  }
  return content;
}

function PdfIllustration() {
  return (
    <div className="relative w-40 h-40 mx-auto mb-8">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border border-cyan-500/30 animate-ring-pulse" />
        <div className="absolute w-24 h-24 rounded-full border border-sky-400/40 animate-ring-pulse" style={{ animationDelay: "0.5s" }} />
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <RobotIcon />
      </div>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400/60 to-transparent animate-beam" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-cyan-400/60 to-transparent animate-beam" style={{ animationDelay: "0.5s" }} />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-8 h-1 bg-gradient-to-r from-cyan-400/60 to-transparent animate-beam" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-8 h-1 bg-gradient-to-l from-cyan-400/60 to-transparent animate-beam" style={{ animationDelay: "1.5s" }} />
    </div>
  );
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pdfs, setPdfs] = useState<PdfFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const saved = localStorage.getItem("pdf-chat-conversations");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConversations(parsed.map((c: Conversation) => ({
          ...c,
          createdAt: new Date(c.createdAt),
          updatedAt: new Date(c.updatedAt),
          messages: c.messages.map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) })),
          pdfs: c.pdfs.map((p: PdfFile) => ({ ...p, uploadedAt: new Date(p.uploadedAt) }))
        })));
      } catch {
        console.error("Failed to load conversations");
      }
    }
  }, []);

  const saveToStorage = (convs: Conversation[]) => {
    localStorage.setItem("pdf-chat-conversations", JSON.stringify(convs));
  };

  const saveCurrentConversation = (msgs: Message[], pdfList: PdfFile[], convId: string | null) => {
    if (msgs.length === 0 && pdfList.length === 0) return convId;
    
    const id = convId || Date.now().toString();
    const conversation: Conversation = {
      id,
      title: pdfList.length > 0 ? pdfList[0].fileName : msgs[0]?.content.slice(0, 30) + "..." || "New Chat",
      messages: msgs,
      pdfs: pdfList,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setConversations(prev => {
      const existing = prev.findIndex(c => c.id === id);
      let updated;
      if (existing >= 0) {
        updated = [...prev];
        updated[existing] = { ...conversation, createdAt: prev[existing].createdAt };
      } else {
        updated = [conversation, ...prev];
      }
      saveToStorage(updated);
      return updated;
    });
    
    return id;
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type !== "application/pdf") continue;
      
      setUploadProgress(`Processing ${file.name}...`);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload-pdf", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          const newPdf: PdfFile = {
            id: Date.now().toString() + i,
            fileName: data.fileName,
            pages: data.pages,
            text: data.text,
            uploadedAt: new Date()
          };
          
          setPdfs(prev => {
            const newPdfs = [...prev, newPdf];
            if (prev.length === 0 && i === 0) {
              const welcomeMsg: Message = {
                role: "assistant",
                content: `I've loaded "${data.fileName}" (${data.pages} pages). Feel free to upload more PDFs or ask me anything about your documents!`,
                timestamp: new Date()
              };
              setMessages([welcomeMsg]);
              const newId = saveCurrentConversation([welcomeMsg], newPdfs, currentConversationId);
              if (!currentConversationId) setCurrentConversationId(newId);
            } else {
              const newId = saveCurrentConversation(messages, newPdfs, currentConversationId);
              if (!currentConversationId) setCurrentConversationId(newId);
            }
            return newPdfs;
          });
        }
      } catch {
        console.error("Failed to upload PDF");
      }
    }
    
    setIsUploading(false);
    setUploadProgress(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    const newUserMessage: Message = { role: "user", content: userMessage, timestamp: new Date() };
    
    setMessages(prev => {
      const newMsgs = [...prev, newUserMessage];
      return newMsgs;
    });
    setIsLoading(true);

    try {
      const combinedPdfContent = pdfs.map(p => `--- ${p.fileName} ---\n${p.text}`).join("\n\n");
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          pdfContent: combinedPdfContent || null,
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response || data.error || "Something went wrong.",
        timestamp: new Date()
      };
      
      setMessages(prev => {
        const newMsgs = [...prev, assistantMessage];
        const newId = saveCurrentConversation(newMsgs, pdfs, currentConversationId);
        if (!currentConversationId) setCurrentConversationId(newId);
        return newMsgs;
      });
    } catch {
      setMessages(prev => {
        const errorMsg: Message = {
          role: "assistant",
          content: "Failed to get response. Please try again.",
          timestamp: new Date()
        };
        return [...prev, errorMsg];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const removePdf = (id: string) => {
    setPdfs(prev => prev.filter(p => p.id !== id));
  };

  const loadConversation = (conv: Conversation) => {
    setMessages(conv.messages);
    setPdfs(conv.pdfs);
    setCurrentConversationId(conv.id);
    setShowHistory(false);
  };

  const deleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => {
      const updated = prev.filter(c => c.id !== id);
      saveToStorage(updated);
      return updated;
    });
    if (currentConversationId === id) {
      startNewChat();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setPdfs([]);
    setCurrentConversationId(null);
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 flex min-h-screen">
        {showHistory && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in backdrop-blur-sm"
            onClick={() => setShowHistory(false)}
          />
        )}
        
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-slate-900/80 backdrop-blur-xl border-r border-cyan-500/20 shadow-xl shadow-cyan-900/20 transform transition-transform duration-300 ease-out ${showHistory ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} flex flex-col`}>
          <div className="p-4 border-b border-cyan-500/20">
            <Button 
              onClick={startNewChat}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-0.5 border border-cyan-400/30"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Chat
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-2">
            {conversations.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-50 text-cyan-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-sm text-slate-500">No conversations yet</p>
              </div>
            ) : (
              conversations.map((conv, index) => (
                <div
                  key={conv.id}
                  onClick={() => loadConversation(conv)}
                  className={`group p-3 rounded-xl cursor-pointer transition-all duration-300 animate-slide-up ${
                    currentConversationId === conv.id 
                      ? "bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-cyan-500/50 shadow-lg shadow-cyan-500/10" 
                      : "hover:bg-slate-800/50 border border-transparent hover:border-cyan-500/30"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-200 truncate text-sm">{conv.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-cyan-400">
                          {conv.pdfs.length} PDF{conv.pdfs.length !== 1 ? "s" : ""}
                        </span>
                        <span className="text-xs text-slate-600">•</span>
                        <span className="text-xs text-slate-500">
                          {new Date(conv.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => deleteConversation(conv.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-cyan-500/20">
            <Link href="/dashboard">
              <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-300 bg-transparent">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Dashboard
              </Button>
            </Link>
          </div>
        </aside>

        <main className="flex-1 flex flex-col min-h-screen">
          <header className="sticky top-0 z-30 bg-slate-900/70 backdrop-blur-xl border-b border-cyan-500/20">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowHistory(!showHistory)}
                  className="lg:hidden p-2 rounded-xl hover:bg-cyan-500/10 text-cyan-400 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                <div className="flex items-center gap-3">
                  <RobotIcon linkTo="/dashboard" />
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                      AI PDF Assistant
                    </h1>
                    <p className="text-xs text-cyan-500/70">Powered by Advanced AI</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {pdfs.length > 0 && (
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/30">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <span className="text-sm text-cyan-300 font-medium">{pdfs.length} PDF{pdfs.length !== 1 ? "s" : ""} loaded</span>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="flex-1 flex">
            <div className="w-full lg:w-80 p-4 border-r border-cyan-500/10 bg-slate-900/30 hidden lg:block">
              <div 
                className={`relative rounded-2xl border transition-all duration-300 bg-slate-800/50 backdrop-blur-sm overflow-hidden ${
                  isDragging 
                    ? "border-cyan-400 shadow-lg shadow-cyan-500/20" 
                    : "border-cyan-500/30 hover:border-cyan-500/50"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
                <div className="relative p-6 text-center">
                  <div className="text-xs font-semibold text-cyan-400 tracking-widest mb-4">UPLOAD PDFs</div>
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-slate-700/80 to-slate-800/80 border border-cyan-500/30 flex items-center justify-center transition-transform duration-300 ${isDragging ? "scale-110" : ""}`}>
                    <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">Drag & drop PDF files here<br />or click to upload</p>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label htmlFor="pdf-upload">
                    <Button
                      asChild
                      className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/30 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 border border-cyan-400/30"
                      disabled={isUploading}
                    >
                      <span>
                        {isUploading ? (
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Processing...
                          </span>
                        ) : "Browse Files"}
                      </span>
                    </Button>
                  </label>
                </div>
              </div>

              {pdfs.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-cyan-400 tracking-widest mb-3 px-1">UPLOADED FILES</h4>
                  <div className="space-y-2">
                    {pdfs.map((pdf, index) => (
                      <div 
                        key={pdf.id}
                        className="group flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 animate-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-200 truncate">{pdf.fileName}</p>
                          <p className="text-xs text-cyan-500/70">{pdf.pages} pages</p>
                        </div>
                        <button
                          onClick={() => removePdf(pdf.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uploadProgress && (
                <div className="mt-4 p-3 rounded-xl bg-slate-800/50 border border-cyan-500/30 animate-slide-up">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-cyan-400 font-medium truncate">{uploadProgress}</span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-progress" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col">
              {pdfs.length === 0 && messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center p-6">
                  <div className="max-w-lg w-full text-center animate-slide-up">
                    <PdfIllustration />
                    
                    <h2 className="text-2xl font-bold text-white mb-3">Welcome to AI PDF Assistant</h2>
                    <p className="text-slate-400 mb-8">Upload your PDF documents and I&apos;ll help you understand, summarize, and answer questions about them.</p>
                    
                    <div 
                      className={`lg:hidden relative rounded-2xl border p-8 transition-all duration-300 mb-6 bg-slate-800/50 backdrop-blur-sm ${
                        isDragging 
                          ? "border-cyan-400 shadow-lg shadow-cyan-500/20" 
                          : "border-cyan-500/30"
                      }`}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                    >
                      <input
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                        id="pdf-upload-mobile"
                      />
                      <label htmlFor="pdf-upload-mobile" className="cursor-pointer">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-700/80 border border-cyan-500/30 flex items-center justify-center">
                          <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </div>
                        <p className="font-semibold text-slate-200 mb-1">Upload PDF Files</p>
                        <p className="text-sm text-slate-500">Tap to select or drag & drop</p>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                      {[
                        { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "Multi-PDF Support", desc: "Upload multiple documents" },
                        { icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z", title: "Smart Q&A", desc: "Ask anything about your PDFs" },
                        { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", title: "Summaries", desc: "Get key insights instantly" }
                      ].map((feature, index) => (
                        <div 
                          key={index} 
                          className="p-4 rounded-xl bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 animate-slide-up backdrop-blur-sm"
                          style={{ animationDelay: `${200 + index * 100}ms` }}
                        >
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/30 to-cyan-500/30 border border-cyan-500/30 flex items-center justify-center mb-3">
                            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                            </svg>
                          </div>
                          <h3 className="font-semibold text-slate-200 text-sm mb-1">{feature.title}</h3>
                          <p className="text-xs text-slate-500">{feature.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={`flex items-start gap-3 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          message.role === "user" 
                            ? "bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-cyan-500/30" 
                            : "bg-slate-800 border border-cyan-500/30"
                        }`}>
                          {message.role === "user" ? (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          ) : (
                            <div className="w-5 h-5 relative">
                              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                              <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-0.5 bg-cyan-400/60 rounded-full" />
                            </div>
                          )}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-600/90 to-cyan-500/90 text-white border border-cyan-400/30 shadow-lg shadow-cyan-500/20"
                            : "bg-slate-800/90 border border-cyan-500/20 text-slate-200"
                        }`}>
                          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                          <p className={`text-xs mt-2 ${message.role === "user" ? "text-cyan-200/70" : "text-slate-500"}`}>
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-cyan-500/30 flex items-center justify-center">
                          <div className="w-5 h-5 relative">
                            <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                            <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.8)]" style={{ animationDelay: "0.1s" }} />
                          </div>
                        </div>
                        <div className="bg-slate-800/90 border border-cyan-500/20 rounded-2xl px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full typing-dot-1 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                            <div className="w-2 h-2 bg-cyan-400 rounded-full typing-dot-2 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                            <div className="w-2 h-2 bg-cyan-400 rounded-full typing-dot-3 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}

              <div className="sticky bottom-0 p-4 bg-slate-900/80 backdrop-blur-xl border-t border-cyan-500/20">
                <div className="max-w-4xl mx-auto">
                  {pdfs.length > 0 && (
                    <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-thin lg:hidden">
                      {pdfs.map(pdf => (
                        <div key={pdf.id} className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/30 flex-shrink-0">
                          <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-cyan-300 max-w-24 truncate">{pdf.fileName}</span>
                          <button onClick={() => removePdf(pdf.id)} className="text-slate-500 hover:text-red-400 transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-3 items-end">
                    <label htmlFor="pdf-upload-input" className="cursor-pointer lg:hidden">
                      <input
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                        id="pdf-upload-input"
                      />
                      <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-slate-800 border border-cyan-500/30 hover:border-cyan-500/50 hover:bg-slate-700 transition-all duration-300">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </div>
                    </label>
                    
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask anything about the PDFs..."
                      className="flex-1 min-h-[48px] max-h-32 bg-slate-800/80 border-cyan-500/30 text-slate-200 placeholder:text-slate-500 resize-none rounded-xl focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all duration-300"
                      disabled={isLoading}
                    />
                    
                    <Button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="h-12 px-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border border-cyan-400/30 rounded-xl shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
