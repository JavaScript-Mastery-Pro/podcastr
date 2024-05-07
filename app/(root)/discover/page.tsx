"use client";

import { useQuery } from "convex/react";
import { useSearchParams } from "next/navigation";

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/Loader";
import Searchbar from "@/components/Searchbar";
import PodcastCard from "@/components/shared/PodcastCard";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

const DiscoverPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
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
          {!search ? "Discover Community Podcasts" : `Search results for : `}
          &nbsp;
          {search && <span className="text-white-1">{search}</span>}
        </h1>
        {podcastsData ? (
          <>
            {podcastsData.length > 0 ? (
              <div className="podcast_grid">
                {podcastsData?.map((podcast) => (
                  <PodcastCard
                    key={podcast._id}
                    imgUrl={podcast.imageUrl!}
                    title={podcast.podcastTitle!}
                    description={podcast.podcastDescription}
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
