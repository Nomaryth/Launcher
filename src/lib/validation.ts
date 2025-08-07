import { z } from 'zod';

export const translationSchema = z.object({
  toasts: z.object({
    notImplemented: z.object({
      title: z.string(),
      description: z.string(),
    }),
    insufficientPlans: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
  topLeftNav: z.object({
    settings: z.string(),
    email: z.string(),
    patchNotes: z.string(),
    layout: z.string(),
  }),
  player: z.object({
    share: z.string(),
  }),
  mission: z.object({
    operation: z.string(),
    currentChapter: z.string(),
    utopia: z.string(),
  }),
  rightMenu: z.object({
    eligible: z.object({
      main: z.string(),
      sub: z.string(),
    }),
    exceptional: z.object({
      main: z.string(),
      sub: z.string(),
    }),
    teamUp: z.object({
      main: z.string(),
      sub: z.string(),
    }),
    resonance: z.object({
      main: z.string(),
      sub: z.string(),
    }),
    store: z.object({
      main: z.string(),
      sub: z.string(),
    }),
    task: z.object({
      main: z.string(),
      sub: z.string(),
    }),
    notActive: z.string(),
    depot: z.object({
      main: z.string(),
      sub: z.string(),
    }),
  }),
  footer: z.object({
    friends: z.object({
      main: z.string(),
      sub: z.string(),
    }),
    schedule: z.object({
      main: z.string(),
      sub: z.string(),
    }),
    events: z.object({
      main: z.string(),
      sub: z.string(),
    }),
  }),
  banners: z.record(z.string()),
  settings: z.object({
    title: z.string(),
    reset: z.string(),
    sidebar: z.object({
      game: z.string(),
      volume: z.string(),
      notification: z.string(),
      others: z.string(),
      userCenter: z.string(),
    }),
    game: z.object({
      title: z.string(),
      layoutMode: z.object({
        title: z.string(),
        description: z.string(),
        responsive: z.string(),
        fixed: z.string(),
      }),
      language: z.object({
        title: z.string(),
        description: z.string(),
        en: z.string(),
        pt: z.string(),
      }),
    }),
    underConstruction: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

export const playerDataSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  level: z.number().min(1),
  experience: z.number().min(0),
  rank: z.string(),
  joinDate: z.string(),
  lastLogin: z.string(),
  preferences: z.object({
    language: z.string(),
    theme: z.enum(['light', 'dark', 'auto']),
    notifications: z.boolean(),
    privacy: z.object({
      profilePublic: z.boolean(),
      showOnlineStatus: z.boolean(),
      allowMessages: z.boolean(),
    }),
  }),
  stats: z.object({
    gamesPlayed: z.number().min(0),
    gamesWon: z.number().min(0),
    totalPlayTime: z.number().min(0),
    achievements: z.number().min(0),
    rank: z.string(),
    winRate: z.number().min(0).max(100),
  }),
  inventory: z.object({
    items: z.array(z.object({
      id: z.string(),
      name: z.string(),
      type: z.enum(['weapon', 'armor', 'consumable', 'cosmetic']),
      rarity: z.enum(['common', 'rare', 'epic', 'legendary']),
      quantity: z.number().min(1),
      equipped: z.boolean(),
    })),
    currency: z.object({
      gold: z.number().min(0),
      gems: z.number().min(0),
      premium: z.number().min(0),
    }),
  }),
  characterTransform: z.object({
    x: z.number(),
    y: z.number(),
    scale: z.number().min(0).max(200),
  }).optional(),
});

export const characterTransformSchema = z.object({
  x: z.number(),
  y: z.number(),
  scale: z.number().min(0).max(200),
});

export const backgroundBannerSchema = z.object({
  image: z.string().url(),
  alt: z.string(),
  aiHint: z.string(),
});

export const notificationSchema = z.object({
  count: z.number().min(0),
  hasNotification: z.boolean(),
});

export const notificationsSchema = z.object({
  resonance: notificationSchema,
  store: notificationSchema,
  task: notificationSchema,
});

export function validateWithFallback<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  fallback: T
): T {
  try {
    return schema.parse(data);
  } catch (error) {

    if (process.env.NODE_ENV === 'development') {
      console.error('Validation error:', error);
    }
    return fallback;
  }
}

export function validateTranslations(data: unknown) {
  return validateWithFallback(translationSchema, data, {
    toasts: {
      notImplemented: { title: 'Not Implemented', description: 'This feature is not available yet.' },
      insufficientPlans: { title: 'Insufficient Plans', description: 'You need more plans to proceed.' },
    },
    topLeftNav: {
      settings: 'Settings',
      email: 'Email',
      patchNotes: 'Patch Notes',
      layout: 'Layout',
    },
    player: { share: 'Share' },
    mission: {
      operation: 'Operation',
      currentChapter: 'Current Chapter',
      utopia: 'Utopia',
    },
    rightMenu: {
      eligible: { main: 'Eligible', sub: 'Sub' },
      exceptional: { main: 'Exceptional', sub: 'Sub' },
      teamUp: { main: 'Team Up', sub: 'Sub' },
      resonance: { main: 'Resonance', sub: 'Sub' },
      store: { main: 'Store', sub: 'Sub' },
      task: { main: 'Task', sub: 'Sub' },
      notActive: 'Not Active',
      depot: { main: 'Depot', sub: 'Sub' },
    },
    footer: {
      friends: { main: 'Friends', sub: 'Sub' },
      schedule: { main: 'Schedule', sub: 'Sub' },
      events: { main: 'Events', sub: 'Sub' },
    },
    banners: {},
    settings: {
      title: 'Settings',
      reset: 'Reset',
      sidebar: {
        game: 'Game',
        volume: 'Volume',
        notification: 'Notification',
        others: 'Others',
        userCenter: 'User Center',
      },
      game: {
        title: 'Game',
        layoutMode: {
          title: 'Layout Mode',
          description: 'Choose your layout preference',
          responsive: 'Responsive',
          fixed: 'Fixed',
        },
        language: {
          title: 'Language',
          description: 'Choose your language',
          en: 'English',
          pt: 'Portuguese',
        },
      },
      underConstruction: {
        title: 'Under Construction',
        description: 'This feature is being developed.',
      },
    },
  });
} 