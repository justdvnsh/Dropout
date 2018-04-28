const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
	"local income fatal suit virus finish inhale promote fringe harbor decorate certain",
	"https://rinkeby.infura.io/CkB5Y6iT8qGAuTXWSHRD"
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy the contract from account:-', accounts[0])

	const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
				.deploy({ data: compiledFactory.bytecode })
				.send({ gas: '1000000', from: accounts[0] });

	console.log('Contract Deployed at', result.options.address);
}
deploy();
