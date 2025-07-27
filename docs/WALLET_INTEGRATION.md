# Stellar Wallet Integration

A complete frontend Stellar wallet integration system built with Next.js, Freighter, Zustand, and TypeScript.

## 🚀 Features

- **🔐 Wallet Connect**: Seamless Freighter wallet integration
- **📦 State Management**: Global wallet state with Zustand
- **✍️ Transaction Signing**: Complete XDR signing flow
- **🎨 UI Components**: Beautiful, responsive components with shadcn/ui
- **📱 Mobile Responsive**: Works perfectly on all devices
- **♿ Accessible**: Full accessibility support
- **🔧 TypeScript**: Complete type safety

## 📦 Installation

### Dependencies

```bash
npm install zustand @radix-ui/react-dialog lucide-react sonner
```

### Optional: Stellar SDK (for production)

```bash
npm install stellar-sdk
```

## 🏗️ Architecture

### File Structure

```
├── hooks/
│   └── use-wallet.ts              # Zustand store for wallet state
├── components/wallet/
│   ├── WalletConnectButton.tsx    # Wallet connection component
│   ├── SignTransactionButton.tsx  # Transaction signing component
│   └── TxResultToast.tsx          # Transaction result display
├── app/api/tx/
│   ├── prepare/route.ts           # Prepare unsigned XDR
│   └── submit/route.ts            # Submit signed XDR
└── app/wallet-demo/
    └── page.tsx                   # Demo page
```

## 🔧 Usage

### 1. Wallet Store (useWalletStore)

The Zustand store manages all wallet state and operations:

```tsx
import { useWalletStore } from '@/hooks/use-wallet'

const { 
  publicKey, 
  network, 
  isConnected, 
  connectWallet, 
  signXDR 
} = useWalletStore()
```

#### State Properties

- `publicKey: string | null` - Connected wallet's public key
- `network: 'testnet' | 'public'` - Current Stellar network
- `isConnected: boolean` - Wallet connection status
- `isLoading: boolean` - Loading state for operations
- `error: string | null` - Error messages

#### Actions

- `connectWallet(): Promise<void>` - Connect to Freighter wallet
- `disconnectWallet(): void` - Disconnect wallet
- `signXDR(xdr: string): Promise<string>` - Sign XDR with wallet
- `setError(error: string | null): void` - Set error state
- `clearError(): void` - Clear error state

### 2. WalletConnectButton

A complete wallet connection component:

```tsx
import WalletConnectButton from '@/components/wallet/WalletConnectButton'

<WalletConnectButton 
  variant="default"
  size="lg"
  className="custom-class"
/>
```

#### Props

- `variant?: 'default' | 'outline' | 'ghost'` - Button variant
- `size?: 'default' | 'sm' | 'lg'` - Button size
- `className?: string` - Additional CSS classes

### 3. SignTransactionButton

Handles the complete transaction signing flow:

```tsx
import SignTransactionButton from '@/components/wallet/SignTransactionButton'

<SignTransactionButton
  transactionParams={{
    type: 'payment',
    amount: '10',
    destination: 'GABC...XYZ',
    asset: 'XLM'
  }}
  onSuccess={(hash) => console.log('Success:', hash)}
  onError={(error) => console.error('Error:', error)}
>
  Send Payment
</SignTransactionButton>
```

#### Props

- `transactionParams?: Record<string, unknown>` - Transaction parameters
- `prepareEndpoint?: string` - Custom prepare API endpoint
- `submitEndpoint?: string` - Custom submit API endpoint
- `onSuccess?: (hash: string) => void` - Success callback
- `onError?: (error: string) => void` - Error callback

### 4. TxResultToast

Displays transaction results with StellarExpert links:

```tsx
import TxResultToast from '@/components/wallet/TxResultToast'

<TxResultToast
  hash="abc123..."
  success={true}
  message="Transaction successful!"
  onClose={() => setShowToast(false)}
/>
```

## 🔄 Transaction Flow

### 1. Prepare Transaction

```tsx
// POST /api/tx/prepare
const response = await fetch('/api/tx/prepare', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    network: 'testnet',
    type: 'payment',
    amount: '10',
    destination: 'GABC...XYZ'
  })
})

const { xdr } = await response.json()
```

### 2. Sign XDR

```tsx
const signedXDR = await signXDR(xdr)
```

### 3. Submit Transaction

```tsx
// POST /api/tx/submit
const response = await fetch('/api/tx/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    signedXdr: signedXDR,
    network: 'testnet'
  })
})

const { hash, success } = await response.json()
```

## 🎨 Styling

### Theme Integration

The components use shadcn/ui and Tailwind CSS:

```tsx
// Custom styling
<WalletConnectButton 
  className="bg-gradient-to-r from-blue-500 to-purple-500"
  variant="outline"
/>
```

### Responsive Design

All components are mobile-responsive:

```css
/* Mobile-first approach */
.wallet-button {
  @apply w-full md:w-auto;
  @apply text-sm md:text-base;
  @apply px-3 md:px-6;
}
```

## 🔒 Security

### Best Practices

1. **Client-side Validation**: Always validate inputs
2. **Error Handling**: Comprehensive error handling
3. **Network Validation**: Verify network before transactions
4. **XDR Validation**: Validate XDR before signing
5. **User Confirmation**: Always confirm before signing

### Freighter Integration

```tsx
// Check if Freighter is installed
if (!window.freighterApi) {
  throw new Error('Freighter wallet is not installed')
}

// Check connection
const isConnected = await window.freighterApi.isConnected()
if (!isConnected) {
  throw new Error('Please connect your wallet first')
}
```

## 🧪 Testing

### Demo Page

Visit `/wallet-demo` to test the complete integration:

- Connect/disconnect wallet
- Sign different transaction types
- View transaction results
- Test responsive design

### Test Networks

- **Testnet**: Safe for testing, free XLM from Friendbot
- **Public**: Real transactions, real XLM

## 🚀 Production Setup

### 1. Install Stellar SDK

```bash
npm install stellar-sdk
```

### 2. Update API Routes

Replace mock implementations with real Stellar SDK:

```tsx
// app/api/tx/prepare/route.ts
import { Transaction, Networks, Asset, Operation } from 'stellar-sdk'

// Create real transactions
const transaction = new Transaction(operation, {
  fee: '100',
  networkPassphrase: Networks.TESTNET
})
```

### 3. Environment Variables

```env
# .env.local
STELLAR_NETWORK=testnet
HORIZON_URL=https://horizon-testnet.stellar.org
```

### 4. Error Handling

```tsx
// Add comprehensive error handling
try {
  const result = await submitTransaction(signedXDR)
  // Handle success
} catch (error) {
  if (error.code === 'tx_failed') {
    // Handle transaction failure
  } else if (error.code === 'tx_bad_seq') {
    // Handle sequence number error
  }
}
```

## 📱 Mobile Support

### Touch Interactions

- Large touch targets (44px minimum)
- Swipe gestures for mobile
- Responsive button sizes

### Performance

- Lazy loading for heavy components
- Optimized bundle size
- Efficient state updates

## 🔧 Customization

### Custom Transaction Types

```tsx
// Add new transaction types
const customTransaction = {
  type: 'custom',
  operation: 'myCustomOp',
  params: { /* custom params */ }
}
```

### Custom Styling

```tsx
// Override default styles
const customWalletButton = styled(WalletConnectButton)`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`
```

## 🐛 Troubleshooting

### Common Issues

1. **Freighter not detected**
   - Ensure Freighter extension is installed
   - Check if extension is enabled
   - Refresh page after installation

2. **Network mismatch**
   - Verify wallet network matches app network
   - Switch network in Freighter if needed

3. **Transaction failures**
   - Check account balance
   - Verify sequence numbers
   - Ensure proper asset trustlines

### Debug Mode

```tsx
// Enable debug logging
const DEBUG = process.env.NODE_ENV === 'development'

if (DEBUG) {
  console.log('Wallet state:', useWalletStore.getState())
}
```

## 📄 License

This project is part of the Boundless ecosystem and follows the project's licensing terms.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the demo page 
