"use client";

import { motion } from "framer-motion";
import { Navigation, Camera, CheckCircle, AlertTriangle, Clock } from "lucide-react";

export default function WorkerDashboard() {
  return (
    <div className="p-4 space-y-6">
      {/* Header Info */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Your Tasks</h1>
          <p className="text-sm text-muted-foreground mt-0.5">3 Pending • Zone B</p>
        </div>
        <div className="bg-orange-500/10 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold border border-orange-500/20">
          On Duty
        </div>
      </div>

      {/* Smart Priority Sorting Alert */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-destructive/20 rounded-xl p-4 flex gap-3 items-start shadow-sm"
      >
        <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-destructive">High Priority Action Required</p>
          <p className="text-xs text-muted-foreground mt-1">
            "Dead Animal" reported at Station Road. SLA breaches in 45 mins. Please attend immediately.
          </p>
        </div>
      </motion.div>

      {/* Task List */}
      <div className="space-y-4">
        {[
          { id: "CMP-9102", type: "Dead Animal", location: "Station Road, Near Gate 2", priority: "High", time: "45m left", status: "assigned" },
          { id: "CMP-9095", type: "Garbage Overflow", location: "Sector 12, Main Market", priority: "Medium", time: "2h left", status: "in-progress" },
        ].map((task, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + (i * 0.1) }}
            className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col"
          >
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start mb-2">
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${
                  task.priority === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-orange-500/10 text-orange-500'
                }`}>
                  {task.priority} Priority
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <Clock className="w-3 h-3" /> {task.time}
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-1">{task.type}</h3>
              <p className="text-sm text-muted-foreground mb-4">{task.location}</p>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button className="flex items-center justify-center gap-2 py-2.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
                  <Navigation className="w-4 h-4" /> Navigate
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20">
                  <Camera className="w-4 h-4" /> Update
                </button>
              </div>
            </div>
            
            {task.status === "in-progress" && (
              <div className="bg-secondary/50 px-4 py-2 border-t border-border flex justify-between items-center text-xs">
                <span className="font-medium text-muted-foreground">Status: In Progress</span>
                <span className="text-emerald-500 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Before Photo Uploaded
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
