"use client";

import React from 'react';

interface SettingsItemProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsItem = ({ title, description, children }: SettingsItemProps) => {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-6">
      <div className="flex-1 pr-8">
        <h3 className="text-md font-semibold text-white">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );
};

export default SettingsItem;
