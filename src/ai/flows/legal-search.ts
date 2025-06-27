'use server';

/**
 * @fileOverview Provides legal insights based on user queries.
 *
 * - legalSearch - A function that handles the legal search process.
 * - LegalSearchInput - The input type for the legalSearch function.
 * - LegalSearchOutput - The return type for the legalSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LegalSearchInputSchema = z.object({
  query: z.string().describe('The legal question or topic to search for.'),
});
export type LegalSearchInput = z.infer<typeof LegalSearchInputSchema>;

const LegalSearchOutputSchema = z.object({
  insight: z.string().describe('A detailed legal insight or answer to the query, based on reliable sources.'),
});
export type LegalSearchOutput = z.infer<typeof LegalSearchOutputSchema>;

export async function legalSearch(input: LegalSearchInput): Promise<LegalSearchOutput> {
  return legalSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'legalSearchPrompt',
  input: {schema: LegalSearchInputSchema},
  output: {schema: LegalSearchOutputSchema},
  prompt: `You are an AI legal research assistant. Your task is to provide a comprehensive and clear answer to the user's legal query. Use your knowledge of the law to provide insights.

Query: {{{query}}}

Provide a detailed explanation and analysis. If possible, mention relevant statutes, case law, or legal principles.

At the end of your response, ALWAYS include the following disclaimer in bold:
**Disclaimer: This information is for educational purposes only and is not a substitute for professional legal advice. Consult with a qualified attorney for any legal matters.**`,
});

const legalSearchFlow = ai.defineFlow(
  {
    name: 'legalSearchFlow',
    inputSchema: LegalSearchInputSchema,
    outputSchema: LegalSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
