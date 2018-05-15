const Send = require('../send');

module.exports = {
	howManyDrinks: async function(context) {
		await Send.message(
			context,
			"Okay, let's do this! How many drinks have you had?",
			'🍺🍷🍸',
			[
				{
					title: 'Just one',
					emoji: '😊',
					to: '/sobriety-test/not-drunk/'
				},
				{
					title: 'Two',
					emoji: '😎️',
					to: '/sobriety-test/how-many-fingers/' + 2
				},
				{
					title: 'Three',
					emoji: '🙄',
					to: '/sobriety-test/how-many-fingers/' + 3
				},
				{
					title: 'Four or more',
					emoji: '😜',
					to: '/sobriety-test/how-many-fingers/' + 4
				},
				{
					title: "I didn't count",
					emoji: '😗',
					to: '/sobriety-test/how-many-fingers/' + 5
				}
			]
		);
	},

	howManyFingers: async function(context, router, param) {
		const drunkness = parseInt(param, 10);
		const random = Math.floor(Math.random() * 7) + 3;
		const coin = Math.random() > 0.5;
		const fingers = [
			'',
			'',
			'',
			'☝️✌️✊',
			'🤞✌️',
			'🤞✌️👆',
			'🖐️👆',
			'🖐️✌️',
			'🖐️🤞☝️',
			'🖐️✌️🤞',
			'🖐️🖐️'
		];

		await Send.message(
			context,
			'How many fingers am I holding up?',
			fingers[random],
			[
				{
					title: random + (coin ? 1 : -1),
					to: '/sobriety-test/dont-text-your-ex/' + (drunkness + 1)
				},
				{
					title: random,
					to: '/sobriety-test/dont-text-your-ex/' + drunkness
				},
				{
					title: random + 2,
					to: '/sobriety-test/dont-text-your-ex/' + (drunkness + 3)
				},
				{
					title: random + (coin ? -1 : 1),
					to: '/sobriety-test/dont-text-your-ex/' + (drunkness + 1)
				}
			]
		);
	},

	dontTextYourEx: async function(context) {
		await Send.message(
			context,
			"I hope you're not planning to text your ex!",
			'🙄',
			[
				{
					title: 'I just did',
					emoji: '😗',
					to: '/sobriety-test/do-you-know-where-you-are'
				},
				{
					title: 'Good idea!',
					emoji: '😁',
					to: '/sobriety-test/do-you-know-where-you-are'
				},
				{ title: 'Not gonna happen', emoji: '😅', to: '' }
			]
		);
	},

	doYouknowWhereYouAre: async function(context) {
		await Send.message(
			context,
			'Do you know where you are?',
			'🙄',
			[
				{
					title: 'With my friends',
					emoji: '😗',
					to: '/sobriety-test/stop-drinking'
				},
				{
					title: 'What does it matter?',
					emoji: '😗',
					to: '/sobriety-test/stop-drinking'
				}
			]
		);
	}
};
