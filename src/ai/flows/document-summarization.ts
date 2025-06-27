'use server';

/**
 * @fileOverview Summarizes legal documents to provide concise key points.
 *
 * - documentSummarization - A function that handles the document summarization process.
 * - DocumentSummarizationInput - The input type for the documentSummarization function.
 * - DocumentSummarizationOutput - The return type for the documentSummarization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DocumentSummarizationInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the legal document to be summarized.'),
});
export type DocumentSummarizationInput = z.infer<typeof DocumentSummarizationInputSchema>;

const DocumentSummarizationOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the legal document.'),
});
export type DocumentSummarizationOutput = z.infer<typeof DocumentSummarizationOutputSchema>;

export async function documentSummarization(input: DocumentSummarizationInput): Promise<DocumentSummarizationOutput> {
  return documentSummarizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'documentSummarizationPrompt',
  input: {schema: DocumentSummarizationInputSchema},
  output: {schema: DocumentSummarizationOutputSchema},
  prompt: `You are an expert legal summarizer with a focus on documents pertaining to Indian law. Please provide a concise summary of the following legal document. Focus on the key points, obligations, and legal implications under the Indian legal framework.

Document:
{{{documentText}}}`,
});

const documentSummarizationFlow = ai.defineFlow(
  {
    name: 'documentSummarizationFlow',
    inputSchema: DocumentSummarizationInputSchema,
    outputSchema: DocumentSummarizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
