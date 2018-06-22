const {
	sendReply,
	sendLocation,
	sendQuickReply,
	getPois,
	setContext,
	sendWebViewButton,
} = require('../actions');
const i18n = require('../i18n');

const noActiveFestival = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendReply(
		t`Nem is írtad, hogy melyik fesztiválon vagy...` + ' 🤷‍',
		psid
	);

	yield sendWebViewButton(
		t`Válaszd ki erről a listáról, aztán próbáld újra!` + ' 😎',
		t`Fesztiválok böngészése`,
		'https://webview.festbot.com',
		psid
	);
};

const getPoi = function*({ locale, psid, activeFestival }) {
	const t = i18n(locale);

	if (!activeFestival) {
		yield* noActiveFestival.apply(null, arguments);
		return;
	}

	yield sendQuickReply(
		t`Na, mit keresel?` + ' 📍',
		[
			{
				title: t`Színpadot` + ' 😎',
				to: '/get-poi/request-location/stage',
			},
			{
				title: t`Kaját` + ' 🍽️',
				to: '/get-poi/get-food',
			},
			{
				title: t`Piát` + ' 🍻',
				to: '/get-poi/get-bar',
			},
			{
				title: t`Vécét` + ' 🚻',
				to: '/get-poi/request-location/wc',
			},
			{
				title: t`Szolgáltatást`,
				to: '/get-poi/get-service',
			},
			{
				title: t`Kempinget` + ' ⛺⛺⛺',
				to: '/get-poi/request-location/camping',
			},
			{
				title: t`Bejárat` + ' ⛩️',
				to: '/get-poi/request-location/entrance',
			},
			{
				title: t`Hiénákat` + ' 🚕🚕🚕',
				to: '/get-poi/request-location/taxi',
			},
			{
				title: t`Bolt` + ' 🛒',
				to: '/get-poi/request-location/supermarket',
			},
			{
				title: t`Parkolót` + ' 🅿️',
				to: '/get-poi/request-location/parking',
			},
			{
				title: t`Dohánybolt` + ' 🚬',
				to: '/get-poi/request-location/tobacco',
			},
		],
		psid
	);
};

const getBar = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendQuickReply(
		t`Jó, de mit szeretnél inni? ` + ' ',
		[
			{
				title: t`Sört` + ' 🍺',
				to: '/get-poi/request-location/beer',
			},
			{
				title: t`Bort` + ' 🍷',
				to: '/get-poi/request-location/wine',
			},
			{
				title: t`Koktélt` + ' 🍹',
				to: '/get-poi/request-location/cocktails',
			},
			{
				title: t`Viszkit` + ' 🥃',
				to: '/get-poi/request-location/whisky',
			},
			{
				title: t`Coffee` + ' ☕',
				to: '/get-poi/request-location/coffee',
			},
		],
		psid
	);
};

const getService = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendQuickReply(
		t`Jó, de az bármi lehet...`,
		[
			{
				title: t`Értékmegőrző` + ' 💍',
				to: '/get-poi/request-location/lockers',
			},
			{
				title: t`Telefontöltés` + ' 🔋',
				to: '/get-poi/request-location/charging_station',
			},
			{
				title: t`Elsősegély` + ' 🏥',
				to: '/get-poi/request-location/first_aid',
			},
			{
				title: t`Információ` + ' ℹ️',
				to: '/get-poi/request-location/information',
			},
		],
		psid
	);
};

const getFood = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendQuickReply(
		t`Konyha jellege` + ' 🍽️',
		[
			{
				title: t`Amerikai` + ' 🍔 🌭',
				to: '/get-poi/request-location/hotdog_hamburger',
			},
			{
				title: t`Pizza` + ' 🍕',
				to: '/get-poi/request-location/pizza',
			},
			{
				title: t`Mexikói` + ' 🌮',
				to: '/get-poi/request-location/mexican',
			},
			{
				title: t`Gyros`,
				to: '/get-poi/request-location/gyros',
			},
			{
				title: t`Egészséges` + ' 🥗',
				to: '/get-poi/request-location/healty_food',
			},
			{
				title: t`Reggeli` + ' 🍳',
				to: '/get-poi/request-location/breakfast',
			},
			{
				title: t`Fish` + ' 🐟',
				to: '/get-poi/request-location/fish',
			},
		],
		psid
	);
};

const sendPoi = function*(
	{ locale, psid, activeFestival, lastAskedLocation },
	location
) {
	const t = i18n(locale);

	const [lat, lng] = location.split(':');

	const pois = yield getPois(activeFestival, lastAskedLocation, lat, lng);

	if (pois.length > 0) {
		console.log('ez jott vissza', pois);
		yield sendReply(t`Találtam egyet, mindjárt küldöm...` + ' 🤟', psid);
	} else {
		yield sendReply(
			t`Nem találtam ilyen helyet a fesztiválon, vagy a szervezők nem adták meg.` +
				' ',
			psid
		);
	}
};

const requestLocation = function*({ locale, psid }, type) {
	const t = i18n(locale);

	yield setContext(psid, {
		lastAskedLocation: type,
	});

	yield sendLocation(t`Mondd meg, hogy hol vagy!` + ' 📍', psid);
};

module.exports = {
	getPoi,
	requestLocation,
	getFood,
	sendPoi,
	getBar,
	getService,
};
