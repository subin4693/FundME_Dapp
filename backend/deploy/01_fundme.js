const {network} = require("hardhat")
const  {localNetworks, sepoliaAggregatorAddress} = require("../helper_hardhat_config.js");


module.exports = async ({deployments,getNamedAccounts})=>{
	const {deployer} = await getNamedAccounts();
	const {deploy,get} = deployments;
	let aggregatorAddress;
	if(localNetworks.includes(network.name)){
		const aggregator = get("MockV3Aggregator");
		a =  await aggregator;
		aggregatorAddress = a.address
	}
	else{
		aggregatorAddress = sepoliaAggregatorAddress;
	}
	console.log("this is deployed address ", aggregatorAddress);

	await deploy("FundMe",{
		from: deployer,
		log: true,
		args:[aggregatorAddress]
	})
}