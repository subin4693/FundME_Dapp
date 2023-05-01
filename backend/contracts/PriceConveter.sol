//SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConveter{

	function getPrice(AggregatorV3Interface _priceFeed) internal view returns(int){
		(,int price,,,) = _priceFeed.latestRoundData();
		 return price;
	}

	function getConversionRate(uint256 _price, AggregatorV3Interface _pricefeed) internal view  returns(uint256){
		return uint256(getPrice(_pricefeed)) * _price;
	}
}