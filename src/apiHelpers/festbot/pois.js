const { createDoc, find, updateDoc, getDoc } = require('./utils');

const addPoi = async function(
	festivalId = null,
	category = '',
	lat = 0,
	lng = 0
) {
	await createDoc('pois', {
		festivalId,
		category,
		coordinates: {
			lat: parseFloat(lat),
			lng: parseFloat(lng),
		},
	});
};

const getPois = async function(festivalId = null, category = '') {
	const { docs } = await find('pois', {
		festivalId,
		category,
	});

	return docs;
};

const getVenues = async function(festivalId, category) {
	const { docs } = await find('venues', {
		festivalId,
		category,
	});

	return docs;
};

const updateVenueLocation = async function(venueId, lat, lng) {
	updateDoc('venues', venueId, {
		coordinates: {
			lat: parseFloat(lat),
			lng: parseFloat(lng),
		},
	});

	return;
};

const getVenueLocation = async function(venueId) {
	const { coordinates } = await getDoc('venues', venueId);
	return coordinates;
};

module.exports = {
	addPoi,
	getPois,
	getVenues,
	updateVenueLocation,
	getVenueLocation,
};
