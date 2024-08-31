import { expect } from "chai";
import { ethers } from "hardhat";
import { SafeNest, USDCMock } from "../typechain-types";

describe("SafeNest", function () {
  let safeNest: SafeNest;
  let usdcMock: USDCMock;
  let owner: any;
  let parent: any;
  let child: any;

  before(async () => {
    [owner, parent, child] = await ethers.getSigners();

    // Deploy USDC Mock
    const USDCMockFactory = await ethers.getContractFactory("USDCMock");
    usdcMock = (await USDCMockFactory.deploy()) as USDCMock;
    await usdcMock.waitForDeployment();

    // Deploy SafeNest
    const SafeNestFactory = await ethers.getContractFactory("SafeNest");
    safeNest = (await SafeNestFactory.deploy(await usdcMock.getAddress())) as SafeNest;
    await safeNest.waitForDeployment();

    // Mint some USDC to the parent
    await usdcMock.mint(parent.address, ethers.parseUnits("1000", 6));
  });

  describe("Deployment", function () {
    it("Should set the right USDC token address", async function () {
      expect(await safeNest.usdcToken()).to.equal(await usdcMock.getAddress());
    });
  });

  describe("Child Account Creation", function () {
    it("Should allow creating a child account", async function () {
      const withdrawalDate = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60; // 1 year from now
      const childId = ethers.id("child1");
      await expect(safeNest.connect(parent).createChildAccount(childId, child.address, withdrawalDate))
        .to.emit(safeNest, "ChildAccountCreated")
        .withArgs(parent.address, childId, withdrawalDate);
    });
  });

  // Add more test cases for deposit, withdrawal, emergency withdrawal, etc.
});
