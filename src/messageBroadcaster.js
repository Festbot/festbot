const { getUsersWithActiveFestival } = require('./apiHelpers/festbot/users');
const FacebookSendApi = require('./apiHelpers/facebook/sendApi');

const getNewToken = function() {
	const date = new Date();
	return `${date.getMinutes()}${date.getDay()}${counter}${date.getHours()}${date.getMonth()}`;
};

module.exports = async function(req, res) {
	res.setHeader('Content-Type', 'application/json');

	const token = getNewToken();

	if (
		req.body.refreshToken !== process.env.FESTBOT_ACCES_TOKEN ||
		req.body.accessToken !== token
	) {
		return res.send(JSON.stringify({ success: false, accesToken: token }));
	}

	const users = await getUsersWithActiveFestival(req.body.festivalId);

	for (let i = 0; i < users.length; i++) {
		const user = users[i];
		if (user.psid && user.firstName === 'Andor') {
			await FacebookSendApi.sendNotification(
				users[i].psid,
				req.body.message
			);
		}
	}

	res.send(JSON.stringify({ success: true }));
};
