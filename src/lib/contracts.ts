// Contract configuration for EchoDAO frontend integration
import { createPublicClient, http, getContract, parseAbi } from 'viem';
import { sepolia } from 'viem/chains';

// Contract ABIs
export const CONTRIBUTION_NFT_ABI = parseAbi([
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function balanceOf(address owner) view returns (uint256)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function tokenURI(uint256 tokenId) view returns (string)',
  'function getNFTData(uint256 tokenId) view returns (address owner, address projectId, uint256 weight, string role, uint256 timestamp)',
  'function getNFTsByOwner(address owner) view returns (uint256[])',
  'function getNFTsByProject(address projectId) view returns (uint256[])',
  'function shareWeight(uint256 tokenId) view returns (uint256)',
  'function projectIdOf(uint256 tokenId) view returns (address)',
  'function roleOf(uint256 tokenId) view returns (string)',
  'function mintedAt(uint256 tokenId) view returns (uint256)',
  'event ContributionMinted(address indexed to, uint256 indexed tokenId, address indexed projectId, uint256 weight, string role)',
]);

export const IDEA_CONTRACT_ABI = parseAbi([
  'function poster() view returns (address)',
  'function ipfsHash() view returns (string)',
  'function fundingTarget() view returns (uint256)',
  'function fundingDeadline() view returns (uint256)',
  'function usdc() view returns (address)',
  'function contributionNFT() view returns (address)',
  'function fundingRaised() view returns (uint256)',
  'function activated() view returns (bool)',
  'function failed() view returns (bool)',
  'function activationTimestamp() view returns (uint256)',
  'function donorBalance(address donor) view returns (uint256)',
  'function totalShareWeight() view returns (uint256)',
  'function tokenShareWeight(uint256 tokenId) view returns (uint256)',
  'function fund(uint256 amount)',
  'function markFailed()',
  'function claimRefund()',
  'function registerAndMintContribution(address contributor, uint256 shareWeight, string role) returns (uint256)',
  'function updateMetadata(string ipfsHash)',
  'function getProjectStatus() view returns (bool _activated, bool _failed, uint256 _fundingRaised, uint256 _fundingTarget, uint256 _fundingDeadline, uint256 _activationTimestamp, uint256 _totalShareWeight)',
  'function getDonorInfo(address donor) view returns (uint256 balance, bool hasDonated)',
  'function getAllDonors() view returns (address[])',
  'function getFundingProgress() view returns (uint256)',
  'function canActivate() view returns (bool)',
  'function isInFundingPeriod() view returns (bool)',
  'event FundingReceived(address indexed donor, uint256 amount, uint256 totalRaised)',
  'event ProjectActivated(uint256 totalRaised, uint256 timestamp)',
  'event RefundClaimed(address indexed donor, uint256 amount)',
  'event ContributionRegistered(address indexed contributor, uint256 tokenId, uint256 shareWeight, string role)',
  'event ProjectFailed(uint256 timestamp)',
]);

export const GRAVEYARD_FACTORY_ABI = parseAbi([
  'function allProjects(uint256) view returns (address)',
  'function isProject(address) view returns (bool)',
  'function projectById(uint256) view returns (address)',
  'function contributionNFT() view returns (address)',
  'function usdc() view returns (address)',
  'function projectCreationFee() view returns (uint256)',
  'function factoryPaused() view returns (bool)',
  'function totalProjectsCreated() view returns (uint256)',
  'function totalProjectsActivated() view returns (uint256)',
  'function totalProjectsFailed() view returns (uint256)',
  'function createIdeaContract(string ipfsHash, uint256 fundingTarget, uint256 fundingDeadline) payable returns (address)',
  'function updateProjectMetadata(address projectAddress, string newIpfsHash)',
  'function getProjectInfo(address projectAddress) view returns (string metadata, bool exists, uint256 projectId)',
  'function getAllProjects() view returns (address[] projects, string[] metadata, uint256[] projectIds)',
  'function getProjectsByPoster(address poster) view returns (address[])',
  'function getProjectsByStage(uint8 stage) view returns (address[])',
  'function getFactoryStats() view returns (uint256 totalCreated, uint256 totalActive, uint256 totalFailed, uint256 creationFee)',
  'function projectsCount() view returns (uint256)',
  'function getProject(uint256 index) view returns (address)',
  'function isValidProject(address project) view returns (bool)',
  'event ProjectCreated(address indexed projectAddress, address indexed poster, string ipfsHash, uint256 fundingTarget, uint256 deadline, uint256 projectId)',
  'event ProjectActivated(address indexed projectAddress, uint256 timestamp)',
  'event ProjectFailed(address indexed projectAddress, uint256 timestamp)',
]);

export const MOCK_USDC_ABI = parseAbi([
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  'function mint(address to, uint256 amount)',
  'function burn(uint256 amount)',
  'function maxSupply() view returns (uint256)',
  'function remainingMintableSupply() view returns (uint256)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event Minted(address indexed to, uint256 amount)',
  'event Burned(address indexed from, uint256 amount)',
]);

// Contract addresses (update these after deployment)
export const CONTRACT_ADDRESSES = {
  // Update these addresses after running the deployment script
  CONTRIBUTION_NFT: '0x...', // ContributionNFT contract address
  GRAVEYARD_FACTORY: '0x...', // GraveyardFactory contract address
  MOCK_USDC: '0x...', // MockUSDC contract address
} as const;

// Viem client for blockchain interactions
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

// Contract instances
export const getContributionNFTContract = (address: string) => {
  return getContract({
    address: address as `0x${string}`,
    abi: CONTRIBUTION_NFT_ABI,
    publicClient,
  });
};

export const getIdeaContract = (address: string) => {
  return getContract({
    address: address as `0x${string}`,
    abi: IDEA_CONTRACT_ABI,
    publicClient,
  });
};

export const getGraveyardFactoryContract = (address: string) => {
  return getContract({
    address: address as `0x${string}`,
    abi: GRAVEYARD_FACTORY_ABI,
    publicClient,
  });
};

export const getMockUSDCContract = (address: string) => {
  return getContract({
    address: address as `0x${string}`,
    abi: MOCK_USDC_ABI,
    publicClient,
  });
};

// Helper functions for contract interactions
export const formatUSDC = (amount: bigint, decimals: number = 6) => {
  return Number(amount) / Math.pow(10, decimals);
};

export const parseUSDC = (amount: number, decimals: number = 6) => {
  return BigInt(Math.floor(amount * Math.pow(10, decimals)));
};

export const formatETH = (amount: bigint) => {
  return Number(amount) / Math.pow(10, 18);
};

export const parseETH = (amount: number) => {
  return BigInt(Math.floor(amount * Math.pow(10, 18)));
};
