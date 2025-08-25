require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    skale: {
      url: process.env.SKALE_RPC_URL,
      chainId: Number(process.env.SKALE_CHAIN_ID),
      accounts: [process.env.DEPLOYER_PRIVATE_KEY]
    },
  },
};
