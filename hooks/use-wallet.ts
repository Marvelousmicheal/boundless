import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  isConnected,
  getAddress,
  getNetwork,
  setAllowed,
  signTransaction,
} from '@stellar/freighter-api';
import { formatPublicKey } from '@/lib/utils';

export type StellarNetwork = 'testnet' | 'public';

interface WalletState {
  publicKey: string | null;
  network: StellarNetwork;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;

  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  signXDR: (xdr: string) => Promise<string>;
  setError: (error: string | null) => void;
  clearError: () => void;
}

let cachedAddress: string | null = null;
let cachedNetwork: StellarNetwork | null = null;
let connectionPromise: Promise<{
  address: string;
  network: StellarNetwork;
}> | null = null;

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      publicKey: null,
      network: 'testnet',
      isConnected: false,
      isLoading: false,
      error: null,

      connectWallet: async () => {
        set({ isLoading: true, error: null });

        try {
          if (cachedAddress && cachedNetwork) {
            set({
              publicKey: cachedAddress,
              network: cachedNetwork,
              isConnected: true,
              isLoading: false,
              error: null,
            });
            return;
          }

          if (!connectionPromise) {
            connectionPromise = (async () => {
              await setAllowed();

              const connected = await isConnected();
              if (!connected) {
                throw new Error(
                  'Freighter wallet is not connected. Please unlock your wallet and try again.'
                );
              }

              const addressResult = await getAddress();
              if (
                !addressResult.address ||
                addressResult.address.trim() === ''
              ) {
                throw new Error(
                  'No account selected in Freighter. Please select an account and try again.'
                );
              }

              const networkResult = await getNetwork();
              const network: StellarNetwork =
                networkResult.network === 'TESTNET' ? 'testnet' : 'public';

              return { address: addressResult.address, network };
            })();
          }

          const result = await connectionPromise;

          cachedAddress = result.address;
          cachedNetwork = result.network;

          set({
            publicKey: result.address,
            network: result.network,
            isConnected: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          cachedAddress = null;
          cachedNetwork = null;
          connectionPromise = null;

          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : 'Failed to connect wallet',
          });
        }
      },

      disconnectWallet: () => {
        cachedAddress = null;
        cachedNetwork = null;
        connectionPromise = null;

        set({
          publicKey: null,
          network: 'testnet',
          isConnected: false,
          error: null,
        });
      },

      signXDR: async (xdr: string): Promise<string> => {
        const { isConnected: walletConnected, network } = get();

        if (!walletConnected) {
          throw new Error('Wallet not connected');
        }

        try {
          const signedResult = await signTransaction(xdr, {
            networkPassphrase:
              network === 'testnet'
                ? 'Test SDF Network ; September 2015'
                : 'Public Global Stellar Network ; September 2015',
          });
          return signedResult.signedTxXdr;
        } catch (error) {
          throw new Error(
            error instanceof Error
              ? error.message
              : 'Failed to sign transaction'
          );
        }
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'improved-wallet-storage',
      partialize: state => ({
        publicKey: state.publicKey,
        network: state.network,
        isConnected: state.isConnected,
      }),
    }
  )
);

export function useWalletInfo() {
  const { publicKey, network, isConnected } = useWalletStore();

  if (!isConnected || !publicKey) {
    return null;
  }

  return {
    address: publicKey,
    displayName: formatPublicKey(publicKey),
    network,
  };
}

export function useAutoReconnect() {
  const { isConnected, publicKey, connectWallet } = useWalletStore();

  useEffect(() => {
    if (publicKey && !isConnected) {
      connectWallet().catch(() => {});
    }
  }, [publicKey, isConnected, connectWallet]);
}

export function useWalletConnection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { connectWallet, clearError } = useWalletStore();

  const connect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      await connectWallet();
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
