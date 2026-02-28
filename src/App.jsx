import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import MapComponent from './components/MapComponent';
import WelcomeScreen from './components/Welcome';
import HomeOverview from './components/HomeOverview';
import DetailsSidebar from './components/DetailsSidebar';
import QuizScreen from './components/QuizScreen';
import CityReport from './components/CityReport'; 
import CityGallery from './components/CityGallery';
import GroupManager from './components/GroupManager';
import BattleMode from './components/BattleMode'; 
import { hotCities } from './data/cities';

function App() {
  // --- STATI DI NAVIGAZIONE E TEMA ---
  const [view, setView] = useState('welcome');
  const [darkMode, setDarkMode] = useState(false);
  const [lastView, setLastView] = useState('welcome');

  // --- STATI UTENTE E GRUPPO ---
  const [userPreferences, setUserPreferences] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  
  // Stati per la Social Room
  const [isGroupMode, setIsGroupMode] = useState(false);
  const [groupParticipants, setGroupParticipants] = useState([]); 
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);

  // --- LOGICA DI SCORING AVANZATA (AI MATCHMAKING 2.0) ---
  const recommendedCities = useMemo(() => {
    if (!userPreferences && groupParticipants.length === 0) return hotCities;

    const MAX_ALLOWED_SCORE = 25;

    return hotCities
      .map(city => {
        let currentScore = 0;
        let groupReasons = []; 

        if (isGroupMode && groupParticipants.length > 0) {
          const allPrefs = groupParticipants.map(p => p.prefs).filter(p => p !== null);
          const numPeople = allPrefs.length;
          
          if (numPeople === 0) return { ...city, matchScore: 0 };

          // 1. SISTEMA DI VETO
          const isVetoed = allPrefs.some(pref => 
            pref.veto === city.tags.type || pref.veto === city.tags.mood
          );
          if (isVetoed) return { ...city, matchScore: 0, isVetoed: true };

          // 2. BUDGET DI GRUPPO
          const groupBudgets = allPrefs.map(p => Number(p.budget));
          const minBudgetNeeded = Math.min(...groupBudgets);
          const cityBudget = Number(city.budget);

          if (cityBudget <= minBudgetNeeded) {
            currentScore += 8;
            groupReasons.push("Rispetta il budget di tutti");
          } else if (cityBudget - minBudgetNeeded === 1) {
            currentScore += 3;
            groupReasons.push("Leggero extra-budget per alcuni");
          }

          // 3. MEDIAZIONE PREFERENZE
          let matches = { type: 0, season: 0, mood: 0 };

          allPrefs.forEach(pref => {
            const hasSeasonMatch = pref.periodMonths?.some(m => city.bestMonths.includes(m));
            if (hasSeasonMatch) {
                currentScore += (6 / numPeople);
                matches.season++;
            }
            if (city.tags.type === pref.type) {
                currentScore += (5 / numPeople);
                matches.type++;
            }
            if (city.tags.mood === pref.mood) {
                currentScore += (3 / numPeople);
                matches.mood++;
            }
            if (city.tags.age === pref.age) currentScore += (3 / numPeople);
          });

          if (matches.type >= numPeople / 2) groupReasons.push(`Atmosfera ${city.tags.type} approvata dalla maggioranza`);
          if (matches.season === numPeople) groupReasons.push(`Tutti sono liberi in questo periodo`);

        } else if (userPreferences) {
          // --- LOGICA SINGOLO UTENTE ---
          const hasSeasonMatch = userPreferences.periodMonths?.some(m => city.bestMonths.includes(m));
          if (hasSeasonMatch) currentScore += 6; 
          if (city.tags.type === userPreferences.type) currentScore += 5;

          const cityBudget = Number(city.budget);
          const userBudget = Number(userPreferences.budget);
          if (cityBudget <= userBudget) currentScore += 8; 
          else if (cityBudget - userBudget === 1) currentScore += 3;

          if (city.tags.mood === userPreferences.mood) currentScore += 3;
          if (city.tags.age === userPreferences.age) currentScore += 3;
        }

        const finalPercentage = Math.min(Math.round((currentScore / MAX_ALLOWED_SCORE) * 100), 100);
        return { 
          ...city, 
          matchScore: finalPercentage, 
          groupReasons: isGroupMode ? groupReasons : [] 
        };
      })
      .filter(city => city.matchScore >= 20 && !city.isVetoed) 
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [userPreferences, groupParticipants, isGroupMode]);

  const themeClasses = `${darkMode ? 'dark bg-[#0b0e11]' : 'bg-slate-50'} transition-colors duration-500`;

  // --- FUNZIONI DI NAVIGAZIONE ---
  
  const handleFullReset = () => {
    setUserPreferences(null);
    setGroupParticipants([]);
    setIsGroupMode(false);
    setSelectedCity(null);
    setView('welcome');
  };

  const handleResetQuiz = () => {
    if (isGroupMode) {
        setCurrentParticipantIndex(0);
        setView('quiz');
    } else {
        setUserPreferences(null);
        setView('quiz');
    }
  };

  // --- RENDERING CONDIZIONALE ---

  if (view === 'welcome') {
    return (
      <WelcomeScreen 
        onStart={() => {
            setIsGroupMode(false);
            setView('quiz');
        }} 
        onStartGroup={() => setView('group-lobby')}
        onExploreGallery={() => setView('gallery')}
        darkMode={darkMode} 
      />
    );
  }

  if (view === 'group-lobby') {
    return (
      <GroupManager 
        darkMode={darkMode}
        onBack={() => setView('welcome')}
        onStartQuiz={(friends) => {
          setGroupParticipants(friends);
          setIsGroupMode(true);
          setCurrentParticipantIndex(0);
          setView('quiz');
        }}
      />
    );
  }

  if (view === 'quiz') {
    const currentName = isGroupMode ? groupParticipants[currentParticipantIndex]?.name : "Te";
    return (
      <QuizScreen 
        darkMode={darkMode} 
        participantName={currentName}
        isGroupMode={isGroupMode}
        onFinish={(prefs) => {
          if (isGroupMode) {
            const updatedGroup = [...groupParticipants];
            updatedGroup[currentParticipantIndex].prefs = prefs;
            setGroupParticipants(updatedGroup);

            if (currentParticipantIndex < groupParticipants.length - 1) {
              setCurrentParticipantIndex(currentParticipantIndex + 1);
            } else {
              setView('home');
            }
          } else {
            setUserPreferences(prefs);
            setView('home');
          }
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
          setLastView('gallery');
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
        onBack={() => setView(lastView)} 
        onGoHome={handleFullReset}
      />
    );
  }

  // FIX: Spostiamo la logica di BattleMode all'interno del flusso principale di rendering
  if (view === 'battle') {
    return (
      <BattleMode 
        cities={recommendedCities}
        participants={groupParticipants.length > 0 ? groupParticipants : [{name: 'Utente 1'}]}
        darkMode={darkMode}
        onBack={() => setView('home')}
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
            onStartBattle={() => setView('battle')} 
            toggleTheme={() => setDarkMode(!darkMode)}
            darkMode={darkMode}
            userPrefs={isGroupMode ? groupParticipants[0]?.prefs : userPreferences}
            isGroup={isGroupMode}
            participantsCount={groupParticipants.length}
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
                setLastView('map');
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