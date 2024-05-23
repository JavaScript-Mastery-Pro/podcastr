"use client";
import { EmblaCarouselType } from "embla-carousel";
import React, { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { UseDotButtonType } from "@/types";

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type DotButtonProps = {
  selected: boolean;
  onClick: () => void;
};

export const DotButton: React.FC<DotButtonProps> = ({ selected, onClick }) => {
  return (
    // eveything is similar to EmblaCarouselDotButton.tsx just modify the button as per your design.
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "size-2.5 bg-white-3 cursor-pointer transition-all duration-500 rounded-full",
        {
          "bg-white-1": selected,
        }
      )}
    />
  );
};
