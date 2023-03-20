pragma solidity ^0.8.8;

contract Fundraising {
    uint256 public targetAmount;
    address public owner;
    mapping(address => uint256) public donations; //hash table, dictionary와 유사. address타입의 key와 uint356타입의 value
    uint256 public raisedAmount = 0;
    uint256 public finishTime = block.timestamp + 2 weeks;

    constructor(uint256 _targetAmount) {
        targetAmount = _targetAmount;
        owner = msg.sender; //컨트랙 작성자의 주소
    }

    receive() external payable {
        //external키워드는 컨트랙 외부에서만 호출할 수 있음을 의미
        //payable 키워드는 이 함수가 돈을 받을 수 있음을 의미
        require(block.timestamp < finishTime, "This campaign is over");
        donations[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }

    function withdraw() external {
        require(
            msg.sender == owner,
            "Funds will only be released to the owner"
        );
        require(block.timestamp >= finishTime, "The campaign is not over yet");
        require(
            raisedAmount >= targetAmount,
            "The project did not reach the goal"
        );
        payable(owner).transfer(raisedAmount);
    }

    function refund() external {
        require(block.timestamp >= finishTime, "The campaign is not over yet");
        require(raisedAmount < targetAmount, "The targetAmount achieved!");
        require(
            donations[msg.sender] > 0,
            "You did not donate to this campaign"
        );
        uint256 toRefund = donations[msg.sender];
        donations[msg.sender] = 0;
        payable(msg.sender).transfer(toRefund);
    }
}
