import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "About Us",
  description: "Learn about ShareBites' mission, vision, and the team dedicated to fighting hunger.",
};

export default function AboutUsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">Our Story & Mission</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          ShareBites connects surplus food and generous donations to those who need it most. We partner with local kitchens and shelters to ensure no food goes to waste and every person has access to nutritious meals.
        </p>
      </header>

      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-foreground mb-6">Our Vision</h2>
            <p className="text-lg text-muted-foreground mb-4">
              We envision a world where food is a fundamental right, not a privilege. A world free from hunger, where communities are nourished, and food waste is minimized. ShareBites strives to be a catalyst for this change, one meal at a time.
            </p>
            <p className="text-lg text-muted-foreground">
              Through innovative partnerships, community engagement, and unwavering dedication, we aim to create sustainable solutions that address food insecurity and promote a culture of sharing and compassion.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://picsum.photos/600/400?grayscale"
              alt="Team working together"
              width={600}
              height={400}
              className="object-cover w-full h-full"
              data-ai-hint="community outreach food"
            />
          </div>
        </div>
      </section>
      
      <section className="mb-16 py-12 bg-primary/5 rounded-xl">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-primary mb-10">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-lg">
                <CardHeader>
                <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-2">
                    <HeartHandshake className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Compassion</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground">We approach our work with empathy and a deep understanding of the challenges faced by the communities we serve.</p>
                </CardContent>
            </Card>
            <Card className="text-center shadow-lg">
                <CardHeader>
                <div className="mx-auto p-3 bg-secondary/20 rounded-full w-fit mb-2">
                    <Users className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle>Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground">We believe in the power of partnership, working with local businesses, volunteers, and organizations to maximize our impact.</p>
                </CardContent>
            </Card>
            <Card className="text-center shadow-lg">
                <CardHeader>
                <div className="mx-auto p-3 bg-accent/10 rounded-full w-fit mb-2">
                    <Building className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Integrity</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground">We operate with transparency and accountability, ensuring that every donation is used effectively to fight hunger.</p>
                </CardContent>
            </Card>
            </div>
        </div>
      </section>


      <section>
        <h2 className="text-3xl font-semibold text-center text-foreground mb-12">Meet Our Partners</h2>
        <p className="text-lg text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          We are proud to collaborate with a diverse network of organizations and businesses committed to our cause. (Logos of partners would be displayed here).
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="grayscale hover:grayscale-0 transition-all duration-300">
              <Image
                src={`https://picsum.photos/150/80?random=${i}&grayscale`}
                alt={`Partner Logo ${i + 1}`}
                width={150}
                height={80}
                className="object-contain"
                data-ai-hint="company logo"
              />
            </div>
          ))}
        </div>
         <p className="text-sm text-muted-foreground text-center mt-8">
          (Placeholder logos. Real partner logos would showcase our collaborative network.)
        </p>
      </section>
    </div>
  );
}
