// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import { Menu } from "lucide-react"; // Using Menu for 3-line icon
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar"; // Import useSidebar hook

export function Header() {
  const { toggleSidebar } = useSidebar(); // Get toggleSidebar

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left side: Mobile Sidebar Trigger */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2" // Show only on small screens, add some margin if next to logo/title
            onClick={toggleSidebar}
            aria-label="Toggle Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
          {/* Optional: Space for a logo or title if needed on md+ when sidebar trigger is hidden */}
        </div>

        {/* Right side: Login/Signup */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/signup">Signup</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
