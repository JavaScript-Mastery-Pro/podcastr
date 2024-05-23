"use client";
import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { CarouselProps } from "@/types";

import { DotButton, useDotButton } from "./DotButton";

const Carousel = ({ fansLikeDetail }: CarouselProps) => {
  const router = useRouter();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;

    // everything is similar to code from EmblaCarousel.tsx . except we have satisfy the typescript error by adding the some additional types.
    if (!autoplay || !("stopOnInteraction" in autoplay.options)) return;
    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? (autoplay.reset as () => void)
        : (autoplay.stop as () => void);

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  const filteredFansLikeDetail =
    fansLikeDetail && fansLikeDetail?.filter((item) => item.totalPodcasts > 0);

  return (
    // modify the code as per your design
    // provide emblaref to the parent container
    <section
      className="flex w-full flex-col gap-4 overflow-hidden"
      ref={emblaRef}
    >
      <div className="flex">
        {filteredFansLikeDetail?.slice(0, 5).map((item) => (
          <figure
            key={item._id}
            className=" carousel_box"
            onClick={() => router.push(`/podcast/${item.podcast[0]?.pocastId}`)}
          >
            <Image
              src={item.imageUrl}
              alt="card1"
              fill
              className="absolute size-full rounded-xl border-none "
            />
            <div className="glassmorphism-black relative z-10 flex flex-col rounded-b-xl p-4">
              <h2 className="text-14 font-semibold text-white-1">
                {item.podcast[0]?.podcastTitle}
              </h2>
              <p className="text-12 font-normal text-white-2">{item.name}</p>
            </div>
          </figure>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            selected={index === selectedIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
