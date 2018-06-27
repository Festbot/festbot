const { sendQuickReply } = require('../actions');
const i18n = require('../i18n');

const howManyDrinks = function*({ locale, psid }) {
	const t = i18n(locale);

	return sendQuickReply(
		t`Oké, inni jó! Hány pohárral ittál?` + ' 🍺🍷🍸',
		[
			{
				title: t`Csak eggyel` + '😊',
				to: '/sobriety-test/not-drunk/',
			},
			{
				title: t`Kettő` + ' 😎️',
				to: '/sobriety-test/how-many-fingers/' + 2,
			},
			{
				title: t`Három` + ' 🙄',
				to: '/sobriety-test/how-many-fingers/' + 3,
			},
			{
				title: t`Négy vagy több` + ' 😜',
				to: '/sobriety-test/how-many-fingers/' + 4,
			},
			{
				title: t`Már nem számolom` + ' 😗',
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
		t`Hány ujjamat mutatom?` + ' ' + fingers[random],
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
			{
				title: t`Te most bemutattál???` + ' 😂',
				to: '/sobriety-test/dont-text-your-ex/' + (drunkness + 5),
			},
		],
		psid
	);
};

const dontTextYourEx = function*({ locale, psid }, param) {
	const t = i18n(locale);
	const drunkness = parseInt(param, 10);

	return sendQuickReply(
		t`Mit tartanál most a legjobb ötletnek?` + ' 🙄',
		[
			{
				title: t`Haza menni, unatkozom!` + ' 😗',
				to: '/sobriety-test/do-the-math/' + drunkness,
			},
			{
				title: t`Bulizni tovább ezerrel!` + ' 😁',
				to: '/sobriety-test/do-the-math/' + (drunkness + 1),
			},
			{
				title: t`Sírni egy jót.` + ' 😅',
				to: '/sobriety-test/do-the-math/' + (drunkness + 2),
			},
			{
				title: t`Ráírni az exemre.` + ' 😅',
				to: '/sobriety-test/do-the-math/' + (drunkness + 3),
			},
			{
				title: t`Szexting az ex-emmel.` + ' 😅',
				to: '/sobriety-test/do-the-math/' + (drunkness + 5),
			},
			{
				title: t`Átmenni az ex-emhez.` + ' 😅',
				to: '/sobriety-test/do-the-math/' + (drunkness + 7),
			},
		],
		psid
	);
};

const doTheMath = function*({ locale, psid }, param) {
	const t = i18n(locale);
	const drunkness = parseInt(param, 10);

	return sendQuickReply(
		t`Mennyi 12 x 12?` + ' 🙄',
		[
			{
				title: t`144`,
				to: '/sobriety-test/do-you-know-where-you-are/' + drunkness,
			},
			{
				title: t`122`,
				to:
					'/sobriety-test/do-you-know-where-you-are/' +
					(drunkness + 1),
			},
			{
				title: t`1212`,
				to:
					'/sobriety-test/do-you-know-where-you-are/' +
					(drunkness + 3),
			},
			{
				title: t`Nem beszélni matek!` + ' 🤪',
				to:
					'/sobriety-test/do-you-know-where-you-are/' +
					(drunkness + 5),
			},
		],
		psid
	);
};

const doYouknowWhereYouAre = function*({ locale, psid }, param) {
	const t = i18n(locale);
	const drunkness = parseInt(param, 10);

	return sendQuickReply(
		t`Tudod, hogy hol vagy most?` + ' 🙄',
		[
			{
				title: t`Még szép` + ' 😗',
				to: '/sobriety-test/stop-drinking/' + (drunkness + 1),
			},
			{
				title: t`Nem, de a haverom tudja.` + ' 🤪',
				to: '/sobriety-test/stop-drinking/' + (drunkness + 2),
			},
			{
				title: t`Mit számít?` + ' 😗',
				to: '/sobriety-test/stop-drinking/' + (drunkness + 3),
			},
			{
				title: t`uhhh` + ' 😗',
				to: '/sobriety-test/stop-drinking/' + (drunkness + 5),
			},
		],
		psid
	);
};

module.exports = {
	howManyDrinks,
	howManyFingers,
	dontTextYourEx,
	doTheMath,
	doYouknowWhereYouAre,
};
