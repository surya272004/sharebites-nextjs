"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { HandHeart } from "lucide-react";

const foodPledgeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  foodType: z.string().min(3, "Please specify the type of food."),
  quantity: z.string().min(1, "Please specify the quantity."),
  pickupAddress: z.string().optional(),
  message: z.string().optional(),
});

type FoodPledgeFormValues = z.infer<typeof foodPledgeSchema>;

export function FoodPledgeForm() {
  const { toast } = useToast();
  const form = useForm<FoodPledgeFormValues>({
    resolver: zodResolver(foodPledgeSchema),
    defaultValues: {
      name: "",
      email: "",
      foodType: "",
      quantity: "",
      pickupAddress: "",
      message: "",
    },
  });

  const onSubmit = (data: FoodPledgeFormValues) => {
    console.log("Food pledge data:", data);
    toast({
      title: "Food Pledge Submitted!",
      description: "Thank you for your generous pledge. We will contact you shortly regarding pickup/delivery.",
    });
    form.reset();
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <HandHeart className="mr-2 h-6 w-6 text-secondary" />
          Pledge Food
        </CardTitle>
        <CardDescription>
          Offer your surplus food to help those in need. Every bit makes a difference.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Full Name</FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="foodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="foodType">Type of Food</FormLabel>
                  <FormControl>
                    <Input id="foodType" placeholder="e.g., Canned goods, Fresh produce, Cooked meals" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="quantity">Quantity</FormLabel>
                  <FormControl>
                    <Input id="quantity" placeholder="e.g., 5 boxes, 10 kg, 20 meals" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickupAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="pickupAddress">Pickup Address (Optional)</FormLabel>
                  <FormControl>
                    <Input id="pickupAddress" placeholder="Your address for food pickup" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="message">Additional Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea id="message" placeholder="Any details about the food, availability, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground text-lg py-6">
              <HandHeart className="mr-2 h-5 w-5" /> Pledge Food
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
