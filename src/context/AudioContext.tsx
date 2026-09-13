import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  currentTrackName: string;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  toggleMusic: () => {},
  currentTrackName: "Free Fire World Cup Theme",
});

const FREE_FIRE_THEME_TRACK = "/audio/04. Free Fire Lobby - World Cup I.mp3";
const TRACK_NAME = "Free Fire World Cup Theme";

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Set up the audio element on mount. Do NOT attempt to play it here —
  // playback should only ever start from an explicit click on the music
  // button (toggleMusic), never from autoplay or any other page interaction.
  useEffect(() => {
    const audio = new Audio(FREE_FIRE_THEME_TRACK);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

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
    <AudioContext.Provider value={{ isPlaying, toggleMusic, currentTrackName: TRACK_NAME }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);