import React, { useState } from 'react';

const HomeOverview = ({ 
  onGoToMap, 
  onResetQuiz, 
  onStartBattle, 
  toggleTheme, 
  darkMode, 
  userPrefs, 
  recommendedCount, 
  bestMatch, 
  onLogoClick,
  isGroup,           
  participantsCount  
}) => {
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
      title: isGroup ? "Social Matchmaking" : "Trends AI",
      icon: isGroup ? "👥" : "✨",
      desc: isGroup ? "Algoritmo di mediazione di gruppo." : "Insights generati da intelligenza artificiale.",
      longDesc: isGroup 
        ? "La nostra tecnologia di mediazione ha analizzato i veti e i desideri di tutti i partecipanti, trovando il punto di equilibrio perfetto per evitare conflitti e massimizzare il divertimento collettivo."
        : "L'intelligenza artificiale non si limita a leggere i dati, li interpreta. Prevede saturazione delle mete, fluttuazione dei prezzi e consiglia il momento perfetto per visitare la tua destinazione ideale."
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
          <button
            onClick={onResetQuiz}
            className={`text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-[#6d4aff] ${darkMode ? 'text-white/50' : 'text-black/50'}`}
          >
            {isGroup ? "Rifai per il Gruppo" : "Rifai Quiz"}
          </button>

          <button
            onClick={onGoToMap}
            className="bg-[#6d4aff] text-white px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-[#6d4aff]/20"
          >
            Vai alla Mappa
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center pt-20 pb-12 text-center px-8 relative z-10 animate-title">

        {/* Badge Dinamico */}
        {(userPrefs || isGroup) && (
          <div className="mb-6 flex flex-col items-center gap-3">
            <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] animate-pulse border
              ${isGroup 
                ? 'bg-[#00ffcc]/10 text-[#009e7e] border-[#00ffcc]/20 shadow-[0_0_20px_rgba(0,255,204,0.2)]' 
                : 'bg-[#6d4aff]/10 text-[#6d4aff] border-[#6d4aff]/20'}`}>
              {isGroup ? `Social Room: Accordo tra ${participantsCount} amici` : "Analisi Predittiva Completata"}
            </span>
          </div>
        )}

        <h1 className={`text-7xl md:text-9xl font-black mb-6 tracking-tighter leading-none ${darkMode ? 'text-white' : 'text-black'}`}>
          Estate <br className="md:hidden" />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#6d4aff] via-[#b7a3ff] to-[#6d4aff] animate-gradient-x drop-shadow-[0_0_30px_rgba(109,74,255,0.3)]">
            2026
          </span>
        </h1>

        {userPrefs || isGroup ? (
          <div className="max-w-3xl mx-auto mb-10 animate-fade-in-up">
            <p className={`text-xl md:text-2xl font-bold leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {isGroup 
                ? "Abbiamo trovato il punto d'incontro perfetto!" 
                : "Ottimo! Abbiamo analizzato il tuo profilo."}
              <br/>
              Ci sono <span className="text-[#6d4aff]">{recommendedCount} mete</span> compatibili con un match del <span className="text-[#00ffcc]">{bestMatch?.matchScore || 0}%</span>.
            </p>

            {bestMatch && (
              <div className="mt-8 p-8 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-sm relative group overflow-hidden">
                <div className="absolute top-4 right-8 bg-[#00ffcc] text-black px-3 py-1 rounded-full font-black text-[10px] uppercase">
                   Match Score: {bestMatch.matchScore}%
                </div>
                <p className={`text-sm uppercase tracking-[0.3em] font-black mb-2 opacity-50 ${darkMode ? 'text-white' : 'text-black'}`}>
                  Vincitore Assoluto
                </p>
                <h2 className="text-5xl md:text-7xl font-black text-[#00ffcc] tracking-tighter uppercase mb-4">
                  {bestMatch.name}
                </h2>

                {/* SOCIAL INSIGHTS */}
                {isGroup && bestMatch.groupReasons && (
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {bestMatch.groupReasons.map((reason, i) => (
                      <span key={i} className="bg-white/10 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-white/10">
                        ✨ {reason}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className={`text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            Monitoriamo i trend globali in tempo reale per la tua prossima avventura.
          </p>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={onGoToMap}
            className="bg-[#6d4aff] text-white px-12 py-5 rounded-full font-black text-xl shadow-2xl shadow-[#6d4aff]/40 hover:bg-[#5a39e6] hover:scale-105 transition-all active:scale-95"
          >
            Esplora i {recommendedCount || ""} Match
          </button>

          {isGroup && (
            <button
              onClick={onStartBattle}
              className="bg-[#6d4aff] text-white px-12 py-5 rounded-full font-black text-xl shadow-2xl shadow-[#6d4aff]/40 hover:bg-[#5a39e6] hover:scale-105 transition-all active:scale-95"
            >
              Battle Mode <span className="text-2xl animate-bounce-slow">⚔️</span>
            </button>
          )}
        </div>
      </div>

      {/* GRIGLIA TOOL */}
      <div className="max-w-6xl mx-auto px-8 pt-20 pb-40 relative z-10">
        <h2 className={`text-sm font-black uppercase tracking-[0.3em] mb-12 text-center opacity-40 ${darkMode ? 'text-white' : 'text-black'}`}>
          {isGroup ? "Tecnologia di Mediazione Social" : "I Nostri Strumenti"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((item) => (
            <div
              key={item.title}
              onClick={() => setActiveTool(item)}
              className={`group p-10 rounded-[2.5rem] transition-all duration-500 border cursor-pointer
                ${darkMode
                  ? 'bg-white/5 border-white/10 hover:border-[#6d4aff] hover:shadow-[0_0_40px_rgba(109,74,255,0.2)]'
                  : 'bg-white border-transparent shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_rgba(118,200,118,0.2)] hover:border-[#76c876]'}`}
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

      {/* MODAL TOOL */}
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