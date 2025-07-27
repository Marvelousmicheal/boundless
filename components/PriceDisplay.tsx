import { cn, formatPrice } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  className?: string;
}

export function PriceDisplay({ price, className }: PriceDisplayProps) {
  const formattedPrice = formatPrice(price);

  return (
    <span className={cn(className, "text-[32px] font-semibold", "leading-[120%] tracking-[-0.64px]")}>
      <span className="text-white">{formattedPrice.whole}</span>
      <span className="text-[#FFFFFF99]">{formattedPrice.decimal}</span>
    </span>
  );
} 
