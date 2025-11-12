export const networkPerformanceData = Array.from({ length: 24 }, (_, i) => {
  const date = new Date();
  date.setHours(date.getHours() - (24 - i));
  return {
    time: date.toISOString(),
    latency: Math.floor(Math.random() * (60 - 30 + 1)) + 30,
    packetLoss: parseFloat((Math.random() * 0.05).toFixed(3)),
  };
});

export const alertsBySeverityData = [
  { severity: "Critical", count: 2, fill: "hsl(var(--destructive))" },
  { severity: "High", count: 4, fill: "hsl(var(--chart-2))" },
  { severity: "Medium", count: 6, fill: "hsl(var(--chart-3))" },
  { severity: "Low", count: 15, fill: "hsl(var(--chart-4))" },
];

export const recentAlertsData = [
  {
    id: 1,
    severity: "Critical",
    description: "Router R-45 is down in DC-2.",
    timestamp: "2m ago",
  },
  {
    id: 2,
    severity: "High",
    description: "High latency detected on link to PE-101.",
    timestamp: "15m ago",
  },
  {
    id: 3,
    severity: "Medium",
    description: "CPU utilization >85% on Switch S-23.",
    timestamp: "45m ago",
  },
  {
    id: 4,
    severity: "Low",
    description: "Configuration change detected on Firewall F-05.",
    timestamp: "1h ago",
  },
  {
    id: 5,
    severity: "High",
    description: "Packet loss threshold exceeded on Core-SW-1.",
    timestamp: "2h ago",
  },
];

export const historicalDataForPrediction = `
- Last 7 days: Average latency has increased by 15% during peak hours (18:00-22:00).
- Last 3 days: Sporadic packet loss spikes (up to 2%) observed on the link between core router C1 and distribution switch D5.
- Today: Memory utilization on switch S-12 has been consistently above 90% for the past 6 hours.
- Last 24 hours: Number of BGP route flaps has increased by 30% for peer AS64500.
`;
