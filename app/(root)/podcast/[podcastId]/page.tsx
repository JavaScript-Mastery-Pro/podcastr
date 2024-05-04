import { currentUser } from "@clerk/nextjs";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";

import EmptyState from "@/components/EmptyState";
import PodcastDetailPlayer from "@/components/PodcastDetailPlayer";
import PodcastCard from "@/components/shared/PodcastCard";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const Prompt = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-18 font-bold text-white-1">{title}</h1>
      <p className="text-16 font-medium text-white-2">{description}</p>
    </div>
  );
};

const page = async ({
  params,
}: {
  params: {
    podcastId: Id<"podcasts">;
  };
}) => {
  const user = await currentUser();
  const podcast = await fetchQuery(api.podcasts.getPodcastById, {
    podcastId: params.podcastId,
  });
  const similarPodcast = await fetchQuery(api.podcasts.getPodcastByVoiceType, {
    podcastId: params.podcastId,
  });
  const isOwner = user?.id === podcast?.authorId;
  return (
    <section className="flex w-full flex-col">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Currently Playing</h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="Headphone icon"
          />
          <h2 className="text-16 font-bold text-white-1">{podcast?.views}</h2>
        </figure>
      </header>
      <PodcastDetailPlayer
        audioUrl={podcast?.audioUrl!}
        imageUrl={podcast?.imageUrl!}
        author={podcast?.author!}
        podcastTitle={podcast?.podcastTitle!}
        imageStorageId={podcast?.imageStorageId!}
        podcastId={podcast?._id!}
        audioStorageId={podcast?.audioStorageId!}
        isOwner={isOwner}
      />
      <p className="text-16 pb-8 pt-[45px] font-medium text-white-2 max-md:text-center">
        {podcast?.podcastDescription}
      </p>

      <div className="flex flex-col gap-8">
        <Prompt title="Transcription" description={podcast?.voicePrompt!} />
        {podcast?.imagePrompt && (
          <Prompt
            title="Thumbnail Prompt"
            description={podcast?.imagePrompt!}
          />
        )}
      </div>
      <section className="mt-8 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Similar Podcasts</h1>
        {similarPodcast.length > 0 ? (
          <div className="podcast_grid">
            {similarPodcast.map((podcast) => (
              <PodcastCard
                key={podcast._id}
                imgUrl={podcast.imageUrl!}
                title={podcast.podcastTitle}
                author={podcast.author}
                podcastId={podcast._id}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Similar Podcasts"
            buttonLink="/discover"
            buttonText="Go to Discover"
          />
        )}
      </section>
    </section>
  );
};

export default page;
