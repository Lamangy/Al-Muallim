import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle, XCircle, RefreshCcw, HelpCircle, ArrowRight } from 'lucide-react';
import { LearningUnit, ArabicLetter } from '../types';

interface LetterPuzzleProps {
  unit: LearningUnit;
  onComplete?: () => void;
}

type QuestionType = {
  letter: ArabicLetter;
  position: 'initial' | 'medial' | 'final';
  correctForm: string;
  options: string[]; // Array of 3 forms (1 correct, 2 distractors)
};

const POSITIONS = {
  initial: 'am Anfang',
  medial: 'in der Mitte',
  final: 'am Ende'
};

const LetterPuzzle: React.FC<LetterPuzzleProps> = ({ unit, onComplete }) => {
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const generateQuestion = () => {
    if (unit.letters.length === 0) return;

    // 1. Pick random letter from unit
    const targetLetter = unit.letters[Math.floor(Math.random() * unit.letters.length)];
    
    // 2. Pick random position (excluding isolated for connection puzzle)
    const positions: ('initial' | 'medial' | 'final')[] = ['initial', 'medial', 'final'];
    const targetPos = positions[Math.floor(Math.random() * positions.length)];
    const correctForm = targetLetter.forms[targetPos];

    // 3. Generate Distractors
    const options = new Set<string>();
    options.add(correctForm);

    // Try to add other forms of same letter first
    const otherForms = (Object.values(targetLetter.forms) as string[]).filter(f => f !== correctForm);
    otherForms.forEach(f => options.add(f));

    // If we still need options, pick from other letters in unit
    while (options.size < 3) {
      const randomL = unit.letters[Math.floor(Math.random() * unit.letters.length)];
      const randomF = (Object.values(randomL.forms) as string[])[Math.floor(Math.random() * 4)];
      if (randomF !== correctForm) options.add(randomF);
    }

    // Shuffle
    const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5).slice(0, 3);

    setQuestion({
      letter: targetLetter,
      position: targetPos,
      correctForm: correctForm,
      options: shuffledOptions
    });
    setSelectedOption(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    generateQuestion();
  }, [unit]);

  const handleOptionClick = (opt: string) => {
    if (isCorrect !== null || !question) return;
    
    setSelectedOption(opt);
    const correct = opt === question.correctForm;
    setIsCorrect(correct);

    if (correct) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    generateQuestion();
  };

  if (!question) return <div className="p-10 text-center text-slate-500">Lade Puzzle...</div>;

  return (
    <div className="max-w-md mx-auto">
      
      {/* Header / Score */}
      <div className="flex justify-between items-center mb-6 bg-indigo-50 p-3 rounded-xl border border-indigo-100">
        <div className="text-indigo-900 font-bold flex items-center gap-2">
            <span className="bg-indigo-200 w-8 h-8 flex items-center justify-center rounded-full text-sm">?</span>
            Verbindungs-Puzzle
        </div>
        <div className="flex gap-4 text-sm">
            <div className="font-bold text-indigo-700">Punkte: {score}</div>
            <div className="font-bold text-orange-600">🔥 {streak}</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 text-center relative overflow-hidden">
        
        {/* Question */}
        <h3 className="text-lg text-slate-600 mb-2">Wie sieht dieser Buchstabe aus?</h3>
        <div className="mb-6">
            <span className="text-4xl font-bold text-indigo-700 block mb-1">{question.letter.name}</span>
            <span className="text-sm bg-slate-100 px-3 py-1 rounded-full text-slate-500 font-medium">
                Position: <span className="text-indigo-600 font-bold uppercase">{POSITIONS[question.position]}</span>
            </span>
        </div>

        {/* Isolated Reference Hint */}
        <div className="absolute top-4 right-4 opacity-20">
            <span className="text-6xl font-arabic">{question.letter.char}</span>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
            {question.options.map((opt, idx) => {
                let stateClass = "bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50";
                
                if (isCorrect !== null) {
                    if (opt === question.correctForm) {
                        // Always highlight the correct answer in green, regardless of what was clicked
                        stateClass = "bg-emerald-100 border-emerald-500 text-emerald-800 ring-2 ring-emerald-200";
                    } else if (opt === selectedOption) {
                        // Highlight wrong selection in red
                        stateClass = "bg-red-100 border-red-500 text-red-800";
                    } else {
                        // Fade out irrelevant options
                        stateClass = "opacity-50 grayscale";
                    }
                }

                return (
                    <button
                        key={idx}
                        onClick={() => handleOptionClick(opt)}
                        disabled={isCorrect !== null}
                        className={`p-4 sm:p-6 rounded-xl border-2 text-4xl sm:text-5xl font-arabic transition-all duration-200 ${stateClass}`}
                    >
                        {opt}
                    </button>
                )
            })}
        </div>

        {/* Feedback / Next */}
        {isCorrect !== null && (
            <div className={`mt-6 p-4 rounded-xl animate-in fade-in slide-in-from-bottom-4 ${isCorrect ? 'bg-emerald-50' : 'bg-red-50'}`}>
                <div className="flex items-center justify-center gap-2 mb-3">
                    {isCorrect ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-2"><CheckCircle /> Richtig!</span>
                    ) : (
                        <span className="text-red-700 font-bold flex items-center gap-2"><XCircle /> Leider falsch</span>
                    )}
                </div>
                <button 
                    onClick={nextQuestion}
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                    Nächste Frage <ArrowRight className="w-4 h-4"/>
                </button>
            </div>
        )}
      </div>
      
      <div className="mt-4 text-center text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
        Lerne die Formen der Buchstaben zu erkennen, um sie später in Wörtern richtig zu verbinden.
      </div>
    </div>
  );
};

export default LetterPuzzle;