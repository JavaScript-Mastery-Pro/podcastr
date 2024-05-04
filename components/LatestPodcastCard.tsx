"use client";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useState } from "react";

import { api } from "@/convex/_generated/api";
import { useAudio } from "@/providers/AudioProvider";
import { LatestPodcastCardProps } from "@/types";

const IconWithDescription = ({
  img,
  detail,
}: {
  img: string;
  detail: number | string;
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
  title,
  duration,
  audioUrl,
  author,
  views,
  podcastId,
}: LatestPodcastCardProps) => {
  const { setAudio } = useAudio();
  const [isFocused, setIsFocused] = useState(false);
  const updateViews = useMutation(api.podcasts.updatePodcastViews);

  const handleClick = async () => {
    setAudio({ title, author, imageUrl: imgUrl, audioUrl });
    await updateViews({ podcastId });
  };

  return (
    <section
      className="flex w-full cursor-pointer justify-between"
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      onClick={handleClick}
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
              alt="play"
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
        <IconWithDescription img="/icons/headphone.svg" detail={views} />
        <IconWithDescription img="/icons/watch.svg" detail={duration} />
      </div>
    </section>
  );
};

export default LatestPodcastCard;
