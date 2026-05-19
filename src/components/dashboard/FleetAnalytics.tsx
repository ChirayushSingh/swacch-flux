"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, DollarSign, Gavel, MapPin, CheckCircle2 } from "lucide-react";

export default function FleetAnalytics() {
  return (
    <div className="space-y-6 overflow-y-auto max-h-full pr-2">
      
      {/* High-Level Fleet Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Distance", value: "4,280 km", icon: TrendingUp, color: "text-blue-500", trend: "+12%" },
          { label: "Avg Coverage", value: "88.4%", icon: CheckCircle2, color: "text-emerald-500", trend: "+2.1%" },
          { label: "Penalty Amount", value: "₹12,400", icon: Gavel, color: "text-rose-500", trend: "-5%" },
          { label: "Net Payable", value: "₹2,42,000", icon: DollarSign, color: "text-emerald-600", trend: "+8%" },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className={`p-2 rounded-lg bg-secondary/50 ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* Route Efficiency Leaderboard */}
        <div className="col-span-7 bg-card border border-border rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-500" />
              Ward Efficiency
            </h3>
            <select className="bg-secondary/50 border border-border rounded-lg px-2 py-1 text-xs font-bold focus:outline-none">
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>
          </div>
          
          <div className="space-y-6">
            {[
              { ward: "Ward 4 - Dadar", coverage: 94, efficiency: 92 },
              { ward: "Ward 7 - Bandra", coverage: 82, efficiency: 78 },
              { ward: "Ward 12 - Juhu", coverage: 76, efficiency: 64 },
              { ward: "Ward 2 - Colaba", coverage: 88, efficiency: 85 },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    {item.ward}
                  </span>
                  <span>{item.coverage}% Coverage</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.coverage}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full rounded-full ${item.coverage > 90 ? 'bg-emerald-500' : item.coverage > 80 ? 'bg-blue-500' : 'bg-orange-500'}`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Penalty Intelligence Breakdown */}
        <div className="col-span-5 bg-card border border-border rounded-3xl p-6">
          <h3 className="font-bold flex items-center gap-2 mb-6">
            <Gavel className="w-5 h-5 text-rose-500" />
            Penalty Risk
          </h3>
          <div className="space-y-4">
             {[
               { reason: "Low Coverage", count: 12, amount: "₹6,000", risk: "HIGH" },
               { reason: "Route Deviation", count: 4, amount: "₹2,000", risk: "MEDIUM" },
               { reason: "Idle Violation", count: 8, amount: "₹4,400", risk: "HIGH" },
             ].map((p, i) => (
               <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/20 border border-border/50">
                  <div>
                    <p className="text-xs font-bold">{p.reason}</p>
                    <p className="text-[10px] text-muted-foreground">{p.count} Incidents</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-rose-500">{p.amount}</p>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
                      p.risk === 'HIGH' ? 'bg-rose-500/10 text-rose-500' : 'bg-orange-500/10 text-orange-500'
                    }`}>
                      {p.risk}
                    </span>
                  </div>
               </div>
             ))}
          </div>
          
          {/* Automated Billing Export */}
          <button className="w-full mt-8 py-3 bg-foreground text-background font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10">
             <DollarSign className="w-4 h-4" />
             Generate Billing Report
          </button>
        </div>

      </div>
    </div>
  );
}
