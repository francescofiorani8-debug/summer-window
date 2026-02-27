import React, { useState } from 'react';

const QuizScreen = ({ onFinish, darkMode }) => {
  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState({ type: '', age: '', mood: '', periodMonths: [] });

  const nextStep = (field, value, extraData = null) => {
    // Salviamo i dati: se extraData (i mesi) esiste usiamo quello, altrimenti il valore normale
    const newPrefs = { ...prefs, [field]: extraData || value };
    setPrefs(newPrefs);
    
    if (step < 4) { 
      setStep(step + 1);
    } else {
      onFinish(newPrefs);
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
    }
  ];

  const currentStep = steps.find(s => s.id === step);

  return (
    <section className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-700
      ${darkMode 
        ? 'bg-[#0b0e11] bg-gradient-to-br from-[#0b0e11] to-[#6d4aff]/20 text-white' 
        : 'bg-white bg-gradient-to-br from-[#76c876]/10 to-white text-black'}`}>
      
      {/* Barra di Progresso */}
      <div className="fixed top-0 left-0 w-full h-2 bg-slate-200 dark:bg-slate-800">
        <div 
          className="h-full bg-[#6d4aff] transition-all duration-500 ease-out"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>

      <div className="max-w-5xl w-full text-center">
        {/* Badge Step */}
        <div className="inline-block px-4 py-1 rounded-full bg-[#6d4aff]/10 border border-[#6d4aff]/20 mb-6">
          <span className="text-[#6d4aff] font-black uppercase tracking-widest text-xs">
            Analisi Profilo: Step {step} di 4
          </span>
        </div>

        <h2 className={`text-4xl md:text-6xl font-black mb-16 tracking-tighter ${darkMode ? 'text-white' : 'text-black'}`}>
          {currentStep.question}
        </h2>

        {/* Contenitore Opzioni Centrato */}
        <div className="flex justify-center w-full">
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
                    ? 'bg-white/5 border-white/10 hover:border-[#6d4aff] hover:bg-white/10' 
                    : 'bg-white border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_50px_rgba(118,200,118,0.15)] hover:border-[#76c876]'}`}
              >
                {/* Effetto decorativo */}
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#6d4aff]/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  {opt.icon}
                </div>
                <span className={`font-black text-lg block leading-tight ${darkMode ? 'text-white' : 'text-black'}`}>
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className={`mt-16 text-sm font-bold opacity-30 uppercase tracking-[0.3em] ${darkMode ? 'text-white' : 'text-black'}`}>
          SummerWindow Algorithm 2026
        </p>
      </div>
    </section>
  );
};

export default QuizScreen;