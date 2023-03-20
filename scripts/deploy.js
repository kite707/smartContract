const { ethers } = require("hardhat");
async function main() {
  const Fundraising = await ethers.getContractFactory("Fundraising"); //Fundraising 컨트랙을 가져와서 컴파일 한다.
  const contract = await Fundraising.deploy(100000000000000000000); //100000000000000000000이라는 인자와 함께 배포한다. 해당 인자는 Fundraising 컨트랙에 전달된다. 이 프로젝트에서는 목표금액을 의미한다.
  console.log("Contract address is: ", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
