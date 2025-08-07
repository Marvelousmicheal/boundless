# Wallet Troubleshooting Guide

## 🚨 Common Issues & Solutions

### Issue: xBull, Albedo, and other wallets not connecting successfully

#### **Root Cause Analysis**

The Stellar Wallets Kit has different connection patterns for different wallet types:

- **Freighter**: Browser extension, direct connection
- **Albedo**: Web-based, opens in new window
- **xBull**: Mobile/web wallet, may require different flow
- **Rabet**: Browser extension, similar to Freighter

#### **Solutions**

1. **Check Wallet Installation**

   ```bash
   # Verify wallet extensions are installed
   # Chrome: chrome://extensions/
   # Firefox: about:addons
   ```

2. **Enable Wallet Extensions**
   - Make sure extensions are enabled
   - Check if extensions are blocked by browser
   - Try refreshing the page after enabling

3. **Network Configuration**
   - Ensure wallet is set to the same network as your app
   - Testnet vs Public network mismatch is common
   - Switch wallet network if needed

4. **Browser Permissions**
   - Allow pop-ups for Albedo
   - Grant necessary permissions when prompted
   - Check browser console for permission errors

### Issue: Signing fails after connection

#### **Root Cause Analysis**

- Different wallets support different signing methods
- Network passphrase mismatch
- Wallet not properly unlocked
- XDR format issues

#### **Solutions**

1. **Check Wallet State**

   ```javascript
   // In browser console
   console.log('Wallet connected:', isConnected);
   console.log('Selected wallet:', selectedWallet);
   console.log('Network:', network);
   ```

2. **Test with Simple XDR**

   ```javascript
   // Use a simple test XDR
   const testXdr = 'AAAAAgAAAAA=';
   ```

3. **Verify Network Passphrase**
   - Testnet: `Test SDF Network ; September 2015`
   - Public: `Public Global Stellar Network ; September 2015`

4. **Check Wallet Capabilities**
   - Some wallets don't support all signing methods
   - Try message signing first (simpler)
   - Then try transaction signing

## 🔧 Debug Steps

### Step 1: Check Browser Console

1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for errors when connecting
4. Check for network-related errors

### Step 2: Use Debug Page

1. Visit `/debug-wallet`
2. Check "Available Wallets" section
3. Test individual wallet connections
4. Use the signing test component

### Step 3: Test Individual Wallets

#### **Freighter**

```javascript
// Test Freighter specifically
await connectWallet('freighter');
```

#### **Albedo**

```javascript
// Albedo opens in new window
// Make sure pop-ups are allowed
await connectWallet('albedo');
```

#### **xBull**

```javascript
// xBull may need different approach
await connectWallet('xbull');
```

### Step 4: Check Network Settings

```javascript
// Verify network configuration
console.log('Current network:', network);
console.log('Wallet network:', walletNetwork);
```

## 🛠️ Advanced Debugging

### Debug Wallet Connection

```javascript
// Add to your component
const debugConnection = async walletId => {
  try {
    console.log('Attempting to connect to:', walletId);
    await connectWallet(walletId);
    console.log('Connection successful');
  } catch (error) {
    console.error('Connection failed:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      walletId,
    });
  }
};
```

### Debug Signing

```javascript
// Add to your component
const debugSigning = async xdr => {
  try {
    console.log('Attempting to sign XDR:', xdr);
    const result = await signTransaction(xdr);
    console.log('Signing successful:', result);
  } catch (error) {
    console.error('Signing failed:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      xdr: xdr.substring(0, 50) + '...',
    });
  }
};
```

## 📱 Wallet-Specific Issues

### Freighter

- **Issue**: Not detected
- **Solution**: Install from https://www.freighter.app/
- **Issue**: Permission denied
- **Solution**: Unlock wallet and approve connection

### Albedo

- **Issue**: Pop-up blocked
- **Solution**: Allow pop-ups for the site
- **Issue**: Connection timeout
- **Solution**: Check if Albedo site is accessible

### xBull

- **Issue**: Not available
- **Solution**: Install xBull extension or app
- **Issue**: Network mismatch
- **Solution**: Switch xBull to correct network

### Rabet

- **Issue**: Not detected
- **Solution**: Install from https://rabet.io/
- **Issue**: Connection fails
- **Solution**: Unlock Rabet and approve connection

## 🔍 Environment Checks

### Browser Compatibility

```javascript
// Check browser features
console.log('User Agent:', navigator.userAgent);
console.log('Platform:', navigator.platform);
console.log('Cookies Enabled:', navigator.cookieEnabled);
```

### Network Connectivity

```javascript
// Test network connectivity
fetch('https://horizon-testnet.stellar.org')
  .then(response => console.log('Horizon accessible:', response.ok))
  .catch(error => console.error('Horizon error:', error));
```

### Wallet Detection

```javascript
// Check if wallets are available
console.log('Available wallets:', availableWallets);
console.log('Wallet kit initialized:', !!walletKit);
```

## 🚀 Quick Fixes

### 1. Clear Browser Data

- Clear cookies and cache
- Refresh the page
- Try again

### 2. Restart Wallet Extensions

- Disable wallet extensions
- Re-enable them
- Refresh the page

### 3. Check Network Settings

- Ensure wallet and app use same network
- Switch to testnet for testing
- Switch to public for production

### 4. Try Different Browser

- Test in Chrome
- Test in Firefox
- Test in Safari

## 📞 Getting Help

### Before Asking for Help

1. Check browser console for errors
2. Use the debug page (`/debug-wallet`)
3. Test with different wallets
4. Check network settings
5. Try in different browser

### Information to Provide

- Browser and version
- Wallet type and version
- Error messages from console
- Steps to reproduce
- Network settings (testnet/public)

### Common Error Messages

#### "Wallet not found"

- Wallet not installed
- Wallet extension disabled
- Browser blocking extension

#### "Permission denied"

- Wallet not unlocked
- User denied permission
- Extension needs approval

#### "Network mismatch"

- Wallet on different network
- App configured for wrong network
- Need to switch network in wallet

#### "Signing failed"

- Wallet doesn't support signing
- XDR format incorrect
- Network passphrase wrong
- Wallet not properly connected

## 🔄 Testing Checklist

- [ ] Wallet extension installed
- [ ] Wallet extension enabled
- [ ] Wallet unlocked
- [ ] Network matches (testnet/public)
- [ ] Pop-ups allowed (for Albedo)
- [ ] Browser console checked for errors
- [ ] Debug page used
- [ ] Different browser tested
- [ ] Different wallet tested

## 📚 Additional Resources

- [Stellar Wallets Kit Issues](https://github.com/creit-tech/stellar-wallets-kit/issues)
- [Freighter Documentation](https://www.freighter.app/docs)
- [Albedo Documentation](https://albedo.link/)
- [xBull Documentation](https://xbull.app/)
- [Rabet Documentation](https://rabet.io/)
