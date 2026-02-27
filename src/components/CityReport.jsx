import React from 'react';

const CityReport = ({ city, darkMode, onBack, onGoHome }) => {
  const textColor = darkMode ? 'text-white' : 'text-black';
  const subTextColor = darkMode ? 'text-slate-400' : 'text-slate-600';
  const cardBg = darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200';

  // Statistiche simulate basate sul matchScore
  const stats = [
    { label: "Affinità Profilo", value: Math.round((city.matchScore / 10) * 100) + "%", color: "bg-[#6d4aff]" },
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
        {/* Header Report */}
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

        {/* Sezione Statistiche e Grafici */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className={`${cardBg} border p-8 rounded-[2.5rem]`}>
              <p className={`text-sm font-bold mb-1 ${subTextColor}`}>{stat.label}</p>
              <p className={`text-3xl font-black ${textColor}`}>{stat.value}</p>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-white/5 rounded-full mt-4">
                <div className={`h-full ${stat.color} rounded-full`} style={{ width: stat.value }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Content & Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className={`${cardBg} border p-10 rounded-[3.5rem]`}>
              <h3 className={`text-2xl font-black mb-6 ${textColor}`}>Intelligence Insights</h3>
              <p className={`text-xl leading-relaxed font-medium ${subTextColor}`}>
                {city.desc}
              </p>
            </div>
            
            {/* Grafico a barre stilizzato per la folla (Crowd Index) */}
            <div className={`${cardBg} border p-10 rounded-[3.5rem]`}>
              <h3 className={`text-xl font-black mb-8 ${textColor}`}>Crowd Density Projection</h3>
              <div className="flex items-end gap-3 h-32">
                {[40, 60, 45, 90, 100, 80, 50, 30].map((h, i) => (
                  <div key={i} className="flex-1 group relative">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-500 ${i === 3 ? 'bg-[#6d4aff]' : 'bg-[#6d4aff]/20'}`} 
                      style={{ height: `${h}%` }}
                    ></div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold opacity-30">M{i+1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-[#6d4aff]/20 blur-[100px] group-hover:blur-[150px] transition-all opacity-50"></div>
            <img 
              src={city.img} 
              alt={city.name} 
              className="relative w-full h-full min-h-[500px] object-cover rounded-[4rem] shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        {/* Footer Report */}
        <footer className="py-20 flex flex-col items-center border-t border-slate-200 dark:border-white/10">
          <p className={`text-xs uppercase tracking-[0.5em] font-black opacity-20 mb-8 ${textColor}`}>
            SummerWindow Global Database Access — 2026.02.27
          </p>
          <button 
            onClick={onGoHome}
            className="px-10 py-4 bg-transparent border-2 border-[#6d4aff] text-[#6d4aff] rounded-full font-black hover:bg-[#6d4aff] hover:text-white transition-all"
          >
            Start New Analysis
          </button>
        </footer>
      </main>
    </div>
  );
};

export default CityReport;