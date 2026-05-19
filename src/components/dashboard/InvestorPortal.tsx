"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Globe, Users, Download, ExternalLink, ArrowUpRight, TrendingUp } from "lucide-react";

export default function InvestorPortal() {
  return (
    <div className="grid grid-cols-12 gap-8 h-[calc(100vh-120px)] overflow-y-auto pr-2">
      
      {/* Institutional Header */}
      <div className="col-span-12 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
         <div className="relative z-10 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Institutional Transparency Portal</span>
              </div>
              <h1 className="text-4xl font-bold mb-2">BMC Green Bond Series II</h1>
              <p className="text-white/40 text-sm max-w-lg">Monitoring real-time ESG performance and capital utilization for municipal sustainability projects.</p>
            </div>
            
            <div className="flex gap-4">
               <button className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-sm font-bold transition-all flex items-center gap-2 border border-white/10">
                  <Download className="w-4 h-4" /> Download Prospectus
               </button>
               <button className="px-6 py-3 bg-emerald-500 text-white rounded-2xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                  <ExternalLink className="w-4 h-4" /> Verify on Blockchain
               </button>
            </div>
         </div>
         
         {/* Portfolio Performance HUD */}
         <div className="grid grid-cols-4 gap-8 mt-12 relative z-10 border-t border-white/10 pt-8">
            {[
              { label: "Net Carbon Offset", value: "420.5 Tons", sub: "Annual Target: 500T", color: "text-emerald-400" },
              { label: "Capital Deployed", value: "₹4.2 Cr", sub: "84% Utilization", color: "text-blue-400" },
              { label: "Social Participation", value: "84,200", sub: "+12,000 Active Citizens", color: "text-indigo-400" },
              { label: "Governance Score", value: "92/100", sub: "SLA Compliance: 94%", color: "text-emerald-400" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-white/30 mt-1 font-medium">{stat.sub}</p>
              </div>
            ))}
         </div>

         {/* Abstract Art */}
         <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      </div>

      {/* ESG Real-time Verification */}
      <div className="col-span-8 bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col">
         <div className="flex justify-between items-center mb-10">
            <h3 className="font-bold flex items-center gap-2">
               <BarChart3 className="w-5 h-5 text-emerald-500" />
               Impact Performance Matrix
            </h3>
            <div className="flex gap-2">
               <button className="px-3 py-1 bg-secondary/50 rounded-lg text-[10px] font-bold border border-border">Carbon</button>
               <button className="px-3 py-1 bg-secondary/50 rounded-lg text-[10px] font-bold border border-border">Social</button>
               <button className="px-3 py-1 bg-secondary/50 rounded-lg text-[10px] font-bold border border-border">Governance</button>
            </div>
         </div>
         
         <div className="flex-1 grid grid-cols-2 gap-12">
            {/* Chart Simulation */}
            <div className="space-y-8">
               {[
                 { label: "Waste Diversion Index", val: 82, color: "bg-emerald-500" },
                 { label: "Community Inclusivity", val: 65, color: "bg-blue-500" },
                 { label: "Operational Transparency", val: 94, color: "bg-emerald-400" },
               ].map((metric, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between items-end">
                       <p className="text-xs font-bold">{metric.label}</p>
                       <p className="text-sm font-bold">{metric.val}%</p>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.val}%` }}
                        className={`h-full ${metric.color} rounded-full`} 
                       />
                    </div>
                 </div>
               ))}
            </div>

            <div className="relative bg-secondary/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
               <Globe className="w-12 h-12 text-emerald-500/20 mb-4" />
               <p className="text-sm font-bold mb-2">Decentralized Audit Trail</p>
               <p className="text-[10px] text-muted-foreground leading-relaxed">
                  All field operational data is cryptographically hashed and available for public audit.
               </p>
               <button className="mt-6 text-[10px] font-bold text-emerald-500 flex items-center gap-1 hover:underline">
                  View Public Ledger <ArrowUpRight className="w-3 h-3" />
               </button>
            </div>
         </div>
      </div>

      {/* Document & Compliance Center */}
      <div className="col-span-4 space-y-6">
        
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
           <h3 className="font-bold text-sm mb-6 flex items-center gap-2">
             <Download className="w-4 h-4 text-emerald-500" />
             Certified ESG Reports
           </h3>
           <div className="space-y-4">
              {[
                { title: "Q1 Sustainability Audit", date: "April 2024", size: "2.4 MB" },
                { title: "Green Bond Utilization", date: "Jan 2024", size: "1.8 MB" },
                { title: "Annual Impact Statement", date: "Dec 2023", size: "4.2 MB" },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/20 border border-border/50 group cursor-pointer hover:border-emerald-500/50 transition-all">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                         <Globe className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold">{doc.title}</p>
                        <p className="text-[9px] text-muted-foreground">{doc.date}</p>
                      </div>
                   </div>
                   <Download className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-500" />
                </div>
              ))}
           </div>
        </div>

        {/* Investor Sentiment */}
        <div className="bg-emerald-500 rounded-3xl p-6 text-white shadow-lg shadow-emerald-500/20">
           <div className="flex items-center gap-2 mb-4">
             <TrendingUp className="w-4 h-4" />
             <span className="text-[10px] font-bold uppercase tracking-widest">Market Sentiment</span>
           </div>
           <p className="text-xs font-medium leading-relaxed mb-6">
             "BMC Sustainability Series II is currently outperforming local benchmarks by 12% in operational transparency."
           </p>
           <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-emerald-500 bg-emerald-400" />)}
              </div>
              <span className="text-[9px] font-bold">Joined by 42+ Institutional Investors</span>
           </div>
        </div>

        <button className="w-full py-4 bg-foreground text-background font-bold rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-all">
          <Users className="w-5 h-5" />
          Request Auditor Access
        </button>

      </div>

    </div>
  );
}
