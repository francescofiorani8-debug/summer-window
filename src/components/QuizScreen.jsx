import React, { useState } from 'react';

const QuizScreen = ({ onFinish, darkMode, participantName }) => {
  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState({ 
    type: '', 
    age: '', 
    mood: '', 
    periodMonths: [], 
    budget: 2,
    veto: '' // Nuovo campo per la logica di esclusione
  });

  const totalSteps = 6; // Aumentato per includere il Veto

  const nextStep = (field, value, extraData = null) => {
    const newPrefs = { ...prefs, [field]: extraData || value };
    setPrefs(newPrefs);
    
    if (step < totalSteps) { 
      setStep(step + 1);
    } else {
      onFinish(newPrefs);
      // Reset totale per il prossimo partecipante
      setStep(1);
      setPrefs({ type: '', age: '', mood: '', periodMonths: [], budget: 2, veto: '' });
    }
  };

  const steps = [
    {
      id: 1,
      field: 'type',
      question: "Che tipo di atmosfera cerchi?",
      options: [
        { label: "Relax Totale", value: "relax", icon: "🏖️" },
        { label: "Party & Movida", value: "party", icon: "🎉" },
        { label: "Avventura & Natura", value: "adventure", icon: "🌋" }
      ]
    },
    {
      id: 2,
      field: 'periodMonths',
      question: "Quando hai intenzione di partire?",
      options: [
        { label: "Primavera", value: "spring", icon: "🌸", months: ["marzo", "aprile", "maggio"] },
        { label: "Estate", value: "summer", icon: "☀️", months: ["giugno", "luglio", "agosto"] },
        { label: "Autunno", value: "autumn", icon: "🍂", months: ["settembre", "ottobre", "novembre"] },
        { label: "Inverno", value: "winter", icon: "❄️", months: ["dicembre", "gennaio", "febbraio"] }
      ]
    },
    {
      id: 3,
      field: 'age',
      question: "Qual è la tua fascia d'età?",
      options: [
        { label: "18-25", value: "young", icon: "🎒" },
        { label: "26-40", value: "adult", icon: "👔" },
        { label: "40+", value: "senior", icon: "🥂" }
      ]
    },
    {
      id: 4,
      field: 'mood',
      question: "Cosa vuoi raccontare a fine viaggio?",
      options: [
        { label: "L'esclusività assoluta", value: "exclusive", icon: "💎" },
        { label: "Il mio posto segreto", value: "hidden", icon: "🗺️" },
        { label: "Ero dove nasce il trend", value: "trendsetter", icon: "🔥" }
      ]
    },
    {
      id: 5,
      field: 'budget',
      question: "Qual è il tuo target di spesa?",
      options: [
        { label: "Smart & Low", value: 1, icon: "💳" },
        { label: "Comfort Mid", value: 2, icon: "🏨" },
        { label: "Luxury & Top", value: 3, icon: "✨" }
      ]
    },
    {
      id: 6,
      field: 'veto',
      question: "C'è qualcosa che proprio non sopporti?",
      description: "Opzionale: escluderà tutte le mete che hanno questo tag.",
      options: [
        { label: "Niente Veto", value: "none", icon: "✅" },
        { label: "No Caos/Party", value: "party", icon: "🚫" },
        { label: "No Noia/Relax", value: "relax", icon: "🏃" },
        { label: "No Adventure", value: "adventure", icon: "🛑" }
      ]
    }
  ];

  const currentStep = steps.find(s => s.id === step);

  return (
    <section className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-700 relative overflow-hidden
      ${darkMode 
        ? 'bg-[#0b0e11] bg-gradient-to-br from-[#0b0e11] to-[#6d4aff]/20 text-white' 
        : 'bg-white bg-gradient-to-br from-[#76c876]/10 to-white text-black'}`}>
      
      {/* Barra di Progresso */}
      <div className="fixed top-0 left-0 w-full h-2 bg-slate-200 dark:bg-slate-800 z-[100]">
        <div 
          className={`h-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(109,74,255,0.5)] 
            ${step === 6 ? 'bg-red-500' : 'bg-[#6d4aff]'}`}
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>

      {/* Identità Partecipante */}
      <div className="fixed top-8 left-8 flex items-center gap-4 z-50 animate-in fade-in slide-in-from-left duration-700">
        <div className="w-12 h-12 bg-[#6d4aff] rounded-2xl flex items-center justify-center font-black text-white shadow-xl shadow-[#6d4aff]/30 rotate-3">
          {participantName ? participantName.charAt(0).toUpperCase() : 'Y'}
        </div>
        <div>
          <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-40 leading-none mb-1">Sessione di</p>
          <p className="font-black text-xl tracking-tighter leading-none italic">
            {participantName || 'Te stesso'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl w-full text-center z-10">
        {/* Badge Step */}
        <div className="inline-block px-4 py-1 rounded-full bg-[#6d4aff]/10 border border-[#6d4aff]/20 mb-6">
          <span className="text-[#6d4aff] font-black uppercase tracking-widest text-xs">
            Step {step} di {totalSteps} {step === 6 && "• Power Tool"}
          </span>
        </div>

        <h2 className={`text-4xl md:text-7xl font-black mb-4 tracking-tighter leading-tight ${darkMode ? 'text-white' : 'text-black'}`}>
          {participantName ? `${participantName}, ` : ""}{currentStep.question.toLowerCase()}
        </h2>
        
        {currentStep.description && (
          <p className="mb-12 opacity-50 font-bold uppercase text-xs tracking-widest">
            {currentStep.description}
          </p>
        )}

        <div className="flex justify-center w-full mt-8">
          <div className={`grid gap-6 w-full max-w-fit mx-auto ${
            currentStep.options.length === 4 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
              : 'grid-cols-1 md:grid-cols-3'
          }`}>
            {currentStep.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => nextStep(currentStep.field, opt.value, opt.months || null)}
                className={`relative p-8 rounded-[2.5rem] border-2 transition-all duration-300 group overflow-hidden min-w-[220px]
                  ${darkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-white border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_50px_rgba(118,200,118,0.15)]'}
                  ${step === 6 && opt.value !== 'none' 
                    ? 'hover:border-red-500/50' 
                    : darkMode ? 'hover:border-[#6d4aff]' : 'hover:border-[#76c876]'}`}
              >
                <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full group-hover:scale-150 transition-transform duration-500
                  ${step === 6 && opt.value !== 'none' ? 'bg-red-500/5' : 'bg-[#6d4aff]/5'}`}></div>
                
                <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  {opt.icon}
                </div>
                <span className={`font-black text-lg block leading-tight ${darkMode ? 'text-white' : 'text-black'}`}>
                  {opt.label}
                </span>

                {currentStep.id === 5 && (
                   <div className="mt-2 flex justify-center gap-1 opacity-30 group-hover:opacity-100 transition-opacity">
                     {[...Array(opt.value)].map((_, i) => (
                        <span key={i} className="text-[#6d4aff] text-xs">●</span>
                     ))}
                   </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <p className={`mt-16 text-[10px] font-black opacity-20 uppercase tracking-[0.5em] ${darkMode ? 'text-white' : 'text-black'}`}>
          SummerWindow Algorithm 2026 • {step === 6 ? 'Veto Protection Active' : 'Neural Processing'}
        </p>
      </div>

      <div className="fixed -bottom-20 -left-20 w-96 h-96 bg-[#6d4aff]/5 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default QuizScreen;