// Contract configuration for EchoDAO frontend integration
import { createPublicClient, http, getContract, parseAbi } from 'viem';
import { defineChain } from 'viem';

// Define Core Testnet2 chain
const coreTestnet2 = defineChain({
  id: 1114,
  name: "Core Testnet2",
  nativeCurrency: {
    decimals: 18,
    name: "Core",
    symbol: "tCORE2",
  },
  rpcUrls: {
    default: { http: ["https://rpc.test2.btcs.network"] },
  },
  blockExplorers: {
    default: { name: "Core Testnet2 Explorer", url: "https://scan.test2.btcs.network" },
  },
  testnet: true,
});

// CoreFundDemo Contract ABI (Funding Demo Only)
export const COREFUND_DEMO_ABI = parseAbi([
  'function createProject(string _name, string _description)',
  'function fundProject(uint256 _projectId) payable',
  'function getProject(uint256 _projectId) view returns (address owner, string name, string description, uint256 totalFunding)',
  'function projectCount() view returns (uint256)',
  'event ProjectCreated(uint256 indexed projectId, address indexed owner, string name, string description)',
  'event Funded(uint256 indexed projectId, address indexed funder, uint256 amount)',
]);

// Contract addresses (update these after deployment)
export const CONTRACT_ADDRESSES = {
  COREFUND_DEMO: process.env.NEXT_PUBLIC_COREFUND_DEMO_ADDRESS || '0x0000000000000000000000000000000000000000',
} as const;

// Viem client for blockchain interactions
export const publicClient = createPublicClient({
  chain: coreTestnet2,
  transport: http(),
});

// Contract instances
export const getCoreFundDemoContract = (address: string) => {
  return getContract({
    address: address as `0x${string}`,
    abi: COREFUND_DEMO_ABI,
    client: publicClient,
  });
};

// Helper functions for contract interactions
export const formatCORE = (amount: bigint) => {
  return Number(amount) / Math.pow(10, 18);
};

export const parseCORE = (amount: number) => {
  return BigInt(Math.floor(amount * Math.pow(10, 18)));
};

export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
