import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  Network,
  ShieldCheck,
  Timer,
} from 'lucide-react';
import { AlertsBySeverityChart } from '@/components/dashboard/alerts-by-severity-chart';
import { MetricCard } from '@/components/dashboard/metric-card';
import { PerformanceChart } from '@/components/dashboard/performance-chart';
import { PredictedIssues } from '@/components/dashboard/predicted-issues';
import { RecentAlerts } from '@/components/dashboard/recent-alerts';
import { RootCauseAnalysis } from '@/components/dashboard/root-cause-analysis';
import { Header } from '@/components/layout/header';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>
        <Header />
        <main className="p-4 sm:p-6 lg:p-8 bg-background min-h-full">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Network Uptime"
                value="99.98%"
                icon={<ShieldCheck className="text-green-500" />}
                trend="+0.2% vs last month"
              />
              <MetricCard
                title="Active Alerts"
                value="12"
                icon={<Bell className="text-yellow-500" />}
                trend="+3 new alerts"
              />
              <MetricCard
                title="Avg. Latency"
                value="45ms"
                icon={<Timer className="text-blue-500" />}
                trend="-5ms vs last hour"
              />
              <MetricCard
                title="Packet Loss"
                value="0.02%"
                icon={<Activity className="text-red-500" />}
                trend="Stable"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <PerformanceChart />
              </div>
              <div className="lg:col-span-2">
                <AlertsBySeverityChart />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <RecentAlerts />
              </div>
              <div className="space-y-6">
                <RootCauseAnalysis />
                <PredictedIssues />
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
