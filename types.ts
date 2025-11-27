
export interface ArabicLetter {
  char: string;
  name: string;
  transliteration: string;
  explanation?: string;
  forms: {
    isolated: string;
    final: string;
    medial: string;
    initial: string;
  };
}

export interface VocabularyWord {
  arabic: string;
  german: string;
  transliteration: string; // Lautschrift aus dem Skript
  note?: string; // Zusatzinfos wie (m), (f)
}

export interface GrammarRule {
  title: string;
  content: string[];
}

export interface StoryChoice {
  text: string;
  isCorrect: boolean;
  response?: string;
}

export interface StoryMessage {
  id: string;
  sender: 'Nabil' | 'Samira' | 'User';
  text: string;
  translation?: string;
  audioText?: string;
  choices?: StoryChoice[];
}

export interface Story {
  id: string;
  title: string;
  messages: StoryMessage[];
}

export interface LearningUnit {
  id: string;
  title: string;
  subTitle?: string;
  letters: ArabicLetter[];
  vocabulary: VocabularyWord[];
  grammar?: GrammarRule[];
  xp: number;
  story?: Story;
}

export interface PronunciationResult {
  isCorrect: boolean;
  score: number; // 0 to 100
  recognizedText: string;
  feedbackDetails: {
    char: string;
    status: 'correct' | 'missing' | 'neutral';
  }[];
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  completedUnits: string[];
}

export enum AppView {
  COURSE_OVERVIEW = 'COURSE_OVERVIEW',
  UNIT_DASHBOARD = 'UNIT_DASHBOARD', // Neues Dashboard für die Lektion
  UNIT_LEARN = 'UNIT_LEARN', // Klassische Ansicht (Tabs: Buchstaben/Wörter/Infos)
  UNIT_WRITING = 'UNIT_WRITING', // Schreibmodus
  UNIT_PUZZLE = 'UNIT_PUZZLE', // Puzzlemodus
  TRAINER = 'TRAINER', // Globaler oder lokaler Trainer
  STORY = 'STORY' // Story Modus
}
