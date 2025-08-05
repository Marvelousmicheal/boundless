import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  StellarWalletsKit,
  WalletNetwork,
  ISupportedWallet,
  FreighterModule,
  AlbedoModule,
  RabetModule,
  xBullModule,
  LobstrModule,
  HanaModule,
  HotWalletModule,
} from '@creit.tech/stellar-wallets-kit';
// Import Freighter API as fallback
import {
  isConnected as freighterIsConnected,
  getAddress as freighterGetAddress,
  getNetwork as freighterGetNetwork,
  setAllowed as freighterSetAllowed,
  signTransaction as freighterSignTransaction,
} from '@stellar/freighter-api';
import { formatPublicKey } from '@/lib/utils';

export type StellarNetwork = 'testnet' | 'public';

export interface WalletState {
  // Core wallet state
  publicKey: string | null;
  network: StellarNetwork;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;

  // Wallet kit instance
  walletKit: StellarWalletsKit | null;
  selectedWallet: string | null;
  availableWallets: ISupportedWallet[];

  // Enhanced signing capabilities
  canSignTransaction: boolean;
  canSignMessage: boolean;
  canSignAuthEntry: boolean;

  // Actions
  initializeWalletKit: (network?: StellarNetwork) => Promise<void>;
  connectWallet: (walletId: string) => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (network: StellarNetwork) => Promise<void>;

  // Enhanced signing methods
  signTransaction: (xdr: string) => Promise<string>;
  signMessage: (message: string) => Promise<string>;
  signAuthEntry: (authEntry: string) => Promise<string>;

  // Utility methods
  setError: (error: string | null) => void;
  clearError: () => void;
  getWalletInfo: () => { address: string; network: string } | null;
}

let walletKitInstance: StellarWalletsKit | null = null;
let currentNetwork: StellarNetwork = 'testnet';
let usingFreighterAPI = false; // Track if we're using direct Freighter API

// Wallet capability mapping
const walletCapabilities = {
  freighter: {
    canSignTransaction: true,
    canSignMessage: true,
    canSignAuthEntry: true,
  },
  albedo: {
    canSignTransaction: true,
    canSignMessage: false, // Albedo doesn't support message signing
    canSignAuthEntry: false, // Albedo doesn't support auth entry signing
  },
  rabet: {
    canSignTransaction: true,
    canSignMessage: true,
    canSignAuthEntry: true,
  },
  xbull: {
    canSignTransaction: true,
    canSignMessage: true,
    canSignAuthEntry: true,
  },
  lobstr: {
    canSignTransaction: true,
    canSignMessage: false,
    canSignAuthEntry: false,
  },
  hana: {
    canSignTransaction: true,
    canSignMessage: false,
    canSignAuthEntry: false,
  },
  'hot-wallet': {
    canSignTransaction: true,
    canSignMessage: true,
    canSignAuthEntry: true,
  },
};

// Check if Freighter is available via direct API
const checkFreighterAvailability = async (): Promise<boolean> => {
  try {
    const connected = await freighterIsConnected();
    console.log('Freighter direct API check:', connected);
    return Boolean(connected);
  } catch (error) {
    console.log('Freighter direct API not available:', error);
    return false;
  }
};

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      publicKey: null,
      network: 'testnet',
      isConnected: false,
      isLoading: false,
      error: null,
      walletKit: null,
      selectedWallet: null,
      availableWallets: [],
      canSignTransaction: false,
      canSignMessage: false,
      canSignAuthEntry: false,

      initializeWalletKit: async (network: StellarNetwork = 'testnet') => {
        try {
          currentNetwork = network;

          // If we already have a wallet kit, disconnect it first
          if (walletKitInstance) {
            walletKitInstance.disconnect().catch(() => {});
            walletKitInstance = null;
          }

          // Create modules - start with the most common ones
          const modules = [
            new FreighterModule(),
            new AlbedoModule(),
            new RabetModule(),
            new xBullModule(),
            new LobstrModule(),
            new HanaModule(),
            new HotWalletModule(),
          ];

          // Convert our network type to WalletNetwork enum
          const walletNetwork =
            network === 'testnet'
              ? WalletNetwork.TESTNET
              : WalletNetwork.PUBLIC;

          console.log(
            'Initializing wallet kit with network:',
            network,
            'WalletNetwork:',
            walletNetwork
          );

          const kit = new StellarWalletsKit({
            network: walletNetwork,
            selectedWalletId: 'freighter',
            modules,
          });

          walletKitInstance = kit;

          // Get available wallets
          const availableWallets = await kit.getSupportedWallets();
          console.log('Available wallets from kit:', availableWallets);

          // Check if Freighter is available via direct API if not detected by kit
          const freighterAvailable = availableWallets.some(
            wallet => wallet.id === 'freighter' && wallet.isAvailable
          );
          if (!freighterAvailable) {
            const directFreighterAvailable = await checkFreighterAvailability();
            if (directFreighterAvailable) {
              console.log(
                'Freighter available via direct API, adding to available wallets'
              );
              // Add Freighter to available wallets if detected via direct API
              availableWallets.push({
                id: 'freighter',
                name: 'Freighter',
                icon: '/wallets/freighter.svg',
                isAvailable: true,
                type: 'extension',
                url: 'https://www.freighter.app/',
              } as ISupportedWallet);
            }
          }

          set({
            walletKit: kit,
            availableWallets,
            network,
          });
        } catch (error) {
          console.error('Failed to initialize wallet kit:', error);
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Failed to initialize wallet kit',
          });
        }
      },

      connectWallet: async (walletId: string) => {
        const { walletKit } = get();

        if (!walletKit) {
          throw new Error('Wallet kit not initialized');
        }

        set({ isLoading: true, error: null });

        try {
          console.log(
            'Connecting to wallet:',
            walletId,
            'on network:',
            currentNetwork
          );

          // Special handling for Freighter - try direct API if kit doesn't work
          if (walletId === 'freighter') {
            try {
              // First try the kit
              walletKit.setWallet(walletId);
              const addressResult = await walletKit.getAddress();
              console.log('Freighter connected via kit:', addressResult);
              usingFreighterAPI = false;
            } catch (kitError) {
              console.log(
                'Freighter kit connection failed, trying direct API:',
                kitError
              );

              // Try direct Freighter API as fallback
              const directAvailable = await checkFreighterAvailability();
              if (!directAvailable) {
                throw new Error(
                  'Freighter is not available. Please install the Freighter extension.'
                );
              }

              // Use direct Freighter API
              await freighterSetAllowed();
              const address = await freighterGetAddress();
              console.log('Freighter connected via direct API:', address);
              usingFreighterAPI = true;

              // Get network from Freighter
              let networkResult;
              try {
                const freighterNetwork = await freighterGetNetwork();
                const networkStr =
                  typeof freighterNetwork === 'string'
                    ? freighterNetwork
                    : 'TESTNET';
                networkResult = {
                  network: networkStr === 'TESTNET' ? 'TESTNET' : 'PUBLIC',
                  networkPassphrase:
                    networkStr === 'TESTNET'
                      ? WalletNetwork.TESTNET
                      : WalletNetwork.PUBLIC,
                };
              } catch (networkError) {
                console.log(
                  'Failed to get network from Freighter, using current:',
                  networkError
                );
                networkResult = {
                  network: currentNetwork === 'testnet' ? 'TESTNET' : 'PUBLIC',
                  networkPassphrase:
                    currentNetwork === 'testnet'
                      ? WalletNetwork.TESTNET
                      : WalletNetwork.PUBLIC,
                };
              }

              const network: StellarNetwork =
                networkResult.network === 'TESTNET' ? 'testnet' : 'public';
              const capabilities = walletCapabilities.freighter;

              set({
                publicKey:
                  typeof address === 'string' ? address : String(address),
                network,
                isConnected: true,
                isLoading: false,
                error: null,
                selectedWallet: walletId,
                canSignTransaction: capabilities.canSignTransaction,
                canSignMessage: capabilities.canSignMessage,
                canSignAuthEntry: capabilities.canSignAuthEntry,
              });
              return;
            }
          }

          // For other wallets, use the kit
          walletKit.setWallet(walletId);

          // For some wallets, we need to handle the connection differently
          let addressResult;

          try {
            // Try to get address directly
            addressResult = await walletKit.getAddress();
            console.log('Direct address result:', addressResult);
          } catch (directError) {
            console.log(
              'Direct connection failed, trying alternative method:',
              directError
            );

            // For some wallets like Albedo, we might need to trigger a connection first
            if (walletId === 'albedo') {
              // Albedo might need a different approach
              console.log('Attempting Albedo-specific connection...');
            }

            // Try again after a short delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            addressResult = await walletKit.getAddress();
            console.log('Retry address result:', addressResult);
          }

          if (!addressResult || !addressResult.address) {
            throw new Error('No public key received from wallet');
          }

          // Get current network - handle wallets that don't support getNetwork
          let networkResult;
          try {
            networkResult = await walletKit.getNetwork();
            console.log('Network result:', networkResult);
          } catch (networkError) {
            console.log(
              'Failed to get network, using current network:',
              networkError
            );
            // Use current network if we can't get it from wallet
            networkResult = {
              network: currentNetwork === 'testnet' ? 'TESTNET' : 'PUBLIC',
              networkPassphrase:
                currentNetwork === 'testnet'
                  ? WalletNetwork.TESTNET
                  : WalletNetwork.PUBLIC,
            };
          }

          const network: StellarNetwork =
            networkResult.network === 'TESTNET' ? 'testnet' : 'public';

          // Get wallet capabilities based on wallet type
          const capabilities = walletCapabilities[
            walletId as keyof typeof walletCapabilities
          ] || {
            canSignTransaction: true,
            canSignMessage: false,
            canSignAuthEntry: false,
          };

          set({
            publicKey: addressResult.address,
            network,
            isConnected: true,
            isLoading: false,
            error: null,
            selectedWallet: walletId,
            canSignTransaction: capabilities.canSignTransaction,
            canSignMessage: capabilities.canSignMessage,
            canSignAuthEntry: capabilities.canSignAuthEntry,
          });
        } catch (error) {
          console.error('Failed to connect wallet:', error);
          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : 'Failed to connect wallet',
          });
          throw error;
        }
      },

      disconnectWallet: () => {
        const { walletKit } = get();

        if (walletKit && !usingFreighterAPI) {
          walletKit.disconnect().catch(() => {});
        }

        usingFreighterAPI = false;

        set({
          publicKey: null,
          network: currentNetwork,
          isConnected: false,
          selectedWallet: null,
          canSignTransaction: false,
          canSignMessage: false,
          canSignAuthEntry: false,
          error: null,
        });
      },

      switchNetwork: async (network: StellarNetwork) => {
        console.log('Switching network from', currentNetwork, 'to', network);

        // Disconnect current wallet if connected
        const { isConnected, selectedWallet } = get();
        if (isConnected && selectedWallet) {
          get().disconnectWallet();
        }

        // Reinitialize wallet kit with new network
        await get().initializeWalletKit(network);

        // If we were connected, try to reconnect with the new network
        if (isConnected && selectedWallet) {
          try {
            await get().connectWallet(selectedWallet);
          } catch (error) {
            console.error('Failed to reconnect after network switch:', error);
            // Don't throw here, just log the error
          }
        }
      },

      signTransaction: async (xdr: string): Promise<string> => {
        const { walletKit, isConnected, canSignTransaction, selectedWallet } =
          get();

        if (!isConnected) {
          throw new Error('Wallet not connected');
        }

        if (!canSignTransaction) {
          throw new Error(
            'Current wallet does not support transaction signing'
          );
        }

        try {
          console.log(
            'Signing transaction with wallet:',
            selectedWallet,
            'usingFreighterAPI:',
            usingFreighterAPI
          );

          let result;
          if (usingFreighterAPI && selectedWallet === 'freighter') {
            // Use direct Freighter API
            result = await freighterSignTransaction(xdr);
            console.log(
              'Transaction signed successfully via direct Freighter API'
            );
            return typeof result === 'string'
              ? result
              : result.signedTxXdr || String(result);
          } else {
            // Use wallet kit
            result = await walletKit!.signTransaction(xdr);
            console.log('Transaction signed successfully via wallet kit');
            return result.signedTxXdr;
          }
        } catch (error) {
          console.error('Transaction signing failed:', error);

          // Provide more specific error messages
          let errorMessage = 'Failed to sign transaction';
          if (error && typeof error === 'object' && 'message' in error) {
            const err = error as { message: string; code?: number };
            if (err.message.includes('Invalid transaction XDR')) {
              errorMessage =
                'Invalid transaction format. Please provide a valid XDR transaction.';
            } else if (err.message.includes('Intent request is invalid')) {
              errorMessage =
                'Transaction format is not supported by this wallet.';
            } else {
              errorMessage = err.message;
            }
          }

          throw new Error(errorMessage);
        }
      },

      signMessage: async (message: string): Promise<string> => {
        const { walletKit, isConnected, canSignMessage, selectedWallet } =
          get();

        if (!isConnected) {
          throw new Error('Wallet not connected');
        }

        if (!canSignMessage) {
          throw new Error(
            `Current wallet (${selectedWallet}) does not support message signing`
          );
        }

        try {
          console.log(
            'Signing message with wallet:',
            selectedWallet,
            'usingFreighterAPI:',
            usingFreighterAPI
          );

          let result;
          if (usingFreighterAPI && selectedWallet === 'freighter') {
            // Direct Freighter API doesn't support message signing
            throw new Error(
              'Message signing not available via direct Freighter API'
            );
          } else {
            // Use wallet kit
            result = await walletKit!.signMessage(message);
            console.log('Message signed successfully via wallet kit');
            return result.signedMessage;
          }
        } catch (error) {
          console.error('Message signing failed:', error);

          // Provide more specific error messages
          let errorMessage = 'Failed to sign message';
          if (error && typeof error === 'object' && 'message' in error) {
            const err = error as { message: string; code?: number };
            if (err.message.includes('does not support')) {
              errorMessage = `Message signing is not supported by ${selectedWallet}`;
            } else {
              errorMessage = err.message;
            }
          }

          throw new Error(errorMessage);
        }
      },

      signAuthEntry: async (authEntry: string): Promise<string> => {
        const { walletKit, isConnected, canSignAuthEntry, selectedWallet } =
          get();

        if (!isConnected) {
          throw new Error('Wallet not connected');
        }

        if (!canSignAuthEntry) {
          throw new Error(
            `Current wallet (${selectedWallet}) does not support auth entry signing`
          );
        }

        try {
          console.log(
            'Signing auth entry with wallet:',
            selectedWallet,
            'usingFreighterAPI:',
            usingFreighterAPI
          );

          let result;
          if (usingFreighterAPI && selectedWallet === 'freighter') {
            // Direct Freighter API doesn't support auth entry signing
            throw new Error(
              'Auth entry signing not available via direct Freighter API'
            );
          } else {
            // Use wallet kit
            result = await walletKit!.signAuthEntry(authEntry);
            console.log('Auth entry signed successfully via wallet kit');
            return result.signedAuthEntry;
          }
        } catch (error) {
          console.error('Auth entry signing failed:', error);

          // Provide more specific error messages
          let errorMessage = 'Failed to sign auth entry';
          if (error && typeof error === 'object' && 'message' in error) {
            const err = error as { message: string; code?: number };
            if (err.message.includes('does not support')) {
              errorMessage = `Auth entry signing is not supported by ${selectedWallet}`;
            } else {
              errorMessage = err.message;
            }
          }

          throw new Error(errorMessage);
        }
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      getWalletInfo: () => {
        const { publicKey, network } = get();

        if (!publicKey) {
          return null;
        }

        return {
          address: publicKey,
          network: network === 'testnet' ? 'TESTNET' : 'PUBLIC',
        };
      },
    }),
    {
      name: 'stellar-wallets-kit-storage',
      partialize: state => ({
        publicKey: state.publicKey,
        network: state.network,
        isConnected: state.isConnected,
        selectedWallet: state.selectedWallet,
      }),
    }
  )
);

export function useWalletInfo() {
  const { publicKey, network, isConnected, selectedWallet } = useWalletStore();

  if (!isConnected || !publicKey) {
    return null;
  }

  return {
    address: publicKey,
    displayName: formatPublicKey(publicKey),
    network,
    walletType: selectedWallet,
  };
}

export function useAutoReconnect() {
  const { isConnected, publicKey, selectedWallet, connectWallet } =
    useWalletStore();

  useEffect(() => {
    if (publicKey && selectedWallet && !isConnected) {
      connectWallet(selectedWallet).catch(() => {});
    }
  }, [publicKey, selectedWallet, isConnected, connectWallet]);
}

export function useWalletConnection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { connectWallet, clearError } = useWalletStore();

  const connect = async (walletId: string) => {
    setIsConnecting(true);
    setError(null);

    try {
      await connectWallet(walletId);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  return {
    connect,
    isConnecting,
    error,
    clearError: () => {
      setError(null);
      clearError();
    },
  };
}

export function useNetworkSwitcher() {
  const { network, switchNetwork, isLoading } = useWalletStore();

  const switchToNetwork = async (newNetwork: StellarNetwork) => {
    if (newNetwork === network) return;

    try {
      await switchNetwork(newNetwork);
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  return {
    currentNetwork: network,
    switchToNetwork,
    isLoading,
  };
}

export function useWalletSigning() {
  const {
    signTransaction,
    signMessage,
    signAuthEntry,
    canSignTransaction,
    canSignMessage,
    canSignAuthEntry,
    isConnected,
  } = useWalletStore();

  return {
    signTransaction,
    signMessage,
    signAuthEntry,
    canSignTransaction,
    canSignMessage,
    canSignAuthEntry,
    isConnected,
  };
}
