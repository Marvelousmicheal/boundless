# Stellar Wallets Kit Integration

## Overview

This project implements a comprehensive multi-wallet solution for Stellar using the **Stellar Wallets Kit** with a **hybrid approach** for Freighter wallet support. The integration provides seamless connectivity to multiple Stellar wallets while ensuring maximum compatibility with the most popular wallet - Freighter.

## 🎯 **Hybrid Approach**

### **Primary: Stellar Wallets Kit**

- **Multi-wallet support**: Freighter, Albedo, Rabet, xBull, Lobstr, Hana, HOT Wallet
- **Unified API**: Consistent interface across all supported wallets
- **Enhanced features**: Message signing, auth entry signing, network switching

### **Fallback: Direct Freighter API**

- **Reliability**: When Stellar Wallets Kit doesn't detect Freighter
- **Direct integration**: Uses `@stellar/freighter-api` as backup
- **Full compatibility**: Ensures Freighter always works when installed

## 🏗️ **Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    Wallet Integration                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────────────────┐   │
│  │ Stellar Wallets │    │   Direct Freighter API     │   │
│  │      Kit        │    │   (@stellar/freighter-api) │   │
│  │                 │    │                             │   │
│  │ • Multi-wallet  │    │ • Freighter fallback       │   │
│  │ • Unified API   │    │ • Direct connection        │   │
│  │ • Enhanced      │    │ • Reliable detection       │   │
│  │   features      │    │                             │   │
│  └─────────────────┘    └─────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 **Implementation Details**

### **Wallet Detection Strategy**

1. **Primary Detection**: Stellar Wallets Kit scans for available wallets
2. **Freighter Fallback**: If Freighter not detected by kit, check direct API
3. **Hybrid Connection**: Try kit first, fallback to direct API for Freighter

### **Connection Flow**

```typescript
// For Freighter wallet
if (walletId === 'freighter') {
  try {
    // 1. Try Stellar Wallets Kit first
    walletKit.setWallet('freighter');
    const address = await walletKit.getAddress();
    // Success via kit
  } catch (kitError) {
    // 2. Fallback to direct Freighter API
    const available = await checkFreighterAvailability();
    if (available) {
      await freighterSetAllowed();
      const address = await freighterGetAddress();
      // Success via direct API
    }
  }
}
```

### **Signing Capabilities**

| Wallet             | Transaction | Message | Auth Entry | API Used               |
| ------------------ | ----------- | ------- | ---------- | ---------------------- |
| Freighter (Kit)    | ✅          | ✅      | ✅         | Stellar Wallets Kit    |
| Freighter (Direct) | ✅          | ❌      | ❌         | @stellar/freighter-api |
| Albedo             | ✅          | ❌      | ❌         | Stellar Wallets Kit    |
| Rabet              | ✅          | ✅      | ✅         | Stellar Wallets Kit    |
| xBull              | ✅          | ✅      | ✅         | Stellar Wallets Kit    |
| Lobstr             | ✅          | ❌      | ❌         | Stellar Wallets Kit    |
| Hana               | ✅          | ❌      | ❌         | Stellar Wallets Kit    |
| HOT Wallet         | ✅          | ✅      | ✅         | Stellar Wallets Kit    |

## 🚀 **Features**

### **Multi-Wallet Support**

- **Freighter**: Browser extension (primary wallet)
- **Albedo**: Web-based wallet
- **Rabet**: Browser extension
- **xBull**: Mobile and web wallet
- **Lobstr**: Mobile wallet
- **Hana**: Mobile wallet
- **HOT Wallet**: Hardware wallet interface

### **Network Management**

- **Testnet**: Development and testing
- **Public**: Production network
- **Dynamic switching**: Seamless network transitions
- **Network detection**: Automatic network detection from wallets

### **Enhanced Signing**

- **Transaction signing**: XDR transaction signing
- **Message signing**: Text message signing (where supported)
- **Auth entry signing**: Soroban auth entry signing (where supported)

### **User Experience**

- **Wallet selection modal**: Choose from available wallets
- **Network switcher**: Switch between Testnet and Public
- **Real-time status**: Live connection status updates
- **Error handling**: Comprehensive error messages
- **Capability indicators**: Show what each wallet supports

## 📦 **Installation**

### **Dependencies**

```bash
npm install @creit.tech/stellar-wallets-kit @stellar/freighter-api
```

### **Environment Variables**

```env
# Optional: WalletConnect Project ID (if using WalletConnect)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
```

## 🛠️ **Usage**

### **Basic Wallet Connection**

```typescript
import { useWalletStore } from '@/hooks/use-wallet';

const { connectWallet, isConnected, publicKey } = useWalletStore();

// Connect to Freighter
await connectWallet('freighter');

// Check connection status
if (isConnected) {
  console.log('Connected to:', publicKey);
}
```

### **Network Switching**

```typescript
import { useNetworkSwitcher } from '@/hooks/use-wallet';

const { currentNetwork, switchToNetwork } = useNetworkSwitcher();

// Switch to Public network
await switchToNetwork('public');
```

### **Transaction Signing**

```typescript
import { useWalletSigning } from '@/hooks/use-wallet';

const { signTransaction, canSignTransaction } = useWalletSigning();

if (canSignTransaction) {
  const signedXdr = await signTransaction(xdrTransaction);
  console.log('Signed transaction:', signedXdr);
}
```

### **Message Signing**

```typescript
import { useWalletSigning } from '@/hooks/use-wallet';

const { signMessage, canSignMessage } = useWalletSigning();

if (canSignMessage) {
  const signature = await signMessage('Hello, Stellar!');
  console.log('Message signature:', signature);
}
```

## 🎨 **UI Components**

### **ConnectWallet Modal**

```tsx
import ConnectWallet from '@/components/connect-wallet';

<ConnectWallet open={showModal} onOpenChange={setShowModal} />;
```

### **Network Switcher**

```tsx
import NetworkSwitcher from '@/components/wallet/NetworkSwitcher';

<NetworkSwitcher />;
```

### **Wallet Signing Panel**

```tsx
import WalletSigningPanel from '@/components/wallet/WalletSigningPanel';

<WalletSigningPanel />;
```

## 🔍 **Debugging**

### **Debug Page**

Visit `/debug-wallet` for comprehensive debugging:

- **Wallet Kit Status**: Connection state and available wallets
- **Network Information**: Current network and switching capabilities
- **Signing Tests**: Test transaction and message signing
- **Error Logging**: Detailed error information

### **Console Logging**

The integration provides detailed console logging:

```javascript
// Wallet detection
console.log('Available wallets from kit:', availableWallets);
console.log('Freighter available via direct API, adding to available wallets');

// Connection flow
console.log('Connecting to wallet: freighter on network: testnet');
console.log('Freighter connected via kit:', addressResult);
console.log('Freighter connected via direct API:', address);

// Signing operations
console.log(
  'Signing transaction with wallet: freighter usingFreighterAPI: false'
);
console.log('Transaction signed successfully via wallet kit');
```

## 🚨 **Error Handling**

### **Common Error Scenarios**

1. **Wallet Not Available**

   ```javascript
   // Error: Freighter is not available. Please install the Freighter extension.
   // Solution: Install the wallet extension
   ```

2. **Network Mismatch**

   ```javascript
   // Error: Network mismatch. Please switch freighter to testnet network.
   // Solution: Switch wallet to correct network
   ```

3. **Unsupported Feature**
   ```javascript
   // Error: Message signing is not supported by albedo
   // Solution: Use a wallet that supports the feature
   ```

### **Error Recovery**

- **Automatic retry**: Connection attempts with fallback
- **User feedback**: Clear error messages with solutions
- **Graceful degradation**: Disable unsupported features

## 🔄 **Migration Guide**

### **From Direct Freighter API**

```typescript
// Old: Direct Freighter API
import { setAllowed, getAddress } from '@stellar/freighter-api';

await setAllowed();
const address = await getAddress();

// New: Hybrid approach (automatic fallback)
import { useWalletStore } from '@/hooks/use-wallet';

const { connectWallet } = useWalletStore();
await connectWallet('freighter'); // Uses kit or falls back to direct API
```

### **From Single Wallet**

```typescript
// Old: Single wallet implementation
const connectFreighter = async () => {
  // Direct Freighter implementation
};

// New: Multi-wallet with unified API
const { connectWallet } = useWalletStore();

// Connect to any supported wallet
await connectWallet('freighter');
await connectWallet('albedo');
await connectWallet('rabet');
```

## 📚 **API Reference**

### **useWalletStore**

Main wallet state management hook.

```typescript
const {
  // State
  publicKey,
  network,
  isConnected,
  isLoading,
  error,
  selectedWallet,
  availableWallets,

  // Actions
  initializeWalletKit,
  connectWallet,
  disconnectWallet,
  switchNetwork,
  signTransaction,
  signMessage,
  signAuthEntry,

  // Utilities
  setError,
  clearError,
  getWalletInfo,
} = useWalletStore();
```

### **useWalletSigning**

Hook for signing operations.

```typescript
const {
  signTransaction,
  signMessage,
  signAuthEntry,
  canSignTransaction,
  canSignMessage,
  canSignAuthEntry,
  isConnected,
} = useWalletSigning();
```

### **useNetworkSwitcher**

Hook for network management.

```typescript
const { currentNetwork, switchToNetwork, isLoading } = useNetworkSwitcher();
```

## 🧪 **Testing**

### **Manual Testing**

1. **Install wallet extensions** (Freighter, Rabet)
2. **Visit debug page** (`/debug-wallet`)
3. **Test wallet connections** for each supported wallet
4. **Test network switching** between Testnet and Public
5. **Test signing operations** with different wallets

### **Automated Testing**

```typescript
// Test wallet connection
const { connectWallet, isConnected } = useWalletStore();
await connectWallet('freighter');
expect(isConnected).toBe(true);

// Test network switching
const { switchToNetwork } = useNetworkSwitcher();
await switchToNetwork('public');
expect(currentNetwork).toBe('public');

// Test signing
const { signTransaction } = useWalletSigning();
const signedXdr = await signTransaction(testXdr);
expect(signedXdr).toBeDefined();
```

## 🔧 **Configuration**

### **Wallet Detection**

The system automatically detects available wallets:

1. **Stellar Wallets Kit**: Primary detection method
2. **Direct API Check**: Fallback for Freighter
3. **User Selection**: Manual wallet selection

### **Network Configuration**

```typescript
// Default network
const defaultNetwork: StellarNetwork = 'testnet';

// Network switching
const networks = [
  { id: 'testnet', name: 'Testnet' },
  { id: 'public', name: 'Public' },
];
```

### **Capability Mapping**

```typescript
const walletCapabilities = {
  freighter: {
    canSignTransaction: true,
    canSignMessage: true,
    canSignAuthEntry: true,
  },
  albedo: {
    canSignTransaction: true,
    canSignMessage: false,
    canSignAuthEntry: false,
  },
  // ... other wallets
};
```

## 🚀 **Performance**

### **Optimizations**

- **Lazy loading**: Wallet modules loaded on demand
- **Caching**: Wallet state persisted in localStorage
- **Error recovery**: Automatic retry with fallback
- **Network detection**: Efficient network switching

### **Bundle Size**

- **Stellar Wallets Kit**: ~50KB
- **Direct Freighter API**: ~10KB
- **Total impact**: Minimal increase in bundle size

## 🔒 **Security**

### **Best Practices**

- **Permission handling**: Proper wallet permission management
- **Error boundaries**: Graceful error handling
- **Input validation**: Validate XDR and message inputs
- **Network verification**: Ensure correct network usage

### **Wallet Security**

- **Extension verification**: Verify wallet extensions
- **Network validation**: Validate network compatibility
- **Transaction verification**: Verify transaction integrity

## 📈 **Future Enhancements**

### **Planned Features**

- **WalletConnect support**: Mobile wallet connectivity
- **Hardware wallet support**: Ledger integration
- **Batch operations**: Multiple transaction signing
- **Advanced signing**: Soroban contract interactions

### **Performance Improvements**

- **WebAssembly**: Native performance for signing
- **Streaming**: Real-time wallet status updates
- **Offline support**: Offline transaction preparation

## 🤝 **Contributing**

### **Development Setup**

1. **Clone repository**
2. **Install dependencies**: `npm install`
3. **Start development**: `npm run dev`
4. **Test wallets**: Visit `/debug-wallet`

### **Testing Guidelines**

- **Test all wallets**: Ensure each wallet works
- **Test network switching**: Verify network transitions
- **Test signing operations**: Validate all signing methods
- **Test error scenarios**: Handle edge cases

### **Code Standards**

- **TypeScript**: Full type safety
- **Error handling**: Comprehensive error management
- **Documentation**: Clear API documentation
- **Testing**: Unit and integration tests

## 📞 **Support**

### **Common Issues**

1. **Wallet not detected**: Check browser extensions
2. **Network mismatch**: Verify wallet network settings
3. **Signing failures**: Check wallet capabilities
4. **Connection errors**: Review console logs

### **Getting Help**

- **Debug page**: `/debug-wallet` for troubleshooting
- **Console logs**: Detailed error information
- **Documentation**: Comprehensive guides
- **Community**: Stellar developer community

---

This hybrid approach ensures maximum compatibility with Freighter while providing a unified experience across all supported Stellar wallets. The system automatically chooses the best available method for each wallet, providing users with the most reliable and feature-rich experience possible.
