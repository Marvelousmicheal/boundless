import * as React from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const boundlessButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap !rounded-[10px] text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Extend base variants
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 shadow-[0_1px_4px_0_rgba(167,249,80,0.14)]",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-white/30 text-white shadow-xs hover:bg-white/40 border-[0.5px] border-[#484848]",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        
        // Boundless-specific variants
        funding: "bg-green-600 text-white shadow-xs hover:bg-green-700 focus-visible:ring-green-600/20 dark:bg-green-500 dark:hover:bg-green-600",
        grant: "bg-purple-600 text-white shadow-xs hover:bg-purple-700 focus-visible:ring-purple-600/20 dark:bg-purple-500 dark:hover:bg-purple-600",
        milestone: "bg-blue-600 text-white shadow-xs hover:bg-blue-700 focus-visible:ring-blue-600/20 dark:bg-blue-500 dark:hover:bg-blue-600",
        verify: "bg-orange-600 text-white shadow-xs hover:bg-orange-700 focus-visible:ring-orange-600/20 dark:bg-orange-500 dark:hover:bg-orange-600",
        escrow: "bg-amber-600 text-white shadow-xs hover:bg-amber-700 focus-visible:ring-amber-600/20 dark:bg-amber-500 dark:hover:bg-amber-600",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md !px-4 has-[>svg]:!px-4",
        xl: "h-12 rounded-md px-8 has-[>svg]:px-6 text-base",
        icon: "size-9",
      },
      state: {
        default: "",
        loading: "opacity-75 cursor-not-allowed",
        success: "bg-green-600 text-white",
        error: "bg-red-600 text-white",
        pending: "bg-yellow-600 text-white",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
)

export interface BoundlessButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof boundlessButtonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const BoundlessButton = React.forwardRef<HTMLButtonElement, BoundlessButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    state,
    loading = false,
    icon,
    iconPosition = "left",
    children,
    disabled,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading
    
    const buttonContent = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        
        {!loading && icon && iconPosition === "left" && icon}
        {children}
        {!loading && icon && iconPosition === "right" && icon}
      </>
    )

    return (
      <Button
        ref={ref}
        className={cn(
          boundlessButtonVariants({ variant, size, state: loading ? "loading" : state }),
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {buttonContent}
      </Button>
    )
  }
)

BoundlessButton.displayName = "BoundlessButton"

export { BoundlessButton, boundlessButtonVariants } 
