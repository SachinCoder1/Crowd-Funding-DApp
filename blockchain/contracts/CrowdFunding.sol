// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract CrowdFunding {
    /* State Variables */
    address[] private s_AllCampaignAddresses;

    /* Events */
    event campaignCreated(
        string indexed _category,
        address indexed _campaignOwner,
        uint256 indexed _timestamp,
        string _title,
        string _image,
        string _description,
        uint256 _requiredAmount,
        address _campaignAddress
    );

    /* Getter Functions */
    function getAllCampaignAddresses()
        external
        view
        returns (address[] memory)
    {
        return s_AllCampaignAddresses;
    }

    /* Logic */
    function createCampaign(
        string memory _title,
        string memory _image,
        string memory _description,
        string memory _category,
        uint256 _requiredAmount
    ) external {
        Campaign newCampaign = new Campaign(
            _title,
            _image,
            _description,
            _requiredAmount,
            msg.sender
        );

        s_AllCampaignAddresses.push(address(newCampaign));

        emit campaignCreated(
            _category,
            msg.sender,
            block.timestamp,
            _title,
            _image,
            _description,
            _requiredAmount,
            address(newCampaign)
        );
    }
}

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
    event campaignFunded(
        address indexed funder,
        uint256 indexed timestamp,
        uint256 amount
    );

    CampaignStruct newCampaign;

    constructor(
        string memory _title,
        string memory _image,
        string memory _description,
        uint256 _requiredAmount,
        address _campaignOwner
    ) {
        newCampaign = CampaignStruct(
            _title,
            _image,
            _description,
            _requiredAmount,
            0,
            payable(_campaignOwner)
        );
    }

    /* Getter Functions */
    function getCampaign() external view returns (CampaignStruct memory) {
        return newCampaign;
    }

    /* Logic */

    // User can fund the different campaigns using this;
    function fundCampaign() external payable {
        require(
            newCampaign.requiredAmount > newCampaign.recievedAmount,
            "Amount excided"
        );
        require(
            msg.value <= newCampaign.requiredAmount,
            "amount more then the needed."
        );
        newCampaign.campaignOwner.transfer(msg.value);
        newCampaign.recievedAmount += msg.value;
        emit campaignFunded(msg.sender, block.timestamp, msg.value);
    }
}
