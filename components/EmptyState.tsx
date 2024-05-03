import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";

const EmptyState = ({ title, search }: { title: string; search?: boolean }) => {
  return (
    <section className="flex-center size-full flex-col gap-3">
      <Image
        src="/icons/emptyState.svg"
        width={250}
        height={250}
        alt="Empty State"
      />
      <div className="flex-center w-full max-w-[254px] flex-col gap-3">
        <h1 className="text-24 font-bold text-white-1">{title}</h1>
        {search ? (
          <p className="text-16 text-center font-medium text-white-2">
            Try adjusting your search to find what you are looking for
          </p>
        ) : (
          <Button className=" bg-orange-1 ">
            <Link href="/create-podcast" className="flex gap-1">
              <Image
                src="/icons/microphone.svg"
                width={20}
                height={20}
                alt="Microphone"
              />
              <h1 className="text-16 font-extrabold text-white-1">
                Create Podcast
              </h1>
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
};

export default EmptyState;
