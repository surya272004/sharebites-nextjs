import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Login",
  description: "Login to your ShareBites account.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center py-12 px-4 md:min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Login</CardTitle>
          <CardDescription>Welcome back! Access your ShareBites account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Placeholder for actual login form */}
          <div className="text-center text-muted-foreground">
            <p className="mb-4">Login form functionality will be implemented here.</p>
            <p>For now, you can navigate to other pages:</p>
          </div>
          <div className="flex flex-col space-y-3">
            <Button variant="outline" asChild>
              <Link href="/">Go to Homepage</Link>
            </Button>
             <Button variant="link" asChild>
              <Link href="/signup">Don't have an account? Signup</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
