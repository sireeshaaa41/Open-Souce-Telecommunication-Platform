'use server';
/**
 * @fileOverview AI-driven flow to predict potential network issues based on historical data.
 *
 * - predictPotentialNetworkIssues - A function that predicts potential network issues.
 * - PredictPotentialNetworkIssuesInput - The input type for the predictPotentialNetworkIssues function.
 * - PredictPotentialNetworkIssuesOutput - The return type for the predictPotentialNetworkIssues function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictPotentialNetworkIssuesInputSchema = z.object({
  historicalData: z
    .string()
    .describe(
      'Historical network performance data, including metrics like latency, packet loss, and bandwidth utilization.'
    ),
});
export type PredictPotentialNetworkIssuesInput = z.infer<
  typeof PredictPotentialNetworkIssuesInputSchema
>;

const PredictPotentialNetworkIssuesOutputSchema = z.object({
  predictedIssues: z
    .string()
    .describe(
      'A description of potential network issues predicted based on the historical data, along with their potential impact and recommended actions.'
    ),
});
export type PredictPotentialNetworkIssuesOutput = z.infer<
  typeof PredictPotentialNetworkIssuesOutputSchema
>;

export async function predictPotentialNetworkIssues(
  input: PredictPotentialNetworkIssuesInput
): Promise<PredictPotentialNetworkIssuesOutput> {
  return predictPotentialNetworkIssuesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictPotentialNetworkIssuesPrompt',
  input: {schema: PredictPotentialNetworkIssuesInputSchema},
  output: {schema: PredictPotentialNetworkIssuesOutputSchema},
  prompt: `You are an AI expert in telecom network performance analysis. Based on the historical network data provided, predict potential network issues, their potential impact, and recommended actions to mitigate them.\n\nHistorical Data: {{{historicalData}}}`,
});

const predictPotentialNetworkIssuesFlow = ai.defineFlow(
  {
    name: 'predictPotentialNetworkIssuesFlow',
    inputSchema: PredictPotentialNetworkIssuesInputSchema,
    outputSchema: PredictPotentialNetworkIssuesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
