import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Gift, HandHeart, Users } from "lucide-react";
import { SITE_DESCRIPTION } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="absolute inset-0 opacity-10">
            {/* Decorative background elements if desired */}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
            ShareBites
          </h1>
          <p className="text-2xl md:text-4xl font-semibold text-primary mb-8">
            {SITE_DESCRIPTION}
          </p>
          <div className="relative max-w-4xl mx-auto mb-12 aspect-video rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="https://picsum.photos/1200/675"
              alt="Volunteers sharing food with community"
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint="food sharing community"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg shadow-lg transition-transform hover:scale-105">
              <Link href="/donate">
                <Gift className="mr-2 h-5 w-5" />
                Donate Money
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="px-8 py-6 text-lg shadow-lg transition-transform hover:scale-105">
              <Link href="/donate#food-pledge">
                <HandHeart className="mr-2 h-5 w-5" />
                Pledge Food
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">How We Make a Difference</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full inline-block mb-2">
                  <Gift className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Collect Surplus Food</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">We partner with restaurants, supermarkets, and farms to rescue nutritious food that would otherwise go to waste.</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                 <Image
                  src="https://picsum.photos/300/200" 
                  alt="Delicious and healthy meal prepared by ShareBites"
                  width={300}
                  height={200}
                  className="rounded-md mb-4 object-cover aspect-[3/2] w-full max-w-xs mx-auto"
                  data-ai-hint="food stirfry noodles"
                />
                <CardTitle className="text-2xl">Prepare & Distribute Meals</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">Our volunteers and partner kitchens transform surplus food into wholesome meals for communities in need.</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-accent/10 rounded-full inline-block mb-2">
                  <Users className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-2xl">Empower Communities</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">Beyond meals, we aim to build stronger communities through awareness and engagement programs.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">Join Us in the Fight Against Hunger</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Every contribution, big or small, helps us provide essential meals and support to those who need it most.
            Together, we can make a tangible impact.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg shadow-lg transition-transform hover:scale-105">
            <Link href="/impact">
              See Our Impact <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
