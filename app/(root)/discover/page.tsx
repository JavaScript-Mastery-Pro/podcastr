"use client";

import { useQuery } from "convex/react";

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/Loader";
import PodcastCard from "@/components/PodcastCard";
import Searchbar from "@/components/Searchbar";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

const DiscoverPage = ({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) => {
  const search = searchParams.search || "";
  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, {
    search,
  });

  return (
    <section className="flex flex-col gap-9">
      <Searchbar />
      <div className="flex flex-col gap-9">
        <h1
          className={cn("text-20 font-bold text-white-1", {
            "text-white-2": search,
          })}
        >
          <h1 className="text-20 font-bold text-white-1">
            {!search ? "Discover Trending Podcasts" : `Search results for: `}
            {search && <span className="text-white-2">{search}</span>}
          </h1>
        </h1>
        {podcastsData ? (
          <>
            {podcastsData.length > 0 ? (
              <div className="podcast_grid">
                {podcastsData?.map((podcast) => (
                  <PodcastCard
                    key={podcast._id}
                    imgUrl={podcast.imageUrl!}
                    title={podcast.title!}
                    description={podcast.description}
                    podcastId={podcast._id}
                  />
                ))}
              </div>
            ) : (
              <EmptyState title="No results found" />
            )}
          </>
        ) : (
          <LoaderSpinner />
        )}
      </div>
    </section>
  );
};

export default DiscoverPage;
