"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, User, Bell } from "lucide-react";

export default function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-secondary/30 flex justify-center">
      {/* Mobile App Container */}
      <div className="w-full max-w-md bg-background min-h-screen relative shadow-2xl overflow-hidden flex flex-col border-x border-border">
        
        {/* Top App Bar */}
        <header className="h-14 flex items-center justify-between px-4 sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="font-bold text-lg text-primary tracking-tight">Swacch Flux</div>
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border border-background"></span>
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-20">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full h-16 bg-background border-t border-border flex justify-around items-center px-2 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <Link href="/citizen" className={`flex flex-col items-center gap-1 w-16 p-1 ${pathname === '/citizen' ? 'text-emerald-500' : 'text-muted-foreground'}`}>
            <Home className={`w-6 h-6 ${pathname === '/citizen' ? 'fill-emerald-500/20' : ''}`} />
            <span className="text-[10px] font-medium">Home</span>
          </Link>
          
          <div className="relative -top-5">
            <Link href="/citizen/raise" className="flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-500/40 hover:bg-emerald-600 transition-all active:scale-95">
              <PlusCircle className="w-8 h-8" />
            </Link>
          </div>

          <Link href="/citizen/profile" className={`flex flex-col items-center gap-1 w-16 p-1 ${pathname === '/citizen/profile' ? 'text-emerald-500' : 'text-muted-foreground'}`}>
            <User className={`w-6 h-6 ${pathname === '/citizen/profile' ? 'fill-emerald-500/20' : ''}`} />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
