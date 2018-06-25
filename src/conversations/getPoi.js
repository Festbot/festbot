const {
	sendReply,
	sendLocation,
	sendQuickReply,
	getPois,
	setContext,
	sendWebViewButton,
} = require('../actions');
const {
	HOTDOG_HAMBURGER,
	PIZZA,
	MEXICAN,
	GYROS,
	HEALTHY_FOOD,
	BREAKFAST,
	FISH,
	WC,
	CAMPING,
	ENTRANCE,
	TAXI,
	SUPERMARKET,
	PARKING,
	TOBACCO,
	BEER,
	WINE,
	COCKTAILS,
	WHISKY,
	COFFEE,
	LOCKERS,
	CHARGING_STATION,
	FIRST_AID,
	INFORMATION,
} = require('../apiHelpers/festbot/poiTypes');

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

	const categories = {
		'get-stage': t`Színpadot` + ' 😎',
		'get-food': t`Kaját` + ' 🍽️',
		'get-bar': t`Piát` + ' 🍻',
		'get-service': t`Szolgáltatást`,
	};

	const locations = {
		[WC]: t`Vécét` + ' 🚻',
		[CAMPING]: t`Kempinget` + ' ⛺⛺⛺',
		[ENTRANCE]: t`Bejárat` + ' ⛩️',
		[TAXI]: t`Hiénákat` + ' 🚕🚕🚕',
		[SUPERMARKET]: t`Bolt` + ' 🛒',
		[PARKING]: t`Parkolót` + ' 🅿️',
		[TOBACCO]: t`Dohánybolt` + ' 🚬',
	};

	yield sendQuickReply(
		t`Na, mit keresel?` + ' 📍',
		[
			...Object.keys(categories).map(category => ({
				title: categories[category],
				to: '/get-poi/' + category,
			})),
			...Object.keys(locations).map(location => ({
				title: locations[location],
				to: '/get-poi/request-location/' + location,
			})),
		],
		psid
	);
};

const getBar = function*({ locale, psid }) {
	const t = i18n(locale);

	const bars = {
		[BEER]: t`Sört` + ' 🍺',
		[WINE]: t`Bort` + ' 🍷',
		[COCKTAILS]: t`Koktélt` + ' 🍹',
		[WHISKY]: t`Viszkit` + ' 🥃',
		[COFFEE]: t`Coffee` + ' ☕',
	};

	yield sendQuickReply(
		t`Jó, de mit szeretnél inni?`,
		Object.keys(bars).map(bar => ({
			title: bars[bar],
			to: '/get-poi/request-location/' + bar,
		})),
		psid
	);
};

const getService = function*({ locale, psid }) {
	const t = i18n(locale);

	const services = {
		[LOCKERS]: t`Értékmegőrző` + ' 💍',
		[CHARGING_STATION]: t`Telefontöltés` + ' 🔋',
		[FIRST_AID]: t`Elsősegély` + ' 🏥',
		[INFORMATION]: t`Információ` + ' ℹ️',
	};

	yield sendQuickReply(
		t`Jó, de az bármi lehet...`,
		Object.keys(services).map(service => ({
			title: services[service],
			to: '/get-poi/request-location/' + service,
		})),
		psid
	);
};

const getFood = function*({ locale, psid }) {
	const t = i18n(locale);

	const foods = {
		[HOTDOG_HAMBURGER]: t`Amerikai` + ' 🍔 🌭',
		[PIZZA]: t`Pizza` + ' 🍕',
		[MEXICAN]: t`Mexikói` + ' 🌮',
		[GYROS]: t`Gyros`,
		[HEALTHY_FOOD]: t`Egészséges` + ' 🥗',
		[BREAKFAST]: t`Reggeli` + ' 🍳',
		[FISH]: t`Hal` + ' 🐟',
	};

	yield sendQuickReply(
		t`Konyha jellege` + ' 🍽️',
		Object.keys(foods).map(food => ({
			title: foods[food],
			to: '/get-poi/request-location/' + food,
		})),
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
