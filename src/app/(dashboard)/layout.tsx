"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, AlertTriangle, Map, Activity, Users, Settings, LogOut,
  Bell, Menu, X, Truck, Route, Brain, TrendingUp, Leaf, ShieldCheck,
  Plane, ReceiptText, Building2, ChevronDown, ChevronRight, Zap, Cpu, Globe, Coins, Database, Network, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TenantSwitcher } from "@/components/dashboard/TenantSwitcher";

const sidebarGroups = [
  {
    label: "Command",
    links: [
      { name: "Command Center", href: "/admin", icon: LayoutDashboard },
      { name: "Gov Exchange", href: "/admin/exchange", icon: Building2 },
      { name: "Complaints", href: "/admin/complaints", icon: AlertTriangle },
      { name: "GIS War Room", href: "/admin/map", icon: Map },
      { name: "Demo OS", href: "/admin/demo", icon: Sparkles },
    ]
  },
  {
    label: "Fleet & Operations",
    links: [
      { name: "Fleet Tracker", href: "/admin/fleet", icon: Truck },
      { name: "Route Intelligence", href: "/admin/routes", icon: Route },
      { name: "Waste Infrastructure", href: "/admin/waste-infra", icon: Building2 },
      { name: "Foresight", href: "/admin/foresight", icon: TrendingUp },
    ]
  },
  {
    label: "AI Intelligence",
    links: [
      { name: "Executive Intel", href: "/admin/intelligence", icon: Brain },
      { name: "Autonomous OS", href: "/admin/autonomous", icon: Cpu },
      { name: "Climate Twin", href: "/admin/climate", icon: Globe },
      { name: "Drone Command", href: "/admin/drone", icon: Plane },
      { name: "Audit War Room", href: "/admin/audits", icon: ShieldCheck },
    ]
  },
  {
    label: "Finance & Compliance",
    links: [
      { name: "Municipal ERP", href: "/admin/erp", icon: ReceiptText },
      { name: "Billing OS", href: "/admin/billing", icon: ReceiptText },
      { name: "Circular Economy", href: "/admin/circular", icon: Coins },
      { name: "Investor Portal", href: "/admin/esg", icon: Leaf },
    ]
  },
  {
    label: "Platform",
    links: [
      { name: "GovTech OS", href: "/admin/govtech", icon: Database },
      { name: "Production OS", href: "/admin/production", icon: ShieldCheck },
      { name: "Cloud OS", href: "/admin/cloud", icon: Network },
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ]
  }
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 border-r border-border bg-card flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm block leading-tight">Swacch Flux</span>
              <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-widest">Municipal OS</span>
            </div>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setIsMobileOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav Groups */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {sidebarGroups.map((group) => (
            <div key={group.label}>
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-1.5">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.links.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                        isActive 
                          ? "bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-500/20" 
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-border shrink-0">
          <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6 shrink-0">
          <button className="p-2 -ml-2 lg:hidden text-muted-foreground" onClick={() => setIsMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <TenantSwitcher />
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <span className="text-xs font-bold text-emerald-600">AD</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-secondary/20 p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
