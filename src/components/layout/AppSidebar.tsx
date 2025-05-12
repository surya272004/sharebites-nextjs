"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  // SidebarTrigger, // Removed as desktop sidebar is static
} from "@/components/ui/sidebar";
import { HandHeart, HomeIcon, Gift, InfoIcon, BarChart3Icon, LifeBuoyIcon } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

const navLinks = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/donate", label: "Donate", icon: Gift },
  { href: "/about", label: "About Us", icon: InfoIcon },
  { href: "/impact", label: "Impact", icon: BarChart3Icon },
  { href: "/support", label: "Support", icon: LifeBuoyIcon },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 py-1">
          <HandHeart className="h-7 w-7 text-sidebar-primary" />
          {/* Text is always visible as sidebar is not collapsible to icon-only on desktop */}
          <span className="text-xl font-bold tracking-tight text-sidebar-foreground">
            {SITE_NAME}
          </span>
        </Link>
        {/* <SidebarTrigger className="ml-auto hidden md:flex" /> Removed desktop toggle */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                tooltip={{ // Tooltip will be hidden on desktop as sidebar is always expanded
                  children: link.label,
                  side: "right",
                  align: "center",
                }}
              >
                <Link href={link.href}>
                  <link.icon className="h-5 w-5" />
                  {/* Span is always visible as sidebar is not collapsible to icon-only on desktop */}
                  <span> 
                    {link.label}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {/* Optional: <SidebarFooter>...</SidebarFooter> */}
    </Sidebar>
  );
}
