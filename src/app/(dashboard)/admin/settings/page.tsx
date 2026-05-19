"use client";

import { Settings, Building2, Bell, Shield, Palette, Database, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Platform Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure your municipal operations platform.</p>
      </div>

      {/* Organization Settings */}
      <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
        <h3 className="font-bold mb-6 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-500" /> Organization Profile
        </h3>
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: "Municipality Name", value: "Brihanmumbai Municipal Corporation" },
            { label: "Org Code", value: "BMC-MH-001" },
            { label: "City", value: "Mumbai, Maharashtra" },
            { label: "SWM Department Head", value: "Joint Commissioner (SWM)" },
          ].map((field, i) => (
            <div key={i}>
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">{field.label}</label>
              <input defaultValue={field.value} className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            </div>
          ))}
        </div>
      </div>

      {/* SLA Configuration */}
      <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
        <h3 className="font-bold mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-500" /> SLA Configuration
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: "CRITICAL Priority SLA (hrs)", value: "4" },
            { label: "HIGH Priority SLA (hrs)", value: "12" },
            { label: "MEDIUM Priority SLA (hrs)", value: "24" },
            { label: "LOW Priority SLA (hrs)", value: "72" },
            { label: "Escalation Threshold (%)", value: "85" },
            { label: "Auto-Dispatch Enabled", value: "Yes" },
          ].map((field, i) => (
            <div key={i}>
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">{field.label}</label>
              <input defaultValue={field.value} className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
        <h3 className="font-bold mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5 text-orange-500" /> Notification Triggers
        </h3>
        <div className="space-y-4">
          {[
            { label: "SLA Breach Warning (75% elapsed)", enabled: true },
            { label: "Drone Hotspot Detected", enabled: true },
            { label: "Vehicle Failure Risk > 70%", enabled: true },
            { label: "Smart Bin > 90% Full", enabled: false },
            { label: "Waste Surge Predicted (24h)", enabled: true },
            { label: "Anomaly Detected (Ghost Attendance)", enabled: true },
          ].map((notif, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
              <span className="text-sm font-medium">{notif.label}</span>
              <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-all ${notif.enabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${notif.enabled ? 'left-5' : 'left-0.5'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 hover:bg-emerald-600 transition-colors">
          <Save className="w-4 h-4" /> Save Configuration
        </button>
      </div>
    </div>
  );
}
