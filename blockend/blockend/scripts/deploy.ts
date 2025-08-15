import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // Deploy CoreFundDemo contract
  const CoreFundDemo = await ethers.getContractFactory("CoreFundDemo");
  const c = await CoreFundDemo.deploy();
  await c.waitForDeployment();

  const addr = await c.getAddress();
  console.log("CoreFundDemo deployed at:", addr);

  console.log("\n=== Add this to your .env file ===");
  console.log(`CONTRACT_ADDRESS=${addr}`);
  
  console.log("\n=== Next Steps ===");
  console.log("1) Add CONTRACT_ADDRESS to your .env file");
  console.log("2) Run funding demo: npm run demo:funding:testnet2");
  console.log("3) View contract: https://scan.test2.btcs.network/address/" + addr);
}

main().catch((e) => { console.error(e); process.exit(1); }); 