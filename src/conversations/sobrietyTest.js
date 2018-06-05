const howManyDrinks = function*({ i18n: t }) {
	return {
		message:
			t`Okay, let's do this! How many drinks have you had?` + ' 🍺🍷🍸',
		quickReplies: [
			{
				title: t`Just one` + '😊',
				to: '/sobriety-test/not-drunk/'
			},
			{
				title: t`Two` + ' 😎️',
				to: '/sobriety-test/how-many-fingers/' + 2
			},
			{
				title: t`Three` + ' 🙄',
				to: '/sobriety-test/how-many-fingers/' + 3
			},
			{
				title: t`Four or more` + ' 😜',
				to: '/sobriety-test/how-many-fingers/' + 4
			},
			{
				title: t`I didn't count` + ' 😗',
				to: '/sobriety-test/how-many-fingers/' + 5
			}
		]
	};
};

const howManyFingers = function*({ i18n: t }, router, param) {
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

	return {
		message: t`How many fingers am I holding up?` + ' ' + fingers[random],
		quickReplies: [
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
	};
};

const dontTextYourEx = function*({ i18n: t }) {
	return {
		message: t`I hope you're not planning to text your ex!` + ' 🙄',
		quickReplies: [
			{
				title: t`I just did` + ' 😗',
				to: '/sobriety-test/do-you-know-where-you-are'
			},
			{
				title: t`Good idea!` + ' 😁',
				to: '/sobriety-test/do-you-know-where-you-are'
			},
			{
				title: t`Not gonna happen` + ' 😅',
				to: ''
			}
		]
	};
};

const doYouknowWhereYouAre = function*({ i18n: t }) {
	return {
		message: t`Do you know where you are?` + ' 🙄',
		quickReplies: [
			{
				title: t`With my friends` + ' 😗',
				to: '/sobriety-test/stop-drinking'
			},
			{
				title: t`What does it matter?` + ' 😗',
				to: '/sobriety-test/stop-drinking'
			}
		]
	};
};

module.exports = {
	howManyDrinks,
	howManyFingers,
	dontTextYourEx,
	doYouknowWhereYouAre
};
