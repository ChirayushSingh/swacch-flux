"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, MapPin, Activity } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Premium Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight">Swacch Flux</span>
        </div>
        <div className="flex gap-4">
          <Link
            href="/citizen"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Citizen Portal
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
          >
            Admin Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 z-10 w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium mb-8 border border-border"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          AI-Powered SWM Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight"
        >
          Smart Municipal Operations <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
            For Next-Gen Cities
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
        >
          Digitize the complete complaint lifecycle from citizen reporting to 
          worker resolution with real-time analytics and predictive AI insights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Link
            href="/citizen"
            className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <MapPin className="w-5 h-5" />
            Report an Issue
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-full font-medium hover:bg-secondary/80 transition-all border border-border"
          >
            <ShieldCheck className="w-5 h-5" />
            Command Center
          </Link>
        </motion.div>
      </main>

      {/* Mock dashboard preview or stats could go here */}
      <div className="h-24" />
    </div>
  );
}
