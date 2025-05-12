'use server';

/**
 * @fileOverview This file defines a Genkit flow for calculating the impact of a monetary donation in terms of meals provided and families fed.
 *
 * - donationCalculator - A function that calculates the number of meals and families fed based on a donation amount.
 */

import {ai} from '@/ai/genkit';
import { 
  DonationCalculatorInputSchema, 
  type DonationCalculatorInput, 
  DonationCalculatorOutputSchema,
  type DonationCalculatorOutput
} from '@/types/ai';


export async function donationCalculator(input: DonationCalculatorInput): Promise<DonationCalculatorOutput> {
  return donationCalculatorFlow(input);
}

const donationCalculatorPrompt = ai.definePrompt({
  name: 'donationCalculatorPrompt',
  input: {schema: DonationCalculatorInputSchema},
  output: {schema: DonationCalculatorOutputSchema},
  prompt: `You are a donation impact calculator for ShareBites, a non-profit organization.

  Based on the donation amount provided, calculate the estimated number of meals provided and families fed.
  Also, create a short and motivating statement summarizing the impact of the donation.

  Donation Amount: {{{donationAmount}}}

  Assume that $1 can provide 2 meals and feed 0.5 families.
  Do not include any currency symbols in the output values.
`,
});

const donationCalculatorFlow = ai.defineFlow(
  {
    name: 'donationCalculatorFlow',
    inputSchema: DonationCalculatorInputSchema,
    outputSchema: DonationCalculatorOutputSchema,
  },
  async input => {
    const {output} = await donationCalculatorPrompt(input);
    return output!;
  }
);
