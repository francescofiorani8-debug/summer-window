import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Save, Clock, Type, Sparkles, Check, ChevronUp, ChevronDown } from 'lucide-react'; 
import { ACTIVITY_POOL } from '../data/activityPool';

const ActivityPicker = ({ isOpen, onClose, activeSlot, city, darkMode, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    time: '09:00',
    desc: '',
    icon: '✨'
  });

  // Sincronizza i dati all'apertura
  useEffect(() => {
    if (activeSlot && activeSlot.data) {
      setFormData({
        title: activeSlot.data.title,
        time: activeSlot.data.time,
        desc: activeSlot.data.desc,
        icon: activeSlot.data.icon
      });
    }
  }, [activeSlot]);

  // Gestione orario manuale (Evita bug input nativi)
  const adjustTime = (type, delta) => {
    let [hours, minutes] = formData.time.split(':').map(Number);
    if (type === 'h') {
      hours = (hours + delta + 24) % 24;
    } else {
      minutes = (minutes + delta + 60) % 60;
    }
    const newTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    setFormData({ ...formData, time: newTime });
  };

  if (!isOpen || !activeSlot) return null;

  const suggestions = ACTIVITY_POOL[activeSlot.data.period] || [];

  // Usiamo createPortal per renderizzare la modale fuori dalla gerarchia DOM corrente
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      
      {/* Overlay con Blur Ultra-Profondo */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl animate-overlay-fade"
        onClick={onClose}
      />

      {/* Card Principale */}
      <div className={`relative w-full max-w-2xl ${darkMode ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} 
        rounded-[3.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border p-8 md:p-12 z-10 animate-card-zoom`}>
        
        {/* Pulsante Chiudi */}
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 p-3 rounded-full hover:bg-current/10 opacity-50 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Titolo */}
        <div className="mb-10">
          <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
            Edit <span className="text-[#6d4aff]">Activity</span>
          </h3>
          <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] mt-3">
            Day {activeSlot.dayIdx + 1} • {activeSlot.data.period} Session
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Colonna SX: Editor */}
          <div className="space-y-8">
            {/* Custom Time Selection */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase opacity-40 tracking-widest">
                <Clock size={12} className="text-[#00ffcc]" /> Set Time
              </label>
              <div className="flex items-center gap-6 bg-current/5 p-6 rounded-[2.5rem] border-2 border-transparent focus-within:border-[#00ffcc]/50 transition-all justify-center">
                <div className="flex flex-col items-center">
                  <button onClick={() => adjustTime('h', 1)} className="p-1 opacity-30 hover:opacity-100 hover:text-[#00ffcc]"><ChevronUp size={24}/></button>
                  <span className="text-4xl font-black tabular-nums">{formData.time.split(':')[0]}</span>
                  <button onClick={() => adjustTime('h', -1)} className="p-1 opacity-30 hover:opacity-100 hover:text-[#00ffcc]"><ChevronDown size={24}/></button>
                </div>
                <span className="text-3xl font-black opacity-20">:</span>
                <div className="flex flex-col items-center">
                  <button onClick={() => adjustTime('m', 5)} className="p-1 opacity-30 hover:opacity-100 hover:text-[#00ffcc]"><ChevronUp size={24}/></button>
                  <span className="text-4xl font-black tabular-nums">{formData.time.split(':')[1]}</span>
                  <button onClick={() => adjustTime('m', -5)} className="p-1 opacity-30 hover:opacity-100 hover:text-[#00ffcc]"><ChevronDown size={24}/></button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase opacity-40 tracking-widest">
                <Type size={12} className="text-[#6d4aff]" /> Activity Title
              </label>
              <input 
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-current/5 border-2 border-transparent focus:border-[#6d4aff] rounded-3xl px-6 py-5 font-bold outline-none transition-all text-lg"
                placeholder="Where to?"
              />
            </div>

            <button 
              onClick={() => onSave(activeSlot.dayIdx, activeSlot.slotIdx, formData)}
              className="w-full bg-[#6d4aff] text-white py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#6d4aff]/20"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>

          {/* Colonna DX: Suggestions */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase opacity-40 tracking-widest">
              <Sparkles size={12} className="text-[#00ffcc]" /> Suggestions for {city?.name}
            </label>
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
              {suggestions.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => setFormData({...formData, title: item.title, desc: item.desc, icon: item.icon})}
                  className={`p-5 rounded-[2rem] border-2 cursor-pointer transition-all flex items-center gap-5 group
                    ${formData.title === item.title ? 'border-[#00ffcc] bg-[#00ffcc]/10' : 'border-transparent bg-current/5 hover:bg-current/10'}`}
                >
                  <div className="text-3xl transition-transform group-hover:scale-110 duration-300">{item.icon}</div>
                  <div className="flex-1">
                    <p className="text-[11px] font-black uppercase tracking-tight">{item.title}</p>
                    <p className="text-[10px] opacity-40 line-clamp-1 italic">{item.desc}</p>
                  </div>
                  {formData.title === item.title && <Check size={16} className="text-[#00ffcc]" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Fix per il Blur su Safari e animazione fluida */
        .backdrop-blur-xl {
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
        }

        @keyframes overlay-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes card-zoom {
          from { opacity: 0; transform: scale(0.9) translateY(30px); filter: blur(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }

        .animate-overlay-fade { animation: overlay-fade 0.3s ease-out forwards; }
        .animate-card-zoom { animation: card-zoom 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; 
          border-radius: 10px; 
        }
      `}</style>
    </div>,
    document.body
  );
};

export default ActivityPicker;