import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY.trim() === "") {
  throw new Error("❌ Missing PRIVATE_KEY in .env file");
}

const pk = process.env.PRIVATE_KEY.startsWith("0x")
  ? process.env.PRIVATE_KEY
  : `0x${process.env.PRIVATE_KEY}`;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      evmVersion: "shanghai"
    }
  },
  networks: {
    core_testnet2: {
      chainId: 1114,
      url: "https://rpc.test2.btcs.network",
      accounts: [pk]
    },
    core_mainnet: {
      chainId: 1116,
      url: "https://rpc.ankr.com/core",
      accounts: [pk]
    }
  },
  etherscan: {
    apiKey: {}
  }
};

export default config;
