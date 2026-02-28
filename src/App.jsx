import React, { useState, useMemo, useEffect } from 'react';
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
import TravelPlanner from './components/TravelPlanner';
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

  // --- STATI PER ITINERARIO ---
  const [itineraryTarget, setItineraryTarget] = useState(null);

  const openItinerary = (city) => {
    setItineraryTarget(city);
  };

  // Blochiamo lo scroll del body quando l'itinerario è aperto
  useEffect(() => {
    if (itineraryTarget) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [itineraryTarget]);

  // --- LOGICA DI SCORING AVANZATA ---
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

          const isVetoed = allPrefs.some(pref => 
            pref.veto === city.tags.type || pref.veto === city.tags.mood
          );
          if (isVetoed) return { ...city, matchScore: 0, isVetoed: true };

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

          let matches = { type: 0, season: 0, mood: 0 };
          allPrefs.forEach(pref => {
            const hasSeasonMatch = pref.periodMonths?.some(m => city.bestMonths.includes(m));
            if (hasSeasonMatch) { currentScore += (6 / numPeople); matches.season++; }
            if (city.tags.type === pref.type) { currentScore += (5 / numPeople); matches.type++; }
            if (city.tags.mood === pref.mood) { currentScore += (3 / numPeople); matches.mood++; }
            if (city.tags.age === pref.age) currentScore += (3 / numPeople);
          });

          if (matches.type >= numPeople / 2) groupReasons.push(`Atmosfera ${city.tags.type} approvata dalla maggioranza`);
          if (matches.season === numPeople) groupReasons.push(`Tutti sono liberi in questo periodo`);

        } else if (userPreferences) {
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
    setItineraryTarget(null);
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
    return <WelcomeScreen onStart={() => { setIsGroupMode(false); setView('quiz'); }} onStartGroup={() => setView('group-lobby')} onExploreGallery={() => setView('gallery')} darkMode={darkMode} />;
  }

  if (view === 'group-lobby') {
    return <GroupManager darkMode={darkMode} onBack={() => setView('welcome')} onStartQuiz={(friends) => { setGroupParticipants(friends); setIsGroupMode(true); setCurrentParticipantIndex(0); setView('quiz'); }} />;
  }

  if (view === 'quiz') {
    const currentName = isGroupMode ? groupParticipants[currentParticipantIndex]?.name : "Te";
    return <QuizScreen darkMode={darkMode} participantName={currentName} isGroupMode={isGroupMode} onFinish={(prefs) => {
          if (isGroupMode) {
            const updatedGroup = [...groupParticipants];
            updatedGroup[currentParticipantIndex].prefs = prefs;
            setGroupParticipants(updatedGroup);
            if (currentParticipantIndex < groupParticipants.length - 1) setCurrentParticipantIndex(currentParticipantIndex + 1);
            else setView('home');
          } else {
            setUserPreferences(prefs);
            setView('home');
          }
        }} 
      />;
  }

  if (view === 'gallery') {
    return <CityGallery cities={hotCities} darkMode={darkMode} onBack={() => setView('welcome')} onSelectCity={(city) => { setSelectedCity(city); setLastView('gallery'); setView('report'); }} toggleTheme={() => setDarkMode(!darkMode)} />;
  }

  if (view === 'report' && selectedCity) {
    return <CityReport city={selectedCity} darkMode={darkMode} onBack={() => setView(lastView)} onGoHome={handleFullReset} />;
  }

  if (view === 'battle') {
    return <BattleMode cities={recommendedCities} participants={groupParticipants.length > 0 ? groupParticipants : [{name: 'Utente 1'}]} darkMode={darkMode} onBack={() => setView('home')} onGenerateItinerary={openItinerary} />;
  }

  return (
    <div className={themeClasses}>
      <div className={`w-full relative ${view === 'map' ? 'h-screen overflow-hidden' : 'min-h-screen overflow-y-auto'}`}>

        {/* 1. OVERLAY GLOBALE ITINERARIO (Sopra a tutto) */}
        {itineraryTarget && (
          <div className="fixed inset-0 z-[9999] bg-[#0b0e11] flex flex-col animate-in slide-in-from-bottom duration-500 overflow-hidden">
            {/* Navigazione Itinerario */}
            <header className="flex-shrink-0 p-6 flex justify-between items-center border-b border-white/5 bg-[#0b0e11]/80 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setItineraryTarget(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  ←
                </button>
                <div>
                  <h2 className="text-white font-black uppercase text-sm tracking-widest leading-none">
                    {itineraryTarget.name}
                  </h2>
                  <p className="text-[#00ffcc] text-[9px] font-bold uppercase tracking-tighter mt-1">Esplorazione AI Generata</p>
                </div>
              </div>
              <button
                onClick={() => setItineraryTarget(null)}
                className="px-6 py-2.5 bg-[#6d4aff] text-white rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(109,74,255,0.4)]"
              >
                Torna alla Mappa
              </button>
            </header>

            {/* Contenuto scrollabile */}
            <div className="flex-1 overflow-y-auto px-6 py-10">
              <div className="max-w-4xl mx-auto">
                <TravelPlanner city={itineraryTarget} darkMode={true} />
              </div>
            </div>
          </div>
        )}

        {/* 2. VISTA HOME */}
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
            onGenerateItinerary={openItinerary}
          />
        )}

        {/* 3. VISTA MAPPA */}
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
              onViewReport={() => { setLastView('map'); setView('report'); }} 
              onGenerateItinerary={openItinerary}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;