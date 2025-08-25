const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("🚀 Deploying from:", deployer.address);

  // 1. Deploy DreamMemeToken (DMT)
  const Token = await hre.ethers.getContractFactory("DMT");
  const token = await Token.deploy(1000000n * 10n ** 18n); // 1M supply
  await token.deployed();
  console.log("✅ DreamMemeToken deployed at:", token.address);

  // 2. Deploy Vault with token address
  const Vault = await hre.ethers.getContractFactory("DMTVault");
  const vault = await Vault.deploy(token.address);
  await vault.deployed();
  console.log("✅ DMTVault deployed at:", vault.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
