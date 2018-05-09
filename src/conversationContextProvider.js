const FacebookGraph = require('./apiHelpers/facebook/graphApi');
const FestbotApi = require('./apiHelpers/festbot');
const NodeCache = require('node-cache');
const cache = new NodeCache();

const ConversationContextProvider = {
	get: async function(psid, force) {
		if (cache.get(psid) && !force) {
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

		cache.set(psid, {
			...userData,
			psid: psid
		});
		return {
			...userData,
			psid: psid
		};
	},

	set: async function(psid, newData) {
		const oldData = await ConversationContextProvider.get(psid, true);

		const userData = {
			...oldData,
			...newData
		};
		await FestbotApi.updateUserData(oldData._id, oldData._rev, userData);
		cache.set(psid, userData);

		return userData;
	}
};

module.exports = ConversationContextProvider;
