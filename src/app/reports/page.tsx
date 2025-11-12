import { AlertsBySeverityChart } from '@/components/dashboard/alerts-by-severity-chart';
import { PerformanceChart } from '@/components/dashboard/performance-chart';
import { Header } from '@/components/layout/header';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Download } from 'lucide-react';

export default function ReportsPage() {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>
        <Header />
        <main className="p-4 sm:p-6 lg:p-8 bg-background min-h-full">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-headline text-3xl font-bold">Network Performance Report</h1>
                <p className="text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
              </div>
              <Button>
                <Download className="mr-2" />
                Download PDF
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Executive Summary</CardTitle>
                <CardDescription>
                  This report provides a comprehensive overview of network performance and security alerts over the last 24 hours. Key findings indicate stable network uptime and latency within acceptable parameters. A notable increase in medium-severity alerts warrants further investigation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  The network has maintained an uptime of 99.98%. Average latency is holding steady at 45ms, with minor fluctuations during peak hours. Packet loss remains minimal at 0.02%. The AI-driven analysis predicts a potential for increased latency on the core switches if traffic patterns continue to grow at the current rate. Proactive monitoring is recommended.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <PerformanceChart />
              </div>
              <div className="lg:col-span-2">
                <AlertsBySeverityChart />
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
