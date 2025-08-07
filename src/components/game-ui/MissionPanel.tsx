
"use client";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Translations } from "@/hooks/useTranslations";

const MissionPanel = ({ translations }: { translations: Translations | null }) => {
  if (!translations) return null;

  return (
    <motion.div
      className="w-[480px] h-[150px] relative"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="relative w-full h-full bg-black/70 backdrop-blur-sm rounded-md border border-white/20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-right"
          style={{
            backgroundImage:
              "url('https://raw.githubusercontent.com/Aceship/Arknight-Images/refs/heads/main/avg/backgrounds/21_G6_decisivebattlealley_n.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        
        <div className="relative z-10 p-4 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-baseline">
              <h2 className="text-4xl font-black text-white">{translations.mission.operation}</h2>
              <span className="text-4xl font-black text-white ml-2">6-10</span>
            </div>
            <div className="flex items-center mt-1">
              <div className="flex space-x-0.5">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-3 h-2 bg-primary -skew-x-[20deg]" />
                ))}
              </div>
              <p 
                className="text-xs font-bold text-white/80 ml-3 tracking-wider leading-none whitespace-pre-line"
                style={{ whiteSpace: 'pre-line' }}
              >
                {translations.mission.currentChapter}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 right-0 pl-12 pr-4 py-1 rounded-sm text-white font-bold tracking-widest bg-[linear-gradient(to_right,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_45%,rgba(0,0,0,0.75)_100%)]">
        {translations.mission.utopia}
        </div>



      </div>
      
      <div className="absolute -bottom-[-10px] -left-[12px] flex items-center">
          <div className="flex items-center bg-zinc-800/70 border border-white/30 h-11 w-[280px]">
              <div className="relative w-14 h-11 flex items-center justify-center">
                  <svg width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute">
                      <path d="M20 0L40 17.5L20 35L0 17.5L20 0Z" fill="white"/>
                  </svg>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg" className="relative">
                     <path d="M12.25,6.13,9.62,4.25,7,6.13v8.59l2.62,1.88,2.63-1.88ZM19,3,14,6.33v3.33l5,3.33,5-3.33V6.33Zm2,12.33,5-3.33,2,1.33-7,4.67-7-4.67,2-1.33Zm-14,0,5-3.33,2,1.33-7,4.67-7-4.67,2-1.33Z"/>
                  </svg>
              </div>
              <div className="flex-1 flex items-center justify-between px-4">
                  <span className="text-white font-mono text-lg">46/100</span>
                  <button className="text-white hover:text-primary transition-colors">
                      <Plus size={24} />
                  </button>
              </div>
          </div>
      </div>

    </motion.div>
  );
};

export default MissionPanel;
