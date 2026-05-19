"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Building2, 
  Activity, 
  ShieldCheck, 
  Terminal, 
  Users, 
  Key, 
  Cpu, 
  Network, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles,
  Lock,
  Battery,
  Database,
  Search,
  ArrowRight,
  Wifi,
  Workflow
} from "lucide-react";
import apiClient from "@/lib/api-client";

export default function ProductionOS() {
  const [telemetry, setTelemetry] = useState<any>({
    apiLatencyMs: 0,
    telemetryLagSeconds: 0,
    activeSyncRatePercent: 0,
    activeDeviceConnections: 0,
    queuedPacketsCount: 0
  });
  const [recoveryQueue, setRecoveryQueue] = useState<any[]>([]);
  const [rbacRoles, setRbacRoles] = useState<any[]>([]);
  const [auditLedger, setAuditLedger] = useState<any[]>([]);
  const [diagnostics, setDiagnostics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Active highlighted entities
  const [activeRole, setActiveRole] = useState<any>(null);

  const fetchProductionData = async () => {
    try {
      const [telRes, recRes, rbacRes, auditRes, diagRes] = await Promise.all([
        apiClient.get('/production/telemetry-lag'),
        apiClient.get('/production/recovery-queue'),
        apiClient.get('/production/rbac-roles'),
        apiClient.get('/production/audit-ledger'),
        apiClient.get('/production/diagnostics')
      ]);
      setTelemetry(telRes.data);
      setRecoveryQueue(recRes.data);
      setRbacRoles(rbacRes.data);
      setAuditLedger(auditRes.data);
      setDiagnostics(diagRes.data);

      if (rbacRes.data.length > 0) setActiveRole(rbacRes.data[0]);
    } catch (error) {
      console.error("Production Ingest Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductionData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 h-[calc(100vh-120px)] overflow-y-auto pr-3 pb-8 text-slate-100 font-sans">
      
      {/* Dynamic Enterprise Command Banner */}
      <div className="bg-slate-950 border border-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 text-[10px] font-bold rounded-full border border-orange-500/20 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-orange-500 animate-pulse" /> Mission-Critical Reliability OS
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">Production Hardening OS</h1>
            <p className="text-slate-400 text-xs max-w-xl">
              India's production-hardened municipal operating infrastructure. Monitors telemetry ingestion queues, processes offline worker syncs, audits granular RBAC boundaries, and stores immutable auditing logs.
            </p>
          </div>

          {/* Core telemetry indicators */}
          <div className="flex flex-wrap gap-4 lg:self-end">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Network className="w-4 h-4 text-orange-500 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">API Latency</p>
              <p className="text-xl font-black text-white">{telemetry.apiLatencyMs}ms</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Activity className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Telemetry Sync Lag</p>
              <p className="text-xl font-black text-emerald-400">{telemetry.telemetryLagSeconds}s</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Wifi className="w-4 h-4 text-blue-400 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Connected Hardware</p>
              <p className="text-xl font-black text-blue-400">{(telemetry.activeDeviceConnections / 1000).toFixed(1)}k</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-orange-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* Offline Sync Recovery Queue Ledger */}
        <div className="col-span-12 lg:col-span-8 bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Workflow className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-base text-white">Offline Recovery Sync Queue</h2>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              Low-Connectivity buffering
            </span>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-3">Queue ID</th>
                  <th className="pb-3">Field Operator</th>
                  <th className="pb-3">Buffered Packets</th>
                  <th className="pb-3">Last Sync Attempt</th>
                  <th className="pb-3">Sync Status</th>
                  <th className="pb-3 text-right">Conflict Action</th>
                </tr>
              </thead>
              <tbody>
                {recoveryQueue.map((row, i) => (
                  <tr key={i} className="border-b border-slate-900/40 text-xs hover:bg-slate-900/20 transition-colors">
                    <td className="py-4 font-mono font-bold text-orange-500">{row.queueId}</td>
                    <td className="py-4 font-bold text-white flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      {row.workerName}
                    </td>
                    <td className="py-4 text-slate-400">{row.bufferedPingsCount} Pings</td>
                    <td className="py-4 text-slate-400">{row.lastSyncAttempt}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        row.status === 'SYNC_SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 text-right font-mono text-[10px] text-slate-400">
                      {row.conflictResolved}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Granular RBAC Scope Configurator */}
        <div className="col-span-12 lg:col-span-4 bg-slate-900/40 border border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col h-[400px] justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-base text-white">Granular RBAC Scope Configurator</h2>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
              Review municipal role boundaries, permitted zone visibilities, and sensitive approvals requirement details.
            </p>

            <div className="space-y-3">
              {rbacRoles.map((row, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveRole(row)}
                  className={`bg-slate-950 border border-slate-850/80 rounded-2xl p-3 flex justify-between items-center text-xs cursor-pointer hover:bg-slate-900/30 transition-colors ${activeRole?.roleName === row.roleName ? 'border-orange-500/40 bg-slate-900/20' : ''}`}
                >
                  <div>
                    <h4 className="font-bold text-white">{row.roleName}</h4>
                    <p className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">{row.allowedScope}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                    row.requiresApprovalGate ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {row.requiresApprovalGate ? 'Approval Gate' : 'Unrestricted'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {activeRole && (
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-3 flex justify-between items-center text-[10px] font-mono text-orange-400">
              <span>SENSITIVE ACTIONS SCOPE:</span>
              <span className="font-black">{activeRole.sensitiveActionsApproved}</span>
            </div>
          )}
        </div>

        {/* Immutable Audit Ledger */}
        <div className="col-span-12 lg:col-span-7 bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-orange-500 animate-pulse" />
              <h3 className="font-bold text-lg text-white">Immutable Audit Ledger</h3>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              CPCB Auditor logs
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-3">Timestamp</th>
                  <th className="pb-3">Operator</th>
                  <th className="pb-3">Auditable Action</th>
                  <th className="pb-3">Granular Details</th>
                  <th className="pb-3 text-right">Cryptographic Sign</th>
                </tr>
              </thead>
              <tbody>
                {auditLedger.map((row, i) => (
                  <tr key={i} className="border-b border-slate-900/40 text-xs hover:bg-slate-900/10 transition-colors">
                    <td className="py-4 text-slate-400 font-semibold">{row.timestamp}</td>
                    <td className="py-4 font-bold text-white">{row.operator}</td>
                    <td className="py-4 font-mono font-bold text-orange-500">{row.action}</td>
                    <td className="py-4 text-slate-300 max-w-xs truncate">{row.details}</td>
                    <td className="py-4 text-right font-mono text-[10px] text-emerald-400">{row.hashSignature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Field Diagnostics & Network Quality */}
        <div className="col-span-12 lg:col-span-5 bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-2xl h-[380px] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-5 h-5 text-orange-500 animate-pulse" />
              <h3 className="font-bold text-sm text-white">Field Device Health Diagnostics</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
              Diagnose live SIM cellular response speed, dumper GPS locking satellite status, and packet drop percentages.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[10px] bg-black/60 border border-slate-900 rounded-2xl p-4 shadow-inner">
            {diagnostics.map((row, i) => (
              <div key={i} className="border-l border-orange-500/40 pl-2 py-0.5 space-y-1">
                <div className="flex justify-between items-center text-slate-500 text-[9px] font-bold">
                  <span>{row.deviceId} ({row.vehicleNo})</span>
                  <span className={`${row.packetDropRatePercent < 1.0 ? 'text-emerald-400' : 'text-orange-500'}`}>Drops: {row.packetDropRatePercent}%</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Cellular Latency: {row.networkLatencyMs}ms</span>
                  <span>Battery Temp: {row.batteryTempCelsius}°C</span>
                </div>
                <div className="flex justify-between text-[8px] text-slate-500 uppercase">
                  <span>Satellite Status: {row.gpsSatelliteLock}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
