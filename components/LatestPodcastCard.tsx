"use client";
import Image from "next/image";
import { useState } from "react";

import { useAudio } from "@/providers/AudioProvider";

interface LatestPodcastCardProps {
  imgUrl: string;
  title: string;
  listeners: string;
  duration: string;
  index: number;
  audioUrl: string;
  author: string;
}

const IconWithDescription = ({
  img,
  detail,
}: {
  img: string;
  detail: string;
}) => {
  return (
    <div className="flex gap-3">
      <Image
        src={img}
        width={24}
        height={24}
        alt="headphone"
        className="max-md:hidden"
      />
      <h1 className="text-16 font-bold text-white-1">{detail}</h1>
    </div>
  );
};

const LatestPodcastCard = ({
  index,
  imgUrl,
  listeners,
  title,
  duration,
  audioUrl,
  author,
}: LatestPodcastCardProps) => {
  const { setAudio } = useAudio();
  const [isFocused, setIsFocused] = useState(false);
  return (
    <section
      className="flex w-full cursor-pointer justify-between"
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      onClick={() => setAudio({ title, author, imageUrl: imgUrl, audioUrl })}
    >
      <div className="flex items-center gap-3 md:gap-8">
        <div className="w-4 md:w-6">
          {!isFocused && (
            <h2 className="text-16 font-bold text-white-1">{index}</h2>
          )}
          {isFocused && (
            <Image
              src="/icons/play-gray.svg"
              width={22}
              height={24}
              alt="newpod"
            />
          )}
        </div>
        <figure className="flex items-center gap-4">
          <Image
            src={imgUrl}
            width={50}
            height={54}
            alt="pod image"
            className="h-[50px] w-full max-w-[50px] object-cover"
          />
          <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
        </figure>
      </div>
      <div className="flex items-center gap-14 max-md:hidden">
        <IconWithDescription img="/icons/headphone.svg" detail={listeners} />
        <IconWithDescription img="/icons/watch.svg" detail={duration} />
      </div>
    </section>
  );
};

export default LatestPodcastCard;
