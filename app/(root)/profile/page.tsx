import { currentUser } from "@clerk/nextjs";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";

import PodcastCard from "@/components/shared/PodcastCard";
// import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

const page = async () => {
  const user = await currentUser();
  const podcastsData = await fetchQuery(api.podcasts.getPodcastByAuthorId, {
    authorId: user?.id!,
  });
  return (
    <section className="mt-9 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Podcaster Profile</h1>
      <div className="mt-6 flex flex-col gap-6 md:flex-row">
        <Image
          src={user?.imageUrl!}
          width={350}
          height={450}
          alt="Podcaster"
          className="h-[300px] w-full max-w-[350px] rounded-xl object-cover"
        />
        <div className="flex flex-col justify-center max-md:items-center">
          <div className="flex flex-col gap-2.5">
            <figure className="flex gap-2 max-md:justify-center">
              <Image
                src="/icons/verified.svg"
                width={9}
                height={9}
                alt="verified"
              />
              <h2 className="text-14 font-medium text-white-2">
                Podcaster Name
              </h2>
            </figure>
            <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
              {user?.firstName}
            </h1>
          </div>
          <figure className="mt-6 flex gap-3">
            <Image
              src="/icons/headphone.svg"
              width={24}
              height={24}
              alt="headphones"
            />
            <h2 className="text-16 font-semibold text-white-1">
              93,525{" "}
              <span className="font-normal text-white-2">
                monthly listeners
              </span>
            </h2>
          </figure>
          {/* <div className="mt-9">
            <Button className="text-16 bg-black-1 font-extrabold text-white-1">
              <Image src="/icons/edit.svg" width={16} height={16} alt="edit" />{" "}
              &nbsp; Edit Profile
            </Button>
          </div> */}
        </div>
      </div>
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
        {podcastsData.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
            {podcastsData.slice(0, 4).map((podcast) => (
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
          <div className="flex h-12 w-full items-center gap-2 rounded-lg bg-black-1 px-4">
            <h1 className="text-16 font-semibold text-white-1">
              You have not created any podcasts yet
            </h1>
            <Link href="/create-podcast" className="text-blue-500 underline">
              Create one now
            </Link>
          </div>
        )}
      </section>
    </section>
  );
};

export default page;
