"use client";

import { useState, useEffect, useCallback } from 'react';
import type { UserProfile } from '@/lib/types';

const PROFILE_KEY = 'userProfile';

const defaultProfilePicture = "https://picsum.photos/seed/user-avatar/40/40";

export function useUserProfile() {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(PROFILE_KEY);
      if (item) {
        const parsedProfile = JSON.parse(item);
        if (!parsedProfile.profilePictureUrl) {
          parsedProfile.profilePictureUrl = defaultProfilePicture;
        }
        setProfileState(parsedProfile);
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
         const profileToSave = {
          ...newProfile,
          profilePictureUrl: newProfile.profilePictureUrl || profile?.profilePictureUrl || defaultProfilePicture,
        };
        window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profileToSave));
        setProfileState(profileToSave);
      } else {
        window.localStorage.removeItem(PROFILE_KEY);
        setProfileState(null);
      }
    } catch (error) {
      console.error("Failed to save user profile to localStorage", error);
    }
  }, [profile]);

  return { profile, setProfile, loading };
}
