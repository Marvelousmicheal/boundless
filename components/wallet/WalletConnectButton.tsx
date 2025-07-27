"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, CheckCircle, Copy } from "lucide-react";
import { cn, copyToClipboard } from "@/lib/utils";
import { toast } from "sonner";
import { setAllowed } from "@stellar/freighter-api";
import WalletErrorGuide from "./WalletErrorGuide";
import { useWalletInfo, useWalletStore, useAutoReconnect } from "@/hooks/use-wallet";
import { BoundlessButton } from "../buttons";

interface WalletConnectButtonProps {
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showErrorGuide?: boolean;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  className,
  variant = "default",
  size = "default",
  showErrorGuide = true,
}) => {
  const [showErrorGuideState, setShowErrorGuideState] = useState(false);

  const {
    network,
    isConnected,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
    clearError,
  } = useWalletStore();

  const walletInfo = useWalletInfo();

  // Auto-reconnect on page load
  useAutoReconnect();

  // Handle errors with toast and show error guide
  React.useEffect(() => {
    if (error) {
      toast.error(error, {
        description: "Please try again or check your wallet connection",
        action: {
          label: "Dismiss",
          onClick: clearError,
        },
      });
      if (showErrorGuide) {
        setShowErrorGuideState(true);
      }
    } else {
      setShowErrorGuideState(false);
    }
  }, [error, clearError, showErrorGuide]);

  const handleConnect = async () => {
    try {
      setShowErrorGuideState(false);

      // Set allowed first (as per your code pattern)
      await setAllowed();

      // Then connect wallet
      await connectWallet();

      toast.success("Wallet connected successfully!", {
        description: `Connected to ${
          network === "testnet" ? "Testnet" : "Public"
        } network`,
      });
    } catch (error) {
      console.error('Failed to connect wallet', error)
      // Error is handled by the store and displayed via useEffect
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    toast.success("Wallet disconnected");
  };

  const getNetworkDisplay = (network: string) => {
    return network === "testnet" ? "Testnet" : "Public";
  };

  if (isLoading) {
    return (
      <Button
        variant={variant}
        size={size}
        className={cn("min-w-[140px]", className)}
        disabled
      >
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Connecting...
      </Button>
    );
  }

  if (isConnected && walletInfo) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-primary !rounded-[10px]">
            <BoundlessButton
              variant={variant}
              size={size}
              className={cn("min-w-[140px]", className)}
              onClick={handleDisconnect}
            >
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              {walletInfo.displayName}
            </BoundlessButton>
            <Copy
              className="w-4 h-4 mr-2 hover:text-background/50 cursor-pointer"
              onClick={() => copyToClipboard(walletInfo.address)}
            />
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-md">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-500 font-medium">
              {getNetworkDisplay(network)}
            </span>
          </div>
        </div>

        {showErrorGuideState && showErrorGuide && (
          <WalletErrorGuide error={error} onRetry={handleConnect} />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BoundlessButton
        variant={variant}
        size={size}
        className={cn("min-w-[140px]", className)}
        onClick={handleConnect}
      >
        Connect Wallet
      </BoundlessButton>

      {showErrorGuideState && showErrorGuide && (
        <WalletErrorGuide error={error} onRetry={handleConnect} />
      )}
    </div>
  );
};

export default WalletConnectButton;
