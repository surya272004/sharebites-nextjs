import { z } from 'zod';
import type { MessageData } from 'genkit';

// For customer-support-chat-flow.ts
// Schemas are now defined in the flow file. Types are re-exported for client-side consumption.
export type { CustomerSupportChatInput, CustomerSupportChatOutput } from '@/ai/flows/customer-support-chat-flow';


// For donation-calculator.ts
export const DonationCalculatorInputSchema = z.object({
  donationAmount: z.number().describe('The amount of money donated.'),
});
export type DonationCalculatorInput = z.infer<typeof DonationCalculatorInputSchema>;

export const DonationCalculatorOutputSchema = z.object({
  mealsProvided: z.number().describe('The estimated number of meals provided by the donation.'),
  familiesFed: z.number().describe('The estimated number of families that can be fed by the donation.'),
  impactStatement: z.string().describe('A statement summarizing the impact of the donation.'),
});
export type DonationCalculatorOutput = z.infer<typeof DonationCalculatorOutputSchema>;


// For impact-analyzer.ts
export const AnalyzeImpactInputSchema = z.object({
  mealsDistributed: z
    .number()
    .describe('The total number of meals distributed by ShareBites.'),
  moneyRaised: z.number().describe('The total amount of money raised by ShareBites.'),
  numberOfDonors: z.number().describe('The total number of donors to ShareBites.'),
  monthlyTrends: z
    .string()
    .describe(
      'A summary of the monthly trends in donations and meal distribution, including any notable patterns or changes.'
    ),
});
export type AnalyzeImpactInput = z.infer<typeof AnalyzeImpactInputSchema>;

export const AnalyzeImpactOutputSchema = z.object({
  summary: z.string().describe('A summary of the overall impact of ShareBites.'),
  keyInsights: z.array(z.string()).describe('Key insights derived from the impact data.'),
  recommendations: z
    .string()
    .describe('Recommendations for ShareBites to improve its impact.'),
});
export type AnalyzeImpactOutput = z.infer<typeof AnalyzeImpactOutputSchema>;

// Re-export MessageData if needed by flows, though it's typically used internally by genkit
export type { MessageData };
