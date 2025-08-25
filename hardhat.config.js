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

name: Deploy to SKALE Europa Hub

on:
  push:
    branches: [ "main" ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: |
          npm install

      - name: Deploy contracts to SKALE
        env:
          SKALE_RPC_URL: ${{ secrets.SKALE_RPC_URL }}
          SKALE_CHAIN_ID: ${{ secrets.SKALE_CHAIN_ID }}
          DEPLOYER_PRIVATE_KEY: ${{ secrets.DEPLOYER_PRIVATE_KEY }}
        run: |
          npx hardhat run scripts/deploy.js --network skale
