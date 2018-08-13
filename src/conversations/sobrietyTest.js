const { sendQuickReply, sendReply } = require('../actions');
const i18n = require('../i18n');
const shuffle = require('../utils/shuffle');

const howManyDrinks = function*({ locale, psid }) {
	const t = i18n(locale);

	return sendQuickReply(
		t`Oké, inni jó! Hány pohárral ittál?` + ' 🍺🍷🍸',
		[
			{
				title: t`Csak eggyel` + ' 😊',
				to: '/sobriety-test/how-many-fingers/' + 1,
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

	if (drunkness < 2) {
		yield sendReply(
			t`Részeg talán még nem vagy, de azért autóba ne ülj!` + ' 😉',
			psid
		);
	}

	return sendQuickReply(
		t`Hány ujjamat mutatom?` + ' ' + fingers[random],
		shuffle([
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
				title: t`Most bemutattál?` + ' 😂',
				to: '/sobriety-test/dont-text-your-ex/' + (drunkness + 5),
			},
		]),
		psid
	);
};

const dontTextYourEx = function*({ locale, psid }, param) {
	const t = i18n(locale);
	const drunkness = parseInt(param, 10);

	return sendQuickReply(
		t`Mit tartanál most a legjobb ötletnek?` + ' 🙄',
		shuffle([
			{
				title: t`Hazamenni, uncsizok` + ' 😗',
				to: '/sobriety-test/where-you-are/' + (drunkness + 1),
			},
			{
				title: t`Bulizni tovább!` + ' 😁',
				to: '/sobriety-test/where-you-are/' + (drunkness + 2),
			},
			{
				title: t`Sírni egy jót` + ' 😅',
				to: '/sobriety-test/where-you-are/' + (drunkness + 3),
			},
			{
				title: t`Ráírni az exemre` + ' 😅',
				to: '/sobriety-test/where-you-are/' + (drunkness + 4),
			},
			{
				title: t`Átmenni az exemhez` + ' 😅',
				to: '/sobriety-test/where-you-are/' + (drunkness + 5),
			},
		]),
		psid
	);
};

const whereYouAre = function*({ locale, psid }, param) {
	const t = i18n(locale);
	const drunkness = parseInt(param, 10);

	return sendQuickReply(
		t`Tudod, hogy hol vagy most?` + ' 🙄',
		shuffle([
			{
				title: t`Még szép` + ' 😎',
				to: '/sobriety-test/do-the-math/' + (drunkness + 1),
			},
			{
				title: t`A haverom tudja` + ' 🤪',
				to: '/sobriety-test/do-the-math/' + (drunkness + 2),
			},
			{
				title: t`Mit számít?` + ' 😗',
				to: '/sobriety-test/do-the-math/' + (drunkness + 3),
			},
			{
				title: t`Uhhh...` + ' 🤪',
				to: '/sobriety-test/do-the-math/' + (drunkness + 5),
			},
		]),
		psid
	);
};

const doTheMath = function*({ locale, psid }, param) {
	const t = i18n(locale);
	const drunkness = parseInt(param, 10);

	switch (true) {
		case drunkness < 5:
			yield sendReply(
				t`Az ügyvédem nem szereti, ha azt mondom emberekenek, hogy igyanak még, úgyhogy nem is mondok semmit.` +
					' 😅',
				psid
			);
			break;
		case drunkness < 10:
			yield sendReply(
				t`Azt még nem mondanám, hogy részeg vagy, de azért látszik, hogy ittál.` +
					' 😅',
				psid
			);
			break;
		case drunkness < 15:
			yield sendReply(
				t`Azt még nem mondanám, hogy részeg vagy, de azért látszik, hogy ittál.` +
					' 😅',
				psid
			);
			break;
		case drunkness > 15:
			yield sendReply(
				t`Ha ezt végig tudtad nyomkodni, akkor még nem vagy teljesen kész, de nagyon közel vagy hozzá.` +
					' 😅',
				psid
			);

			yield sendReply(
				t`Az exedet hagyd békén, most jó ötletnek érezheted, de holnap kellemetlen lesz.` +
					' 😉',
				psid
			);

			break;
	}

	yield sendReply(
		t`Igyál vizet, mert ezek a fesztiválos piák nagyon megfájdítják a fejet.` +
			' 🚰',
		psid
	);
};

module.exports = {
	howManyDrinks,
	howManyFingers,
	dontTextYourEx,
	doTheMath,
	whereYouAre,
};
