"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WalletButton() {
  const { isConnected } = useAccount();
  const router = useRouter();

  // Navigate to dashboard when wallet is successfully connected
  useEffect(() => {
    if (isConnected) {
      router.push('/projects');
    }
  }, [isConnected, router]);

  return (
    <div className="[&_.connect-button]:!bg-yellow-300 [&_.connect-button]:!text-black [&_.connect-button]:!border-4 [&_.connect-button]:!border-black [&_.connect-button]:!shadow-[6px_6px_0px_black] [&_.connect-button]:!rounded-none [&_.connect-button]:!font-extrabold [&_.connect-button]:!tracking-wide [&_.connect-button]:!uppercase [&_.connect-button]:!px-8 [&_.connect-button]:!py-3 [&_.connect-button]:!text-lg [&_.connect-button:hover]:!bg-yellow-400 [&_.connect-button:hover]:!translate-x-[2px] [&_.connect-button:hover]:!translate-y-[2px] [&_.connect-button:hover]:!shadow-[4px_4px_0px_black] [&_.connect-button]:!transition-all [&_.connect-button]:!duration-200">
      <ConnectButton
        showBalance={false}
        label="Connect Wallet"
      />
    </div>
  );
}
