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

export function RootCauseAnalysis() {
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      findings: "",
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
      form.reset();
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
