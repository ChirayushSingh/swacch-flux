"use client";

import { motion } from "framer-motion";
import { MapPin, AlertCircle, CheckCircle2, Clock, Map, Navigation } from "lucide-react";
import Link from "next/link";

export default function CitizenDashboard() {
  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <p className="text-sm text-muted-foreground">Good Morning,</p>
        <h1 className="text-2xl font-bold">Rahul Sharma</h1>
      </motion.div>

      {/* Cleanliness Score Widget */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden"
      >
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="flex justify-between items-center relative z-10">
          <div>
            <p className="text-emerald-50 font-medium text-sm">Nearby Cleanliness Score</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-4xl font-bold">84</span>
              <span className="text-emerald-100 pb-1">/ 100</span>
            </div>
            <p className="text-xs text-emerald-100 mt-2 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Ward 12, Andheri East
            </p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center relative">
            <svg className="w-full h-full absolute transform -rotate-90">
              <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/20" />
              <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="163" strokeDashoffset="26" className="text-white" strokeLinecap="round" />
            </svg>
            <span className="text-sm font-bold">Good</span>
          </div>
        </div>
      </motion.div>

      {/* Complaint Stats */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-4 shadow-sm"
        >
          <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center mb-2">
            <Clock className="w-4 h-4" />
          </div>
          <h4 className="text-2xl font-bold">2</h4>
          <p className="text-xs text-muted-foreground font-medium">In Progress</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-4 shadow-sm"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h4 className="text-2xl font-bold">14</h4>
          <p className="text-xs text-muted-foreground font-medium">Resolved</p>
        </motion.div>
      </div>

      {/* Recent Complaints */}
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <h3 className="font-bold text-lg">Recent Complaints</h3>
          <Link href="/citizen/history" className="text-xs font-medium text-emerald-600 dark:text-emerald-400">View All</Link>
        </div>

        {[
          { id: "CMP-8942", title: "Garbage Overflow", status: "In Progress", color: "text-orange-500", bg: "bg-orange-500/10", date: "Today, 10:42 AM", icon: AlertCircle },
          { id: "CMP-8810", title: "Street Littering", status: "Resolved", color: "text-emerald-500", bg: "bg-emerald-500/10", date: "Yesterday", icon: CheckCircle2 },
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (i * 0.1) }}
            className="bg-card border border-border rounded-xl p-4 flex gap-4 items-center shadow-sm"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">{item.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{item.id} • {item.date}</p>
            </div>
            <div className={`text-xs font-medium px-2.5 py-1 rounded-full bg-secondary border border-border`}>
              {item.status}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-secondary/50 border border-border rounded-xl p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Nearby Facilities</h4>
            <p className="text-xs text-muted-foreground">Find public toilets & dustbins</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
