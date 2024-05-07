"use client";

import { useQuery } from "convex/react";

import LatestPodcastCard from "@/components/LatestPodcastCard";
import Header from "@/components/shared/Header";
import PodcastCard from "@/components/shared/PodcastCard";
import { api } from "@/convex/_generated/api";
import { formatTime } from "@/lib/formatTime";
import { cn } from "@/lib/utils";

const Home = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);
  const latestPodcasts = useQuery(api.podcasts.getAllPodcasts);
  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <div className="podcast_grid">
          {trendingPodcasts?.map((podcast) => (
            <PodcastCard
              key={podcast._id}
              imgUrl={podcast.imageUrl!}
              title={podcast.podcastTitle!}
              description={podcast.podcastDescription}
              podcastId={podcast._id}
            />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-7">
        <Header titleClassName="text-xl" headerTitle="Latest Podcasts" />
        <div className="flex w-full flex-col">
          {latestPodcasts?.slice(0, 8).map((podcast, index) => (
            <div
              className={cn("py-2.5", {
                "border-b border-black-4": index !== latestPodcasts?.length - 1,
              })}
              key={podcast._id}
            >
              <LatestPodcastCard
                imgUrl={podcast.imageUrl!}
                title={podcast.podcastTitle}
                views={podcast.views}
                duration={formatTime(podcast.audioDuration)}
                index={index + 1}
                audioUrl={podcast.audioUrl!}
                author={podcast.author}
                podcastId={podcast._id}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Home;
