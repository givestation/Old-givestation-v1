// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";  //for maintenance withdraw

contract CampaignFactory is Ownable{
    bool private pause = false;
    address[] public deployedCampaigns;
    event SetContractStatus(address addr, bool pauseValue);

    modifier paused() {
        require(!pause, "Contract is paused");
        _;
    }

    function getContractStatus() external view returns (bool) {
        return pause;
    }

    function setContractStatus(bool _newPauseContract) external onlyOwner {
        pause = _newPauseContract;
        emit SetContractStatus(msg.sender, _newPauseContract);
    }

    function createCampaign(uint minimum, string memory name, string memory description, string memory image, uint target) public paused{
        address newCampaign = address(new Campaign(minimum, msg.sender, name, description, image, target, address(this)));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
    
    function setVerification(address payable campaignAddr, bool flag) external onlyOwner {
        Campaign one = Campaign(campaignAddr);
        one.setVerification(flag);
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
    }

    Request[] public requests;
    address public manager;
    uint public minimunContribution;
    string public CampaignName;
    string public CampaignDescription;
    string public imageUrl;
    uint public targetToAchieve;
    address[] public contributers;
    mapping(address => bool) public approvers;
    uint public approversCount;
    uint public numRequests;
    bool public verified = false;
    address public factory;

    mapping(uint => mapping(address => bool)) approvals;

    event Received(address addr, uint amount);
    event Fallback(address addr, uint amount);
    event setVerificationStatus(address addr, bool flag);

    constructor(uint minimun, address creator,string memory name, string memory description,string memory image,uint target, address _factory) {
        manager = creator;
        minimunContribution = minimun;
        CampaignName=name;
        CampaignDescription=description;
        imageUrl=image;
        targetToAchieve=target;
        factory = _factory;
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    fallback() external payable { 
        emit Fallback(msg.sender, msg.value);
    }

    modifier onlyCreator() {
        require(msg.sender == manager, "Caller is not the campaign creator");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == factory, "Caller must be the factory.");
        _;
    }

    function setVerification(bool flag) external onlyFactory {
        verified = flag;
        emit setVerificationStatus(msg.sender, flag);
    }    

    function contibute() public payable {
        require(msg.value > minimunContribution );

        contributers.push(msg.sender);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address recipient) public  { 
        requests.push(
            Request({
                description: description,
                value:  value,
                recipient: recipient,
                complete: false,
                approvalCount: 0
            })
        );
    }

    function approveRequest(uint index) public onlyCreator {
        require(approvers[msg.sender]);
        require(!approvals[index][msg.sender]);

        approvals[index][msg.sender] = true;
        requests[index].approvalCount++;
    }

    function finalizeRequest(uint index) public onlyCreator{
        require(requests[index].approvalCount > (approversCount / 2));
        require(!requests[index].complete);

        payable(requests[index].recipient).transfer(requests[index].value);
        requests[index].complete = true;

    }

    function getSummary() public view returns (uint,uint,uint,uint,address,string memory ,string memory ,string memory, uint, bool) {
        return(
            minimunContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager,
            CampaignName,
            CampaignDescription,
            imageUrl,
            targetToAchieve,
            verified
          );
    }

    function getRequestsCount() public view returns (uint){
        return requests.length;
    }
    
}
