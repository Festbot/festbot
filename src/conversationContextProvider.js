const FestbotUsersApi = require('./apiHelpers/festbot/users');
const NodeCache = require('node-cache');
const cache = new NodeCache();

const ConversationContextProvider = {
	get: async function(psid, force) {
		//if (cache.get(psid) && !force) {
		//	return cache.get(psid);
		//}

		const festbotId = FestbotUsersApi.hashFacebookPSID(psid);
		let userData = null;

		try {
			userData = await FestbotUsersApi.getUserData(festbotId);
		} catch ({ error }) {
			console.log('error', error);
			userData = await FestbotUsersApi.addUser(festbotId);
		}

		cache.set(psid, {
			...userData,
			psid: psid,
		});
		return {
			...userData,
			psid: psid,
		};
	},

	set: async function(psid, newData) {
		const oldData = await ConversationContextProvider.get(psid, true);

		const userData = {
			...oldData,
			...newData,
			lastUpdated: Date.now(),
		};
		await FestbotUsersApi.updateUserData(
			oldData._id,
			oldData._rev,
			userData
		);
		cache.set(psid, userData);

		return userData;
	},
};

module.exports = ConversationContextProvider;
