import React, { useState } from 'react';

const HomeOverview = ({ 
  onGoToMap, 
  onResetQuiz, 
  onStartBattle, 
  onGoHome, 
  onGenerateItinerary, 
  toggleTheme, 
  darkMode, 
  userPrefs, 
  recommendedCount, 
  bestMatch, 
  onLogoClick,
  isGroup,           
  participantsCount,
  user,
  onProfileClick,
  // AGGIUNTA: la funzione per aprire il dettaglio della città
  onCityClick 
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

      {/* NAVBAR AGGIORNATA */}
      <nav className={`fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md border-b transition-all
        ${darkMode ? 'bg-black/20 border-white/5' : 'bg-white/40 border-slate-200'}`}>
        
        {/* Sinistra: Brand */}
        <div className={`text-2xl font-black tracking-tighter ${darkMode ? 'text-white' : 'text-black'}`}>
          <h1 
            onClick={onLogoClick} 
            className="cursor-pointer hover:opacity-80 transition-opacity font-black tracking-tighter text-3xl"
          >
            SummerWindow<span className="text-[#6d4aff]">.</span>
          </h1>
        </div>

        {/* Centro: Navigazione */}
        <div className="hidden lg:flex items-center gap-8">
          <button onClick={onGoHome} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-[#6d4aff] ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
            Home
          </button>
          <button onClick={onResetQuiz} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-[#6d4aff] ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
            {isGroup ? "Rifai per il Gruppo" : "Rifai Quiz"}
          </button>
          <button onClick={onGoToMap} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-[#6d4aff] ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
            Vai alla Mappa
          </button>
          <button onClick={onGenerateItinerary} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-[#00ffcc] ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
            Genera Itinerario
          </button>
        </div>

        {/* Destra: Profilo Utente */}
        <div className="flex items-center justify-end min-w-[150px]">
          <button 
            onClick={onProfileClick}
            className={`group flex items-center gap-3 p-1 pr-4 rounded-full transition-all border
              ${darkMode 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-slate-100 border-slate-200 hover:bg-slate-200'}`}
          >
            {user ? (
              <>
                <div className="relative">
                  <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full border-2 border-[#6d4aff]" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00ffcc] rounded-full border-2 border-[#0b0e11]"></div>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest hidden md:block ${darkMode ? 'text-white' : 'text-black'}`}>
                  {user.name}
                </span>
              </>
            ) : (
              <>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 border-dashed
                  ${darkMode ? 'border-white/20 text-white/40' : 'border-black/20 text-black/40'}`}>
                  👤
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest hidden md:block ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
                  Login
                </span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center pt-44 pb-12 text-center px-8 relative z-10 animate-title">
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
              <div className="mt-8 p-10 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-sm relative group overflow-hidden">
                <div className="absolute top-4 right-8 bg-[#00ffcc] text-black px-3 py-1 rounded-full font-black text-[10px] uppercase">
                   Match Score: {bestMatch.matchScore}%
                </div>
                <p className={`text-sm uppercase tracking-[0.3em] font-black mb-2 opacity-50 ${darkMode ? 'text-white' : 'text-black'}`}>
                  Vincitore Assoluto
                </p>
                <h2 className="text-5xl md:text-7xl font-black text-[#00ffcc] tracking-tighter uppercase mb-4">
                  {bestMatch.name}
                </h2>
              </div>
            )}
          </div>
        ) : (
          <p className={`text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            Monitoriamo i trend globali in tempo reale per la tua prossima avventura.
          </p>
        )}

        {/* --- SEZIONE BOTTONI MODIFICATA --- */}
        <div className="flex flex-col items-center gap-6">
          
          {/* Tasto Esplora Città Specifica (Sopra) */}
          {bestMatch && (
            <button
              onClick={() => onCityClick(bestMatch)}
              className="bg-[#6d4aff] text-white px-12 py-5 rounded-full font-black text-xl shadow-2xl shadow-[#6d4aff]/40 hover:bg-[#5a39e6] hover:scale-105 transition-all active:scale-95"
            >
              Esplora {bestMatch.name} <span className="ml-2">→</span>
            </button>
          )}

          {/* Bottoni Principali (Sotto) */}
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
      </div>

      {/* STRUMENTI GRID */}
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
            </div>
          ))}
        </div>
      </div>

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