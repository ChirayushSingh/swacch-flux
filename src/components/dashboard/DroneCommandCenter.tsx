"use client";

import { motion } from "framer-motion";
import { Plane, Map, Crosshair, AlertOctagon, Battery, Wind, Radio, Info, Navigation2 } from "lucide-react";

const mockDrones = [
  { id: "d1", code: "SKY-01", status: "FLYING", battery: 84, area: "Dadar West" },
  { id: "d2", code: "SKY-02", status: "CHARGING", battery: 12, area: "Depot A" },
];

export default function DroneCommandCenter() {
  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
      
      {/* Flight Control Sidebar */}
      <div className="col-span-3 flex flex-col gap-4 overflow-y-auto pr-2">
        <div className="bg-card border border-border rounded-2xl p-4">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Plane className="w-5 h-5 text-blue-500" />
            Aerial Fleet
          </h2>
          <div className="space-y-3">
            {mockDrones.map((d) => (
              <div key={d.id} className="p-3 bg-secondary/30 border border-border rounded-xl">
                 <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-sm">{d.code}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      d.status === 'FLYING' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'
                    }`}>
                      {d.status}
                    </span>
                 </div>
                 <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Battery className="w-3 h-3" /> {d.battery}%</span>
                    <span className="flex items-center gap-1"><Wind className="w-3 h-3" /> 12 km/h</span>
                 </div>
                 <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${d.battery}%` }}
                      className={`h-full ${d.battery < 20 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                    />
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Analytics */}
        <div className="bg-card border border-border rounded-2xl p-4 flex-1">
           <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Daily Coverage</h3>
           <div className="text-center py-6">
              <p className="text-4xl font-bold text-blue-500">12.4</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Sq KM Surveyed</p>
           </div>
           <div className="space-y-2 mt-4">
              <div className="flex justify-between text-[10px] font-bold">
                 <span>Ward 4</span>
                 <span>92%</span>
              </div>
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500 w-[92%]" />
              </div>
           </div>
        </div>
      </div>

      {/* Surveillance Map View */}
      <div className="col-span-6 relative bg-card border border-border rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900">
           {/* GIS Drone Map Mockup */}
           <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <Map className="w-64 h-64" />
           </div>
           
           {/* Simulated Drone Path */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <path d="M100,100 L200,150 L150,300 L400,250" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
              <motion.circle 
                animate={{ cx: [100, 200, 150, 400], cy: [100, 150, 300, 250] }}
                transition={{ duration: 10, repeat: Infinity }}
                r="4" fill="#3b82f6" 
              />
           </svg>

           {/* Hotspot Markers */}
           <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-[150px] left-[200px] w-6 h-6 bg-rose-500/30 rounded-full flex items-center justify-center border border-rose-500 animate-pulse"
           >
              <div className="w-2 h-2 bg-rose-500 rounded-full" />
           </motion.div>
        </div>
        
        {/* Map HUD Overlays */}
        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur border border-border p-3 rounded-xl shadow-lg">
           <div className="flex items-center gap-2 text-emerald-500 mb-1">
              <Radio className="w-3 h-3 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Live Link Established</span>
           </div>
           <p className="text-[9px] text-muted-foreground font-mono">LAT: 19.0760 | LNG: 72.8777</p>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex gap-4">
           <div className="flex-1 bg-background/90 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl flex items-center gap-4">
              <div className="p-3 bg-rose-500/10 rounded-xl">
                 <AlertOctagon className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                 <p className="text-xs font-bold text-rose-500 uppercase tracking-tighter">Hotspot Detected</p>
                 <p className="font-bold text-sm">Zone B-4: High Volume Cluster</p>
              </div>
              <button className="ml-auto px-4 py-2 bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-500/20">
                 Dispatch Immediate
              </button>
           </div>
        </div>
      </div>

      {/* Detection Feed & Smart Bins */}
      <div className="col-span-3 space-y-6">
        
        {/* Aerial Detection Feed */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
           <h3 className="font-bold flex items-center gap-2 mb-4">
             <Crosshair className="w-5 h-5 text-blue-400" />
             AI Detection Feed
           </h3>
           <div className="space-y-3">
              {[
                { title: "Garbage Pile", confidence: 98, time: "2m ago" },
                { title: "Illegal Dumping", confidence: 84, time: "12m ago" },
                { title: "Smart Bin Overflow", confidence: 100, time: "45m ago" },
              ].map((f, i) => (
                <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center">
                   <div>
                      <p className="text-[11px] font-bold">{f.title}</p>
                      <p className="text-[9px] text-white/40">{f.time}</p>
                   </div>
                   <span className="text-[10px] font-bold text-blue-400">{f.confidence}%</span>
                </div>
              ))}
           </div>
        </div>

        {/* Smart Bin Status */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
           <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
             <Info className="w-4 h-4 text-emerald-500" />
             Smart Bin Network
           </h3>
           <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
                 <div className="flex-1">
                    <div className="flex justify-between mb-1">
                       <p className="text-[10px] font-bold uppercase">Bin B-104</p>
                       <p className="text-[10px] font-bold text-rose-500">92% FULL</p>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                       <motion.div animate={{ width: "92%" }} className="h-full bg-rose-500" />
                    </div>
                 </div>
              </div>
              <button className="w-full py-3 bg-secondary border border-border rounded-xl text-xs font-bold hover:bg-secondary/80 transition-all flex items-center justify-center gap-2">
                 <Navigation2 className="w-3 h-3" /> Optimizing Collection
              </button>
           </div>
        </div>

      </div>

    </div>
  );
}
