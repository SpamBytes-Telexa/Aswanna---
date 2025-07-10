// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract OfferContract {
    address public buyer;
    address public farmer;
    uint256 public quantity;
    uint256 public pricePerUnit; // in wei
    uint256 public totalPrice;   // in wei

    bool public isPaid;
    bool public isDelivered;
    bool public isConfirmed;

    event ContractCreated(address indexed buyer, address indexed farmer, uint256 totalPrice);
    event DeliveryMarked(address indexed buyer);
    event DeliveryConfirmed(address indexed buyer);

    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only buyer can call this");
        _;
    }

    constructor(
        address _buyer,
        address _farmer,
        uint256 _quantity,
        uint256 _pricePerUnit
    ) payable {
        buyer = _buyer;
        farmer = _farmer;
        quantity = _quantity;
        pricePerUnit = _pricePerUnit;
        totalPrice = quantity * pricePerUnit;

        require(msg.value == totalPrice, "Incorrect ETH sent for total price");

        // Mark paid
        isPaid = true;

        // Send ETH to farmer
        (bool sent, ) = payable(farmer).call{value: msg.value}("");
        require(sent, "Payment to farmer failed");

        emit ContractCreated(buyer, farmer, totalPrice);
    }

    function markDelivered() external onlyBuyer {
        require(isPaid, "Payment not completed");
        isDelivered = true;
        emit DeliveryMarked(msg.sender);
    }

    function confirmDelivery() external onlyBuyer {
        require(isDelivered, "Delivery not marked yet");
        isConfirmed = true;
        emit DeliveryConfirmed(msg.sender);
    }
}
