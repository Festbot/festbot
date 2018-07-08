const request = require('request-promise');

const webhook = function() {
	console.log('received something from kik');
};

const sendConfig = async function() {
	const data = await request.post({
		url: 'https://api.kik.com/v1/config',
		auth: {
			user: process.env.KIK_USER_NAME || 'festbot_vip',
			pass:
				process.env.KIK_API_KEY ||
				'bc097de5-f4b8-4744-953e-56fa4a17a171',
		},
		json: {
			WEBHOOK: 'https://' + process.env.HOST + '/kik/webhook',
			features: {
				receiveReadReceipts: false,
				receiveIsTyping: false,
				manuallySendReadReceipts: false,
				receiveDeliveryReceipts: false,
			},
		},
	});

	console.log('kik api:', data);
};

module.exports = { webhook, sendConfig };
