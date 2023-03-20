/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
const dotenv = require("dotenv");
dotenv.config();
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
