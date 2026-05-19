"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Truck, Navigation, AlertCircle, Activity, Map, RotateCcw, Info } from "lucide-react";

const mockVehicles = [
  { id: "v1", registrationNo: "MH-01-AB-1234", type: "Compactor", status: "ACTIVE", coverage: 78, lat: 19.0760, lng: 72.8777 },
  { id: "v2", registrationNo: "MH-01-CD-5678", type: "Tipper", status: "IDLE", coverage: 45, lat: 19.0800, lng: 72.8800 },
  { id: "v3", registrationNo: "MH-02-EF-9012", type: "Sweeping", status: "OFFLINE", coverage: 0, lat: 19.0700, lng: 72.8700 },
];

export default function FleetWarRoom() {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
      
      {/* Fleet Sidebar */}
      <div className="col-span-3 flex flex-col gap-4 overflow-y-auto pr-2">
        <div className="bg-card border border-border rounded-2xl p-4">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-500" />
            Live Fleet
          </h2>
          <div className="space-y-3">
            {mockVehicles.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVehicle(v)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  selectedVehicle?.id === v.id 
                    ? "bg-emerald-500/10 border-emerald-500" 
                    : "bg-secondary/30 border-border hover:bg-secondary/50"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-sm">{v.registrationNo}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    v.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500' : 
                    v.status === 'IDLE' ? 'bg-orange-500/10 text-orange-500' : 'bg-slate-500/10 text-slate-500'
                  }`}>
                    {v.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[11px] text-muted-foreground">{v.type}</p>
                  <div className="flex items-center gap-1">
                    <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${v.coverage}%` }} />
                    </div>
                    <span className="text-[10px] font-bold">{v.coverage}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Utilization Card */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Utilization</h3>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold">82%</span>
            <span className="text-xs text-emerald-500 mb-1">+4.2% from yesterday</span>
          </div>
        </div>
      </div>

      {/* Main Map View */}
      <div className="col-span-6 relative bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
          {/* GIS Placeholder */}
          <div className="text-center">
            <Map className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Interactive Fleet GIS Engine Loading...</p>
          </div>
        </div>
        
        {/* Map Overlays */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="bg-background/80 backdrop-blur border border-border p-2 rounded-lg shadow-sm hover:bg-background">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button className="bg-background/80 backdrop-blur border border-border p-2 rounded-lg shadow-sm hover:bg-background">
            <Activity className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Vehicle HUD */}
        {selectedVehicle && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl flex items-center gap-6"
          >
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <Navigation className="w-6 h-6 text-emerald-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold">{selectedVehicle.registrationNo}</h4>
              <p className="text-xs text-muted-foreground">Moving towards Dadar West • 42 km/h</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Distance</p>
                <p className="font-bold">12.4 km</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Fuel (Est)</p>
                <p className="font-bold">8.2 L</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-500/20">
              Live Replay
            </button>
          </motion.div>
        )}
      </div>

      {/* Analytics & Alerts Sidebar */}
      <div className="col-span-3 space-y-6">
        
        {/* Route Intelligence Alerts */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            Operational Alerts
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-orange-500/5 border border-orange-500/10 rounded-xl">
              <p className="text-[11px] font-bold text-orange-600">Route Deviation</p>
              <p className="text-[10px] text-orange-600/80">Vehicle MH-01-CD-5678 is outside Ward 4 boundary.</p>
            </div>
            <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl">
              <p className="text-[11px] font-bold text-rose-600">Idle Warning</p>
              <p className="text-[10px] text-rose-600/80">Compactor 24 stopped for 45 mins at Sector 12.</p>
            </div>
          </div>
        </div>

        {/* AI Efficiency Insight */}
        <div className="bg-emerald-500 rounded-2xl p-4 text-white shadow-lg shadow-emerald-500/20">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">AI Optimizer</span>
          </div>
          <p className="text-xs font-medium leading-relaxed">
            "Based on morning patterns, Route 12 is 18% less efficient today. Recommending shift adjustment for Tipper 04."
          </p>
          <button className="w-full mt-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-xs font-bold transition-all">
            Apply Suggestion
          </button>
        </div>
      </div>
    </div>
  );
}
