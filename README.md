# SmartContract
https://www.youtube.com/watch?v=8WBvMEql6SQ&ab_channel=%EB%85%B8%EB%A7%88%EB%93%9C%EC%BD%94%EB%8D%94NomadCoders
<br>
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
![image](https://user-images.githubusercontent.com/70741257/230558641-77829901-8a21-4e55-99fd-515d7fe0fcd4.png)


2. 기본 옵션으로 진행
![image](https://user-images.githubusercontent.com/70741257/230558537-748ac9a4-1ec9-46ae-a6cc-24352826ca94.png)


3. 생성한 프로젝트로 들어가 우측 Add Protocol 버튼 누르고 Ethereum 선택
![image](https://user-images.githubusercontent.com/70741257/230558752-7fdc57e5-b642-4cb3-bafa-7cd9b5883dc7.png)


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
![image](https://user-images.githubusercontent.com/70741257/230558851-ed2853d7-4885-459b-a3ac-c1a3ff98f9ce.png)


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
![image](https://user-images.githubusercontent.com/70741257/230559198-808944fa-e3f8-4ac4-952c-542cb58c2230.png)


### 배포된 컨트랙과 상호작용 하기

1. Ether Scan에서 Contract Creation을 눌러 해당 컨트랙 상세 보기 페이지로 접근
![image](https://user-images.githubusercontent.com/70741257/230559215-b3976cd8-dc2c-4caf-90a7-7ee974d8288d.png)


2. 해당 페이지 상단 컨트랙 주소 복사
![image](https://user-images.githubusercontent.com/70741257/230559246-3997269b-8fac-4fca-ba87-c7899663ed2f.png)


3. 복사한 주소로 이더 전송
<img width="665" alt="image" src="https://user-images.githubusercontent.com/70741257/230560144-57997ad4-07db-4147-b217-2749d0274af6.png">


<br>
보내기 누르고 컨트랙 주소 입력, 0.001ETH 전송
</p>

4. 컨트랙 상세 페이지 확인
![image](https://user-images.githubusercontent.com/70741257/230560205-870d04bf-79b1-4ccb-9d62-99dc492abe4c.png)

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

<br><br>

![image](https://user-images.githubusercontent.com/70741257/230560286-2a16bbb2-7406-454b-9d05-c65f3c85d361.png)
값이 16진수로 출력되고 있는 모습.
<br>
![image](https://user-images.githubusercontent.com/70741257/230560335-32777dbe-1d97-4db1-b23e-c432e53fde90.png)
코드 수정 후 10진수로 출력되는 모습.

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
