const {
	sendReply,
	sendQuickReply,
	addPoi: addPoiToDb,
	sendWebViewButton,
	getVenues,
	updateVenueLocation,
} = require('../actions');

const {
	getFoodCategories,
	getServiceCategories,
	getDrinkCategories,
	getAssortedCategories,
} = require('../config/pois');

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

	const locations = getAssortedCategories(locale);

	yield sendQuickReply(
		t`Na, mit találtál?` + ' 📍',
		[
			...Object.keys(categories).map(category => ({
				title: categories[category],
				to: '/add-poi/' + category,
			})),
			...Object.keys(locations).map(location => ({
				title: locations[location],
				to: '/add-poi/request-poi-location/' + location,
			})),
		],
		psid
	);
};

const addBar = function*({ locale, psid }) {
	const t = i18n(locale);
	const bars = getDrinkCategories(locale);

	yield sendQuickReply(
		t`Jó, de mit lehet ott inni? ` + ' ',
		Object.keys(bars).map(bar => ({
			title: bars[bar],
			to: '/add-poi/request-poi-location/' + bar,
		})),
		psid
	);
};

const addService = function*({ locale, psid }) {
	const t = i18n(locale);
	const services = getServiceCategories(locale);

	yield sendQuickReply(
		t`Jó, de az bármi lehet...`,
		Object.keys(services).map(service => ({
			title: services[service],
			to: '/add-poi/request-poi-location/' + service,
		})),
		psid
	);
};

const addFood = function*({ locale, psid }) {
	const t = i18n(locale);
	const foods = getFoodCategories(locale);

	yield sendQuickReply(
		t`Konyha jellege` + ' 🍽️',
		Object.keys(foods).map(food => ({
			title: foods[food],
			to: '/add-poi/request-poi-location/' + food,
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
			to: '/add-poi/request-stage-location/' + stage._id,
		})),
		psid
	);
};

const requestStageLocation = function*({ locale, psid }, stageId) {
	const t = i18n(locale);

	yield requestLocation(
		t`Add meg a helyzet!` + ' 📍',
		'/add-poi/stage-location-received/' + stageId,
		psid
	);
};

const requestPoiLocation = function*({ locale, psid }, type) {
	const t = i18n(locale);

	yield requestLocation(
		t`Add meg a helyzet!` + ' 📍',
		'/add-poi/poi-location-received/' + type,
		psid
	);
};

const savePoi = function*(
	{ locale, psid, activeFestival, lastKnownLocation },
	type
) {
	const t = i18n(locale);

	yield addPoiToDb(
		activeFestival,
		type,
		lastKnownLocation.lat,
		lastKnownLocation.lng
	);

	yield sendReply(t`Köszi, így most már megvan!` + ' 🤟', psid);
};

const saveStage = function*({ locale, psid, lastKnownLocation }, stageId) {
	const t = i18n(locale);

	yield updateVenueLocation(
		stageId,
		lastKnownLocation.lat,
		lastKnownLocation.lng
	);

	yield sendReply(t`Köszi, most már megvan a színpad!` + ' 🤟', psid);
};

module.exports = {
	addPoi,
	addFood,
	savePoi,
	addBar,
	addService,
	addStage,
	saveStage,
	requestStageLocation,
	requestPoiLocation,
};
