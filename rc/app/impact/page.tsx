import { ImpactAnalytics } from "@/components/ImpactAnalytics";

export const metadata = {
  title: "Our Impact",
  description: "See the real-time impact ShareBites is making, powered by AI-enhanced analytics.",
};

export default function ImpactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">Our Collective Impact</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover the difference your support makes. Explore our progress, powered by data and AI-driven insights, as we work towards a hunger-free future.
        </p>
      </header>
      <ImpactAnalytics />
    </div>
  );
}
