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
import AuthModal from './components/AuthModal'; 
import ProfileSidebar from './components/ProfileSidebar'; // Importazione del nuovo componente
import { hotCities } from './data/cities';

function App() {
  // --- STATI DI NAVIGAZIONE E TEMA ---
  const [view, setView] = useState('welcome');
  const [darkMode, setDarkMode] = useState(true);
  const [lastView, setLastView] = useState('welcome');

  // --- STATI UTENTE E AUTH ---
  const [user, setUser] = useState(null); 
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Stato per la sidebar profilo

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
        savedTrips: ["Saranda", "Vlore", "Gjirokaster"] // Dati simulati
    });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsProfileOpen(false);
    setItineraryTarget(null);
    setView('welcome');
  };

  // Blochiamo lo scroll se un overlay (itinerario o profilo) è aperto
  useEffect(() => {
    if (itineraryTarget || isProfileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [itineraryTarget, isProfileOpen]);

  // --- LOGICA DI SCORING ---
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
        return { ...city, matchScore: finalPercentage, groupReasons: isGroupMode ? groupReasons : [] };
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

  const themeClasses = `${darkMode ? 'dark bg-[#0b0e11]' : 'bg-slate-50'} transition-colors duration-500`;

  // --- RENDERING VISTE ---
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
  if (view === 'gallery') return <CityGallery cities={hotCities} darkMode={darkMode} onBack={() => setView('welcome')} onSelectCity={(city) => { setSelectedCity(city); setLastView('gallery'); setView('report'); }} toggleTheme={() => setDarkMode(!darkMode)} />;
  if (view === 'report' && selectedCity) return <CityReport city={selectedCity} darkMode={darkMode} onBack={() => setView(lastView)} onGoHome={handleFullReset} />;

  return (
    <div className={themeClasses}>
      <div className={`w-full relative ${view === 'map' ? 'h-screen overflow-hidden' : 'min-h-screen overflow-y-auto'}`}>

        {/* 1. OVERLAY GLOBALE ITINERARIO */}
        {itineraryTarget && (
          <div className={`fixed inset-0 z-[9999] flex flex-col animate-in slide-in-from-bottom duration-500 overflow-hidden ${darkMode ? 'bg-[#0b0e11]' : 'bg-slate-50'}`}>
            <header className={`flex-shrink-0 p-8 flex items-center justify-between border-b backdrop-blur-2xl ${darkMode ? 'bg-[#0b0e11]/90 border-white/5 text-white' : 'bg-white/90 border-slate-200 text-slate-900'}`}>
              
              <div className="flex items-center gap-10 flex-1">
                <button onClick={() => setItineraryTarget(null)} className={`group flex items-center gap-3 px-5 py-2.5 rounded-full transition-all ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'}`}>
                  <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                  <span className="font-bold uppercase text-[10px] tracking-widest">Chiudi</span>
                </button>
                <div className="h-10 w-[1px] bg-current opacity-10"></div>
                <div>
                  <h2 className="font-black uppercase text-xl tracking-tighter leading-none mb-1">{itineraryTarget.name}</h2>
                  <p className={`${darkMode ? 'text-[#00ffcc]' : 'text-[#6d4aff]'} text-[10px] font-black uppercase tracking-[0.2em] opacity-80`}>Esplorazione AI Generata</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* ICONA PROFILO CLICCABILE */}
                <button 
                  onClick={() => user ? setIsProfileOpen(true) : setIsAuthModalOpen(true)}
                  className="flex items-center gap-3 group px-2 py-2 rounded-full transition-all hover:bg-current/5"
                >
                  {user ? (
                    <>
                      <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-[#6d4aff] group-hover:scale-105 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">{user.name}</span>
                    </>
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-current opacity-30 flex items-center justify-center text-lg group-hover:opacity-100 transition-opacity">👤</div>
                  )}
                </button>

                <button
                  onClick={() => user ? alert("Itinerario salvato!") : setIsAuthModalOpen(true)}
                  className={`px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all transform active:scale-95
                    ${user
                      ? 'bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/30 shadow-[0_0_20px_rgba(0,255,204,0.1)]'
                      : 'bg-[#6d4aff] text-white shadow-xl shadow-[#6d4aff]/40 hover:scale-105 hover:shadow-[#6d4aff]/60 hover:-translate-y-0.5'}`}
                >
                  {user ? "✓ Salvato" : "Salva su Profilo"}
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-10">
              <div className="max-w-4xl mx-auto">
                <TravelPlanner city={itineraryTarget} darkMode={darkMode} />
              </div>
            </div>
          </div>
        )}

        {/* 2. VISTA BATTLE */}
        {view === 'battle' && <BattleMode cities={recommendedCities} participants={groupParticipants.length > 0 ? groupParticipants : [{name: 'Utente 1'}]} darkMode={darkMode} onBack={() => setView('home')} onGenerateItinerary={openItinerary} />}

        {/* 3. VISTA HOME */}
        {view === 'home' && (
          <HomeOverview
            onGoToMap={() => setView('map')} onResetQuiz={handleResetQuiz} onGoHome={handleFullReset}
            onStartBattle={() => setView('battle')} toggleTheme={() => setDarkMode(!darkMode)} darkMode={darkMode}
            onLogoClick={handleFullReset} userPrefs={isGroupMode ? groupParticipants[0]?.prefs : userPreferences}
            isGroup={isGroupMode} participantsCount={groupParticipants.length} recommendedCount={recommendedCities.length}
            bestMatch={recommendedCities[0]} onGenerateItinerary={() => openItinerary(recommendedCities[0])}
            user={user} 
            onProfileClick={() => user ? setIsProfileOpen(true) : setIsAuthModalOpen(true)}
          />
        )}

        {/* 4. VISTA MAPPA */}
        {view === 'map' && (
          <div className="h-full w-full flex relative overflow-hidden">
            <button onClick={() => setDarkMode(!darkMode)} className="fixed bottom-8 right-8 z-[6000] w-14 h-14 rounded-full bg-[#6d4aff] text-white shadow-xl flex items-center justify-center text-2xl hover:scale-110 transition-transform">{darkMode ? '☀️' : '🌙'}</button>
            <Sidebar cities={recommendedCities} onSelectCity={setSelectedCity} onGoHome={() => setView('home')} onLogoClick={handleFullReset} darkMode={darkMode} />
            <main className="flex-1 relative h-full">
              <MapComponent darkMode={darkMode} selectedCity={selectedCity} onSelectCity={setSelectedCity} recommendedIds={recommendedCities.slice(0, 5).map(c => c.name)} />
            </main>
            <DetailsSidebar city={selectedCity} onClose={() => setSelectedCity(null)} darkMode={darkMode} onViewReport={() => { setLastView('map'); setView('report'); }} onGenerateItinerary={openItinerary} />
          </div>
        )}
        
        {/* COMPONENTI OVERLAY GLOBALI */}
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          onLogin={handleLogin} 
          darkMode={darkMode} 
        />

        <ProfileSidebar 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
          user={user} 
          darkMode={darkMode} 
          onLogout={handleLogout} 
        />
      </div>
    </div>
  );
}

export default App;