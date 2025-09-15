// Summarize Health Reports
'use server';
/**
 * @fileOverview Summarizes a batch of community health reports, highlighting key trends and potential concerns.
 *
 * - summarizeHealthReports - A function that summarizes health reports.
 * - SummarizeHealthReportsInput - The input type for the summarizeHealthReports function.
 * - SummarizeHealthReportsOutput - The return type for the summarizeHealthReports function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeHealthReportsInputSchema = z.object({
  healthReports: z
    .string()
    .describe(
      'A batch of community health reports as a single string. Each report should be separated by a delimiter (e.g., \n\n).'
    ),
});
export type SummarizeHealthReportsInput = z.infer<
  typeof SummarizeHealthReportsInputSchema
>;

const SummarizeHealthReportsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A summarized analysis of the health reports, highlighting key trends and potential concerns.'
    ),
});
export type SummarizeHealthReportsOutput = z.infer<
  typeof SummarizeHealthReportsOutputSchema
>;

export async function summarizeHealthReports(
  input: SummarizeHealthReportsInput
): Promise<SummarizeHealthReportsOutput> {
  return summarizeHealthReportsFlow(input);
}

const summarizeHealthReportsPrompt = ai.definePrompt({
  name: 'summarizeHealthReportsPrompt',
  input: {schema: SummarizeHealthReportsInputSchema},
  output: {schema: SummarizeHealthReportsOutputSchema},
  prompt: `You are a health expert tasked with summarizing community health reports to identify key trends and potential concerns.

  Analyze the following health reports and provide a concise summary of the overall health situation, including any potential outbreaks or concerning patterns.

  Health Reports:
  {{healthReports}}`,
});

const summarizeHealthReportsFlow = ai.defineFlow(
  {
    name: 'summarizeHealthReportsFlow',
    inputSchema: SummarizeHealthReportsInputSchema,
    outputSchema: SummarizeHealthReportsOutputSchema,
  },
  async input => {
    const {output} = await summarizeHealthReportsPrompt(input);
    return output!;
  }
);
