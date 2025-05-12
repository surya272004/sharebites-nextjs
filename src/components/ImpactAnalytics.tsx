"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { analyzeImpact } from "@/ai/flows/impact-analyzer";
import type { AnalyzeImpactOutput } from "@/types/ai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Sparkles, TrendingUp, Users, Utensils, DollarSign, ListChecks, BarChartHorizontalBig, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Input } from "@/components/ui/input"; // Added for hidden inputs

const impactAnalysisSchema = z.object({
  monthlyTrends: z.string().min(20, "Please provide a more detailed description of monthly trends (at least 20 characters)."),
  mealsDistributed: z.coerce.number().positive(),
  moneyRaised: z.coerce.number().positive(),
  numberOfDonors: z.coerce.number().positive(),
});

type ImpactAnalysisFormValues = z.infer<typeof impactAnalysisSchema>;

// Mock data for initial display and for AI input
const initialStats = {
  mealsDistributed: 15230,
  moneyRaised: 7615,
  numberOfDonors: 350,
  defaultMonthlyTrends: "Donations saw a 20% increase in December, possibly due to holiday season. Meal distribution peaked in January. Overall steady growth in donor engagement throughout the year.",
};

const monthlyChartData = [
  { month: "Jan", donations: 1200, meals: 2400 },
  { month: "Feb", donations: 900, meals: 1800 },
  { month: "Mar", donations: 1500, meals: 3000 },
  { month: "Apr", donations: 1300, meals: 2600 },
  { month: "May", donations: 1600, meals: 3200 },
  { month: "Jun", donations: 1800, meals: 3600 },
];

const chartConfig = {
  donations: {
    label: "Donations ($)",
    color: "hsl(var(--primary))",
  },
  meals: {
    label: "Meals Distributed",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig

export function ImpactAnalytics() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AnalyzeImpactOutput | null>(null);
  const { toast } = useToast();

  // State for dynamic stats (could be fetched in a real app)
  const [stats, setStats] = useState(initialStats);
  const [progressValues, setProgressValues] = useState({ meals: 0, money: 0, donors: 0 });

  useEffect(() => {
    // Simulate loading progress for visual effect
    const timers = [
        setTimeout(() => setProgressValues(prev => ({ ...prev, meals: (stats.mealsDistributed / 20000) * 100 })), 100),
        setTimeout(() => setProgressValues(prev => ({ ...prev, money: (stats.moneyRaised / 10000) * 100 })), 200),
        setTimeout(() => setProgressValues(prev => ({ ...prev, donors: (stats.numberOfDonors / 500) * 100 })), 300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [stats]);


  const form = useForm<ImpactAnalysisFormValues>({
    resolver: zodResolver(impactAnalysisSchema),
    defaultValues: {
      monthlyTrends: stats.defaultMonthlyTrends,
      mealsDistributed: stats.mealsDistributed,
      moneyRaised: stats.moneyRaised,
      numberOfDonors: stats.numberOfDonors,
    },
  });
  
  // Watch for changes in form values to update stats if needed for AI
  useEffect(() => {
    const subscription = form.watch((value) => {
        setStats(prev => ({
            ...prev,
            mealsDistributed: value.mealsDistributed ?? prev.mealsDistributed,
            moneyRaised: value.moneyRaised ?? prev.moneyRaised,
            numberOfDonors: value.numberOfDonors ?? prev.numberOfDonors,
        }));
    });
    return () => subscription.unsubscribe();
  }, [form, form.watch]);


  const onSubmit = async (data: ImpactAnalysisFormValues) => {
    setIsLoading(true);
    setAiResult(null);
    try {
      const analysisInput = {
        mealsDistributed: data.mealsDistributed,
        moneyRaised: data.moneyRaised,
        numberOfDonors: data.numberOfDonors,
        monthlyTrends: data.monthlyTrends,
      };
      const result = await analyzeImpact(analysisInput);
      setAiResult(result);
      toast({
        title: "Impact Analysis Complete",
        description: "AI insights generated successfully.",
      });
    } catch (error) {
      console.error("Error analyzing impact:", error);
      toast({
        title: "Error",
        description: "Could not analyze impact. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center text-primary">
            <TrendingUp className="mr-2 h-6 w-6" />
            Key Impact Metrics
          </CardTitle>
          <CardDescription>
            A snapshot of our collective efforts in fighting hunger.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          <StatCard icon={<Utensils />} title="Meals Distributed" value={stats.mealsDistributed.toLocaleString()} progress={progressValues.meals} target={20000} color="text-primary" />
          <StatCard icon={<DollarSign />} title="Money Raised" value={`$${stats.moneyRaised.toLocaleString()}`} progress={progressValues.money} target={10000} color="text-accent" />
          <StatCard icon={<Users />} title="Donors Engaged" value={stats.numberOfDonors.toLocaleString()} progress={progressValues.donors} target={500} color="text-secondary" />
        </CardContent>
      </Card>

      <Card className="shadow-lg">
         <CardHeader>
            <CardTitle className="text-2xl flex items-center text-primary">
                <BarChartHorizontalBig className="mr-2 h-6 w-6" />
                Monthly Progress
            </CardTitle>
            <CardDescription>
                Visualizing our donation and meal distribution trends over recent months.
            </CardDescription>
         </CardHeader>
         <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--secondary))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar yAxisId="left" dataKey="donations" fill="var(--color-donations)" radius={4} />
                  <Bar yAxisId="right" dataKey="meals" fill="var(--color-meals)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
         </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center text-accent">
            <Sparkles className="mr-2 h-6 w-6" />
            AI-Powered Impact Analysis
          </CardTitle>
          <CardDescription>
            Provide a summary of monthly trends, and our AI will generate insights and recommendations.
            (For demo, key stats are pre-filled but could be form inputs too)
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
               {/* Hidden inputs for stats, could be visible and editable if desired */}
               <FormField control={form.control} name="mealsDistributed" render={({ field }) => <Input type="hidden" {...field} />} />
               <FormField control={form.control} name="moneyRaised" render={({ field }) => <Input type="hidden" {...field} />} />
               <FormField control={form.control} name="numberOfDonors" render={({ field }) => <Input type="hidden" {...field} />} />

              <FormField
                control={form.control}
                name="monthlyTrends"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="monthlyTrends" className="text-base">Describe Monthly Trends & Observations</FormLabel>
                    <FormControl>
                      <Textarea
                        id="monthlyTrends"
                        placeholder="e.g., Donations increased by X% in Q1, volunteer engagement grew in summer..."
                        {...field}
                        rows={5}
                        className="text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/80 text-accent-foreground text-lg py-6" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-5 w-5" />
                )}
                Analyze Impact with AI
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {aiResult && !isLoading && (
        <Card className="shadow-lg bg-background border-primary/30">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center">
              <Lightbulb className="mr-2 h-6 w-6" /> AI Generated Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Summary:</h3>
              <p className="text-muted-foreground">{aiResult.summary}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1 flex items-center"><ListChecks className="mr-2 h-5 w-5"/>Key Insights:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
                {aiResult.keyInsights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Recommendations:</h3>
              <p className="text-muted-foreground">{aiResult.recommendations}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    progress: number;
    target: number;
    color?: string;
}

function StatCard({ icon, title, value, progress, target, color = "text-primary" }: StatCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <span className={`h-5 w-5 ${color}`}>{icon}</span>
            </CardHeader>
            <CardContent>
                <div className={`text-3xl font-bold ${color}`}>{value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                    {Math.round(progress)}% of {target.toLocaleString()} target
                </p>
                <Progress value={progress} aria-label={`${title} progress`} className="mt-2 h-2 [&>div]:bg-primary" />
            </CardContent>
        </Card>
    );
}
