import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Signup",
  description: "Create a new ShareBites account.",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center py-12 px-4 md:min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Create Account</CardTitle>
          <CardDescription>Join ShareBites and start making a difference today.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Placeholder for actual signup form */}
          <div className="text-center text-muted-foreground">
            <p className="mb-4">Signup form functionality will be implemented here.</p>
            <p>For now, you can navigate to other pages:</p>
          </div>
           <div className="flex flex-col space-y-3">
            <Button variant="outline" asChild>
              <Link href="/">Go to Homepage</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/login">Already have an account? Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
