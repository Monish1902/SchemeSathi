'use server';

/**
 * @fileOverview Recommends relevant government schemes based on user profile data.
 *
 * - recommendSchemesBasedOnProfile - A function that recommends schemes based on profile data.
 * - RecommendSchemesBasedOnProfileInput - The input type for the recommendSchemesBasedOnProfile function.
 * - RecommendSchemesBasedOnProfileOutput - The return type for the recommendSchemesBasedOnProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSchemesBasedOnProfileInputSchema = z.object({
  profileData: z.record(z.any()).describe('User profile data including personal details, eligibility criteria, and documents.'),
  schemesData: z.array(z.record(z.any())).describe('Array of government schemes with details on eligibility and benefits.'),
});
export type RecommendSchemesBasedOnProfileInput = z.infer<typeof RecommendSchemesBasedOnProfileInputSchema>;

const RecommendSchemesBasedOnProfileOutputSchema = z.array(z.object({
  schemeName: z.string().describe('Name of the recommended scheme.'),
  schemeId: z.string().describe('ID of the recommended scheme.'),
  matchPercentage: z.number().describe('The percentage of eligibility criteria matched.'),
  benefitAmount: z.number().describe('Benefit amount in rupees.'),
  shortDescription: z.string().describe('A short description of the scheme'),
})).describe('List of recommended schemes with match percentage and benefit amount.');
export type RecommendSchemesBasedOnProfileOutput = z.infer<typeof RecommendSchemesBasedOnProfileOutputSchema>;

export async function recommendSchemesBasedOnProfile(input: RecommendSchemesBasedOnProfileInput): Promise<RecommendSchemesBasedOnProfileOutput> {
  return recommendSchemesBasedOnProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendSchemesBasedOnProfilePrompt',
  input: {schema: RecommendSchemesBasedOnProfileInputSchema},
  output: {schema: RecommendSchemesBasedOnProfileOutputSchema},
  prompt: `You are an AI assistant that recommends government schemes to users based on their profile data.

Analyze the following user profile data and scheme data to recommend the most relevant schemes.
Consider maximum benefits to the user.

User Profile Data: {{{profileData}}}

Schemes Data: {{{schemesData}}}

Output a JSON array of recommended schemes, including schemeName, schemeId, matchPercentage, benefitAmount, and shortDescription.
`,
});

const recommendSchemesBasedOnProfileFlow = ai.defineFlow(
  {
    name: 'recommendSchemesBasedOnProfileFlow',
    inputSchema: RecommendSchemesBasedOnProfileInputSchema,
    outputSchema: RecommendSchemesBasedOnProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
