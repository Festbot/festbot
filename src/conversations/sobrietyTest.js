const { sendQuickReply } = require('../actions');
const i18n = require('../i18n');

const howManyDrinks = function*({ locale, psid }) {
	const t = i18n(locale);

	return sendQuickReply(
		t`Okay, let's do this! How many drinks have you had?` + ' 🍺🍷🍸',
		[
			{
				title: t`Just one` + '😊',
				to: '/sobriety-test/not-drunk/',
			},
			{
				title: t`Two` + ' 😎️',
				to: '/sobriety-test/how-many-fingers/' + 2,
			},
			{
				title: t`Three` + ' 🙄',
				to: '/sobriety-test/how-many-fingers/' + 3,
			},
			{
				title: t`Four or more` + ' 😜',
				to: '/sobriety-test/how-many-fingers/' + 4,
			},
			{
				title: t`I didn't count` + ' 😗',
				to: '/sobriety-test/how-many-fingers/' + 5,
			},
		],
		psid
	);
};

const howManyFingers = function*({ locale, psid }, param) {
	const t = i18n(locale);
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
		'🖐️🖐️',
	];

	return sendQuickReply(
		t`How many fingers am I holding up?` + ' ' + fingers[random],
		[
			{
				title: random + (coin ? 1 : -1),
				to: '/sobriety-test/dont-text-your-ex/' + (drunkness + 1),
			},
			{
				title: random,
				to: '/sobriety-test/dont-text-your-ex/' + drunkness,
			},
			{
				title: random + 2,
				to: '/sobriety-test/dont-text-your-ex/' + (drunkness + 3),
			},
			{
				title: random + (coin ? -1 : 1),
				to: '/sobriety-test/dont-text-your-ex/' + (drunkness + 1),
			},
		],
		psid
	);
};

const dontTextYourEx = function*({ locale, psid }) {
	const t = i18n(locale);

	return sendQuickReply(
		t`I hope you're not planning to text your ex!` + ' 🙄',
		[
			{
				title: t`I just did` + ' 😗',
				to: '/sobriety-test/do-you-know-where-you-are',
			},
			{
				title: t`Good idea!` + ' 😁',
				to: '/sobriety-test/do-you-know-where-you-are',
			},
			{
				title: t`Not gonna happen` + ' 😅',
				to: '',
			},
		],
		psid
	);
};

const doYouknowWhereYouAre = function*({ locale, psid }) {
	const t = i18n(locale);

	return sendQuickReply(
		t`Do you know where you are?` + ' 🙄',
		[
			{
				title: t`With my friends` + ' 😗',
				to: '/sobriety-test/stop-drinking',
			},
			{
				title: t`What does it matter?` + ' 😗',
				to: '/sobriety-test/stop-drinking',
			},
		],
		psid
	);
};

module.exports = {
	howManyDrinks,
	howManyFingers,
	dontTextYourEx,
	doYouknowWhereYouAre,
};
