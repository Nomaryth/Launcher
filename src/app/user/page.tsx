
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit3, Settings } from 'lucide-react';
import { playerData } from '@/lib/playerData';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useRippleEffect } from '@/hooks/useRippleEffect';
import { usePerformance } from '@/hooks/usePerformance';
import { PERFORMANCE_TRACES } from '@/hooks/usePerformance';

const userExtraData = {
  status: "Screwllum E655 saver.",
  birthday: "5-13",
  solPhase: "SOL3 Phase: Rank 8",
  showcaseCharacters: [
    {
      id: "char_1",
      name: "Operator 1",
      avatar: "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/char_193_frostl.png",
      rarity: "epic" as const
    },
    {
      id: "char_2", 
      name: "Operator 2",
      avatar: "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/char_193_frostl.png",
      rarity: "rare" as const
    },
    {
      id: "char_3",
      name: "Operator 3",
      avatar: "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/char_193_frostl.png",
      rarity: "legendary" as const
    }
  ]
};

export default function UserPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const xpPercentage = (playerData.xp / playerData.xpNeeded) * 100;
  const createRipple = useRippleEffect();
  
  const { measurePageLoad, measureImageLoad, startTrace, stopTrace } = usePerformance();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    createRipple(event);
    startTrace(PERFORMANCE_TRACES.AVATAR_ANIMATION, {
      action: 'avatar_click',
      user_id: playerData.id
    });
    console.log('Avatar clicked!');
  };

  useEffect(() => {
    measurePageLoad('user_profile');
  }, [measurePageLoad]);

  const handleUpdateProfile = async (updates: any) => {
    setIsUpdating(true);
    const trace = startTrace(PERFORMANCE_TRACES.SHOWCASE_UPDATE, {
      action: 'profile_update',
      user_id: playerData.id
    });
    
    console.log("Updating profile with:", updates);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (trace) stopTrace(PERFORMANCE_TRACES.SHOWCASE_UPDATE);
    setIsUpdating(false);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <motion.button 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-md border border-white/10"
            >
              <ArrowLeft size={20} />
              <span>Voltar</span>
            </motion.button>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-2"
            >
              <button className="p-2 bg-black/30 backdrop-blur-sm rounded-md border border-white/10 hover:bg-accent/20 transition-colors">
                <Settings size={20} />
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={playerData.backgroundBanner.image}
            alt="Background"
            fill
            className="object-cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 backdrop-blur-md bg-background/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-1"
            >
              <div className="bg-card/70 backdrop-blur-lg rounded-lg border border-border/50 p-6 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">R</span>
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Resonator Showcase</h2>
                </div>

                                 <div className="text-center mb-6">
                   <div className="relative w-28 h-28 mx-auto mb-4">
                      <div
                         className="avatar-energy-effect avatar-aura-effect avatar-ripple-effect relative w-[112px] h-[112px] rounded-full p-1.5 flex items-center justify-center cursor-pointer xp-ring-pulse avatar-energy-pulse"
                         style={{
                           background: `conic-gradient(hsl(var(--primary)) ${xpPercentage}%, hsl(var(--muted)) ${xpPercentage}%)`,
                         }}
                                                   onClick={handleAvatarClick}
                        >
                          <div className="absolute inset-[4px] bg-zinc-800 rounded-full" />
                          <div className="avatar-light-reflection avatar-border-glow avatar-3d-rotate relative z-10">
                            <Image
                              src={playerData.avatarUrl}
                              alt="Player Avatar"
                              width={100}
                              height={100}
                              className="rounded-full border-2 border-black/30 shadow-md"
                              unoptimized
                            />
                          </div>
                       </div>

                      <div className="absolute -top-1 -left-1 w-10 h-10 rounded-full bg-yellow-400/90 flex items-center justify-center border-2 border-zinc-800 shadow-md z-20">
                        <div className="flex flex-col items-center justify-center leading-none text-black font-bold">
                          <span className="text-lg">{playerData.level}</span>
                          <span className="text-[10px] -mt-1">LV</span>
                        </div>
                      </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{playerData.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono">#{playerData.id}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="bg-muted/50 rounded-md p-3 text-center">
                    <p className="text-sm text-foreground font-medium">{userExtraData.status}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Birthday:</span>
                      <span className="font-medium text-foreground">{userExtraData.birthday}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">SOL3 Phase:</span>
                      <span className="font-medium text-foreground">{userExtraData.solPhase}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Union Level:</span>
                      <span className="font-medium text-foreground">{playerData.level}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <h4 className="text-sm font-medium text-foreground mb-3">Showcase Characters</h4>
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {userExtraData.showcaseCharacters.map((character) => (
                      <div key={character.id} className="relative group aspect-square">
                        <div className="relative w-full h-full rounded-md overflow-hidden border border-border/50 transition-transform duration-300 group-hover:scale-105">
                          <Image
                            src={character.avatar}
                            alt={character.name}
                            fill
                            className="object-cover"
                          />
                           <div
                              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80`}
                            />
                            <div
                              className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t 
                                ${
                                  character.rarity === 'legendary' ? 'from-yellow-400/20' :
                                  character.rarity === 'epic' ? 'from-purple-400/20' :
                                  character.rarity === 'rare' ? 'from-blue-400/20' : 'from-gray-400/20'
                                } to-transparent`}
                            />
                        </div>
                        <p className="absolute bottom-1 left-0 right-0 text-xs text-center text-white font-semibold drop-shadow-md">
                          {character.name}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    disabled={isUpdating}
                    className="w-full bg-primary/90 text-primary-foreground py-2.5 px-4 rounded-md hover:bg-primary transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? (
                      <>
                        <LoadingSpinner size="sm" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Edit3 size={16} />
                        Edit Showcase
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-2 relative h-[75vh] flex items-end justify-center"
            >
              <Image
                src="https://raw.githubusercontent.com/Aceship/Arknight-Images/refs/heads/main/characters/char_193_frostl_2b.png"
                alt="Main Character"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                quality={100}
                priority
              />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}