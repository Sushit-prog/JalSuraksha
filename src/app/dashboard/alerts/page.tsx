import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { alerts } from '@/lib/data'

export default function AlertsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Alerts</CardTitle>
        <CardDescription>A list of all recent health alerts and their status.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Region</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id} className={alert.riskScore > 80 ? 'bg-destructive/10' : ''}>
                <TableCell className="font-medium">{alert.region}</TableCell>
                <TableCell>
                  <span className={`font-bold ${alert.riskScore > 80 ? 'text-destructive' : alert.riskScore > 60 ? 'text-amber-600' : ''}`}>
                    {alert.riskScore}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={alert.status === 'Active' ? 'destructive' : 'secondary'}>
                    {alert.status}
                  </Badge>
                </TableCell>
                <TableCell>{alert.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
