import React from 'react';
import { 
  LayoutDashboard, BarChart2, Brain, Bell, Map, 
  Database, Droplets, Thermometer, Wind, Power, AlertTriangle 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';

const AquaMindDashboard = () => {
  const data = [
    { time: 1, value: 45 }, { time: 2, value: 42 },
    { time: 3, value: 38 }, { time: 4, value: 32 },
    { time: 5, value: 85 }, { time: 6, value: 88 },
    { time: 7, value: 86 }, { time: 8, value: 82 },
  ];

  return (
    <div className="flex h-screen bg-[#0a1a14] text-gray-300 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-emerald-900/30 flex flex-col p-6 space-y-8">
        <div className="flex items-center gap-3 text-emerald-400 font-bold text-xl">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-[#0a1a14] rounded-full"></div>
          </div>
          AquaMind
        </div>
        
        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <NavItem icon={<BarChart2 size={20}/>} label="Analytics" />
          <NavItem icon={<Brain size={20}/>} label="AI Decision" />
          <NavItem icon={<Bell size={20}/>} label="Alerts" />
          <NavItem icon={<Map size={20}/>} label="Farm Zones" />
          <NavItem icon={<Database size={20}/>} label="Data Quality" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-end items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            System Online
          </div>
          <div className="w-10 h-10 bg-emerald-900/50 rounded-full flex items-center justify-center border border-emerald-500/30">
            <span className="text-xs">JD</span>
          </div>
        </header>

        {/* Metric Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <MetricCard label="Soil Moisture" value="32%" status="Normal" icon={<Droplets className="text-emerald-400" />} />
          <MetricCard label="Temperature" value="28°C" icon={<Thermometer className="text-emerald-400" />} />
          <MetricCard label="Humidity" value="65%" icon={<Wind className="text-emerald-400" />} />
          <MetricCard label="Pump Status" value="ON" status="Active" icon={<Power className="text-emerald-400" />} />
        </div>

        {/* System Insight Alert */}
        <div className="bg-[#12241d] border border-yellow-700/40 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 text-yellow-500 mb-2 font-semibold">
            <AlertTriangle size={18} /> System Insight
          </div>
          <h3 className="text-xl font-bold text-white mb-1">⚠️ Sensor Anomaly Detected</h3>
          <p className="text-gray-400 text-sm mb-4">Moisture readings inconsistent with environmental conditions</p>
          <div className="space-y-1">
            <div className="flex justify-between text-xs mb-1">
              <span>Confidence</span>
              <span>87%</span>
            </div>
            <div className="w-full bg-emerald-900/30 h-1.5 rounded-full overflow-hidden">
              <div className="bg-yellow-500 h-full w-[87%] shadow-[0_0_10px_#eab308]"></div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-[#12241d] rounded-xl p-6 h-80">
          <h3 className="text-lg font-bold text-white mb-6">Soil Moisture Over Time</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a332a" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={[0, 100]} stroke="#4b5563" />
              <ReferenceLine y={60} label={{ position: 'right', value: 'Anomaly Zone', fill: '#ef4444', fontSize: 10 }} stroke="#ef4444" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-emerald-900/40 text-emerald-400' : 'hover:bg-emerald-900/20'}`}>
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

const MetricCard = ({ label, value, status, icon }) => (
  <div className="bg-[#1a2e26] p-6 rounded-xl border border-emerald-900/20">
    <div className="flex justify-between items-start mb-4">
      <span className="text-gray-400 font-medium">{label}</span>
      <div className="bg-emerald-900/40 p-2 rounded-lg">{icon}</div>
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    {status && <div className="text-emerald-400 text-xs">Status: <span className="font-semibold">{status}</span></div>}
  </div>
);

export default AquaMindDashboard;