import React, { useState, useEffect } from 'react';
import { Share2, CloudRain, Map, Calendar, Download, Clock, ChevronRight, Car, Footprints, Info, Plus, FileText, Star, Target } from 'lucide-react';
import BudgetBreakdown from './BudgetBreakdown'; 
import ActivityPicker from './ActivityPicker';

// Import necessari per il PDF
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const TravelPlanner = ({ city, darkMode }) => {
  const [itinerary, setItinerary] = useState([]);
  const [weatherMode, setWeatherMode] = useState('sunny');
  const [selectedDuration, setSelectedDuration] = useState(3);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);

  const getTravelTime = () => {
    if (city.tags?.type === 'City') return { time: '20-25 min', icon: <Car size={12} /> };
    return { time: '10-15 min', icon: <Footprints size={12} /> }; 
  };

  const sortSlots = (slots) => {
    return [...slots].sort((a, b) => a.time.localeCompare(b.time));
  };

  useEffect(() => {
    if (!city || !city.planner) return;

    const generateItinerary = () => {
      const days = [];
      for (let i = 1; i <= selectedDuration; i++) {
        const dayData = city.planner.itineraries[selectedDuration]?.find(d => d.day === i) || 
                        city.planner.itineraries[3]?.find(d => d.day === i);

        const defaultSlots = [
          { 
            id: `d${i}-s1`, time: "09:30", period: "MORNING", 
            title: dayData?.morning || "Colazione e passeggiata", 
            icon: "🏛️", desc: "Inizia la giornata esplorando i dintorni." 
          },
          { 
            id: `d${i}-s2`, time: "15:00", period: "AFTERNOON", 
            title: dayData?.afternoon || "Visita culturale", 
            icon: "🚶", desc: "Scopri la storia e l'arte locale." 
          },
          { 
            id: `d${i}-s3`, time: "20:30", period: "EVENING", 
            title: dayData?.evening || "Cena e relax", 
            icon: "🍴", desc: "Goditi la serata con piatti tipici." 
          }
        ];

        days.push({
          day: i,
          title: dayData?.title || `Giorno ${i}: Esplorazione`,
          slots: sortSlots(defaultSlots)
        });
      }
      return days;
    };

    setItinerary(generateItinerary());
  }, [city, selectedDuration]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(109, 74, 255);
    doc.text(city.name.toUpperCase(), 14, 22);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Durata: ${selectedDuration} giorni | Budget: €${estimateBudget()}`, 14, 30);

    let currentY = 35;
    itinerary.forEach((dayPlan) => {
      autoTable(doc, {
        startY: currentY + 10,
        head: [[`DAY ${dayPlan.day}`, dayPlan.title, '', '']],
        body: dayPlan.slots.map(s => [s.time, s.period, s.title, s.desc]),
        theme: 'grid',
        headStyles: { fillColor: [109, 74, 255], fontStyle: 'bold' },
        styles: { fontSize: 8, cellPadding: 4 },
        columnStyles: { 0: { cellWidth: 20 }, 1: { cellWidth: 25 }, 2: { cellWidth: 40, fontStyle: 'bold' } },
        margin: { left: 14, right: 14 }
      });
      currentY = doc.lastAutoTable.finalY;
    });
    doc.save(`Itinerario_${city.name}.pdf`);
  };

  const openActivityPicker = (dayIdx, slotIdx) => {
    setActiveSlot({ dayIdx, slotIdx, data: itinerary[dayIdx].slots[slotIdx] });
    setIsPickerOpen(true);
  };

  const handleSaveActivity = (dayIdx, slotIdx, newData) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIdx].slots[slotIdx] = { ...newItinerary[dayIdx].slots[slotIdx], ...newData };
    newItinerary[dayIdx].slots = sortSlots(newItinerary[dayIdx].slots);
    setItinerary(newItinerary);
    setIsPickerOpen(false);
  };

  const estimateBudget = () => {
    const basePrice = city.budget === 3 ? 250 : city.budget === 2 ? 150 : 80;
    return (selectedDuration * basePrice).toFixed(0);
  };

  const handleOpenMaps = () => {
    const landmarks = city.planner?.mustSee?.join(' ') || "";
    const query = encodeURIComponent(`${city.name} ${landmarks} attractions`);
    const mapsUrl = city.planner?.mapListUrl && city.planner.mapListUrl !== "#" 
      ? city.planner.mapListUrl 
      : `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const addNewActivity = (dayIdx) => {
    const newItinerary = [...itinerary];
    const newSlot = {
      id: `custom-${Date.now()}`,
      time: "12:00",
      period: "EXTRA",
      title: "Nuova Tappa",
      icon: "📍",
      desc: "Definisci i dettagli della tua nuova attività."
    };
    newItinerary[dayIdx].slots = sortSlots([...newItinerary[dayIdx].slots, newSlot]);
    setItinerary(newItinerary);
    const newSlotIdx = newItinerary[dayIdx].slots.findIndex(s => s.id === newSlot.id);
    setActiveSlot({ dayIdx, slotIdx: newSlotIdx, data: newSlot });
    setIsPickerOpen(true);
  };

  if (!city || itinerary.length === 0) return null;

  return (
    <div className={`w-full max-w-5xl mx-auto space-y-12 py-12 px-4 animate-in fade-in duration-1000 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      
      {/* 1. HEADER - FISSARE IL TAGLIO DEL TITOLO */}
      <div className="w-full bg-slate-50 dark:bg-white/5 p-8 md:p-12 rounded-[3.5rem] border border-slate-200 dark:border-white/10 shadow-2xl">
        <div className="flex flex-col xl:flex-row justify-between items-center gap-10">
          
          <div className="w-full xl:flex-1 space-y-8">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase leading-[1.1]">
                Questo è ciò che potresti vivere
              </h2>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] mt-3">Personalizza la tua esperienza temporale</p>
            </div>
            
            <div className="space-y-4 w-full max-w-2xl">
              <div className="flex justify-between items-end">
                <span className="text-5xl font-black italic text-[#6d4aff] drop-shadow-[0_0_15px_rgba(109,74,255,0.2)]">
                  {selectedDuration} <span className="text-sm not-italic opacity-50 uppercase">Giorni</span>
                </span>
                <span className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em]">Orbit Limit: 15 GG</span>
              </div>
              <input 
                type="range" min="1" max="15" value={selectedDuration} 
                onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
                className="custom-range w-full cursor-pointer h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col items-center xl:items-end gap-3 shrink-0">
            <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">Atmosfera Attesa</p>
            <div className="flex bg-white dark:bg-black/30 p-2 rounded-[2rem] border border-current/10 shadow-inner">
              <button onClick={() => setWeatherMode('sunny')} className={`px-8 py-3 rounded-[1.5rem] text-xs font-black transition-all ${weatherMode === 'sunny' ? 'bg-[#00ffcc] text-black shadow-lg shadow-[#00ffcc]/30 scale-105' : 'opacity-40 hover:opacity-100'}`}>SOLAR</button>
              <button onClick={() => setWeatherMode('rainy')} className={`px-8 py-3 rounded-[1.5rem] text-xs font-black transition-all ${weatherMode === 'rainy' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105' : 'opacity-40 hover:opacity-100'}`}>RAINY</button>
            </div>
          </div>
          
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          {weatherMode === 'sunny' ? (
            itinerary.map((dayPlan, dIdx) => (
              <div key={dIdx} className="relative">
                <div className="flex items-center gap-4 mb-10">
                  <div className="bg-[#6d4aff] text-white px-5 py-1.5 rounded-full text-[10px] font-black italic animate-glitter-purple shadow-lg shadow-[#6d4aff]/20 uppercase">DAY {dayPlan.day < 10 ? `0${dayPlan.day}` : dayPlan.day}</div>
                  <h3 className="text-sm font-black uppercase tracking-widest opacity-40 italic">{dayPlan.title}</h3>
                </div>
                
                <div className="ml-6 space-y-0">
                  {dayPlan.slots.map((slot, sIdx) => (
                    <React.Fragment key={slot.id}>
                      <div className="relative pl-12 pb-2 group">
                        <div className="absolute -left-[2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#6d4aff]/40 to-[#6d4aff]/5" />
                        <div onClick={() => openActivityPicker(dIdx, sIdx)} className="absolute -left-[22px] top-0 w-11 h-11 rounded-2xl flex items-center justify-center text-xl cursor-pointer transition-all duration-300 shadow-xl bg-white dark:bg-slate-800 border border-current/10 hover:border-[#00ffcc] hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,255,204,0.3)] z-10">
                          <span className="group-hover:hidden">{slot.icon}</span>
                          <Plus className="hidden group-hover:block text-[#00ffcc]" size={18} />
                        </div>
                        <div className="flex flex-col gap-1 pb-8">
                          <span className="text-[10px] font-black text-[#00ffcc] uppercase italic">{slot.time} • {slot.period}</span>
                          <h4 className="text-xl font-black uppercase tracking-tight group-hover:text-[#6d4aff] transition-colors cursor-pointer" onClick={() => openActivityPicker(dIdx, sIdx)}>{slot.title}</h4>
                          <p className="text-sm opacity-50 leading-relaxed max-w-md">{slot.desc}</p>
                        </div>
                      </div>
                      
                      {sIdx < dayPlan.slots.length - 1 && (
                        <div className="relative ml-[-2px] pl-12 py-4 flex items-center gap-3">
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] border-l-2 border-dotted border-current/20" />
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-current/5 text-[9px] font-bold opacity-60">
                            {getTravelTime().icon}
                            <span>Spostamento: {getTravelTime().time}</span>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}

                  {/* IL QUADRATINO RIPRISTINATO PER AGGIUNGERE ATTIVITÀ */}
                  <div className="relative pl-12 pt-4 pb-12 group">
                    <div className="absolute -left-[2px] top-0 h-full w-[2px] bg-gradient-to-b from-current/10 to-transparent" />
                    <button onClick={() => addNewActivity(dIdx)} className="flex items-center gap-4 p-4 rounded-[2rem] bg-current/5 border-2 border-dashed border-current/10 hover:border-[#00ffcc] hover:bg-[#00ffcc]/5 transition-all group/btn w-full max-w-sm">
                      <div className="w-10 h-10 rounded-xl bg-current/5 flex items-center justify-center group-hover/btn:bg-[#00ffcc] group-hover/btn:text-black transition-all shadow-sm">
                        <Plus size={18} />
                      </div>
                      <div className="text-left">
                        <span className="block text-[10px] font-black uppercase tracking-widest opacity-40 group-hover/btn:opacity-100 group-hover/btn:text-[#00ffcc]">Aggiungi Tappa</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-blue-500/5 border-2 border-blue-500/20 rounded-[3.5rem] p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-blue-500 rounded-2xl text-white shadow-lg shadow-blue-500/40"><CloudRain size={32}/></div>
                <h3 className="text-2xl font-black italic uppercase">Indoor Strategy</h3>
              </div>
              <div className="grid gap-4">
                {city.planner.rainyDayOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-5 p-6 bg-white dark:bg-white/5 rounded-[2rem] border border-blue-500/10 hover:scale-[1.02] transition-transform shadow-sm">
                    <div className="text-2xl">🏛️</div>
                    <p className="font-black uppercase text-sm tracking-tight">{opt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="space-y-8">
          <div className={`p-8 rounded-[4rem] border transition-all duration-500 ${darkMode ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-40 italic">Mission Assets</h4>
            
            <div className="space-y-6">
              <div className="p-6 rounded-[2.5rem] bg-[#6d4aff]/5 border border-[#6d4aff]/20 shadow-inner">
                <p className="text-[10px] font-black uppercase text-[#6d4aff] mb-4 flex items-center gap-2">
                  <Target size={12} className="animate-pulse" /> Priorità
                </p>
                <div className="flex flex-wrap gap-2">
                  {city.planner.mustSee.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-[#6d4aff] text-white rounded-xl text-[9px] font-black uppercase animate-glitter-purple shadow-lg shadow-[#6d4aff]/20">#{tag}</span>
                  ))}
                </div>
              </div>

              {city.planner.hiddenGems && (
                <div className="p-6 rounded-[2.5rem] bg-[#00ffcc]/5 border border-[#00ffcc]/20 shadow-inner">
                  <p className="text-[10px] font-black uppercase text-[#00ffcc] mb-4 flex items-center gap-2">
                    <Star size={12} fill="#00ffcc" className="drop-shadow-[0_0_5px_#00ffcc] animate-pulse" /> Hidden Gems
                  </p>
                  <div className="space-y-2">
                    {city.planner.hiddenGems.map(gem => (
                      <div key={gem} className="text-[11px] font-black uppercase tracking-tight text-[#00ffcc] animate-gem-glitter flex items-start gap-2">
                        <span className="opacity-50">✦</span> {gem}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div onClick={() => setIsBudgetModalOpen(true)} className="mt-10 pt-10 border-t border-current/10 cursor-pointer group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase opacity-40 italic">Budget Totale</span>
                <div className="p-1.5 rounded-full bg-[#00ffcc]/10 text-[#00ffcc] animate-bounce"><Info size={12} /></div>
              </div>
              <div className="text-5xl font-black italic text-[#00ffcc] my-2 group-hover:scale-105 transition-transform animate-glitter">€{estimateBudget()}</div>
              <p className="text-[9px] font-bold opacity-40 uppercase tracking-tighter text-[#00ffcc]/60">Check Breakdown</p>
            </div>
          </div>

          <div className="grid gap-4">
            <button onClick={handleOpenMaps} className="flex items-center justify-center gap-3 w-full py-6 rounded-[2rem] bg-[#6d4aff] text-white font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#6d4aff]/40 animate-glitter-purple border border-white/20">
              <Map size={16} /> Sync Google Maps
            </button>
            <button onClick={exportToPDF} className="flex items-center justify-center gap-3 w-full py-6 rounded-[2rem] bg-black dark:bg-white dark:text-black text-white font-black uppercase text-[10px] tracking-widest hover:bg-[#6d4aff] hover:text-white transition-all active:scale-95 border border-current/10 shadow-lg">
              <FileText size={16} /> Export PDF
            </button>
          </div>
        </div>
      </div>

      <BudgetBreakdown isOpen={isBudgetModalOpen} onClose={() => setIsBudgetModalOpen(false)} city={city} duration={selectedDuration} total={estimateBudget()} darkMode={darkMode} />
      <ActivityPicker isOpen={isPickerOpen} onClose={() => setIsPickerOpen(false)} activeSlot={activeSlot} city={city} darkMode={darkMode} onSave={handleSaveActivity} /> 

      <style>{`
        .custom-range::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 32px; height: 32px;
          background: #6d4aff; border: 4px solid #00ffcc;
          border-radius: 50%; cursor: pointer;
          box-shadow: 0 0 20px rgba(109, 74, 255, 0.5);
          transition: all 0.2s ease;
        }
        .custom-range::-webkit-slider-thumb:hover { transform: scale(1.15); box-shadow: 0 0 30px rgba(0, 255, 204, 0.7); }
        
        @keyframes glitter { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.3) drop-shadow(0 0 10px #00ffcc99); } }
        .animate-glitter { animation: glitter 3s infinite ease-in-out; }

        @keyframes glitter-purple { 
          0%, 100% { filter: brightness(1); box-shadow: 0 0 15px rgba(109,74,255,0.4); } 
          50% { filter: brightness(1.25); box-shadow: 0 0 30px rgba(109,74,255,0.6); } 
        }
        .animate-glitter-purple { animation: glitter-purple 4s infinite ease-in-out; }

        @keyframes gem-glitter {
          0%, 100% { color: #00ffcc; text-shadow: 0 0 5px #00ffcc55; }
          50% { color: #ffffff; text-shadow: 0 0 15px #00ffcc, 0 0 25px #00ffcc; }
        }
        .animate-gem-glitter { animation: gem-glitter 4s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default TravelPlanner;