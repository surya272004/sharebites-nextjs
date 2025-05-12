'use server';
/**
 * @fileOverview Provides a customer support chat flow for ShareBites.
 *
 * - customerSupportChat - A function that handles a user's message and returns a bot response.
 * - CustomerSupportChatInput - The input type for the customerSupportChat function.
 * - CustomerSupportChatOutput - The output type for the customerSupportChat function.
 */

import {ai} from '@/ai/genkit';
import type {MessageData} from 'genkit';
import { z } from 'zod';

// Define Zod schemas locally
const HistoryItemSchema = z.object({
  role: z.enum(['user', 'model']),
  parts: z.array(z.object({ text: z.string() })),
});

const CustomerSupportChatInputSchema = z.object({
  userMessage: z.string().describe('The latest message from the user.'),
  history: z.array(HistoryItemSchema).describe('The conversation history up to this point.'),
});
export type CustomerSupportChatInput = z.infer<typeof CustomerSupportChatInputSchema>;

const CustomerSupportChatOutputSchema = z.object({
  botResponse: z.string().describe("The chatbot's response to the user."),
});
export type CustomerSupportChatOutput = z.infer<typeof CustomerSupportChatOutputSchema>;


const SHAREBITES_CONTEXT = `
You are ShareBot, a friendly, empathetic, and knowledgeable AI assistant for ShareBites.
ShareBites is a non-profit organization dedicated to "Fighting Hunger One Bite at a Time."
Our mission is to connect surplus food from sources like restaurants, supermarkets, and farms with generous donations to provide nutritious meals to those in need. We partner with local kitchens and shelters.
Our vision is a world free from hunger, where food is a fundamental right, not a privilege.
Our core values are Compassion, Collaboration, and Integrity.

Key Information:
- How to Donate Money: Visit our website at /donate. Every $1 donated can provide approximately 2 meals and help feed 0.5 families. Your donation's impact can be calculated on the site.
- How to Pledge Food: Visit /donate#food-pledge to offer surplus food. This includes canned goods, fresh produce, or cooked meals.
- Our Impact: Learn about our collective impact and see AI-enhanced analytics at /impact. We distribute thousands of meals and have many donors.
- About Us: More details about our story and partners can be found at /about.
- How ShareBites Works:
    1. Collect Surplus Food: We rescue food that would otherwise go to waste.
    2. Prepare & Distribute Meals: Volunteers and partner kitchens transform this food into wholesome meals.
    3. Empower Communities: We also focus on awareness and engagement programs.
- Contact & Support: For questions or support, use the contact form at /support or email us at support@sharebites.org.

Your role is to:
- Answer user questions based on the information provided above.
- Be polite, helpful, and concise.
- If a question is outside your knowledge, politely state that and suggest contacting support@sharebites.org or visiting the relevant page on our website.
- Do not make up information.
- Keep responses relatively short and easy to understand.
- You can use markdown for formatting links if appropriate, e.g., [Donate Page](/donate).
`;

export async function customerSupportChat(input: CustomerSupportChatInput): Promise<CustomerSupportChatOutput> {
  return customerSupportChatFlow(input);
}

const customerSupportChatFlow = ai.defineFlow(
  {
    name: 'customerSupportChatFlow',
    inputSchema: CustomerSupportChatInputSchema,
    outputSchema: CustomerSupportChatOutputSchema,
  },
  async (input) => {
    const currentHistory: MessageData[] = input.history.map(item => ({
      role: item.role,
      parts: item.parts.map(part => ({text: part.text})),
    }));

    const effectiveHistory: MessageData[] = [
      {role: 'user', parts: [{text: SHAREBITES_CONTEXT}]},
      {role: 'model', parts: [{text: 'Understood. I am ShareBot, your helpful assistant for ShareBites. How can I assist you today?'}]},
      ...currentHistory,
    ];

    const {text} = await ai.generate({
      prompt: input.userMessage,
      history: effectiveHistory,
      config: {
        temperature: 0.6,
        safetySettings: [
          {category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
          {category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
          {category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
          {category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE'},
        ],
      },
    });

    return {botResponse: text ? text : "I'm sorry, I couldn't generate a response. Please try again."};
  }
);
