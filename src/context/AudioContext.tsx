import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface AudioContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  currentTrackName: string;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  toggleMusic: () => {},
  currentTrackName: "",
});

const WORLD_CUP_TRACK = "/audio/04. Free Fire Lobby - World Cup I.mp3";
const WINTERLANDS_TRACK = "/audio/03. Free Fire Lobby - Winterlands I.mp3";

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const isPlayingRef = useRef<boolean>(false);

  const isRegisterPage = location.pathname === "/register";
  const targetTrack = isRegisterPage ? WINTERLANDS_TRACK : WORLD_CUP_TRACK;
  const currentTrackName = isRegisterPage ? "Winterlands I" : "World Cup I";

  // Keep ref in sync
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Initialize single persistent Audio element
  useEffect(() => {
    const audio = new Audio(targetTrack);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    const startOnFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay blocked by browser policy
          });
      }
    };

    window.addEventListener("click", startOnFirstInteraction, { once: true });
    window.addEventListener("keydown", startOnFirstInteraction, { once: true });
    window.addEventListener("touchstart", startOnFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", startOnFirstInteraction);
      window.removeEventListener("keydown", startOnFirstInteraction);
      window.removeEventListener("touchstart", startOnFirstInteraction);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Route-based track switching: World Cup across site, Winterlands on /register
  useEffect(() => {
    if (!audioRef.current) return;

    const currentSrc = decodeURIComponent(audioRef.current.src);
    if (!currentSrc.endsWith(targetTrack)) {
      const shouldKeepPlaying = isPlayingRef.current;
      audioRef.current.src = targetTrack;
      audioRef.current.load();

      if (shouldKeepPlaying) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {});
      }
    }
  }, [targetTrack]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Playback error:", err);
        });
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleMusic, currentTrackName }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
