"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "./ui/card"
import { Send } from "lucide-react"

const symptoms = [
    { id: "diarrhea", label: "Diarrhea" },
    { id: "vomiting", label: "Vomiting" },
    { id: "fever", label: "Fever" },
    { id: "stomach_cramps", label: "Stomach Cramps" },
    { id: "jaundice", label: "Jaundice" },
    { id: "other", label: "Other" },
] as const

const formSchema = z.object({
  reporterName: z.string().min(2, {
    message: "Reporter name must be at least 2 characters.",
  }),
  village: z.string().min(2, "Village name is required."),
  numberOfCases: z.coerce.number().min(0, "Number of cases must be a positive number."),
  symptoms: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one symptom.",
  }),
  waterSource: z.string().min(1, "Please select a water source."),
  waterQualityNotes: z.string().optional(),
})

export function ReportForm() {
    const { toast } = useToast()
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reporterName: "",
            village: "",
            numberOfCases: 0,
            symptoms: [],
            waterSource: "",
            waterQualityNotes: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        toast({
            title: "Report Submitted Successfully!",
            description: "Thank you for helping keep our community safe.",
        })
        form.reset()
    }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <FormField
                control={form.control}
                name="reporterName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Reporter Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. ASHA Worker Name" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="village"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Village / Area</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. Mawlynnong" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
            <FormField
                control={form.control}
                name="symptoms"
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">Symptoms Observed</FormLabel>
                            <FormDescription>
                            Select all symptoms that have been observed in the community.
                            </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {symptoms.map((item) => (
                        <FormField
                            key={item.id}
                            control={form.control}
                            name="symptoms"
                            render={({ field }) => {
                            return (
                                <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                <FormControl>
                                    <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                        return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                                (value) => value !== item.id
                                            )
                                            )
                                    }}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal">
                                    {item.label}
                                </FormLabel>
                                </FormItem>
                            )
                            }}
                        />
                        ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="numberOfCases"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Approximate Number of Cases</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="waterSource"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Primary Water Source</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a water source" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="public-well">Public Well</SelectItem>
                        <SelectItem value="river-stream">River / Stream</SelectItem>
                        <SelectItem value="hand-pump">Hand Pump</SelectItem>
                        <SelectItem value="piped-supply">Piped Water Supply</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
            <FormField
                control={form.control}
                name="waterQualityNotes"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Water Quality Observations</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="e.g., Water is cloudy, has a strange smell..."
                        className="resize-none"
                        {...field}
                        />
                    </FormControl>
                     <FormDescription>
                        Describe any unusual observations about the water quality.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />
            
            <Button type="submit" size="lg">
                <Send className="mr-2 h-4 w-4" />
                Submit Report
            </Button>
        </form>
        </Form>
      </CardContent>
    </Card>
  )
}
