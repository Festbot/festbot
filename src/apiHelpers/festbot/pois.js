const { getUUID, createDoc, find } = require('./utils');

const addPoi = async function(
	festivalId = null,
	category = '',
	lat = 0,
	lng = 0
) {
	const uuid = await getUUID();
	await createDoc('pois', uuid, {
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
	return;
};

module.exports = { addPoi, getPois, getVenues, updateVenueLocation };
