import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import MapComponent from './components/MapComponent';
import WelcomeScreen from './components/Welcome';
import HomeOverview from './components/HomeOverview';
import DetailsSidebar from './components/DetailsSidebar';
import QuizScreen from './components/QuizScreen';
import CityReport from './components/CityReport'; 
import CityGallery from './components/CityGallery'; // Assicurati di aver creato questo file
import { hotCities } from './data/cities';

function App() {
  const [view, setView] = useState('welcome');
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);

  // --- LOGICA DI SCORING NORMALIZZATA (MAX 100%) ---
  const recommendedCities = useMemo(() => {
    if (!userPreferences) return hotCities;

    // Punteggio massimo teorico: 6 (Season) + 5 (Type) + 8 (Budget) + 3 (Mood) + 3 (Age) = 25
    const MAX_ALLOWED_SCORE = 25;

    return hotCities
      .map(city => {
        let currentScore = 0;

        // 1. Stagione (Max 6)
        const hasSeasonMatch = userPreferences.periodMonths?.some(month => 
          city.bestMonths.includes(month)
        );
        if (hasSeasonMatch) currentScore += 6; 

        // 2. Atmosfera (Max 5)
        if (city.tags.type === userPreferences.type) currentScore += 5;

        // 3. Budget (Max 8)
        const cityBudget = Number(city.budget);
        const userBudget = Number(userPreferences.budget);
        if (cityBudget === userBudget) {
          currentScore += 8; 
        } else if (Math.abs(cityBudget - userBudget) === 1) {
          currentScore += 3;
        }

        // 4. Mood (Max 3)
        if (city.tags.mood === userPreferences.mood) currentScore += 3;

        // 5. Età (Max 3)
        if (city.tags.age === userPreferences.age) currentScore += 3;

        // Calcolo percentuale pulito
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
        onExploreGallery={() => setView('gallery')} // FIX: Prop aggiunta per risolvere l'errore
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
        onBack={() => setView('map')} 
        onGoHome={handleFullReset} // Utilizza il reset totale per il logo o tasto home
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
              onSelectCity={setSelectedCity}
              onGoHome={() => setView('home')}
              onLogoClick={handleFullReset} // Aggiunto per coerenza navigazione
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