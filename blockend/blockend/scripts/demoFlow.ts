import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

const ONE = ethers.parseEther("1.0");
const HALF = ethers.parseEther("0.5");

async function main() {
  const [deployer, bidder1, bidder2, funder] = await ethers.getSigners();

  // Deploy if not deployed
  const ReGenesis = await ethers.getContractFactory("ReGenesisDAO");
  const treasury = process.env.TREASURY_ADDRESS || deployer.address;
  const initialReviewers = (process.env.REVIEWERS || deployer.address).split(",");
  const voters = (process.env.VOTERS || deployer.address).split(",");
  const reviewerThreshold = Math.min(2, initialReviewers.length);

  const c = await ReGenesis.deploy(treasury, initialReviewers, reviewerThreshold, voters);
  await c.waitForDeployment();
  const addr = await c.getAddress();
  console.log("Deployed ReGenesisDAO:", addr);

  // 1) Submit idea
  const submitTx = await c.submitIdea(
    "ipfs://QmIdeaSummaryJSON", // include license details inside
    1,                          // License.Permissive
    ethers.id("license-proof-demo") // keccak256 of some text / file hash
  );
  const submitRc = await submitTx.wait();
  const ideaId = (await c.ideasCount()).toString();
  console.log("Idea submitted id=", ideaId);

  // 2) Open for adoption
  await (await c.openForAdoption(ideaId)).wait();
  console.log("Idea opened");

  // 3) Place bids from two bidders with commitment stakes
  // bidder1
  const cBidder1 = c.connect(bidder1);
  await (await cBidder1.placeBid(ideaId, "ipfs://QmPlanBidder1", { value: HALF })).wait();
  console.log("Bidder1 placed bid with 0.5 tCORE2 stake");

  // bidder2
  const cBidder2 = c.connect(bidder2);
  await (await cBidder2.placeBid(ideaId, "ipfs://QmPlanBidder2", { value: ONE })).wait();
  console.log("Bidder2 placed bid with 1.0 tCORE2 stake");

  // 4) Start voting (60s window)
  await (await c.startVoting(ideaId, 60)).wait();
  console.log("Voting started (60s)");

  // voters (deployer acts as allowlisted voter here) vote for bid #2
  await (await c.vote(ideaId, 2)).wait();
  console.log("Voted for bid #2");

  // Fast-forward time in local (when running against a local node); on testnet you'll just wait ~60s
  // await network.provider.send("evm_increaseTime", [61]);
  // await network.provider.send("evm_mine");

  console.log("Waiting ~60s on Testnet2 before finalize...");
  console.log("👉 Manually run this again after 60s, or call finalize from a block explorer.");

  // For demo we proceed assuming time passed (on real chain, call after 60s):
  // (If running immediately, this will revert; run again later.)
  try {
    await (await c.finalizeVoting(ideaId)).wait();
  } catch (e) {
    console.log("Finalize will work after voting window closes.");
  }

  // Assume bid #2 wins; define milestones
  // Fund idea escrow
  const cFunder = c.connect(funder);
  await (await cFunder.fundIdea(ideaId, { value: ethers.parseEther("3") })).wait();
  console.log("Idea funded with 3 tCORE2");

  // Define 3 milestones of 1 tCORE2 each
  await (await c.defineMilestones(
    ideaId,
    [ethers.parseEther("1"), ethers.parseEther("1"), ethers.parseEther("1")],
    "ipfs://QmMilestonesJSON"
  )).wait();
  console.log("Milestones defined");

  // Reviewer approvals for m0
  const reviewerAddresses = (process.env.REVIEWERS || "").split(",").filter(Boolean);
  for (const r of reviewerAddresses.slice(0, reviewerThreshold)) {
    const signer = await ethers.getSigner(r);
    await (await c.connect(signer).approveMilestone(ideaId, 0)).wait();
    console.log("Reviewer", r, "approved m0");
  }

  // Adopter withdraw m0 payout
  // We don't know adopter address until finalize; for demo we assume bidder2 is adopter.
  await (await c.connect(bidder2).withdrawApproved(ideaId)).wait();
  console.log("Adopter withdrew milestone #0 payout");
}

main().catch((e) => { console.error(e); process.exit(1); }); 