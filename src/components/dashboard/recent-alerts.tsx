import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { recentAlertsData } from "@/lib/data";

const severityVariantMap: { [key: string]: "destructive" | "secondary" | "default" } = {
  Critical: "destructive",
  High: "destructive",
  Medium: "secondary",
  Low: "default",
};

export function RecentAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Recent Alerts</CardTitle>
        <CardDescription>
          A log of the latest network events and alerts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Severity</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentAlertsData.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>
                  <Badge variant={severityVariantMap[alert.severity] || "default"} className="capitalize">
                    {alert.severity}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{alert.description}</TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {alert.timestamp}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
