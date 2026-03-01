import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MapComponent from './components/MapComponent';
import WelcomeScreen from './components/Welcome';
import HomeOverview from './components/HomeOverview';
import DetailsSidebar from './components/DetailsSidebar';
import QuizScreen from './components/QuizScreen';
import CityDetailView from './components/CityDetailView'; // La nuova schermata immersiva
import CityGallery from './components/CityGallery';
import GroupManager from './components/GroupManager';
import BattleMode from './components/BattleMode'; 
import TravelPlanner from './components/TravelPlanner';
import AuthModal from './components/AuthModal'; 
import ProfileSidebar from './components/ProfileSidebar'; 
import { hotCities } from './data/cities';

function App() {
  // --- STATI DI NAVIGAZIONE E TEMA ---
  const [view, setView] = useState('welcome');
  const [darkMode, setDarkMode] = useState(true);
  const [lastView, setLastView] = useState('welcome');

  // --- STATI UTENTE E AUTH ---
  const [user, setUser] = useState(null); 
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // --- STATI PIANIFICAZIONE ---
  const [userPreferences, setUserPreferences] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isGroupMode, setIsGroupMode] = useState(false);
  const [groupParticipants, setGroupParticipants] = useState([]); 
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);
  const [itineraryTarget, setItineraryTarget] = useState(null);

  // --- FUNZIONI CORE ---
  const openItinerary = (city) => {
    setItineraryTarget(city);
  };

  const handleLogin = () => {
    setUser({ 
        name: "Alex", 
        id: "user_123",
        email: "alex.traveler@example.com",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Alex`,
        savedTrips: ["Saranda", "Vlore", "Gjirokaster"]
    });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsProfileOpen(false);
    setItineraryTarget(null);
    setView('welcome');
  };

  useEffect(() => {
    if (itineraryTarget || isProfileOpen || view === 'cityDetail') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [itineraryTarget, isProfileOpen, view]);

  // --- LOGICA DI SCORING ---
  const recommendedCities = useMemo(() => {
    if (!userPreferences && groupParticipants.length === 0) return hotCities;
    const MAX_ALLOWED_SCORE = 25;

    return hotCities
      .map(city => {
        let currentScore = 0;
        if (isGroupMode && groupParticipants.length > 0) {
          const allPrefs = groupParticipants.map(p => p.prefs).filter(p => p !== null);
          const numPeople = allPrefs.length;
          if (numPeople === 0) return { ...city, matchScore: 0 };
          const isVetoed = allPrefs.some(pref => pref.veto === city.tags.type || pref.veto === city.tags.mood);
          if (isVetoed) return { ...city, matchScore: 0, isVetoed: true };
          const minBudgetNeeded = Math.min(...allPrefs.map(p => Number(p.budget)));
          if (Number(city.budget) <= minBudgetNeeded) currentScore += 8;
          allPrefs.forEach(pref => {
            if (pref.periodMonths?.some(m => city.bestMonths.includes(m))) currentScore += (6 / numPeople);
            if (city.tags.type === pref.type) currentScore += (5 / numPeople);
          });
        } else if (userPreferences) {
          if (userPreferences.periodMonths?.some(m => city.bestMonths.includes(m))) currentScore += 6; 
          if (city.tags.type === userPreferences.type) currentScore += 5;
          if (Number(city.budget) <= Number(userPreferences.budget)) currentScore += 8;
        }
        const finalPercentage = Math.min(Math.round((currentScore / MAX_ALLOWED_SCORE) * 100), 100);
        return { ...city, matchScore: finalPercentage };
      })
      .filter(city => city.matchScore >= 20 && !city.isVetoed) 
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [userPreferences, groupParticipants, isGroupMode]);

  const handleFullReset = () => {
    setUserPreferences(null); setGroupParticipants([]); setIsGroupMode(false);
    setSelectedCity(null); setItineraryTarget(null); setView('welcome');
  };

  const handleResetQuiz = () => {
    setCurrentParticipantIndex(0);
    if (!isGroupMode) setUserPreferences(null);
    setView('quiz');
  };

  // --- GESTORE NAVIGAZIONE VERSO DETTAGLI ---
  const handleOpenCityDetail = (city) => {
    setSelectedCity(city);
    setLastView(view); // Salva se veniamo da 'home', 'map' o 'gallery'
    setView('cityDetail');
  };

  const themeClasses = `${darkMode ? 'dark bg-[#0b0e11]' : 'bg-slate-50'} transition-colors duration-500`;

  // --- RENDER VISTE FULL-SCREEN (PRIORITÀ ALTA) ---
  
  if (view === 'welcome') return <WelcomeScreen onStart={() => { setIsGroupMode(false); setView('quiz'); }} onStartGroup={() => setView('group-lobby')} onExploreGallery={() => setView('gallery')} darkMode={darkMode} />;
  
  if (view === 'group-lobby') return <GroupManager darkMode={darkMode} onBack={() => setView('welcome')} onStartQuiz={(friends) => { setGroupParticipants(friends); setIsGroupMode(true); setCurrentParticipantIndex(0); setView('quiz'); }} />;
  
  if (view === 'quiz') {
    return <QuizScreen darkMode={darkMode} participantName={isGroupMode ? groupParticipants[currentParticipantIndex]?.name : "Te"} isGroupMode={isGroupMode} onFinish={(prefs) => {
        if (isGroupMode) {
          const updated = [...groupParticipants]; updated[currentParticipantIndex].prefs = prefs;
          setGroupParticipants(updated);
          if (currentParticipantIndex < groupParticipants.length - 1) setCurrentParticipantIndex(currentParticipantIndex + 1);
          else setView('home');
        } else { setUserPreferences(prefs); setView('home'); }
      }} />;
  }
  
  if (view === 'gallery') return <CityGallery cities={hotCities} darkMode={darkMode} onBack={() => setView('welcome')} onSelectCity={handleOpenCityDetail} toggleTheme={() => setDarkMode(!darkMode)} />;

  // --- LA NUOVA SCHERMATA DETTAGLIATA ---
  if (view === 'cityDetail' && selectedCity) {
    return (
      <div className={`${darkMode ? 'bg-[#0b0e11]' : 'bg-white'} min-h-screen`}>
        <CityDetailView 
          city={selectedCity} 
          onBack={() => setView(lastView)} 
        />
      </div>
    );
  }

  return (
    <div className={themeClasses}>
      <div className={`w-full relative ${view === 'map' ? 'h-screen overflow-hidden' : 'min-h-screen overflow-y-auto'}`}>

        {/* OVERLAY ITINERARIO RAPIDO */}
        {itineraryTarget && (
          <div className={`fixed inset-0 z-[9999] flex flex-col animate-in slide-in-from-bottom duration-500 overflow-hidden ${darkMode ? 'bg-[#0b0e11]' : 'bg-slate-50'}`}>
            <header className={`flex-shrink-0 p-8 flex items-center justify-between border-b ${darkMode ? 'bg-[#0b0e11]/90 border-white/5 text-white' : 'bg-white/90 border-slate-200 text-slate-900'}`}>
                <button onClick={() => setItineraryTarget(null)} className="flex items-center gap-2 font-black uppercase text-xs tracking-widest">
                  ← Chiudi
                </button>
                <h2 className="font-black uppercase text-xl">{itineraryTarget.name}</h2>
                <div className="w-10"></div>
            </header>
            <div className="flex-1 overflow-y-auto p-10">
              <TravelPlanner city={itineraryTarget} darkMode={darkMode} />
            </div>
          </div>
        )}

        {/* BATTLE MODE */}
        {view === 'battle' && <BattleMode cities={recommendedCities} participants={groupParticipants.length > 0 ? groupParticipants : [{name: 'Utente 1'}]} darkMode={darkMode} onBack={() => setView('home')} onGenerateItinerary={openItinerary} />}

        {/* HOME OVERVIEW */}
        {view === 'home' && (
          <HomeOverview
            onGoToMap={() => setView('map')} 
            onResetQuiz={handleResetQuiz} 
            onGoHome={handleFullReset}
            onStartBattle={() => setView('battle')} 
            toggleTheme={() => setDarkMode(!darkMode)} 
            darkMode={darkMode}
            onLogoClick={handleFullReset} 
            userPrefs={isGroupMode ? groupParticipants[0]?.prefs : userPreferences}
            isGroup={isGroupMode} 
            participantsCount={groupParticipants.length} 
            recommendedCount={recommendedCities.length}
            bestMatch={recommendedCities[0]} 
            onGenerateItinerary={() => openItinerary(recommendedCities[0])}
            user={user} 
            onProfileClick={() => user ? setIsProfileOpen(true) : setIsAuthModalOpen(true)}
            
            // AZIONE: Apre la nuova CityDetailView
            onCityClick={handleOpenCityDetail}
          />
        )}

        {/* MAPPA INTERATTIVA */}
        {view === 'map' && (
          <div className="h-full w-full flex relative overflow-hidden">
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
            
            {/* Sidebar laterale (lasciata come anteprima, non interferisce con la vista full) */}
            <DetailsSidebar 
              city={selectedCity} 
              onClose={() => setSelectedCity(null)} 
              darkMode={darkMode} 
              onViewReport={() => handleOpenCityDetail(selectedCity)} 
              onGenerateItinerary={openItinerary} 
            />
          </div>
        )}
        
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} darkMode={darkMode} />
        <ProfileSidebar isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={user} darkMode={darkMode} onLogout={handleLogout} />
      </div>
    </div>
  );
}

export default App;