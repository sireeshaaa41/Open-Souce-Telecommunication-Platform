'use server';
/**
 * @fileOverview Summarizes root cause analysis findings into a concise report.
 *
 * - summarizeRootCauseAnalysis - A function that handles the summarization process.
 * - SummarizeRootCauseAnalysisInput - The input type for the summarizeRootCauseAnalysis function.
 * - SummarizeRootCauseAnalysisOutput - The return type for the summarizeRootCauseAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRootCauseAnalysisInputSchema = z.object({
  rootCauseAnalysisFindings: z
    .string()
    .describe(
      'The detailed findings from the root cause analysis, including identified issues, affected systems, and contributing factors.'
    ),
});
export type SummarizeRootCauseAnalysisInput = z.infer<
  typeof SummarizeRootCauseAnalysisInputSchema
>;

const SummarizeRootCauseAnalysisOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the root cause analysis findings, highlighting key issues and recommended actions.'
    ),
});
export type SummarizeRootCauseAnalysisOutput = z.infer<
  typeof SummarizeRootCauseAnalysisOutputSchema
>;

export async function summarizeRootCauseAnalysis(
  input: SummarizeRootCauseAnalysisInput
): Promise<SummarizeRootCauseAnalysisOutput> {
  return summarizeRootCauseAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeRootCauseAnalysisPrompt',
  input: {schema: SummarizeRootCauseAnalysisInputSchema},
  output: {schema: SummarizeRootCauseAnalysisOutputSchema},
  prompt: `You are an expert telecom service assurance analyst.

  Your task is to summarize the following root cause analysis findings into a concise report that highlights the key issues and recommended actions for an operator. The summary should be clear, brief, and actionable. Root cause analysis findings are below:
  \n
  Root Cause Analysis Findings: {{{rootCauseAnalysisFindings}}}
  `,
});

const summarizeRootCauseAnalysisFlow = ai.defineFlow(
  {
    name: 'summarizeRootCauseAnalysisFlow',
    inputSchema: SummarizeRootCauseAnalysisInputSchema,
    outputSchema: SummarizeRootCauseAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
