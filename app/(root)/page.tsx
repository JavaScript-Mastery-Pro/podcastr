"use client";

import { useQuery } from "convex/react";

import Header from "@/components/Header";
import LoaderSpinner from "@/components/Loader";
import PodcastCard from "@/components/PodcastCard";
import { api } from "@/convex/_generated/api";

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
              title={podcast.title!}
              description={podcast.description}
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
