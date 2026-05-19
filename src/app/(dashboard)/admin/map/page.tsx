'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Maximize2, Layers, Navigation, Filter } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';

const GISWarRoom = dynamic(() => import('@/components/dashboard/GISWarRoom'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full rounded-xl" />
});

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Municipal War Room</h1>
          <p className="text-muted-foreground text-sm mt-1">
            GIS-based real-time operational command center.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-card border border-border rounded-lg hover:bg-secondary transition-colors" title="Filter Layers">
            <Layers className="w-4 h-4" />
          </button>
          <button className="p-2 bg-card border border-border rounded-lg hover:bg-secondary transition-colors" title="Locate Me">
            <Navigation className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter Views
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 min-h-0 relative"
      >
        <GISWarRoom />
        
        {/* Floating Stats Overlay */}
        <div className="absolute top-4 right-4 z-[1000] space-y-2 w-64 pointer-events-none">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-border p-3 rounded-lg shadow-xl pointer-events-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Active Units</span>
              <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded">LIVE</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Garbage Trucks</span>
                <span className="text-sm font-bold">14 / 18</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[77%]" />
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm font-medium">Sanitation Staff</span>
                <span className="text-sm font-bold">82 / 95</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full w-[86%]" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-border p-3 rounded-lg shadow-xl pointer-events-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Cluster Alerts</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                High density hotspot detected in <span className="font-bold">Ward 7</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
