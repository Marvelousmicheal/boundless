"use client";
import { ReactNode } from "react";
import { SidebarInset, useSidebar } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "./header";

export default function DashboardInset({ children }: { children: ReactNode }) {
  const { state } = useSidebar();
  
  return (
    <SidebarInset>
      <div
        className={
          state === "collapsed"
            ? "overflow-hidden w-full fixed top-0 left-0 right-0 bottom-0 md:w-[calc(100%-3rem)] md:left-[3rem]"
            : "overflow-hidden w-full fixed top-0 left-0 right-0 bottom-0 md:w-[calc(100%-16rem)] md:left-[16rem]"
        }
      >
        <Header />
        <ScrollArea className="h-[calc(100%-88px)] w-full">
          <div className="min-h-full">
            {children}
          </div>
        </ScrollArea>
      </div>
    </SidebarInset>
  );
}
