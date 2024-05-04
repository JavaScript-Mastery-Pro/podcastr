import { SignedIn, currentUser } from "@clerk/nextjs";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { api } from "@/convex/_generated/api";

import Carousel from "./Carousel";
import Header from "./shared/Header";

const RightSidebar = async () => {
  const user = await currentUser();
  const topPodcasters = await fetchQuery(api.users.getTopUserByPodcastCount);
  return (
    <section className="custom-scrollbar right_sidebar">
      <SignedIn>
        <Link
          href={`/profile/${user?.id}`}
          className="flex items-center gap-4 pb-12"
        >
          <Image
            src={user?.imageUrl || "/icons/avatar.svg"}
            alt="user image"
            width={45}
            height={45}
            className="rounded-full"
          />
          <h1 className="text-16 truncate font-semibold text-white-1">
            {`${user?.firstName} `}
          </h1>
        </Link>
      </SignedIn>
      <section className="flex flex-col gap-4">
        <Header headerTitle="Fans Like You" />
        <Carousel fansLikeDetail={topPodcasters} />
      </section>
      <section className="flex flex-col gap-8 pt-12">
        <Header headerTitle="Top Podcasters" />
        <div className="flex flex-col gap-6">
          {topPodcasters.slice(0, 10).map((podcaster) => (
            <div key={podcaster._id} className="flex justify-between">
              <figure className="flex items-center gap-2">
                <Link href={`/podcaster/${podcaster.clerkId}`}>
                  <Image
                    src={podcaster.imageUrl}
                    alt="casters"
                    width={44}
                    height={44}
                    className="rounded-lg"
                  />
                </Link>
                <h2 className="text-14 font-semibold text-white-1">
                  {podcaster.name}
                </h2>
              </figure>
              <div className="flex items-center">
                <p className="text-12 font-normal text-white-1">
                  {podcaster.totalPodcasts}&nbsp; podcasts
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default RightSidebar;
