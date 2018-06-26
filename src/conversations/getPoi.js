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
		t`Úgy tűnik, hogy nem állítottál be aktív fesztivált egyelőre.` +
			' 🤷‍',
		psid
	);

	yield sendWebViewButton(
		t`Kérlek aktiváld a fesztivált a zöld + jelre kattintva, aztán próbáld újra!` +
			' 😎',
		t`Fesztiválok listája`,
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
		t`Mit keresel?` + ' 📍',
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
				title: t`Mosdót` + ' 🚻',
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
		t`Mit szeretnél inni? ` + ' ',
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
				title: t`Kávét` + ' ☕',
				to: '/get-poi/request-location/coffee',
			},
		],
		psid
	);
};

const getService = function*({ locale, psid }) {
	const t = i18n(locale);

	yield sendQuickReply(
		t`A pontosítés végett muszáj megkérdeznem, hogy pontosan mit keresel`,
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
				title: t`Hal` + ' 🐟',
				to: '/get-poi/request-location/fish',
			},
			{
				title: t`Vegán` + ' 🥦',
				to: '/get-poi/request-location/vegan',
			},
		],
		psid
	);
};

const sendPoi = function*(
	{ locale, psid, activeFestival, lastAskedLocation, locationRequestedFor },
	location
) {
	if (locationRequestedFor !== 'send-poi') {
		return;
	}

	const t = i18n(locale);

	const [lat, lng] = location.split(':');

	const pois = yield getPois(activeFestival, lastAskedLocation, lat, lng);

	if (pois.length > 0) {
		const poi = pois[0];
		yield sendReply(t`Találtam egyet, mindjárt küldöm...` + ' 🤟', psid);
		yield sendReply(
			`http://maps.apple.com/maps?q=${poi.coordinates.lat},${
				poi.coordinates.lng
			}&z=16`,
			psid
		);
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
		locationRequestedFor: 'send-poi',
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
