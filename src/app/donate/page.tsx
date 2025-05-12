import { DonationCalculatorForm } from "@/components/DonationCalculatorForm";
import { FoodPledgeForm } from "@/components/FoodPledgeForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, HandHeart } from "lucide-react";

export const metadata = {
  title: "Donate",
  description: "Make a donation or pledge food to ShareBites and help fight hunger.",
};

export default function DonatePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">Make a Difference</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your generosity fuels our mission. Choose how you'd like to contribute and help us fight hunger one bite at a time.
        </p>
      </header>

      <Tabs defaultValue="monetary" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-auto">
          <TabsTrigger value="monetary" className="py-3 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Gift className="mr-2 h-5 w-5" /> Monetary Donation
          </TabsTrigger>
          <TabsTrigger value="food-pledge" className="py-3 text-base data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground" id="food-pledge">
            <HandHeart className="mr-2 h-5 w-5" /> Food Pledge
          </TabsTrigger>
        </TabsList>
        <TabsContent value="monetary">
          <DonationCalculatorForm />
        </TabsContent>
        <TabsContent value="food-pledge">
          <FoodPledgeForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
