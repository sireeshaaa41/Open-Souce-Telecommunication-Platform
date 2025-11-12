"use client";

import { summarizeRootCauseAnalysis } from "@/ai/flows/summarize-root-cause-analysis";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  findings: z
    .string()
    .min(50, "Please provide at least 50 characters for analysis."),
});

const exampleFindings = `Incident Report: High Packet Loss on Core-SW-1

Time: 2024-08-15 14:30 UTC - 16:00 UTC

Affected Service: All traffic passing through Core-SW-1

Observations:
- Monitoring systems triggered a "High Packet Loss" alert for interface Gi1/0/1 on Core-SW-1 at 14:32 UTC. Packet loss peaked at 15%.
- User reports from the engineering department indicated slow application performance and intermittent connection drops.
- Log analysis of Core-SW-1 shows a spike in output queue drops on interface Gi1/0/1.
- Log entry: "%QOS-4-QUEUE_FULL: Output queue for policy-map PM_VOIP is full on GigabitEthernet1/0/1".
- A review of recent network changes shows a new video streaming service was deployed at 14:00 UTC, which significantly increased traffic from the media server farm connected to this switch.

Initial Analysis:
The sudden increase in video traffic likely saturated the uplink interface Gi1/0/1, causing the QoS policy to drop non-essential traffic. The existing QoS configuration does not appear to be adequate for the new traffic patterns.
`;


export function RootCauseAnalysis() {
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      findings: exampleFindings,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSummary("");
    try {
      const result = await summarizeRootCauseAnalysis({
        rootCauseAnalysisFindings: values.findings,
      });
      setSummary(result.summary);
    } catch (error) {
      console.error("Root cause analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not generate summary. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset({ findings: exampleFindings });
      setSummary("");
      setIsLoading(false);
    }
  };


  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <Search className="size-8 text-primary" />
        <div>
          <CardTitle className="font-headline">Root Cause Analysis</CardTitle>
          <CardDescription>
            Use AI to summarize incident findings.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="w-full">Start Analysis</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-headline">Root Cause Analysis</DialogTitle>
              <DialogDescription>
                Paste the detailed findings from your analysis to generate a
                concise summary.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="findings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Analysis Findings</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste detailed logs, error messages, and observations here..."
                          className="min-h-48 resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Analyzing..." : "Generate Summary"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>

            {(isLoading || summary) && (
              <div className="mt-6 space-y-4 rounded-lg border bg-secondary/50 p-4">
                <h3 className="font-semibold text-foreground">AI Summary</h3>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">{summary}</p>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
