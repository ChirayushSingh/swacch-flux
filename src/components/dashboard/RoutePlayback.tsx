"use client";

import { useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Clock, Calendar, Truck } from "lucide-react";
import { Slider } from "@/components/ui/Slider";

export default function RoutePlayback() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
      {/* Playback Header */}
      <div className="p-4 border-b border-border bg-secondary/10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h2 className="font-bold">Historical Playback</h2>
            <p className="text-[11px] text-muted-foreground">Replaying: MH-01-AB-1234 • May 11, 2024</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-border text-xs font-bold hover:bg-secondary">
            Select Date
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-border text-xs font-bold hover:bg-secondary">
            Export
          </button>
        </div>
      </div>

      {/* Main Map View Placeholder */}
      <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 relative">
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="text-center opacity-20">
              <Truck className="w-24 h-24 mx-auto mb-4" />
              <p className="text-xl font-bold">Historical Map Engine</p>
           </div>
        </div>

        {/* Floating Playback Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] bg-background/80 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-6 mb-6">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
            
            <div className="flex-1 px-4">
              <Slider 
                value={[currentTime]} 
                max={100} 
                step={1} 
                onValueChange={(vals: number[]) => setCurrentTime(vals[0])}
              />
              <div className="flex justify-between mt-2 text-[10px] font-bold text-muted-foreground">
                <span>06:00 AM</span>
                <span>02:00 PM</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-lg border border-border">
               <span className="text-[10px] font-bold">SPEED</span>
               <select 
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="bg-transparent text-xs font-bold focus:outline-none"
               >
                 <option value={1}>1x</option>
                 <option value={2}>2x</option>
                 <option value={5}>5x</option>
               </select>
            </div>
          </div>
          
          {/* Playback Stats Bar */}
          <div className="flex justify-around border-t border-border/50 pt-4">
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Current Speed</p>
              <p className="text-sm font-bold">24 km/h</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Stops Made</p>
              <p className="text-sm font-bold">12</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Avg. Deviation</p>
              <p className="text-sm font-bold text-rose-500">142m</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Coverage Score</p>
              <p className="text-sm font-bold text-emerald-500">92%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
