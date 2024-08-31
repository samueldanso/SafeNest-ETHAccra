import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

// USDC addresses for the specified networks
const USDC_ADDRESSES: { [key: string]: string } = {
  sepolia: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  "optimism-sepolia": "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
  "lisk-sepolia": "0x348D43dD0186e7dD2494E8E115D6B611498f7eE0",
};

/**
 * Deploys a contract named "SafeNest" using the deployer account and
 * constructor arguments set to the USDC address for the given network
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deploySafeNest: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const networkName = hre.network.name;
  const usdcAddress = USDC_ADDRESSES[networkName];

  if (!usdcAddress) {
    throw new Error(
      `Unsupported network: ${networkName}. Please deploy on Sepolia, Optimism Sepolia, or Lisk Sepolia.`,
    );
  }

  console.log(`Deploying SafeNest to ${networkName} with USDC address: ${usdcAddress}`);

  await deploy("SafeNest", {
    from: deployer,
    args: [usdcAddress],
    log: true,
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const safeNest = await hre.ethers.getContract<Contract>("SafeNest", deployer);
  console.log("SafeNest deployed. USDC address:", await safeNest.usdcToken());
};

export default deploySafeNest;
