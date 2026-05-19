"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Building2, 
  ReceiptText, 
  ShieldCheck, 
  Map, 
  Coins, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  RefreshCw, 
  Sliders, 
  CheckCircle2, 
  Activity,
  ArrowRight,
  Sparkles,
  ArrowDownLeft,
  DollarSign,
  TrendingDown,
  Navigation,
  Lock,
  Battery
} from "lucide-react";
import apiClient from "@/lib/api-client";

export default function BillingOS() {
  const [compliance, setCompliance] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [contractors, setContractors] = useState<any[]>([]);
  const [tamperLogs, setTamperLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Active highlighted entities
  const [activeInvoice, setActiveInvoice] = useState<any>(null);
  const [activeRoute, setActiveRoute] = useState<any>(null);

  const fetchBillingData = async () => {
    try {
      const [compRes, invRes, contrRes, tampRes] = await Promise.all([
        apiClient.get('/billing/compliance'),
        apiClient.get('/billing/invoices'),
        apiClient.get('/billing/contractors'),
        apiClient.get('/billing/tamper-audits')
      ]);
      setCompliance(compRes.data);
      setInvoices(invRes.data);
      setContractors(contrRes.data);
      setTamperLogs(tampRes.data);

      if (invRes.data.length > 0) setActiveInvoice(invRes.data[0]);
      if (compRes.data.length > 0) setActiveRoute(compRes.data[0]);
    } catch (error) {
      console.error("Billing Ingest Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillingData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  // Calculate high-level financial summary
  const totalLiabilities = invoices.reduce((acc, inv) => acc + inv.netPayout, 0);
  const totalPenalties = invoices.reduce((acc, inv) => 
    acc + inv.deductions.gpsTamper + inv.deductions.routeDeviation + inv.deductions.slaBreach, 0);

  return (
    <div className="space-y-8 h-[calc(100vh-120px)] overflow-y-auto pr-3 pb-8 text-slate-100 font-sans">
      
      {/* Dynamic Finance Command Banner */}
      <div className="bg-slate-950 border border-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 text-[10px] font-bold rounded-full border border-orange-500/20 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-orange-500 animate-pulse" /> Finance-Grade Operational Proof OS
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">Billing & Compliance OS</h1>
            <p className="text-slate-400 text-xs max-w-xl">
              India's trusted contractor settlement engine. Reconciles claimed compactor trips against raw GPS telemetry trails, computes dynamic penalty deductions, and generates audit-ready invoices dynamically.
            </p>
          </div>

          {/* Core financial indicators */}
          <div className="flex flex-wrap gap-4 lg:self-end">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Coins className="w-4 h-4 text-orange-500 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Liability</p>
              <p className="text-xl font-black text-white">₹{(totalLiabilities / 100000).toFixed(2)}L</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <TrendingDown className="w-4 h-4 text-rose-500 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Penalties Deducted</p>
              <p className="text-xl font-black text-rose-400">₹{(totalPenalties / 1000).toFixed(1)}k</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Reconciled Bills</p>
              <p className="text-xl font-black text-emerald-400">{invoices.filter(i => i.status === 'AUTO_APPROVED').length} / {invoices.length}</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-orange-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* Contractor Auto-Invoice Reconciliation Ledger */}
        <div className="col-span-12 lg:col-span-8 bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <ReceiptText className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-base text-white">Auto-Invoice Reconciliation Ledger</h2>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              Audit Settlement
            </span>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-3">Invoice No</th>
                  <th className="pb-3">Contractor Name</th>
                  <th className="pb-3">Claimed amount</th>
                  <th className="pb-3">Reconciled Net Payout</th>
                  <th className="pb-3">Compliance status</th>
                  <th className="pb-3 text-right">Audit</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((row, i) => (
                  <tr 
                    key={i} 
                    onClick={() => setActiveInvoice(row)}
                    className={`border-b border-slate-900/40 text-xs cursor-pointer hover:bg-slate-900/20 transition-colors ${activeInvoice?.invoiceNo === row.invoiceNo ? 'bg-slate-900/30' : ''}`}
                  >
                    <td className="py-4 font-mono font-bold text-orange-500">{row.invoiceNo}</td>
                    <td className="py-4 font-bold text-white flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      {row.contractorName}
                    </td>
                    <td className="py-4 text-slate-400">₹{(row.totalAmount + row.gstAmount).toLocaleString()}</td>
                    <td className="py-4 font-black text-white">₹{row.netPayout.toLocaleString()}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        row.status === 'AUTO_APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-orange-500 hover:text-orange-400 font-bold">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Penalty & Deduction Panel */}
        <div className="col-span-12 lg:col-span-4 bg-slate-900/40 border border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col h-[400px] justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Sliders className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-base text-white">Settlement Audit Desk</h2>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
              Details for the selected contractor invoice, highlighting real-time penalty deductions backed by verified GPS evidence logs.
            </p>

            {activeInvoice ? (
              <div className="space-y-4">
                <div className="bg-slate-950 border border-slate-850/80 rounded-2xl p-4 space-y-3 text-xs font-mono">
                  <div className="flex justify-between border-b border-slate-850 pb-2 text-[10px] text-slate-500">
                    <span>{activeInvoice.contractorName}</span>
                    <span>Score: {activeInvoice.verificationScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Claimed Amount:</span>
                    <span className="text-white">₹{activeInvoice.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">GST (18%):</span>
                    <span className="text-white">₹{activeInvoice.gstAmount.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-slate-850 pt-2 space-y-1">
                    <p className="text-[9px] font-bold text-rose-400 uppercase">Penalty Deductions</p>
                    <div className="flex justify-between text-rose-400">
                      <span>- GPS Tamper:</span>
                      <span>₹{activeInvoice.deductions.gpsTamper.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-rose-400">
                      <span>- Route Deviations:</span>
                      <span>₹{activeInvoice.deductions.routeDeviation.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-rose-400">
                      <span>- SLA breaches:</span>
                      <span>₹{activeInvoice.deductions.slaBreach.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-500 italic text-[11px]">
                Select an invoice to review granular billing deductions.
              </div>
            )}
          </div>

          {activeInvoice && (
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-3 flex justify-between items-center text-xs font-bold text-emerald-400">
              <span>FINAL RECONCILED PAYOUT:</span>
              <span className="text-sm font-black">₹{activeInvoice.netPayout.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Route Compliance corridor matching */}
        <div className="col-span-12 lg:col-span-7 bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Map className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-lg text-white">Planned vs Actual Compliance matching</h3>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              Geo-fence Corridor Matches
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-3">Route code</th>
                  <th className="pb-3">Planned vs Actual Km</th>
                  <th className="pb-3">Corridor Match %</th>
                  <th className="pb-3">Deviations</th>
                  <th className="pb-3">Missed Wards</th>
                  <th className="pb-3">SLA Status</th>
                </tr>
              </thead>
              <tbody>
                {compliance.map((row, i) => (
                  <tr 
                    key={i} 
                    onClick={() => setActiveRoute(row)}
                    className={`border-b border-slate-900/40 text-xs cursor-pointer hover:bg-slate-900/15 transition-colors ${activeRoute?.routeCode === row.routeCode ? 'bg-slate-900/20' : ''}`}
                  >
                    <td className="py-4 font-mono font-bold text-white">{row.routeCode}</td>
                    <td className="py-4 font-semibold text-slate-300">{row.plannedDistanceKm}km / {row.actualDistanceKm}km</td>
                    <td className="py-4 font-black">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800 shrink-0">
                          <div className={`h-full ${row.corridorMatchPercent > 80 ? 'bg-emerald-500' : 'bg-orange-500'}`} style={{ width: `${row.corridorMatchPercent}%` }} />
                        </div>
                        <span className="text-white">{row.corridorMatchPercent}%</span>
                      </div>
                    </td>
                    <td className="py-4 font-bold text-rose-400">{row.deviationsCount} Deviation</td>
                    <td className="py-4 text-slate-400">{row.missedCheckpoints} checkpoints</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        row.status === 'COMPLIANT' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* GPS Trust Anti-Tamper center */}
        <div className="col-span-12 lg:col-span-5 bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-2xl h-[380px] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-sm text-white">GPS Trust & Spoof Alarm Center</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
              Track live hardware tampering alerts. Checks continuous pings, unreal GPS leaps, and device power drops in real-time.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[10px] bg-black/60 border border-slate-900 rounded-2xl p-4 shadow-inner">
            {tamperLogs.map((row: any, i: number) => (
              <div key={i} className="border-l border-orange-500/40 pl-2 py-0.5 space-y-1">
                <div className="flex justify-between items-center text-slate-500 text-[9px] font-bold">
                  <span>{row.vehicleNo} ({row.driverName})</span>
                  <span className={`${row.alertType === 'NONE' ? 'text-emerald-400' : 'text-rose-500'}`}>{row.alertType}</span>
                </div>
                <p className="text-slate-200">{row.details}</p>
                <div className="flex justify-between text-[8px] text-slate-500 uppercase">
                  <span>Trust index: {row.trustScore}%</span>
                  <span>{row.timeLogged}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Contractor Scorecard */}
        <div className="col-span-12 bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-orange-500 animate-pulse" />
              <h3 className="font-bold text-lg text-white">AI Contractor Scorecard rankings</h3>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              SWM Performance Ranks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contractors.map((row, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-black text-sm text-white">{row.name}</h4>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                      row.riskStatus === 'LOW_RISK' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {row.riskStatus}
                    </span>
                  </div>
                  <p className="text-3xl font-black text-orange-500">{row.efficiencyScore}% <span className="text-xs text-slate-500 font-semibold">Efficiency</span></p>
                </div>

                <div className="space-y-1.5 text-xs border-t border-slate-850 pt-3">
                  <div className="flex justify-between text-slate-400">
                    <span>Attendance:</span>
                    <span className="font-semibold text-slate-200">{row.attendancePercent}%</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Route Compliance:</span>
                    <span className="font-semibold text-slate-200">{row.routeCompliancePercent}%</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Fuel Optimization:</span>
                    <span className="font-semibold text-slate-200">{row.fuelOptimizationScore}%</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>SLA breach events:</span>
                    <span className="font-semibold text-rose-400">{row.slaBreachCount} Delayed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
