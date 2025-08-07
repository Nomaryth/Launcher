
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BackgroundBanner from "@/components/game-ui/BackgroundBanner";
import CharacterBanner from "@/components/game-ui/CharacterBanner";
import PlayerInfo from "@/components/game-ui/PlayerInfo";
import TopLeftNav from "@/components/game-ui/TopLeftNav";
import ResourceBar from "@/components/game-ui/ResourceBar";
import EventBanner from "@/components/game-ui/EventBanner";
import MissionPanel from "@/components/game-ui/MissionPanel";
import RightMenu from "@/components/game-ui/RightMenu";
import GameLogo from "@/components/game-ui/GameLogo";
import FooterNav from "@/components/game-ui/FooterNav";
import MusicPlayer from "@/components/game-ui/MusicPlayer";
import SettingsModal from "@/components/settings/SettingsModal";
import CommandPalette from "@/components/game-ui/CommandPalette";
import FloatingParticles from "@/components/effects/FloatingParticles";
import FloatingSmoke from "@/components/effects/FloatingSmoke";
import DotGrid from "@/components/effects/DotGrid";
import { useTranslations, type Language } from "@/hooks/useTranslations";
import { playerData } from "@/lib/playerData";
import { characterTransformSchema, backgroundBannerSchema } from "@/lib/validation";
import { usePerformance } from "@/hooks/usePerformance";
import { PERFORMANCE_TRACES } from "@/hooks/usePerformance";

export type LayoutMode = "responsive" | "fixed";

export type CharacterTransform = {
  x: number;
  y: number;
  scale: number;
};

export default function Home() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("responsive");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("pt-BR");
  const { translations, isLoading, error } = useTranslations(language);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [characterTransform, setCharacterTransform] = useState<CharacterTransform>(playerData.characterTransform);
  
  const { measurePageLoad, measureImageLoad, startTrace, stopTrace } = usePerformance();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsCommandPaletteOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    measurePageLoad('home');
  }, [measurePageLoad]);

  const runCommand = (command: () => void) => {
    setIsCommandPaletteOpen(false);
    command();
  }

  const navigateToUserPage = () => {
    window.location.href = '/user';
  }
  
  const handleSaveCharacterTransform = (newTransform: CharacterTransform) => {
    try {
      const validatedTransform = characterTransformSchema.parse(newTransform);
      if (process.env.NODE_ENV === 'development') {
        console.log("Saving character transform:", validatedTransform);
      }
      playerData.characterTransform = validatedTransform;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Invalid character transform:", error);
      }
    }
  }

  const handleSaveBackgroundBanner = (newBanner: typeof playerData.backgroundBanner) => {
    try {
      const validatedBanner = backgroundBannerSchema.parse(newBanner);
      if (process.env.NODE_ENV === 'development') {
        console.log("Saving background banner:", validatedBanner);
      }
      playerData.backgroundBanner = validatedBanner;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Invalid background banner:", error);
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Erro ao carregar
          </h1>
          <p className="text-muted-foreground mb-4">
            Não foi possível carregar as traduções. Tente recarregar a página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Recarregar
          </button>
        </div>
      </div>
    );
  }

  const mainContent = (
    <main className="relative h-screen bg-background">
      <BackgroundBanner onSave={handleSaveBackgroundBanner} />
      <FloatingParticles count={25} />
      <FloatingSmoke />
      <DotGrid />
      
      <div className="absolute inset-0 z-30">
        <CharacterBanner transform={characterTransform} />
      </div>
      
      <div className="absolute inset-0 z-40">
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20 flex flex-col gap-2">
          <PlayerInfo 
            translations={translations} 
            onAvatarClick={navigateToUserPage}
          />
          <TopLeftNav 
            onSettingsClick={() => setIsSettingsOpen(true)}
            translations={translations}
          />
        </div>
        <ResourceBar />
        <EventBanner translations={translations} />
        
        <div className="absolute top-24 right-4 md:right-8 flex flex-col items-end gap-2">
          <MissionPanel translations={translations} />
          <RightMenu translations={translations} />
          <GameLogo />
        </div>
        
        <FooterNav translations={translations} />
        <MusicPlayer 
          onCommandPaletteToggle={() => setIsCommandPaletteOpen(true)}
          characterTransform={characterTransform}
          onCharacterTransformChange={setCharacterTransform}
          onSave={handleSaveCharacterTransform}
        />
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        currentLayout={layoutMode}
        onLayoutChange={setLayoutMode}
        currentLanguage={language}
        onLanguageChange={setLanguage}
        translations={translations}
      />
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        runCommand={runCommand}
        openSettings={() => setIsSettingsOpen(true)}
        navigateToUserPage={navigateToUserPage}
      />
    </main>
  );

  return (
    <>
      {layoutMode === "fixed" ? (
        <div className="fixed-layout-container">
          {mainContent}
        </div>
      ) : mainContent}
    </>
  );
}
