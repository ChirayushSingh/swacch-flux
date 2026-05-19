"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Map, User, Bell } from "lucide-react";

export default function WorkerLayout({
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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <span className="text-xs font-bold text-orange-500">WK</span>
            </div>
            <div className="font-bold text-sm tracking-tight">Worker Portal</div>
          </div>
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary">
            <Bell className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-16">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full h-16 bg-background border-t border-border flex justify-around items-center px-2 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <Link href="/worker" className={`flex flex-col items-center gap-1 w-16 p-1 ${pathname === '/worker' ? 'text-orange-500' : 'text-muted-foreground'}`}>
            <ClipboardList className={`w-6 h-6 ${pathname === '/worker' ? 'fill-orange-500/20' : ''}`} />
            <span className="text-[10px] font-medium">Tasks</span>
          </Link>
          
          <Link href="/worker/map" className={`flex flex-col items-center gap-1 w-16 p-1 ${pathname === '/worker/map' ? 'text-orange-500' : 'text-muted-foreground'}`}>
            <Map className={`w-6 h-6 ${pathname === '/worker/map' ? 'fill-orange-500/20' : ''}`} />
            <span className="text-[10px] font-medium">Map</span>
          </Link>

          <Link href="/worker/profile" className={`flex flex-col items-center gap-1 w-16 p-1 ${pathname === '/worker/profile' ? 'text-orange-500' : 'text-muted-foreground'}`}>
            <User className={`w-6 h-6 ${pathname === '/worker/profile' ? 'fill-orange-500/20' : ''}`} />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
