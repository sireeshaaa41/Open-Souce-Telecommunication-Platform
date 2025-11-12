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
import { alertsBySeverityData } from "@/lib/data";
import { Pie, PieChart, Cell } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  alerts: {
    label: "Alerts",
  },
  critical: {
    label: "Critical",
    color: "hsl(var(--destructive))",
  },
  high: {
    label: "High",
    color: "hsl(var(--chart-2))",
  },
  medium: {
    label: "Medium",
    color: "hsl(var(--chart-3))",
  },
  low: {
    label: "Low",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function AlertsBySeverityChart() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="font-headline">Alerts by Severity</CardTitle>
        <CardDescription>
          Distribution of active alerts by severity level.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={alertsBySeverityData}
              dataKey="count"
              nameKey="severity"
              innerRadius={60}
              strokeWidth={5}
            >
              {alertsBySeverityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
