'use server'

import { generateOutbreakRiskScore, GenerateOutbreakRiskScoreInput } from '@/ai/flows/generate-outbreak-risk-score'

export async function getPrediction(input: GenerateOutbreakRiskScoreInput) {
    try {
        // In a real app, you would add authentication and authorization checks here.
        const result = await generateOutbreakRiskScore(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Prediction failed:", error);
        return { success: false, error: 'Failed to generate prediction. Please try again later.' };
    }
}
