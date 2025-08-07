
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { banners } from "@/lib/bannerData";
import type { Translations } from "@/hooks/useTranslations";

const EventBanner = ({ translations }: { translations: Translations | null }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const onSelect = (api: CarouselApi) => {
      if (api) {
        setCurrent(api.selectedScrollSnap());
      }
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!translations) return null;

  return (
    <motion.div
      className="absolute bottom-1/4 left-4 md:left-8 w-96 h-64"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
          }),
        ]}
        className="w-full h-full"
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-52 rounded-lg overflow-hidden border-2 border-primary/50">
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  data-ai-hint={banner.aiHint}
                  fill
                  className="object-cover"
                  quality={100}
                  unoptimized
                />
                <div className="absolute inset-0 flex flex-col justify-between p-3 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                  <div className="bg-amber-500/90 text-white font-bold py-1 px-3 self-start rounded-sm">
                    <h3 className="text-sm tracking-wider">{translations.banners[banner.tagKey]}</h3>
                  </div>
                  <div className="relative self-end p-1 z-10">
                    <div
                      className="absolute bottom-1 right-1 w-full h-full bg-primary/30"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 75%)",
                        backgroundImage:
                          "repeating-linear-gradient(-45deg, hsla(0,0%,100%,.1), hsla(0,0%,100%,.1) 1px, transparent 0, transparent 4px)",
                      }}
                    />
                    <h2
                      className="relative text-2xl font-black text-white tracking-wider px-2"
                      data-text={translations.banners[banner.titleKey]}
                    >
                      {translations.banners[banner.titleKey]}
                    </h2>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              current === index ? "w-4 bg-primary" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default EventBanner;
