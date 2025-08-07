
"use client";

import React from 'react';
import { Construction } from 'lucide-react';
import type { Translations } from '@/hooks/useTranslations';

const UnderConstruction = ({ translations }: { translations: Translations }) => {
  const { settings } = translations;
  const { underConstruction } = settings;

  return (
    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
      <Construction className="w-16 h-16 mb-4" />
      <h2 className="text-xl font-semibold">{underConstruction.title}</h2>
      <p className="mt-2 text-center">{underConstruction.description}</p>
    </div>
  );
};

export default UnderConstruction;
