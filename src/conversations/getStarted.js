const {
	sendReply,
	getFacebookData,
	sendQuickReply,
	setContext,
} = require('../actions');
const i18n = require('../i18n');

getStarted = function*({ locale, psid }) {
	const t = i18n(locale);
	const facebookData = yield getFacebookData(psid);

	const newContext = yield setContext(psid, {
		firstName: facebookData.first_name,
		lastName: facebookData.last_name,
		gender: facebookData.gender,
		locale: facebookData.locale,
		timezone: facebookData.timezone,
	});

	yield sendReply(
		t`Szia ${
			facebookData.first_name
		}, Itt vagyok, hogy segítek a fesztiválos kérdéseidben.` + ' 😎',
		psid
	);

	yield sendReply(
		t`Kérdéseid a képernyő alján található menü segítségével irányíthatod.`,
		psid
	);

	yield sendReply(
		t`Kérlek majd szánj rá néhány percet, hogy átnézd ezt a menünt.`,
		psid
	);

	yield sendReply(
		t`Fontos, hogy bizonyos fesztiválos kérdésekhez az adott fesztivált először ki kell választani. Ezt a lenti menü seítségével, a fesztivál aktiválása menüpont alatt teheted meg.`,
		psid
	);

	yield sendReply(
		t`A menüre kattintva a fesztiválok listáját láthatod majd, ahol a fesztivált a zöld + jelre kattintva aktiválhatod.`,
		psid
	);

	yield sendReply(
		t`A fesztivál programját ugyanitt, az adott fesztiválra kattintva, a bögészés gomb megnyomása utan láthatod.`,
		psid
	);

	yield sendReply(
		t`Itt koncerteket adhatsz hozzá a kedvenceid listájához, és én gondoskodom majd róla, hogy a kezdés előtt időben értesítselek.`,
		psid
	);

	yield sendReply(
		t`Most rabolom tovább az idődet, biztos Te is izgatott vagy már, hogy felfedezd a lehetőségeket.`,
		psid
	);

	yield sendReply(
		t`Már alig várom, hogy jobban megismerjelek!` + ' 😍',
		psid
	);

	yield sendReply(
		t`A zenei ízléseddel kapcsolatban lenne most pár kérésem.` + ' 🧐',
		psid
	);

	yield sendQuickReply(
		t`I hope you wouldn’t mind if I ask a little bit about you.` + ' ☺️',
		[
			{
				title: t`No problem` + ' ☺️',
				to: '/stream-provider-auth/confirm-select',
			},
			{
				title: t`Maybe later` + ' 🤔',
				to: '/stream-provider-auth/select-later',
			},
		],
		psid
	);
};

module.exports = { getStarted };
