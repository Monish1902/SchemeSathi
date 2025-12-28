"use client";

import { useState, useEffect, useCallback } from 'react';
import type { UserProfile } from '@/lib/types';

const PROFILE_KEY = 'userProfile';

export function useUserProfile() {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(PROFILE_KEY);
      if (item) {
        setProfileState(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to read user profile from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const setProfile = useCallback((newProfile: UserProfile | null) => {
    try {
      if (newProfile) {
        window.localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
      } else {
        window.localStorage.removeItem(PROFILE_KEY);
      }
      setProfileState(newProfile);
    } catch (error) {
      console.error("Failed to save user profile to localStorage", error);
    }
  }, []);

  return { profile, setProfile, loading };
}
