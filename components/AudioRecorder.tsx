
import React, { useState } from 'react';
import { Mic, Square } from 'lucide-react';
import { analyzeSpeech } from '../services/gemini';
import { PronunciationResult } from '../types';

interface AudioRecorderProps {
  targetWord: string;
  onResult: (result: PronunciationResult) => void;
  onStart?: () => void; // New prop to notify start
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ targetWord, onResult, onStart }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = async () => {
    if (onStart) onStart(); // Clear previous results in parent
    setIsListening(true);
    
    // Kurzes haptisches Feedback falls mobil
    if (navigator.vibrate) navigator.vibrate(50);
    
    try {
      const result = await analyzeSpeech(targetWord);
      onResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsListening(false);
    }
  };

  const stopListening = () => {
      // Manuelles Abbrechen (Reset des UI State). 
      // Die Web Speech API läuft im Hintergrund evtl. weiter bis zum Timeout, 
      // aber der User ist nicht mehr blockiert.
      setIsListening(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`
            relative flex items-center justify-center w-20 h-20 rounded-full transition-all shadow-xl cursor-pointer
            ${isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse scale-110 shadow-red-200' 
                : 'bg-emerald-600 hover:bg-emerald-700 hover:scale-105 shadow-emerald-200'
            }
        `}
        title={isListening ? "Aufnahme stoppen" : "Aufnahme starten"}
      >
        {isListening ? (
             <Square className="w-8 h-8 text-white" />
        ) : (
             <Mic className="w-8 h-8 text-white" />
        )}
        
        {/* Ripple effect rings when listening */}
        {isListening && (
            <>
                <div className="absolute inset-0 rounded-full border-4 border-red-200 animate-ping opacity-75"></div>
                <div className="absolute -inset-3 rounded-full border border-red-100 animate-pulse opacity-50"></div>
            </>
        )}
      </button>
      
      <p className="text-sm font-medium text-slate-500">
        {isListening ? "Ich höre zu... (Tippen zum Stoppen)" : "Tippen zum Sprechen"}
      </p>
    </div>
  );
};

export default AudioRecorder;
