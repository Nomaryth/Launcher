
"use client";

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import GameSettings from '@/components/settings/GameSettings';
import UnderConstruction from '@/components/settings/UnderConstruction';
import { Button } from '@/components/ui/button';
import type { LayoutMode } from '@/app/page';
import type { Language, Translations } from '@/hooks/useTranslations';

type ActiveTab = 'game' | 'volume' | 'notification' | 'others' | 'user-center';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLayout: LayoutMode;
  onLayoutChange: (layout: LayoutMode) => void;
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  translations: Translations | null;
}

const SettingsModal = ({ 
  isOpen, 
  onClose, 
  currentLayout, 
  onLayoutChange, 
  currentLanguage, 
  onLanguageChange,
  translations 
}: SettingsModalProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('game');

  if (!isOpen || !translations) {
    return null;
  }
  
  const { settings } = translations;

  const renderContent = () => {
    switch (activeTab) {
      case 'game':
        return <GameSettings 
                  currentLayout={currentLayout} 
                  onLayoutChange={onLayoutChange} 
                  currentLanguage={currentLanguage}
                  onLanguageChange={onLanguageChange}
                  translations={translations}
                />;
      default:
        return <UnderConstruction translations={translations} />;
    }
  };


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50 text-white font-headline">
      <div className="w-full h-full flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-white/10 bg-black/30 shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-10 w-10 bg-white/10 hover:bg-white/20" onClick={onClose}>
              <ArrowLeft />
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{settings.title}</h1>
            </div>
          </div>
          <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
            {settings.reset}
          </Button>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} translations={translations} />
          <main className="flex-1 overflow-y-auto p-8 bg-black/30">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
