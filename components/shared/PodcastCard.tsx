"use client";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface PodcastCardProps {
  imgUrl: string;
  title: string;
  author: string;
  podcastId: Id<"podcasts">;
}

const PodcastCard = ({
  imgUrl,
  title,
  author,
  podcastId,
}: PodcastCardProps) => {
  const router = useRouter();
  const updateViews = useMutation(api.podcasts.updatePodcastViews);

  const handleViews = async () => {
    await updateViews({ podcastId });
    router.push(`/podcast/${podcastId}`);
  };
  return (
    <div onClick={handleViews} className="cursor-pointer">
      <figure className="flex flex-col gap-2">
        <Image
          src={imgUrl}
          width={174}
          height={174}
          alt="pod"
          className="h-[220px] w-full rounded-xl 2xl:size-[200px]"
        />
        <div className="flex flex-col">
          <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
          <h2 className="text-12 font-normal capitalize text-white-4">
            {author}
          </h2>
        </div>
      </figure>
    </div>
  );
};

export default PodcastCard;
