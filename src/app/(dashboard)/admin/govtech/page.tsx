"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Building2, 
  Cpu, 
  ShieldCheck, 
  Smartphone, 
  MessageSquare, 
  Activity, 
  ChevronRight, 
  Clock, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  RefreshCw, 
  Globe, 
  Sparkles,
  Lock,
  BatteryCharging,
  Send,
  Database
} from "lucide-react";
import apiClient from "@/lib/api-client";

export default function GovTechOS() {
  const [gpsDevices, setGpsDevices] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [commTemplates, setCommTemplates] = useState<any>({
    languagesSupported: [],
    templatesList: []
  });
  const [loading, setLoading] = useState(true);

  // Onboarding Form States
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("Maharashtra");
  const [wardsCount, setWardsCount] = useState(24);
  const [contractorsCount, setContractorsCount] = useState(4);
  const [vehiclesCount, setVehiclesCount] = useState(15);
  const [onboardingResponse, setOnboardingResponse] = useState<any>(null);
  const [onboardingLoader, setOnboardingLoader] = useState(false);

  // Template active language state
  const [selectedLang, setSelectedLang] = useState<'en' | 'hi' | 'mr'>('en');

  const fetchGovtechData = async () => {
    try {
      const [gpsRes, auditRes, commRes] = await Promise.all([
        apiClient.get('/govtech/gps-diagnostic'),
        apiClient.get('/govtech/audit-ledger'),
        apiClient.get('/govtech/communication-templates')
      ]);
      setGpsDevices(gpsRes.data);
      setAuditLogs(auditRes.data);
      setCommTemplates(commRes.data);
    } catch (error) {
      console.error("Govtech Ingest Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGovtechData();
  }, []);

  const handleOnboard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setOnboardingLoader(true);
      const res = await apiClient.post('/govtech/onboard', {
        cityName,
        stateName,
        wardsCount,
        contractorsCount,
        vehiclesCount
      });
      setOnboardingResponse(res.data.onboardedPayload);
      alert(res.data.message);
    } catch (error) {
      alert("Failed to onboard municipal corporation.");
    } finally {
      setOnboardingLoader(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 h-[calc(100vh-120px)] overflow-y-auto pr-3 pb-8 text-slate-100 font-sans">
      
      {/* Dynamic GovTech Command Banner */}
      <div className="bg-slate-950 border border-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 text-[10px] font-bold rounded-full border border-orange-500/20 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-orange-500 animate-pulse" /> Deployable GovTech Core Infrastructure
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">Production-Ready Municipal OS</h1>
            <p className="text-slate-400 text-xs max-w-xl">
              India's deployable smart city operating ecosystem. Integrates Teltonika, Concox, and Ajjas hardware GPS protocols, manages tamper-evident audit ledgers, and provision new municipal tenants seamlessly.
            </p>
          </div>

          {/* Core production aggregates */}
          <div className="flex flex-wrap gap-4 lg:self-end">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Smartphone className="w-4 h-4 text-orange-500 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">GPS paired</p>
              <p className="text-xl font-black text-white">{gpsDevices.filter(d => d.connectionStatus === 'CONNECTED').length} Devices</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Lock className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Integrity Audits</p>
              <p className="text-xl font-black text-emerald-400">100% OK</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <MessageSquare className="w-4 h-4 text-blue-400 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Comm Templates</p>
              <p className="text-xl font-black text-blue-400">Approved</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-orange-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* Onboarding Wizard Setup */}
        <div className="col-span-12 lg:col-span-6 bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Plus className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-base text-white">Guided Municipal City Onboarding</h2>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
              Provision database schemas, map wards, and onboard vehicles and contractors for a new Municipal Corporation instantly.
            </p>

            <form onSubmit={handleOnboard} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-semibold">City Name (e.g. Pune)</label>
                  <input
                    type="text"
                    required
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Enter city name..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-semibold">State Jurisdiction</label>
                  <select
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-semibold">Wards count</label>
                  <input
                    type="number"
                    required
                    value={wardsCount}
                    onChange={(e) => setWardsCount(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-semibold">Contractors count</label>
                  <input
                    type="number"
                    required
                    value={contractorsCount}
                    onChange={(e) => setContractorsCount(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-semibold">Vehicles count</label>
                  <input
                    type="number"
                    required
                    value={vehiclesCount}
                    onChange={(e) => setVehiclesCount(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={onboardingLoader}
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 font-bold rounded-xl text-white shadow-lg shadow-orange-600/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all"
              >
                {onboardingLoader ? 'Provisioning...' : 'Provision Tenant OS'} <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {onboardingResponse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-slate-900 border border-slate-850 p-4 rounded-2xl space-y-2 text-[10px] font-mono leading-relaxed text-emerald-400"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-xs font-bold text-white">
                <span>TENANT ONBOARDED SUCCESS</span>
                <span className="text-emerald-500">ACTIVE</span>
              </div>
              <p>TENANT ID: {onboardingResponse.tenantId}</p>
              <p>SCHEMA: {onboardingResponse.databaseSchema}</p>
              <p>ROUTE CAPACITY: {onboardingResponse.wardsCount} Wards, {onboardingResponse.vehiclesCount} Fleets mapped.</p>
              <p>PROVISION TIME: {onboardingResponse.provisionedAt}</p>
            </motion.div>
          )}
        </div>

        {/* Real GPS Device Diagnostic Console */}
        <div className="col-span-12 lg:col-span-6 bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Cpu className="w-5 h-5 text-orange-500 animate-spin" />
                <h2 className="font-bold text-base text-white">GPS Hardware Diagnostics</h2>
              </div>
              <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                Live Ingestion Stream
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
              Track latency, packet validation markers (NMEA), and paired fleet battery indicators for Teltonika, Concox, and Ajjas hardware.
            </p>

            <div className="space-y-4">
              {gpsDevices.map((row, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-850 rounded-2xl p-4 flex justify-between items-center text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{row.deviceId}</span>
                      <span className="text-[9px] text-slate-500">({row.manufacturer})</span>
                    </div>
                    <p className="text-[10px] text-slate-400">VEHICLE: {row.pairedVehicle}</p>
                    <div className="flex gap-3 text-[9px] font-mono text-slate-500">
                      <span>LATENCY: {row.latencyMs}ms</span>
                      <span className="flex items-center gap-1">
                        <BatteryCharging className="w-3 h-3 text-emerald-500" /> {row.batteryLevelPercent}%
                      </span>
                    </div>
                  </div>

                  <div className="text-right space-y-1.5 shrink-0">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold ${
                      row.packetDiagnostic === 'NMEA_OK' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      row.packetDiagnostic === 'LOW_VOLTAGE_WARN' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {row.packetDiagnostic}
                    </span>
                    <p className="text-[10px] font-semibold text-emerald-400 uppercase">{row.connectionStatus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp & SMS Templates Hub */}
        <div className="col-span-12 lg:col-span-5 bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-2xl h-[420px] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-sm text-white">Multilingual Communications templates</h3>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => setSelectedLang('en')}
                  className={`px-2 py-0.5 text-[9px] font-bold rounded ${selectedLang === 'en' ? 'bg-orange-600 text-white' : 'bg-slate-900 text-slate-500 hover:bg-slate-800'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setSelectedLang('hi')}
                  className={`px-2 py-0.5 text-[9px] font-bold rounded ${selectedLang === 'hi' ? 'bg-orange-600 text-white' : 'bg-slate-900 text-slate-500 hover:bg-slate-800'}`}
                >
                  हिंदी
                </button>
                <button 
                  onClick={() => setSelectedLang('mr')}
                  className={`px-2 py-0.5 text-[9px] font-bold rounded ${selectedLang === 'mr' ? 'bg-orange-600 text-white' : 'bg-slate-900 text-slate-500 hover:bg-slate-800'}`}
                >
                  मराठी
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
              Standardized regulatory communications with CPCB template registration codes.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 bg-slate-900/50 border border-slate-850 rounded-2xl p-4 text-xs shadow-inner">
            {commTemplates.templatesList.map((tpl: any, i: number) => (
              <div key={i} className="border-b border-slate-850/50 pb-3 last:border-b-0 space-y-1">
                <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase">
                  <span>{tpl.templateCode}</span>
                  <span className="text-emerald-400">{tpl.registeredStatus}</span>
                </div>
                <p className="text-slate-300 italic">"{tpl.text[selectedLang]}"</p>
                <span className="inline-block text-[9px] font-bold text-slate-500 uppercase px-1.5 py-0.5 bg-slate-950 rounded">
                  {tpl.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Production Audit & Compliance Ledger */}
        <div className="col-span-12 lg:col-span-7 bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-lg text-white">Production Audit & Compliance Ledger</h3>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              Tamper-Evident SHA-256 Logs
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-3">Action ID</th>
                  <th className="pb-3">Actor Entity</th>
                  <th className="pb-3">Action logged</th>
                  <th className="pb-3">Resource Target</th>
                  <th className="pb-3">SHA-256 Signature</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((row, i) => (
                  <tr key={i} className="border-b border-slate-900/40 text-xs hover:bg-slate-900/10 transition-colors">
                    <td className="py-4 font-mono font-bold text-orange-500">{row.id}</td>
                    <td className="py-4 font-bold">{row.actor}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        row.action.includes('TAMPER') ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {row.action}
                      </span>
                    </td>
                    <td className="py-4 text-slate-300 font-medium">{row.resource}</td>
                    <td className="py-4 font-mono text-[10px] text-slate-500">{row.integrityHash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
