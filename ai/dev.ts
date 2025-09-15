import { config } from 'dotenv';
config();

import '@/ai/flows/generate-outbreak-risk-score.ts';
import '@/ai/flows/summarize-health-reports.ts';