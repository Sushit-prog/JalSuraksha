'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { dashboardStats, riskHistoryData, riskHistoryConfig, alerts } from '@/lib/data';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const mapImage = PlaceHolderImages.find((img) => img.id === 'map-ner');

export default function DashboardPage() {
  const highRiskAlerts = alerts.filter(a => a.riskScore > 70).slice(0, 5);

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {dashboardStats.map((stat) => (
                    <Card key={stat.title}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Risk History</CardTitle>
                    <CardDescription>Monthly outbreak risk score trends for key regions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={riskHistoryConfig} className="h-[250px] w-full">
                        <AreaChart data={riskHistoryData} accessibilityLayer>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                             <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={[0, 100]} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Area dataKey="Kamrup Rural" type="natural" fill="var(--color-Kamrup Rural)" fillOpacity={0.4} stroke="var(--color-Kamrup Rural)" />
                            <Area dataKey="West Garo Hills" type="natural" fill="var(--color-West Garo Hills)" fillOpacity={0.4} stroke="var(--color-West Garo Hills)" />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recent High-Risk Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Region</TableHead>
                            <TableHead className="text-center">Risk Score</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {highRiskAlerts.map((alert) => (
                            <TableRow key={alert.id}>
                                <TableCell>
                                    <div className="font-medium">{alert.region}</div>
                                </TableCell>
                                <TableCell className="text-center">{alert.riskScore}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={alert.status === 'Active' ? 'destructive' : 'secondary'}>{alert.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">{alert.date}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
                 <CardFooter className="justify-end">
                    <Button asChild size="sm" variant="outline">
                        <Link href="/dashboard/alerts">
                            View All Alerts
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

        </div>

        <div className="grid auto-rows-max items-start gap-4 md:gap-8">
            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle>Outbreak Hotspots</CardTitle>
                    <CardDescription>Live map showing regions with high outbreak risk scores.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    {mapImage && (
                        <Image
                        alt="Map of North East India"
                        className="aspect-[4/3] w-full object-cover"
                        height={600}
                        src={mapImage.imageUrl}
                        width={800}
                        data-ai-hint={mapImage.imageHint}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
