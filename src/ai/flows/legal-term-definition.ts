'use server';

/**
 * @fileOverview Defines a Genkit flow for generating definitions of legal terms.
 *
 * - legalTermDefinition - A function that handles the legal term definition process.
 * - LegalTermDefinitionInput - The input type for the legalTermDefinition function.
 * - LegalTermDefinitionOutput - The return type for the legalTermDefinition function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LegalTermDefinitionInputSchema = z.object({
  term: z.string().describe('The legal term to define.'),
});
export type LegalTermDefinitionInput = z.infer<typeof LegalTermDefinitionInputSchema>;

const LegalTermDefinitionOutputSchema = z.object({
  definition: z.string().describe('A clear, understandable definition of the legal term, sourced from reliable legal databases.'),
});
export type LegalTermDefinitionOutput = z.infer<typeof LegalTermDefinitionOutputSchema>;

export async function legalTermDefinition(input: LegalTermDefinitionInput): Promise<LegalTermDefinitionOutput> {
  return legalTermDefinitionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'legalTermDefinitionPrompt',
  input: {schema: LegalTermDefinitionInputSchema},
  output: {schema: LegalTermDefinitionOutputSchema},
  prompt: `You are an expert in law. Please define the following legal term, sourcing your definition from reliable legal databases, and making the definition clear and understandable. 

Term: {{{term}}}`,
});

const legalTermDefinitionFlow = ai.defineFlow(
  {
    name: 'legalTermDefinitionFlow',
    inputSchema: LegalTermDefinitionInputSchema,
    outputSchema: LegalTermDefinitionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
