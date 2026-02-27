import React, { useState } from 'react';

const HomeOverview = ({ onGoToMap, onResetQuiz, toggleTheme, darkMode, userPrefs, recommendedCount, bestMatch, onLogoClick }) => {
  // Stato per gestire quale tool è aperto nel popup
  const [activeTool, setActiveTool] = useState(null);

  const tools = [
    {
      title: "Analisi Big Data",
      icon: "📊",
      desc: "Dati estratti da tendenze globali.",
      longDesc: "Il nostro algoritmo setaccia milioni di post sui social, prenotazioni aeree e ricerche Google per identificare i pattern di viaggio prima che diventino virali. Nel 2026, la precisione ha raggiunto il 94%."
    },
    {
      title: "Mapping",
      icon: "📍",
      desc: "Precisione millimetrica su scala mondiale.",
      longDesc: "Non solo coordinate, ma analisi spaziale. Integriamo dati geolocalizzati per mostrarti esattamente dove si sta spostando il baricentro del turismo mondiale, dalle coste albanesi alle vette asiatiche."
    },
    {
      title: "Trends AI",
      icon: "✨",
      desc: "Insights generati da intelligenza artificiale.",
      longDesc: "L'intelligenza artificiale non si limita a leggere i dati, li interpreta. Prevede saturazione delle mete, fluttuazione dei prezzi e consiglia il momento perfetto per visitare la tua destinazione ideale."
    }
  ];

  return (
    <section className={`relative min-h-screen overflow-y-auto transition-all duration-700 ease-in-out custom-scrollbar
      ${darkMode
        ? 'bg-[#0b0e11] bg-gradient-to-br from-[#0b0e11] via-[#0b0e11] to-[#6d4aff]/30'
        : 'bg-white bg-gradient-to-br from-[#76c876]/20 via-white to-white'}`}>

      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-8 sticky top-0 w-full z-50 backdrop-blur-md">
        <div className={`text-2xl font-black tracking-tighter ${darkMode ? 'text-white' : 'text-black'}`}>
          <h1 
            onClick={onLogoClick} 
            className="cursor-pointer hover:opacity-80 transition-opacity font-black tracking-tighter text-3xl"
          >
          SummerWindow<span className="text-[#6d4aff]">.</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          {/* Tasto Rifai Quiz */}
          <button
            onClick={onResetQuiz}
            className={`text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-[#6d4aff] ${darkMode ? 'text-white/50' : 'text-black/50'
              }`}
          >
            Rifai Quiz
          </button>

          {/* Tasto Mappa */}
          <button
            onClick={onGoToMap}
            className="bg-[#6d4aff] text-white px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-[#6d4aff]/20"
          >
            Vai alla Mappa
          </button>
        </div>
      </nav>

      {/* HERO SECTION DINAMICA */}
      <div className="flex flex-col items-center justify-center pt-20 pb-12 text-center px-8 relative z-10 animate-title">

        {userPrefs && (
          <div className="mb-6">
            <span className="bg-[#6d4aff]/10 text-[#6d4aff] border border-[#6d4aff]/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
              Analisi Predittiva Completata
            </span>
          </div>
        )}

        <h1 className={`text-7xl md:text-9xl font-black mb-6 tracking-tighter leading-none ${darkMode ? 'text-white' : 'text-black'}`}>
          Estate <br className="md:hidden" />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#6d4aff] via-[#b7a3ff] to-[#6d4aff] animate-gradient-x drop-shadow-[0_0_30px_rgba(109,74,255,0.3)]">
            2026
          </span>
        </h1>

        {userPrefs ? (
          <div className="max-w-3xl mx-auto mb-10 animate-fade-in-up">
            <p className={`text-xl md:text-2xl font-bold leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Ottimo! Abbiamo trovato <span className="text-[#6d4aff]">{recommendedCount} mete</span> perfette per il tuo profilo.
            </p>
            {bestMatch && (
              <p className={`text-lg mt-2 opacity-80 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                La tua destinazione ideale è <span className="font-black text-[#00ffcc] underline decoration-2">{bestMatch.name}</span>.
              </p>
            )}
          </div>
        ) : (
          <p className={`text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            Monitoriamo i trend globali in tempo reale per la tua prossima avventura.
          </p>
        )}

        <button
          onClick={onGoToMap}
          className="bg-[#6d4aff] text-white px-12 py-5 rounded-full font-black text-xl shadow-2xl shadow-[#6d4aff]/40 hover:bg-[#5a39e6] hover:scale-105 transition-all active:scale-95"
        >
          Esplora {recommendedCount || ""} Match
        </button>
      </div>

      {/* GRIGLIA TOOL */}
      <div className="max-w-6xl mx-auto px-8 pt-10 pb-40 relative z-10">
        <h2 className={`text-sm font-black uppercase tracking-[0.3em] mb-12 text-center opacity-40 ${darkMode ? 'text-white' : 'text-black'}`}>
          I Nostri Strumenti
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((item) => (
            <div
              key={item.title}
              onClick={() => setActiveTool(item)}
              className={`group p-10 rounded-[2.5rem] transition-all duration-500 border cursor-pointer
                ${darkMode
                  ? 'bg-white/5 border-white/10 hover:border-[#6d4aff] hover:shadow-[0_0_40px_rgba(109,74,255,0.2)]'
                  : 'bg-white border-transparent shadow-[0_20px_50px_rgba(0,0,0,0.1) hover:shadow-[0_30px_60px_rgba(118,200,118,0.2)] hover:border-[#76c876]'}`}
            >
              <div className="text-5xl mb-6 transform transition-transform group-hover:scale-110 duration-300">
                {item.icon}
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black'} group-hover:text-[#6d4aff]`}>
                {item.title}
              </h3>
              <p className={`leading-relaxed font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                {item.desc}
              </p>
              <div className="mt-4 text-[#6d4aff] text-[10px] font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                Dettagli algoritmo +
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL TOOL (Popup) */}
      {activeTool && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setActiveTool(null)}></div>
          <div className={`relative max-w-lg w-full p-10 rounded-[3rem] shadow-3xl border transform animate-scale-up
            ${darkMode ? 'bg-[#1a1d23] border-white/10 text-white' : 'bg-white border-slate-200 text-black'}`}>
            <button onClick={() => setActiveTool(null)} className="absolute top-6 right-6 text-2xl opacity-50 hover:opacity-100 transition-opacity">✕</button>
            <div className="text-6xl mb-6">{activeTool.icon}</div>
            <h2 className="text-3xl font-black mb-4 tracking-tighter">{activeTool.title}</h2>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {activeTool.longDesc}
            </p>
            <button onClick={() => setActiveTool(null)} className="mt-10 w-full py-4 bg-[#6d4aff] text-white font-bold rounded-2xl hover:bg-[#5a39e6] transition-colors">
              Chiudi
            </button>
          </div>
        </div>
      )}

      {/* TEMA SWITCHER */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <button onClick={toggleTheme} className={`w-14 h-14 flex items-center justify-center rounded-full shadow-2xl transition-all border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <span className="text-2xl">{darkMode ? '☀️' : '🌙'}</span>
        </button>
      </div>
    </section>
  );
};

export default HomeOverview;