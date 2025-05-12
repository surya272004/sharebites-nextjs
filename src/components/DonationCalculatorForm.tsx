"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { donationCalculator } from "@/ai/flows/donation-calculator";
import type { DonationCalculatorOutput } from "@/types/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, TrendingUp, Users, Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PAYMENT_OPTIONS } from "@/lib/constants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const donationSchema = z.object({
  donationAmount: z.coerce.number().min(1, "Donation amount must be at least $1."),
  paymentMethod: z.string().min(1, "Please select a payment method."),
});

type DonationFormValues = z.infer<typeof donationSchema>;

export function DonationCalculatorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<DonationCalculatorOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donationAmount: 25,
      paymentMethod: PAYMENT_OPTIONS[0].name,
    },
  });

  const { control, handleSubmit, watch, formState: { errors } } = form;
  const currentAmount = watch("donationAmount");

  const handleCalculateImpact = async (amount: number) => {
    if (amount < 1) {
      setAiResult(null);
      return;
    }
    setIsLoading(true);
    setAiResult(null);
    try {
      const result = await donationCalculator({ donationAmount: amount });
      setAiResult(result);
    } catch (error) {
      console.error("Error calculating impact:", error);
      toast({
        title: "Error",
        description: "Could not calculate impact. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Debounce function
  let debounceTimeout: NodeJS.Timeout;
  const debouncedCalculateImpact = (amount: number) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      handleCalculateImpact(amount);
    }, 500); // 500ms delay
  };

  useState(() => { // useEffect equivalent for initial load with default value
    if (currentAmount >= 1) {
       debouncedCalculateImpact(currentAmount);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  });


  const onSubmit = async (data: DonationFormValues) => {
    toast({
      title: "Donation Submitted (Simulated)",
      description: `Thank you for your generous donation of $${data.donationAmount} via ${data.paymentMethod}!`,
    });
    // Here you would typically integrate with a payment gateway
    console.log("Donation data:", data);
    if (!aiResult) { // Recalculate if not already done for the final amount
        await handleCalculateImpact(data.donationAmount);
    }
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Sparkles className="mr-2 h-6 w-6 text-accent" />
          Monetary Donation
        </CardTitle>
        <CardDescription>
          Your contribution helps us provide meals and support to those in need.
          Calculate the impact of your donation below.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="donationAmount">Donation Amount (USD)</Label>
            <Controller
              name="donationAmount"
              control={control}
              render={({ field }) => (
                <Input
                  id="donationAmount"
                  type="number"
                  placeholder="Enter amount"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    const amount = parseFloat(e.target.value);
                    if (!isNaN(amount)) {
                        debouncedCalculateImpact(amount);
                    } else {
                        setAiResult(null); // Clear results if input is invalid
                    }
                  }}
                  className="text-lg"
                />
              )}
            />
            {errors.donationAmount && (
              <p className="text-sm text-destructive">{errors.donationAmount.message}</p>
            )}
          </div>

          {isLoading && (
            <div className="flex items-center justify-center p-6 text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Calculating impact...
            </div>
          )}

          {aiResult && !isLoading && (
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" /> Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-base">{aiResult.impactStatement}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                        <Utensils className="mr-2 h-4 w-4 text-primary/80" />
                        <span>Meals Provided: <strong>{aiResult.mealsProvided}</strong></span>
                    </div>
                    <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-primary/80" />
                        <span>Families Fed: <strong>{aiResult.familiesFed}</strong></span>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground pt-2">
                  “Your ${currentAmount} donation helps provide approximately {aiResult.mealsProvided} meals today.”
                </p>
              </CardContent>
            </Card>
          )}
          
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  {PAYMENT_OPTIONS.map((option) => (
                    <Label
                      key={option.name}
                      htmlFor={option.name}
                      className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent/10 has-[input:checked]:bg-accent/10 has-[input:checked]:border-accent cursor-pointer transition-colors"
                    >
                      <RadioGroupItem value={option.name} id={option.name} />
                      {/* Dynamically load lucide icon or use text as fallback */}
                      {/* For simplicity, just text for now. Icon handling can be complex here. */}
                      <span>{option.name}</span>
                    </Label>
                  ))}
                </RadioGroup>
              )}
            />
             {errors.paymentMethod && (
              <p className="text-sm text-destructive">{errors.paymentMethod.message}</p>
            )}
          </div>

        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-accent hover:bg-accent/80 text-accent-foreground text-lg py-6" disabled={isLoading || currentAmount < 1}>
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-5 w-5" />
            )}
            Donate ${currentAmount >=1 ? currentAmount : ''} Now
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
