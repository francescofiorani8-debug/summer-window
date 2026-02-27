import React, { useState, useMemo } from 'react';
import { packingRules } from '../data/packing';

// --- COMPONENTE RADAR (DNA DELLA CITTÀ) ---
const VibeRadar = ({ data, darkMode }) => {
  // Definiamo i 5 assi del radar
  const points = [
    { label: "Nightlife", value: data?.nightlife || 60, angle: 0 },
    { label: "Culture", value: data?.culture || 70, angle: 72 },
    { label: "Nature", value: data?.nature || 50, angle: 144 },
    { label: "Relax", value: data?.relax || 50, angle: 216 },
    { label: "Food", value: data?.food || 80, angle: 288 },
  ];

  const radius = 100;
  const centerX = 100;
  const centerY = 100;

  // Funzioni matematiche per calcolare le coordinate SVG
  const getX = (val, angle, r) => centerX + (r * (val / 100)) * Math.cos((angle - 90) * Math.PI / 180);
  const getY = (val, angle, r) => centerY + (r * (val / 100)) * Math.sin((angle - 90) * Math.PI / 180);

  const polygonPoints = points.map(p => `${getX(p.value, p.angle, radius)},${getY(p.value, p.angle, radius)}`).join(" ");

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <svg width="220" height="220" viewBox="-30 -30 260 260" className="overflow-visible">
        {/* Ragnatela di sfondo */}
        {[25, 50, 75, 100].map(r => (
          <circle key={r} cx={centerX} cy={centerY} r={r} fill="none" 
            stroke={darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"} strokeWidth="1" />
        ))}
        {/* Assi radiali */}
        {points.map((p, i) => (
          <line key={i} x1={centerX} y1={centerY} x2={getX(100, p.angle, radius)} y2={getY(100, p.angle, radius)}
            stroke={darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"} />
        ))}
        {/* Area del Vibe */}
        <polygon points={polygonPoints} fill="#6d4aff" fillOpacity="0.35" stroke="#6d4aff" strokeWidth="2.5" />
        {/* Etichette */}
        {points.map((p, i) => (
          <text key={i} x={getX(125, p.angle, radius)} y={getY(125, p.angle, radius)}
            textAnchor="middle" fontSize="10" fontWeight="900" 
            fill={darkMode ? "#94a3b8" : "#64748b"} className="uppercase tracking-tighter italic">
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
};

// --- COMPONENTE PRINCIPALE CITYREPORT ---
const CityReport = ({ city, darkMode, onBack, onGoHome }) => {
  const textColor = darkMode ? 'text-white' : 'text-black';
  const subTextColor = darkMode ? 'text-slate-400' : 'text-slate-600';
  const cardBg = darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200';

  const [checkedItems, setCheckedItems] = useState({});
  const [copied, setCopied] = useState(false);

  // Generazione Smart Packing List
  const smartItems = useMemo(() => {
    const month = city.bestMonths[0].toLowerCase();
    const coldMonths = ["dicembre", "gennaio", "febbraio", "marzo", "ottobre", "novembre"];
    const climateKey = coldMonths.includes(month) ? 'cold' : 'hot';

    const combined = [
      ...(packingRules[city.tags.type] || []),
      ...(packingRules[climateKey] || [])
    ];
    return combined.sort(() => 0.5 - Math.random()).slice(0, 9);
  }, [city]);

  const copyToClipboard = () => {
    const text = `SummerWindow Checklist - ${city.name}:\n` + smartItems.map(i => `- ${i}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Statistiche (Fix: city.matchScore è già in base 100)
  const stats = [
    { label: "Affinità Profilo", value: city.matchScore + "%", color: "bg-[#6d4aff]" },
    { label: "Indice di Vivibilità", value: "88%", color: "bg-[#00ffcc]" },
    { label: "Trend Social 24h", value: "+12.4%", color: "bg-[#76c876]" },
  ];

  return (
    <div className={`fixed inset-0 z-[9000] overflow-y-auto p-4 md:p-12 transition-colors duration-700
      ${darkMode ? 'bg-[#0b0e11]' : 'bg-white'}`}>
      
      {/* Navigazione */}
      <nav className="max-w-6xl mx-auto flex justify-between items-center mb-16">
        <button onClick={onBack} className="text-[#6d4aff] font-bold flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
          ← Back to Explorer
        </button>
        <button onClick={onGoHome} className={`font-black tracking-tighter text-2xl ${textColor}`}>
          SummerWindow<span className="text-[#6d4aff]">.</span>
        </button>
      </nav>

      <main className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 items-start">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6d4aff]/10 border border-[#6d4aff]/20 text-[#6d4aff] text-[10px] font-black uppercase tracking-widest mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6d4aff] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6d4aff]"></span>
              </span>
              Live AI Analysis 2026
            </div>
            <h1 className={`text-7xl md:text-9xl font-black tracking-tighter leading-none mb-6 ${textColor}`}>
              {city.name}
            </h1>
            <p className={`text-2xl font-bold opacity-50 ${textColor}`}>{city.country} — Optimal Season: {city.bestMonths.join(', ')}</p>
          </div>
          
          <div className={`${cardBg} border p-8 rounded-[3rem] flex flex-col items-center justify-center text-center shadow-xl`}>
            <p className={`text-xs font-black uppercase tracking-widest mb-2 ${subTextColor}`}>Growth Prediction</p>
            <p className="text-5xl font-black text-[#00ffcc] tracking-tighter">{city.trend}</p>
            <div className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-full mt-6 overflow-hidden">
               <div className="h-full bg-[#00ffcc] w-[85%] animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className={`${cardBg} border p-8 rounded-[2.5rem]`}>
              <p className={`text-sm font-bold mb-1 ${subTextColor}`}>{stat.label}</p>
              <p className={`text-3xl font-black ${textColor}`}>{stat.value}</p>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-white/5 rounded-full mt-4 overflow-hidden">
                <div 
                  className={`h-full ${stat.color} rounded-full transition-all duration-1000`} 
                  style={{ width: stat.value }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Smart Packing List Section */}
        <div className={`${cardBg} border p-8 md:p-12 rounded-[3.5rem] mb-16 shadow-xl relative overflow-hidden`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-[#6d4aff] rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-[#6d4aff]/30">🎒</div>
              <div>
                <h3 className={`text-3xl font-black tracking-tighter ${textColor}`}>Smart Packing List</h3>
                <p className={`text-sm font-bold uppercase tracking-widest text-[#6d4aff]`}>AI Suggested for {city.name}</p>
              </div>
            </div>
            <button 
              onClick={copyToClipboard}
              className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all
                ${copied ? 'bg-[#00ffcc] text-black' : 'bg-[#6d4aff] text-white hover:scale-105'}`}
            >
              {copied ? 'Copied! ✓' : 'Copy List to Notes'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {smartItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }))}
                className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all duration-300 text-left
                  ${checkedItems[item] 
                    ? 'border-[#00ffcc] bg-[#00ffcc]/10 opacity-60' 
                    : darkMode ? 'bg-white/5 border-transparent hover:border-[#6d4aff]' : 'bg-white border-transparent shadow-sm hover:border-[#6d4aff]'}`}
              >
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors
                  ${checkedItems[item] ? 'bg-[#00ffcc] border-[#00ffcc]' : 'border-slate-400'}`}>
                  {checkedItems[item] && <span className="text-white text-[10px]">✓</span>}
                </div>
                <span className={`font-bold text-sm ${textColor}`}>{item}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Intelligence, Radar & Image Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            {/* Radar Card */}
            <div className={`${cardBg} border p-10 rounded-[3.5rem] flex flex-col md:flex-row items-center gap-8`}>
              <div className="flex-1">
                <h3 className={`text-2xl font-black mb-2 ${textColor}`}>City DNA Radar</h3>
                <p className={`text-sm font-medium ${subTextColor} mb-4 italic`}>Analisi delle vibrazioni urbane basata sui Big Data del 2026.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-[#6d4aff]/10 text-[#6d4aff] text-[9px] font-bold rounded-md uppercase">Vibe-Check: OK</span>
                </div>
              </div>
              <VibeRadar data={city.vibeData} darkMode={darkMode} />
            </div>

            {/* Insights Card */}
            <div className={`${cardBg} border p-10 rounded-[3.5rem]`}>
              <h3 className={`text-2xl font-black mb-6 ${textColor}`}>Intelligence Insights</h3>
              <p className={`text-xl leading-relaxed font-medium ${subTextColor}`}>
                {city.desc}
              </p>
            </div>
          </div>

          {/* City Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#6d4aff]/20 blur-[100px] group-hover:blur-[150px] transition-all opacity-50"></div>
            <img 
              src={city.img} 
              alt={city.name} 
              className="relative w-full h-full min-h-[500px] object-cover rounded-[4rem] shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        {/* Footer Section */}
        <footer className="py-20 flex flex-col items-center border-t border-slate-200 dark:border-white/10">
          <p className={`text-xs uppercase tracking-[0.5em] font-black opacity-20 mb-8 ${textColor}`}>
            SummerWindow Global Database Access — 2026.02.28
          </p>
          <button 
            onClick={onGoHome}
            className="px-10 py-4 bg-transparent border-2 border-[#6d4aff] text-[#6d4aff] rounded-full font-black hover:bg-[#6d4aff] hover:text-white transition-all shadow-lg hover:shadow-[#6d4aff]/20"
          >
            Start New Analysis
          </button>
        </footer>
      </main>
    </div>
  );
};

export default CityReport;