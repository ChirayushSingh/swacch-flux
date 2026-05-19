"use client";

import { motion } from "framer-motion";
import { FileText, CreditCard, ShieldCheck, TrendingUp, Download, CheckCircle2, AlertTriangle, Clock, Filter, Search, MoreHorizontal } from "lucide-react";

export default function MunicipalErp() {
  return (
    <div className="grid grid-cols-12 gap-8 h-[calc(100vh-120px)] overflow-y-auto pr-2">
      
      {/* Financial Health HUD */}
      <div className="col-span-12 grid grid-cols-4 gap-6">
        {[
          { label: "Total Budget Utilized", value: "₹42.8 Cr", sub: "84% of FY 2024", color: "text-blue-500" },
          { label: "Pending Payouts", value: "₹8.4 Cr", sub: "12 Invoices Awaiting Approval", color: "text-orange-500" },
          { label: "Total Penalties", value: "₹1.2 Cr", sub: "Recovery Rate: 92%", color: "text-rose-500" },
          { label: "Contractor Score", value: "84/100", sub: "Avg Compliance across 8 Zones", color: "text-emerald-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-3xl p-6 shadow-sm">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">{stat.label}</p>
            <div className="flex items-end gap-2">
               <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
               <span className="text-[10px] text-muted-foreground mb-1">{stat.sub}</span>
            </div>
            <div className="mt-4 h-1.5 bg-secondary rounded-full overflow-hidden">
               <div className={`h-full ${stat.color.replace('text', 'bg')}`} style={{ width: '70%' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Billing & Payouts Table */}
      <div className="col-span-8 bg-card border border-border rounded-3xl overflow-hidden flex flex-col shadow-sm">
        <div className="p-6 border-b border-border flex justify-between items-center bg-secondary/10">
          <h3 className="font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            Financial Reconciliation Hub
          </h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search Invoice..." 
                className="bg-background border border-border rounded-lg pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button className="p-2 bg-background border border-border rounded-lg">
              <Filter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b border-border bg-secondary/5">
              <tr>
                <th className="px-6 py-4">Invoice / Contractor</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Penalty</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { no: "INV-BMC-2401", contractor: "Global Waste Mgmt", amount: "₹42.5 L", penalty: "₹1.4 L", status: "APPROVED" },
                { no: "INV-BMC-2402", contractor: "Green City Services", amount: "₹38.2 L", penalty: "₹0.8 L", status: "PENDING" },
                { no: "INV-BMC-2403", contractor: "Urban Cleaners Ltd", amount: "₹29.4 L", penalty: "₹2.2 L", status: "PAID" },
                { no: "INV-BMC-2404", contractor: "Eco Systems India", amount: "₹12.8 L", penalty: "₹0.2 L", status: "REJECTED" },
              ].map((inv, i) => (
                <tr key={i} className="hover:bg-secondary/20 transition-all cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                         <CreditCard className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">{inv.no}</p>
                        <p className="text-[10px] text-muted-foreground">{inv.contractor}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold">{inv.amount}</td>
                  <td className="px-6 py-4 text-xs font-bold text-rose-500">{inv.penalty}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      inv.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-500' : 
                      inv.status === 'PENDING' ? 'bg-orange-500/10 text-orange-500' : 
                      inv.status === 'PAID' ? 'bg-blue-500/10 text-blue-500' : 
                      'bg-rose-500/10 text-rose-500'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1.5 hover:bg-secondary rounded-lg transition-all">
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approval & Compliance Side Panel */}
      <div className="col-span-4 space-y-6">
        
        {/* Pending Approvals Queue */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
           <h3 className="font-bold flex items-center gap-2 mb-6">
             <Clock className="w-5 h-5 text-orange-500" />
             Approval Queue
           </h3>
           <div className="space-y-4">
              {[
                { title: "INV-BMC-2402", type: "Billing", from: "Finance Team", amount: "₹38.2 L" },
                { title: "TDR-2024-001", type: "Renewal", from: "Tender Committee", amount: "₹1.4 Cr" },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                   <div className="flex justify-between items-start mb-2">
                      <p className="text-xs font-bold">{item.title}</p>
                      <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{item.type}</span>
                   </div>
                   <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] text-white/60">From: {item.from}</p>
                        <p className="text-sm font-bold text-emerald-400 mt-1">{item.amount}</p>
                      </div>
                      <div className="flex gap-2">
                         <button className="p-1.5 bg-emerald-500 text-white rounded-lg"><CheckCircle2 className="w-3.5 h-3.5" /></button>
                         <button className="p-1.5 bg-white/10 text-white rounded-lg"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Audit & Compliance Card */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
           <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
             <ShieldCheck className="w-4 h-4 text-blue-500" />
             Audit Readiness
           </h3>
           <div className="space-y-3">
              {[
                { label: "SLA Proof Verification", status: "VERIFIED" },
                { label: "Contract Compliance", status: "98%" },
                { label: "GST Documents", status: "UP TO DATE" },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-secondary/30">
                   <span className="text-[11px] font-medium text-muted-foreground">{doc.label}</span>
                   <span className="text-[10px] font-bold text-emerald-500">{doc.status}</span>
                </div>
              ))}
           </div>
           <button className="w-full mt-6 py-3 bg-foreground text-background font-bold rounded-2xl text-xs flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Export CAG Audit Report
           </button>
        </div>

        {/* AI Financial Alert */}
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl p-6 relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex items-center gap-2 text-rose-500 mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Financial Anomaly</span>
              </div>
              <p className="text-xs font-bold mb-1">Unusual Penalty Waiver Request</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                 Ward 7 is requesting a ₹1.2L penalty waiver for SLA breaches. Historical data suggests pattern mismatch.
              </p>
           </div>
           <div className="absolute -right-4 -bottom-4 opacity-10">
              <AlertTriangle className="w-20 h-20 text-rose-500" />
           </div>
        </div>

      </div>
    </div>
  );
}
