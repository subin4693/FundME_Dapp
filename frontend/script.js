import {ethers} from './ethers.js'
import {contractAddress, abi} from './constants.js'

const ConnectButton = document.getElementById("connect")
const BalanceButton = document.getElementById("balance")
const FundButton = document.getElementById("fund")
const WithdrawButton = document.getElementById("withdraw")

ConnectButton.onclick=connect
BalanceButton.onclick=getBalance
FundButton.onclick=fund
WithdrawButton.onclick=withdraw

async function connect(){
	if(window.ethereum){
		const accounts = await window.ethereum.request({method:"eth_requestAccounts"})
		console.log(accounts)
	}
	else{
		console.log("please install metamask")
	}
}


async function getBalance(){
	if(window.ethereum){
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const balance = await provider.getBalance(contractAddress)
		console.log(ethers.utils.formatEther(balance));
	}
}

async function fund(){
	const val = document.getElementById("ethInput").value
	if(window.ethereum){
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer =  provider.getSigner();
		const connect = new ethers.Contract(contractAddress, abi,signer);
		 const retval = await connect.fund({value: ethers.utils.parseEther(val)})
		console.log(retval);

	}
}

async function withdraw(){
	if(window.ethereum){
		try{
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const connect = new ethers.Contract(contractAddress, abi, signer);
		const retVal = connect.withdraw();
	}
	catch(error){
		console.log(error);
	}
	}
}