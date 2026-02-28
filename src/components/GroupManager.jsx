import React, { useState } from 'react';

const GroupManager = ({ onStartQuiz, onBack, darkMode }) => {
  const [friends, setFriends] = useState([]);
  const [name, setName] = useState("");

  const MAX_FRIENDS = 5;
  const isFull = friends.length >= MAX_FRIENDS;

  const addFriend = () => {
    if (name.trim() && !isFull) {
      setFriends([...friends, { id: Date.now(), name: name.trim(), prefs: null }]);
      setName("");
    }
  };

  const removeFriend = (id) => {
    setFriends(friends.filter(f => f.id !== id));
  };

  const textColor = darkMode ? 'text-white' : 'text-slate-900';
  const cardBg = darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-700 
      ${darkMode ? 'bg-[#0b0e11]' : 'bg-slate-50'}`}>
      
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <button onClick={onBack} className="text-[#6d4aff] font-black text-xs uppercase tracking-widest hover:opacity-70 transition-all">
            ← Torna Indietro
          </button>
          <h1 className={`text-5xl md:text-6xl font-black tracking-tighter ${textColor}`}>
            Social <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6d4aff] to-[#00ffcc]">Room</span>
          </h1>
          <p className={`opacity-60 font-medium ${textColor}`}>
            {isFull 
              ? "Capienza massima raggiunta. Pronti a partire!" 
              : `Aggiungi fino a ${MAX_FRIENDS} amici per trovare il "compromesso perfetto".`}
          </p>
        </div>

        {/* Input per aggiungere amici */}
        <div className={`p-8 rounded-[2.5rem] border-2 flex gap-4 transition-all ${cardBg} 
          ${isFull ? 'opacity-50 grayscale-[0.5]' : ''}`}>
          <input 
            type="text"
            value={name}
            disabled={isFull}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addFriend()}
            placeholder={isFull ? "Gruppo al completo" : "Nome dell'amico..."}
            className={`flex-1 bg-transparent outline-none font-bold text-lg ${textColor} placeholder:opacity-30 
              ${isFull ? 'cursor-not-allowed' : ''}`}
          />
          <button 
            onClick={addFriend}
            disabled={isFull || !name.trim()}
            className={`px-6 py-3 rounded-2xl font-black transition-all shadow-lg
              ${isFull 
                ? 'bg-slate-500/20 text-slate-500 blur-[2px] cursor-not-allowed' 
                : 'bg-[#6d4aff] text-white hover:scale-105 active:scale-95 shadow-[#6d4aff]/20'}`}
          >
            {isFull ? "Full" : "Aggiungi"}
          </button>
        </div>

        {/* Lista Amici (Grid Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {friends.map((f) => (
            <div key={f.id} className={`p-5 rounded-3xl border flex justify-between items-center animate-in fade-in zoom-in duration-300 ${cardBg}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#6d4aff] to-[#00ffcc] rounded-full flex items-center justify-center text-[10px] font-black text-white">
                  {f.name.charAt(0).toUpperCase()}
                </div>
                <span className={`font-black ${textColor}`}>{f.name}</span>
              </div>
              <button 
                onClick={() => removeFriend(f.id)} 
                className="opacity-30 hover:opacity-100 text-red-500 font-bold transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
          
          {friends.length === 0 && (
            <div className={`col-span-full py-10 text-center opacity-20 font-black uppercase tracking-widest text-xs ${textColor}`}>
              Nessun amico aggiunto
            </div>
          )}
        </div>

        {/* Start Button */}
        <div className="pt-4">
          <button 
            disabled={friends.length < 2}
            onClick={() => onStartQuiz(friends)}
            className={`w-full py-6 rounded-[2rem] font-black text-xl transition-all shadow-2xl
              ${friends.length >= 2 
                ? 'bg-gradient-to-r from-[#6d4aff] to-[#00ffcc] text-white hover:scale-[1.02] shadow-[#6d4aff]/30' 
                : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-50'}`}
          >
            {friends.length < 2 ? 'Aggiungi almeno 2 persone' : 'Inizia il Quiz di Gruppo →'}
          </button>
          
          <p className={`text-center mt-6 text-[10px] font-black uppercase tracking-[0.4em] opacity-30 ${textColor}`}>
            {friends.length} / {MAX_FRIENDS} SLOT OCCUPATI
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupManager;