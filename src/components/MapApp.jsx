import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MapComponent from './MapComponent';
import DetailsSidebar from './DetailsSidebar';
import { hotCities } from '../data/cities';

const MapApp = ({ onBackHome, darkMode }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="relative h-screen w-full flex overflow-hidden">
      {/* Tasto Hamburger per la Sidebar */}
      <button 
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="fixed top-5 left-5 z-[9999] bg-brand text-white p-3 rounded-lg shadow-lg"
      >
        ☰
      </button>

      {/* Navigazione Home "Melted" */}
      <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-[2000] p-4 bg-gradient-to-b from-black/80 to-transparent w-full flex justify-center pointer-events-none">
        <button 
          onClick={onBackHome}
          className="pointer-events-auto bg-brand/20 backdrop-blur-md border border-brand/50 text-white px-6 py-2 rounded-full hover:bg-brand transition-all"
        >
          🏠 Home
        </button>
      </nav>

      {/* Sidebar Sinistra */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-[330px]' : 'w-0'}`}>
        {isSidebarOpen && (
          <Sidebar 
            onSelectCity={(city) => setSelectedCity(city)} 
          />
        )}
      </div>

      {/* Area Mappa */}
      <main className="flex-1 relative bg-sea">
        <MapComponent 
          darkMode={darkMode} 
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
        />
      </main>

      {/* Sidebar Dettagli Destra */}
      <DetailsSidebar 
        city={selectedCity} 
        onClose={() => setSelectedCity(null)} 
      />
    </div>
  );
};

export default MapApp;