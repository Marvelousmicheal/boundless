"use client"

import React, { useState } from "react";
import { Input } from "../ui/input";
import { BoundlessButton } from "../buttons";
import { Plus, Search, Menu } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import Image from "next/image";
import InitProject from "../sheet/init-project";

const Header = () => {
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-transparent border-none flex flex-col sm:flex-row shrink-0 items-start sm:items-center gap-4 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 sticky top-0 z-50">
      {/* Mobile Menu Trigger - Only visible on mobile */}
      <div className="flex items-center gap-3 w-full sm:hidden">
        <SidebarTrigger className="text-white hover:text-gray-300 transition-colors bg-[#2A2A2A] p-2 rounded-lg">
          <Menu className="w-5 h-5" />
        </SidebarTrigger>
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
      </div>

      {/* Search Bar */}
      <div className="flex-1 flex items-center w-full sm:w-auto">
        <div className="relative w-full max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </span>
          <Input
            type="text"
            placeholder="Search project..."
            className="pl-9 sm:pl-10 pr-4 py-2 rounded-xl bg-[#1C1C1C] border border-[#2B2B2B] text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none w-full h-10 sm:h-9 shadow-none text-sm sm:text-base"
          />
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
        {/* New Project Button */}
        <BoundlessButton
          variant="secondary"
          size="default"
          icon={<Plus className="w-4 h-4 sm:w-5 sm:h-5" />}
          iconPosition="right"
          onClick={() => setOpen(true)}
        >
          New Project
        </BoundlessButton>
        
        {/* Connect Wallet Button */}
        <BoundlessButton
          variant="default"
          size="default"
        >
          Connect Wallet
        </BoundlessButton>
      </div>
      <InitProject open={open} setOpen={setOpen} />
    </header>
  );
};

export default Header;
