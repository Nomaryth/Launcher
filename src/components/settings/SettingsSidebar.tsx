
"use client";

import React from 'react';
import { Gamepad2, Volume2, Bell, MoreHorizontal, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Translations } from '@/hooks/useTranslations';

type ActiveTab = 'game' | 'volume' | 'notification' | 'others' | 'user-center';

interface SettingsSidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  translations: Translations;
}

const SidebarButton = ({
  item,
  isActive,
  onClick,
}: {
  item: {id: string, label: string, icon: React.ElementType};
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center p-4 text-left transition-colors duration-200 border-l-4",
      isActive
        ? "bg-primary/20 border-primary text-white"
        : "border-transparent text-muted-foreground hover:bg-white/10"
    )}
  >
    <item.icon className="mr-4 h-5 w-5" />
    <span className="font-semibold">{item.label}</span>
  </button>
);

const SettingsSidebar = ({ activeTab, setActiveTab, translations }: SettingsSidebarProps) => {
  const { settings } = translations;
  const { sidebar: sidebarTranslations } = settings;

  const navItems = [
    { id: 'game', label: sidebarTranslations.game, icon: Gamepad2 },
    { id: 'volume', label: sidebarTranslations.volume, icon: Volume2 },
    { id: 'notification', label: sidebarTranslations.notification, icon: Bell },
    { id: 'others', label: sidebarTranslations.others, icon: MoreHorizontal },
    { id: 'user-center', label: sidebarTranslations.userCenter, icon: User },
  ];

  return (
    <aside className="w-64 bg-black/20 border-r border-white/10 flex flex-col shrink-0">
      <nav className="flex flex-col py-4">
        {navItems.map((item) => (
          <SidebarButton
            key={item.id}
            item={item}
            isActive={activeTab === item.id}
            onClick={() => setActiveTab(item.id as ActiveTab)}
          />
        ))}
      </nav>
    </aside>
  );
};

export default SettingsSidebar;
