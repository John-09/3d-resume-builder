// src/features/voice/hooks/useSpeechRecognition.ts
import { useEffect, useRef, useState, useCallback } from "react";
import { useAppStore } from "../../../shared/store/useAppStore";

type UseSpeechRecognitionOptions = {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  autoRestart?: boolean; // if true, restart recognition when it stops
};

export function useSpeechRecognition(options: UseSpeechRecognitionOptions = {}) {
  const {
    lang = "en-US",
    continuous = true,
    interimResults = false,
    autoRestart = true,
  } = options;

  // Browser compatibility
  const SpeechRecognitionConstructor: any =
    (typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) ||
    null;

  const recognitionRef = useRef<any | null>(null);
  const listeningRef = useRef(false); // persistent across restarts
  const [isSupported] = useState(Boolean(SpeechRecognitionConstructor));
  const [isListening, setIsListening] = useState(false);
  const [lastTranscript, setLastTranscript] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);
  const [interimTranscript, setInterimTranscript] = useState<string>("");

  useEffect(() => {
    if (!SpeechRecognitionConstructor) return;

    const rec = new SpeechRecognitionConstructor();
    rec.lang = lang;
    rec.continuous = continuous;
    rec.interimResults = interimResults;

    rec.onresult = (event: SpeechRecognitionEvent) => {
      // event.results is a SpeechRecognitionResultList
      let finalText = "";
      let interimText = "";
      let finalConfidence = 0;
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0]?.transcript?.trim() ?? "";
        if (result.isFinal) {
          finalText += (finalText ? " " : "") + transcript;
          finalConfidence = result[0]?.confidence ?? finalConfidence;
        } else {
          interimText += (interimText ? " " : "") + transcript;
        }
      }

      if (finalText) {
        setLastTranscript(finalText);
        setConfidence(finalConfidence);
        setInterimTranscript("");
      } else {
        setInterimTranscript(interimText);
      }
    };

    rec.onend = () => {
      // recognition ended (could be natural)
      setIsListening(false);
      if (autoRestart && listeningRef.current) {
        // restart if caller still expects listening
        try {
          rec.start();
          setIsListening(true);
        } catch (err) {
          // some browsers throw if restart happens too fast; ignore
          console.warn("SpeechRecognition restart failed:", err);
          setIsListening(false);
        }
      }
    };

    rec.onerror = (ev: any) => {
      console.error("SpeechRecognition error:", ev);
    };

    recognitionRef.current = rec;

    return () => {
      try {
        rec.onresult = null;
        rec.onend = null;
        rec.onerror = null;
        rec.stop?.();
      } catch {}
      recognitionRef.current = null;
      listeningRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SpeechRecognitionConstructor, lang, continuous, interimResults, autoRestart]);

  const start = useCallback(() => {
    if (!recognitionRef.current) return;
  
    useAppStore.getState().playEffect("listening_start");

    try {
      listeningRef.current = true;
      setTimeout(() => {
        recognitionRef.current.start();
        setIsListening(true);
      }, 200); // ← Add delay
    } catch (err) {
      console.warn("SpeechRecognition start error:", err);
    }
  }, []);
  

  const stop = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      listeningRef.current = false;
      recognitionRef.current.stop();
      setIsListening(false);
    } catch (err) {
      console.warn("SpeechRecognition stop error:", err);
    }
  }, []);

  const clearLastTranscript = useCallback(() => setLastTranscript(""), []);

  return {
    isSupported,
    isListening,
    start,
    stop,
    lastTranscript,
    interimTranscript,
    clearLastTranscript,
    confidence,
  };
}
