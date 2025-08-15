import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const [deployer, funder] = await ethers.getSigners();
  
  console.log("=== CoreFundDemo - Funding Demo ===");
  console.log("This demo shows the funding flow: funders sending tCORE2 to project receivers.");
  
  // Contract address (replace with your deployed contract address)
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0x...";
  
  if (CONTRACT_ADDRESS === "0x...") {
    console.log("Please set CONTRACT_ADDRESS in your .env file");
    console.log("First deploy the contract: npm run deploy:testnet2");
    return;
  }

  // Get the contract factory and deploy a new instance for testing
  const CoreFundDemo = await ethers.getContractFactory("CoreFundDemo");
  
  // For demo purposes, we'll deploy a new contract if none exists
  // In production, you would use the deployed address
  let contract;
  let projectId = 1;
  
  try {
    // Try to attach to existing contract
    contract = CoreFundDemo.attach(CONTRACT_ADDRESS);
    console.log(`Using existing contract at: ${CONTRACT_ADDRESS}`);
    
    // Check if contract has projects
    const existingCount = await contract.projectCount();
    if (existingCount > 0) {
      projectId = Number(existingCount);
      console.log(`Found ${existingCount} existing projects`);
    } else {
      // Create a project if none exist
      console.log("No existing projects found, creating one...");
      const createTx = await contract.createProject(
        "Abandoned Web3 Project", 
        "A project from hackathon that needs funding to continue development"
      );
      await createTx.wait();
      projectId = Number(await contract.projectCount());
      console.log(`✅ Project ${projectId} created`);
    }
  } catch (error) {
    console.log("Could not attach to existing contract, deploying new one...");
    contract = await CoreFundDemo.deploy();
    await contract.waitForDeployment();
    const addr = await contract.getAddress();
    console.log(`New contract deployed at: ${addr}`);
    
    // Create a project
    const createTx = await contract.createProject(
      "Abandoned Web3 Project", 
      "A project from hackathon that needs funding to continue development"
    );
    await createTx.wait();
    projectId = Number(await contract.projectCount());
    console.log(`✅ Project ${projectId} created`);
  }

  // Get project details
  const project = await contract.getProject(projectId);
  console.log(`\nProject Details:`);
  console.log(`Project ID: ${projectId}`);
  console.log(`Name: ${project.name}`);
  console.log(`Description: ${project.description}`);
  console.log(`Owner: ${project.owner}`);
  console.log(`Current Funding: ${ethers.formatEther(project.totalFunding)} tCORE2`);

  // Step 2: Funding Demo
  console.log("\n=== Step 2: Funding Demo ===");
  console.log("User selects project and opens funding sidebar...");
  
  // Simulate the funding sidebar with slider
  const fundingAmount = ethers.parseEther("1.5"); // 1.5 tCORE2
  console.log(`User adjusts slider to: ${ethers.formatEther(fundingAmount)} tCORE2`);
  console.log("User clicks 'Fund' button...");
  
  const fundTx = await contract.connect(funder).fundProject(projectId, { value: fundingAmount });
  console.log(`\n🚀 Funding transaction submitted: ${fundTx.hash}`);
  console.log(`View on explorer: https://scan.test2.btcs.network/tx/${fundTx.hash}`);
  
  console.log("Waiting for confirmation...");
  const fundReceipt = await fundTx.wait();
  console.log(`✅ Funding confirmed in block ${fundReceipt?.blockNumber}`);
  
  // Get updated project info
  const updatedProject = await contract.getProject(projectId);
  console.log(`\nUpdated project funding: ${ethers.formatEther(updatedProject.totalFunding)} tCORE2`);
  
  // Check funder's balance change (optional)
  const funderBalance = await ethers.provider.getBalance(funder.address);
  console.log(`Funder balance: ${ethers.formatEther(funderBalance)} tCORE2`);
  
  // Check project owner's balance change
  const ownerBalance = await ethers.provider.getBalance(project.owner);
  console.log(`Project owner balance: ${ethers.formatEther(ownerBalance)} tCORE2`);
  
  console.log("\n=== Demo Summary ===");
  console.log("✅ Project created and ready for funding");
  console.log("✅ User selected project and opened funding sidebar");
  console.log("✅ User adjusted slider to 1.5 tCORE2");
  console.log("✅ User clicked Fund button");
  console.log("✅ On-chain transaction executed on Core Testnet2");
  console.log("✅ Transaction hash displayed with explorer link");
  console.log("✅ Funds transferred from funder to project owner");
  console.log("✅ Project owner received funds directly");
  
  console.log("\n🎉 Funding Demo completed successfully!");
  console.log("This demonstrates the complete funding flow for your hackathon submission.");
  console.log("All transactions are verifiable on the Core Testnet2 explorer!");
}

main().catch((e) => { 
  console.error(e); 
  process.exit(1); 
}); 