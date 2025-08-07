"use client";

import { useEffect, useRef } from 'react';
import { getPerformance } from 'firebase/performance';
import type { PerformanceTrace } from '@firebase/performance-types';
import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from '@/lib/firebase/config';

let app: any;
let perf: any;
let initialized = false;

export const usePerformance = () => {
  const tracesRef = useRef<Map<string, PerformanceTrace>>(new Map());

  useEffect(() => {
    const initializePerformance = async () => {
      if (!initialized) {
        try {
          const config = await getFirebaseConfig();
          if (!app) {
            app = initializeApp(config);
            perf = getPerformance(app);
          }
          initialized = true;
        } catch (error) {
          console.error('Failed to initialize Firebase Performance:', error);
        }
      }
    };

    initializePerformance();
  }, []);

  const startTrace = (traceName: string, attributes?: Record<string, string>) => {
    if (!perf) return null;
    
    try {
      const trace = perf.trace(traceName);
      
      if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
          trace.putAttribute(key, value);
        });
      }
      
      trace.start();
      tracesRef.current.set(traceName, trace);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚀 Performance trace started: ${traceName}`);
      }
      
      return trace;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Failed to start trace ${traceName}:`, error);
      }
      return null;
    }
  };

  const stopTrace = (traceName: string) => {
    const trace = tracesRef.current.get(traceName);
    if (trace) {
      try {
        trace.stop();
        tracesRef.current.delete(traceName);
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`⏹️ Performance trace stopped: ${traceName}`);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`Failed to stop trace ${traceName}:`, error);
        }
      }
    }
  };

  const measureTime = async <T>(
    traceName: string, 
    fn: () => Promise<T> | T,
    attributes?: Record<string, string>
  ): Promise<T> => {
    const trace = startTrace(traceName, attributes);
    
    try {
      const result = await fn();
      return result;
    } finally {
      if (trace) {
        stopTrace(traceName);
      }
    }
  };

  const measurePageLoad = (pageName: string) => {
    if (!perf) return;
    
    const trace = perf.trace('page_load');
    trace.putAttribute('page_name', pageName);
    trace.start();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        trace.stop();
        if (process.env.NODE_ENV === 'development') {
          console.log(`📄 Page load measured: ${pageName}`);
        }
      });
    }
  };

  const measureImageLoad = (imageUrl: string, imageName: string) => {
    if (!perf) return;
    
    const trace = perf.trace('image_load');
    trace.putAttribute('image_url', imageUrl);
    trace.putAttribute('image_name', imageName);
    trace.start();
    
    const img = new Image();
    img.onload = () => {
      trace.stop();
      if (process.env.NODE_ENV === 'development') {
        console.log(`🖼️ Image load measured: ${imageName}`);
      }
    };
    img.onerror = () => {
      trace.stop();
      if (process.env.NODE_ENV === 'development') {
        console.error(`❌ Image load failed: ${imageName}`);
      }
    };
    img.src = imageUrl;
  };

  useEffect(() => {
    return () => {
      tracesRef.current.forEach((trace, name) => {
        try {
          trace.stop();
        } catch (error) {
        }
      });
      tracesRef.current.clear();
    };
  }, []);

  return {
    startTrace,
    stopTrace,
    measureTime,
    measurePageLoad,
    measureImageLoad,
    isEnabled: !!perf,
  };
};

export const PERFORMANCE_TRACES = {
  CHARACTER_LOADING: 'character_loading',
  AVATAR_ANIMATION: 'avatar_animation',
  PARTICLE_EFFECTS: 'particle_effects',
  PAGE_TRANSITION: 'page_transition',
  IMAGE_LOADING: 'image_loading',
  USER_PROFILE_LOAD: 'user_profile_load',
  SHOWCASE_UPDATE: 'showcase_update',
  BACKGROUND_BANNER_LOAD: 'background_banner_load',
} as const;