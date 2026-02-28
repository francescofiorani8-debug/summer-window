import React from 'react';

const CityGallery = ({ cities, darkMode, onBack, onSelectCity, toggleTheme, onLogoClick }) => {
  const textColor = darkMode ? 'text-white' : 'text-slate-900';
  const subTextColor = darkMode ? 'text-slate-400' : 'text-slate-500';
  const bgColor = darkMode ? 'bg-[#0b0e11]' : 'bg-slate-50';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} p-8 pb-32 transition-colors duration-500 relative`}>
      
      {/* Header Gallery */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center mb-16">
        <button 
          onClick={onBack} 
          className="text-[#6d4aff] font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
        >
          ← Back to Welcome
        </button>
        
        <div className={`text-2xl font-black tracking-tighter ${darkMode ? 'text-white' : 'text-black'}`}>
          <h1 
            onClick={onLogoClick} 
            className="cursor-pointer hover:opacity-80 transition-opacity font-black tracking-tighter text-3xl"
          >
          SummerWindow<span className="text-[#6d4aff]">.</span>
          </h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-[#6d4aff] font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">
            Database Esplorativo 2026
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-none">
            Libera l'ispirazione.
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl font-medium opacity-60 ${textColor}`}>
            Sfoglia la collezione completa delle nostre destinazioni predittive senza alcun filtro algoritmo.
          </p>
        </div>

        {/* Griglia di Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cities.map((city) => (
            <div 
              key={city.name}
              onClick={() => onSelectCity(city)}
              className={`group cursor-pointer rounded-[3rem] overflow-hidden border transition-all duration-500 hover:-translate-y-2
                ${darkMode 
                  ? 'bg-white/5 border-white/10 hover:border-[#6d4aff] hover:shadow-[0_20px_40px_rgba(109,74,255,0.15)]' 
                  : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:border-[#6d4aff]'}`}
            >
              {/* Immagine con Overlay */}
              <div className="h-72 overflow-hidden relative">
                <img 
                  src={city.img} 
                  alt={city.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                   <span className="text-white text-xs font-black uppercase tracking-widest">Visualizza Report →</span>
                </div>
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter">
                  {city.country}
                </div>
              </div>
              
              {/* Contenuto Card */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-black tracking-tighter leading-none">{city.name}</h3>
                  <div className="flex gap-0.5">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className={`text-sm font-black ${i < city.budget ? 'text-[#6d4aff]' : 'opacity-20'}`}>€</span>
                    ))}
                  </div>
                </div>
                
                <p className={`text-sm leading-relaxed mb-8 line-clamp-2 font-medium ${subTextColor}`}>
                  {city.desc}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
                    {city.tags.type}
                  </span>
                  <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
                    {city.tags.mood}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tasto Switch Tema (Floating) */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-10 right-10 z-[10000] w-16 h-16 rounded-2xl bg-[#6d4aff] text-white shadow-[0_10px_30px_rgba(109,74,255,0.4)] flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Footer Minimal */}
      <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t border-current opacity-10 flex justify-between items-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">SummerWindow AI Index</p>
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">Global Database Access 2026</p>
      </footer>
    </div>
  );
};

export default CityGallery;