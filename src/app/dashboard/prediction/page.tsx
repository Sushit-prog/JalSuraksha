import { PredictionTool } from "@/components/prediction-tool";

export default function PredictionPage() {
  return (
    <div>
       <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline md:text-4xl">AI Outbreak Prediction</h1>
        <p className="mt-2 text-muted-foreground">
          Use our AI tool to analyze data and predict potential outbreaks.
        </p>
      </div>
      <PredictionTool />
    </div>
  );
}
