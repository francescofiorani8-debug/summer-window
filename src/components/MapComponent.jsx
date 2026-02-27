import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON, CircleMarker, Marker, useMap, Pane } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { hotCities } from '../data/cities';

// --- DEFINIZIONE DELL'ICONA PULSANTE (FIX) ---
const pulseIcon = L.divIcon({
  className: 'relative',
  html: `
    <div class="absolute -translate-x-1/2 -translate-y-1/2">
      <div class="w-8 h-8 bg-[#6d4aff] rounded-full animate-ping opacity-40"></div>
    </div>
  `,
  iconSize: [0, 0],
});

function MapController({ selectedCity }) {
  const map = useMap();
  useEffect(() => {
    if (selectedCity) map.flyTo(selectedCity.coords, 7, { duration: 1.2 });
  }, [selectedCity, map]);
  return null;
}

const MapComponent = ({ darkMode, selectedCity, onSelectCity, recommendedIds = [] }) => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data));
  }, []);

  const geoStyle = {
    fillColor: darkMode ? '#1a1d23' : '#76c876',
    weight: 1,
    color: darkMode ? '#2d333b' : '#ffffff',
    fillOpacity: 1,
  };

  const seaColor = darkMode ? '#0b0e11' : '#a5d8ff';

  return (
    <div className="h-full w-full relative" style={{ backgroundColor: seaColor }}>
      
      {/* LEGENDA MAPPA */}
      <div className={`absolute bottom-8 left-8 z-[1000] p-4 rounded-2xl border backdrop-blur-md transition-all duration-500
        ${darkMode ? 'bg-slate-900/80 border-white/10 text-white' : 'bg-white/80 border-slate-200 text-black'}`}>
        <h4 className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-50">Legenda Metriche</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#6d4aff] shadow-[0_0_10px_rgba(109,74,255,0.5)]"></div>
            <span className="text-xs font-bold">I Tuoi Match (AI)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#00ffcc]"></div>
            <span className="text-xs font-bold">Mete in Trend</span>
          </div>
        </div>
      </div>

      <MapContainer 
        center={[30, 10]} 
        zoom={3} 
        zoomControl={false} 
        className="h-full w-full"
        style={{ backgroundColor: seaColor }}
      >
        {geoData && (
          <GeoJSON 
            key={darkMode ? 'dark-geo' : 'light-geo'} 
            data={geoData} 
            style={geoStyle} 
          />
        )}

        <Pane name="top-markers" style={{ zIndex: 650 }}>
          {hotCities.map((city) => {
            const isRecommended = recommendedIds.includes(city.name);
            return (
              <React.Fragment key={`${city.name}-${darkMode}`}>
                <CircleMarker
                  center={city.coords}
                  radius={isRecommended ? 12 : 6}
                  pathOptions={{
                    fillColor: isRecommended ? '#6d4aff' : '#00ffcc',
                    color: darkMode ? '#ffffff' : '#333333',
                    weight: isRecommended ? 3 : 1,
                    fillOpacity: 1,
                  }}
                  eventHandlers={{ click: () => onSelectCity(city) }}
                />
                {isRecommended && (
                  <Marker position={city.coords} icon={pulseIcon} interactive={false} />
                )}
              </React.Fragment>
            );
          })}
        </Pane>

        <MapController selectedCity={selectedCity} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;