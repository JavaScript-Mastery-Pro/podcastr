"use client";

import { useQuery } from "convex/react";

import Header from "@/components/Header";
import LatestPodcastCard from "@/components/LatestPodcastCard";
import LoaderSpinner from "@/components/Loader";
import PodcastCard from "@/components/PodcastCard";
import { api } from "@/convex/_generated/api";
import { formatTime } from "@/lib/formatTime";
import { cn } from "@/lib/utils";

const Home = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);
  const latestPodcasts = useQuery(api.podcasts.getAllPodcasts);

  if (!trendingPodcasts || !latestPodcasts) return <LoaderSpinner />;

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
      <Header />
    </div>
  );
};
export default Home;
