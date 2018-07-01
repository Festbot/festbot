const {
	sendReply,
	sendLocation,
	sendQuickReply,
	addPoi: addPoiToDb,
	setContext,
	sendWebViewButton,
	getVenues,
	updateVenueLocation,
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
	ATM,
	MASSAGE,
	SHOTS,
	PHARMACY,
	BIKE_STORAGE,
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

const addPoi = function*({ locale, psid, activeFestival }) {
	const t = i18n(locale);

	if (!activeFestival) {
		yield* noActiveFestival.apply(null, arguments);
		return;
	}

	const categories = {
		'add-stage': t`Színpadot` + ' 😎',
		'add-food': t`Kaját` + ' 🍽️',
		'add-bar': t`Piát` + ' 🍻',
		'add-service': t`Szolgáltatást`,
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
		t`Na, mit találtál?` + ' 📍',
		[
			...Object.keys(categories).map(category => ({
				title: categories[category],
				to: '/add-poi/' + category,
			})),
			...Object.keys(locations).map(location => ({
				title: locations[location],
				to: '/add-poi/request-location/' + location,
			})),
		],
		psid
	);
};

const addBar = function*({ locale, psid }) {
	const t = i18n(locale);

	const bars = {
		[BEER]: t`Sört` + ' 🍺',
		[WINE]: t`Bort` + ' 🍷',
		[COCKTAILS]: t`Koktélt` + ' 🍹',
		[WHISKY]: t`Viszkit` + ' 🥃',
		[COFFEE]: t`Coffee` + ' ☕',
		[SHOTS]: t`Pálinka` + ' 🍶',
	};

	yield sendQuickReply(
		t`Jó, de mit lehet ott inni? ` + ' ',
		Object.keys(bars).map(bar => ({
			title: bars[bar],
			to: '/add-poi/request-location/' + bar,
		})),
		psid
	);
};

const addService = function*({ locale, psid }) {
	const t = i18n(locale);

	const services = {
		[LOCKERS]: t`Értékmegőrző` + ' 💍',
		[CHARGING_STATION]: t`Telefontöltés` + ' 🔋',
		[FIRST_AID]: t`Elsősegély` + ' 🏥',
		[PHARMACY]: t`Gyógyszertár` + ' 💊',
		[INFORMATION]: t`Információ` + ' ℹ️',
		[ATM]: t`ATM` + ' 🏧',
		[MASSAGE]: t`Masszázs` + ' 💆‍♀️',
		[BIKE_STORAGE]: t`Biciklitároló` + ' 🚲',
	};

	yield sendQuickReply(
		t`Jó, de az bármi lehet...`,
		Object.keys(services).map(service => ({
			title: services[service],
			to: '/add-poi/request-location/' + service,
		})),
		psid
	);
};

const addFood = function*({ locale, psid }) {
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
			to: '/add-poi/request-location/' + food,
		})),
		psid
	);
};

const addStage = function*({ locale, psid, activeFestival }) {
	const t = i18n(locale);

	const stages = yield getVenues(activeFestival, 'stage');

	yield sendQuickReply(
		t`Melyik színpadot?`,
		stages.map(stage => ({
			title: stage.name,
			to: '/add-poi/request-location/stage:' + stage._id,
		})),
		psid
	);
};

const requestLocation = function*({ locale, psid }, type) {
	const t = i18n(locale);

	const [poi, poiId] = type.split(':');

	if (poi === 'stage') {
		yield setContext(psid, {
			lastAskedLocation: poiId,
			locationRequestedFor: 'save-stage',
		});
	} else {
		yield setContext(psid, {
			lastAskedLocation: poi,
			locationRequestedFor: 'save-poi',
		});
	}

	yield sendLocation(t`Add meg a helyzetét!` + ' 📍', psid);
};

const savePoi = function*(
	{ locale, psid, activeFestival, lastAskedLocation, locationRequestedFor },
	location
) {
	if (locationRequestedFor !== 'save-poi') {
		return;
	}

	const t = i18n(locale);
	const [lat, lng] = location.split(':');

	yield addPoiToDb(activeFestival, lastAskedLocation, lat, lng);
	yield sendReply(t`Köszi, így most már megvan!` + ' 🤟', psid);
};

const saveStage = function*(
	{ locale, psid, locationRequestedFor, lastAskedLocation },
	location
) {
	if (locationRequestedFor !== 'save-stage') {
		return;
	}

	const t = i18n(locale);
	const [lat, lng] = location.split(':');

	yield updateVenueLocation(lastAskedLocation, lat, lng);
	yield sendReply(t`Köszi, most már megvan a színpad!` + ' 🤟', psid);
};

module.exports = {
	addPoi,
	requestLocation,
	addFood,
	savePoi,
	addBar,
	addService,
	addStage,
	saveStage,
};
