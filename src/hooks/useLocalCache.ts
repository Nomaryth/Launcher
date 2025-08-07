"use client";

import { useState, useEffect, useCallback } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheConfig {
  maxSize: number;
  defaultTTL: number;
}

export const useLocalCache = <T>(config: Partial<CacheConfig> = {}) => {
  const {
    maxSize = 50,
    defaultTTL = 24 * 60 * 60 * 1000,
  } = config;

  const [cache, setCache] = useState<Map<string, CacheItem<T>>>(new Map());

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nomary_cache');
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, CacheItem<T>>;
        const cacheMap = new Map<string, CacheItem<T>>(Object.entries(parsed) as [string, CacheItem<T>][]);
        
        const now = Date.now();
        const validItems = new Map<string, CacheItem<T>>();
        
        for (const [key, item] of cacheMap) {
          if (now - item.timestamp < item.ttl) {
            validItems.set(key, item);
          }
        }
        
        setCache(validItems);
      }
    } catch (error) {
      console.warn('Failed to load cache from localStorage:', error);
    }
  }, []);

  const saveToStorage = useCallback((newCache: Map<string, CacheItem<T>>) => {
    try {
      const cacheObj = Object.fromEntries(newCache);
      localStorage.setItem('nomary_cache', JSON.stringify(cacheObj));
    } catch (error) {
      console.warn('Failed to save cache to localStorage:', error);
    }
  }, []);

  const get = useCallback((key: string): T | null => {
    const item = cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      const newCache = new Map(cache);
      newCache.delete(key);
      setCache(newCache);
      saveToStorage(newCache);
      return null;
    }

    return item.data;
  }, [cache, saveToStorage]);

  const set = useCallback((key: string, data: T, ttl?: number) => {
    const newCache = new Map(cache);
    
    if (newCache.size >= maxSize) {
      const entries = Array.from(newCache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      
      const toRemove = Math.ceil(maxSize * 0.1);
      for (let i = 0; i < toRemove; i++) {
        newCache.delete(entries[i][0]);
      }
    }

    newCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || defaultTTL,
    });

    setCache(newCache);
    saveToStorage(newCache);
  }, [cache, maxSize, defaultTTL, saveToStorage]);

  const remove = useCallback((key: string) => {
    const newCache = new Map(cache);
    newCache.delete(key);
    setCache(newCache);
    saveToStorage(newCache);
  }, [cache, saveToStorage]);

  const clear = useCallback(() => {
    setCache(new Map());
    localStorage.removeItem('nomary_cache');
  }, []);

  const getStats = useCallback(() => {
    const now = Date.now();
    let validItems = 0;
    let expiredItems = 0;

    for (const item of cache.values()) {
      if (now - item.timestamp < item.ttl) {
        validItems++;
      } else {
        expiredItems++;
      }
    }

    return {
      total: cache.size,
      valid: validItems,
      expired: expiredItems,
      maxSize,
    };
  }, [cache, maxSize]);

  const cleanup = useCallback(() => {
    const now = Date.now();
    const newCache = new Map<string, CacheItem<T>>();
    
    for (const [key, item] of cache) {
      if (now - item.timestamp < item.ttl) {
        newCache.set(key, item);
      }
    }
    
    setCache(newCache);
    saveToStorage(newCache);
  }, [cache, saveToStorage]);

  useEffect(() => {
    const interval = setInterval(cleanup, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [cleanup]);

  return {
    get,
    set,
    remove,
    clear,
    getStats,
    cleanup,
    has: (key: string) => cache.has(key),
    size: cache.size,
  };
};

export const CACHE_KEYS = {
  USER_PROFILE: (userId: string) => `user_profile_${userId}`,
  SHOWCASE_DATA: (userId: string) => `showcase_${userId}`,
  GAME_DATA: (userId: string) => `game_data_${userId}`,
  PUBLIC_PROFILES: (profileId: string) => `public_profile_${profileId}`,
  AVATAR_IMAGES: (imageUrl: string) => `avatar_${btoa(imageUrl)}`,
  BACKGROUND_BANNERS: (bannerId: string) => `banner_${bannerId}`,
} as const; 