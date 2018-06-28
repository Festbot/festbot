const { sendReply, sendCarousel } = require('../actions');
const i18n = require('../i18n');

const getAgenda = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendReply('Idaig eljutott', psid);

	yield sendCarousel(
		[
			{
				title: 'Lorem ipsum',
				subtitle: 'Dolor sit amet',
				imageUrl:
					'https://ucarecdn.com/e2544628-72de-420f-ad04-2a4da9167231/a8ffa9f7ba7d3408cba60fe0a4bcf5a4e0eb71b9',
				to: '/agenda/get-agenda',
				buttons: [
					{
						url: 'https://webview.festbot.com',
						title: 'Take me there',
					},
				],
			},
			{
				title: 'Lorem ipsum',
				subtitle: 'Dolor sit amet',
				imageUrl:
					'https://ucarecdn.com/999ee578-729d-4127-ad3a-22e9b9728dcf/0192d5a2d99d75b4aa970a75f72f5bf24fc9434e',
				to: '/agenda/get-agenda',
				buttons: [
					{
						url: 'https://webview.festbot.com',
						title: 'Take me there',
					},
				],
			},
			{
				title: 'Lorem ipsum',
				subtitle: 'Dolor sit amet',
				imageUrl:
					'https://ucarecdn.com/c5a9e238-4b1a-4c0f-a209-f164e1f860fb/e10f556cffcf3145726953d76a706d08149b3d9c',
				to: '/agenda/get-agenda',
				buttons: [
					{
						url: 'https://webview.festbot.com',
						title: 'Take me there',
					},
				],
			},
		],
		psid
	);
};

module.exports = { getAgenda };
