/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
module.exports = {
  networks: {
    goeril: {
      url: "https://ethereum-goerli-rpc.allthatnode.com/[Your API KEY]",
    },
  },
  solidity: "0.8.8",
};
