import React, { useEffect, useRef } from 'react';
import { 
  ArrowLeft, Camera, Zap, Globe, Navigation, Plane, Star, Info, 
  MapPin, Calendar, CreditCard, Sparkles 
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- FIX ICONE LEAFLET ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => { 
    if (coords) map.setView(coords, 13); 
  }, [coords, map]);
  return null;
}

const CityDetailView = ({ city, onBack, darkMode = true }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  }, [city]);

  if (!city) return null;

  const accentColor = "#2dd4bf"; // Verde Acqua Glitterato
  
  const theme = {
    bg: darkMode ? 'bg-[#0b0e11]' : 'bg-slate-50',
    text: darkMode ? 'text-white' : 'text-slate-900',
    textMuted: darkMode ? 'text-white/50' : 'text-slate-500',
    card: darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm',
    vibeBox: darkMode ? 'bg-[#0b0e11]/90' : 'bg-white',
    mapLayer: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    backBtn: darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-900/5 border-slate-900/10 text-slate-900'
  };

  return (
    <div 
      ref={scrollContainerRef}
      className={`fixed inset-0 z-[10000] ${theme.bg} ${theme.text} overflow-y-auto scroll-smooth selection:bg-[#2dd4bf] selection:text-slate-900`}
    >
      {/* --- BOTTONE BACK --- */}
      <button 
        onClick={onBack}
        className={`fixed top-8 left-8 z-[10100] group flex items-center gap-4 backdrop-blur-2xl border px-6 py-3 rounded-full transition-all active:scale-95 ${theme.backBtn}`}
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Indietro</span>
      </button>

      {/* --- HERO SECTION --- */}
      <div className="relative h-[100vh] w-full overflow-hidden">
        {/* Immagine Principale con controllo fallback */}
        <img 
          src={city.img || city.imageUrl} 
          alt={city.name} 
          className="w-full h-full object-cover scale-105 animate-[pulse_8s_ease-in-out_infinite]"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80'; }}
        />
        <div className={`absolute inset-0 bg-gradient-to-b from-black/40 via-transparent ${darkMode ? 'to-[#0b0e11]' : 'to-slate-50'}`}></div>
        
        <div className="absolute bottom-0 left-0 w-full p-12 md:p-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <span style={{ backgroundColor: accentColor }} className="text-slate-900 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(45,212,191,0.4)]">
                {city.country}
              </span>
              <div className="flex items-center gap-2">
                 <Sparkles size={14} style={{ color: accentColor }} />
                 <span className={`text-[10px] font-black uppercase tracking-[0.4em] text-white/80`}>
                  {city.trend}
                </span>
              </div>
            </div>
            <h1 className="text-[15vw] md:text-[10rem] font-black leading-[0.8] tracking-tighter mb-10 text-white drop-shadow-2xl">
              {city.name}
            </h1>
          </div>
        </div>
      </div>

      {/* --- VIBE DASHBOARD --- */}
      <div className="relative z-10 -mt-24 px-6">
        <div className={`max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 p-4 rounded-[3rem] ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-200/50 border-slate-200'} backdrop-blur-3xl border shadow-2xl`}>
          {Object.entries(city.vibeData).map(([key, value]) => (
            <div key={key} className={`${theme.vibeBox} py-8 px-4 rounded-[2.5rem] flex flex-col items-center group transition-all border border-transparent hover:border-teal-400/30 shadow-lg`}>
              <span className={`text-[8px] font-black uppercase tracking-[0.2em] mb-4 text-center ${theme.textMuted}`}>{key}</span>
              <div className="relative flex items-center justify-center w-16 h-16">
                <span className="text-lg font-black tracking-tighter z-10">{value}%</span>
                <svg className="absolute inset-0 w-full h-full -rotate-90 scale-110">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" fill="transparent" className={darkMode ? 'text-white/5' : 'text-slate-100'} />
                  <circle cx="32" cy="32" r="28" stroke={accentColor} strokeWidth="3" fill="transparent" strokeDasharray={176} strokeDashoffset={176 - (176 * value) / 100} strokeLinecap="round" className="drop-shadow-[0_0_5px_rgba(45,212,191,0.6)]" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-40 py-40">
        
        {/* --- SECTION 1: OVERVIEW --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-7 space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[2px]" style={{ backgroundColor: accentColor }}></div>
                <h3 className="text-sm font-black uppercase tracking-[0.5em]" style={{ color: accentColor }}>L'Esperienza 2026</h3>
              </div>
              <p className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight mb-12">
                {city.fullDescription.longText.split('.')[0]}.
              </p>
              <p className={`text-xl leading-relaxed font-light ${theme.textMuted}`}>
                {city.fullDescription.longText.split('.').slice(1).join('.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {city.fullDescription.keyFeatures.map((feature, i) => (
                <div key={i} className={`group border p-8 rounded-[2rem] transition-all ${theme.card} hover:border-teal-400/50`}>
                  <Zap style={{ color: accentColor }} className="mb-6 group-hover:rotate-12 transition-transform" size={32} />
                  <span className="text-xl font-bold tracking-tight block leading-tight">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-10">
            {/* MAPPA */}
            <div className={`p-4 rounded-[3rem] border shadow-2xl ${theme.card}`}>
              <div className="h-[400px] w-full rounded-[2.5rem] overflow-hidden border border-white/5">
                <MapContainer center={city.coords} zoom={13} scrollWheelZoom={false} style={{ height: '100%', background: '#f8fafc' }}>
                  <TileLayer url={theme.mapLayer} />
                  <Marker position={city.coords}><Popup>{city.name}</Popup></Marker>
                  <RecenterMap coords={city.coords} />
                </MapContainer>
              </div>
            </div>

            {/* LOGISTICS CARD */}
            <div style={{ backgroundColor: accentColor }} className="p-12 rounded-[3.5rem] text-slate-900 relative overflow-hidden group shadow-2xl shadow-teal-500/20">
              <Globe className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 transition-transform duration-[2000ms]" size={240} />
              <h4 className="text-3xl font-black mb-10 tracking-tighter">Trip Logistics</h4>
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-end border-b border-slate-900/10 pb-4">
                  <div className="flex items-center gap-2">
                    <CreditCard size={14} /><span className="text-[10px] font-black uppercase tracking-widest opacity-60">Budget</span>
                  </div>
                  <span className="text-2xl font-black">{"€".repeat(city.budget)}</span>
                </div>
                <div className="flex justify-between items-end border-b border-slate-900/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} /><span className="text-[10px] font-black uppercase tracking-widest opacity-60">Best Period</span>
                  </div>
                  <span className="text-lg font-bold capitalize">{city.bestMonths.join(' • ')}</span>
                </div>
                <button className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all mt-4">
                  Pianifica Ora
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: LANDMARKS (FIX FOTO) --- */}
        <section className="space-y-20">
          <div className="flex flex-col items-center text-center space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.5em]" style={{ color: accentColor }}>Exploration</h3>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter">Must See Vibes</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {city.fullDescription.landmarks.map((mark, i) => (
              <div key={i} className={`group relative aspect-[4/5] rounded-[3.5rem] overflow-hidden border transition-all duration-700 hover:-translate-y-4 ${theme.card}`}>
                {/* IMMAGINE LANDMARK - AGGIUNTA QUI */}
                <img 
                  src={mark.img || `https://source.unsplash.com/featured/?${mark.name.replace(/\s/g, '')},architecture`} 
                  alt={mark.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                />
                
                {/* Overlay Gradiente per leggibilità */}
                <div className={`absolute inset-0 z-10 bg-gradient-to-t ${darkMode ? 'from-[#0b0e11] via-[#0b0e11]/60' : 'from-white via-white/60'} to-transparent`} />
                
                <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end">
                   <div style={{ backgroundColor: accentColor }} className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:rotate-[360deg] transition-transform duration-1000">
                      <Camera className="text-slate-900" size={24} />
                   </div>
                   <h4 className="text-3xl font-black mb-4 tracking-tighter drop-shadow-md">{mark.name}</h4>
                   <p className={`${darkMode ? 'text-white/80' : 'text-slate-800'} leading-relaxed font-medium line-clamp-3 group-hover:line-clamp-none transition-all duration-500`}>
                      {mark.desc}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* --- FOOTER --- */}
      <footer className={`py-60 text-center relative overflow-hidden ${darkMode ? 'bg-gradient-to-t from-teal-900/20' : 'bg-gradient-to-t from-teal-50'}`}>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 style={{ color: accentColor }} className="text-[15vw] font-black tracking-tighter leading-none mb-12 opacity-20 uppercase select-none">
            {city.name}
          </h2>
          <div className="space-y-8">
            <p className="text-2xl font-light opacity-60 italic tracking-wide">"Il viaggio dei tuoi sogni inizia qui."</p>
            <button 
              onClick={onBack}
              style={{ backgroundColor: accentColor }}
              className="text-slate-900 px-16 py-6 rounded-full font-black uppercase text-xs tracking-[0.3em] hover:scale-110 shadow-2xl transition-all"
            >
              Torna alla ricerca
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CityDetailView;