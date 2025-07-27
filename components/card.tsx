import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import React from "react";

const Card = ({
  title,
  value,
  bottomText,
}: {
  title: string;
  value: string | React.ReactNode;
  bottomText: React.ReactNode;
}) => {
  return (
    <div className="bg-[#1C1C1C] rounded-[12px] p-4 sm:p-6 w-full border border-[#21413F3D] shadow-[0_1.5px_4px_-1px_rgba(16,25,40,0.07)] hover:border-[#2A2A2A] transition-colors">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-[#F5F5F5] leading-[145%] font-medium text-sm sm:text-base">
          {title}
        </h3>
        <Button 
          variant="ghost" 
          size="icon"
          className="w-8 h-8 sm:w-10 sm:h-10"
        >
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#F5F5F5]" />
        </Button>
      </div>
      <span className="text-white leading-[120%] font-semibold text-2xl sm:text-3xl lg:text-[32px] tracking-[-0.64px] block">
        {value}
      </span>
      {bottomText && (
        <div className="text-[#484848] flex items-center gap-2 text-xs font-medium leading-[145%] tracking-[-0.06px] mt-2 sm:mt-3">
          {bottomText}
        </div>
      )}
    </div>
  );
};

export default Card;
