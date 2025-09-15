"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { getPrediction } from "@/app/dashboard/prediction/actions"
import type { GenerateOutbreakRiskScoreOutput } from "@/ai/flows/generate-outbreak-risk-score"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Bot, CheckCircle, ListTodo } from "lucide-react"
import { Skeleton } from "./ui/skeleton"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  region: z.string().min(2, "Region is required."),
  communityHealthReports: z.string().min(10, "Health reports are required."),
  waterQualityData: z.string().min(10, "Water quality data is required."),
  seasonalTrends: z.string().min(10, "Seasonal trends are required."),
})

export function PredictionTool() {
  const [prediction, setPrediction] = useState<GenerateOutbreakRiskScoreOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      region: "Kamrup Rural",
      communityHealthReports: "Multiple cases of diarrhea and vomiting reported in children under 5. Increase in patients with fever.",
      waterQualityData: "Recent tests show high turbidity in the main well after heavy rainfall. E. coli presence detected.",
      seasonalTrends: "Monsoon season, high humidity, and temperatures around 30°C.",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setPrediction(null)
    const result = await getPrediction(values)
    setIsLoading(false)

    if (result.success) {
      setPrediction(result.data)
    } else {
      toast({
        variant: "destructive",
        title: "Prediction Failed",
        description: result.error,
      })
    }
  }

  const getRiskColor = (score: number) => {
    if (score > 80) return "bg-destructive";
    if (score > 60) return "bg-amber-500";
    return "bg-primary";
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Input Data</CardTitle>
          <CardDescription>Provide the necessary data to generate a risk score.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., East Khasi Hills" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="communityHealthReports"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Community Health Reports</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Summarize recent health reports..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="waterQualityData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Water Quality Data</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter water quality metrics..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seasonalTrends"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seasonal Trends</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe current weather and seasonal patterns..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Analyzing..." : "Generate Risk Score"}
                <Bot className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Analysis</CardTitle>
          <CardDescription>The generated outbreak risk score and recommendations.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-6">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-12 w-full" />
              </div>
               <div className="space-y-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          )}
          {prediction ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold font-headline">Outbreak Risk Score</h3>
                <div className="flex items-center gap-4 mt-2">
                    <Progress value={prediction.riskScore} className="w-full h-4" indicatorClassName={getRiskColor(prediction.riskScore)} />
                    <span className="text-2xl font-bold">{prediction.riskScore}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold font-headline flex items-center gap-2">
                    <AlertCircle className="h-5 w-5"/>
                    Rationale
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{prediction.rationale}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold font-headline flex items-center gap-2">
                    <ListTodo className="h-5 w-5"/>
                    Suggested Actions
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{prediction.suggestedActions}</p>
              </div>

            </div>
          ) : !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <Bot className="h-12 w-12 text-muted-foreground"/>
                <p className="mt-4 text-muted-foreground">Your prediction results will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
