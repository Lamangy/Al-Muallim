
// HINWEIS: Diese Datei nutzt ausschließlich Browser-Native APIs (Web Speech API).
// Es werden keine externen KI-Dienste oder API-Keys benötigt.

import { PronunciationResult } from '../types';

// --- Browser Native TTS (Text-to-Speech) ---

export type VoiceStatus = 'LOADING' | 'READY' | 'NO_ARABIC' | 'UNSUPPORTED';

/**
 * Versucht, eine passende arabische Stimme zu finden.
 * Mobile Browser laden Stimmen oft asynchron oder verstecken sie.
 */
function getArabicVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  // 1. Exakter Match für Saudi Arabien (Standard Hocharabisch)
  let voice = voices.find(v => v.lang === 'ar-SA');
  // 2. Allgemeines Arabisch
  if (!voice) voice = voices.find(v => v.lang.startsWith('ar'));
  // 3. "Google" Stimmen (Android spezifisch)
  if (!voice) voice = voices.find(v => v.name.includes('Arabic') || v.name.includes('Arabisch'));
  
  return voice;
}

/**
 * Prüft den Status der Sprachunterstützung.
 */
export const checkVoiceSupport = (): VoiceStatus => {
  if (!('speechSynthesis' in window)) {
    return 'UNSUPPORTED';
  }
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) {
    // Browser hat Stimmen noch nicht geladen
    return 'LOADING';
  }
  const arabicVoice = getArabicVoice();
  return arabicVoice ? 'READY' : 'NO_ARABIC';
};

/**
 * DEBUG: Spielt einen Test-Ton mit der Standard-Systemstimme ab.
 * Hilft Entwicklern zu prüfen, ob Audio generell funktioniert.
 */
export const playDebugAudio = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance("Das Audio-System funktioniert.");
    // Keine Sprache erzwingen -> nutzt Systemstandard (meist Deutsch/Englisch auf Windows)
    window.speechSynthesis.speak(utterance);
};

/**
 * Spielt Text sofort ab. 
 * WICHTIG: Muss direkt durch User-Interaktion (Klick) ausgelöst werden.
 * Keine asynchronen Wartenzeiten (setTimeout) verwenden, da sonst Mobile Browser blockieren.
 */
export const playTextToSpeech = (text: string): Promise<void> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn("Browser unterstützt keine Speech Synthesis.");
      resolve();
      return;
    }

    // 1. Sofortigen Abbruch vorheriger Audios
    window.speechSynthesis.cancel();

    // 2. Utterance erstellen
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA'; // Fallback für OS
    utterance.rate = 0.8; // Etwas langsamer für Lernzwecke

    // 3. Stimme zuweisen (falls verfügbar)
    const voice = getArabicVoice();
    if (voice) {
      utterance.voice = voice;
    } else {
      console.warn("Keine spezifische arabische Stimme gefunden. Verlasse mich auf OS-Fallback 'ar-SA'.");
    }

    // 4. Event Handling
    utterance.onend = () => resolve();
    utterance.onerror = (e) => {
      console.error("TTS Error:", e);
      resolve();
    };

    // 5. Abspielen
    window.speechSynthesis.speak(utterance);
    
    // iOS Safari Hack: Wenn speak() nicht feuert, hilft manchmal ein resume()
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }
  });
};

// Alte Signatur für Kompatibilität
export const evaluatePronunciation = async (
  audioBase64: string, 
  mimeType: string, 
  targetWord: string
): Promise<string> => {
    return "Bitte nutze den neuen Live-Modus.";
};


// --- Browser Native STT (Speech-to-Text) & Analysis ---

// Hilfsfunktion: Arabisch normalisieren (Vokale entfernen für fairen Vergleich)
function normalizeArabic(text: string): string {
  if (!text) return "";
  return text
    .replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g, '') // Entferne Tashkeel (Vokale etc)
    .replace(/(آ|إ|أ)/g, 'ا') // Normalisiere Aleph
    .replace(/ة/g, 'ه') // Normalisiere Ta Marbuta zu Ha (oft ähnlich gesprochen)
    .replace(/ى/g, 'ي') // Normalisiere Alif Maqsura
    .trim();
}

export const analyzeSpeech = async (targetWord: string): Promise<PronunciationResult> => {
  // Check browser support
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    return {
        isCorrect: false,
        score: 0,
        recognizedText: "Browser nicht unterstützt",
        feedbackDetails: []
    };
  }

  return new Promise((resolve) => {
    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.interimResults = false;
    recognition.maxAlternatives = 3; // Nimm die Top 3 Treffer für mehr Toleranz

    let hasResolved = false;

    const finish = (result: PronunciationResult) => {
        if (hasResolved) return;
        hasResolved = true;
        resolve(result);
    };

    recognition.onresult = (event: any) => {
        const results = event.results[0];
        const spokenTexts = Array.from(results).map((res: any) => res.transcript);
        
        // Wir vergleichen den besten Treffer
        const recognizedText = spokenTexts[0] as string;
        
        // Logik für Vergleich
        const normalizedTarget = normalizeArabic(targetWord);
        const normalizedSpoken = normalizeArabic(recognizedText);

        // 1. Exakter Match (auf normalisierter Basis)
        // Prüfe alle Alternativen, die der Browser liefert
        const isCorrect = spokenTexts.some((text: string) => normalizeArabic(text) === normalizedTarget);

        // 2. Buchstaben-Analyse für Feedback
        // Wir schauen, welche Buchstaben des Ziels im gesprochenen Text enthalten sind
        const feedbackDetails = normalizedTarget.split('').map(char => {
            return {
                char: char,
                status: normalizedSpoken.includes(char) ? 'correct' as const : 'missing' as const
            };
        });

        const score = isCorrect ? 100 : Math.max(0, 100 - (feedbackDetails.filter(f => f.status === 'missing').length * 20));

        finish({
            isCorrect,
            score,
            recognizedText,
            feedbackDetails
        });
    };

    recognition.onerror = (event: any) => {
        console.log("Speech Recognition Status:", event.error);
        let errorMsg = "Fehler";
        
        // 'no-speech' ist sehr häufig, wenn man zu lange wartet oder Hintergrundgeräusche hat.
        if (event.error === 'no-speech') errorMsg = "Keine Sprache erkannt";
        if (event.error === 'network') errorMsg = "Netzwerkfehler (Chrome benötigt Internet)";
        if (event.error === 'not-allowed') errorMsg = "Mikrofon gesperrt";
        if (event.error === 'aborted') errorMsg = "Abgebrochen";

        finish({
            isCorrect: false,
            score: 0,
            recognizedText: errorMsg,
            feedbackDetails: []
        });
    };

    recognition.onend = () => {
        // Falls der Browser stoppt (z.B. wegen Stille), aber weder result noch error gefeuert hat
        if (!hasResolved) {
            finish({
                isCorrect: false,
                score: 0,
                recognizedText: "Nicht verstanden (Timeout)",
                feedbackDetails: []
            });
        }
    };

    try {
        recognition.start();
    } catch (e) {
        console.error(e);
        finish({ isCorrect: false, score: 0, recognizedText: "Start Fehler", feedbackDetails: [] });
    }
  });
};
