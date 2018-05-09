const FacebookGraph = require('./apiHelpers/facebook/graphApi');
const FestbotApi = require('./apiHelpers/festbot');

module.exports.get = async function(psid) {
	const facebookUserData = await FacebookGraph.getUserInformation(psid);
	const festbotUserData = await FestbotApi.getUserDataCreateNewIfDoesntExists(
		psid,
		facebookUserData
	);

	return {
		psid: psid,
		...facebookUserData
	};
};

module.exports.set = async function(psid, data) {
};
