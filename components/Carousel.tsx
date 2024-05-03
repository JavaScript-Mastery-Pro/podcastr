"use client";
import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback } from "react";

import { fansLikeDetail } from "@/constants";

import { DotButton, useDotButton } from "./DotButton";
const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
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
  return (
    <section
      className="flex w-full flex-col gap-4 overflow-hidden"
      ref={emblaRef}
    >
      <div className="flex">
        {fansLikeDetail.map((item) => (
          <figure
            key={item.id}
            className="relative flex h-[250px] w-full flex-none flex-col justify-end rounded-xl border-none"
          >
            <Image
              src={item.imgUrl}
              alt="card1"
              fill
              className="absolute size-full rounded-xl border-none object-contain"
            />
            <div className="glassmorphism-black relative z-10 flex flex-col rounded-b-xl p-4">
              <h2 className="text-14 font-semibold text-white-1">
                {item.title}
              </h2>
              <p className="text-12 font-normal text-white-2">{item.author}</p>
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
