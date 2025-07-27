import { useEffect, useState } from "react";
import { isConnected, getAddress, getNetwork, setAllowed } from "@stellar/freighter-api";

let address: string | undefined;
let addressLookup: Promise<{ address: string; network: string } | null> | null = null;

// returning the same object identity every time avoids unnecessary re-renders
const addressObject = {
  address: '',
  displayName: '',
};

const addressToHistoricObject = (address: string) => {
  addressObject.address = address;
  addressObject.displayName = `${address.slice(0, 4)}...${address.slice(-4)}`;
  return addressObject;
};

/**
 * Returns an object containing `address` and `displayName` properties, with
 * the address fetched from Freighter's `getUserInfo` method in a
 * render-friendly way.
 *
 * Before the address is fetched, returns null.
 *
 * Caches the result so that the Freighter lookup only happens once, no matter
 * how many times this hook is called.
 *
 * NOTE: This does not update the return value if the user changes their
 * Freighter settings; they will need to refresh the page.
 */
export function useAccount(): typeof addressObject | null {
  const [, setLoading] = useState(address === undefined);

  useEffect(() => {
    if (address !== undefined) return;

    if (!addressLookup) {
      addressLookup = (async () => {
        if (await isConnected()) {
          try {
            const addressResult = await getAddress();
            const networkResult = await getNetwork();
            return {
              address: addressResult.address,
              network: networkResult.network
            };
          } catch (error) {
            console.error('Failed to get address info:', error);
            return null;
          }
        }
        return null;
      })();
    }

    addressLookup
      .then(result => { 
        if (result && result.address) {
          address = result.address;
        }
      })
      .catch(error => {
        console.error('Address lookup failed:', error);
      })
      .finally(() => { 
        setLoading(false); 
      });
  }, []);

  if (address) return addressToHistoricObject(address);

  return null;
}

/**
 * Hook to handle wallet connection with proper error handling
 */
export function useWalletConnection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Set allowed first
      await setAllowed();
      
      // Check if connected
      const connected = await isConnected();
      if (!connected) {
        throw new Error('Freighter wallet is not connected. Please unlock your wallet and try again.');
      }

      // Get address info
      const addressResult = await getAddress();
      if (!addressResult || !addressResult.address) {
        throw new Error('No account selected in Freighter. Please select an account and try again.');
      }

      return addressResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(errorMessage);
      throw err;
    } finally {
      setIsConnecting(false);
    }
  };

  const clearError = () => setError(null);

  return {
    connect,
    isConnecting,
    error,
    clearError
  };
} 
