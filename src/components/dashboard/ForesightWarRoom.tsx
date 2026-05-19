"use client";

import { motion } from "framer-motion";
import { TrendingUp, AlertCircle, Truck, Package, Wrench, BarChart, Calendar, ChevronRight } from "lucide-react";

export default function ForesightWarRoom() {
  return (
    <div className="grid grid-cols-12 gap-8 h-[calc(100vh-120px)] overflow-y-auto pr-2">
      
      {/* Header: Surge Warnings */}
      <div className="col-span-12 bg-rose-500 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-rose-500/20">
         <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold">Operational Foresight Center</h1>
            </div>
            
            <div className="flex gap-12">
               <div>
                  <p className="text-rose-100 text-xs font-bold uppercase tracking-wider mb-1">Predicted Surge</p>
                  <p className="text-4xl font-bold">Oct 24 - Oct 31</p>
                  <p className="text-xs text-rose-100 mt-2 font-medium">Diwali Peak: Expected +42% Volume</p>
               </div>
               <div className="w-px h-16 bg-white/20" />
               <div>
                  <p className="text-rose-100 text-xs font-bold uppercase tracking-wider mb-1">Resource Gap</p>
                  <p className="text-4xl font-bold">12 Vehicles</p>
                  <p className="text-xs text-rose-100 mt-2 font-medium">Recommendation: Deploy Standby Fleet</p>
               </div>
            </div>
         </div>
         {/* Abstract BG */}
         <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Main Analytics: Volume Prediction vs Fleet Health */}
      <div className="col-span-8 grid grid-cols-2 gap-6">
        
        {/* Waste Volume Forecast Chart */}
        <div className="col-span-2 bg-card border border-border rounded-3xl p-6 shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-rose-500" />
                7-Day Volume Forecast (MT)
              </h3>
              <div className="flex gap-4">
                 <span className="flex items-center gap-1.5 text-[10px] font-bold text-rose-500">
                    <div className="w-2 h-2 rounded-full bg-rose-500" /> Predicted
                 </span>
                 <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-slate-400" /> Historical
                 </span>
              </div>
           </div>
           <div className="h-64 flex items-end gap-6 px-4">
              {[40, 45, 50, 85, 95, 70, 60].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative group">
                     <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h * 0.8}%` }}
                        className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg" 
                     />
                     <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        className="absolute bottom-0 w-full bg-rose-500/20 rounded-t-lg border-x-2 border-t-2 border-rose-500/40 border-dashed" 
                     />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Fleet Reliability Scorecard */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
           <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
             <Truck className="w-4 h-4 text-emerald-500" />
             Fleet Reliability
           </h3>
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <span className="text-xs text-muted-foreground">Uptime Index</span>
                 <span className="text-xs font-bold text-emerald-500">94.2%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 w-[94.2%]" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                 <div className="p-3 bg-secondary/30 rounded-2xl">
                    <p className="text-xs font-bold text-muted-foreground">Active</p>
                    <p className="text-xl font-bold">42</p>
                 </div>
                 <div className="p-3 bg-secondary/30 rounded-2xl">
                    <p className="text-xs font-bold text-rose-500">Risk</p>
                    <p className="text-xl font-bold">5</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Inventory Critical Alerts */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
           <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
             <Package className="w-4 h-4 text-orange-500" />
             Parts Inventory
           </h3>
           <div className="space-y-3">
              {[
                { part: "Hydraulic Oil", qty: "2L", status: "CRITICAL" },
                { part: "Air Filters", qty: "12", status: "LOW" },
                { part: "Brake Pads", qty: "4 Sets", status: "LOW" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-secondary/20">
                   <span className="text-xs font-bold">{item.part}</span>
                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                     item.status === 'CRITICAL' ? 'bg-rose-500/10 text-rose-500' : 'bg-orange-500/10 text-orange-500'
                   }`}>
                     {item.qty} {item.status}
                   </span>
                </div>
              ))}
           </div>
        </div>

      </div>

      {/* Fleet Maintenance HUD */}
      <div className="col-span-4 space-y-6">
        
        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
           <h3 className="font-bold flex items-center gap-2 mb-6">
             <Wrench className="w-5 h-5 text-orange-500" />
             Predictive Service Feed
           </h3>
           <div className="space-y-4">
              {[
                { vehicle: "Compactor 24", risk: 0.88, due: "2 Days", type: "Hydraulics" },
                { vehicle: "Tipper 08", risk: 0.74, due: "5 Days", type: "Engine Check" },
                { vehicle: "Sweeping 03", risk: 0.65, due: "Next Week", type: "Brakes" },
              ].map((v, i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl group cursor-pointer hover:bg-white/10 transition-all">
                   <div className="flex justify-between items-start mb-2">
                      <p className="text-xs font-bold">{v.vehicle}</p>
                      <span className="text-[10px] font-bold text-orange-400">{Math.round(v.risk * 100)}% RISK</span>
                   </div>
                   <p className="text-[10px] text-white/40 mb-3">Predicted Issue: {v.type}</p>
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-white/60">Target Date: {v.due}</span>
                      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-orange-400 transition-colors" />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Maintenance Lifecycle */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
           <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
             <Calendar className="w-4 h-4 text-blue-500" />
             Scheduled Jobs
           </h3>
           <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
                 <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <BarChart className="w-4 h-4 text-blue-500" />
                 </div>
                 <div className="flex-1">
                    <p className="text-xs font-bold">Oil Change (5 Vehicles)</p>
                    <p className="text-[10px] text-muted-foreground">Today • Mechanic Shinde</p>
                 </div>
              </div>
              <button className="w-full py-3 border border-border rounded-xl text-xs font-bold hover:bg-secondary transition-all">
                 View Maintenance Schedule
              </button>
           </div>
        </div>

        {/* Foresight Report Export */}
        <button className="w-full py-4 bg-foreground text-background font-bold rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-lg shadow-black/10">
          <TrendingUp className="w-5 h-5" />
          Generate Capacity Plan
        </button>
      </div>

    </div>
  );
}
