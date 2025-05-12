import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/lib/constants";
import { Mail, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Customer Support",
  description: "Get help and support from the ShareBites team. Contact us via form, email, or live chat.",
};

export default function SupportPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">Get in Touch</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We're here to help! Whether you have a question, a suggestion, or need assistance, please don't hesitate to reach out.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <ContactForm />
        </div>
        <div className="space-y-8 mt-8 md:mt-0">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Contact Information</h2>
            <div className="flex items-center space-x-3 p-4 border rounded-lg bg-card">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email Us:</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg font-medium text-primary hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Live Chat</h2>
            <div className="p-4 border rounded-lg bg-card">
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-6 w-6 text-secondary" />
                 <div>
                    <p className="text-sm text-muted-foreground">Need immediate help?</p>
                    <p className="text-lg font-medium text-secondary">Live Chat (Coming Soon)</p>
                 </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Our live chat feature will be available soon to provide you with real-time assistance.
              </p>
              <Button variant="secondary" disabled className="mt-4">
                Chat with Us
              </Button>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Frequently Asked Questions</h2>
             <p className="text-muted-foreground">
              Looking for quick answers? Our FAQ section might have what you need.
              (A link to an FAQ page or an accordion component would go here).
            </p>
             <Button variant="outline" className="mt-4" asChild>
                <a href="#">View FAQs (Coming Soon)</a>
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
