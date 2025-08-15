import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { defineChain } from "viem";

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

// Define Core Mainnet chain
const core = defineChain({
  id: 1116,
  name: "Core",
  nativeCurrency: {
    decimals: 18,
    name: "Core",
    symbol: "CORE",
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/core"] },
  },
  blockExplorers: {
    default: { name: "Core Explorer", url: "https://scan.coredao.org" },
  },
});

export const config = getDefaultConfig({
  appName: "EchoDAO",
  projectId: "9081832e9ecc568104cd2513f53b54d4",
  chains: [coreTestnet2, core],
  transports: {
    [coreTestnet2.id]: http(process.env.NEXT_PUBLIC_CORE_TESTNET2_RPC_URL || "https://rpc.test2.btcs.network"),
    [core.id]: http("https://rpc.ankr.com/core"),
  },
});

