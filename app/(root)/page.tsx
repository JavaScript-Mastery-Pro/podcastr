import { fetchQuery } from "convex/nextjs";

import LatestPodcastCard from "@/components/LatestPodcastCard";
import Header from "@/components/shared/Header";
import PodcastCard from "@/components/shared/PodcastCard";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

const Home = async () => {
  const podcastData = await fetchQuery(api.podcasts.getAllPodcasts);
  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
          {podcastData.slice(0, 4).map((podcast) => (
            <PodcastCard
              key={podcast._id}
              imgUrl={podcast.imageUrl!}
              title={podcast.podcastTitle!}
              author={podcast.author}
              podcastId={podcast._id}
            />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-7">
        <Header titleClassName="text-xl" headerTitle="Latest Podcasts" />
        <div className="flex w-full flex-col">
          {podcastData.slice(0, 8).map((podcast, index) => (
            <div
              className={cn("py-2.5", {
                "border-b border-black-4": index !== podcastData.length - 1,
              })}
              key={index + 1}
            >
              <LatestPodcastCard
                imgUrl={podcast.imageUrl!}
                title={podcast.podcastTitle}
                listeners="1.2k"
                duration="0:30:00"
                index={index + 1}
                audioUrl={podcast.audioUrl!}
                author={podcast.author}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Home;
