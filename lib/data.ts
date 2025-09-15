import { TrendingUp, TrendingDown, Activity, Users } from 'lucide-react';

export type Alert = {
  id: string;
  region: string;
  riskScore: number;
  date: string;
  status: 'Active' | 'Resolved';
};

export const dashboardStats = [
  { title: 'Active Alerts', value: '3', change: '+2 from last week', Icon: TrendingUp, iconColor: 'text-destructive' },
  { title: 'Reports Today', value: '12', change: '-5 from yesterday', Icon: TrendingDown, iconColor: 'text-primary' },
  { title: 'High-Risk Regions', value: '2', change: '+1 from last week', Icon: Activity, iconColor: 'text-accent-foreground' },
  { title: 'Avg. Risk Score', value: '68', change: '+12%', Icon: Users, iconColor: 'text-destructive' },
];

export const riskHistoryData = [
  { date: 'Jan 24', "Kamrup Rural": 65, "West Garo Hills": 50 },
  { date: 'Feb 24', "Kamrup Rural": 70, "West Garo Hills": 55 },
  { date: 'Mar 24', "Kamrup Rural": 75, "West Garo Hills": 60 },
  { date: 'Apr 24', "Kamrup Rural": 80, "West Garo Hills": 65 },
  { date: 'May 24', "Kamrup Rural": 78, "West Garo Hills": 70 },
  { date: 'Jun 24', "Kamrup Rural": 85, "West Garo Hills": 75 },
];

export const riskHistoryConfig = {
  "Kamrup Rural": {
    label: "Kamrup Rural",
    color: "hsl(var(--chart-1))",
  },
  "West Garo Hills": {
    label: "West Garo Hills",
    color: "hsl(var(--chart-2))",
  },
} as const;

export const alerts: Alert[] = [
  { id: '1', region: 'Kamrup Rural', riskScore: 88, date: '2023-10-26', status: 'Active' },
  { id: '2', region: 'West Garo Hills', riskScore: 75, date: '2023-10-25', status: 'Active' },
  { id: '3', region: 'East Khasi Hills', riskScore: 62, date: '2023-10-24', status: 'Resolved' },
  { id: '4', region: 'Churachandpur', riskScore: 91, date: '2023-10-23', status: 'Active' },
  { id: '5', region: 'Tawang', riskScore: 45, date: '2023-10-22', status: 'Resolved' },
  { id: '6', region: 'Dibrugarh', riskScore: 55, date: '2023-10-21', status: 'Resolved' },
];
