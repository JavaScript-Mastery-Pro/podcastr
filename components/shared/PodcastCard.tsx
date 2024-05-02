import Image from "next/image";
import Link from "next/link";

interface PodcastCardProps {
  imgUrl: string;
  title: string;
  author: string;
  podcastId: string;
}

const PodcastCard = ({
  imgUrl,
  title,
  author,
  podcastId,
}: PodcastCardProps) => {
  return (
    <Link href={`/podcast/${podcastId}`}>
      <figure className="flex flex-col gap-2">
        <Image
          src={imgUrl}
          width={200}
          height={150}
          alt="pod"
          className="size-full h-[174px] max-w-[250px] rounded-xl object-cover"
        />
        <div className="flex flex-col">
          <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
          <h2 className="text-12 font-normal capitalize text-white-4">
            {author}
          </h2>
        </div>
      </figure>
    </Link>
  );
};

export default PodcastCard;
