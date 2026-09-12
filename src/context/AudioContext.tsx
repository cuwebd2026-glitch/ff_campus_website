import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface AudioContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  currentTrackName: string;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: true,
  toggleMusic: () => {},
  currentTrackName: "",
});

const WORLD_CUP_TRACK = "/audio/04. Free Fire Lobby - World Cup I.mp3";
const WINTERLANDS_TRACK = "/audio/03. Free Fire Lobby - Winterlands I.mp3";

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Default music to ON unless explicitly disabled by user
  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ff_music_pref") !== "off";
    }
    return true;
  });

  const isPlayingRef = useRef<boolean>(isPlaying);

  const isRegisterPage = location.pathname === "/register";
  const targetTrack = isRegisterPage ? WINTERLANDS_TRACK : WORLD_CUP_TRACK;
  const currentTrackName = isRegisterPage ? "Winterlands I" : "World Cup I";

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Initialize single persistent Audio element with Default ON
  useEffect(() => {
    const audio = new Audio(targetTrack);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    // Attempt immediate playback on initial load
    if (isPlayingRef.current) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Browser autoplay restriction: will automatically start on first user interaction
        });
    }

    const startOnFirstInteraction = () => {
      if (audioRef.current && isPlayingRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {});
      }
    };

    window.addEventListener("pointerdown", startOnFirstInteraction, { once: true });
    window.addEventListener("click", startOnFirstInteraction, { once: true });
    window.addEventListener("keydown", startOnFirstInteraction, { once: true });
    window.addEventListener("touchstart", startOnFirstInteraction, { once: true });
    window.addEventListener("scroll", startOnFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", startOnFirstInteraction);
      window.removeEventListener("click", startOnFirstInteraction);
      window.removeEventListener("keydown", startOnFirstInteraction);
      window.removeEventListener("touchstart", startOnFirstInteraction);
      window.removeEventListener("scroll", startOnFirstInteraction);
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
      localStorage.setItem("ff_music_pref", "off");
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          localStorage.setItem("ff_music_pref", "on");
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
