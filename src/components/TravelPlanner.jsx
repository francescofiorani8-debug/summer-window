import React, { useState, useEffect } from 'react';

import { ACTIVITY_POOL } from '../data/activityPool';

const TravelPlanner = ({ city, darkMode }) => {
  const [itinerary, setItinerary] = useState([]);
  const [isRolling, setIsRolling] = useState(null);

  // 1. GENERAZIONE INIZIALE
  useEffect(() => {
    if (!city) return;
    const cityTags = [city.tags?.mood?.toLowerCase(), city.tags?.type?.toLowerCase()].filter(Boolean);
    
    const generateDay = (dayNum) => ({
      day: dayNum,
      slots: [
        { id: `d${dayNum}-s1`, time: "09:30", period: "MORNING" },
        { id: `d${dayNum}-s2`, time: "15:00", period: "AFTERNOON" },
        { id: `d${dayNum}-s3`, time: "20:30", period: "EVENING" }
      ].map(slot => {
        const pool = ACTIVITY_POOL[slot.period];
        const candidates = pool.filter(a => a.tags.some(tag => cityTags.includes(tag)));
        const finalPool = candidates.length > 0 ? candidates : pool;
        const selected = finalPool[Math.floor(Math.random() * finalPool.length)];
        return { ...slot, ...selected };
      })
    });

    setItinerary([generateDay(1), generateDay(2)]);
  }, [city]);

  // 2. LOGICA RE-ROLL
  const rerollSlot = (dayIdx, slotIdx) => {
    const slot = itinerary[dayIdx].slots[slotIdx];
    setIsRolling(slot.id);

    setTimeout(() => {
      const cityTags = [city.tags?.mood?.toLowerCase(), city.tags?.type?.toLowerCase()].filter(Boolean);
      const pool = ACTIVITY_POOL[slot.period];
      const candidates = pool.filter(a => a.title !== slot.title && (a.tags.some(tag => cityTags.includes(tag)) || Math.random() > 0.5));
      const finalPool = candidates.length > 0 ? candidates : pool.filter(a => a.title !== slot.title);
      const newActivity = finalPool[Math.floor(Math.random() * finalPool.length)];

      const newItinerary = [...itinerary];
      newItinerary[dayIdx].slots[slotIdx] = { ...slot, ...newActivity };
      setItinerary(newItinerary);
      setIsRolling(null);
    }, 600);
  };

  // 3. LOGICA AZIONI (SHARE & PDF)
  const sharePlan = () => {
    const text = `✈️ Il mio piano per ${city.name} è pronto!\n💰 Budget stimato: €${estimateBudget()}\n✨ Generato con TravelAI`;
    if (navigator.share) {
      navigator.share({ title: `Viaggio a ${city.name}`, text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text);
      alert("Piano copiato negli appunti! Condividilo con i tuoi amici.");
    }
  };

  const downloadPDF = () => {
    alert("Generazione PDF in corso... Il tuo itinerario per " + city.name + " sarà pronto a breve!");
  };

  const estimateBudget = () => {
    const scoreBonus = (city.matchScore || 50) / 100;
    return (6 * 40 + (150 * (1 + scoreBonus))).toFixed(0);
  };

  const generateChecklist = () => {
    const list = ["Documenti d'identità", "Powerbank"];
    if (city.tags?.mood === "Adventure") list.push("Scarpe tecniche", "Zaino idrico");
    if (city.tags?.type === "Beach") list.push("Protezione solare", "Costume");
    if (city.tags?.type === "City") list.push("App trasporti", "Scarpe comode");
    if (city.tags?.mood === "Relax") list.push("Libro/Kindle", "Cuffie noise-cancelling");
    return list;
  };

  if (itinerary.length === 0) return null;

  return (
    <div className={`w-full max-w-4xl mx-auto space-y-20 py-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      
      {/* SEZIONE TIMELINE */}
      <section>
        <div className="flex flex-col items-center mb-16">
          <div className="h-1 w-12 bg-gradient-to-r from-[#6d4aff] to-[#00ffcc] rounded-full mb-4 shadow-[0_0_15px_#6d4aff]" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">The Visual Timeline</h3>
        </div>

        <div className="space-y-24">
          {itinerary.map((dayPlan, dIdx) => (
            <div key={dayPlan.day} className="relative">
              <div className="flex items-center gap-6 mb-16">
                <div className="relative">
                  <div className="text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-[#6d4aff] to-[#00ffcc] leading-none">
                    0{dayPlan.day}
                  </div>
                  <span className="absolute -top-4 -right-2 text-[10px] font-black uppercase opacity-20">Day</span>
                </div>
                <div className={`h-[1px] flex-1 ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
              </div>

              <div className="ml-8 md:ml-12 border-l-2 border-dashed border-[#6d4aff]/20 space-y-0">
                {dayPlan.slots.map((slot, sIdx) => (
                  <div 
                    key={slot.id} 
                    onClick={() => rerollSlot(dIdx, sIdx)}
                    className={`relative flex gap-8 pb-16 last:pb-0 group cursor-pointer`}
                  >
                    <div className="absolute -left-[35px] top-0 z-20">
                      <div className={`w-[66px] h-[66px] rounded-3xl flex items-center justify-center text-3xl transition-all duration-500 shadow-2xl
                        ${isRolling === slot.id ? 'animate-spin scale-75' : 'group-hover:scale-110 group-hover:rotate-6'}
                        ${darkMode ? 'bg-[#1a1f24] border border-white/10' : 'bg-white border border-slate-200'}`}>
                        {slot.icon}
                      </div>
                    </div>

                    <div className="pl-16 flex-1 pt-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-[#00ffcc] uppercase italic tracking-wider">{slot.time}</span>
                          <span className="w-1 h-1 rounded-full bg-current opacity-20" />
                          <span className="text-[9px] font-bold opacity-30 uppercase">{slot.period}</span>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2 text-[#6d4aff]">
                          <span className="text-[8px] font-black uppercase tracking-widest">Re-roll</span>
                          <span className="text-lg">⟳</span>
                        </div>
                      </div>

                      <h4 className={`text-2xl font-black uppercase italic leading-none mb-3 group-hover:text-[#6d4aff] transition-colors`}>
                        {slot.title}
                      </h4>
                      <p className={`text-sm opacity-50 font-medium leading-relaxed max-w-lg`}>
                        {slot.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEZIONE MISSION BRIEFING */}
      <section className={`p-8 md:p-12 rounded-[4rem] border-2 transition-all duration-700
        ${darkMode ? 'bg-[#15191d]/40 border-[#6d4aff]/20' : 'bg-white border-slate-100 shadow-2xl'}`}>
        
        <div className="flex items-center gap-6 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6d4aff] to-[#00ffcc] flex items-center justify-center text-3xl shadow-xl shadow-[#6d4aff]/20">
            🚀
          </div>
          <div>
            <h3 className="text-3xl font-black uppercase italic leading-none tracking-tighter">Mission Briefing</h3>
            <div className="h-1 w-12 bg-[#00ffcc] mt-2 rounded-full" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className={`p-10 rounded-[3rem] border ${darkMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
              <span className="text-[10px] font-black uppercase opacity-40 tracking-widest block mb-4">Estimated Budget / PP</span>
              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-black text-[#00ffcc]">€{estimateBudget()}</span>
                <span className="text-xs font-bold opacity-30 italic">All-In*</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
               {[`${city.tags?.mood} Mode`, `${city.tags?.type} Trip`, 'AI Verified'].map(chip => (
                 <div key={chip} className={`px-5 py-2 rounded-full text-[9px] font-black uppercase border tracking-widest ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                   {chip}
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-[#6d4aff]/5 rounded-[3rem] p-10 border border-[#6d4aff]/10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 opacity-40">Travel Essentials</h4>
            <div className="grid gap-5">
              {generateChecklist().map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-6 h-6 rounded-lg bg-[#00ffcc] flex items-center justify-center text-[10px] text-black font-black">
                    ✓
                  </div>
                  <span className="text-sm font-bold opacity-80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row gap-5">
          <button 
            onClick={sharePlan}
            className="flex-1 bg-[#6d4aff] text-white py-6 rounded-3xl font-black uppercase text-xs tracking-[0.3em] shadow-2xl shadow-[#6d4aff]/30 hover:scale-[1.03] active:scale-95 transition-all"
          >
            Invia al Gruppo 💬
          </button>
          <button 
            onClick={downloadPDF}
            className={`flex-1 py-6 rounded-3xl font-black uppercase text-xs tracking-[0.3em] border-2 transition-all hover:bg-current/5 ${darkMode ? 'border-white/10' : 'border-slate-200'}`}
          >
            Export PDF 📄
          </button>
        </div>
      </section>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 0.6s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
};

export default TravelPlanner;