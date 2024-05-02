import { currentUser } from "@clerk/nextjs";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";

import PodcastDetailPlayer from "@/components/PodcastDetailPlayer";
import PodcastCard from "@/components/shared/PodcastCard";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

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
  const podcastData = await fetchQuery(api.podcasts.getAllPodcasts);
  const isOwner = user?.id === podcast?.authorId;
  return (
    <section className="flex w-full flex-col gap-8 lg:gap-12">
      <header className="mt-9 flex justify-between">
        <h1 className="text-20 font-bold text-white-1">Currently Playing</h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="Headphone icon"
          />
          <h2 className="text-16 font-bold text-white-1">110,537</h2>
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
      <p className="text-16  font-medium text-white-2 max-md:text-center">
        {podcast?.podcastDescription}
      </p>
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Similar Podcasts</h1>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
          {podcastData.map((podcast) => (
            <PodcastCard
              key={podcast._id}
              imgUrl={podcast.imageUrl!}
              title={podcast.podcastTitle}
              author={podcast.author}
              podcastId={podcast._id}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default page;
