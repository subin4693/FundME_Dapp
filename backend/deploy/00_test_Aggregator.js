const {network} = require("hardhat");
const  {localNetworks,INITIALVALUE,DECIMALS} = require("../helper_hardhat_config.js");


module.exports = async({deployments, getNamedAccounts}) =>{
	const {deploy} = deployments;
	const {deployer} = await getNamedAccounts()
	let deployedRetrun;
	if(localNetworks.includes(network.name)){
		deployedRetrun = await deploy("MockV3Aggregator",{
			from: deployer,
			log: true,
			args:[DECIMALS,INITIALVALUE],
		})
	}
}
