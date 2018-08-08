const i18n = require('../i18n');
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
	VEGAN,
} = require('./poiTypes');

const getBars = function(locale) {
	const t = i18n(locale);

	return {
		[BEER]: t`Sört` + ' 🍺',
		[WINE]: t`Bort` + ' 🍷',
		[COCKTAILS]: t`Koktélt` + ' 🍹',
		[WHISKY]: t`Viszkit` + ' 🥃',
		[COFFEE]: t`Coffee` + ' ☕',
		[SHOTS]: t`Pálinka` + ' 🍶',
	};
};

const getServices = function(locale) {
	const t = i18n(locale);

	return {
		[LOCKERS]: t`Értékmegőrző` + ' 💍',
		[CHARGING_STATION]: t`Telefontöltés` + ' 🔋',
		[FIRST_AID]: t`Elsősegély` + ' 🏥',
		[PHARMACY]: t`Gyógyszertár` + ' 💊',
		[INFORMATION]: t`Információ` + ' ℹ️',
		[ATM]: t`ATM` + ' 🏧',
		[MASSAGE]: t`Masszázs` + ' 💆‍♀️',
		[BIKE_STORAGE]: t`Biciklitároló` + ' 🚲',
	};
};

const getFoods = function(locale) {
	const t = i18n(locale);

	return {
		[HOTDOG_HAMBURGER]: t`Amerikai` + ' 🍔 🌭',
		[PIZZA]: t`Pizza` + ' 🍕',
		[MEXICAN]: t`Mexikói` + ' 🌮',
		[GYROS]: t`Gyros`,
		[HEALTHY_FOOD]: t`Egészséges` + ' 🥗',
		[BREAKFAST]: t`Reggeli` + ' 🍳',
		[FISH]: t`Hal` + ' 🐟',
		[VEGAN]: t`Vegán` + ' 🥦',
	};
};

const getOthers = function(locale) {
	const t = i18n(locale);

	return {
		[WC]: t`Vécét` + ' 🚻',
		[CAMPING]: t`Kempinget` + ' ⛺⛺⛺',
		[ENTRANCE]: t`Bejárat` + ' ⛩️',
		[TAXI]: t`Hiénákat` + ' 🚕🚕🚕',
		[SUPERMARKET]: t`Bolt` + ' 🛒',
		[PARKING]: t`Parkolót` + ' 🅿️',
		[TOBACCO]: t`Dohánybolt` + ' 🚬',
	};
};

module.exports = { getBars, getServices, getFoods, getOthers };
