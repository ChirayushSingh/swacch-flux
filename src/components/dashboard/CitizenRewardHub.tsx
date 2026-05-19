"use client";

import { motion } from "framer-motion";
import { Wallet, Coins, Trophy, Star, ArrowUpRight, ShoppingBag, History, CheckCircle2 } from "lucide-react";

export default function CitizenRewardHub() {
  return (
    <div className="flex flex-col gap-8 h-[calc(100vh-120px)] overflow-y-auto pr-2">
      
      {/* Wallet Hero Section */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2 text-blue-100">
                <Coins className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Swachh Coins</span>
              </div>
              <h2 className="text-5xl font-bold mb-6">4,250</h2>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-sm font-bold transition-all flex items-center gap-2">
                   <ArrowUpRight className="w-4 h-4" /> Earn More
                </button>
                <button className="px-6 py-2 bg-white text-blue-600 rounded-xl text-sm font-bold transition-all flex items-center gap-2">
                   <ShoppingBag className="w-4 h-4" /> Redeem
                </button>
              </div>
            </div>
            
            <div className="text-right">
               <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                  <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
               </div>
               <p className="mt-3 font-bold text-sm">Platinum Member</p>
               <p className="text-[10px] text-blue-100">Top 1% in Mumbai</p>
            </div>
          </div>
          
          {/* Abstract Art */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Level Progress */}
        <div className="col-span-4 bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Impact Level 12
            </h3>
            <p className="text-xs text-muted-foreground mb-4">750 coins to Level 13</p>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                className="h-full bg-blue-500 rounded-full" 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="p-3 bg-secondary/30 rounded-2xl text-center">
              <p className="text-lg font-bold">24</p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase">Reports</p>
            </div>
            <div className="p-3 bg-secondary/30 rounded-2xl text-center">
              <p className="text-lg font-bold">12</p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase">Badges</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* Recent Activity */}
        <div className="col-span-7 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-bold flex items-center gap-2">
              <History className="w-5 h-5 text-blue-500" />
              Coin History
            </h3>
            <button className="text-xs font-bold text-blue-500">View All</button>
          </div>
          <div className="space-y-3">
             {[
               { title: "Wet Waste Segregation", date: "Today, 10:30 AM", amount: "+50", type: "earned" },
               { title: "Garbage Overflow Reported", date: "Yesterday", amount: "+100", type: "earned" },
               { title: "Electricity Bill Discount", date: "May 8, 2024", amount: "-1,500", type: "spent" },
               { title: "Weekly Bonus", date: "May 5, 2024", amount: "+250", type: "earned" },
             ].map((tx, i) => (
               <div key={i} className="bg-card border border-border p-4 rounded-2xl flex items-center justify-between hover:border-blue-500/50 transition-all cursor-pointer shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tx.type === 'earned' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      {tx.type === 'earned' ? <CheckCircle2 className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{tx.title}</p>
                      <p className="text-[10px] text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${tx.type === 'earned' ? 'text-emerald-500' : 'text-slate-500'}`}>
                    {tx.amount}
                  </p>
               </div>
             ))}
          </div>
        </div>

        {/* Global Leaderboard */}
        <div className="col-span-5 bg-card border border-border rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold flex items-center gap-2 mb-6">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Ward Champions
          </h3>
          <div className="space-y-4">
            {[
              { rank: 1, name: "Dadar West", score: "98.2", coins: "1.2M" },
              { rank: 2, name: "Bandra East", score: "94.5", coins: "950K" },
              { rank: 3, name: "Juhu Scheme", score: "92.1", coins: "880K" },
              { rank: 4, name: "Colaba", score: "89.4", coins: "720K" },
            ].map((ward, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-secondary/20 transition-all">
                 <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                   i === 0 ? 'bg-yellow-400 text-yellow-900' : 
                   i === 1 ? 'bg-slate-300 text-slate-700' : 
                   i === 2 ? 'bg-orange-300 text-orange-900' : 'text-muted-foreground'
                 }`}>
                   {ward.rank}
                 </span>
                 <div className="flex-1">
                    <p className="text-xs font-bold">{ward.name}</p>
                    <p className="text-[10px] text-muted-foreground">{ward.score} Quality Score</p>
                 </div>
                 <div className="text-right">
                    <p className="text-xs font-bold text-blue-500">{ward.coins}</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase">Pooled</p>
                 </div>
              </div>
            ))}
          </div>
          
          {/* Join Challenge Button */}
          <button className="w-full mt-8 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 hover:opacity-90 transition-all">
             Join Weekly Clean Challenge
          </button>
        </div>

      </div>
    </div>
  );
}
