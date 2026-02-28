import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose, onLogin, darkMode }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Overlay con sfocatura profonda */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
        onClick={onClose}
      ></div>

      {/* Box della Modale */}
      <div className={`relative w-full max-w-md p-10 rounded-[3rem] shadow-3xl border transform animate-scale-up
        ${darkMode 
          ? 'bg-[#1a1d23]/90 border-white/10 text-white' 
          : 'bg-white/90 border-slate-200 text-black'}`}>
        
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-xl opacity-50 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-black tracking-tighter mb-2">
            {isSignUp ? 'Unisciti a noi' : 'Bentornato'}
            <span className="text-[#6d4aff]">.</span>
          </h2>
          <p className={`text-xs font-bold uppercase tracking-[0.2em] opacity-60`}>
            {isSignUp ? 'Salva i tuoi match per l\'estate 2026' : 'Accedi al tuo passaporto digitale'}
          </p>
        </div>

        {/* Social Login (Stile futuristico) */}
        <div className="flex flex-col gap-3 mb-8">
          <button className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all flex items-center justify-center gap-3
            ${darkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>
            <span className="text-lg">G</span> Continua con Google
          </button>
        </div>

        <div className="relative mb-8 text-center">
          <div className={`absolute inset-0 flex items-center`}>
            <div className={`w-full border-t ${darkMode ? 'border-white/10' : 'border-slate-200'}`}></div>
          </div>
          <span className={`relative px-4 text-[9px] font-black uppercase tracking-[0.3em] ${darkMode ? 'bg-[#1a1d23] text-white/30' : 'bg-white text-black/30'}`}>
            Oppure
          </span>
        </div>

        {/* Form Tradizionale */}
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <input 
            type="email" 
            placeholder="EMAIL"
            className={`w-full px-6 py-4 rounded-2xl text-[11px] font-bold tracking-widest outline-none border transition-all
              ${darkMode 
                ? 'bg-black/20 border-white/5 focus:border-[#6d4aff]' 
                : 'bg-slate-50 border-slate-100 focus:border-[#6d4aff]'}`}
          />
          <input 
            type="password" 
            placeholder="PASSWORD"
            className={`w-full px-6 py-4 rounded-2xl text-[11px] font-bold tracking-widest outline-none border transition-all
              ${darkMode 
                ? 'bg-black/20 border-white/5 focus:border-[#6d4aff]' 
                : 'bg-slate-50 border-slate-100 focus:border-[#6d4aff]'}`}
          />
          
          <button className="mt-4 w-full py-5 bg-[#6d4aff] text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#6d4aff]/30">
            {isSignUp ? 'Crea Account' : 'Accedi'}
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-widest opacity-60">
          {isSignUp ? 'Hai già un account?' : 'Non hai un account?'}
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-2 text-[#6d4aff] hover:underline"
          >
            {isSignUp ? 'Accedi' : 'Registrati'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;