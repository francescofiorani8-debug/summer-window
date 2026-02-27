import React, { useState } from 'react';

const Sidebar = ({ cities = [], onSelectCity, onGoHome, darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside 
      className={`w-[330px] h-full transition-all duration-500 flex flex-col z-[1000] backdrop-blur-xl border-r ${
        darkMode 
          ? 'bg-slate-900/85 border-white/10 text-white shadow-2xl' 
          : 'bg-white/95 border-slate-200 text-slate-900 shadow-lg'
      }`}
    >
      <div className="p-6 pt-10">
        <button 
          onClick={onGoHome}
          className="text-[#6d4aff] font-bold text-sm mb-4 transition-transform hover:scale-105 flex items-center gap-2"
        >
          ← Torna alla Home
        </button>
        
        <div className="mb-6">
          <h1 className={`text-2xl font-black text-center tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-800'
          }`}>
            SummerWindow
          </h1>
          <p className="text-[9px] text-center uppercase tracking-widest text-[#6d4aff] font-bold mt-1">
            Risultati Algoritmo 2026
          </p>
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="Cerca tra i tuoi match..."
            className={`w-full p-3 text-sm rounded-xl outline-none transition-all border ${
              darkMode 
                ? 'bg-white/5 border-white/10 text-white focus:border-[#6d4aff]' 
                : 'bg-slate-100 border-slate-200 text-slate-900 focus:border-[#6d4aff] focus:bg-white'
            }`}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute right-3 top-3 opacity-30">🔍</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-4 custom-scrollbar">
        {filteredCities.map(city => {
          // --- FIX LOGICO ---
          // Usiamo direttamente il valore percentuale (0-100) calcolato in App.jsx
          const displayPercentage = city.matchScore || 0;
          
          // Calcoliamo i puntini (max 10) dividendo per 10 e arrotondando per difetto
          // Questo evita il RangeError: Invalid array length
          const dotsCount = Math.min(Math.floor(displayPercentage / 10), 10);

          return (
            <div 
              key={city.name}
              onClick={() => onSelectCity(city)}
              className="h-28 rounded-2xl relative overflow-hidden cursor-pointer group border border-transparent hover:border-[#6d4aff] transition-all duration-300 shadow-sm"
              style={{ backgroundImage: `url(${city.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className={`absolute inset-0 flex flex-col justify-center p-5 transition-all duration-300 ${
                darkMode 
                  ? 'bg-black/60 group-hover:bg-black/40' 
                  : 'bg-slate-900/40 group-hover:bg-slate-900/20'
              }`}>
                <div className="transform transition-transform group-hover:translate-x-2 w-full">
                  <div className="flex justify-between items-start mb-1">
                    <b className="text-white text-lg drop-shadow-md block leading-none">{city.name}</b>
                    
                    {/* Badge Percentuale: ora mostra il valore reale 0-100% */}
                    <span className="bg-[#6d4aff] text-[9px] text-white px-2 py-1 rounded-md font-black uppercase shadow-lg shadow-[#6d4aff]/40">
                      {displayPercentage}% Match
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[#00ffcc] text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Dettagli Trend
                    </span>
                    
                    {/* Indicatori di affinità sicuri: max 10 pallini */}
                    <div className="flex gap-0.5 opacity-60">
                      {[...Array(dotsCount)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-[#00ffcc] rounded-full"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredCities.length === 0 && (
          <div className="text-center py-10 px-4">
            <p className="opacity-50 text-sm italic mb-2">Nessuna affinità trovata.</p>
            <button onClick={onGoHome} className="text-[#6d4aff] text-xs font-bold underline italic">
              Ricalibra il profilo quiz
            </button>
          </div>
        )}
      </div>

      <div className={`p-6 text-center text-[10px] uppercase tracking-[0.2em] font-bold border-t ${
        darkMode ? 'text-slate-500 border-white/5' : 'text-slate-400 border-slate-100'
      }`}>
        AI Scoring System v1.0
      </div>
    </aside>
  );
};

export default Sidebar;