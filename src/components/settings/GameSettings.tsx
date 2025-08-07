"use client";

import React from 'react';
import SettingsItem from './SettingsItem';
import type { LayoutMode } from '@/app/page';
import type { Language, Translations } from '@/hooks/useTranslations';

const SegmentedControl = ({ options, value, onValueChange }: { options: {label: string, value: string}[], value: string, onValueChange: (value: any) => void }) => {
  return (
    <div className="flex items-center bg-zinc-900/50 border border-zinc-700 rounded-md p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onValueChange(option.value)}
          className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${
            value === option.value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-zinc-700/50'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};


interface GameSettingsProps {
  currentLayout: LayoutMode;
  onLayoutChange: (layout: LayoutMode) => void;
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  translations: Translations;
}

const GameSettings = ({ currentLayout, onLayoutChange, currentLanguage, onLanguageChange, translations }: GameSettingsProps) => {
  const { settings } = translations;
  const { game: gameTranslations } = settings;

  return (
    <div>
      <h2 className="text-2xl font-bold border-b-2 border-primary/30 pb-2 mb-6 text-white/90">
        {gameTranslations.title}
      </h2>
      <div className="flex flex-col gap-8">
        <SettingsItem
          title={gameTranslations.layoutMode.title}
          description={gameTranslations.layoutMode.description}
        >
            <SegmentedControl 
                options={[
                    { label: gameTranslations.layoutMode.responsive, value: 'responsive' },
                    { label: gameTranslations.layoutMode.fixed, value: 'fixed' }
                ]} 
                value={currentLayout} 
                onValueChange={onLayoutChange} 
            />
        </SettingsItem>
        <SettingsItem
          title={gameTranslations.language.title}
          description={gameTranslations.language.description}
        >
            <SegmentedControl 
                options={[
                    { label: gameTranslations.language.en, value: 'en-US' },
                    { label: gameTranslations.language.pt, value: 'pt-BR' }
                ]} 
                value={currentLanguage} 
                onValueChange={onLanguageChange} 
            />
        </SettingsItem>
      </div>
    </div>
  );
};

export default GameSettings;