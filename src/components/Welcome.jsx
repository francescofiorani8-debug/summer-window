import React, { useState, useEffect } from 'react';

const WelcomeScreen = ({ onStart, darkMode, onExploreGallery }) => {
  const [scrollY, setScrollY] = useState(0);

  // Gestione dello scroll per l'effetto parallasse
  useEffect(() => {
    const handleScroll = (e) => {
      setScrollY(e.target.scrollTop);
    };
    const container = document.getElementById('welcome-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div 
      id="welcome-container"
      className={`h-screen overflow-y-auto overflow-x-hidden custom-scrollbar transition-colors duration-700 relative
      ${darkMode ? 'bg-[#0b0e11] text-white' : 'bg-white text-black'}`}
    >
      
      {/* Elementi Decorativi di Sfondo */}
      <div 
        className="fixed top-20 left-10 w-64 h-64 bg-[#6d4aff]/10 rounded-full blur-[100px] pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      ></div>
      <div 
        className="fixed bottom-20 right-10 w-96 h-96 bg-[#76c876]/10 rounded-full blur-[120px] pointer-events-none"
        style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
      ></div>

      {/* SEZIONE 1: Copertina (Hero) */}
      <section className="h-screen flex flex-col items-center justify-center relative px-8 text-center z-10">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-30 pointer-events-none"
        >
          <source src="/video/welcome-screen.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-current opacity-20"></div>
        
        <div 
          style={{ 
            transform: `translateY(${scrollY * 0.4}px)`, 
            opacity: 1 - scrollY / 600 
          }}
          className="transition-opacity duration-300"
        >
          <span className="text-[#6d4aff] font-black uppercase tracking-[0.4em] text-sm mb-4 block">
            Travel Predictions
          </span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-none">
            Summer<span className="text-[#6d4aff]">Window</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-60 max-w-2xl mx-auto font-medium">
            Non scegliere una meta. Prevedi dove vorrai essere stato.
          </p>
        </div>

        <div 
          className="absolute bottom-10 animate-bounce opacity-30"
          style={{ opacity: 1 - scrollY / 200 }}
        >
          <span className="text-2xl">↓</span>
        </div>
      </section>

      {/* SEZIONE 2: Intro narrativa */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 py-20 bg-[#6d4aff]/5 relative z-20 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
        <div 
          className="max-w-4xl mx-auto text-center transition-all duration-700"
          style={{ 
            transform: `translateY(${(scrollY - 800) * 0.1}px)`,
            opacity: scrollY > 300 ? 1 : 0 
          }}
        >
          <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tight leading-none">
            Perché accontentarsi dei posti <span className="text-[#6d4aff]">"già visti"</span>?
          </h2>
          <p className="text-xl md:text-3xl leading-relaxed opacity-80 mb-12 font-medium">
            Senti già il rumore della folla? <br/>
            Noi ti portiamo dove il silenzio sta per diventare <span className="text-[#6d4aff] font-black italic">il nuovo trend</span>.
          </p>
          <div className="w-24 h-1 bg-[#6d4aff] mx-auto mb-12 opacity-30"></div>
          <p className="text-lg opacity-60 max-w-2xl mx-auto">
            SummerWindow analizza i segnali deboli del mercato turistico globale per offrirti l'anteprima assoluta dell'Estate 2026.
          </p>
        </div>
      </section>

      {/* SEZIONE 3: Il Tasto Finale & Gallery Access */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 relative z-30 space-y-12">
        
        {/* Box Principale CTA Quiz */}
        <div 
          className={`text-center p-12 md:p-20 rounded-[4rem] border transition-all duration-1000 transform
            ${scrollY > 1200 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
            ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-2xl'}`}
        >
          <h3 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
            Pronto per il <br/> <span className="text-[#6d4aff]">prossimo capitolo</span>?
          </h3>
          <p className="mb-12 opacity-60 font-bold text-lg uppercase tracking-widest">
            5 Domande. 20 Mete. 1 Match perfetto.
          </p>
          <button 
            onClick={onStart}
            className="bg-[#6d4aff] text-white px-12 py-6 rounded-3xl font-black text-2xl shadow-2xl shadow-[#6d4aff]/40 hover:bg-[#5a39e6] hover:scale-105 transition-all active:scale-95 group"
          >
            Personalizza l'esperienza 
            <span className="inline-block ml-4 group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>

        {/* SEZIONE DISTACCATA: Lasciati Ispirare */}
        <div 
          className={`flex flex-col items-center gap-6 transition-all duration-1000 delay-300
            ${scrollY > 1300 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="w-12 h-px bg-current opacity-20"></div>
          
          <button
            onClick={onExploreGallery}
            className={`group flex items-center gap-3 px-10 py-5 border-2 rounded-2xl font-black text-lg uppercase tracking-widest transition-all
              ${darkMode 
                ? 'border-white/10 text-white hover:border-[#6d4aff] hover:bg-[#6d4aff]/5' 
                : 'border-slate-200 text-slate-900 hover:border-[#76c876] hover:bg-slate-100'}`}
          >
            <span className="text-xl group-hover:rotate-12 transition-transform">✨</span>
            Lasciati Ispirare
          </button>

          <p className="opacity-40 text-[10px] uppercase tracking-[0.3em] font-bold">
            Esplora il database senza filtri
          </p>
        </div>
        
        <footer className="pt-20 pb-10 opacity-20 text-[10px] uppercase tracking-widest font-black">
          SummerWindow Algorithm Research v1.0
        </footer>
      </section>
    </div>
  );
};

export default WelcomeScreen;