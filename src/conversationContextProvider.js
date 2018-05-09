const FacebookGraph = require('./apiHelpers/facebook/graphApi');
const FestbotApi = require('./apiHelpers/festbot');
const NodeCache = require('node-cache');
const cache = new NodeCache();

const ConversationContextProvider = {
	get: async function(psid) {
		if (cache.get(psid)) {
			return cache.get(psid);
		}

		const festbotId = FestbotApi.hashFacebookPSID(psid);
		let userData = null;

		try {
			userData = await FestbotApi.getUserData(festbotId);
		} catch ({ error }) {
			console.log('error', error);
			userData = await FestbotApi.addUser(festbotId);
		}

		cache.set(psid, userData);
		return userData;
	},

	set: async function(psid, newData) {
		const oldData = await ConversationContextProvider.get(psid);

		const userData = {
			...oldData,
			...newData
		};
		await FestbotApi.updateUserData(oldData._id, oldData._rev, userData);
		cache.set(psid, userData);
	}
};

module.exports = ConversationContextProvider;
