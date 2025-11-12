"use client";

import { predictPotentialNetworkIssues } from "@/ai/flows/predict-potential-network-issues";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { historicalDataForPrediction } from "@/lib/data";
import { BrainCircuit } from "lucide-react";
import { useEffect, useState } from "react";

export function PredictedIssues() {
  const [prediction, setPrediction] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrediction = async () => {
      setIsLoading(true);
      try {
        const result = await predictPotentialNetworkIssues({
          historicalData: historicalDataForPrediction,
        });
        setPrediction(result.predictedIssues);
      } catch (error) {
        console.error("Failed to predict issues:", error);
        setPrediction("Could not fetch predictions. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrediction();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <BrainCircuit className="size-8 text-primary" />
        <div>
          <CardTitle className="font-headline">AI-Predicted Issues</CardTitle>
          <CardDescription>
            Potential issues based on anomaly detection.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{prediction}</p>
        )}
      </CardContent>
    </Card>
  );
}
