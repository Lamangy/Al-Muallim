
import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen, Mic, LayoutGrid, Volume2, Info, Ear, ChevronRight, ArrowLeft, RotateCcw, CheckCircle, XCircle, Search, X, AlertTriangle, Settings, PlayCircle, Sun, Moon, PenTool, Puzzle, GraduationCap, Home, Trophy, Flame, Star, MessageCircle } from 'lucide-react';
import { AppView, LearningUnit, VocabularyWord, PronunciationResult, ArabicLetter, UserProgress } from './types';
import { UNITS } from './constants';
import { playTextToSpeech, checkVoiceSupport, VoiceStatus, playDebugAudio } from './services/gemini';
import { getUserProgress, addXP, completeUnit, getLevelInfo, checkStreak } from './services/gamification';
import AudioRecorder from './components/AudioRecorder';
import HandwritingCanvas from './components/HandwritingCanvas';
import LetterPuzzle from './components/LetterPuzzle';
import StoryMode from './components/StoryMode';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.COURSE_OVERVIEW);
  const [selectedUnit, setSelectedUnit] = useState<LearningUnit | null>(null);
  
  // Gamification State
  const [userProgress, setUserProgress] = useState<UserProgress>(getUserProgress());
  const [showLevelUp, setShowLevelUp] = useState<boolean>(false);
  const levelInfo = getLevelInfo(userProgress.xp);

  // Navigation State inside a Unit
  const [searchQuery, setSearchQuery] = useState('');
  const [unitTab, setUnitTab] = useState<'letters' | 'vocabulary' | 'grammar'>('letters');
  
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [trainerResult, setTrainerResult] = useState<PronunciationResult | null>(null);
  
  // Trainer State
  const [trainerWord, setTrainerWord] = useState<VocabularyWord | null>(null);
  
  // Voice Status State
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>('LOADING');
  const [showVoiceHelp, setShowVoiceHelp] = useState(false);
  // Default to true to hide warning initially (until user clicks play)
  const [voiceWarningDismissed, setVoiceWarningDismissed] = useState(true);

  // Writing State
  const [writingItem, setWritingItem] = useState<{type: 'letter' | 'word', item: ArabicLetter | VocabularyWord} | null>(null);

  useEffect(() => {
    // Initial check
    setVoiceStatus(checkVoiceSupport());
    // Check streak
    const streakProgress = checkStreak();
    setUserProgress(streakProgress);

    // Listen for voices loading (happens async on Chrome/Android)
    window.speechSynthesis.onvoiceschanged = () => {
        setVoiceStatus(checkVoiceSupport());
    };
  }, []);

  // Update progress state helper
  const handleXPUpdate = (amount: number) => {
      const oldLevel = getLevelInfo(userProgress.xp).level;
      const newProgress = addXP(amount);
      const newLevel = getLevelInfo(newProgress.xp).level;
      
      if (newLevel > oldLevel) {
          setShowLevelUp(true);
          setTimeout(() => setShowLevelUp(false), 3000);
      }
      setUserProgress(newProgress);
  };

  const handleUnitCompletion = (unitId: string) => {
      const newProgress = completeUnit(unitId);
      setUserProgress(newProgress);
  };

  // Search Logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const lowerQuery = searchQuery.toLowerCase();
    const results: { unit: LearningUnit, type: 'vocabulary' | 'grammar', item: any }[] = [];

    UNITS.forEach(unit => {
      // Search Vocabulary
      unit.vocabulary.forEach(word => {
        if (word.german.toLowerCase().includes(lowerQuery) ||
            word.arabic.includes(searchQuery) ||
            word.transliteration.toLowerCase().includes(lowerQuery)) {
          results.push({ unit, type: 'vocabulary', item: word });
        }
      });
      // Search Grammar
      if (unit.grammar) {
          unit.grammar.forEach(rule => {
              if (rule.title.toLowerCase().includes(lowerQuery) ||
                  rule.content.some(c => c.toLowerCase().includes(lowerQuery))) {
                   results.push({ unit, type: 'grammar', item: rule });
              }
          });
      }
    });
    return results;
  }, [searchQuery]);

  const handlePlayAudio = async (text: string, id: string) => {
    if (playingAudio === id) return;
    
    if (voiceStatus === 'NO_ARABIC') {
        setShowVoiceHelp(true);
        // Wir versuchen es trotzdem, vielleicht klappt der OS Fallback
    }

    setPlayingAudio(id);
    try {
      await playTextToSpeech(text);
    } catch (e) {
      console.error("Playback failed", e);
    } finally {
      setTimeout(() => setPlayingAudio(null), 500); 
    }
  };

  const openUnitDashboard = (unit: LearningUnit) => {
    setSelectedUnit(unit);
    // Direct to story mode if it's a story unit
    if (unit.story) {
        setCurrentView(AppView.STORY);
    } else {
        setCurrentView(AppView.UNIT_DASHBOARD);
    }
    setSearchQuery('');
    window.scrollTo(0, 0);
  };

  const navigateToSubView = (view: AppView) => {
      if (!selectedUnit) return;
      
      // Pre-configure states based on view
      if (view === AppView.UNIT_WRITING) {
        if (selectedUnit.letters.length > 0) {
            setWritingItem({ type: 'letter', item: selectedUnit.letters[0] });
        } else if (selectedUnit.vocabulary.length > 0) {
            setWritingItem({ type: 'word', item: selectedUnit.vocabulary[0] });
        } else {
            setWritingItem(null);
        }
      }

      if (view === AppView.UNIT_LEARN) {
        if (selectedUnit.letters.length > 0) setUnitTab('letters');
        else if (selectedUnit.vocabulary.length > 0) setUnitTab('vocabulary');
        else setUnitTab('grammar');
      }
      
      if (view === AppView.TRAINER) {
          initTrainer(selectedUnit); // Local trainer
      } else {
          setCurrentView(view);
      }
      window.scrollTo(0, 0);
  };

  const handleBack = () => {
      if (currentView === AppView.COURSE_OVERVIEW) return;
      
      if (currentView === AppView.UNIT_DASHBOARD || (currentView === AppView.STORY && selectedUnit?.story)) {
          setCurrentView(AppView.COURSE_OVERVIEW);
          setSelectedUnit(null);
          return;
      }

      // If inside a tool/subview, go back to Unit Dashboard
      if (selectedUnit) {
          setCurrentView(AppView.UNIT_DASHBOARD);
      } else {
          // Global Trainer fallback
          setCurrentView(AppView.COURSE_OVERVIEW);
      }
  };

  const initTrainer = (unit?: LearningUnit) => {
    const pool = unit ? unit.vocabulary : UNITS.flatMap(u => u.vocabulary);
    if (pool.length === 0) return;
    
    const random = pool[Math.floor(Math.random() * pool.length)];
    setTrainerWord(random);
    setTrainerResult(null); 
    setCurrentView(AppView.TRAINER);
    window.scrollTo(0, 0);
  };

  const openFromResult = (unit: LearningUnit, type: 'vocabulary' | 'grammar') => {
      setSelectedUnit(unit);
      setUnitTab(type);
      setCurrentView(AppView.UNIT_LEARN);
      setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-20 md:pb-0 relative">
      {/* Level Up Overlay */}
      {showLevelUp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white p-8 rounded-3xl shadow-2xl text-center transform scale-110">
                  <Trophy className="w-20 h-20 mx-auto text-yellow-400 mb-4 drop-shadow-md" />
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">Level Up!</h2>
                  <p className="text-emerald-600 font-bold text-xl">Du bist jetzt Level {levelInfo.level}!</p>
              </div>
          </div>
      )}

      {/* Header */}
      <header className="bg-emerald-700 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          {/* Top Row: Navigation & Title */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3 overflow-hidden">
                {currentView !== AppView.COURSE_OVERVIEW && (
                    <button onClick={handleBack} className="mr-1 p-1 hover:bg-emerald-600 rounded-full transition-colors flex-shrink-0">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                )}
                <div className="w-8 h-8 bg-emerald-800 rounded-lg flex items-center justify-center text-lg font-bold font-arabic border border-emerald-600 shadow-inner flex-shrink-0">
                ض
                </div>
                <div className="min-w-0">
                <h1 className="text-lg font-bold tracking-tight truncate">Al-Muallim</h1>
                </div>
            </div>
            
            {currentView !== AppView.COURSE_OVERVIEW && (
                <button onClick={() => {setSelectedUnit(null); setCurrentView(AppView.COURSE_OVERVIEW);}} className="p-2 text-emerald-100 hover:text-white flex-shrink-0">
                    <Home className="w-5 h-5" />
                </button>
            )}
          </div>

          {/* Bottom Row: Gamification Stats */}
          <div className="flex items-center justify-between bg-emerald-800/50 rounded-lg p-2 px-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                  <div className="bg-yellow-500/20 p-1 rounded-full"><Star className="w-3 h-3 text-yellow-400" fill="currentColor" /></div>
                  <span className="font-bold">{userProgress.xp} XP</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="bg-orange-500/20 p-1 rounded-full"><Flame className="w-3 h-3 text-orange-400" fill="currentColor" /></div>
                  <span className="font-bold">{userProgress.streak} Tage</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="bg-blue-500/20 p-1 rounded-full"><Trophy className="w-3 h-3 text-blue-300" fill="currentColor" /></div>
                  <span className="font-bold">Lvl {levelInfo.level}</span>
              </div>
          </div>
          {/* XP Progress Bar */}
          <div className="h-1 bg-emerald-900/30 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-yellow-400 transition-all duration-500" style={{ width: `${levelInfo.progress * 100}%` }}></div>
          </div>
        </div>
      </header>

      {/* Voice Check Banner */}
      {((voiceStatus === 'NO_ARABIC' && !voiceWarningDismissed) || showVoiceHelp) && (
        <div className="bg-amber-50 border-b border-amber-200 p-4 text-sm text-amber-900">
            {/* ... existing warning content ... */}
            <div className="max-w-4xl mx-auto">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="font-bold mb-1">Keine arabische Stimme gefunden</p>
                        <button onClick={() => setVoiceWarningDismissed(true)} className="text-xs underline">Ausblenden</button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto w-full p-4 md:p-6">
        
        {/* 1. COURSE OVERVIEW (Home) */}
        {currentView === AppView.COURSE_OVERVIEW && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    type="text"
                    placeholder="Suche..."
                    className="block w-full pl-10 pr-10 py-4 border border-slate-200 rounded-xl text-base bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-3 text-slate-400">
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            {!searchQuery ? (
              <>
                <div className="grid grid-cols-1 gap-4">
                  {UNITS.map((unit) => {
                    const isCompleted = userProgress.completedUnits.includes(unit.id);
                    const isStory = !!unit.story;
                    
                    return (
                    <button
                      key={unit.id}
                      onClick={() => openUnitDashboard(unit)}
                      className={`
                        p-5 rounded-xl shadow-sm border transition-all flex items-center justify-between group text-left relative overflow-hidden
                        ${isStory ? 'bg-indigo-50 border-indigo-200 hover:border-indigo-400' : 'bg-white border-slate-200 hover:border-emerald-500'}
                        hover:shadow-md
                      `}
                    >
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isCompleted ? 'bg-yellow-400' : (isStory ? 'bg-indigo-500' : 'bg-emerald-500')} rounded-l-xl`}></div>
                      <div className="pl-3 flex-1">
                        <div className="flex items-center gap-2">
                            <h3 className={`font-bold text-lg ${isStory ? 'text-indigo-900' : 'text-slate-800'}`}>{unit.title}</h3>
                            {isCompleted && <CheckCircle className="w-5 h-5 text-yellow-500 fill-yellow-100" />}
                        </div>
                        <p className={`text-xl mt-1 font-arabic ${isStory ? 'text-indigo-600' : 'text-slate-500'}`}>{unit.subTitle}</p>
                        <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500">{unit.xp} XP</span>
                            {isStory && <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-600 flex items-center gap-1"><MessageCircle className="w-3 h-3"/> Story</span>}
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                    </button>
                  )})}
                </div>
                 <button 
                    onClick={() => initTrainer()}
                    className="w-full mt-6 bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                    <Mic className="w-5 h-5" />
                    Gesamten Wortschatz üben
                </button>
              </>
            ) : (
              <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-slate-700">
                      {searchResults.length} Ergebnisse für "{searchQuery}"
                  </h2>
                  {searchResults.length === 0 && (
                      <div className="text-center py-10 text-slate-400">
                          <Search className="w-12 h-12 mx-auto mb-2 opacity-20" />
                          <p>Keine Treffer gefunden.</p>
                      </div>
                  )}
                  {searchResults.map((result, idx) => {
                      if (result.type === 'vocabulary') {
                          const word = result.item as VocabularyWord;
                          return (
                              <button 
                                key={idx}
                                onClick={() => openFromResult(result.unit, 'vocabulary')}
                                className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-emerald-500 transition-all text-left flex items-center justify-between"
                              >
                                  <div>
                                      <div className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1">{result.unit.title}</div>
                                      <div className="font-arabic text-2xl text-slate-900">{word.arabic}</div>
                                      <div className="text-slate-600">{word.german} <span className="text-slate-400 text-sm">({word.transliteration})</span></div>
                                  </div>
                                  <BookOpen className="w-5 h-5 text-slate-300" />
                              </button>
                          );
                      } else {
                          const rule = result.item as any;
                          return (
                             <button 
                                key={idx}
                                onClick={() => openFromResult(result.unit, 'grammar')}
                                className="w-full bg-amber-50 p-4 rounded-xl border border-amber-100 hover:border-amber-300 transition-all text-left"
                              >
                                  <div className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">{result.unit.title}</div>
                                  <div className="font-bold text-amber-900">{rule.title}</div>
                                  <p className="text-sm text-amber-800 mt-1 line-clamp-2">{rule.content.join(' ')}</p>
                              </button>
                          );
                      }
                  })}
              </div>
            )}
          </div>
        )}

        {/* 2. UNIT DASHBOARD */}
        {currentView === AppView.UNIT_DASHBOARD && selectedUnit && (
            <div className="space-y-6 animate-in slide-in-from-right-10 duration-300">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-800 mb-1">{selectedUnit.title}</h2>
                    <p className="font-arabic text-3xl text-emerald-600">{selectedUnit.subTitle}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                        onClick={() => navigateToSubView(AppView.UNIT_LEARN)}
                        className="col-span-1 sm:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center hover:border-emerald-500 hover:shadow-md transition-all"
                    >
                        <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mb-3">
                            <BookOpen className="w-7 h-7" />
                        </div>
                        <h3 className="font-bold text-lg text-slate-800">Lernen & Lesen</h3>
                        <p className="text-sm text-slate-500 mt-1">Buchstaben, Vokabeln & Regeln</p>
                    </button>

                    <button 
                        onClick={() => navigateToSubView(AppView.UNIT_WRITING)}
                        className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center hover:border-blue-500 hover:shadow-md transition-all"
                    >
                        <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-3">
                            <PenTool className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-slate-800">Schreiben</h3>
                    </button>

                    <button 
                        onClick={() => navigateToSubView(AppView.TRAINER)}
                        className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center hover:border-red-500 hover:shadow-md transition-all"
                    >
                        <div className="w-12 h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center mb-3">
                            <Mic className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-slate-800">Sprechen</h3>
                    </button>

                    {selectedUnit.letters.length > 0 && (
                        <button 
                            onClick={() => navigateToSubView(AppView.UNIT_PUZZLE)}
                            className="col-span-1 sm:col-span-2 bg-indigo-50 p-5 rounded-2xl shadow-sm border border-indigo-100 flex flex-row items-center justify-between px-8 hover:border-indigo-300 transition-all"
                        >
                            <div className="flex flex-col items-start text-left">
                                <h3 className="font-bold text-indigo-900 text-lg">Verbindungs-Puzzle</h3>
                                <p className="text-sm text-indigo-700 mt-1">Formen lernen (+10 XP)</p>
                            </div>
                            <Puzzle className="w-10 h-10 text-indigo-500" />
                        </button>
                    )}
                </div>
            </div>
        )}

        {/* 3. UNIT LEARN VIEW */}
        {currentView === AppView.UNIT_LEARN && selectedUnit && (
          <div className="space-y-6">
            {/* Tabs Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200 mb-4 sticky top-0 bg-slate-50 pt-2 z-10 no-scrollbar">
                {selectedUnit.letters.length > 0 && (
                    <TabButton active={unitTab === 'letters'} onClick={() => setUnitTab('letters')} label="Buchstaben" icon={<LayoutGrid className="w-4 h-4"/>} />
                )}
                {selectedUnit.vocabulary.length > 0 && (
                    <TabButton active={unitTab === 'vocabulary'} onClick={() => setUnitTab('vocabulary')} label="Wörter" icon={<BookOpen className="w-4 h-4"/>} />
                )}
                {selectedUnit.grammar && (
                    <TabButton active={unitTab === 'grammar'} onClick={() => setUnitTab('grammar')} label="Infos" icon={<Info className="w-4 h-4"/>} />
                )}
            </div>

            {/* Content: Letters */}
            {unitTab === 'letters' && (
                <div className="grid grid-cols-1 gap-4">
                    {selectedUnit.letters.map((l) => {
                        const isSun = l.explanation?.includes('Sonnenbuchstabe');
                        const isMoon = l.explanation?.includes('Mondbuchstabe');
                        let cardStyle = "bg-white border-slate-200 hover:shadow-md";
                        if (isSun) cardStyle = "bg-amber-50 border-amber-300 shadow-amber-100";
                        if (isMoon) cardStyle = "bg-indigo-50 border-indigo-300 shadow-indigo-100";

                        return (
                        <div 
                            key={l.name} 
                            onClick={() => handlePlayAudio(l.char, l.name)}
                            className={`rounded-xl border shadow-sm p-5 transition-all cursor-pointer active:scale-95 ${cardStyle}`}
                        >
                            <div className="flex justify-between items-start mb-4 border-b border-black/5 pb-3">
                                <div>
                                    <h3 className="text-xl font-bold">{l.name}</h3>
                                    <span className="text-xs text-slate-500">{l.transliteration}</span>
                                </div>
                                <div className="text-5xl font-arabic leading-none">{l.char}</div>
                            </div>
                            {/* Forms Grid */}
                            <div className="bg-white/50 rounded-lg border border-black/5 mb-4 overflow-hidden">
                                <div className="flex divide-x divide-black/5 overflow-x-auto text-center">
                                    <LetterFormBox label="Anfang" arabic={l.forms.initial} className="flex-1 min-w-[4.5rem] py-3 px-2" />
                                    <LetterFormBox label="Mitte" arabic={l.forms.medial} className="flex-1 min-w-[4.5rem] py-3 px-2" />
                                    <LetterFormBox label="Ende" arabic={l.forms.final} className="flex-1 min-w-[4.5rem] py-3 px-2" />
                                    <LetterFormBox label="Allein" arabic={l.forms.isolated} className="flex-1 min-w-[4.5rem] py-3 px-2" />
                                </div>
                            </div>
                            <p className="text-sm text-slate-600">{l.explanation}</p>
                        </div>
                    )})}
                </div>
            )}

            {/* Content: Vocabulary */}
            {unitTab === 'vocabulary' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedUnit.vocabulary.map((word, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                        <div className="p-5 flex-grow flex flex-col items-center text-center justify-center bg-slate-50/30">
                            <div className="text-4xl font-arabic text-slate-900 mb-2 leading-relaxed">{word.arabic}</div>
                            <div className="text-emerald-600 font-medium text-sm mb-1">{word.transliteration}</div>
                            <div className="text-slate-600">{word.german}</div>
                        </div>
                        <button
                            onClick={() => handlePlayAudio(word.arabic, word.transliteration + idx)}
                            className="bg-white border-t border-slate-100 p-3 text-emerald-700 font-medium text-sm hover:bg-emerald-50 flex items-center justify-center gap-2"
                        >
                            <Volume2 className="w-4 h-4" /> Anhören
                        </button>
                    </div>
                    ))}
                </div>
            )}

             {/* Content: Grammar */}
             {unitTab === 'grammar' && selectedUnit.grammar && (
                <div className="space-y-6">
                    {selectedUnit.grammar.map((rule, idx) => (
                        <div key={idx} className="bg-amber-50 border border-amber-100 p-6 rounded-xl">
                            <h3 className="text-amber-900 font-bold text-lg mb-4 flex items-center gap-2"><Info className="w-5 h-5" /> {rule.title}</h3>
                            <ul className="space-y-3">
                                {rule.content.map((point, pIdx) => (
                                    <li key={pIdx} className="text-amber-800 flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
          </div>
        )}

        {/* 4. WRITING VIEW */}
        {currentView === AppView.UNIT_WRITING && selectedUnit && writingItem && (
            <div className="space-y-4">
                {/* Selection Area: Letters/Words same as before... */}
                <HandwritingCanvas 
                    letter={writingItem.type === 'letter' ? writingItem.item as ArabicLetter : undefined} 
                    word={writingItem.type === 'word' ? writingItem.item as VocabularyWord : undefined}
                />
            </div>
        )}

        {/* 5. PUZZLE VIEW */}
        {currentView === AppView.UNIT_PUZZLE && selectedUnit && (
            <LetterPuzzle 
                unit={selectedUnit} 
                onComplete={() => {
                    handleXPUpdate(10);
                    handleUnitCompletion(selectedUnit.id);
                }}
            />
        )}

        {/* 6. STORY MODE */}
        {currentView === AppView.STORY && selectedUnit?.story && (
            <StoryMode 
                story={selectedUnit.story}
                onComplete={() => {
                    handleXPUpdate(selectedUnit.xp);
                    handleUnitCompletion(selectedUnit.id);
                    setTimeout(() => setCurrentView(AppView.COURSE_OVERVIEW), 2000);
                }}
            />
        )}

        {/* 7. TRAINER MODE */}
        {currentView === AppView.TRAINER && trainerWord && (
          <div className="space-y-6 max-w-md mx-auto text-center">
             {/* Trainer UI same as before... */}
             <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-200 relative overflow-hidden">
                {trainerResult && (
                    <div className={`absolute top-0 left-0 w-full h-2 ${trainerResult.isCorrect ? 'bg-emerald-500' : 'bg-red-500'}`} />
                )}
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 mt-2">Aussprache-Trainer</h3>
                <div className="mb-8 space-y-2">
                    <div className="text-6xl font-arabic leading-loose transition-colors duration-500" 
                         style={{ color: trainerResult ? (trainerResult.isCorrect ? '#059669' : '#DC2626') : '#1e293b' }}>
                        {trainerWord.arabic}
                    </div>
                    <div className="text-xl font-medium text-emerald-600">{trainerWord.transliteration}</div>
                    <div className="text-slate-500">{trainerWord.german}</div>
                </div>

                {trainerResult ? (
                    <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100 animate-in fade-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            {trainerResult.isCorrect ? (
                                <div className="text-emerald-600 font-bold flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Perfekt! +5 XP</div>
                            ) : (
                                <div className="text-red-500 font-bold flex items-center gap-2"><XCircle className="w-5 h-5" /> Nicht ganz...</div>
                            )}
                        </div>
                    </div>
                ) : (
                    <button onClick={() => handlePlayAudio(trainerWord.arabic, 'trainer')} className="mx-auto mb-8 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                        <Ear className="w-4 h-4" /> <span className="text-sm font-bold">Anhören</span>
                    </button>
                )}

                <AudioRecorder 
                    targetWord={trainerWord.arabic}
                    onResult={(res) => {
                        setTrainerResult(res);
                        if (res.isCorrect) handleXPUpdate(5);
                    }}
                    onStart={() => setTrainerResult(null)}
                />
             </div>
             <div className="flex gap-4 justify-center">
                 <button onClick={() => setTrainerResult(null)} className="p-3 rounded-full bg-white text-slate-500 border shadow-sm"><RotateCcw className="w-5 h-5" /></button>
                 <button onClick={() => initTrainer(selectedUnit || undefined)} className="px-8 py-3 bg-slate-800 text-white rounded-full font-medium shadow-lg flex items-center gap-2">Nächstes Wort <ChevronRight className="w-4 h-4" /></button>
             </div>
          </div>
        )}

      </main>
      <div className="md:hidden h-6"></div>
    </div>
  );
};

const TabButton: React.FC<{active: boolean, onClick: () => void, label: string, icon: React.ReactNode}> = ({active, onClick, label, icon}) => (
    <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${active ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'}`}>
        {icon} {label}
    </button>
);

const LetterFormBox: React.FC<{label: string, arabic: string, className?: string}> = ({label, arabic, className}) => (
    <div className={`flex flex-col items-center justify-center ${className || ''}`}>
        <span className="text-[10px] text-slate-400 uppercase tracking-wide mb-1">{label}</span>
        <span className="text-3xl font-arabic text-slate-800 leading-relaxed h-10 flex items-center">{arabic}</span>
    </div>
);

export default App;
