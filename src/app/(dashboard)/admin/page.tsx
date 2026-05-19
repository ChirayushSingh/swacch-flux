"use client";

import { motion } from "framer-motion";
import { 
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  ArrowRight,
  Map as MapIcon,
  Search,
  Filter
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import Link from "next/link";
import { useComplaints } from "@/lib/hooks/useComplaints";
import { useRealTimeUpdate } from "@/lib/hooks/useRealTimeUpdate";
import { Badge } from "@/components/ui/Badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Skeleton } from "@/components/ui/Skeleton";
import { Complaint } from "@/lib/data/mock";

const mockChartData = [
  { name: "Mon", open: 40, resolved: 24 },
  { name: "Tue", open: 30, resolved: 38 },
  { name: "Wed", open: 45, resolved: 32 },
  { name: "Thu", open: 25, resolved: 48 },
  { name: "Fri", open: 55, resolved: 38 },
  { name: "Sat", open: 65, resolved: 43 },
  { name: "Sun", open: 35, resolved: 55 },
];

const StatCard = ({ title, value, icon: Icon, trend, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-card border border-border rounded-xl p-5 shadow-sm relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon className="w-16 h-16" />
    </div>
    <div className="flex justify-between items-start mb-4">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <div className="p-2 bg-primary/5 rounded-lg border border-primary/10 text-primary">
        <Icon className="w-4 h-4" />
      </div>
    </div>
    <div>
      <h3 className="text-3xl font-bold">{value}</h3>
      <p className={`text-xs mt-2 font-medium ${trend.isPositive ? 'text-emerald-500' : 'text-destructive'}`}>
        {trend.isPositive ? '+' : '-'}{trend.value}% from last week
      </p>
    </div>
  </motion.div>
);

export default function CommandCenter() {
  const { complaints, loading } = useComplaints();
  const { updates } = useRealTimeUpdate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Command Center</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time overview of municipal solid waste operations.
          </p>
        </div>
        <div className="flex gap-2">
          <Link 
            href="/admin/map"
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            <MapIcon className="w-4 h-4" /> Open War Room
          </Link>
          <button className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg border border-border hover:bg-secondary/80 transition-colors">
            Export Analytics
          </button>
        </div>
      </div>

      {/* AI Insight Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-emerald-500/10 to-teal-400/5 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-4"
      >
        <div className="p-2 bg-emerald-500/20 rounded-full text-emerald-600 dark:text-emerald-400 shrink-0">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">AI Operational Insight</h4>
          <p className="text-sm text-emerald-700/80 dark:text-emerald-400/80 mt-1">
            Predictive analysis indicates a 30% surge in "Garbage Overflow" complaints in Ward 12 tomorrow due to local festivals. Recommended to assign 2 extra trucks to Route B.
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Complaints" 
          value={complaints.length} 
          icon={AlertOctagon} 
          trend={{ value: 12, isPositive: false }} 
          delay={0.1}
        />
        <StatCard 
          title="Resolved Today" 
          value="84" 
          icon={CheckCircle2} 
          trend={{ value: 8, isPositive: true }} 
          delay={0.2}
        />
        <StatCard 
          title="SLA Compliance" 
          value="92%" 
          icon={AlertTriangle} 
          trend={{ value: 2, isPositive: false }} 
          delay={0.3}
        />
        <StatCard 
          title="Avg. Resolution" 
          value="4h 12m" 
          icon={Clock} 
          trend={{ value: 15, isPositive: true }} 
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area: Complaints Table & Trends */}
        <div className="lg:col-span-2 space-y-6">
          {/* Complaints Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-card border border-border rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
              <div>
                <h3 className="font-semibold">Recent Complaints</h3>
                <p className="text-sm text-muted-foreground">Manage and assign incoming issues</p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="pl-9 pr-4 py-1.5 bg-background border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all w-40 sm:w-64"
                  />
                </div>
                <button className="p-2 border border-border rounded-lg hover:bg-secondary transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Complaint</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  complaints.map((c: Complaint) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono text-xs font-bold text-primary">{c.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{c.title}</p>
                          <p className="text-xs text-muted-foreground">{c.location.ward}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={c.status === 'ESCALATED' ? 'error' : c.status === 'RESOLVED' ? 'success' : 'info'}>
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={c.priority === 'CRITICAL' ? 'error' : c.priority === 'HIGH' ? 'warning' : 'default'}>
                          {c.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link 
                          href={`/admin/complaints/${c.id}`}
                          className="p-1.5 hover:bg-primary/10 text-primary rounded-md transition-colors block"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <div className="p-4 border-t border-border flex justify-center">
              <button className="text-sm font-medium text-primary hover:underline">View All Complaints</button>
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-semibold">Resolution Trends</h3>
                <p className="text-sm text-muted-foreground">Open vs Resolved complaints over 7 days</p>
              </div>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOpen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '14px' }}
                  />
                  <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" />
                  <Area type="monotone" dataKey="open" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorOpen)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Sidebar: Live Feed & Regional Performance */}
        <div className="space-y-6">
          {/* Live Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col h-[500px]"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold">Live Activity Feed</h3>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {updates.length === 0 ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="w-3 h-3 rounded-full mt-1.5 shrink-0" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))
              ) : (
                updates.map((update) => (
                  <div key={update.id} className="flex gap-3 relative pb-4 last:pb-0">
                    <div className={`w-3 h-3 rounded-full mt-1.5 z-10 shrink-0 ${
                      update.type === 'NEW_COMPLAINT' ? 'bg-blue-500' :
                      update.type === 'STATUS_CHANGE' ? 'bg-emerald-500' : 'bg-purple-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{update.message}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(update.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <button className="w-full mt-4 py-2 text-sm text-primary font-medium flex items-center justify-center gap-1 hover:bg-secondary rounded-lg transition-colors border border-transparent hover:border-border">
              View All History <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Regional Hotspots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <h3 className="font-semibold mb-4">Ward Performance</h3>
            <div className="space-y-4">
              {[
                { name: "Ward A (South)", value: 85, color: "bg-emerald-500" },
                { name: "Ward B (East)", value: 62, color: "bg-amber-500" },
                { name: "Ward C (North)", value: 94, color: "bg-emerald-500" },
                { name: "Ward D (West)", value: 45, color: "bg-rose-500" },
              ].map((ward) => (
                <div key={ward.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">{ward.name}</span>
                    <span className="text-muted-foreground">{ward.value}% Efficiency</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${ward.color} rounded-full`} style={{ width: `${ward.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
