# Add Stellar Wallets Kit Implementation

**Priority:** High  
**Type:** New Implementation  
**Estimated Time:** 3-4 days  
**Dependencies:** None  
**Current Status:** To Implement

## Context

The current wallet integration is limited to Freighter only, using `@stellar/freighter-api`. This creates several limitations:

- **Single wallet support**: Users can only connect with Freighter, excluding users with other Stellar wallets (Albedo, Rabet, etc.)
- **Limited functionality**: No message signing, auth entry signing for Soroban, or network switching capabilities
- **Poor user experience**: No wallet selection modal, limited error handling, and no real-time wallet state updates
- **Maintenance overhead**: Direct Freighter API integration requires manual updates and lacks the benefits of a unified wallet kit

The project needs a comprehensive multi-wallet solution that provides better user experience, enhanced functionality, and easier maintenance.

## What Needs to be Done

Implement a complete Stellar Wallets Kit integration that:

### Core Requirements

- **Multi-wallet support**: Enable connection with Freighter, Albedo, Rabet, and other Stellar wallets
- **Network management**: Allow users to switch between Testnet and Public networks
- **Enhanced signing**: Support transaction signing, message signing, and auth entry signing for Soroban
- **Real-time updates**: Provide live wallet status and connection state management

### User Experience Improvements

- **Wallet selection modal**: Allow users to choose from available wallets with availability detection
- **Network selector**: UI component for switching between testnet and public networks
- **Better error handling**: Comprehensive error messages and user feedback
- **Status indicators**: Real-time connection status and wallet information display

### Technical Enhancements

- **Unified API**: Replace direct Freighter API with Stellar Wallets Kit for consistent interface
- **Type safety**: Complete TypeScript types for all wallet operations
- **Testing coverage**: Comprehensive test suite for wallet functionality
- **Documentation**: Updated documentation with usage examples and migration guides

### Expected Outcomes

- Users can connect with any supported Stellar wallet
- Seamless network switching between testnet and public
- Enhanced signing capabilities for advanced Stellar features
- Improved error handling and user feedback
- Better maintainability and future wallet additions

## 📋 Current State Analysis

### Existing Implementation

- **Current:** Freighter-only wallet integration using `@stellar/freighter-api`
- **Location:** `hooks/use-wallet.ts`, `components/wallet/WalletConnectButton.tsx`
- **Dependencies:** `@stellar/freighter-api`, `@stellar/stellar-sdk`, `zustand`

### What's Missing

- Multi-wallet support (currently only Freighter)
- Stellar Wallets Kit integration
- Wallet selection modal
- Network switching functionality
- Message signing capabilities
- Auth entry signing for Soroban
- Wallet availability detection
- Enhanced error handling and user feedback
- Real-time wallet state updates
- Comprehensive test coverage

## 🚀 Implementation Plan

### Phase 1: Core Setup & Dependencies

#### 1.1 Update Dependencies

```bash
# Remove old dependencies
npm uninstall @stellar/freighter-api

# Install Stellar Wallets Kit
npm install @creit.tech/stellar-wallets-kit
```

#### 1.2 Environment Configuration

Create/update `.env.local`:

```env
# Stellar Wallets Kit Configuration
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Phase 2: Core Wallet Context & Store

#### 2.1 Create Enhanced Wallet Context

**File:** `hooks/use-wallet.ts`

Replace current Zustand store with Stellar Wallets Kit integration:

```typescript
import { StellarWalletsKit, WalletData } from '@creit.tech/stellar-wallets-kit';
import { create } from 'zustand';

interface WalletState {
  // Core state
  isConnected: boolean;
  publicKey: string | null;
  network: 'testnet' | 'public';
  selectedWallet: string | null;
  availableWallets: string[];

  // Actions
  connectWallet: (walletName: string) => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (network: 'testnet' | 'public') => Promise<void>;
  signTransaction: (xdr: string) => Promise<string>;
  signMessage: (message: string) => Promise<string>;
  signAuthEntry: (entry: string) => Promise<string>;

  // Error handling
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
}
```

#### 2.2 Create Wallet Utilities

**File:** `lib/wallet/utils.ts`

```typescript
export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function validateAddress(address: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{56}$/.test(address);
}

export function getExplorerUrl(
  address: string,
  network: 'testnet' | 'public'
): string {
  const baseUrl =
    network === 'testnet'
      ? 'https://testnet.stellarchain.io'
      : 'https://stellarchain.io';
  return `${baseUrl}/address/${address}`;
}

export function getNetworkPassphrase(network: 'testnet' | 'public'): string {
  return network === 'testnet'
    ? 'Test SDF Network ; September 2015'
    : 'Public Global Stellar Network ; September 2015';
}
```

### Phase 3: Enhanced UI Components

#### 3.1 Update Wallet Connect Button

**File:** `components/wallet/WalletConnectButton.tsx`

Enhance with:

- Wallet selection dropdown
- Network switching
- Real-time status indicators
- Better error handling

#### 3.2 Create Wallet Selection Modal

**File:** `components/wallet/WalletSelectionModal.tsx`

```typescript
interface WalletSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletSelect: (walletName: string) => void;
}

export function WalletSelectionModal({
  isOpen,
  onClose,
  onWalletSelect,
}: WalletSelectionModalProps) {
  // Implementation with available/unavailable wallet sections
  // Network toggle (Testnet/Public)
  // Wallet icons and descriptions
}
```

#### 3.3 Create Network Selector

**File:** `components/wallet/NetworkSelector.tsx`

```typescript
interface NetworkSelectorProps {
  currentNetwork: 'testnet' | 'public';
  onNetworkChange: (network: 'testnet' | 'public') => void;
  disabled?: boolean;
}
```

### Phase 4: Advanced Features

#### 4.1 Message Signing Component

**File:** `components/wallet/MessageSigningButton.tsx`

```typescript
interface MessageSigningButtonProps {
  message: string;
  onSigned: (signature: string) => void;
  disabled?: boolean;
}
```

#### 4.2 Auth Entry Signing Component

**File:** `components/wallet/AuthEntrySigningButton.tsx`

```typescript
interface AuthEntrySigningButtonProps {
  authEntry: string;
  onSigned: (signature: string) => void;
  disabled?: boolean;
}
```

#### 4.3 Wallet Status Component

**File:** `components/wallet/WalletStatus.tsx`

```typescript
interface WalletStatusProps {
  showNetwork?: boolean;
  showAddress?: boolean;
  compact?: boolean;
}
```

### Phase 5: Hooks & Utilities

#### 5.1 Create Wallet Hooks

**File:** `hooks/use-wallet-actions.ts`

```typescript
export function useWalletActions() {
  // Transaction signing
  const signTransaction = useCallback(async (xdr: string) => {
    // Implementation
  }, []);

  // Message signing
  const signMessage = useCallback(async (message: string) => {
    // Implementation
  }, []);

  // Auth entry signing
  const signAuthEntry = useCallback(async (entry: string) => {
    // Implementation
  }, []);

  return { signTransaction, signMessage, signAuthEntry };
}
```

**File:** `hooks/use-wallet-connection.ts`

```typescript
export function useWalletConnection() {
  // Connect wallet
  const connectWallet = useCallback(async (walletName: string) => {
    // Implementation
  }, []);

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    // Implementation
  }, []);

  // Switch network
  const switchNetwork = useCallback(async (network: 'testnet' | 'public') => {
    // Implementation
  }, []);

  return { connectWallet, disconnectWallet, switchNetwork };
}
```

### Phase 6: Testing & Documentation

#### 6.1 Create Test Suite

**File:** `__tests__/wallet.test.tsx`

```typescript
describe('Wallet Integration', () => {
  test('should connect to Freighter wallet', async () => {
    // Test implementation
  });

  test('should handle connection errors', async () => {
    // Test implementation
  });

  test('should sign transactions', async () => {
    // Test implementation
  });

  test('should switch networks', async () => {
    // Test implementation
  });
});
```

#### 6.2 Update Documentation

**File:** `docs/WALLET_INTEGRATION.md`

Update with:

- Stellar Wallets Kit usage
- Multi-wallet support
- Network switching
- Message and auth entry signing
- Error handling patterns
- Testing guidelines

## 📋 Implementation Checklist

### ✅ Setup Phase

- [ ] Update dependencies (remove Freighter API, add Stellar Wallets Kit)
- [ ] Configure environment variables
- [ ] Add wallet icons to `public/icons/`
- [ ] Update TypeScript types

### ✅ Core Implementation

- [ ] Replace wallet context with Stellar Wallets Kit
- [ ] Implement multi-wallet support
- [ ] Add network switching functionality
- [ ] Implement message and auth entry signing
- [ ] Add wallet availability detection
- [ ] Create wallet utilities and helpers

### ✅ UI Components

- [ ] Update WalletConnectButton with dropdowns
- [ ] Create WalletSelectionModal
- [ ] Add NetworkSelector component
- [ ] Create MessageSigningButton
- [ ] Create AuthEntrySigningButton
- [ ] Add WalletStatus component
- [ ] Update error handling components

### ✅ Hooks & Utilities

- [ ] Create useWalletActions hook
- [ ] Create useWalletConnection hook
- [ ] Add wallet utility functions
- [ ] Create address formatting utilities
- [ ] Add explorer URL generators

### ✅ Testing & Documentation

- [ ] Write comprehensive test suite
- [ ] Add TypeScript type definitions
- [ ] Update documentation
- [ ] Add usage examples
- [ ] Document error handling patterns

## 🎯 Expected Outcomes

### Immediate Benefits

- ✅ Support for all major Stellar wallets (Freighter, Albedo, Rabet, etc.)
- ✅ Network switching (Testnet/Public)
- ✅ Improved error handling and user feedback
- ✅ Message and auth entry signing capabilities
- ✅ Live wallet status management
- ✅ Better wallet compatibility and scalability

### Long-term Benefits

- ✅ Improved security and user experience
- ✅ Easier future maintenance and upgrades
- ✅ Better integration with Stellar ecosystem
- ✅ Enhanced developer experience

## ⚠️ Breaking Changes

This implementation will impact:

- **Components relying on existing wallet context** - New API structure
- **Network-dependent logic** - Updated network handling
- **Hardcoded connection logic** - Replaced with Stellar Wallets Kit
- **Error handling patterns** - Enhanced error management

## 🔧 Migration Guide

### For Existing Components

```typescript
// Old usage
const { publicKey, connectWallet } = useWalletStore();

// New usage
const { publicKey, connectWallet, selectedWallet, availableWallets } =
  useWalletStore();
```

### For Network Switching

```typescript
// Old: Manual network handling
// New: Built-in network switching
const { switchNetwork, network } = useWalletStore();
await switchNetwork('public');
```

## 📚 Additional Resources

- [Stellar Wallets Kit Documentation](https://github.com/Creit-Tech/stellar-wallets-kit)
- [WalletConnect Documentation](https://docs.walletconnect.com)
- [Stellar Protocol Documentation](https://developers.stellar.org/docs)
- [Soroban Documentation](https://soroban.stellar.org/docs)

## 🏷️ Labels

- `enhancement`
- `wallet-integration`
- `stellar`
- `high-priority`
- `breaking-change`

## 👥 Assignees

- [ ] Frontend Developer
- [ ] QA Tester
- [ ] Technical Writer

---

**Note:** This implementation treats the Stellar Wallets Kit as a new feature rather than an enhancement, as it replaces the current Freighter-only implementation with a comprehensive multi-wallet solution.
