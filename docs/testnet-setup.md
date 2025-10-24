# Algorand TestNet Setup Guide for Splitrix

## 🎯 **Recommended Wallets for Testing**

### **1. Pera Wallet (Recommended)**
- **Download**: [Pera Wallet](https://perawallet.app/)
- **Platform**: Mobile (iOS/Android) + Browser Extension
- **Features**: 
  - Easy to use interface
  - Built-in TestNet support
  - QR code scanning
  - Transaction history
- **Setup**: 
  1. Download from App Store/Google Play
  2. Create new wallet
  3. Switch to TestNet mode in settings
  4. Get TestNet ALGO from faucet

### **2. Defly Wallet**
- **Download**: [Defly Wallet](https://defly.app/)
- **Platform**: Mobile (iOS/Android)
- **Features**:
  - Advanced DeFi features
  - Portfolio tracking
  - TestNet support
- **Setup**: Similar to Pera Wallet

### **3. Exodus Wallet**
- **Download**: [Exodus Wallet](https://www.exodus.com/)
- **Platform**: Desktop + Mobile
- **Features**:
  - Multi-crypto support
  - Built-in exchange
  - TestNet support

## 🚀 **TestNet Setup Steps**

### **Step 1: Get TestNet ALGO**
1. **Visit Algorand TestNet Faucet**: https://testnet.algoexplorer.io/dispenser
2. **Enter your TestNet address** (starts with "A")
3. **Request 10 ALGO** (free test tokens)
4. **Wait for confirmation** (usually instant)

### **Step 2: Configure Your Application**
Create a `.env.local` file in your project root:

```env
# Algorand TestNet Configuration
ALGORAND_NETWORK=testnet
ALGORAND_NODE_URL=https://testnet-api.algonode.cloud
ALGORAND_INDEXER_URL=https://testnet-idx.algonode.cloud

# Wallet Configuration
WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id

# Application Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
```

### **Step 3: Test Your Integration**
1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** to `http://localhost:3000`

3. **Connect your wallet** using the sidebar

4. **Test bill creation** with small amounts (0.001 ALGO)

## 🧪 **Testing Scenarios**

### **Scenario 1: Basic Bill Splitting**
1. Connect Pera Wallet
2. Create a bill for 0.01 ALGO
3. Add 2 participants
4. Submit the bill
5. Check transaction on [TestNet Explorer](https://testnet.algoexplorer.io/)

### **Scenario 2: Dust Pool Testing**
1. Create a bill for 0.001 ALGO (small amount to generate dust)
2. Split among 3 people
3. Check if dust is handled correctly

### **Scenario 3: Multiple Wallets**
1. Test with different wallet providers
2. Verify cross-wallet compatibility
3. Test transaction signing

## 🔧 **Development Tools**

### **Algorand TestNet Explorer**
- **URL**: https://testnet.algoexplorer.io/
- **Features**: View transactions, accounts, and blocks
- **Use**: Verify your transactions are working

### **Algorand Sandbox (Local Development)**
```bash
# Install Algorand Sandbox
git clone https://github.com/algorand/sandbox.git
cd sandbox
./sandbox up testnet
```

### **Algorand Developer Tools**
- **AlgoKit**: For smart contract development
- **Algorand CLI**: Command-line tools
- **Indexer API**: Query blockchain data

## 📱 **Mobile Testing**

### **Testing on Mobile Devices**
1. **Use ngrok or similar** to expose your local server:
   ```bash
   npx ngrok http 3000
   ```

2. **Access via mobile browser** using the ngrok URL

3. **Test wallet connections** on mobile devices

4. **Test QR code scanning** functionality

## 🚨 **Common Issues & Solutions**

### **Issue 1: Wallet Not Connecting**
- **Solution**: Check if wallet is unlocked
- **Solution**: Try different wallet providers
- **Solution**: Clear browser cache

### **Issue 2: Transaction Fails**
- **Solution**: Check account balance
- **Solution**: Verify TestNet network
- **Solution**: Check transaction parameters

### **Issue 3: QR Code Not Working**
- **Solution**: Ensure camera permissions
- **Solution**: Test with different QR code formats
- **Solution**: Check QR code content

## 🎯 **Production Checklist**

Before moving to MainNet:

- [ ] All TestNet features working
- [ ] Error handling implemented
- [ ] User experience tested
- [ ] Security measures in place
- [ ] Transaction fees calculated
- [ ] Backup and recovery tested

## 📚 **Additional Resources**

- [Algorand Developer Portal](https://developer.algorand.org/)
- [Algorand TestNet Faucet](https://testnet.algoexplorer.io/dispenser)
- [Algorand TestNet Explorer](https://testnet.algoexplorer.io/)
- [Pera Wallet Documentation](https://docs.perawallet.app/)
- [Algorand JavaScript SDK](https://github.com/algorand/js-algorand-sdk)

## 🎉 **Ready to Test!**

Your Splitrix application is now ready for Algorand TestNet testing! 

1. **Install Pera Wallet** on your mobile device
2. **Get TestNet ALGO** from the faucet
3. **Start your development server**
4. **Test the wallet connection**
5. **Create your first bill split**

Happy testing! 🚀

