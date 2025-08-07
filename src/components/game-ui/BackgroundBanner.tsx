"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { playerData } from "@/lib/playerData";
import { backgroundBannerSchema } from "@/lib/validation";

interface BackgroundBannerProps {
  onSave?: (banner: typeof playerData.backgroundBanner) => void;
}

const BackgroundBanner = ({ onSave }: BackgroundBannerProps) => {
  const handleSaveBanner = (newBanner: typeof playerData.backgroundBanner) => {
    try {

      const validatedBanner = backgroundBannerSchema.parse(newBanner);
      if (process.env.NODE_ENV === 'development') {
        console.log("Saving background banner:", validatedBanner);
      }
      playerData.backgroundBanner = validatedBanner;
      onSave?.(validatedBanner);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Invalid background banner:", error);
      }
    }
  };

  return (
    <div className="absolute inset-0 z-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full"
      >
        <Image
          src={playerData.backgroundBanner.image}
          alt={playerData.backgroundBanner.alt}
          data-ai-hint={playerData.backgroundBanner.aiHint}
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/50 to-background/10" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </motion.div>
    </div>
  );
};

export default BackgroundBanner; 