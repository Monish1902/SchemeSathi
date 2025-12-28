"use server";

import { recommendSchemesBasedOnProfile, type RecommendSchemesBasedOnProfileInput } from "@/ai/flows/recommend-schemes-based-on-profile";
import { schemes } from "@/lib/schemes";

export async function getRecommendedSchemes(profileData: RecommendSchemesBasedOnProfileInput['profileData']) {
  if (!profileData) {
    return { error: 'User profile is required.' };
  }

  try {
    const recommendations = await recommendSchemesBasedOnProfile({
      profileData,
      schemesData: schemes,
    });
    return { data: recommendations };
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return { error: 'Failed to get scheme recommendations.' };
  }
}
