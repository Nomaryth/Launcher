"use client";

import { useState, useEffect } from "react";
import { validateTranslations } from "@/lib/validation";
import { logInfo, logError, logWarn } from "@/lib/logger";

export type Language = "en-US" | "pt-BR";

export type Translations = {
  toasts: {
    notImplemented: {
      title: string;
      description: string;
    },
    insufficientPlans: {
      title: string;
      description: string;
    }
  },
  topLeftNav: {
    settings: string;
    email: string;
    patchNotes: string;
    layout: string;
  },
  player: {
    share: string;
  },
  mission: {
    operation: string;
    currentChapter: string;
    utopia: string;
  },
  rightMenu: {
    eligible: { main: string; sub: string; };
    exceptional: { main: string; sub: string; };
    teamUp: { main: string; sub: string; };
    resonance: { main: string; sub: string; };
    store: { main: string; sub: string; };
    task: { main: string; sub: string; };
    notActive: string;
    depot: { main: string; sub: string; };
  },
  footer: {
    friends: { main: string; sub: string; };
    schedule: { main: string; sub: string; };
    events: { main: string; sub: string; };
  },
  banners: {
    [key: string]: string;
  },
  settings: {
    title: string;
    reset: string;
    sidebar: {
      game: string;
      volume: string;
      notification: string;
      others: string;
      userCenter: string;
    },
    game: {
      title: string;
      layoutMode: {
        title: string;
        description: string;
        responsive: string;
        fixed: string;
      },
      language: {
        title: string;
        description: string;
        en: string;
        pt: string;
      }
    },
    underConstruction: {
      title: string;
      description: string;
    }
  }
};

export const useTranslations = (lang: Language) => {
  const [translations, setTranslations] = useState<Translations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        logInfo(`Loading translations for language: ${lang}`);
        
        const res = await fetch(`/locales/${lang}.json`);
        if (!res.ok) {
          throw new Error(`Failed to fetch translations for ${lang}`);
        }
        
        const rawData = await res.json();
        

        const validatedData = validateTranslations(rawData);
        setTranslations(validatedData);
        
        logInfo(`Successfully loaded translations for ${lang}`, { 
          language: lang, 
          timestamp: new Date().toISOString() 
        });
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        logError(`Translation fetch error for ${lang}`, error instanceof Error ? error : new Error(errorMessage), {
          language: lang,
          timestamp: new Date().toISOString()
        });
        
        setError(errorMessage);
        

        if (lang !== 'en-US') {
          logWarn(`Attempting fallback to en-US for ${lang}`);
          try {
            const fallbackRes = await fetch('/locales/en-US.json');
            if (fallbackRes.ok) {
              const fallbackData = await fallbackRes.json();
              const validatedFallback = validateTranslations(fallbackData);
              setTranslations(validatedFallback);
              logInfo('Fallback to en-US successful');
            }
          } catch (fallbackError) {
            logError('Fallback translation failed', fallbackError instanceof Error ? fallbackError : new Error('Fallback failed'), {
              originalLanguage: lang,
              fallbackLanguage: 'en-US'
            });
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslations();
  }, [lang]);

  return { translations, isLoading, error };
};
