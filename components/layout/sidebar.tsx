"use client";
import React from "react";
import {
  ChevronRight,
  Grid,
  Package,
  Sun,
  HandHeart,
  Activity,
  Bell,
  Settings,
  Check,
  Menu,
  User,
  LayoutDashboardIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";

interface SidebarLayoutProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const navigationItems = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboardIcon,
  },
  {
    id: "projects",
    label: "Projects",
    icon: Package,
  },
  {
    id: "campaigns",
    label: "Campaigns",
    icon: Sun,
  },
  {
    id: "grants",
    label: "Grants",
    icon: HandHeart,
  },
  {
    id: "activities",
    label: "My Activities",
    icon: Activity,
  },
];

const utilityItems = [
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  activeSection = "overview",
  onSectionChange,
}) => {
  return (
    <Sidebar className="bg-background" variant="floating">
      <SidebarHeader className="pt-4 sm:pt-6 lg:pt-8 px-3 bg-[#1C1C1C]">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <Image
            src="/logo.svg"
            alt="logo"
            width={100}
            height={100}
            className="w-2/3 sm:w-3/4"
          />
          {/* Mobile Menu Trigger - Always visible on mobile */}
          <SidebarTrigger className="text-white hover:text-gray-300 transition-colors md:hidden bg-[#2A2A2A] p-2 rounded-lg">
            <Menu className="w-5 h-5" />
          </SidebarTrigger>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                <AvatarImage src="/api/placeholder/40/40" />
                <AvatarFallback className="bg-blue-500 text-white">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs sm:text-sm font-semibold truncate">
                  Collins Odumeje
                </p>
              </div>
              <Badge
                variant="secondary"
                className="w-4 h-4 sm:w-5 sm:h-5 p-0 rounded-full bg-[#2B2B2B] flex-shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                >
                  <path
                    d="M8.8166 2.70063C9.21811 2.32189 9.85061 2.33937 10.2297 2.74067C10.6086 3.14191 10.5904 3.77445 10.1896 4.15375L4.98945 9.06586C4.60405 9.42986 4.00082 9.42986 3.61543 9.06586L1.67207 7.22992C1.27059 6.8507 1.25282 6.21736 1.63203 5.81586C2.0113 5.41525 2.64389 5.397 3.04511 5.77582L4.30195 6.96235L8.8166 2.70063Z"
                    fill="#787878"
                  />
                </svg>
              </Badge>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent className="bg-[#1C1C1C]">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSectionChange?.(item.id)}
                      className={cn(
                        "w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-3 sm:py-5 rounded-lg text-left transition-colors overflow-hidden relative",
                        isActive
                          ? "bg-background text-white"
                          : "text-gray-400 hover:text-white hover:bg-background/50"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0",
                          isActive ? "text-white" : "text-gray-400"
                        )}
                      />
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 sm:h-7 bg-[#A7F950] rounded-r-[2px]" />
                      )}
                      <span className="text-xs sm:text-sm font-medium truncate">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Utility Navigation */}
      <SidebarFooter className="pb-8 sm:pb-14 border-t border-[#2A2A2A] bg-[#1C1C1C]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityItems.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSectionChange?.(item.id)}
                      className="w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 rounded-lg text-left text-gray-400 hover:text-white hover:bg-[#2A2A2A]/50 transition-colors"
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium truncate">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarLayout;
