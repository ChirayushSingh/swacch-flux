"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Building2, 
  Map, 
  Activity, 
  Users, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles,
  Search,
  ArrowRight,
  TrendingUp,
  Sliders,
  Play,
  Download,
  BookOpen,
  Send,
  Zap,
  Globe,
  Gauge
} from "lucide-react";
import apiClient from "@/lib/api-client";

export default function DemoOS() {
  const [municipalities, setMunicipalities] = useState<any[]>([]);
  const [simulatedVehicles, setSimulatedVehicles] = useState<any[]>([]);
  const [billingReports, setBillingReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Active highlighted entities
  const [activeCity, setActiveCity] = useState<any>(null);
  const [activeSim, setActiveSim] = useState<any>(null);

  // Sales CRM Onboarding form state
  const [cityNameInput, setCityNameInput] = useState("");
  const [fleetSizeInput, setFleetSizeInput] = useState("");
  const [tonnageInput, setTonnageInput] = useState("");
  const [currentSoftwareInput, setCurrentSoftwareInput] = useState("");
  const [crmLeads, setCrmLeads] = useState<any[]>([
    {
      city: 'Thane Municipal Corporation',
      fleetSize: 420,
      dailyTonnage: 650,
      currentSoftware: 'Legacy Excel / None',
      status: 'DEMO_COMPLETED'
    },
    {
      city: 'Navi Mumbai',
      fleetSize: 310,
      dailyTonnage: 520,
      currentSoftware: 'Standalone GPS tracking',
      status: 'PILOT_ACTIVE'
    }
  ]);
  const [crmMessage, setCrmMessage] = useState("");

  const fetchDemoData = async () => {
    try {
      const [munRes, simRes, billRes] = await Promise.all([
        apiClient.get('/demo/municipalities'),
        apiClient.get('/demo/gps-simulation'),
        apiClient.get('/demo/billing-reports')
      ]);
      setMunicipalities(munRes.data);
      setSimulatedVehicles(simRes.data);
      setBillingReports(billRes.data);

      if (munRes.data.length > 0) setActiveCity(munRes.data[0]);
      if (simRes.data.length > 0) setActiveSim(simRes.data[0]);
    } catch (error) {
      console.error("Demo Ingest Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemoData();
  }, []);

  const handleOnboardRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityNameInput) return;

    try {
      const res = await apiClient.post('/demo/onboarding-request', {
        city: cityNameInput,
        fleetSize: parseInt(fleetSizeInput) || 0,
        dailyTonnage: parseFloat(tonnageInput) || 0,
        currentSoftware: currentSoftwareInput
      });
      setCrmLeads(res.data);
      setCityNameInput("");
      setFleetSizeInput("");
      setTonnageInput("");
      setCurrentSoftwareInput("");
      setCrmMessage("GovTech CRM: Municipality Lead registered successfully!");
      setTimeout(() => setCrmMessage(""), 3000);
    } catch (error) {
      console.error("Onboarding Submit Error:", error);
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
      
      {/* Dynamic Demo Command Banner */}
      <div className="bg-slate-950 border border-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 text-[10px] font-bold rounded-full border border-orange-500/20 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-orange-500 animate-pulse" /> Live GovTech Demo & Onboarding OS
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">Live GovTech Demo OS</h1>
            <p className="text-slate-400 text-xs max-w-xl">
              India's live municipal demonstration and sales enablement platform. Controls rotating command layouts, streams simulated high-frequency dumper playbacks, and processes CRM onboarding pilots.
            </p>
          </div>

          {/* Core sales and pilot indicators */}
          <div className="flex flex-wrap gap-4 lg:self-end">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Building2 className="w-4 h-4 text-orange-500 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Demo Cities</p>
              <p className="text-xl font-black text-white">{municipalities.length} Seeded</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Activity className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Active Pipelines</p>
              <p className="text-xl font-black text-emerald-400">{crmLeads.length} Pilots</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <TrendingUp className="w-4 h-4 text-blue-400 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Est. Subscription</p>
              <p className="text-xl font-black text-blue-400">₹4.2 Cr/yr</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-orange-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* Interactive Live GPS compactor GIS Simulator */}
        <div className="col-span-12 lg:col-span-8 bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Map className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-base text-white">Live GPS Compactor Telemetry Simulator</h2>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              Live GIS Playback
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            {/* Telemetry log list */}
            <div className="md:col-span-1 border-r border-slate-900 pr-4 space-y-3 overflow-y-auto">
              {simulatedVehicles.map((row, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveSim(row)}
                  className={`bg-slate-900/40 border border-slate-900 rounded-2xl p-3 cursor-pointer hover:bg-slate-900/10 transition-colors ${activeSim?.vehicleNo === row.vehicleNo ? 'border-orange-500/40 bg-slate-900/20' : ''}`}
                >
                  <h4 className="font-mono font-bold text-white text-xs">{row.vehicleNo}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{row.model}</p>
                </div>
              ))}
            </div>

            {/* Simulated moving compactor visualization */}
            {activeSim && (
              <div className="md:col-span-2 flex flex-col justify-between font-mono text-[11px] bg-black/60 border border-slate-900 rounded-2xl p-6 shadow-inner">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase">Current Position:</span>
                    <h3 className="font-black text-white text-sm mt-0.5">{activeSim.currentLocation}</h3>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                    activeSim.speedKmph > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'
                  }`}>
                    {activeSim.speedKmph > 0 ? `Moving: ${activeSim.speedKmph} km/h` : 'Idle Stop'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-slate-850 pt-4 text-xs">
                  <div>
                    <span className="text-[9px] text-slate-500 block mb-0.5">Route Compliance:</span>
                    <span className="font-black text-white">{activeSim.routeCompliancePercent}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block mb-0.5">Fuel Level:</span>
                    <span className="font-black text-orange-400">{activeSim.fuelPercent}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block mb-0.5">Driver:</span>
                    <span className="font-bold text-slate-300">{activeSim.driverName}</span>
                  </div>
                </div>

                <div className="border-t border-slate-850 pt-4 flex justify-between items-center text-[10px] text-emerald-400 font-bold">
                  <span>ACTIVE TARGET TRIP ID:</span>
                  <span>{activeSim.activeTrip}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Municipal Onboarding Sales CRM Desk */}
        <div className="col-span-12 lg:col-span-4 bg-slate-900/40 border border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col h-[400px] justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Sliders className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-base text-white">Pilot Onboarding CRM</h2>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
              Register new municipal corporations for pilot trials. Generates pricing models and assigns dedicated onboarding officers instantly.
            </p>

            <form onSubmit={handleOnboardRequest} className="space-y-3">
              <input
                type="text"
                placeholder="Municipality Name (e.g. Thane)"
                value={cityNameInput}
                onChange={(e) => setCityNameInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Fleet Size"
                  value={fleetSizeInput}
                  onChange={(e) => setFleetSizeInput(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Waste Tons"
                  value={tonnageInput}
                  onChange={(e) => setTonnageInput(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-xs font-bold text-white rounded-xl shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
              >
                Log Onboarding Request <Send className="w-3 h-3" />
              </button>
            </form>
          </div>

          {crmMessage && (
            <div className="bg-slate-950 border border-slate-900 rounded-2xl p-2.5 text-[9px] font-mono text-emerald-400 text-center animate-pulse">
              {crmMessage}
            </div>
          )}
        </div>

        {/* Seeded Municipalities Grid */}
        <div className="col-span-12 lg:col-span-7 bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-lg text-white">Seeded GovTech Municipal Environments</h3>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              Real Wards & Routes
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-3">Municipal Corporation</th>
                  <th className="pb-3">Code</th>
                  <th className="pb-3">Active Wards</th>
                  <th className="pb-3">Fleet Size</th>
                  <th className="pb-3">Daily Tonnage</th>
                  <th className="pb-3 text-right">Diversion Rate</th>
                </tr>
              </thead>
              <tbody>
                {municipalities.map((row, i) => (
                  <tr key={i} className="border-b border-slate-900/40 text-xs hover:bg-slate-900/10 transition-colors">
                    <td className="py-4 font-bold text-white">{row.name}</td>
                    <td className="py-4 font-mono text-slate-400">{row.code}</td>
                    <td className="py-4 text-slate-300">{row.activeWards} Wards</td>
                    <td className="py-4 text-slate-300">{row.activeVehicles} Trucks</td>
                    <td className="py-4 font-bold text-white">{row.dailyTonnage} Tons</td>
                    <td className="py-4 text-right font-black text-emerald-400">{row.diversionRatePercent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Onboarding CRM Pipeline Track */}
        <div className="col-span-12 lg:col-span-5 bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-2xl h-[380px] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-orange-500 animate-pulse" />
              <h3 className="font-bold text-sm text-white">Active Onboarding CRM Pipelines</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
              Track the subscription sales progress, target fleet estimates, and setup configurations for active cities.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[10px] bg-black/60 border border-slate-900 rounded-2xl p-4 shadow-inner">
            {crmLeads.map((row, i) => (
              <div key={i} className="border-l border-orange-500/40 pl-2 py-0.5 space-y-1">
                <div className="flex justify-between items-center text-slate-500 text-[9px] font-bold">
                  <span>{row.city}</span>
                  <span className={`px-2 py-0.5 rounded text-[8px] ${
                    row.status === 'PILOT_ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                  }`}>{row.status}</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Est. Fleet: {row.fleetSize} Trucks</span>
                  <span>Daily Tonnage: {row.dailyTonnage} Tons</span>
                </div>
                <div className="flex justify-between text-[8px] text-slate-500 uppercase">
                  <span>Current Tech: {row.currentSoftware}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Downloadable CPCB Exporters Centre */}
        <div className="col-span-12 bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-lg text-white">CPCB Tender-Ready PDF / Excel Center</h3>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              Certified Exports
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {billingReports.map((row, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-base text-white">{row.contractorName}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{row.targetMunicipality}</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-orange-500">
                    {row.invoiceNo}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs font-mono border-t border-slate-850 pt-4">
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Gross Payout</p>
                    <p className="font-bold text-white">₹{(row.grossPayout / 100000).toFixed(2)} Lakhs</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Deductions</p>
                    <p className="font-bold text-rose-400">₹{(row.deductionsGps / 100000).toFixed(2)} Lakhs</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Net Payout</p>
                    <p className="font-bold text-emerald-400">₹{(row.netPayout / 100000).toFixed(2)} Lakhs</p>
                  </div>
                </div>

                <div className="border-t border-slate-850 pt-4 flex justify-between items-center">
                  <span className="text-[9px] font-bold text-slate-400">Route Misses: {row.missedGeofences} Geofences</span>
                  <button className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all">
                    Download Certified PDF <Download className="w-3.5 h-3.5 text-orange-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
