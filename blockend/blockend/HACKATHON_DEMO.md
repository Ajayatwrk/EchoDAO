# 🚀 ReGenesis DAO - Hackathon Demo Guide

## Quick Start for Core DAO Hackathon

### Prerequisites
1. **Get tCORE2 tokens** from the faucet: https://scan.test2.btcs.network/faucet
2. **Create a test wallet** (never use your main wallet)
3. **Install dependencies**: `npm install`

### Step 1: Setup Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your test wallet private key
# PRIVATE_KEY=0xYourTestWalletPrivateKey
# TREASURY_ADDRESS=0xYourTreasuryAddress (can be same as deployer)
# REVIEWERS=0xReviewer1,0xReviewer2
# VOTERS=0xVoter1,0xVoter2,0xVoter3
```

### Step 2: Deploy Contract
```bash
npm run deploy:testnet2
```
**Copy the deployed contract address** - you'll need this for the frontend.

### Step 3: Run Full Demo Flow
```bash
npm run demo:testnet2
```
This will:
- Submit an idea
- Open it for adoption
- Place bids with commitment stakes
- Start voting (60s window)
- Vote for a bid
- Finalize voting
- Fund the project
- Define milestones
- Approve milestone
- Withdraw payout

### Step 4: Run Funding Demo (Your Main Demo)
```bash
npm run demo:funding:testnet2
```
This demonstrates the exact flow you described:
- User selects approved project
- Funding sidebar appears
- User adjusts slider to set amount
- User clicks Fund button
- On-chain transaction executes
- Transaction hash displayed with explorer link

### Step 5: Connect Frontend
1. Add to your frontend `.env.local`:
```
NEXT_PUBLIC_REGENESIS_DAO_ADDRESS=0xYourDeployedContractAddress
```

2. Your frontend is already configured for Core Testnet2!

## 🎬 Video Demo Script (2-3 minutes)

### 1. Problem Statement (30s)
"Abandoned Web3 projects from hackathons represent lost innovation and wasted potential. ReGenesis DAO solves this by providing a platform for reviving these projects through community adoption and funding."

### 2. Solution Overview (30s)
"Users can submit abandoned projects, bidders compete to adopt them with commitment stakes, community votes on the best adoption plan, and milestone-based funding ensures accountability."

### 3. Live Demo (90s)
1. **Show deployed contract** on Core Testnet2 explorer
2. **Run funding demo**: `npm run demo:funding:testnet2`
3. **Highlight key features**:
   - Native tCORE2 funding
   - Real-time transaction confirmation
   - Explorer verification
   - Milestone-based escrow

### 4. Technical Highlights (30s)
- Built on Core Blockchain (EVM + Bitcoin security)
- Solidity 0.8.24 with Shanghai EVM
- On-chain voting and escrow
- Milestone-based payouts with reviewer approvals

## 🔗 Important Links

- **Contract Explorer**: https://scan.test2.btcs.network/address/YOUR_CONTRACT_ADDRESS
- **Core Testnet2 Faucet**: https://scan.test2.btcs.network/faucet
- **Core Documentation**: https://docs.coredao.org

## 📋 Demo Checklist

- [ ] Contract deployed on Core Testnet2
- [ ] Full demo flow completed
- [ ] Funding demo working
- [ ] Frontend connected
- [ ] Video recorded
- [ ] Explorer links working
- [ ] Transaction hashes visible

## 🎯 Key Demo Points

1. **100% on-chain** - No off-chain dependencies
2. **Core Testnet2 native** - Uses tCORE2 tokens
3. **Real transactions** - Live blockchain interactions
4. **Verifiable** - All actions visible on explorer
5. **Complete flow** - From idea submission to funding

## 🚨 Troubleshooting

**If deployment fails:**
- Check you have tCORE2 tokens
- Verify private key is correct
- Ensure network connectivity

**If demo fails:**
- Check contract address is set in .env
- Ensure voting window has passed
- Verify signers have sufficient balance

## 🏆 Hackathon Submission

Your project demonstrates:
- ✅ **BTCfi/DeFi**: Milestone escrow + slashing mechanisms
- ✅ **Infrastructure**: On-chain governance and funding rails
- ✅ **Social/Gaming/AI**: Platform for reviving projects in these categories
- ✅ **Core Integration**: Native tCORE2 support and Core blockchain features

**Good luck with your hackathon submission! 🚀** 