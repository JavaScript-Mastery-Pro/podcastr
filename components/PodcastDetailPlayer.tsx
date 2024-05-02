"use client";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";

interface PodcastDetailPlayerProps {
  audioUrl: string;
  podcastTitle: string;
  author: string;
  isOwner: boolean;
  imageUrl: string;
  podcastId: Id<"podcasts">;
  imageStorageId: Id<"_storage">;
  audioStorageId: Id<"_storage">;
}

const PodcastDetailPlayer = ({
  audioUrl,
  podcastTitle,
  author,
  imageUrl,
  podcastId,
  imageStorageId,
  audioStorageId,
  isOwner,
}: PodcastDetailPlayerProps) => {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const deletePodcast = useMutation(api.podcasts.deletePodcast);

  const handleDelete = async () => {
    try {
      await deletePodcast({ podcastId, imageStorageId, audioStorageId });
      toast({
        title: "Podcast deleted",
      });
      router.push("/");
    } catch (error) {
      console.error("Error deleting podcast", error);
      toast({
        title: "Error deleting podcast",
        variant: "destructive",
      });
    }
  };

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

  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <audio
        ref={audioRef}
        src={audioUrl}
        className="hidden"
        onEnded={() => setIsPlaying(false)}
      />
      <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
        <Image
          src={imageUrl}
          width={250}
          height={250}
          alt="Podcast image"
          className="h-[250px] w-full max-w-[250px] rounded-lg object-cover"
        />
        <div className="flex w-full flex-col gap-9 max-md:items-center">
          <article className="flex flex-col gap-2 max-md:items-center">
            <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
              {podcastTitle}
            </h1>
            <figure className="flex items-center gap-2">
              <Image
                src="/icons/caster3.png"
                width={30}
                height={30}
                alt="Caster icon"
                className="size-[30px] rounded-full object-cover"
              />
              <h2 className="text-16 font-normal text-white-3">{author}</h2>
            </figure>
          </article>
          <figure className="flex gap-8">
            <Image
              src="/icons/reverse.svg"
              width={24}
              height={24}
              alt="Rewind icon"
              onClick={rewind}
              className="cursor-pointer"
            />
            <Image
              src={isPlaying ? "/icons/Pause.svg" : "/icons/Play.svg"}
              width={30}
              height={30}
              alt="Rewind icon"
              onClick={togglePlayPause}
              className="cursor-pointer"
            />
            <Image
              src="/icons/forward.svg"
              width={24}
              height={24}
              alt="Forward icon"
              onClick={forward}
              className="cursor-pointer"
            />
          </figure>
        </div>
      </div>
      {isOwner && (
        <div className="mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src="/icons/three-dots.svg"
                width={20}
                height={30}
                alt="Three dots icon"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-none bg-black-1 hover:bg-black-6">
              <DropdownMenuItem className="hover:bg-black-6">
                <div className="flex gap-2" onClick={handleDelete}>
                  <Image
                    src="/icons/delete.svg"
                    width={16}
                    height={16}
                    alt="Delete icon"
                  />
                  <h2 className="text-16 font-normal text-white-1">Delete</h2>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default PodcastDetailPlayer;
