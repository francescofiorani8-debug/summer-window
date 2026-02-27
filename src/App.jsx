import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import MapComponent from './components/MapComponent';
import WelcomeScreen from './components/Welcome';
import HomeOverview from './components/HomeOverview';
import DetailsSidebar from './components/DetailsSidebar';
import QuizScreen from './components/QuizScreen';
import CityReport from './components/CityReport'; 
import { hotCities } from './data/cities';

function App() {
  const [view, setView] = useState('welcome');
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);

  // --- LOGICA DI SCORING PREDITTIVO AVANZATO ---
  const recommendedCities = useMemo(() => {
    if (!userPreferences) return hotCities;

    return hotCities
      .map(city => {
        let score = 0;
        const hasSeasonMatch = userPreferences.periodMonths?.some(month => 
          city.bestMonths.includes(month)
        );
        if (hasSeasonMatch) score += 4;
        if (city.tags.type === userPreferences.type) score += 3;
        if (city.tags.mood === userPreferences.mood) score += 2;
        if (city.tags.age === userPreferences.age) score += 1;

        return { ...city, matchScore: score };
      })
      .filter(city => city.matchScore > 2) 
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [userPreferences]);

  const themeClasses = `${darkMode ? 'dark bg-[#0b0e11]' : 'bg-slate-50'} transition-colors duration-500`;

  const handleResetQuiz = () => {
  setUserPreferences(null);
  setView('quiz');
  };

  // --- LOGICA DI NAVIGAZIONE ---
  
  // 1. Schermata Iniziale (Deve scrollare)
  if (view === 'welcome') {
    return <WelcomeScreen onStart={() => setView('quiz')} darkMode={darkMode} />;
  }

  // 2. Schermata Quiz (Fissa)
  if (view === 'quiz') {
    return (
      <QuizScreen 
        darkMode={darkMode} 
        onFinish={(prefs) => {
          setUserPreferences(prefs);
          setView('home');
        }} 
      />
    );
  }

  // 3. Schermata Report (Deve scrollare)
  if (view === 'report' && selectedCity) {
    return (
      <CityReport 
        city={selectedCity} 
        darkMode={darkMode} 
        onBack={() => setView('map')} 
        onGoHome={() => {
          setView('home');
          setSelectedCity(null);
        }}
      />
    );
  }

  return (
    <div className={themeClasses}>
      {/* FIX SCROLL: 
          Se siamo nella mappa, usiamo h-screen e overflow-hidden.
          Se siamo nella Home, usiamo min-h-screen e permettiamo lo scroll.
      */}
      <div className={`w-full relative ${view === 'map' ? 'h-screen overflow-hidden' : 'min-h-screen overflow-y-auto'}`}>

        {/* VISTA HOME */}
        {view === 'home' && (
          <HomeOverview
            onGoToMap={() => setView('map')}
            onResetQuiz={handleResetQuiz} // <--- Nuova prop
            toggleTheme={() => setDarkMode(!darkMode)}
            darkMode={darkMode}
            userPrefs={userPreferences}
            recommendedCount={recommendedCities.length}
            bestMatch={recommendedCities[0]}
          />
        )}

        {/* VISTA MAPPA */}
        {view === 'map' && (
          <div className="h-full w-full flex relative overflow-hidden">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="fixed bottom-8 right-8 z-[6000] w-14 h-14 rounded-full bg-[#6d4aff] text-white shadow-xl flex items-center justify-center text-2xl hover:scale-110 transition-transform"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            <Sidebar
              cities={recommendedCities} 
              onSelectCity={setSelectedCity}
              onGoHome={() => setView('home')}
              darkMode={darkMode}
            />

            <main className="flex-1 relative h-full">
              <MapComponent
                darkMode={darkMode}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
                recommendedIds={recommendedCities.slice(0, 5).map(c => c.name)}
              />
            </main>

            <DetailsSidebar
              city={selectedCity}
              onClose={() => setSelectedCity(null)}
              darkMode={darkMode}
              onViewReport={() => setView('report')} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;