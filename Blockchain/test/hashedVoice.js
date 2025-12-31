const { expect } = require("chai")
const { ethers } = require("hardhat")


describe("HashedVoice Contract", function () {
  let HashedVoice;
  let hashedVoice;
  let admin;
  let voter;

  beforeEach(async function () {
    [admin, voter] = await ethers.getSigners()
    HashedVoice = await ethers.getContractFactory("HashedVoice")
    hashedVoice = await HashedVoice.deploy();
    await hashedVoice.waitForDeployment()
  })

  it("should deploy and set the correct admin", async function () {
    const contractAdmin = await hashedVoice.admin();
    expect(contractAdmin).to.equal(admin.address);
  })

  it("should allow admin to add a candidate", async function () {
    await hashedVoice.addCandidate("anurag")
    const count = await hashedVoice.candidatesCount();
    expect(count).to.equal(1)

    const candidate = await hashedVoice.candidates(1)
    expect(candidate.name).to.equal("anurag");
    expect(candidate.voteCount).to.equal(0)
  })

  it("should return candidates via getCandidates()", async function () {
    await hashedVoice.addCandidate("anurag");
    await hashedVoice.addCandidate("ravi");

    const candidates = await hashedVoice.getCandidates();

    expect(candidates.length).to.equal(2);
    expect(candidates[0].name).to.equal("anurag");
    expect(candidates[1].name).to.equal("ravi");
  });
})
