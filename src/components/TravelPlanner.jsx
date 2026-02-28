import React, { useState, useEffect } from 'react';

// --- DATABASE ATTIVITÀ ---
const ACTIVITY_POOL = {
  MORNING: [
    { title: "Tour dei Belvedere", tags: ["relax", "view"], icon: "🌅" },
    { title: "Museo d'Arte", tags: ["culture", "indoor"], icon: "🏛️" },
    { title: "Walking Tour Storico", tags: ["culture", "adventure"], icon: "👟" },
    { title: "Yoga al Parco", tags: ["relax", "wellness"], icon: "🧘" },
    { title: "Mercato Locale", tags: ["food", "city"], icon: "🍅" }
  ],
  AFTERNOON: [
    { title: "Shopping District", tags: ["city", "lifestyle"], icon: "🛍️" },
    { title: "Noleggio E-Bike", tags: ["adventure", "outdoor"], icon: "🚲" },
    { title: "Workshop di Cucina", tags: ["food", "culture"], icon: "👨‍🍳" },
    { title: "Hidden Gems Photo", tags: ["view", "city"], icon: "📸" },
    { title: "Degustazione Vino", tags: ["food", "relax"], icon: "🍷" }
  ],
  EVENING: [
    { title: "Cena nel Quartiere Hip", tags: ["food", "lifestyle"], icon: "🍝" },
    { title: "Secret Speakeasy", tags: ["nightlife", "indoor"], icon: "🍸" },
    { title: "Musica Live", tags: ["nightlife", "culture"], icon: "🎸" },
    { title: "Night Market", tags: ["food", "adventure"], icon: "🍢" },
    { title: "Rooftop Party", tags: ["nightlife", "view"], icon: "✨" }
  ]
};

const TravelPlanner = ({ city, darkMode }) => {
  const [itinerary, setItinerary] = useState([]);
  const [isRolling, setIsRolling] = useState(null);

  // 1. GENERAZIONE INIZIALE
  useEffect(() => {
    if (!city) return;
    const cityTags = [city.tags?.mood, city.tags?.type].map(t => t?.toLowerCase());
    
    const initialPlan = [1, 2].map(dayNum => ({
      day: dayNum,
      slots: [
        { id: `d${dayNum}-s1`, time: "09:30", period: "MORNING" },
        { id: `d${dayNum}-s2`, time: "15:00", period: "AFTERNOON" },
        { id: `d${dayNum}-s3`, time: "20:30", period: "EVENING" }
      ].map(slot => {
        const candidates = ACTIVITY_POOL[slot.period].filter(a => 
          a.tags.some(tag => cityTags.includes(tag))
        );
        const pool = candidates.length > 0 ? candidates : ACTIVITY_POOL[slot.period];
        const selected = pool[Math.floor(Math.random() * pool.length)];
        return { ...slot, ...selected };
      })
    }));
    setItinerary(initialPlan);
  }, [city]);

  // 2. LOGICA RE-ROLL (SHUFFLE)
  const rerollSlot = (dayIdx, slotIdx) => {
    const slot = itinerary[dayIdx].slots[slotIdx];
    setIsRolling(slot.id);

    setTimeout(() => {
      const cityTags = [city.tags?.mood, city.tags?.type].map(t => t?.toLowerCase());
      const pool = ACTIVITY_POOL[slot.period];
      const candidates = pool.filter(a => 
        a.title !== slot.title && a.tags.some(tag => cityTags.includes(tag))
      );
      const finalPool = candidates.length > 0 ? candidates : pool.filter(a => a.title !== slot.title);
      const newActivity = finalPool[Math.floor(Math.random() * finalPool.length)];

      const newItinerary = [...itinerary];
      newItinerary[dayIdx].slots[slotIdx] = { ...slot, ...newActivity };
      setItinerary(newItinerary);
      setIsRolling(null);
    }, 600);
  };

  // 3. BUDGET & CHECKLIST
  const estimateBudget = () => {
    const activityCount = itinerary.reduce((acc, day) => acc + day.slots.length, 0);
    const multiplier = city.matchScore > 80 ? 1.2 : 1;
    return (activityCount * 45 * multiplier + 80).toFixed(0); 
  };

  const generateChecklist = () => {
    const list = ["Documenti d'identità", "Assicurazione"];
    if (city.tags?.mood === "Adventure" || city.tags?.mood === "EXCLUSIVE") list.push("Powerbank", "Kit Emergenza");
    if (city.tags?.type === "Beach" || city.tags?.type === "RELAX") list.push("Protezione solare", "Costume");
    list.push("App dei trasporti");
    return list;
  };

  // 4. FUNZIONI TASTI
  const handleWhatsAppShare = () => {
    const shareText = `✈️ Il nostro viaggio a ${city.name} è pronto!\n💰 Budget stimato: €${estimateBudget()}\n📍 Mood: ${city.tags?.mood || 'Exclusive'}\n\nOrganizzato con Gemini Travel.`;
    
    if (navigator.share) {
      navigator.share({
        title: `Viaggio a ${city.name}`,
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    }
  };

  if (itinerary.length === 0) return null;

  return (
    <div className="w-full space-y-16 py-12 printable-area">
      {/* ITINERARY SECTION */}
      <section className="no-print">
        <div className="flex flex-col items-center mb-10 text-center px-4">
          <div className="h-1 w-12 bg-[#6d4aff] rounded-full mb-4" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Your Personal Plan</h3>
          <p className="text-xs opacity-60 mt-2">Tocca una card per rigenerare l'attività</p>
        </div>

        <div className="space-y-12 max-w-2xl mx-auto px-4">
          {itinerary.map((dayPlan, dIdx) => (
            <div key={dayPlan.day}>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xl font-black italic text-[#6d4aff]">DAY 0{dayPlan.day}</span>
                <div className={`h-px flex-1 ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
              </div>

              <div className="grid gap-4">
                {dayPlan.slots.map((slot, sIdx) => (
                  <div 
                    key={slot.id}
                    onClick={() => rerollSlot(dIdx, sIdx)}
                    className={`group relative flex items-center gap-5 p-5 rounded-[2.5rem] border cursor-pointer transition-all duration-500
                      ${isRolling === slot.id ? 'scale-95 rotate-x-12 opacity-50' : 'hover:scale-[1.02] active:scale-95 shadow-lg'}
                      ${darkMode ? 'bg-white/5 border-white/10 hover:border-[#6d4aff]/50' : 'bg-white border-slate-200'}`}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center text-2xl border border-white/10 shadow-lg
                      ${isRolling === slot.id ? 'animate-spin' : ''}`}>
                      {slot.icon}
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] font-black text-[#00ffcc] uppercase italic">{slot.time}</span>
                      <h4 className={`text-lg font-black uppercase italic leading-none truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>{slot.title}</h4>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#6d4aff] text-white text-[8px] font-black px-3 py-1 rounded-full uppercase">
                      Shuffle
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION BRIEFING SECTION */}
      <section className={`mx-auto max-w-4xl p-8 rounded-[3rem] border-2 transition-all duration-700 shadow-2xl
        ${darkMode ? 'bg-zinc-900/50 border-[#6d4aff]/20 text-white' : 'bg-white border-slate-100 text-slate-900'}`}>
        
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-full bg-[#6d4aff] flex items-center justify-center text-xl shadow-xl">🚀</div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter">Mission Briefing</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className={`p-6 rounded-[2rem] border mb-6 ${darkMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
              <span className="text-[9px] font-black uppercase opacity-40 tracking-widest block mb-1">Budget Stimato</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-[#00ffcc]">€{estimateBudget()}</span>
                <span className="text-[10px] font-bold opacity-30 italic">/ persona</span>
              </div>
            </div>
            <div className="flex gap-2">
               <span className="px-4 py-2 rounded-full bg-[#6d4aff]/10 text-[9px] font-black uppercase border border-[#6d4aff]/20 tracking-widest text-[#6d4aff]">
                 {city.tags?.mood || 'Standard'} Mode
               </span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Essentials</h4>
            <div className="grid gap-3">
              {generateChecklist().map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-[#6d4aff]/20 border border-[#6d4aff]/40 flex items-center justify-center text-[10px] text-[#00ffcc]">✓</div>
                  <span className="text-xs font-bold opacity-80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- BOTTONI AGGIORNATI CON STILE VIOLETTO & HOVER GLOW --- */}
        <div className="mt-12 flex flex-col md:flex-row gap-6 no-print">
          <button 
            onClick={handleWhatsAppShare}
            className="flex-1 bg-[#6d4aff] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-[0_10px_30px_rgba(109,74,255,0.4)] hover:shadow-[0_15px_45px_rgba(109,74,255,0.6)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-2 border-b-4 border-black/20"
          >
            Share to WhatsApp 💬
          </button>
          
          <button 
            onClick={() => window.print()}
            className="flex-1 bg-[#6d4aff] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-[0_10px_30px_rgba(109,74,255,0.4)] hover:shadow-[0_15px_45px_rgba(109,74,255,0.6)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-2 border-b-4 border-black/20"
          >
            Export PDF 📄
          </button>
        </div>
      </section>

      <style>{`
        .rotate-x-12 { transform: perspective(1000px) rotateX(15deg); }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 0.5s linear infinite; }
        
        @media print {
          .no-print { display: none !important; }
          .printable-area { background: white !important; color: black !important; padding: 0 !important; }
          section { border: 1px solid #eee !important; box-shadow: none !important; margin: 0 !important; }
          .text-[#00ffcc] { color: #10b981 !important; }
          .bg-zinc-900/50, .bg-black/40 { background: #f9fafb !important; }
        }
      `}</style>
    </div>
  );
};

export default TravelPlanner;