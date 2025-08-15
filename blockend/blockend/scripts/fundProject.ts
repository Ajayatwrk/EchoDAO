import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const [deployer, funder] = await ethers.getSigners();
  
  // Contract address (replace with your deployed contract address)
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0x...";
  
  if (CONTRACT_ADDRESS === "0x...") {
    console.log("Please set CONTRACT_ADDRESS in your .env file");
    return;
  }

  const ReGenesis = await ethers.getContractFactory("ReGenesisDAO");
  const contract = ReGenesis.attach(CONTRACT_ADDRESS);

  // For demo, we'll assume idea ID 1 has been voted on and approved
  const ideaId = 1;
  
  // Check if the idea has an adopter (meaning voting was finalized)
  const idea = await contract.ideas(ideaId);
  
  if (idea.adopter === ethers.ZeroAddress) {
    console.log("Idea has not been voted on yet. Please run the demo flow first.");
    return;
  }

  console.log(`Funding idea ${ideaId} with adopter: ${idea.adopter}`);
  console.log(`Current total funding: ${ethers.formatEther(idea.totalFunding)} tCORE2`);

  // Fund the project with 2 tCORE2
  const fundingAmount = ethers.parseEther("2.0");
  
  const fundTx = await contract.connect(funder).fundIdea(ideaId, { value: fundingAmount });
  console.log(`Funding transaction submitted: ${fundTx.hash}`);
  
  const receipt = await fundTx.wait();
  console.log(`Funding transaction confirmed in block ${receipt?.blockNumber}`);
  
  // Get updated idea info
  const updatedIdea = await contract.ideas(ideaId);
  console.log(`Updated total funding: ${ethers.formatEther(updatedIdea.totalFunding)} tCORE2`);
  
  console.log("\n🎉 Funding successful!");
  console.log(`Transaction hash: ${fundTx.hash}`);
  console.log(`View on explorer: https://scan.test2.btcs.network/tx/${fundTx.hash}`);
}

main().catch((e) => { 
  console.error(e); 
  process.exit(1); 
}); 