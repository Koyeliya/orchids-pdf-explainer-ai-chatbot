"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Conversation {
  id: string;
  title: string;
  messages: { role: string; content: string; timestamp: string }[];
  pdfs: { id: string; fileName: string; pages: number; uploadedAt: string }[];
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  totalConversations: number;
  totalPdfs: number;
  totalMessages: number;
  totalPages: number;
}

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030a15] via-[#061525] to-[#020810]" />
      
      <div className="absolute top-[10%] left-0 w-full h-[300px] animate-aurora-wave-1">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent blur-[60px] skew-y-[-5deg]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent blur-[80px] skew-y-[-3deg] translate-y-10" />
      </div>
      
      <div className="absolute top-[30%] left-0 w-full h-[250px] animate-aurora-wave-2">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/35 to-transparent blur-[70px] skew-y-[3deg]" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/40 to-cyan-500/20 blur-[90px] skew-y-[5deg] translate-y-5" />
      </div>
      
      <div className="absolute top-[50%] left-0 w-full h-[200px] animate-aurora-wave-3">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent blur-[50px] skew-y-[-2deg]" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/15 via-cyan-400/35 to-blue-400/15 blur-[70px] skew-y-[4deg]" />
      </div>
      
      <div className="absolute top-[15%] left-[10%] w-[500px] h-[400px] rounded-full blur-[80px] animate-aurora-glow-1" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)' }} />
      <div className="absolute top-[40%] right-[15%] w-[450px] h-[350px] rounded-full blur-[70px] animate-aurora-glow-2" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(59,130,246,0.1) 50%, transparent 70%)' }} />
      <div className="absolute bottom-[20%] left-[30%] w-[400px] h-[300px] rounded-full blur-[60px] animate-aurora-glow-3" style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.3) 0%, rgba(45,212,191,0.1) 50%, transparent 70%)' }} />
      
      <div className="absolute top-[5%] right-[20%] w-[300px] h-[300px] rounded-full blur-[50px] animate-aurora-glow-1" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.25) 0%, transparent 70%)', animationDelay: '2s' }} />
      <div className="absolute bottom-[30%] right-[10%] w-[350px] h-[250px] rounded-full blur-[60px] animate-aurora-glow-2" style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.3) 0%, transparent 70%)', animationDelay: '1s' }} />
      
      <div className="stars-container absolute inset-0">
        {[...Array(60)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              left: `${(i * 13 + 7) % 100}%`,
              top: `${(i * 19 + 11) % 100}%`,
              animationDelay: `${(i * 0.12) % 4}s`,
              opacity: 0.3 + (i % 5) * 0.12,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function FloatingRobotGlob({ index }: { index: number }) {
  const positions = [
    { left: "15%", top: "35%" },
    { left: "75%", top: "25%" },
    { left: "85%", top: "55%" },
    { left: "10%", top: "65%" },
  ];
  
  const pos = positions[index % positions.length];
  const delay = index * 1.5;
  
  return (
    <div 
      className="absolute z-5 animate-float-robot"
      style={{ 
        left: pos.left, 
        top: pos.top,
        animationDelay: `${delay}s`
      }}
    >
      <div className="relative">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400/80 to-blue-500/80 flex items-center justify-center shadow-lg shadow-cyan-500/50 backdrop-blur-sm">
          <div className="relative w-5 h-5">
            <div className="absolute inset-0 bg-slate-800/80 rounded-md" />
            <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-blink shadow-[0_0_8px_rgba(34,211,238,1)]" />
            <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-blink shadow-[0_0_8px_rgba(34,211,238,1)]" style={{ animationDelay: "0.1s" }} />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-cyan-400/60 rounded-full" />
          </div>
        </div>
        <div className="absolute -inset-3 rounded-full bg-cyan-400/20 blur-md animate-pulse-slow" />
        <div className="absolute -inset-1 rounded-xl border border-cyan-400/30 animate-ring-spin" style={{ animationDuration: "8s" }} />
      </div>
    </div>
  );
}

function AnimatedLightConnector() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lightBeam1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
            <stop offset="30%" stopColor="rgba(6, 182, 212, 0.6)" />
            <stop offset="50%" stopColor="rgba(34, 211, 238, 0.8)" />
            <stop offset="70%" stopColor="rgba(6, 182, 212, 0.6)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
          </linearGradient>
          <linearGradient id="lightBeam2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <line x1="25%" y1="50%" x2="50%" y2="30%" stroke="url(#lightBeam1)" strokeWidth="2" filter="url(#glow)" className="animate-light-travel-1" />
        <line x1="50%" y1="30%" x2="75%" y2="50%" stroke="url(#lightBeam1)" strokeWidth="2" filter="url(#glow)" className="animate-light-travel-2" />
        <line x1="75%" y1="50%" x2="50%" y2="70%" stroke="url(#lightBeam1)" strokeWidth="2" filter="url(#glow)" className="animate-light-travel-3" />
        <line x1="50%" y1="70%" x2="25%" y2="50%" stroke="url(#lightBeam1)" strokeWidth="2" filter="url(#glow)" className="animate-light-travel-4" />
        
        <circle cx="25%" cy="50%" r="4" fill="rgba(34, 211, 238, 0.8)" filter="url(#glow)" className="animate-pulse-node" />
        <circle cx="50%" cy="30%" r="4" fill="rgba(34, 211, 238, 0.8)" filter="url(#glow)" className="animate-pulse-node" style={{ animationDelay: "0.5s" }} />
        <circle cx="75%" cy="50%" r="4" fill="rgba(34, 211, 238, 0.8)" filter="url(#glow)" className="animate-pulse-node" style={{ animationDelay: "1s" }} />
        <circle cx="50%" cy="70%" r="4" fill="rgba(34, 211, 238, 0.8)" filter="url(#glow)" className="animate-pulse-node" style={{ animationDelay: "1.5s" }} />
      </svg>
      
      {[0, 1, 2].map((i) => (
        <div
          key={`orb-${i}`}
          className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-orbit-light"
          style={{
            left: "50%",
            top: "50%",
            animationDelay: `${i * 2}s`,
            animationDuration: "6s",
          }}
        />
      ))}
    </div>
  );
}

function RobotIcon() {
  return (
    <Link href="/">
      <div className="relative cursor-pointer group">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/40 animate-float-gentle group-hover:shadow-cyan-500/60 group-hover:scale-105 transition-all duration-300">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-slate-800 rounded-lg" />
            <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-blink shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-blink shadow-[0_0_10px_rgba(34,211,238,0.8)]" style={{ animationDelay: "0.1s" }} />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-cyan-400/60 rounded-full" />
          </div>
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-3 rounded-[100%] bg-cyan-500/20 blur-sm" />
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalConversations: 0,
    totalPdfs: 0,
    totalMessages: 0,
    totalPages: 0,
  });
  const [recentActivity, setRecentActivity] = useState<{ type: string; text: string; time: string }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("pdf-chat-conversations");
    if (saved) {
      try {
        const parsed: Conversation[] = JSON.parse(saved);
        setConversations(parsed);

        const totalPdfs = parsed.reduce((acc, c) => acc + c.pdfs.length, 0);
        const totalMessages = parsed.reduce((acc, c) => acc + c.messages.length, 0);
        const totalPages = parsed.reduce(
          (acc, c) => acc + c.pdfs.reduce((pacc, p) => pacc + p.pages, 0),
          0
        );

        setStats({
          totalConversations: parsed.length,
          totalPdfs,
          totalMessages,
          totalPages,
        });

        const activities: { type: string; text: string; time: string }[] = [];
        parsed.slice(0, 5).forEach((conv) => {
          if (conv.pdfs.length > 0) {
            conv.pdfs.forEach((pdf) => {
              activities.push({
                type: "upload",
                text: `Uploaded "${pdf.fileName}"`,
                time: pdf.uploadedAt,
              });
            });
          }
          if (conv.messages.length > 0) {
            activities.push({
              type: "chat",
              text: conv.messages[conv.messages.length - 1].content.slice(0, 50) + "...",
              time: conv.updatedAt,
            });
          }
        });

        activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        setRecentActivity(activities.slice(0, 8));
      } catch {
        console.error("Failed to load dashboard data");
      }
    }
  }, []);

  const clearAllData = () => {
    localStorage.removeItem("pdf-chat-conversations");
    setConversations([]);
    setStats({ totalConversations: 0, totalPdfs: 0, totalMessages: 0, totalPages: 0 });
    setRecentActivity([]);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <AnimatedLightConnector />
      
      {[0, 1, 2, 3].map((i) => (
        <FloatingRobotGlob key={i} index={i} />
      ))}
      
      <div className="relative z-10">
        <header className="sticky top-0 z-30 bg-slate-900/70 backdrop-blur-xl border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <RobotIcon />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-xs text-cyan-500/70">AI PDF Assistant</p>
                </div>
              </div>
            </div>

            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 border border-cyan-400/30">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                New Chat
              </Button>
            </Link>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 relative">
            {[
              { label: "Total Chats", value: stats.totalConversations, icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
              { label: "PDFs Uploaded", value: stats.totalPdfs, icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
              { label: "Messages", value: stats.totalMessages, icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" },
              { label: "Pages Processed", value: stats.totalPages, icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/30 to-cyan-500/30 border border-cyan-500/30 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
            
            <div className="absolute top-1/2 left-0 right-0 h-px hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-pulse-slow" />
              <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.6)]" style={{ animationDelay: "0.3s" }} />
              <div className="absolute left-3/4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.6)]" style={{ animationDelay: "0.6s" }} />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 overflow-hidden animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="p-5 border-b border-cyan-500/20 flex items-center justify-between">
                <h2 className="font-semibold text-slate-200 flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recent Conversations
                </h2>
                {conversations.length > 0 && (
                  <button
                    onClick={clearAllData}
                    className="text-sm text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 px-3 py-1.5 rounded-lg transition-all duration-200"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {conversations.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-700/50 border border-cyan-500/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-cyan-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-300 mb-2">No conversations yet</h3>
                  <p className="text-sm text-slate-500 mb-4">Start by uploading a PDF and asking questions</p>
                  <Link href="/">
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/30">
                      Start Chatting
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-cyan-500/10">
                  {conversations.slice(0, 5).map((conv, index) => (
                    <Link key={conv.id} href="/">
                      <div
                        className="p-4 hover:bg-cyan-500/5 transition-all duration-200 cursor-pointer"
                        style={{ animationDelay: `${300 + index * 50}ms` }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-700/50 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-200 truncate">{conv.title}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                              <span className="text-cyan-400">{conv.pdfs.length} PDF{conv.pdfs.length !== 1 ? "s" : ""}</span>
                              <span>•</span>
                              <span>{conv.messages.length} messages</span>
                              <span>•</span>
                              <span>{formatDate(conv.updatedAt)}</span>
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 overflow-hidden animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="p-5 border-b border-cyan-500/20">
                <h2 className="font-semibold text-slate-200 flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Recent Activity
                </h2>
              </div>

              {recentActivity.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-700/50 border border-cyan-500/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-cyan-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-500">No activity yet</p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 animate-slide-up"
                      style={{ animationDelay: `${400 + index * 50}ms` }}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activity.type === "upload" 
                          ? "bg-emerald-500/20 border border-emerald-500/30" 
                          : "bg-cyan-500/20 border border-cyan-500/30"
                      }`}>
                        {activity.type === "upload" ? (
                          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-300 truncate">{activity.text}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{formatDate(activity.time)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-600/90 to-cyan-500/90 rounded-2xl p-6 sm:p-8 text-white shadow-xl shadow-cyan-500/20 border border-cyan-400/30 animate-slide-up relative overflow-hidden" style={{ animationDelay: "400ms" }}>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-300/10 rounded-full blur-2xl" />
            </div>
            
            <div className="relative flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center animate-float-gentle">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold mb-2">Ready to analyze more documents?</h3>
                <p className="text-cyan-100 text-sm">Upload your PDFs and get instant insights, summaries, and answers to your questions.</p>
              </div>
              <Link href="/">
                <Button className="bg-white text-blue-600 hover:bg-cyan-50 shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload PDFs
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
