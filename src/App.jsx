import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import MapComponent from './components/MapComponent';
import WelcomeScreen from './components/Welcome';
import HomeOverview from './components/HomeOverview';
import DetailsSidebar from './components/DetailsSidebar';
import QuizScreen from './components/QuizScreen';
import CityReport from './components/CityReport'; 
import CityGallery from './components/CityGallery';
import { hotCities } from './data/cities';

function App() {
  const [view, setView] = useState('welcome');
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);
  
  // --- NUOVO STATO: Ricorda da dove veniamo per il tasto "Back" ---
  const [lastView, setLastView] = useState('welcome');

  // --- LOGICA DI SCORING NORMALIZZATA ---
  const recommendedCities = useMemo(() => {
    if (!userPreferences) return hotCities;
    const MAX_ALLOWED_SCORE = 25;

    return hotCities
      .map(city => {
        let currentScore = 0;
        const hasSeasonMatch = userPreferences.periodMonths?.some(month => 
          city.bestMonths.includes(month)
        );
        if (hasSeasonMatch) currentScore += 6; 
        if (city.tags.type === userPreferences.type) currentScore += 5;

        const cityBudget = Number(city.budget);
        const userBudget = Number(userPreferences.budget);
        if (cityBudget === userBudget) {
          currentScore += 8; 
        } else if (Math.abs(cityBudget - userBudget) === 1) {
          currentScore += 3;
        }

        if (city.tags.mood === userPreferences.mood) currentScore += 3;
        if (city.tags.age === userPreferences.age) currentScore += 3;

        const finalPercentage = Math.min(Math.round((currentScore / MAX_ALLOWED_SCORE) * 100), 100);
        return { ...city, matchScore: finalPercentage };
      })
      .filter(city => city.matchScore >= 20) 
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [userPreferences]);

  const themeClasses = `${darkMode ? 'dark bg-[#0b0e11]' : 'bg-slate-50'} transition-colors duration-500`;

  // --- FUNZIONI DI NAVIGAZIONE ---
  
  const handleFullReset = () => {
    setUserPreferences(null);
    setSelectedCity(null);
    setView('welcome');
  };

  const handleResetQuiz = () => {
    setUserPreferences(null);
    setView('quiz');
  };

  // --- RENDERING CONDIZIONALE ---

  if (view === 'welcome') {
    return (
      <WelcomeScreen 
        onStart={() => setView('quiz')} 
        onExploreGallery={() => setView('gallery')}
        darkMode={darkMode} 
      />
    );
  }

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

  if (view === 'gallery') {
    return (
      <CityGallery
        cities={hotCities}
        darkMode={darkMode}
        onBack={() => setView('welcome')}
        onSelectCity={(city) => {
          setSelectedCity(city);
          setLastView('gallery'); // SALVA LA PROVENIENZA
          setView('report');
        }}
        toggleTheme={() => setDarkMode(!darkMode)}
      />
    );
  }

  if (view === 'report' && selectedCity) {
    return (
      <CityReport 
        city={selectedCity} 
        darkMode={darkMode} 
        // TORNA ALLA VISTA PRECEDENTE (Gallery o Map)
        onBack={() => setView(lastView)} 
        onGoHome={handleFullReset}
      />
    );
  }

  return (
    <div className={themeClasses}>
      <div className={`w-full relative ${view === 'map' ? 'h-screen overflow-hidden' : 'min-h-screen overflow-y-auto'}`}>

        {/* VISTA HOME */}
        {view === 'home' && (
          <HomeOverview
            onGoToMap={() => setView('map')}
            onResetQuiz={handleResetQuiz}
            toggleTheme={() => setDarkMode(!darkMode)}
            darkMode={darkMode}
            userPrefs={userPreferences}
            recommendedCount={recommendedCities.length}
            bestMatch={recommendedCities[0]}
            onLogoClick={handleFullReset}
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
              onSelectCity={(city) => {
                  setSelectedCity(city);
                  // Opzionale: se selezioni dalla sidebar, chiudi dettagli o rimani in map
              }}
              onGoHome={() => setView('home')}
              onLogoClick={handleFullReset}
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
              onViewReport={() => {
                setLastView('map'); // SALVA LA PROVENIENZA
                setView('report');
              }} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;