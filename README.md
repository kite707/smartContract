# smartContract
https://www.youtube.com/watch?v=8WBvMEql6SQ&ab_channel=%EB%85%B8%EB%A7%88%EB%93%9C%EC%BD%94%EB%8D%94NomadCoders
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

4. Goerli RPC 복사해 hardhat.config.js에 추가

```js
networks: {
    goerli: {
      url: "Goerli RPC 링크/API Key",
    },
  },
```

url에 Goerli RPC/API Key 형식으로 추가하면 된다.

### HardHat에서 지갑 관리하도록 하기

현재는 MetaMask에서 지갑을 관리하고 있다. HardHat에서도 지갑을 관리할 수 있도록 해주자.

1. MetaMask에서 계정 세부정보 - 비공개 키 내보내기 - 비밀번호 입력. 나온 Private Key 복사
2. .env 파일 만들어 Private Key 저장
.env파일 만들기가 귀찮다면 아래와 같이 바로 붙여넣기 해도 작동은 한다. 보안상 추천하지 않는다.
<p align="center"><img width="60%" src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/956b770e-1d8d-4590-9cea-c3109c59daab/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230320T062626Z&X-Amz-Expires=86400&X-Amz-Signature=c8c89d1cb2234c87b1577ce83319f01f0a5ece9cb978d372fe8dcf729165ee11&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject"/><br>출처 : 노마드코더</p>

### 배포 코드 작성

이제 작성한 컨트랙 코드를 배포해보자.

1. scripts폴더 만들고 안에 deploy.js 생성
2. deploy.js에 아래 코드 작성

```js
const { ethers } = require("hardhat");

async function main() {
  const Fundraising = await ethers.getContractFactory("Fundraising"); //Fundraising 컨트랙을 가져와서 컴파일 한다.
  const contract = await Fundraising.deploy(100); //100이라는 인자와 함께 배포한다. 해당 인자는 Fundraising 컨트랙에 전달된다. 이 프로젝트에서는 목표금액을 의미한다.
  console.log("Contract address is: ", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

**1 Ether = 1,000,000,000,000,000,000 WEI**

3. 아래 코드 커맨드창에 입력

```
npx hardhat run scripts/deploy.js --network goerli
```

4. 성공할 경우 콘솔 창에 contract address가 출력된다. 에러가 났을 경우 아래 [ERRORS](#errors) 참고
5. 이제 메타마스크를 통해 Ether Scan에 들어가면 배포된 컨트랙을 확인할 수 있다.
<p align="center"><img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5ef61dd4-6685-4f0c-a2a0-4b6ff36ea8bd/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230320T080101Z&X-Amz-Expires=86400&X-Amz-Signature=0aeb7eb5c1645aa341f13c8fcd68b3185bd23eaeb505593ff287ba63721aa6bf&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" width="60%"></p>

### 배포된 컨트랙과 상호작용 하기

1. Ether Scan에서 Contract Creation을 눌러 해당 컨트랙 상세 보기 페이지로 접근
<p align="center"><img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b459233f-9c45-4bde-95b1-ba1826473f6e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230320T080853Z&X-Amz-Expires=86400&X-Amz-Signature=49cb9146523de720036f36cd1a1ed587860dfa9a2bd6c91378d92199c7066212&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" width="60%"></p>

2. 해당 페이지 상단 컨트랙 주소 복사
<p align="center"><img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b459233f-9c45-4bde-95b1-ba1826473f6e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230320T080853Z&X-Amz-Expires=86400&X-Amz-Signature=49cb9146523de720036f36cd1a1ed587860dfa9a2bd6c91378d92199c7066212&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" width="60%"></p>

3. 복사한 주소로 이더 전송
<p align="center"><img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b4343e02-994d-4c2d-88aa-2db96dc19b7d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230320T083113Z&X-Amz-Expires=86400&X-Amz-Signature=764a5c891f8a5013f3a6c2797d6924ff954974b87391768255da5b81bdbeaef5&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" width="60%">
<br>
보내기 누르고 컨트랙 주소 입력, 0.001ETH 전송
</p>

4. 컨트랙 상세 페이지 확인
<p align="center"><img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0e2a5404-9c26-45e9-8028-a8eb4c4c1737/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230320T083643Z&X-Amz-Expires=86400&X-Amz-Signature=d54343b46fc269f85d2300915ddf9154bd641dc4552b423a13ab41c754c91021&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" width="60%">
<br>
전송한 0.001ETH가 잘 들어와있는 것을 확인할 수 있다.
</p>

### 컨트랙 함수 실행해보기

1. hardhat.config.js에 아래 코드를 추가한다.
   abi값은 artifacts/contracts/Fundraising/Fundraising.json에서 찾을 수 있다.

```js
task("check", "Check contract amounts", async () => {
  const [developer] = await ethers.getSigners();
  const contract = process.env.CONTRACT_ADDRESS;
  const abi = [
    'artifacts/contracts/Fundraising/Fundraising.json의 "abi":[]하고 나와있는 부분',
  ];
  const fundraising = new ethers.Contract(contract, abi, developer);
  console.log(
    await fundraising.targetAmount(),
    await fundraising.raisedAmount()
  );
});
```

2. 아래 명령어를 실행하자

```
npx hardhat check --network goerli
```

3. targetAmount와 raisedAmount가 16진수로 출력되어서 10진수로 출력하기 위해 task를 조금 수정해주었다.

```js
task("check", "Check contract amounts", async () => {
  const [developer] = await ethers.getSigners();
  const contract = process.env.CONTRACT_ADDRESS;
  const abi = [
    'artifacts/contracts/Fundraising/Fundraising.json의 "abi":[]하고 나와있는 부분',
  ];
  const fundraising = new ethers.Contract(contract, abi, developer);

  //여기서부터 수정된 코드
  targetAmount = await fundraising.targetAmount();
  raisedAmount = await fundraising.raisedAmount();
  console.log(parseInt(targetAmount), parseInt(raisedAmount));
});
```

<p align="center"><img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1a27c230-6656-419a-8b30-3d4c8acd1770/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230320T085707Z&X-Amz-Expires=86400&X-Amz-Signature=b1e9a2e8c725aff20f23eba8095212e7cbccf9ae28520903509dab2fc6c060f9&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" width="60%">
<br>
값이 16진수로 출력되고 있는 모습.
</p>
<p align="center"><img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/77e04740-6aba-4447-8948-d44e29be0a90/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230320T085758Z&X-Amz-Expires=86400&X-Amz-Signature=6404ea4dba85f3c240b59bf8cde3f929020ad1f8c22f87975d3b83317e9b8fc5&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" width="60%">
<br>
코드 수정 후 10진수로 출력되는 모습.
</p>

### ERRORS

- Error: insufficient funds for intrinsic transaction cost<br>
  컨트랙을 배포하기에 테스트 이더가 부족해서 발생하는 에러. 아래 사이트에서 테스트이더를 모을 수 있다. <br>
  https://goerli-faucet.pk910.de/

- Error: overflow [ See: https://links.ethers.org/v5-errors-NUMERIC_FAULT-overflow ] <br>
  영상을 보고 100000000000000000000라는 숫자와 함께 배포했더니 아래 에러가 발생했다. 100으로 고쳐주었다.

- ProviderError: Too Many Requests error received from ethereum-goerli-rpc.allthatnode.com <br>
  All that Node 에서 현재 too many request라며 테스트 이더도 받을 수 없는 상태인데 말 그대로 너무 많은 요청이 와서 그런 것 같다. 잠시 뒤 실행하면 성공한다. 유저 문제가 아니다.

- TypeError: Cannot read properties of undefined (reading 'JsonRpcProvider')<br>
  이더리움 버전을 5.4이하로 낮추면 해결되는 오류이다. package.json에서 이더리움 버전을 5.4로 입력하고 npm install을 한 뒤 다시 시도해보자.<br>
  https://ethereum.stackexchange.com/questions/144451/typeerror-cannot-read-properties-of-undefined-reading-jsonrpcprovider
