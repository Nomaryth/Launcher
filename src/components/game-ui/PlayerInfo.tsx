"use client";
import Image from "next/image";
import { Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { playerData } from "@/lib/playerData";
import type { Translations } from "@/hooks/useTranslations";
import { useRippleEffect } from "@/hooks/useRippleEffect";

const PlayerInfo = ({ 
  translations, 
  onAvatarClick 
}: { 
  translations: Translations | null;
  onAvatarClick?: () => void;
}) => {
  const xpPercentage = (playerData.xp / playerData.xpNeeded) * 100;
  const createRipple = useRippleEffect();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    createRipple(event);
    onAvatarClick?.();
  };

  if (!translations) return null;

  return (
    <motion.div
      className="relative w-[350px] h-[100px] 
        bg-zinc-900/40 backdrop-blur-md 
        rounded-lg p-3 pr-5 
        border border-zinc-700 
        shadow-lg 
        overflow-hidden 
        text-white font-tech tracking-wide"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-4 w-full">

        <div className="relative flex-shrink-0">
          <div
            className="avatar-energy-effect avatar-aura-effect avatar-ripple-effect relative w-[80px] h-[80px] rounded-full p-1 flex items-center justify-center cursor-pointer xp-ring-pulse avatar-energy-pulse"
            style={{
              background: `conic-gradient(hsl(var(--primary)) ${xpPercentage}%, hsl(var(--muted)) ${xpPercentage}%)`,
            }}
            onClick={handleAvatarClick}
          >
            <div className="absolute inset-[3px] bg-zinc-800 rounded-full" />
            <div className="avatar-light-reflection avatar-border-glow avatar-3d-rotate relative z-10">
              <Image
                src={playerData.avatarUrl}
                alt="Player Avatar"
                data-ai-hint={playerData.aiHint}
                width={72}
                height={72}
                className="rounded-full border-2 border-black/30 shadow-md"
                unoptimized
              />
            </div>
          </div>

          <div className="absolute -top-1 -left-1 w-8 h-8 rounded-full bg-yellow-400/90 flex items-center justify-center border-2 border-zinc-800 shadow-md z-20">
            <div className="flex flex-col items-center justify-center leading-none text-black font-bold">
              <span className="text-sm">{playerData.level}</span>
              <span className="text-[8px] -mt-0.5">LV</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center flex-grow">
          <h2 className="text-lg font-semibold leading-tight">
            {playerData.name}#{playerData.tag}
          </h2>
          <div className="mt-1">
            <p className="inline-block bg-zinc-800/70 text-xs font-mono px-2 py-1 rounded-md border border-zinc-700">
              ID {playerData.id}
            </p>
          </div>
        </div>

        <div className="ml-auto">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-white/50 hover:text-white transition-colors"
            title={translations.player.share}
          >
            <Share2 size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerInfo;