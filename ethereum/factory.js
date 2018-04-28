import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	'0x1Eb4768EeD72F92A8f64D243C3FbE2e893D238b8'
);

export default instance;
