import React from 'react';

const CityGallery = ({ cities, darkMode, onBack, onSelectCity, toggleTheme }) => {
  const textColor = darkMode ? 'text-white' : 'text-slate-900';
  const bgColor = darkMode ? 'bg-[#0b0e11]' : 'bg-slate-50';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} p-8 transition-colors duration-500`}>
      {/* Header Gallery */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center mb-16">
        <button onClick={onBack} className="text-[#6d4aff] font-bold flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
          ← Torna al Welcome
        </button>
        <div className="flex items-center gap-6">
           <button onClick={toggleTheme} className="text-2xl">{darkMode ? '☀️' : '🌙'}</button>
           <h2 className="text-2xl font-black tracking-tighter">SummerWindow Gallery</h2>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-4">Esplora il Mondo</h1>
          <p className="opacity-60 font-medium">Tutte le destinazioni SummerWindow 2026 in un unico sguardo.</p>
        </div>

        {/* Griglia di Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cities.map((city) => (
            <div 
              key={city.name}
              onClick={() => onSelectCity(city)}
              className={`group cursor-pointer rounded-[2.5rem] overflow-hidden border-2 transition-all duration-500
                ${darkMode ? 'bg-white/5 border-white/10 hover:border-[#6d4aff]' : 'bg-white border-slate-200 hover:border-[#6d4aff] shadow-xl'}`}
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={city.img} 
                  alt={city.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold">
                  {city.country}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-2xl font-black">{city.name}</h3>
                  <span className="text-[#6d4aff] font-bold text-xs">
                    {city.budget === 1 ? '€' : city.budget === 2 ? '€€' : '€€€'}
                  </span>
                </div>
                <p className="text-sm opacity-60 line-clamp-2 mb-6 font-medium">
                  {city.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider ${darkMode ? 'bg-white/10' : 'bg-slate-100'}`}>
                    {city.tags.type}
                  </span>
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider ${darkMode ? 'bg-white/10' : 'bg-slate-100'}`}>
                    {city.tags.mood}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityGallery;