import WalletButton from "../components/WalletButton";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16">
      {/* Hero */}
      <section className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 inline-block border-4 border-black px-4 md:px-6 py-2 shadow-[8px_8px_0px_black] bg-yellow-300 text-black">
          Welcome to EchoDAO
        </h1>
        <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
          Revive your Web3 projects with community voting, automated funding, and contributor rewards.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <WalletButton />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto mt-16 grid gap-6 md:grid-cols-3">
        <div className="border-4 border-black bg-white text-black p-6 shadow-[8px_8px_0px_black]">
          <h3 className="text-2xl font-extrabold mb-2">Quadratic Voting</h3>
          <p className="text-base">
            Fair, community-driven selection of projects to resurrect. Votes cost grows with weight to curb whales.
          </p>
        </div>

        <div className="border-4 border-black bg-white text-black p-6 shadow-[8px_8px_0px_black]">
          <h3 className="text-2xl font-extrabold mb-2">Automated Funding</h3>
          <p className="text-base">
            Donate any token. OKX DEX converts to USDC and funds the project treasury when thresholds are met.
          </p>
        </div>

        <div className="border-4 border-black bg-white text-black p-6 shadow-[8px_8px_0px_black]">
          <h3 className="text-2xl font-extrabold mb-2">Contributor Rewards</h3>
          <p className="text-base">
            Mint Contribution NFTs that encode share weights. Earn ongoing revenue splits for your work.
          </p>
        </div>
      </section>
    </main>
  );
}
