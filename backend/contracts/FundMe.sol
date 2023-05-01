//SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./PriceConveter.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

error FundMe__NotOwner();
error FundMe_SendMinEth();
error FundMe__FaildWithdraw();

contract FundMe{

    AggregatorV3Interface pricefeed;
    address private immutable i_owner;
    uint256 private constant MINUSD_AMOUNT = 50*10**18;
    mapping(address=>uint256) private  addressToAmountFunded;
    address[] private funders;

    using PriceConveter for uint256;

    modifier onlyOwner(){
        if(i_owner != msg.sender) {
            revert FundMe__NotOwner();
        }
        _;
    }

    modifier sendMinEth(){
        if(msg.value.getConversionRate(pricefeed) <= MINUSD_AMOUNT){
            revert FundMe_SendMinEth();
        }
        _;
    }

    event FundingAmount(address indexed from, uint256 indexed amount);
    event AmountWithdraw(address indexed owner, uint256 indexed totalAmount);

    constructor(address _pricefeed){
        pricefeed = AggregatorV3Interface(_pricefeed);
        i_owner = msg.sender;
    }

    function fund() public payable sendMinEth{
        emit FundingAmount(msg.sender, msg.value);
        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);

    }

    function withdraw() public onlyOwner{
        emit AmountWithdraw(msg.sender, address(this).balance);
        for(uint256 i = 0; i < funders.length; i++){
            addressToAmountFunded[funders[i]] = 0;
        }
        funders = new address[](0);
        (bool success,) = payable(i_owner).call{value: address(this).balance}("");
        if(!success){
            revert FundMe__FaildWithdraw();
        }
    }

    fallback() external payable{
        fund();
    }

    receive() external payable{
        fund();
    }
}