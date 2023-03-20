# smartContract

Practice making smart contract with Nomad Coder.

## 목표

펀딩 프로그램을 관장하는 스마트 컨트랙 만들기

- 프로젝트의 오너, 목표 금액, 프로젝트에 기부한 사람들의 목록, 그들의 구매금액, 기부금의 누적 총액, 데드라인
- 데드라인 도달 시 기부금 총액>=목표금액일 경우 돈은 프로젝트 오너에게 전달 -기부금 총액<목표금액일 경우 돈은 기부자들에게 환불

  ## References

  - Solidity types
    https://docs.soliditylang.org/en/v0.8.19/types.html#types
  - Solidity iteration
    https://docs.soliditylang.org/en/v0.8.19/types.html#iterable-mappings

  ***

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

  ### 블록체인 계정 생성

  컨트랙 배포 및 지갑에 기부된 돈 수령 위함

  1. MetaMask Extension 추가
     https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn
  2. 새 지갑 생성 클릭 및 지갑 생성
  3. 설정 -> 고급 -> 테스트 네트워크 보기 기능 활성화
  <p align="center"><img src="https://user-images.githubusercontent.com/70741257/226253459-bb68560d-b0a5-4a93-a85b-f058b4aa13f3.png" width="60%" height="60%"><img src="https://user-images.githubusercontent.com/70741257/226253513-f019d490-1ed9-49c7-a953-16d1ea7db1c1.png" width="40%" height="40%"></p>

  ### 테스트 이더 생성

  1. All that Node Faucet으로 이동
     <br>
     https://www.allthatnode.com/faucet/ethereum.dsrv
     - 해당 사이트가 막혀서 아래 사이트에서 진행
       <br>
       https://goerlifaucet.com/
  2. 메타마스크 주소 넣고 테스트이더 받기
  <p align="center"><img src="https://user-images.githubusercontent.com/70741257/226253611-309ce151-855d-4650-9904-67e9ed6614c2.png" width="60%"/><br>메타마스크 상단에 지갑 주소 복사 버튼이 있다.</p>

<br>

### All that Node Project 생성

1. All that Node 상단 dashboard - Create New Project 클릭
<p align="center"><img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c2168408-a9a0-4c4e-958c-5781221b2ba5/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230320T055758Z&X-Amz-Expires=86400&X-Amz-Signature=c6f865b53ec48d777e0aecb0f4d304a503d5f037a9a18c929c912bc102fe3794&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" width="60%"/></p>

2. 기본 옵션으로 진행
<p align="center"><img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0d888cf3-3070-47e1-9c27-e7cc39205af6/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230320T055933Z&X-Amz-Expires=86400&X-Amz-Signature=9f8f47e21937ac4b23c355193cde4ab286b611302afb24e4aee34fda2119f4af&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" width="60%"></p>

3. 생성한 프로젝트로 들어가 우측 Add Protocol 버튼 누르고 Ethereum 선택
<p align="center"><img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/52a8e50e-00a3-4631-8dfc-0c5140f852a6/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230320T060220Z&X-Amz-Expires=86400&X-Amz-Signature=8505dc2500b3405b56bfec11f2deb270cd47aac943085801854785f259ffb888&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" width="60%"></p>

4. Goeril RPC 복사해 hardhat.config.js에 추가

```
networks: {
    goeril: {
      url: "Goeril RPC 링크/API Key",
    },
  },
```
url에 Goeril RPC/API Key 형식으로 추가하면 된다.
