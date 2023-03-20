/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
const dotenv = require("dotenv");
const { Contract } = require("ethers");
const { task } = require("hardhat/config");
dotenv.config();

task("check", "Check contract amounts", async () => {
  const [developer] = await ethers.getSigners();
  const contract = process.env.CONTRACT_ADDRESS;
  const abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_targetAmount",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "donations",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "finishTime",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "raisedAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "refund",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "targetAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ];
  const fundraising = new ethers.Contract(contract, abi, developer);
  targetAmount = await fundraising.targetAmount();
  raisedAmount = await fundraising.raisedAmount();
  console.log(parseInt(targetAmount), parseInt(raisedAmount));
});
module.exports = {
  networks: {
    goerli: {
      url:
        "https://ethereum-goerli-rpc.allthatnode.com/" +
        process.env.ALL_THAT_NODE_API_KEY,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
    },
  },
  solidity: "0.8.8",
};
