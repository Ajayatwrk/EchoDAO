import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("=== CoreFundDemo - Create Project ===");
  
  // Contract address (replace with your deployed contract address)
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0x...";
  
  let contract;
  
  if (CONTRACT_ADDRESS === "0x...") {
    console.log("No contract address provided, deploying new contract...");
    const CoreFundDemo = await ethers.getContractFactory("CoreFundDemo");
    contract = await CoreFundDemo.deploy();
    await contract.waitForDeployment();
    const addr = await contract.getAddress();
    console.log(`New contract deployed at: ${addr}`);
    console.log("Add this to your .env file: CONTRACT_ADDRESS=" + addr);
  } else {
    try {
      const CoreFundDemo = await ethers.getContractFactory("CoreFundDemo");
      contract = CoreFundDemo.attach(CONTRACT_ADDRESS);
      console.log(`Using existing contract at: ${CONTRACT_ADDRESS}`);
    } catch (error) {
      console.log("Could not attach to existing contract, deploying new one...");
      const CoreFundDemo = await ethers.getContractFactory("CoreFundDemo");
      contract = await CoreFundDemo.deploy();
      await contract.waitForDeployment();
      const addr = await contract.getAddress();
      console.log(`New contract deployed at: ${addr}`);
      console.log("Add this to your .env file: CONTRACT_ADDRESS=" + addr);
    }
  }

  // Create a project
  console.log("Creating project...");
  const createTx = await contract.createProject(
    "Abandoned Web3 Project", 
    "A project from hackathon that needs funding to continue development"
  );
  
  console.log(`Transaction submitted: ${createTx.hash}`);
  console.log(`View on explorer: https://scan.test2.btcs.network/tx/${createTx.hash}`);
  
  const receipt = await createTx.wait();
  console.log(`✅ Project created in block ${receipt?.blockNumber}`);
  
  const projectId = await contract.projectCount();
  console.log(`Project ID: ${projectId}`);
  
  // Get project details
  const project = await contract.getProject(projectId);
  console.log(`\nProject Details:`);
  console.log(`Name: ${project.name}`);
  console.log(`Description: ${project.description}`);
  console.log(`Owner: ${project.owner}`);
  console.log(`Total Funding: ${ethers.formatEther(project.totalFunding)} tCORE2`);
  
  console.log("\n🎉 Project created successfully!");
  console.log("Now you can run the funding demo: npm run demo:funding:testnet2");
}

main().catch((e) => { 
  console.error(e); 
  process.exit(1); 
}); 