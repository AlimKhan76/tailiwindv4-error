"use client";

import {
  Bookmark,
  Home,
  LucideLogOut,
  Package,
  ShoppingCart,
  Store,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { COMPANY } from "@/constant/company/company.constant";
import { useLogout } from "@/hooks/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

// Sidebar items configuration
// Each item has a name, URL, and icon
const navigationItems = [
  {
    name: "Dashboard",
    url: "/dashboard/home",
    icon: Home,
  },
  {
    name: "Saved",
    url: "/dashboard/saved-products",
    icon: Bookmark,
  },
  {
    name: "Cart",
    url: "/dashboard/cart",
    icon: ShoppingCart,
  },
  {
    name: "Orders",
    url: "/dashboard/orders",
    icon: Package,
  },
  {
    name: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
];

/**
 * AppSidebar component renders the main sidebar navigation for the application.
 * It includes:
 * - A header with branding.
 * - Navigation links for dashboard, saved products, cart, and orders.
 * - A footer with a logout button.
 *
 * The sidebar highlights the active route and closes on mobile navigation.
 *
 * @component
 * @returns The sidebar navigation UI.
 */
export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const { mutate: handleLogout, isPending: isLogoutPending } = useLogout();

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  return (
    <>
      <Sidebar>
        {/* The sticky header of the sidebar */}
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="/" className="flex items-center gap-2">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-black text-white">
                    <Store className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold text-black">
                      {COMPANY.NAME}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Groceries
                    </span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Main scrollable container of the sidebar */}
        <SidebarContent>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarMenu className="gap-1.5">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.includes(item.url)}
                    onClick={() => setOpenMobile(false)}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer of the sidebar */}
        <SidebarFooter>
          <SidebarMenu className="gap-1.5">
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setIsLogoutDialogOpen(true)}>
                <LucideLogOut />
                <p className="font-medium">Logout</p>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <AlertDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Do you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be signed out on this device. To continue, you’ll need to
              log back in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isLogoutPending}
              onClick={() =>
                handleLogout(null, {
                  onSuccess() {
                    setIsLogoutDialogOpen(false);
                    console.log("Logout successful");
                    router.replace("/auth");
                  },
                })
              }
            >
              {isLogoutPending ? "Logging out..." : "Logout"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
