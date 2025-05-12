'use server';
/**
 * @fileOverview An AI agent that analyzes ShareBites' impact data.
 *
 * - analyzeImpact - A function that analyzes the impact data and provides insights.
 */

import {ai} from '@/ai/genkit';
import { 
  AnalyzeImpactInputSchema, 
  type AnalyzeImpactInput,
  AnalyzeImpactOutputSchema,
  type AnalyzeImpactOutput
} from '@/types/ai';


export async function analyzeImpact(input: AnalyzeImpactInput): Promise<AnalyzeImpactOutput> {
  return analyzeImpactFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeImpactPrompt',
  input: {schema: AnalyzeImpactInputSchema},
  output: {schema: AnalyzeImpactOutputSchema},
  prompt: `You are an AI assistant that analyzes the impact data of ShareBites, a non-profit organization that reduces food waste and provides meals to poor communities.

  Provide a summary of the overall impact of ShareBites, key insights derived from the data, and recommendations for ShareBites to improve its impact.

  Meals Distributed: {{{mealsDistributed}}}
  Money Raised: {{{moneyRaised}}}
  Number of Donors: {{{numberOfDonors}}}
  Monthly Trends: {{{monthlyTrends}}}

  Respond with the following format:
  Summary: <overall summary>
  Key Insights: [<insight 1>, <insight 2>, ...]
  Recommendations: <recommendations>
  `,
});

const analyzeImpactFlow = ai.defineFlow(
  {
    name: 'analyzeImpactFlow',
    inputSchema: AnalyzeImpactInputSchema,
    outputSchema: AnalyzeImpactOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
