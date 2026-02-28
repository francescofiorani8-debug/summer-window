import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import TravelPlanner from './TravelPlanner';

/**
 * BattleMode con “morph to center” + flip:
 * - Gestione votazione tra due città
 * - Celebrazione vincitore
 * - Schermata Itinerario dedicata con tasto Home
 */
const BattleMode = ({ cities, onBack, darkMode, participants = [] }) => {
  const [votesHistory, setVotesHistory] = useState([]);
  const [currentVote, setCurrentVote] = useState(null);
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);

  const [hasWinner, setHasWinner] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);

  // Shared element overlay
  const [activeCard, setActiveCard] = useState(null); 
  const [phase, setPhase] = useState("idle"); 
  const [isFlipped, setIsFlipped] = useState(false);

  const cityA = cities?.[0];
  const cityB = cities?.[1];

  const totalParticipants = participants.length;
  const isVotingFinished = currentVoterIndex >= totalParticipants;

  const getCityImage = (city) =>
    city?.image ||
    city?.img ||
    `https://source.unsplash.com/featured/?${encodeURIComponent(city?.name || "city")},city`;

  const overlayCity = useMemo(() => {
    if (!activeCard) return null;
    return activeCard === "cityA" ? cityA : cityB;
  }, [activeCard, cityA, cityB]);

  const cardRefs = useRef({ cityA: null, cityB: null });
  const [fromRect, setFromRect] = useState(null);
  const [cloneStyle, setCloneStyle] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && activeCard) closeOverlay();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeCard]);

  useEffect(() => {
    if (!activeCard) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [activeCard]);

  useEffect(() => {
    if (!hasWinner) return;
    const timer = setTimeout(() => setShowDetails(true), 1500);
    return () => clearTimeout(timer);
  }, [hasWinner]);

  const handleSelect = (target) => { if (!isVotingFinished) setCurrentVote(target); };

  const confirmVote = () => {
    if (!currentVote) return;
    setVotesHistory((prev) => [...prev, currentVote]);
    setCurrentVote(null);
    setCurrentVoterIndex((prev) => prev + 1);
  };

  const undoVote = () => {
    if (currentVoterIndex === 0) return;
    setVotesHistory((prev) => prev.slice(0, -1));
    setCurrentVoterIndex((prev) => prev - 1);
    setCurrentVote(null);
  };

  const finishBattle = () => {
    const countA = votesHistory.filter((v) => v === "cityA").length;
    const countB = votesHistory.filter((v) => v === "cityB").length;
    if (countA === countB) {
      setHasWinner((cityA?.matchScore ?? 0) >= (cityB?.matchScore ?? 0) ? cityA : cityB);
    } else {
      setHasWinner(countA > countB ? cityA : cityB);
    }
  };

  const openOverlay = (type) => {
    const el = cardRefs.current?.[type];
    if (!el) return;
    setFromRect(el.getBoundingClientRect());
    setActiveCard(type);
    setIsFlipped(false);
    setPhase("morphing");
  };

  const closeOverlay = () => {
    setIsFlipped(false);
    setPhase("closing");
  };

  useLayoutEffect(() => {
    if (!activeCard || !fromRect) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const targetW = Math.min(480, vw - 48);
    const targetH = Math.min(Math.round(vh * 0.72), 680);
    const toLeft = (vw - targetW) / 2;
    const toTop = (vh - targetH) / 2;

    setCloneStyle({
      top: fromRect.top, left: fromRect.left,
      width: fromRect.width, height: fromRect.height,
      borderRadius: "2.5rem", opacity: 1,
    });

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCloneStyle((s) => ({
          ...s, top: toTop, left: toLeft, width: targetW, height: targetH, opacity: 1,
        }));
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [activeCard, fromRect]);

  useEffect(() => {
    if (phase !== "closing" || !activeCard) return;
    const rect = cardRefs.current?.[activeCard]?.getBoundingClientRect();
    if (rect) {
      setCloneStyle((s) => ({
        ...s, top: rect.top, left: rect.left, width: rect.width, height: rect.height, opacity: 1,
      }));
    }
  }, [phase, activeCard]);

  const handleCloneTransitionEnd = (e) => {
    if (e.propertyName !== "top") return;
    if (phase === "morphing") {
      requestAnimationFrame(() => requestAnimationFrame(() => setIsFlipped(true)));
      setPhase("open");
    }
    if (phase === "closing") {
      setActiveCard(null); setFromRect(null); setCloneStyle(null);
      setPhase("idle"); setIsFlipped(false);
    }
  };

  const RenderGridCard = (city, type) => {
    const isSelected = currentVote === type;
    return (
      <div className={`flex-1 flex flex-col items-center gap-4 transition-all duration-500 ${activeCard ? "opacity-20 blur-md scale-95 pointer-events-none" : "z-10"}`}>
        <div
          ref={(node) => (cardRefs.current[type] = node)}
          onClick={() => openOverlay(type)}
          className={`relative w-full h-[45vh] rounded-[2.5rem] overflow-hidden border-4 transition-all cursor-pointer hover:scale-[1.02] active:scale-95
            ${isSelected ? (type === "cityA" ? "border-[#6d4aff] shadow-[0_0_30px_#6d4aff]" : "border-[#00ffcc] shadow-[0_0_30px_#00ffcc]") : "border-transparent shadow-xl"}`}
        >
          <img src={getCityImage(city)} className="w-full h-full object-cover" alt={city?.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white text-left">
            <h3 className="text-2xl font-black uppercase italic leading-none">{city?.name}</h3>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${type === "cityA" ? "text-[#6d4aff]" : "text-[#00ffcc]"}`}>Info Card</span>
          </div>
        </div>
        {!isVotingFinished && (
          <button onClick={() => handleSelect(type)} className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${isSelected ? (type === "cityA" ? "bg-[#6d4aff] text-white" : "bg-[#00ffcc] text-black") : (darkMode ? "bg-white/5 text-white/40 hover:bg-white/10" : "bg-slate-200 text-slate-500 hover:bg-slate-300")}`}>
            {isSelected ? "✓ Selezionato" : "Vota"}
          </button>
        )}
      </div>
    );
  };

  // --- RENDERING 1: SCHERMATA ITINERARIO (FULL SCREEN) ---
  if (hasWinner && showItinerary) {
    return (
      <div className={`min-h-screen w-full flex flex-col p-6 animate-in fade-in duration-700 ${darkMode ? "bg-[#0b0e11] text-white" : "bg-slate-50 text-slate-900"}`}>
        <div className="max-w-4xl mx-auto w-full">
          {/* Header Itinerario */}
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={() => setShowItinerary(false)} 
              className="font-black uppercase tracking-widest text-[10px] opacity-40 hover:opacity-100 flex items-center gap-2"
            >
              ← Verdetto
            </button>
            <div className="text-center">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Trip Itinerary</h2>
              <h1 className="text-2xl font-black italic uppercase text-[#6d4aff]">{hasWinner.name}</h1>
            </div>
            <button 
              onClick={onBack} 
              className="bg-[#6d4aff] text-white px-4 py-2 rounded-xl font-black uppercase text-[9px] tracking-widest shadow-lg hover:scale-105 transition-all"
            >
              Nuova Ricerca 🏠
            </button>
          </div>

          <TravelPlanner city={hasWinner} darkMode={darkMode} />
          
          <div className="mt-12 mb-8 text-center">
            <button onClick={onBack} className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20 hover:opacity-100 transition-all">
              Reset Battle Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDERING 2: SCHERMATA VINCITORE (CELEBRAZIONE) ---
  if (hasWinner) {
    return (
      <div className={`min-h-screen w-full flex flex-col items-center justify-center p-6 transition-colors duration-1000 ${darkMode ? "bg-[#0b0e11]" : "bg-white"}`}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl">
          
          <div className={`flex flex-col items-center text-center transition-all duration-1000 ${showDetails ? "md:w-1/2 scale-90" : "w-full scale-100"}`}>
            <h2 className={`text-[10px] font-black uppercase tracking-[0.5em] opacity-50 mb-2 ${darkMode ? "text-white" : "text-black"}`}>The Winner is</h2>
            <h1 className="text-5xl md:text-7xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-[#6d4aff] to-[#00ffcc] uppercase leading-none mb-6">
              {hasWinner?.name}
            </h1>
            <div className="relative inline-block">
              <img src={getCityImage(hasWinner)} className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-[3rem] shadow-[0_20px_50px_rgba(109,74,255,0.3)] border-4 border-[#6d4aff]" alt={hasWinner?.name} />
              <div className="absolute -top-6 -right-6 bg-[#6d4aff] text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl animate-bounce shadow-xl">🏆</div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 flex flex-col justify-center ${showDetails ? "opacity-100 translate-x-0 md:w-1/2" : "opacity-0 translate-x-20 pointer-events-none w-0 h-0 overflow-hidden"}`}>
            <div className={`p-8 rounded-[2.5rem] border ${darkMode ? "bg-white/5 border-white/10 text-white" : "bg-slate-50 border-slate-200 text-slate-900"}`}>
              <h3 className="text-2xl font-black uppercase italic mb-4 text-[#6d4aff]">Il verdetto finale</h3>
              <p className="text-sm leading-relaxed mb-6 font-medium opacity-80">
                {hasWinner?.description || `${hasWinner?.name} è stata scelta dalla maggioranza del gruppo come meta ideale.`}
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setShowItinerary(true)} 
                  className="w-full bg-[#6d4aff] text-white px-6 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-[0_10px_20px_rgba(109,74,255,0.3)] hover:scale-[1.02] transition-all border-b-4 border-black/20"
                >
                  Genera Itinerario ✈️
                </button>
                <button onClick={onBack} className="w-full py-4 font-black uppercase text-[10px] tracking-widest opacity-40 hover:opacity-100 transition-all">
                  Torna alla Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDERING 3: GRIGLIA BATTAGLIA (DEFAULT) ---
  return (
    <div className={`h-screen max-h-screen p-4 flex flex-col overflow-hidden transition-colors duration-700 ${darkMode ? "bg-[#0b0e11] text-white" : "bg-slate-50 text-black"}`}>
      <div className="flex justify-between items-center mb-2 z-10">
        <button onClick={onBack} className="font-black uppercase tracking-widest text-[10px] opacity-30 hover:opacity-100 transition-all">← Esci</button>
        <button onClick={undoVote} disabled={currentVoterIndex === 0} className={`flex items-center gap-2 font-black uppercase text-[10px] transition-all ${currentVoterIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-50 hover:opacity-100"}`}>
          <span className="text-lg">⟲</span> Undo
        </button>
        <div className="w-12"></div>
      </div>

      <div className={`flex flex-col items-center mb-6 transition-opacity duration-500 ${activeCard ? "opacity-0" : "opacity-100"}`}>
        {!isVotingFinished ? (
          <div className="bg-[#6d4aff] text-white px-6 py-1.5 rounded-full shadow-lg mb-2 animate-bounce">
            <span className="text-xs font-black uppercase tracking-tighter">Turno di: {participants[currentVoterIndex]?.name}</span>
          </div>
        ) : (
          <div className="bg-[#00ffcc] text-black px-6 py-1.5 rounded-full shadow-lg mb-2 font-black uppercase text-xs">Votazione Finita!</div>
        )}
      </div>

      <div className="flex-1 flex gap-6 items-center justify-center max-w-5xl mx-auto w-full px-4 mb-6 relative">
        {RenderGridCard(cityA, "cityA")}
        <div className={`text-3xl font-black italic text-[#6d4aff] transition-opacity duration-500 uppercase ${activeCard ? "opacity-0" : "opacity-20"}`}>VS</div>
        {RenderGridCard(cityB, "cityB")}
      </div>

      <div className={`py-6 flex flex-col items-center transition-opacity duration-500 ${activeCard ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        {!isVotingFinished ? (
          <button onClick={confirmVote} disabled={!currentVote} className={`px-12 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all shadow-2xl ${currentVote ? "bg-[#6d4aff] text-white scale-105 active:scale-95" : "bg-zinc-800 text-zinc-600 cursor-not-allowed opacity-50"}`}>
            Conferma Voto
          </button>
        ) : (
          <button onClick={finishBattle} className="px-12 py-5 bg-gradient-to-r from-[#6d4aff] to-[#00ffcc] text-white rounded-full font-black text-sm uppercase tracking-[0.2em] animate-pulse shadow-2xl">
            Scopri il Vincitore 🏆
          </button>
        )}
      </div>

      {/* OVERLAY + SHARED ELEMENT MORPH */}
      {activeCard && overlayCity && cloneStyle && (
        <div className="fixed inset-0 z-[200]">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={closeOverlay} />
          <div
            className="fixed"
            style={{
              top: cloneStyle.top, left: cloneStyle.left, width: cloneStyle.width, height: cloneStyle.height,
              borderRadius: cloneStyle.borderRadius, opacity: cloneStyle.opacity,
              transition: phase === "morphing" || phase === "closing" ? "all 520ms cubic-bezier(0.2, 0.9, 0.2, 1)" : "none",
              boxShadow: "0 30px 80px rgba(0,0,0,0.55)", transform: "translateZ(0)", cursor: "pointer",
            }}
            onTransitionEnd={handleCloneTransitionEnd}
            onClick={closeOverlay}
          >
            <div className="w-full h-full perspective-1000">
              <div className={`relative w-full h-full preserve-3d transition-transform duration-[900ms] ${isFlipped ? "rotate-y-180" : ""}`}>
                <div className="absolute inset-0 backface-hidden rounded-[2.5rem] overflow-hidden border-4 border-white/15">
                  <img src={getCityImage(overlayCity)} className="w-full h-full object-cover" alt={overlayCity?.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-70 mb-2">Info Card</div>
                    <div className="text-3xl font-black uppercase italic leading-none">{overlayCity?.name}</div>
                  </div>
                </div>
                <div className={`absolute inset-0 rotate-y-180 backface-hidden rounded-[2.5rem] p-8 flex flex-col justify-between border-4 ${darkMode ? "bg-[#15191d] border-[#6d4aff]/30 text-white" : "bg-white border-slate-200 text-black"}`}>
                  <div>
                    <h3 className="text-3xl font-black uppercase italic leading-tight text-[#6d4aff] mb-6">{overlayCity?.name}</h3>
                    <p className="text-sm leading-relaxed opacity-80 mb-8 font-medium">{overlayCity?.description || "Meta esclusiva analizzata per il tuo gruppo."}</p>
                    <div className="space-y-5">
                      {[
                        { label: "Match Score", val: `${overlayCity?.matchScore ?? 0}%`, color: "text-[#00ffcc]" },
                        { label: "Mood", val: overlayCity?.tags?.mood || "—" },
                        { label: "Type", val: overlayCity?.tags?.type || "—" },
                      ].map((info, idx) => (
                        <div key={idx} className={`flex justify-between items-end border-b pb-2 ${darkMode ? "border-white/10" : "border-slate-200"}`}>
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{info.label}</span>
                          <span className={`text-sm font-black uppercase ${info.color || ""}`}>{info.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`rounded-2xl py-3 text-[9px] font-black opacity-60 text-center uppercase tracking-[0.2em] ${darkMode ? "bg-white/5" : "bg-slate-50"}`}>
                    Clicca la card o fuori per chiudere
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .perspective-1000 { perspective: 1500px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default BattleMode;