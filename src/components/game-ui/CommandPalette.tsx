"use client"

import React from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { 
    Home,
    Settings,
    Users
} from 'lucide-react'

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  runCommand: (command: () => void) => void;
  openSettings: () => void;
  navigateToUserPage: () => void;
}

const CommandPalette = ({ isOpen, onClose, runCommand, openSettings, navigateToUserPage }: CommandPaletteProps) => {

  const commands = [
    {
        group: "Navigation",
        items: [
            {
                name: "Home",
                icon: <Home className="mr-2 h-4 w-4" />,
                action: () => console.log("Navigate to Home")
            },
            {
                name: "User Profile",
                icon: <Users className="mr-2 h-4 w-4" />,
                action: navigateToUserPage
            },
            {
                name: "Settings",
                icon: <Settings className="mr-2 h-4 w-4" />,
                action: openSettings
            }
        ]
    },
    {
        group: "Actions",
        items: [
            {
                name: "Team Up",
                icon: <Users className="mr-2 h-4 w-4" />,
                action: () => console.log("Team up action triggered")
            }
        ]
    }
  ]

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {commands.map((group) => (
          <CommandGroup key={group.group} heading={group.group}>
            {group.items.map((item) => (
              <CommandItem key={item.name} onSelect={() => runCommand(item.action)}>
                {item.icon}
                <span>{item.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
        <CommandSeparator />
      </CommandList>
    </CommandDialog>
  )
}

export default CommandPalette
