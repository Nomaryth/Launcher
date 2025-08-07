
import { backgroundBannerSchema, notificationsSchema } from "./validation";

export const playerData = {
  name: "linwaru",
  tag: "4651",
  id: "40684462",
  level: 4,
  avatarUrl: "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/char_193_frostl.png",
  aiHint: "anime girl silver hair",
  xp: 20,
  xpNeeded: 100,
  characterTransform: {
    x: 0,
    y: 0,
    scale: 100,
  },
  backgroundBanner: {
    image: "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avg/backgrounds/21_G9_rhodes_xqoffice.png",
    alt: "Echo Chamber Banner",
    aiHint: "anime character splash art",
  },
  notifications: {
    resonance: {
      count: 1,
      hasNotification: false,
    },
    store: {
      count: 1,
      hasNotification: false,
    },
    task: {
      count: 1,
      hasNotification: false,
    },
  },
};

try {
  backgroundBannerSchema.parse(playerData.backgroundBanner);
  notificationsSchema.parse(playerData.notifications);
} catch (error) {
  if (process.env.NODE_ENV === 'development') {
    console.error("Invalid player data configuration:", error);
  }
}