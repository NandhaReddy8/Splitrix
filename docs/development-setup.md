# Splitrix Development Setup Guide

## 🚀 **Quick Start (Development Mode)**

Your Splitrix application is now set up with **mock wallet integration** for development and testing. This allows you to test all the features without needing real Algorand wallets initially.

### **1. Start the Application**
```bash
# The application should now start without errors
npm run dev
```

### **2. Test the Mock Wallet**
1. **Open** `http://localhost:3001` (or the port shown in terminal)
2. **Click "Connect Wallet"** in the sidebar
3. **Wait 1.5 seconds** for the mock connection
4. **See the mock wallet** connected with a test address

### **3. Test Bill Creation**
1. **Click "New Bill"** on the dashboard
2. **Fill in bill details** (use small amounts like 0.001 ALGO)
3. **Add participants** with mock addresses
4. **Submit the bill** - it will show mock transaction IDs

## 🎯 **What's Working Now**

### ✅ **Mock Features (No Real Blockchain)**
- **Wallet Connection**: Mock Pera/Defly/Exodus wallet simulation
- **Bill Splitting**: Mock transaction creation and processing
- **Dust Pool**: Mock dust calculation and handling
- **Transaction History**: Mock transaction IDs and status
- **QR Code Generation**: Mock QR codes for wallet addresses
- **Voting System**: Mock voting with address display

### ✅ **Real Features (Working)**
- **UI/UX**: Complete interface with all components
- **Form Validation**: Input validation and error handling
- **State Management**: React state for all features
- **Responsive Design**: Mobile and desktop layouts
- **Database Schema**: Ready for real data integration

## 🔧 **Development Workflow**

### **Phase 1: UI/UX Testing (Current)**
- Test all interface components
- Verify form interactions
- Check responsive design
- Validate user flows

### **Phase 2: Real Wallet Integration**
When ready for real wallets:
```bash
# Install real Algorand packages
npm install algosdk @txnlab/use-wallet

# Replace mock implementations with real ones
# Update hooks/useAlgorandWallet.ts
# Update services/algorandTransactionService.ts
```

### **Phase 3: Database Integration**
```bash
# Set up database
# Run database/schema.sql
# Connect to your database
# Implement real data persistence
```

## 🧪 **Testing Scenarios**

### **Test 1: Wallet Connection**
1. Click "Connect Wallet"
2. Should show "Mock Wallet (Development)"
3. Should display mock address
4. Should show balance

### **Test 2: Bill Creation**
1. Create bill with 0.01 ALGO
2. Add 2 participants
3. Submit bill
4. Should show mock transaction IDs
5. Should display success message

### **Test 3: QR Code Features**
1. Go to Friends page
2. Click "My QR Code"
3. Should show mock QR code
4. Click "Add Friend" → "QR Code"
5. Should show camera interface (mock)

### **Test 4: Voting System**
1. Go to Voting page
2. Click "View Details" on any vote
3. Should show voting modal
4. Should display candidate addresses
5. Should allow mock voting

## 📱 **Mobile Testing**

### **Using ngrok for Mobile Testing**
```bash
# Install ngrok
npm install -g ngrok

# Expose your local server
ngrok http 3001

# Use the ngrok URL on your mobile device
# Test wallet connections and QR scanning
```

## 🎨 **Customization**

### **Update Mock Data**
Edit these files to customize mock behavior:
- `hooks/useAlgorandWallet.ts` - Mock wallet behavior
- `services/algorandTransactionService.ts` - Mock transaction behavior
- `components/bills/create-bill-modal.tsx` - Mock bill creation

### **Add Real Wallet Integration**
When ready, replace mock implementations:
1. Install real packages: `npm install algosdk @txnlab/use-wallet`
2. Update `hooks/useAlgorandWallet.ts` with real wallet logic
3. Update `services/algorandTransactionService.ts` with real Algorand SDK
4. Test with real TestNet wallets

## 🚀 **Next Steps**

### **Immediate (Development)**
1. **Test all features** with mock data
2. **Customize UI/UX** as needed
3. **Add any missing features**
4. **Test on mobile devices**

### **When Ready for Real Integration**
1. **Install real Algorand packages**
2. **Set up TestNet environment**
3. **Connect real wallets**
4. **Test with real transactions**

### **For Production**
1. **Set up database**
2. **Implement smart contracts**
3. **Add real wallet integration**
4. **Deploy to production**

## 🎉 **You're Ready to Develop!**

Your Splitrix application is now running with full mock functionality. You can:

- ✅ **Test all UI components**
- ✅ **Verify user flows**
- ✅ **Customize the interface**
- ✅ **Add new features**
- ✅ **Test on mobile devices**

When you're ready for real blockchain integration, just follow the upgrade path in the documentation!

Happy coding! 🚀

