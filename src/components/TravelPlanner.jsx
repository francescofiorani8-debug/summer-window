import React, { useState, useEffect } from 'react';
import { Share2, CloudRain, Map, Calendar, Download, RefreshCw, Clock, ChevronRight, Car, Footprints } from 'lucide-react';
import { ACTIVITY_POOL } from '../data/activityPool';

const TravelPlanner = ({ city, darkMode }) => {
  const [itinerary, setItinerary] = useState([]);
  const [isRolling, setIsRolling] = useState(null);
  const [weatherMode, setWeatherMode] = useState('sunny');
  const [selectedDuration, setSelectedDuration] = useState(3);

  // Funzione per stimare il tempo di spostamento in base alla città
  const getTravelTime = () => {
    if (city.tags?.type === 'City') return { time: '20-25 min', icon: <Car size={12} /> };
    return { time: '10-15 min', icon: <Footprints size={12} /> }; // <--- Qui
  };

  // 1. GENERAZIONE DINAMICA (Supporta 3, 5, 7 giorni)
  useEffect(() => {
    if (!city || !city.planner) return;

    const generateItinerary = () => {
      const days = [];
      const cityTags = [city.tags?.mood?.toLowerCase(), city.tags?.type?.toLowerCase()].filter(Boolean);

      for (let i = 1; i <= selectedDuration; i++) {
        // Se abbiamo i dati nel database per quel giorno, li usiamo, altrimenti generiamo
        const dayData = city.planner.itineraries[selectedDuration]?.find(d => d.day === i) || 
                        city.planner.itineraries[3]?.find(d => d.day === i);

        days.push({
          day: i,
          title: dayData?.title || `Esplorazione Libera`,
          slots: [
            { 
              id: `d${i}-s1`, time: "09:30", period: "MORNING", 
              title: dayData?.morning || "Colazione in centro e passeggiata", 
              icon: "🏛️", desc: "Inizia la giornata immergendoti nell'atmosfera locale." 
            },
            { 
              id: `d${i}-s2`, time: "15:00", period: "AFTERNOON", 
              title: dayData?.afternoon || "Visita ai quartieri storici", 
              icon: "🚶", desc: "Il momento perfetto per scoprire angoli nascosti." 
            },
            { 
              id: `d${i}-s3`, time: "20:30", period: "EVENING", 
              title: dayData?.evening || "Cena tipica e relax", 
              icon: "🍴", desc: "Goditi la gastronomia locale in un locale caratteristico." 
            }
          ]
        });
      }
      return days;
    };

    setItinerary(generateItinerary());
  }, [city, selectedDuration]);

  const rerollSlot = (dayIdx, slotIdx) => {
    const slot = itinerary[dayIdx].slots[slotIdx];
    setIsRolling(slot.id);

    setTimeout(() => {
      const cityTags = [city.tags?.mood?.toLowerCase(), city.tags?.type?.toLowerCase()].filter(Boolean);
      const pool = ACTIVITY_POOL[slot.period] || [];
      const candidates = pool.filter(a => a.title !== slot.title && (a.tags?.some(tag => cityTags.includes(tag.toLowerCase()))));
      const finalPool = candidates.length > 0 ? candidates : pool.filter(a => a.title !== slot.title);
      const newActivity = finalPool[Math.floor(Math.random() * finalPool.length)];

      const newItinerary = [...itinerary];
      newItinerary[dayIdx].slots[slotIdx] = { 
        ...slot, 
        title: newActivity.title, 
        desc: newActivity.desc, 
        icon: newActivity.icon || "✨" 
      };
      setItinerary(newItinerary);
      setIsRolling(null);
    }, 600);
  };

  const estimateBudget = () => {
    const basePrice = city.budget === 3 ? 250 : city.budget === 2 ? 150 : 80;
    return (selectedDuration * basePrice).toFixed(0);
  };

  const handleOpenMaps = () => {
    // 1. Prendiamo i Must See o, in alternativa, il nome della città
    const queryParts = city.planner?.mustSee?.length > 0 
      ? city.planner.mustSee.join(' ') 
      : city.name;
    
    // 2. Creiamo una stringa di ricerca pulita per Google Maps
    // Esempio: "Colosseo Fontana di Trevi Roma"
    const searchQuery = encodeURIComponent(`${queryParts} ${city.name}`);
    
    // 3. URL di ricerca universale di Google Maps
    const fallbackUrl = `https://www.google.com/maps/search/${searchQuery}`;
    
    // 4. Se nel database c'è un link specifico (es. una lista salvata) usa quello, altrimenti la ricerca
    const finalUrl = city.planner?.mapListUrl && city.planner.mapListUrl !== "#" 
      ? city.planner.mapListUrl 
      : fallbackUrl;

    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  if (!city || itinerary.length === 0) return null;

  return (
    <div className={`w-full max-w-5xl mx-auto space-y-12 py-12 px-4 animate-in fade-in duration-1000 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      
      {/* 1. SELECTOR DURATA & METEO */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-slate-50 dark:bg-white/5 p-8 rounded-[3rem] border border-slate-200 dark:border-white/10">
        <div className="space-y-4">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">Configura il Viaggio</h2>
          <div className="flex bg-white dark:bg-black/20 p-1.5 rounded-2xl border border-current/10 w-fit">
            {[3, 5, 7].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDuration(d)}
                className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${selectedDuration === d ? 'bg-[#6d4aff] text-white' : 'opacity-40'}`}
              >
                {d} GIORNI
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">
          <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">Condizioni Atmosferiche</p>
          <div className="flex bg-white dark:bg-black/20 p-1.5 rounded-2xl border border-current/10">
            <button onClick={() => setWeatherMode('sunny')} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${weatherMode === 'sunny' ? 'bg-[#00ffcc] text-black shadow-lg' : 'opacity-40'}`}>SOLAR</button>
            <button onClick={() => setWeatherMode('rainy')} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${weatherMode === 'rainy' ? 'bg-blue-500 text-white shadow-lg' : 'opacity-40'}`}>RAINY</button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        
        {/* 2. TIMELINE CON TEMPI DI SPOSTAMENTO */}
        <div className="lg:col-span-2 space-y-10">
          {weatherMode === 'sunny' ? (
            itinerary.map((dayPlan, dIdx) => (
              <div key={dIdx} className="relative">
                <div className="flex items-center gap-4 mb-10">
                  <div className="bg-[#6d4aff] text-white px-4 py-1 rounded-full text-xs font-black italic">DAY 0{dayPlan.day}</div>
                  <h3 className="text-sm font-black uppercase tracking-widest opacity-40 italic">{dayPlan.title}</h3>
                </div>

                <div className="ml-6 space-y-0">
                  {dayPlan.slots.map((slot, sIdx) => (
                    <React.Fragment key={slot.id}>
                      {/* SLOT ATTIVITÀ */}
                      <div className="relative pl-12 pb-2 group">
                        <div className="absolute -left-[2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#6d4aff]/40 to-transparent" />
                        
                        <div 
                          onClick={() => rerollSlot(dIdx, sIdx)}
                          className={`absolute -left-[22px] top-0 w-11 h-11 rounded-2xl flex items-center justify-center text-xl cursor-pointer transition-all duration-500 shadow-xl
                          ${isRolling === slot.id ? 'animate-spin bg-[#6d4aff]' : 'bg-white dark:bg-slate-800 border border-current/10 hover:scale-110'}`}
                        >
                          {isRolling === slot.id ? <RefreshCw className="text-white" size={18} /> : slot.icon}
                        </div>

                        <div className="flex flex-col gap-1 pb-8">
                          <span className="text-[10px] font-black text-[#00ffcc] uppercase italic">{slot.time} • {slot.period}</span>
                          <h4 className="text-xl font-black uppercase tracking-tight group-hover:text-[#6d4aff] transition-colors cursor-pointer" onClick={() => rerollSlot(dIdx, sIdx)}>
                            {slot.title}
                          </h4>
                          <p className="text-sm opacity-50 leading-relaxed max-w-md">{slot.desc}</p>
                        </div>
                      </div>

                      {/* PONTE TEMPO DI SPOSTAMENTO (non appare dopo l'ultimo slot della sera) */}
                      {sIdx < dayPlan.slots.length - 1 && (
                        <div className="relative ml-[-2px] pl-12 py-4 flex items-center gap-3">
                           <div className="absolute left-0 top-0 bottom-0 w-[2px] border-l-2 border-dotted border-current/20" />
                           <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-current/5 text-[9px] font-bold opacity-60">
                              {getTravelTime().icon}
                              <span>Spostamento stimato: {getTravelTime().time}</span>
                           </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))
          ) : (
            /* RAINY VIEW (Semplificata) */
            <div className="bg-blue-500/5 border-2 border-blue-500/20 rounded-[3rem] p-10 animate-in slide-in-from-top-4">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-blue-500 rounded-2xl text-white"><CloudRain size={32}/></div>
                <h3 className="text-2xl font-black italic uppercase">Indoor Strategy</h3>
              </div>
              <div className="space-y-4">
                {city.planner.rainyDayOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-5 p-5 bg-white dark:bg-white/5 rounded-3xl border border-blue-500/10 hover:scale-[1.02] transition-transform">
                    <div className="text-2xl">🏛️</div>
                    <p className="font-black uppercase text-sm tracking-tight">{opt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. SIDEBAR INFO & CTA */}
        <div className="space-y-8">
          <div className={`p-8 rounded-[4rem] border ${darkMode ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-40 italic">Mission Assets</h4>
            
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase text-[#6d4aff] mb-3">Top Priorities</p>
                <div className="flex flex-wrap gap-2">
                  {city.planner.mustSee.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-[#6d4aff]/10 text-[#6d4aff] rounded-xl text-[9px] font-black uppercase">#{tag}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-[10px] font-black uppercase text-[#00ffcc] mb-3">Hidden Gems</p>
                <div className="flex flex-wrap gap-2">
                  {city.planner.hiddenGems.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-[#00ffcc]/10 text-[#00ffcc] rounded-xl text-[9px] font-black uppercase">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-current/10">
              <span className="text-[10px] font-black uppercase opacity-40">Est. Budget ({selectedDuration} days)</span>
              <div className="text-5xl font-black italic text-[#6d4aff] my-2">€{estimateBudget()}</div>
              <p className="text-[9px] font-bold opacity-40 uppercase">Volo escluso • Prezzi medi 2026</p>
            </div>
          </div>

          <div className="grid gap-4">
            <button onClick={handleOpenMaps} className="flex items-center justify-center gap-3 w-full py-6 rounded-3xl bg-black dark:bg-white dark:text-black text-white font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl">
              <Map size={16} /> Sync to Google Maps
            </button>
            <button onClick={() => alert("Calendar Sync coming soon!")} className="flex items-center justify-center gap-3 w-full py-6 rounded-3xl border-2 border-current font-black uppercase text-[10px] tracking-widest hover:bg-current/5 transition-all">
              <Calendar size={16} /> Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanner;