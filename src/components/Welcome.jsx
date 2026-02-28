import React, { useState, useEffect } from 'react';

const WelcomeScreen = ({ onStart, darkMode, onExploreGallery, onStartGroup }) => {
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

  // Classi comuni per le card per garantire coerenza visiva
  const cardStyle = `text-center p-12 md:p-20 rounded-[4rem] border transition-all duration-1000 transform max-w-2xl w-full z-10
    ${darkMode ? 'bg-[#0b0e11]/60 backdrop-blur-xl border-white/10' : 'bg-white/80 backdrop-blur-md border-slate-200 shadow-2xl'}`;

  // Definizione dei gradienti per la Sezione 3
  // Dark: Da grigio scuro a viola/nero
  // Light: Da bianco/grigio a un azzurro/viola chiarissimo
  const section3Gradient = darkMode 
    ? 'bg-gradient-to-b from-[#0b0e11] via-[#1a1333] to-[#0b0e11]' 
    : 'bg-gradient-to-b from-white via-slate-100 to-slate-200';

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

      {/* SEZIONE 3: Doppia Card CTA + Gradiente Dinamico */}
      <section className={`min-h-[150vh] flex flex-col items-center justify-center px-8 relative z-30 space-y-16 py-32 transition-colors duration-1000 ${section3Gradient}`}>
        
        {/* CARD 1: Box Principale Quiz */}
        <div 
          className={`${cardStyle} ${scrollY > 1200 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        >
          <h3 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
            Pronto per il <br/> <span className="text-[#6d4aff]">prossimo capitolo</span>?
          </h3>
          <p className="mb-12 opacity-60 font-bold text-lg uppercase tracking-widest">
            5 Domande. 20 Mete. 1 Match perfetto.
          </p>
          <button 
            onClick={onStart}
            className="bg-[#6d4aff] text-white px-16 py-8 rounded-3xl font-black text-3xl shadow-2xl shadow-[#6d4aff]/40 hover:bg-[#5a39e6] hover:scale-105 transition-all active:scale-95 group"
          >
            Personalizza l'esperienza 
            <span className="inline-block ml-4 group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>

        {/* CARD 2: Sezione Lasciati Ispirare */}
        <div 
          className={`${cardStyle} transition-all duration-1000 delay-300
            ${scrollY > 1450 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        >
          <h3 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
            Vuoi solo <br/> <span className="text-[#00ffcc]">curiosare?</span>
          </h3>
          <p className="mb-12 opacity-60 font-bold text-lg uppercase tracking-widest">
            Esplora il database senza filtri
          </p>
          <button
            onClick={onExploreGallery}
            className="bg-[#6d4aff] text-white px-16 py-8 rounded-3xl font-black text-3xl shadow-2xl shadow-[#6d4aff]/40 hover:bg-[#5a39e6] hover:scale-105 transition-all active:scale-95 group"
          >
            <span className="text-xl group-hover:rotate-12 transition-transform mr-2">✨</span>
            Lasciati Ispirare
            <span className="inline-block ml-4 group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>

        {/* CARD 3: SOCIAL ROOM */}
        <div className={`${cardStyle} transition-all duration-1000 delay-500
          ${scrollY > 1700 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h3 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter">
            Viaggio di <br /> <span className="text-[#6d4aff]">Gruppo?</span>
          </h3>
          <p className="mb-10 opacity-50 font-bold text-sm uppercase tracking-widest">Trova il punto d'incontro perfetto per tutti</p>
          <button
            onClick={onStartGroup}
            className="bg-gradient-to-r from-[#6d4aff] to-[#00ffcc] text-white px-12 py-6 rounded-3xl font-black text-xl shadow-xl hover:scale-105 transition-all"
          >
            Crea Social Room 👥
          </button>
        </div>

        <footer className="pt-20 pb-10 opacity-20 text-[10px] uppercase tracking-widest font-black">
          SummerWindow Algorithm Research v1.0
        </footer>
      </section>
    </div>
  );
};

export default WelcomeScreen;