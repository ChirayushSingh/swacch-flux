"use client";

import { motion } from "framer-motion";
import { Search, Filter, ShieldCheck, AlertTriangle, Eye, CheckCircle2, XCircle } from "lucide-react";

export default function AuditWarRoom() {
  return (
    <div className="grid grid-cols-12 gap-8 h-[calc(100vh-120px)]">
      
      {/* Audit Stats */}
      <div className="col-span-12 grid grid-cols-4 gap-4">
        {[
          { label: "Total Audits", value: "1,242", sub: "Last 24h", color: "text-blue-500" },
          { label: "Avg Quality", value: "78.4%", sub: "+2.1%", color: "text-emerald-500" },
          { label: "Mixed Waste", value: "14%", sub: "Risk Level: Low", color: "text-orange-500" },
          { label: "Verification Pending", value: "42", sub: "Urgent", color: "text-rose-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
            <div className="flex items-end gap-2">
               <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
               <span className="text-[10px] text-muted-foreground mb-1">{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Audit Feed */}
      <div className="col-span-8 bg-card border border-border rounded-3xl overflow-hidden flex flex-col shadow-sm">
        <div className="p-6 border-b border-border flex justify-between items-center bg-secondary/10">
          <h3 className="font-bold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            AI Segregation Feed
          </h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search ticket..." 
                className="bg-background border border-border rounded-lg pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <button className="p-2 bg-background border border-border rounded-lg">
              <Filter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b border-border">
              <tr>
                <th className="px-6 py-4">Complaint / Photo</th>
                <th className="px-6 py-4">AI Score</th>
                <th className="px-6 py-4">Detection</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { ticket: "SF-2024-0012", ward: "Ward 4", score: 92, type: "DRY", status: "VERIFIED" },
                { ticket: "SF-2024-0015", ward: "Ward 2", score: 45, type: "MIXED", status: "PENDING" },
                { ticket: "SF-2024-0018", ward: "Ward 7", score: 88, type: "DRY", status: "VERIFIED" },
                { ticket: "SF-2024-0021", ward: "Ward 12", score: 12, type: "MIXED", status: "REJECTED" },
              ].map((audit, i) => (
                <tr key={i} className="hover:bg-secondary/20 transition-all cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-200 overflow-hidden relative">
                         <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                            <Eye className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                         </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold">{audit.ticket}</p>
                        <p className="text-[10px] text-muted-foreground">{audit.ward}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${audit.score > 70 ? 'bg-emerald-500' : audit.score > 40 ? 'bg-orange-500' : 'bg-rose-500'}`} 
                            style={{ width: `${audit.score}%` }} 
                          />
                       </div>
                       <span className="text-[10px] font-bold">{audit.score}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      audit.type === 'DRY' ? 'bg-blue-500/10 text-blue-500' : 'bg-orange-500/10 text-orange-500'
                    }`}>
                      {audit.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                       {audit.status === 'VERIFIED' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : 
                        audit.status === 'PENDING' ? <AlertTriangle className="w-3.5 h-3.5 text-orange-500" /> : 
                        <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                       <span className="text-[10px] font-bold">{audit.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1.5 hover:bg-secondary rounded-lg transition-all">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Intelligence Insights */}
      <div className="col-span-4 space-y-6">
        
        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
           <h3 className="font-bold flex items-center gap-2 mb-4">
             <AlertTriangle className="w-5 h-5 text-orange-500" />
             Anomalies Detected
           </h3>
           <div className="space-y-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                 <p className="text-xs font-bold mb-1">Sudden Drop: Ward 7</p>
                 <p className="text-[10px] text-white/60 mb-2">Segregation quality fell by 18% in the last 2 hours. Potential equipment failure or illegal dumping.</p>
                 <button className="text-[10px] font-bold text-orange-500 hover:underline">Investigate Ward</button>
              </div>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                 <p className="text-xs font-bold mb-1 text-emerald-400">High Performing: Ward 4</p>
                 <p className="text-[10px] text-white/60 mb-2">92% segregation accuracy maintained for 48h. Recommending "Swachh Ward" badge.</p>
                 <button className="text-[10px] font-bold text-emerald-400 hover:underline">Award Badge</button>
              </div>
           </div>
        </div>

        {/* Audit Verification HUD */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
           <h3 className="font-bold text-sm mb-4">Verification Needed</h3>
           <div className="p-4 bg-secondary/30 rounded-2xl border border-dashed border-border text-center">
              <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl mb-4 flex items-center justify-center">
                 <p className="text-[10px] font-bold text-slate-400">Loading High-Res Proof...</p>
              </div>
              <div className="flex gap-2">
                 <button className="flex-1 py-2 bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-emerald-500/20">Verify</button>
                 <button className="flex-1 py-2 bg-rose-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-rose-500/20">Reject</button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
