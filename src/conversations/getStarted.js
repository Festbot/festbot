const {
	sendReply,
	getFacebookData,
	sendQuickReply,
	setContext,
	sendWebViewButton,
	sleep,
} = require('../actions');
const i18n = require('../i18n');

const moment = require('moment');

getStarted = function*({ locale, psid }) {
	const [momentLocale] = locale.split('_');
	moment.locale(momentLocale);
	const festbotAge = moment().to(process.env.FESTBOT_BIRTH_DAY);

	const t = i18n(locale);
	const facebookData = yield getFacebookData(psid);

	const newContext = yield setContext(psid, {
		firstName: facebookData.first_name,
		lastName: facebookData.last_name,
		gender: facebookData.gender,
		locale: facebookData.locale,
		timezone: facebookData.timezone,
	});

	const festival = 'Balaton Sound';

	yield sendReply(
		t`Szia ${
			facebookData.first_name
		}, Itt vagyok, hogy segítsek a fesztiválos kérdéseidben.` + ' 😎',
		psid
	);

	yield sendReply(t`Kérdéseid a menü segítségével irányíthatod.`, psid);

	yield sendReply(
		t`Kérlek majd szánj rá néhány percet, hogy átnézd ezt a menüt.`,
		psid
	);

	// yield sendReply(
	// 	t`Fontos, hogy bizonyos fesztiválos kérdésekhez az adott fesztivált először aktiválni kell. Ezt a lenti menü seítségével, a fesztivál aktiválása menüpont alatt teheted meg.`,
	// 	psid
	// );

	// yield sendReply(
	// 	t`A menüpontra kattintva a fesztiválok listáját láthatod majd, ahol az adott fesztivált a zöld + jelre kattintva aktiválhatod.`,
	// 	psid
	// );

	// yield sendReply(
	// 	t`A fesztivál programját ugyanitt, az adott fesztiválra kattintva, a bögészés gomb megnyomása utan láthatod.`,
	// 	psid
	// );

	yield sendReply(
		t`Nem akarom tovább rabolni az idődet, mert biztos Te is izgatott vagy már, de még előtte közösen csekkoljunk be téged a ${festival} fesztiválra.`,
		psid
	);

	yield sendWebViewButton(
		t`Kattints a gombra a ${festival} fesztivál aktiválásához.`,
		t`Tovább`,
		'https://webview.festbot.com/',
		psid
	);

	yield sleep(2 * 60 * 1000);

	yield sendReply(
		t`Ha van aktiv fesztiválod és koncerteket adsz hozzá a kedvenceid listájához, én gondoskodom majd róla, hogy a kezdés előtt időben értesítselek.`,
		psid
	);
	yield sleep(5 * 60 * 1000);
	yield sendReply(
		t`Már alig várom, hogy jobban megismerjelek!` + ' 😍',
		psid
	);

	yield sendReply(
		t`A zenei ízléseddel kapcsolatban lenne most pár kérésem.` + ' 🧐',
		psid
	);

	yield sendQuickReply(
		t`Remélem nem bánod ha kicsit belemegyünk ebbe a témába.` + ' ☺️',
		[
			{
				title: t`Nem gond, mehet` + ' ☺️',
				to: '/stream-provider-auth/confirm-select',
			},
			{
				title: t`Talán majd később` + ' 🤔',
				to: '/stream-provider-auth/select-later',
			},
		],
		psid
	);
	yield sleep(6 * 60 * 60 * 1000);

	yield sendReply(
		t`A Festbotot szabadidőnkben csináljuk, és még csak ${festbotAge} született.` +
			' 🤓' +
			t`Rengeteg izgalmas és hasznos funkción dolgozunk, melyeket folyamatosan adunk majd hozzá a Festbothoz.` +
			' 🧐',
		psid
	);
	yield sendReply(
		t`Ez persze időbe telik és sok sok munka, ezért a fejlesztéshez önkéntes közreműködőkre is szükség van.`,
		psid
	);
	yield sendReply(
		t`Ha szívesen csatlakoznál a közösségünkhöz és tudsz segíteni nekünk jelentkezz ✨VIP✨ tagnak a közreműködői csoportunkba.`,
		psid
	);

	yield sendReply(t`https://www.facebook.com/groups/festbotvip/`, psid);
};
module.exports = { getStarted };
