import { fetchQuery } from "convex/nextjs";

import EmptyState from "@/components/EmptyState";
import PodcastCard from "@/components/shared/PodcastCard";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

const DiscoverPage = async ({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) => {
  const search = searchParams.search || "";
  console.log(search);
  const podcastsData = await fetchQuery(api.podcasts.getPodcastBySearch, {
    search,
  });
  console.log(podcastsData);
  return (
    <section className="mt-9">
      <div className="flex flex-col gap-9">
        <h1
          className={cn("text-20 font-bold text-white-1", {
            "text-white-2": search,
          })}
        >
          {!search ? "Discover Community Podcasts" : `Search results of `}{" "}
          {search && <span className="text-white-1">{search}</span>}
        </h1>
        {podcastsData.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
            {podcastsData?.map((podcast) => (
              <PodcastCard
                key={podcast._id}
                imgUrl={podcast.imageUrl!}
                title={podcast.podcastTitle!}
                author={podcast.author}
                podcastId={podcast._id}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="No results found" />
        )}
      </div>
    </section>
  );
};

export default DiscoverPage;
