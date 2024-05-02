"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn, formatTime } from "@/lib/utils";
import { useAudio } from "@/providers/AudioProvider";

import { Slider } from "./ui/slider";

const PodcastPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const { audio } = useAudio();

  const togglePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const forward = () => {
    if (
      audioRef.current &&
      audioRef.current.currentTime &&
      audioRef.current.duration &&
      audioRef.current.currentTime + 5 < audioRef.current.duration
    ) {
      audioRef.current.currentTime += 5;
    }
  };

  const rewind = () => {
    if (audioRef.current && audioRef.current.currentTime - 5 > 0) {
      audioRef.current.currentTime -= 5;
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (audio?.audioUrl) {
      const audioElement = audioRef.current;
      if (audioElement) {
        audioElement.play().then(() => {
          setIsPlaying(true);
        });
      }
    }
  }, [audio?.audioUrl]);
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };
  const handleVolumeChange = (newValue: number[]) => {
    const newVolume = newValue[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 200;
    }
  };

  return (
    <section
      className={cn(
        "glassmorphism-black sticky bottom-0 left-0 flex h-[112px] w-full items-center justify-between px-4 md:px-12",
        { hidden: !audio?.audioUrl || audio?.audioUrl === "" }
      )}
    >
      <audio
        ref={audioRef}
        src={audio?.audioUrl}
        className="hidden"
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />
      <div className="flex items-center gap-4 max-md:hidden">
        <Image
          src={audio?.imageUrl!}
          width={64}
          height={64}
          alt="player1"
          className="rounded-xl"
        />
        <div className="flex flex-col">
          <h2 className="text-14 font-semibold text-white-1">{audio?.title}</h2>
          <p className="text-12 font-normal text-white-2">{audio?.author}</p>
        </div>
      </div>
      <div className="flex-center cursor-pointer gap-6">
        <Image
          src={"/icons/reverse.svg"}
          width={24}
          height={24}
          alt="rewind"
          onClick={rewind}
        />
        <Image
          src={isPlaying ? "/icons/Pause.svg" : "/icons/Play.svg"}
          width={30}
          height={30}
          alt="play"
          onClick={togglePlayPause}
        />
        <Image
          src={"/icons/forward.svg"}
          width={24}
          height={24}
          alt="forward"
          onClick={forward}
        />
      </div>
      <div className="flex w-full max-w-[250px] items-center gap-6">
        <h2 className="text-16 font-normal text-white-2">
          {formatTime(duration)}
        </h2>
        <div className="flex w-full gap-2">
          <Image src="/icons/volume.svg" width={24} height={24} alt="play" />
          <Slider
            defaultValue={[volume]}
            max={200}
            step={5}
            className="w-3/5"
            onValueChange={handleVolumeChange}
          />
        </div>
      </div>
    </section>
  );
};

export default PodcastPlayer;
