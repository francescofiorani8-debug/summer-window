import React, { useEffect } from 'react';
import { X, Hotel, Utensils, Ticket } from 'lucide-react';

const BudgetBreakdown = ({ isOpen, onClose, city, duration, total, darkMode }) => {
  // Fix per bloccare lo scroll del body quando la modale è aperta
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const breakdown = {
    accommodation: (total * 0.55).toFixed(0),
    food: (total * 0.30).toFixed(0),
    leisure: (total * 0.15).toFixed(0)
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[9999] flex items-center justify-center p-4">
      
      {/* BACKGROUND BLURRATO: Separato dal contenuto per gestire meglio il bug */}
      <div 
        className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-[20px] transition-opacity duration-300"
        onClick={onClose}
        style={{ height: '100vh', width: '100vw' }}
      />
      
      {/* CARD CONTENT */}
      <div className={`${darkMode ? 'bg-[#0f172a] text-white' : 'bg-white text-slate-900'} w-full max-w-md rounded-[3rem] p-8 shadow-[0_0_80px_rgba(0,0,0,0.5)] border border-[#00ffcc]/30 relative overflow-hidden z-[10000] animate-modal-in`}>
        
        {/* Cerchio di luce verde acqua in background */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00ffcc]/15 rounded-full blur-[60px] pointer-events-none" />

        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 p-2 rounded-full hover:bg-[#00ffcc]/10 text-[#00ffcc] transition-colors"
        >
          <X size={24} strokeWidth={3} />
        </button>

        <header className="mb-10">
          <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2">
            Budget <span className="text-[#00ffcc] drop-shadow-[0_0_8px_rgba(0,255,204,0.4)]">Breakdown</span>
          </h3>
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-[#00ffcc]/50" />
            <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.2em]">
              {duration} GIORNI • {city.name}
            </p>
          </div>
        </header>

        <div className="space-y-8">
          {/* Item: Alloggio */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-black uppercase text-[11px] tracking-widest">
              <div className="flex items-center gap-3">
                <Hotel size={16} className="text-[#00ffcc]" />
                <span>Alloggio</span>
              </div>
              <span className="text-lg">€{breakdown.accommodation}</span>
            </div>
            <div className="w-full h-2.5 bg-current/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#00ffcc] shadow-[0_0_10px_rgba(0,255,204,0.5)] rounded-full" style={{ width: '55%' }} />
            </div>
          </div>

          {/* Item: Food */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-black uppercase text-[11px] tracking-widest">
              <div className="flex items-center gap-3">
                <Utensils size={16} className="text-[#00ffcc]" />
                <span>Food & Drink</span>
              </div>
              <span className="text-lg">€{breakdown.food}</span>
            </div>
            <div className="w-full h-2.5 bg-current/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#00ffcc] opacity-70 rounded-full" style={{ width: '30%' }} />
            </div>
          </div>

          {/* Item: Esperienze */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-black uppercase text-[11px] tracking-widest">
              <div className="flex items-center gap-3">
                <Ticket size={16} className="text-[#00ffcc]" />
                <span>Esperienze</span>
              </div>
              <span className="text-lg">€{breakdown.leisure}</span>
            </div>
            <div className="w-full h-2.5 bg-current/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#00ffcc] opacity-40 rounded-full" style={{ width: '15%' }} />
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-gradient-to-br from-[#00ffcc]/10 to-transparent rounded-[2rem] border border-[#00ffcc]/20">
          <p className="text-[12px] font-medium leading-relaxed italic opacity-80 text-center">
            "Stima basata su medie stagionali 2026. Voli e shopping non inclusi."
          </p>
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-in {
          animation: modal-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default BudgetBreakdown;