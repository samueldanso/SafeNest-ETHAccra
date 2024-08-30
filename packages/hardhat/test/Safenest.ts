import { ethers } from "hardhat";
import { expect } from "chai";
import { SafeNest } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("SafeNest", function () {
  let safenest: SafeNest;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let usdcToken: any; // Mock USDC token

  const childId = ethers.keccak256(ethers.toUtf8Bytes("testChild"));
  const withdrawalDate = Math.floor(Date.now() / 1000) + 86400 * 365 * 18; // 18 years from now

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy mock USDC token
    const MockToken = await ethers.getContractFactory("MockUSDC");
    usdcToken = await MockToken.deploy();

    // Deploy SafeNest contract
    const SafeNest = await ethers.getContractFactory("SafeNest");
    safenest = await SafeNest.deploy(usdcToken.address);

    // Mint some USDC to addr1
    await usdcToken.mint(addr1.address, ethers.parseUnits("1000", 6));
    await usdcToken.connect(addr1).approve(safenest.address, ethers.parseUnits("1000", 6));
  });

  describe("Account Creation", function () {
    it("Should create a child account", async function () {
      await expect(safenest.connect(addr1).createChildAccount(childId, withdrawalDate))
        .to.emit(safenest, "ChildAccountCreated")
        .withArgs(addr1.address, childId, withdrawalDate);
    });

    it("Should not allow creating duplicate child accounts", async function () {
      await safenest.connect(addr1).createChildAccount(childId, withdrawalDate);
      await expect(safenest.connect(addr1).createChildAccount(childId, withdrawalDate)).to.be.revertedWith(
        "Child account already exists",
      );
    });
  });

  describe("Deposits", function () {
    beforeEach(async function () {
      await safenest.connect(addr1).createChildAccount(childId, withdrawalDate);
    });

    it("Should allow deposits to a child account", async function () {
      const depositAmount = ethers.parseUnits("100", 6);
      await expect(safenest.connect(addr1).deposit(childId, depositAmount))
        .to.emit(safenest, "Deposit")
        .withArgs(addr1.address, childId, depositAmount);

      const balance = await safenest.getChildBalance(addr1.address, childId);
      expect(balance).to.equal(depositAmount);
    });
  });

  describe("Withdrawals", function () {
    beforeEach(async function () {
      await safenest.connect(addr1).createChildAccount(childId, withdrawalDate);
      await safenest.connect(addr1).deposit(childId, ethers.parseUnits("100", 6));
    });

    it("Should not allow withdrawals before the withdrawal date", async function () {
      await expect(safenest.connect(addr2).withdraw(addr1.address, childId)).to.be.revertedWith(
        "Withdrawal date not reached",
      );
    });

    it("Should allow withdrawals after the withdrawal date", async function () {
      await ethers.provider.send("evm_increaseTime", [86400 * 365 * 18]);
      await ethers.provider.send("evm_mine", []);

      await expect(safenest.connect(addr2).withdraw(addr1.address, childId))
        .to.emit(safenest, "Withdrawal")
        .withArgs(addr2.address, childId, ethers.parseUnits("100", 6));
    });
  });

  describe("Emergency Withdrawals", function () {
    beforeEach(async function () {
      await safenest.connect(addr1).createChildAccount(childId, withdrawalDate);
      await safenest.connect(addr1).deposit(childId, ethers.parseUnits("100", 6));
    });

    it("Should allow emergency withdrawals by the parent", async function () {
      const withdrawAmount = ethers.parseUnits("50", 6);
      await expect(safenest.connect(addr1).emergencyWithdraw(childId, withdrawAmount))
        .to.emit(safenest, "EmergencyWithdrawal")
        .withArgs(addr1.address, childId, withdrawAmount);

      const balance = await safenest.getChildBalance(addr1.address, childId);
      expect(balance).to.equal(ethers.parseUnits("50", 6));
    });
  });
});
