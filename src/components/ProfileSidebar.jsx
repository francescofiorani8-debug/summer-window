import React from 'react';

const ProfileSidebar = ({ isOpen, onClose, user, darkMode, onLogout }) => {
  if (!isOpen || !user) return null;

  return (
    <>
      {/* Overlay scuro per chiudere la sidebar cliccando fuori */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] transition-opacity animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Pannello Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md z-[10001] shadow-2xl p-10 flex flex-col transform transition-transform animate-in slide-in-from-right duration-500
        ${darkMode ? 'bg-[#1a1d23] text-white border-l border-white/5' : 'bg-white text-slate-900 border-l border-slate-100'}`}>
        
        {/* Header Sidebar */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 text-[#6d4aff]">Il Tuo Passaporto</h2>
          <button 
            onClick={onClose} 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
              ${darkMode ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
          >
            ✕
          </button>
        </div>

        {/* Info Utente */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6d4aff] to-[#00ffcc] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="relative w-24 h-24 rounded-full border-4 border-[#1a1d23] shadow-2xl" 
            />
          </div>
          <h3 className="text-3xl font-black uppercase tracking-tighter mt-6 mb-1">{user.name}</h3>
          <p className="text-[10px] font-bold opacity-40 tracking-widest uppercase">{user.email}</p>
        </div>

        {/* Lista Viaggi Salvati */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex justify-between items-end mb-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-[#6d4aff]">Esplorazioni Salvate</h4>
            <span className="text-[10px] font-black opacity-30">{user.savedTrips?.length || 0} METE</span>
          </div>
          
          <div className="space-y-3">
            {user.savedTrips?.map((city, i) => (
              <div 
                key={i} 
                className={`group p-5 rounded-[2rem] border transition-all cursor-pointer flex items-center justify-between
                  ${darkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#6d4aff]/50' 
                    : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200'}`}
              >
                <div className="flex flex-col">
                  <span className="font-black text-sm uppercase tracking-tight">{city}</span>
                  <span className="text-[9px] font-bold opacity-40 uppercase tracking-widest mt-1">Estate 2026</span>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] transition-all
                  ${darkMode ? 'bg-white/5 group-hover:bg-[#6d4aff]' : 'bg-white group-hover:bg-[#6d4aff] group-hover:text-white'}`}>
                  →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Sidebar */}
        <div className="mt-10 pt-8 border-t border-current opacity-10 flex flex-col gap-4">
          <button 
            onClick={onLogout}
            className="w-full py-4 bg-red-500/10 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-red-500 hover:text-white transition-all active:scale-95"
          >
            Disconnetti
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;