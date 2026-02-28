import React, { useState, useEffect } from 'react';

const BattleMode = ({ cities, onBack, darkMode, participants = [] }) => {
  const [votes, setVotes] = useState({ cityA: 0, cityB: 0 });
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [hasWinner, setHasWinner] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Prendiamo le due città. Fallback per le immagini
  const cityA = cities[0];
  const cityB = cities[1];
  
  const getCityImage = (city) => city?.image || city?.img || `https://source.unsplash.com/featured/?${city?.name},city`;

  const totalParticipants = participants.length;
  const isVotingFinished = currentVoterIndex >= totalParticipants;

  // Effetto per far scattare la transizione fluida dopo la proclamazione
  useEffect(() => {
    if (hasWinner) {
      const timer = setTimeout(() => setShowDetails(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasWinner]);

  const handleVote = (target) => {
    if (hasWinner || isVotingFinished) return;
    
    setVotes(prev => ({ ...prev, [target]: prev[target] + 1 }));
    setAnimating(target);
    
    setTimeout(() => {
      setAnimating(false);
      setCurrentVoterIndex(prev => prev + 1);
    }, 400);
  };

  const finishBattle = () => {
    if (votes.cityA === votes.cityB) {
      setHasWinner(cityA.matchScore >= cityB.matchScore ? cityA : cityB);
    } else {
      setHasWinner(votes.cityA > votes.cityB ? cityA : cityB);
    }
  };

  // SCHERMATA VINCITORE (Con transizione fluida)
  if (hasWinner) {
    return (
      <div className={`h-screen w-full flex items-center justify-center p-6 overflow-hidden transition-colors duration-1000 ${darkMode ? 'bg-[#0b0e11]' : 'bg-white'}`}>
        <div className={`flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl transition-all duration-1000 ease-in-out`}>
          
          {/* COLONNA SINISTRA: Vincitore */}
          <div className={`flex flex-col items-center text-center transition-all duration-1000 ${showDetails ? 'md:w-1/2 scale-90' : 'w-full scale-100'}`}>
            <h2 className={`text-[10px] font-black uppercase tracking-[0.5em] opacity-50 mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
              The Winner is
            </h2>
            <h1 className="text-5xl md:text-7xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-[#6d4aff] to-[#00ffcc] uppercase leading-none mb-6">
              {hasWinner.name}
            </h1>
            
            <div className="relative inline-block group">
               <img 
                 src={getCityImage(hasWinner)} 
                 className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-[3rem] shadow-[0_20px_50px_rgba(109,74,255,0.3)] border-4 border-[#6d4aff] transition-transform duration-500" 
                 alt={hasWinner.name} 
               />
               <div className="absolute -top-6 -right-6 bg-[#6d4aff] text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-xl animate-bounce">🏆</div>
            </div>

            {!showDetails && (
               <div className="mt-8 animate-pulse text-[10px] font-black uppercase tracking-widest opacity-30">
                 Analizzando il verdetto...
               </div>
            )}
          </div>

          {/* COLONNA DESTRA: Dettagli (Appare dopo 2s) */}
          <div className={`transition-all duration-1000 delay-300 flex flex-col justify-center ${showDetails ? 'opacity-100 translate-x-0 md:w-1/2' : 'opacity-0 translate-x-20 pointer-events-none w-0 h-0 overflow-hidden'}`}>
            <div className={`p-8 rounded-[2.5rem] border ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}>
              <h3 className="text-2xl font-black uppercase italic mb-4 text-[#6d4aff]">Perché questa scelta?</h3>
              
              <p className={`text-sm leading-relaxed mb-6 font-medium opacity-80`}>
                {hasWinner.description || `${hasWinner.name} è la destinazione ideale per il vostro gruppo. Con un Match Score del ${hasWinner.matchScore}%, questa città offre esattamente l'esperienza ${hasWinner.tags?.type} che stavate cercando, mantenendo un mood ${hasWinner.tags?.mood} perfetto per tutti.`}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className={`p-4 rounded-2xl ${darkMode ? 'bg-black/20' : 'bg-white shadow-sm'}`}>
                  <span className="block text-[9px] font-black opacity-40 uppercase mb-1">Categoria</span>
                  <span className="text-xs font-bold uppercase">{hasWinner.tags?.type}</span>
                </div>
                <div className={`p-4 rounded-2xl ${darkMode ? 'bg-black/20' : 'bg-white shadow-sm'}`}>
                  <span className="block text-[9px] font-black opacity-40 uppercase mb-1">Vibe</span>
                  <span className="text-xs font-bold uppercase">{hasWinner.tags?.mood}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button onClick={() => window.print()} className="w-full bg-[#6d4aff] text-white px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-lg">
                  Esporta Itinerario ✈️
                </button>
                <button onClick={onBack} className={`w-full px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest border ${darkMode ? 'border-white/10 text-white' : 'border-slate-200 text-slate-500'}`}>
                  Torna alla Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCHERMATA DI VOTO (Layout compatto)
  return (
    <div className={`h-screen max-h-screen p-4 flex flex-col overflow-hidden transition-colors duration-700 ${darkMode ? 'bg-[#0b0e11] text-white' : 'bg-slate-50 text-black'}`}>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="font-black uppercase tracking-widest text-[10px] opacity-50 hover:opacity-100">
          ← Esci dalla battle
        </button>
        
        <div className="flex flex-col items-center">
           {!isVotingFinished ? (
             <div className="bg-[#6d4aff] text-white px-4 py-1 rounded-full shadow-lg mb-2">
               <span className="text-[9px] font-black uppercase">Tocca a: {participants[currentVoterIndex]?.name}</span>
             </div>
           ) : (
             <div className="bg-[#00ffcc] text-black px-4 py-1 rounded-full shadow-lg mb-2 font-black uppercase text-[9px]">Fine Voti!</div>
           )}
           
           <div className={`flex gap-4 items-center px-4 py-1 rounded-full border ${darkMode ? 'bg-black/20 border-white/5' : 'bg-white border-slate-200'}`}>
              <span className="text-lg font-black text-[#6d4aff]">{votes.cityA}</span>
              <span className="text-xs font-black opacity-20">VS</span>
              <span className="text-lg font-black text-[#00ffcc]">{votes.cityB}</span>
           </div>
        </div>
        <div className="w-10"></div>
      </div>

      <h2 className="text-center text-2xl font-black italic uppercase tracking-tighter mb-4">
        Final <span className="text-[#6d4aff]">Showdown</span>
      </h2>

      {/* Grid Battaglia */}
      <div className="flex-1 flex gap-4 items-center justify-center max-w-4xl mx-auto w-full px-2 overflow-hidden">
        {/* CITY A */}
        <div 
          onClick={() => handleVote('cityA')}
          className={`flex-1 group relative overflow-hidden rounded-[2rem] h-full max-h-[50vh] shadow-xl cursor-pointer transition-all
            ${animating === 'cityA' ? 'scale-90' : 'hover:scale-[1.01]'} 
            ${isVotingFinished ? 'opacity-40 grayscale pointer-events-none' : ''}
            border-4 ${animating === 'cityA' ? 'border-[#6d4aff]' : 'border-transparent'}`}
        >
          <img src={getCityImage(cityA)} className="absolute inset-0 w-full h-full object-cover" alt={cityA?.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-black uppercase italic leading-none">{cityA?.name}</h3>
            <span className="text-[10px] font-bold text-[#6d4aff] uppercase">Match {cityA?.matchScore}%</span>
          </div>
        </div>

        <div className="text-2xl font-black italic text-[#6d4aff] opacity-30 uppercase">VS</div>

        {/* CITY B */}
        <div 
          onClick={() => handleVote('cityB')}
          className={`flex-1 group relative overflow-hidden rounded-[2rem] h-full max-h-[50vh] shadow-xl cursor-pointer transition-all
            ${animating === 'cityB' ? 'scale-90' : 'hover:scale-[1.01]'}
            ${isVotingFinished ? 'opacity-40 grayscale pointer-events-none' : ''}
            border-4 ${animating === 'cityB' ? 'border-[#00ffcc]' : 'border-transparent'}`}
        >
          <img src={getCityImage(cityB)} className="absolute inset-0 w-full h-full object-cover" alt={cityB?.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-black uppercase italic leading-none">{cityB?.name}</h3>
            <span className="text-[10px] font-bold text-[#00ffcc] uppercase">Match {cityB?.matchScore}%</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 flex flex-col items-center">
        <button 
          onClick={finishBattle}
          disabled={!isVotingFinished}
          className={`px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-xl
            ${isVotingFinished 
                ? 'bg-[#6d4aff] text-white hover:scale-105 active:scale-95' 
                : darkMode
                  ? 'bg-white/5 text-white/10 border border-white/5 cursor-not-allowed'
                  : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'}`}
        >
          {isVotingFinished ? "Proclama Vincitore 🏆" : `Mancano ${totalParticipants - currentVoterIndex} voti`}
        </button>
        
        <div className="flex gap-1.5 mt-3">
          {participants.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i < currentVoterIndex ? 'bg-[#6d4aff]' : 'bg-slate-300'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BattleMode;