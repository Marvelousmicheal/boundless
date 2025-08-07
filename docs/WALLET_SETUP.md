# Wallet Integration Setup Guide

## 🚀 Quick Start

### 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Stellar Wallets Kit Configuration
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_APP_URL=http://localhost:3000

# For production, change to:
# NEXT_PUBLIC_STELLAR_NETWORK=public
# NEXT_PUBLIC_HORIZON_URL=https://horizon.stellar.org
# NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban.stellar.org
```

### 2. Install Dependencies

The Stellar Wallets Kit is already installed. If you need to reinstall:

```bash
npm install @creit.tech/stellar-wallets-kit
```

### 3. Test the Integration

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Visit the debug page: `http://localhost:3000/debug-wallet`

3. Visit the demo page: `http://localhost:3000/wallet-demo`

## 🔧 Troubleshooting

### Wallet Not Connecting

#### 1. Check Browser Console

Open your browser's developer tools and check the console for any errors. Common issues:

- **Module not found errors**: Make sure all dependencies are installed
- **Network errors**: Check if you're on the correct network (testnet vs public)
- **Permission errors**: Make sure the wallet extension is installed and unlocked

#### 2. Verify Wallet Installation

**Freighter:**

- Install from: https://www.freighter.app/
- Make sure it's unlocked and connected to the correct network
- Check if the extension is enabled in your browser

**Albedo:**

- Visit: https://albedo.link/
- No installation required, but make sure pop-ups are allowed

**Rabet:**

- Install from: https://rabet.io/
- Make sure it's unlocked and connected

#### 3. Check Network Settings

Make sure your wallet is set to the same network as your app:

- **Testnet**: For development and testing
- **Public**: For production

#### 4. Debug Steps

1. **Visit the debug page**: `/debug-wallet`
2. **Check available wallets**: See which wallets are detected
3. **Test individual wallets**: Use the test buttons
4. **Check browser info**: Verify your browser supports the required features

### Common Issues

#### Issue: "No wallets detected"

**Solution:**

- Make sure you have at least one Stellar wallet installed
- Try refreshing the page
- Check if the wallet extension is enabled

#### Issue: "Wallet not found"

**Solution:**

- Verify the wallet ID matches the expected format
- Check if the wallet is properly installed
- Try reconnecting the wallet

#### Issue: "Network mismatch"

**Solution:**

- Switch your wallet to the correct network (testnet/public)
- Update the environment variables to match your wallet's network

#### Issue: "Permission denied"

**Solution:**

- Make sure the wallet is unlocked
- Grant necessary permissions when prompted
- Check if the wallet extension is properly installed

## 🧪 Testing

### Manual Testing

1. **Debug Page**: `/debug-wallet`
   - Shows wallet kit status
   - Lists available wallets
   - Provides test buttons
   - Shows browser information

2. **Demo Page**: `/wallet-demo`
   - Full feature demonstration
   - Network switching
   - Signing capabilities
   - UI components

### Automated Testing

```bash
# Run tests (if available)
npm test

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📱 Supported Wallets

### Currently Supported

- **Freighter** - Browser extension
- **Albedo** - Web-based wallet
- **Rabet** - Browser extension
- **xBull** - Mobile and web wallet
- **Lobstr** - Mobile wallet
- **Hana** - Mobile wallet
- **HOT Wallet** - Hardware wallet interface

### Coming Soon

- **WalletConnect** - Multi-wallet protocol (requires additional setup)

## 🔄 Migration from Old Implementation

If you're migrating from the old Freighter-only implementation:

1. **Update imports**:

   ```tsx
   // Old
   import { setAllowed, getAddress } from '@stellar/freighter-api';

   // New
   import { useWalletStore } from '@/hooks/use-wallet';
   ```

2. **Update connection logic**:

   ```tsx
   // Old
   await setAllowed();
   const result = await getAddress();

   // New
   const { connectWallet } = useWalletStore();
   await connectWallet('freighter');
   ```

3. **Update signing logic**:

   ```tsx
   // Old
   const signedXdr = await signTransaction(xdr);

   // New
   const { signTransaction } = useWalletStore();
   const signedXdr = await signTransaction(xdr);
   ```

## 🚀 Production Deployment

### Environment Variables for Production

```env
NEXT_PUBLIC_STELLAR_NETWORK=public
NEXT_PUBLIC_HORIZON_URL=https://horizon.stellar.org
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban.stellar.org
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Build and Deploy

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📚 Additional Resources

- [Stellar Wallets Kit Documentation](https://github.com/creit-tech/stellar-wallets-kit)
- [Stellar Protocol Documentation](https://developers.stellar.org/)
- [Soroban Documentation](https://soroban.stellar.org/)
- [Freighter Documentation](https://www.freighter.app/docs)
- [Albedo Documentation](https://albedo.link/)

## 🤝 Support

If you're still having issues:

1. Check the debug page for detailed information
2. Review the browser console for errors
3. Verify wallet installation and permissions
4. Test with different wallets
5. Check network settings

For additional help, refer to the main documentation or create an issue in the project repository.
