const { getUsersWithActiveFestival } = require('./apiHelpers/festbot/users');
const FacebookSendApi = require('./apiHelpers/facebook/sendApi');

const getNewToken = function() {
	const date = new Date();
	return `${date.getMinutes()}${date.getDay()}${date.getHours()}${date.getMonth()}`;
};

// Example request:
// {
// 	"refreshToken": "TOKEN",
// 	"accessToken": "245207",
// 	"message": "Test",
// 	"festivalId": "60b47fa2bc95b458fcc1d834dc01ad37"
// 	"test": true
// }

module.exports = async function(req, res) {
	res.setHeader('Content-Type', 'application/json');

	const token = getNewToken();

	if (
		req.body.refreshToken !== process.env.FESTBOT_ACCES_TOKEN ||
		req.body.accessToken !== token ||
		typeof req.body.message !== 'object'
	) {
		return res.send(JSON.stringify({ success: false, accesToken: token }));
	}

	const users = await getUsersWithActiveFestival(req.body.festivalId);

	for (let i = 0; i < users.length; i++) {
		const user = users[i];
		if (
			(!req.body.test && user.psid && req.body.message[user.locale]) ||
			(req.body.test && user.isTestUser)
		) {
			await FacebookSendApi.sendNotification(
				users[i].psid,
				req.body.message[locale]
			);
		}
	}

	res.send(JSON.stringify({ success: true }));
};
