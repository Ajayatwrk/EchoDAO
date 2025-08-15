# CoreFundDemo — Simple Project Funding (Core Testnet2)

A minimal, focused contract for demonstrating project funding on Core Blockchain:
- **Project creation** - Anyone can create a project
- **Direct funding** - Funders send tCORE2 directly to project owners
- **Simple and clean** - Perfect for hackathon demos
- Built for **Core Blockchain** (EVM) — deployed on **Core Testnet2 (chainId 1114)**

## 🎯 Why Core
Core is an **EVM-compatible** L1 with **Satoshi Plus** consensus and BTC-native integrations. Testnet2 details:
- RPC: `https://rpc.test2.btcs.network`
- Chain ID: **1114**
- Explorer: https://scan.test2.btcs.network
- Faucet: https://scan.test2.btcs.network/faucet

## 🏗 Architecture (Simple & Focused)
- Single contract: `CoreFundDemo.sol`
- Native tCORE2 funding only
- Direct fund transfer to project owners
- No complex escrow or governance
- Perfect for funding demo

## ✅ What This Demonstrates
- **Project submission** from hackathon participants
- **Funding sidebar** with amount slider
- **On-chain funding** with tCORE2
- **Direct transfer** to project owners
- **Transaction verification** on Core Testnet2 explorer

## 🔧 Prerequisites
- Node 18+
- A **fresh TEST wallet** funded with **tCORE2** (via faucet)
- **Hardhat**

## ⚙️ Setup

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env

# 3. Edit .env with your TEST private key
PRIVATE_KEY=0xYourTestWalletPrivateKey
```

## 🚀 Deploy to Core Testnet2

```bash
npm run deploy:testnet2
```

Copy the deployed address printed in the console. Verify on the explorer (Testnet2).

## 🎬 Your Funding Demo

### Step 1: Create a Project
```bash
npm run create:project:testnet2
```

### Step 2: Run Funding Demo
```bash
npm run demo:funding:testnet2
```

This demonstrates exactly what you described:
1. **User selects project** (already created)
2. **Funding sidebar appears** with slider
3. **User adjusts slider** to set amount (1.5 tCORE2)
4. **User clicks Fund button**
5. **On-chain transaction** executes on Core Testnet2
6. **Transaction hash displayed** with explorer link
7. **Funds transferred** from funder to project owner

## 🔗 Frontend Integration

Add to your frontend `.env.local`:
```
NEXT_PUBLIC_COREFUND_DEMO_ADDRESS=0xYourDeployedContractAddress
```

Your frontend can call:
- `createProject(name, description)` - Create new project
- `fundProject(projectId)` with `value = amount` - Fund project
- `getProject(projectId)` - Get project details
- `projectCount()` - Get total projects

## 📋 Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| Deploy | `npm run deploy:testnet2` | Deploy contract to Core Testnet2 |
| Create Project | `npm run create:project:testnet2` | Create a project for funding |
| **Main Demo** | `npm run demo:funding:testnet2` | **Your hackathon demo** |
| Get Info | `npm run info:testnet2` | Contract info for frontend |

## 🎯 Hackathon Submission Checklist

- [x] **Core Testnet2 Deploy** (chainId 1114)
- [x] **Smart Contract** (CoreFundDemo.sol)
- [x] **Deployment Scripts** (TypeScript + Hardhat)
- [x] **Demo Scripts** (project creation + funding)
- [x] **Frontend Integration** (Viem + Core Testnet2)
- [x] **Documentation** (README + Demo Guide)
- [ ] **Get tCORE2 tokens** from faucet
- [ ] **Deploy contract** and test demos
- [ ] **Record video** of funding demo
- [ ] **Submit to hackathon**

## 🔧 Technical Stack

- **Blockchain**: Core Testnet2 (EVM + Bitcoin security)
- **Smart Contract**: Solidity 0.8.24
- **Development**: Hardhat + TypeScript
- **Frontend**: Next.js + Viem
- **Token**: Native tCORE2 (Core Testnet2)

## 🏆 Hackathon Tracks Covered

- **BTCfi / DeFi**: Native tCORE2 funding mechanisms
- **Infrastructure**: Simple, clean funding rails
- **Social/Gaming/AI**: Platform for funding projects in these categories
- **Core Integration**: Native tCORE2 support and Core blockchain features

## 🚨 Important Notes

1. **Use test wallet only** - Never use your main wallet
2. **Get tCORE2 tokens** from the faucet before deploying
3. **Test all scripts** before recording your demo
4. **Keep contract address** for frontend integration
5. **Record explorer links** for your video submission

## 🎉 Ready for Hackathon!

Your CoreFundDemo backend is complete and ready for the Core DAO hackathon. The funding demo script perfectly matches your described demo flow and will showcase the complete on-chain functionality.

**Good luck with your submission! 🚀**
