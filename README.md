# smartContract
Practice making smart contract with Nomad Coder.

## 목표
펀딩 프로그램을 관장하는 스마트 컨트랙 만들기
+ 프로젝트의 오너, 목표 금액, 프로젝트에 기부한 사람들의 목록, 그들의 구매금액, 기부금의 누적 총액, 데드라인
+ 데드라인 도달 시 
  -기부금 총액>=목표금액일 경우 돈은 프로젝트 오너에게 전달
  -기부금 총액<목표금액일 경우 돈은 기부자들에게 환불


  ## References
  + Solidity types
    https://docs.soliditylang.org/en/v0.8.19/types.html#types
  + Solidity iteration
    https://docs.soliditylang.org/en/v0.8.19/types.html#iterable-mappings
  

  -------
  ## Contract 배포

  ### 필요한 라이브러리 설치
  ```
  npm install -D hardhat

  npm install -D ethers

  npm install -D --legacy-peer-deps @nomiclabs/hardhat-ethers

  npm install -D --legacy-peer-deps @nomiclabs/hardhat-waffle
  ```

  ### hardhat 프로젝트 생성
  1. 
  ```
  npx hardhat
  ```

  2. create an empty hardhat.config.js 선택
  3. hardhat.config.js 파일의 solidity 버전을 Fundraising.sol 상단 pragma solidity 버전에 맞추기
  4. hardhat.config.js 파일에 require("@nomiclabs/hardhat-waffle") 추가
  