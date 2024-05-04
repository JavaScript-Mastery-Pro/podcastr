import { fetchQuery } from "convex/nextjs";

import EmptyState from "@/components/EmptyState";
import ProfileCard from "@/components/ProfileCard";
import PodcastCard from "@/components/shared/PodcastCard";
import { api } from "@/convex/_generated/api";

const page = async ({
  params,
}: {
  params: {
    profileId: string;
  };
}) => {
  const user = await fetchQuery(api.users.getUserById, {
    clerkId: params.profileId,
  });
  const podcastsData = await fetchQuery(api.podcasts.getPodcastByAuthorId, {
    authorId: params.profileId,
  });

  return (
    <section className="mt-9 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Podcaster Profile</h1>
      <ProfileCard
        podcastData={podcastsData}
        imageUrl={user.imageUrl}
        userFirstName={user.name}
      />
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
        {podcastsData.podcasts.length > 0 ? (
          <div className="podcast_grid">
            {podcastsData.podcasts.slice(0, 4).map((podcast) => (
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
          <EmptyState
            title="You have not created any podcasts yet"
            buttonLink="/create-podcast"
          />
        )}
      </section>
    </section>
  );
};

export default page;
