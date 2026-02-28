import React, { useState, useEffect } from 'react';

// --- DATABASE ATTIVITÀ ---
// In un'app reale, questi potrebbero provenire da un'API o un file JSON esterno
const ACTIVITY_POOL = {
  MORNING: [
    { title: "Tour dei Belvedere", tags: ["relax", "view", "romantic"], icon: "🌅" },
    { title: "Museo d'Arte Moderna", tags: ["culture", "indoor"], icon: "🏛️" },
    { title: "Walking Tour Storico", tags: ["culture", "adventure", "city"], icon: "👟" },
    { title: "Yoga al Parco", tags: ["relax", "wellness"], icon: "🧘" },
    { title: "Mercato Locale & Street Food", tags: ["food", "city"], icon: "🍅" },
    { title: "Esplorazione Vecchi Quartieri", tags: ["culture", "view"], icon: "🏘️" }
  ],
  AFTERNOON: [
    { title: "Shopping nel Design District", tags: ["city", "lifestyle"], icon: "🛍️" },
    { title: "Noleggio E-Bike / Scooter", tags: ["adventure", "outdoor"], icon: "🚲" },
    { title: "Workshop di Cucina Tipica", tags: ["food", "culture"], icon: "👨‍🍳" },
    { title: "Caccia alle Gemme Nascoste", tags: ["view", "adventure"], icon: "📸" },
    { title: "Degustazione Vini / Birre Artigianali", tags: ["food", "relax"], icon: "🍷" },
    { title: "Giro in Barca / Lungofiume", tags: ["relax", "view", "romantic"], icon: "⛵" }
  ],
  EVENING: [
    { title: "Cena nel Quartiere Gourmet", tags: ["food", "lifestyle"], icon: "🍝" },
    { title: "Secret Speakeasy Bar", tags: ["nightlife", "indoor"], icon: "🍸" },
    { title: "Concerto Jazz / Musica Live", tags: ["nightlife", "culture"], icon: "🎸" },
    { title: "Night Market Experience", tags: ["food", "adventure", "city"], icon: "🍢" },
    { title: "Rooftop Party con Vista", tags: ["nightlife", "view"], icon: "✨" },
    { title: "Passeggiata Sotto le Stelle", tags: ["romantic", "relax"], icon: "🌙" }
  ]
};

const TravelPlanner = ({ city, darkMode }) => {
  const [itinerary, setItinerary] = useState([]);
  const [isRolling, setIsRolling] = useState(null);

  // 1. GENERAZIONE INIZIALE DELL'ITINERARIO
  useEffect(() => {
    if (!city) return;
    
    // Normalizziamo i tag della città per il matching
    const cityTags = [
      city.tags?.mood?.toLowerCase(), 
      city.tags?.type?.toLowerCase()
    ].filter(Boolean);
    
    const generateDay = (dayNum) => {
      return {
        day: dayNum,
        slots: [
          { id: `d${dayNum}-s1`, time: "09:30", period: "MORNING" },
          { id: `d${dayNum}-s2`, time: "15:00", period: "AFTERNOON" },
          { id: `d${dayNum}-s3`, time: "20:30", period: "EVENING" }
        ].map(slot => {
          const pool = ACTIVITY_POOL[slot.period];
          // Cerchiamo attività che corrispondano ai tag della città
          const candidates = pool.filter(a => 
            a.tags.some(tag => cityTags.includes(tag))
          );
          // Se non ci sono match, usiamo tutto il pool del periodo
          const finalPool = candidates.length > 0 ? candidates : pool;
          const selected = finalPool[Math.floor(Math.random() * finalPool.length)];
          return { ...slot, ...selected };
        })
      };
    };

    setItinerary([generateDay(1), generateDay(2)]);
  }, [city]);

  // 2. LOGICA RE-ROLL (SHUFFLE SINGOLA ATTIVITÀ)
  const rerollSlot = (dayIdx, slotIdx) => {
    const slot = itinerary[dayIdx].slots[slotIdx];
    setIsRolling(slot.id);

    // Simuliamo un piccolo caricamento per l'effetto "slot machine"
    setTimeout(() => {
      const cityTags = [city.tags?.mood?.toLowerCase(), city.tags?.type?.toLowerCase()].filter(Boolean);
      const pool = ACTIVITY_POOL[slot.period];
      
      const candidates = pool.filter(a => 
        a.title !== slot.title && // Evitiamo la stessa attività
        (a.tags.some(tag => cityTags.includes(tag)) || Math.random() > 0.5) // Un pizzico di casualità
      );
      
      const finalPool = candidates.length > 0 ? candidates : pool.filter(a => a.title !== slot.title);
      const newActivity = finalPool[Math.floor(Math.random() * finalPool.length)];

      const newItinerary = [...itinerary];
      newItinerary[dayIdx].slots[slotIdx] = { ...slot, ...newActivity };
      setItinerary(newItinerary);
      setIsRolling(null);
    }, 600);
  };

  // 3. LOGICA MISSION BRIEFING
  const estimateBudget = () => {
    const activityCount = itinerary.reduce((acc, day) => acc + day.slots.length, 0);
    const scoreBonus = (city.matchScore || 50) / 100;
    // Calcolo fake: (attività * base) + volo/hotel base * moltiplicatore città
    return (activityCount * 40 + (150 * (1 + scoreBonus))).toFixed(0); 
  };

  const generateChecklist = () => {
    const list = ["Documenti d'identità", "Assicurazione medica"];
    if (city.tags?.mood === "Adventure") list.push("Scarpe tecniche", "Powerbank");
    if (city.tags?.type === "Beach") list.push("Costume da bagno", "Crema solare");
    if (city.tags?.type === "City") list.push("App Trasporti Locali", "Scarpe comode");
    return list;
  };

  const sharePlan = () => {
    const text = `✈️ Ecco il mio piano per ${city.name}!\n💰 Budget: €${estimateBudget()}\n✨ Generato con TravelAI`;
    if (navigator.share) {
      navigator.share({ title: 'Travel Plan', text, url: window.location.href });
    } else {
      alert("Piano copiato negli appunti!");
    }
  };

  if (itinerary.length === 0) return null;

  return (
    <div className="w-full space-y-16 py-4 animate-in fade-in duration-1000">
      
      {/* SEZIONE ITINERARIO */}
      <section>
        <div className="flex flex-col items-center mb-10">
          <div className="h-1.5 w-16 bg-[#6d4aff] rounded-full mb-4 shadow-[0_0_15px_#6d4aff]" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Your Personal Plan</h3>
        </div>

        <div className="space-y-12">
          {itinerary.map((dayPlan, dIdx) => (
            <div key={dayPlan.day} className="relative">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-2xl font-black italic text-[#6d4aff]">DAY 0{dayPlan.day}</span>
                <div className={`h-px flex-1 ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
              </div>

              <div className="grid gap-6">
                {dayPlan.slots.map((slot, sIdx) => (
                  <div 
                    key={slot.id}
                    onClick={() => rerollSlot(dIdx, sIdx)}
                    className={`group relative flex items-center gap-6 p-6 rounded-[2.5rem] border cursor-pointer transition-all duration-500
                      ${isRolling === slot.id ? 'scale-95 opacity-50 blur-sm' : 'hover:scale-[1.02] active:scale-95'}
                      ${darkMode ? 'bg-white/5 border-white/10 hover:border-[#6d4aff]/50' : 'bg-white border-slate-200 shadow-sm hover:shadow-xl'}`}
                  >
                    {/* Icona Slot */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${darkMode ? 'from-zinc-800 to-black' : 'from-slate-100 to-slate-200'} flex items-center justify-center text-3xl shadow-lg border border-white/10
                      ${isRolling === slot.id ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`}>
                      {slot.icon}
                    </div>

                    {/* Dettagli Attività */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black text-[#00ffcc] uppercase italic tracking-wider">{slot.time}</span>
                        <span className="text-[8px] font-bold opacity-30 uppercase">{slot.period}</span>
                      </div>
                      <h4 className={`text-xl font-black uppercase italic leading-none truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        {slot.title}
                      </h4>
                    </div>

                    {/* Badge Shuffle */}
                    <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-y-2 bg-[#6d4aff] text-white text-[8px] font-black px-4 py-2 rounded-full uppercase shadow-xl">
                      Cambia ⟳
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEZIONE MISSION BRIEFING */}
      <section className={`p-8 md:p-12 rounded-[3.5rem] border-2 transition-all duration-700
        ${darkMode ? 'bg-[#15191d]/50 border-[#6d4aff]/20 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-2xl'}`}>
        
        <div className="flex items-center gap-5 mb-12">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#6d4aff] to-[#00ffcc] flex items-center justify-center text-2xl shadow-xl">🚀</div>
          <div>
            <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Mission Briefing</h3>
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-1">Dettagli tecnici del viaggio</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Colonna Sinistra: Budget & Stats */}
          <div className="space-y-8">
            <div className={`p-8 rounded-[2.5rem] border ${darkMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[10px] font-black uppercase opacity-40 tracking-widest block mb-2">Budget Stimato / pp</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-[#00ffcc]">€{estimateBudget()}</span>
                <span className="text-xs font-bold opacity-30 italic">All-inclusive*</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
               <div className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase border tracking-widest ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                 {city.tags?.mood || 'Explore'} Mode
               </div>
               <div className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase border tracking-widest ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                 {city.tags?.type || 'Standard'} Trip
               </div>
            </div>
          </div>

          {/* Colonna Destra: Checklist */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40">Essentials Checklist</h4>
            <div className="grid gap-4">
              {generateChecklist().map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-6 h-6 rounded-lg bg-[#6d4aff]/10 border border-[#6d4aff]/30 flex items-center justify-center text-xs text-[#00ffcc] group-hover:bg-[#6d4aff] group-hover:text-white transition-all">
                    ✓
                  </div>
                  <span className="text-sm font-bold opacity-70 group-hover:opacity-100">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-14 flex flex-col sm:flex-row gap-4">
          <button 
            onClick={sharePlan}
            className="flex-1 bg-[#6d4aff] text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-[0_10px_20px_rgba(109,74,255,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            Invia al Gruppo 💬
          </button>
          <button className={`flex-1 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] border-2 transition-all hover:bg-white/5 ${darkMode ? 'border-white/10 text-white' : 'border-slate-200 text-slate-800'}`}>
            Scarica PDF 📄
          </button>
        </div>

        <p className="mt-8 text-center text-[9px] font-bold opacity-20 uppercase tracking-[0.2em]">
          *Stima basata su costi medi stagionali e attività selezionate per {city.name}
        </p>
      </section>

      {/* STILI PER ANIMAZIONI */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 0.6s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
};

export default TravelPlanner;