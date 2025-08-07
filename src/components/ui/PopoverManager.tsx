"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from './popover';

interface PopoverState {
  [key: string]: boolean;
}

interface PopoverContextType {
  openPopover: (id: string) => void;
  closePopover: (id: string) => void;
  isOpen: (id: string) => boolean;
  closeAll: () => void;
}

const PopoverContext = createContext<PopoverContextType | null>(null);

export const usePopoverManager = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('usePopoverManager must be used within PopoverProvider');
  }
  return context;
};

interface PopoverProviderProps {
  children: React.ReactNode;
}

export const PopoverProvider: React.FC<PopoverProviderProps> = ({ children }) => {
  const [popoverStates, setPopoverStates] = useState<PopoverState>({});

  const openPopover = useCallback((id: string) => {
    setPopoverStates(prev => ({ ...prev, [id]: true }));
  }, []);

  const closePopover = useCallback((id: string) => {
    setPopoverStates(prev => ({ ...prev, [id]: false }));
  }, []);

  const isOpen = useCallback((id: string) => {
    return popoverStates[id] || false;
  }, [popoverStates]);

  const closeAll = useCallback(() => {
    setPopoverStates({});
  }, []);

  return (
    <PopoverContext.Provider value={{ openPopover, closePopover, isOpen, closeAll }}>
      {children}
    </PopoverContext.Provider>
  );
};

interface ManagedPopoverProps {
  id: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
}

export const ManagedPopover: React.FC<ManagedPopoverProps> = ({
  id,
  trigger,
  children,
  side = "bottom",
  align = "center",
  className
}) => {
  const { isOpen, openPopover, closePopover } = usePopoverManager();

  return (
    <Popover open={isOpen(id)} onOpenChange={(open) => {
      if (open) {
        openPopover(id);
      } else {
        closePopover(id);
      }
    }}>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent side={side} align={align} className={className}>
        {children}
      </PopoverContent>
    </Popover>
  );
}; 