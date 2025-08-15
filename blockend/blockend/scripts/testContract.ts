import { ethers } from "hardhat";

async function main() {
  console.log("=== Testing CoreFundDemo Contract ===");
  
  // Deploy a fresh contract for testing
  const CoreFundDemo = await ethers.getContractFactory("CoreFundDemo");
  const contract = await CoreFundDemo.deploy();
  await contract.waitForDeployment();
  
  const addr = await contract.getAddress();
  console.log(`✅ Contract deployed at: ${addr}`);
  
  // Test project creation
  console.log("\n=== Testing Project Creation ===");
  const createTx = await contract.createProject(
    "Test Project", 
    "A test project for funding demo"
  );
  await createTx.wait();
  console.log("✅ Project created successfully");
  
  const projectCount = await contract.projectCount();
  console.log(`Total projects: ${projectCount}`);
  
  // Test getting project details
  console.log("\n=== Testing Project Details ===");
  const project = await contract.getProject(1);
  console.log(`Project 1: ${project.name} - ${project.description}`);
  console.log(`Owner: ${project.owner}`);
  console.log(`Funding: ${ethers.formatEther(project.totalFunding)} tCORE2`);
  
  // Test funding (with a small amount)
  console.log("\n=== Testing Funding ===");
  const [deployer, funder] = await ethers.getSigners();
  
  const fundingAmount = ethers.parseEther("0.1"); // 0.1 tCORE2
  const fundTx = await contract.connect(funder).fundProject(1, { value: fundingAmount });
  await fundTx.wait();
  console.log("✅ Project funded successfully");
  
  // Check updated funding
  const updatedProject = await contract.getProject(1);
  console.log(`Updated funding: ${ethers.formatEther(updatedProject.totalFunding)} tCORE2`);
  
  console.log("\n🎉 All tests passed! Contract is working correctly.");
  console.log(`Contract address: ${addr}`);
  console.log("Add this to your .env file: CONTRACT_ADDRESS=" + addr);
}

main().catch((e) => { 
  console.error(e); 
  process.exit(1); 
}); 