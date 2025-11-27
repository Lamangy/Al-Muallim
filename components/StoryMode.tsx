
import React, { useState, useEffect, useRef } from 'react';
import { Play, MessageCircle, Send, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Story, StoryMessage, StoryChoice } from '../types';
import { playTextToSpeech } from '../services/gemini';

interface StoryModeProps {
  story: Story;
  onComplete: () => void;
}

const StoryMode: React.FC<StoryModeProps> = ({ story, onComplete }) => {
  const [history, setHistory] = useState<StoryMessage[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentMessage = story.messages[currentStepIndex];

  useEffect(() => {
    // Start story
    if (currentStepIndex === 0 && history.length === 0) {
      processNextMessage();
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isTyping]);

  const processNextMessage = () => {
    if (currentStepIndex >= story.messages.length) {
      onComplete();
      return;
    }

    const msg = story.messages[currentStepIndex];

    if (msg.sender !== 'User') {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setHistory(prev => [...prev, msg]);
        
        // Auto-play audio for characters
        if (msg.audioText) {
            playTextToSpeech(msg.audioText);
        }

        // Move to next step immediately if it's not a user choice next
        const nextMsg = story.messages[currentStepIndex + 1];
        if (nextMsg && nextMsg.sender !== 'User') {
            // Delay slightly before showing next char message
            setTimeout(() => {
                setCurrentStepIndex(idx => idx + 1);
            }, 2000);
        } else {
            setCurrentStepIndex(idx => idx + 1);
        }
      }, 1000);
    } else {
      // Waiting for user input, just ensure we are at this index
    }
  };

  // Monitor index changes to trigger processing
  useEffect(() => {
      if (currentStepIndex > 0 && currentStepIndex < story.messages.length) {
          const msg = story.messages[currentStepIndex];
          if (msg.sender !== 'User') {
              processNextMessage();
          }
      } else if (currentStepIndex >= story.messages.length) {
          // End of story
          setTimeout(onComplete, 1500);
      }
  }, [currentStepIndex]);

  const handleChoice = (choice: StoryChoice) => {
    // Add user message
    const userMsg: StoryMessage = {
        id: 'user-' + Date.now(),
        sender: 'User',
        text: choice.text,
    };
    setHistory(prev => [...prev, userMsg]);

    if (choice.isCorrect) {
        playTextToSpeech(choice.text);
        setCurrentStepIndex(idx => idx + 1);
    } else {
        // Wrong answer feedback (maybe a shake effect or toast, then retry same step?)
        // For now, we just append a "wrong" hint or let them try again?
        // Simplest: Just show it was selected, but maybe add a system message "Das passt nicht ganz."
        // But to keep flow simple in this v1:
        // We assume the story continues only on correct choice or we branch.
        // The data structure supports linear flow. 
        // Let's just proceed but maybe color it red? 
        // Better: Only proceed on correct.
        // Let's implement "Try again" logic:
        // Actually, we added the message to history. If wrong, maybe remove it or show feedback?
        // Let's prevent adding to history if wrong, or show feedback bubble.
        
        // Correction: The UI usually shows choices until correct.
        // Let's undo the history add if wrong and show alert.
        
        // Actually, let's keep it simple: 
        // If wrong, show feedback toast, don't advance.
        // I will remove the just added message from logic above and put it inside this check.
    }
  };

  const handleChoiceClick = (choice: StoryChoice) => {
      if (choice.isCorrect) {
          const userMsg: StoryMessage = {
            id: 'user-' + Date.now(),
            sender: 'User',
            text: choice.text,
          };
          setHistory(prev => [...prev, userMsg]);
          playTextToSpeech(choice.text);
          setTimeout(() => {
              setCurrentStepIndex(idx => idx + 1);
          }, 500);
      } else {
          // Shake or Error
          const btn = document.getElementById(`choice-${choice.text}`);
          if(btn) {
              btn.classList.add('animate-shake');
              setTimeout(() => btn.classList.remove('animate-shake'), 500);
          }
          // Optional: Play error sound
      }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center gap-3 shadow-sm z-10">
        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
            {story.title.charAt(0)}
        </div>
        <div>
            <h3 className="font-bold text-slate-800">{story.title}</h3>
            <p className="text-xs text-slate-500">Nabil & Samira</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {history.map((msg, idx) => {
            const isMe = msg.sender === 'User';
            return (
                <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-3 px-4 shadow-sm relative ${
                        isMe 
                        ? 'bg-emerald-600 text-white rounded-br-none' 
                        : 'bg-white text-slate-800 rounded-bl-none'
                    }`}>
                        <p className="font-arabic text-lg leading-relaxed">{msg.text}</p>
                        {msg.translation && (
                            <p className={`text-xs mt-1 ${isMe ? 'text-emerald-200' : 'text-slate-400'}`}>
                                {msg.translation}
                            </p>
                        )}
                        
                        {!isMe && msg.audioText && (
                            <button 
                                onClick={() => playTextToSpeech(msg.audioText!)}
                                className="absolute -right-8 bottom-0 p-1.5 text-slate-400 hover:text-emerald-600 bg-white rounded-full shadow-sm"
                            >
                                <Play className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>
            );
        })}
        
        {isTyping && (
            <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Interaction Area */}
      <div className="bg-white p-4 border-t min-h-[120px]">
        {currentMessage?.sender === 'User' ? (
            <div className="grid grid-cols-1 gap-2">
                {currentMessage.choices?.map((choice, idx) => (
                    <button
                        id={`choice-${choice.text}`}
                        key={idx}
                        onClick={() => handleChoiceClick(choice)}
                        className="w-full p-3 text-left border-2 border-slate-100 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all flex justify-between items-center group"
                    >
                        <span className="font-arabic text-lg text-slate-700 group-hover:text-emerald-800">{choice.text}</span>
                        <Send className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                ))}
            </div>
        ) : (
            <div className="text-center text-slate-400 text-sm flex items-center justify-center h-full">
                {isTyping ? 'Schreibt...' : 'Warte auf Nachricht...'}
            </div>
        )}
      </div>
    </div>
  );
};

export default StoryMode;
