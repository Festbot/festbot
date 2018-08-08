const {
	sendReply,
	sendLocation,
	sendQuickReply,
	getPois,
	setContext,
	sendWebViewButton,
	sendMapMarker,
	getVenues,
} = require('../actions');
const i18n = require('../i18n');
const { getOthers, getBars, getFoods, getServices } = require('../config/pois');

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

	const categories = {
		'get-stage': t`Színpadot` + ' 😎',
		'get-food': t`Kaját` + ' 🍽️',
		'get-bar': t`Piát` + ' 🍻',
		'get-service': t`Szolgáltatást`,
	};

	const locations = getOthers();

	yield sendQuickReply(
		t`Mit keresel?` + ' 📍',
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

const getStage = function*({ locale, psid, activeFestival }) {
	const t = i18n(locale);

	const stages = yield getVenues(activeFestival, 'stage');

	yield sendQuickReply(
		t`Melyik színpadot?`,
		stages
			.map(stage => ({
				title: stage.name,
				to: '/get-poi/send-stage/' + stage._id,
			}))
			.slice(0, 8),
		psid
	);
};

const getBar = function*({ locale, psid }) {
	const t = i18n(locale);
	const bars = getBars();

	yield sendQuickReply(
		t`Mit szeretnél inni? ` + ' ',
		Object.keys(bars).map(bar => ({
			title: bars[bar],
			to: '/get-poi/request-location/' + bar,
		})),
		psid
	);
};

const getService = function*({ locale, psid }) {
	const t = i18n(locale);
	const services = getServices();

	yield sendQuickReply(
		t`A pontosítás végett muszáj megkérdeznem, hogy pontosan mit keresel`,
		Object.keys(services).map(service => ({
			title: services[service],
			to: '/get-poi/request-location/' + service,
		})),
		psid
	);
};

const getFood = function*({ locale, psid }) {
	const t = i18n(locale);
	const foods = getFoods();

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
		yield sendMapMarker(
			t`A hely helye`,
			poi.coordinates.lat,
			poi.coordinates.lng,
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

	const [poi, poiId] = type.split(':');

	if (poi === 'stage') {
		yield setContext(psid, {
			lastAskedLocation: poiId,
			locationRequestedFor: 'send-stage',
		});
	} else {
		yield setContext(psid, {
			lastAskedLocation: poi,
			locationRequestedFor: 'send-poi',
		});
	}

	yield sendLocation(t`Mondd meg, hogy hol vagy!` + ' 📍', psid);
};

const sendStage = function*({ locale, psid }, venueId) {
	const t = i18n(locale);
	const venue = yield getVenueLocation(venueId);

	if (venue) {
		const poi = pois[0];
		yield sendReply(t`Megtaláltam, mindjárt küldöm...` + ' 🤟', psid);

		yield sendMapMarker(
			t`Színpad`,
			poi.coordinates.lat,
			poi.coordinates.lng,
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

module.exports = {
	getPoi,
	requestLocation,
	getFood,
	sendPoi,
	getBar,
	getService,
	getStage,
	sendStage,
};
