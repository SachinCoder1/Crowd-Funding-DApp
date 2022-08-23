// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;




/* Campaign structure where we can call this contract whenever we are creating a campaign. */

contract Campaign {

    /* State Variables */
    struct CampaignStruct {
        string title;
        string image;
        string description;
        uint256 requiredAmount;
        uint256 recievedAmount;
        address payable campaignOwner;
    }

    /* Events */
    event campaignFunded(address indexed funder, uint256 amount, uint256 indexed timestamp);

    CampaignStruct newCampaign;

    
    constructor (string memory _title, string memory _image, string memory _description, uint256 _requiredAmount){
       newCampaign =  CampaignStruct(_title, _image, _description, _requiredAmount, 0, payable(msg.sender));
    }
     
     /* Getter Functions */
    function getCampaign() external view returns(CampaignStruct memory){
        return newCampaign;
    }

    /* Logic */

    // User can fund the different campaigns using this;
    function fundCampaign() external payable {
        require(newCampaign.requiredAmount > newCampaign.recievedAmount, "Amount excided");
        require(msg.value <= newCampaign.requiredAmount, "amount more then the needed.");
        newCampaign.campaignOwner.transfer(msg.value);
        newCampaign.recievedAmount += msg.value;
        emit campaignFunded(msg.sender, msg.value, block.timestamp);
    }
}