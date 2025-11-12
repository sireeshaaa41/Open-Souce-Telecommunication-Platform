"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { networkPerformanceData } from "@/lib/data";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  latency: {
    label: "Latency (ms)",
    color: "hsl(var(--chart-1))",
  },
  packetLoss: {
    label: "Packet Loss (%)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Network Performance</CardTitle>
        <CardDescription>
          Real-time latency and packet loss over the last 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            data={networkPerformanceData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillLatency" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-latency)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-latency)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="latency"
              type="natural"
              fill="url(#fillLatency)"
              fillOpacity={0.4}
              stroke="var(--color-latency)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
