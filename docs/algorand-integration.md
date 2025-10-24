# Algorand Integration Guide for Splitrix

## ✅ **Correct Algorand Packages**

Based on the npm registry search, here are the **correct and available** Algorand packages for your Splitrix application:

### **Core Packages (Successfully Installed)**
```bash
# Official Algorand JavaScript SDK
npm install algosdk

# Modern wallet integration library
npm install @txnlab/use-wallet
```

### **Additional Recommended Packages**
```bash
# AlgoKit utilities (already installed)
npm install @algorandfoundation/algokit-utils

# QR Code generation for Algorand addresses
npm install algorand-qrcode

# WalletConnect for mobile wallet support
npm install algorand-walletconnect-qrcode-modal
```

## 🚫 **Packages That Don't Exist**
- ❌ `@algorandfoundation/algokit-utils-web` - This package doesn't exist
- ❌ `@algorandfoundation/algokit-utils-web` - Not available in npm registry

## 📦 **What Each Package Does**

### 1. **algosdk** (Official Algorand SDK)
- **Purpose**: Core Algorand blockchain interactions
- **Features**: 
  - Create and sign transactions
  - Query blockchain data
  - Manage accounts and assets
  - Smart contract interactions

### 2. **@txnlab/use-wallet** (Modern Wallet Integration)
- **Purpose**: React hooks for wallet connections
- **Features**:
  - Connect to Pera Wallet, Defly, Exodus
  - WalletConnect support
  - Transaction signing
  - Account management

### 3. **@algorandfoundation/algokit-utils** (AlgoKit Utilities)
- **Purpose**: High-level utilities for Algorand development
- **Features**:
  - Simplified transaction creation
  - Smart contract deployment
  - Testing utilities

## 🔧 **Implementation Example**

Here's how to integrate these packages into your Splitrix application:

### **1. Wallet Connection Hook**
```typescript
// hooks/useAlgorandWallet.ts
import { useWallet } from '@txnlab/use-wallet'
import { AlgorandClient } from 'algosdk'

export function useAlgorandWallet() {
  const { 
    activeAddress, 
    signer, 
    providers, 
    isActive, 
    isConnecting 
  } = useWallet()

  const connectWallet = async () => {
    try {
      await providers?.pera?.connect()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }

  const disconnectWallet = async () => {
    try {
      await providers?.pera?.disconnect()
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
    }
  }

  return {
    activeAddress,
    signer,
    isActive,
    isConnecting,
    connectWallet,
    disconnectWallet
  }
}
```

### **2. Transaction Creation**
```typescript
// utils/algorandTransactions.ts
import algosdk from 'algosdk'

export class AlgorandTransactionService {
  private client: algosdk.Algodv2

  constructor(network: 'testnet' | 'mainnet' = 'testnet') {
    const algodToken = ''
    const algodServer = network === 'testnet' 
      ? 'https://testnet-api.algonode.cloud'
      : 'https://mainnet-api.algonode.cloud'
    const algodPort = ''

    this.client = new algosdk.Algodv2(algodToken, algodServer, algodPort)
  }

  async createPaymentTransaction(
    from: string,
    to: string,
    amount: number,
    note?: string
  ) {
    try {
      const params = await this.client.getTransactionParams().do()
      
      const transaction = algosdk.makePaymentTxnWithSuggestedParams(
        from,
        to,
        amount,
        undefined,
        note,
        params
      )

      return transaction
    } catch (error) {
      console.error('Error creating transaction:', error)
      throw error
    }
  }

  async sendTransaction(transaction: algosdk.Transaction, signer: any) {
    try {
      const signedTxn = await signer(transaction)
      const { txId } = await this.client.sendRawTransaction(signedTxn).do()
      
      return txId
    } catch (error) {
      console.error('Error sending transaction:', error)
      throw error
    }
  }
}
```

### **3. Bill Splitting with Dust Pool**
```typescript
// services/billSplittingService.ts
import { AlgorandTransactionService } from '../utils/algorandTransactions'

export class BillSplittingService {
  private transactionService: AlgorandTransactionService

  constructor() {
    this.transactionService = new AlgorandTransactionService('testnet')
  }

  async splitBill(
    totalAmount: number,
    participants: string[],
    payerAddress: string,
    signer: any
  ) {
    const splitAmount = Math.floor(totalAmount / participants.length)
    const dustAmount = totalAmount - (splitAmount * participants.length)
    
    const transactions = []
    
    // Create payment transactions for each participant
    for (const participant of participants) {
      if (participant !== payerAddress) {
        const transaction = await this.transactionService.createPaymentTransaction(
          payerAddress,
          participant,
          splitAmount,
          'Bill split payment'
        )
        transactions.push(transaction)
      }
    }

    // Handle dust (if any)
    if (dustAmount > 0) {
      const dustTransaction = await this.transactionService.createPaymentTransaction(
        payerAddress,
        'DUST_POOL_ADDRESS', // Your dust pool address
        dustAmount,
        'Dust contribution'
      )
      transactions.push(dustTransaction)
    }

    // Sign and send all transactions
    const txIds = []
    for (const transaction of transactions) {
      const txId = await this.transactionService.sendTransaction(transaction, signer)
      txIds.push(txId)
    }

    return txIds
  }
}
```

## 🎯 **Integration with Your Splitrix Components**

### **Update Wallet Connection in Sidebar**
```typescript
// components/layout/sidebar.tsx
import { useAlgorandWallet } from '@/hooks/useAlgorandWallet'

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const { activeAddress, isActive, connectWallet, disconnectWallet } = useAlgorandWallet()

  return (
    // ... existing code ...
    <div className="p-4 border-t border-border space-y-3">
      <div className="px-4 py-3 rounded-lg bg-surface-light border border-border">
        <p className="text-xs text-muted-foreground mb-2">Wallet Status</p>
        <p className="text-sm font-semibold text-accent">
          {isActive ? `Connected: ${activeAddress?.slice(0, 8)}...` : 'Not Connected'}
        </p>
        <Button 
          onClick={isActive ? disconnectWallet : connectWallet}
          className="w-full mt-3 bg-primary hover:bg-primary-dark text-primary-foreground"
        >
          {isActive ? 'Disconnect' : 'Connect Wallet'}
        </Button>
      </div>
    </div>
  )
}
```

### **Update Create Bill Modal**
```typescript
// components/bills/create-bill-modal.tsx
import { useAlgorandWallet } from '@/hooks/useAlgorandWallet'
import { BillSplittingService } from '@/services/billSplittingService'

export function CreateBillModal({ isOpen, onClose }: CreateBillModalProps) {
  const { activeAddress, signer, isActive } = useAlgorandWallet()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCreateBill = async () => {
    if (!isActive || !signer) {
      alert('Please connect your wallet first')
      return
    }

    setIsProcessing(true)
    try {
      const billService = new BillSplittingService()
      const txIds = await billService.splitBill(
        totalAmount,
        participants,
        activeAddress,
        signer
      )
      
      console.log('Bill split transactions:', txIds)
      // Update UI with success
    } catch (error) {
      console.error('Error creating bill:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  // ... rest of component
}
```

## 🚀 **Next Steps**

1. **Install the correct packages** (already done):
   ```bash
   npm install algosdk @txnlab/use-wallet
   ```

2. **Set up environment variables**:
   ```env
   ALGORAND_NETWORK=testnet
   ALGORAND_NODE_URL=https://testnet-api.algonode.cloud
   ALGORAND_INDEXER_URL=https://testnet-idx.algonode.cloud
   ```

3. **Create the wallet integration hooks** (as shown above)

4. **Update your components** to use the wallet connection

5. **Test with TestNet** before moving to MainNet

## 📚 **Additional Resources**

- [Algorand Developer Portal](https://developer.algorand.org/)
- [AlgoKit Documentation](https://developer.algorand.org/docs/get-details/algokit/)
- [use-wallet Library](https://github.com/txnlab/use-wallet)
- [Algorand JavaScript SDK](https://github.com/algorand/js-algorand-sdk)

## ⚠️ **Important Notes**

1. **TestNet First**: Always test on Algorand TestNet before MainNet
2. **Error Handling**: Implement proper error handling for wallet operations
3. **User Experience**: Provide clear feedback for wallet connection status
4. **Security**: Never store private keys in your application
5. **Fees**: Algorand transactions have minimal fees (0.001 ALGO)

Your Splitrix application is now ready for Algorand integration with the correct packages! 🎉

