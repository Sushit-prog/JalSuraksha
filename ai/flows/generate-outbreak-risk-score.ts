// src/ai/flows/generate-outbreak-risk-score.ts
'use server';

/**
 * @fileOverview Generates an outbreak risk score for different regions based on health reports,
 * water quality, and seasonal trends.
 *
 * - generateOutbreakRiskScore - A function that generates the outbreak risk score.
 * - GenerateOutbreakRiskScoreInput - The input type for the generateOutbreakRiskScore function.
 * - GenerateOutbreakRiskScoreOutput - The return type for the generateOutbreakRiskScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOutbreakRiskScoreInputSchema = z.object({
  communityHealthReports: z
    .string()
    .describe('Community health reports including symptoms and affected individuals.'),
  waterQualityData: z.string().describe('Water quality data including pH, turbidity, and bacterial presence.'),
  seasonalTrends: z.string().describe('Seasonal trends like monsoon season, temperature, and rainfall.'),
  region: z.string().describe('The region for which to generate the risk score.'),
});
export type GenerateOutbreakRiskScoreInput = z.infer<
  typeof GenerateOutbreakRiskScoreInputSchema
>;

const GenerateOutbreakRiskScoreOutputSchema = z.object({
  riskScore: z.number().describe('The risk score for the region (0-100).'),
  rationale: z
    .string()
    .describe('The rationale behind the risk score based on the input data.'),
  suggestedActions: z
    .string()
    .describe('Suggested actions for health officials based on the risk score.'),
});
export type GenerateOutbreakRiskScoreOutput = z.infer<
  typeof GenerateOutbreakRiskScoreOutputSchema
>;

export async function generateOutbreakRiskScore(
  input: GenerateOutbreakRiskScoreInput
): Promise<GenerateOutbreakRiskScoreOutput> {
  return generateOutbreakRiskScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateOutbreakRiskScorePrompt',
  input: {schema: GenerateOutbreakRiskScoreInputSchema},
  output: {schema: GenerateOutbreakRiskScoreOutputSchema},
  prompt: `You are an AI assistant helping health officials predict potential outbreaks of water-borne diseases in rural Northeast India.

  Analyze the provided data to generate a risk score (0-100) for the given region.
  Provide a rationale for the score and suggest actions for health officials.

  Region: {{{region}}}
  Community Health Reports: {{{communityHealthReports}}}
  Water Quality Data: {{{waterQualityData}}}
  Seasonal Trends: {{{seasonalTrends}}}

  Respond in a JSON format.
  `,
});

const generateOutbreakRiskScoreFlow = ai.defineFlow(
  {
    name: 'generateOutbreakRiskScoreFlow',
    inputSchema: GenerateOutbreakRiskScoreInputSchema,
    outputSchema: GenerateOutbreakRiskScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
