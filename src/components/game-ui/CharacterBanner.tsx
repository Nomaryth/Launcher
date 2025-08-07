"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import type { CharacterTransform } from "@/app/page";

interface CharacterBannerProps {
  transform: CharacterTransform;
}

const CharacterBanner = ({ transform }: CharacterBannerProps) => {
  return (
    <div 
      className="absolute z-0 bottom-[-2vh] left-1/2 -translate-x-1/2 w-[90vw] h-[95vh] md:w-[55vw] md:h-[100vh] flex justify-center items-end pointer-events-none"
      style={{
        transform: `translateX(calc(-50% + ${transform.x}px)) translateY(${transform.y}px) scale(${transform.scale / 100})`,
        transition: 'transform 0.3s ease-out'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.1 }}
        whileHover={{ scale: 1.02, y: -10 }}
        className="relative w-full h-full"
      >
        <Image
          src="https://raw.githubusercontent.com/Aceship/Arknight-Images/refs/heads/main/characters/char_193_frostl_2b.png"
          alt="Main character"
          data-ai-hint="anime character cyberpunk"
          fill
          className="object-contain object-bottom"
          quality={100}
          priority
        />
      </motion.div>
    </div>
  );
};

export default CharacterBanner;
