export interface UserProfileData {
  id: string;
  username: string;
  userId: string;
  status: string;
  birthday: string;
  solPhase: string;
  unionLevel: number;
  avatar: string;
  showcaseCharacters: ShowcaseCharacter[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ShowcaseCharacter {
  id: string;
  name: string;
  avatar: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UpdateUserProfileData {
  username?: string;
  status?: string;
  birthday?: string;
  solPhase?: string;
  unionLevel?: number;
  avatar?: string;
  showcaseCharacters?: ShowcaseCharacter[];
}

class UserService {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private readonly CACHE_TTL = 30 * 60 * 1000;
  private readonly MAX_CACHE_SIZE = 50;

  private firebaseConfig = {

  };

  private cleanupCache() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }

  private manageCacheSize() {
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      const entries = Array.from(this.cache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      
      const toRemove = Math.ceil(this.MAX_CACHE_SIZE * 0.2);
      for (let i = 0; i < toRemove; i++) {
        this.cache.delete(entries[i][0]);
      }
    }
  }

  async getUserProfile(userId: string): Promise<UserProfileData | null> {
    try {
      this.cleanupCache();
      
      const cacheKey = `user_profile_${userId}`;
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < cached.ttl) {
        console.log(`📦 Cache hit for user ${userId}`);
        return cached.data;
      }

      await new Promise(resolve => setTimeout(resolve, 300));
      
      const userData = {
        id: userId,
        username: "Kuviraa",
        userId: "40684462",
        status: "Screwllum E655 saver.",
        birthday: "5-13",
        solPhase: "SOL3 Phase: Rank 8",
        unionLevel: 80,
        avatar: "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/char_193_frostl.png",
        showcaseCharacters: [
          {
            id: "char_1",
            name: "Operator 1",
            avatar: "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/char_193_frostl.png",
            rarity: "epic" as const
          },
          {
            id: "char_2", 
            name: "Operator 2",
            avatar: "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/char_193_frostl.png",
            rarity: "rare" as const
          },
          {
            id: "char_3",
            name: "Operator 3", 
            avatar: "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/char_193_frostl.png",
            rarity: "legendary" as const
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.manageCacheSize();
      this.cache.set(cacheKey, {
        data: userData,
        timestamp: Date.now(),
        ttl: this.CACHE_TTL
      });

      console.log(`💾 Cached user profile for ${userId}`);
      return userData;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to fetch user profile');
    }
  }

  async updateUserProfile(userId: string, updates: UpdateUserProfileData): Promise<UserProfileData> {
    try {

      await new Promise(resolve => setTimeout(resolve, 500));
      
      const currentUser = await this.getUserProfile(userId);
      if (!currentUser) {
        throw new Error('User not found');
      }

      const updatedUser = {
        ...currentUser,
        ...updates,
        updatedAt: new Date()
      };

      return updatedUser;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Failed to update user profile');
    }
  }
  async createUserProfile(userData: Omit<UserProfileData, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserProfileData> {
    try {

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: UserProfileData = {
        id: `user_${Date.now()}`,
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      return newUser;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw new Error('Failed to create user profile');
    }
  }

  async deleteUserProfile(userId: string): Promise<void> {
    try {


      

      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error deleting user profile:', error);
      throw new Error('Failed to delete user profile');
    }
  }

  async getMultipleUserProfiles(userIds: string[]): Promise<UserProfileData[]> {
    try {

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const profiles: UserProfileData[] = [];
      for (const userId of userIds) {
        const profile = await this.getUserProfile(userId);
        if (profile) {
          profiles.push(profile);
        }
      }
      
      return profiles;
    } catch (error) {
      console.error('Error fetching multiple user profiles:', error);
      throw new Error('Failed to fetch multiple user profiles');
    }
  }

  async searchUsers(criteria: {
    username?: string;
    unionLevel?: number;
    solPhase?: string;
  }): Promise<UserProfileData[]> {
    try {

      await new Promise(resolve => setTimeout(resolve, 1000));
      

      const mockUsers: UserProfileData[] = [
        {
          id: "user_1",
          username: "Kuviraa",
          userId: "40684462",
          status: "Screwllum E655 saver.",
          birthday: "5-13",
          solPhase: "SOL3 Phase: Rank 8",
          unionLevel: 80,
          avatar: "https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/char_193_frostl.png",
          showcaseCharacters: [],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      return mockUsers.filter(user => {
        if (criteria.username && !user.username.toLowerCase().includes(criteria.username.toLowerCase())) {
          return false;
        }
        if (criteria.unionLevel && user.unionLevel < criteria.unionLevel) {
          return false;
        }
        if (criteria.solPhase && user.solPhase !== criteria.solPhase) {
          return false;
        }
        return true;
      });
    } catch (error) {
      console.error('Error searching users:', error);
      throw new Error('Failed to search users');
    }
  }
}

export const userService = new UserService(); 