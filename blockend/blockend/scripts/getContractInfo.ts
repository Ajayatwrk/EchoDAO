import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0x...";
  
  if (CONTRACT_ADDRESS === "0x...") {
    console.log("Please set CONTRACT_ADDRESS in your .env file");
    return;
  }

  const CoreFundDemo = await ethers.getContractFactory("CoreFundDemo");
  const contract = CoreFundDemo.attach(CONTRACT_ADDRESS);

  console.log("=== CoreFundDemo Contract Information ===");
  console.log(`Contract Address: ${CONTRACT_ADDRESS}`);
  console.log(`Network: Core Testnet2 (Chain ID: 1114)`);
  console.log(`Explorer: https://scan.test2.btcs.network/address/${CONTRACT_ADDRESS}`);
  
  // Get contract state
  const projectCount = await contract.projectCount();
  console.log(`\nTotal Projects: ${projectCount}`);
  
  // Get project details if any exist
  if (projectCount > 0) {
    console.log("\n=== Project Details ===");
    for (let i = 1; i <= Number(projectCount); i++) {
      try {
        const project = await contract.getProject(i);
        console.log(`\nProject ${i}:`);
        console.log(`  Name: ${project.name}`);
        console.log(`  Description: ${project.description}`);
        console.log(`  Owner: ${project.owner}`);
        console.log(`  Total Funding: ${ethers.formatEther(project.totalFunding)} tCORE2`);
      } catch (error) {
        console.log(`Error getting project ${i}:`, error);
      }
    }
  }
  
  console.log("\n=== Frontend Configuration ===");
  console.log("Add this to your .env.local file:");
  console.log(`NEXT_PUBLIC_COREFUND_DEMO_ADDRESS=${CONTRACT_ADDRESS}`);
  console.log(`NEXT_PUBLIC_CORE_TESTNET2_RPC=https://rpc.test2.btcs.network`);
  console.log(`NEXT_PUBLIC_CORE_TESTNET2_EXPLORER=https://scan.test2.btcs.network`);
  
  console.log("\n=== Demo Instructions ===");
  console.log("1. Contract is deployed and ready");
  console.log("2. Frontend is configured with contract address");
  console.log("3. Test funding flow on your frontend");
  console.log("4. Show transaction hashes to judges");
}

main().catch((e) => { 
  console.error(e); 
  process.exit(1); 
}); 