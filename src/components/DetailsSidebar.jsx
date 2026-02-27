import React from 'react';

const DetailsSidebar = ({ city, onClose, darkMode, onViewReport }) => {
  // Se non c'è nessuna città selezionata, non renderizziamo nulla
  if (!city) return null;

  return (
    <div className={`fixed top-0 right-0 w-full md:w-[380px] h-full shadow-2xl z-[3000] transition-transform duration-500 ease-in-out border-l backdrop-blur-2xl
      ${darkMode 
        ? 'bg-slate-900/95 border-white/10 text-white' 
        : 'bg-white/95 border-slate-200 text-slate-900'}`}>
      
      {/* Tasto chiusura */}
      <button 
        onClick={onClose} 
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white z-10 transition-colors"
      >
        ✕
      </button>

      <div className="h-full flex flex-col overflow-y-auto">
        {/* Immagine testata */}
        <div className="relative h-64 flex-shrink-0">
          <img 
            src={city.img} 
            className="w-full h-full object-cover" 
            alt={city.name} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-4xl font-black tracking-tight">{city.name}</h2>
            <p className="text-[#00ffcc] font-bold uppercase text-xs tracking-widest">{city.country}</p>
          </div>
        </div>

        {/* Contenuto */}
        <div className="p-8 flex-grow">
          <div className="mb-8">
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {city.desc}
            </p>
          </div>

          {/* Box Statistiche / Trend */}
          <div className={`p-6 rounded-2xl border mb-8 ${
            darkMode 
              ? 'bg-white/5 border-white/10' 
              : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2 block">
              Trend Proiettato 2026
            </span>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📈</span>
              <span className="text-2xl font-black text-[#6d4aff]">
                {city.trend}
              </span>
            </div>
          </div>

          {/* Call to Action */}
          <button 
            onClick={onViewReport}
            className="w-full py-5 bg-[#6d4aff] text-white rounded-2xl font-black text-xl shadow-xl shadow-[#6d4aff]/30 hover:bg-[#5a39e6] hover:scale-[1.02] transition-all active:scale-95"
          >
          Visualizza AI Report
          </button>
        </div>

        <div className="p-6 text-center border-t border-white/5 opacity-30 text-[10px]">
          Sorgente dati: SummerWindow Analytics
        </div>
      </div>
    </div>
  );
};

export default DetailsSidebar;