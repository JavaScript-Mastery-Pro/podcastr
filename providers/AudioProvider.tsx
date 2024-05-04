"use client";
import { usePathname } from "next/navigation";
import React, { createContext, useState, useContext, useEffect } from "react";

interface AudioProps {
  title: string;
  audioUrl: string;
  author: string;
  imageUrl: string;
}

interface AudioContextType {
  audio: AudioProps | undefined;
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [audio, setAudio] = useState<AudioProps | undefined>();
  const pathname = usePathname();

  useEffect(() => {
    setAudio(undefined);
  }, [pathname]);

  return (
    <AudioContext.Provider value={{ audio, setAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);

  if (context === undefined) {
    throw new Error("useAudio must be used within a AudioProvider");
  }

  return context;
};

export default AudioProvider;
