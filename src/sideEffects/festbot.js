const PoiApi = require('../apiHelpers/festbot/pois');
const AgendaApi = require('../apiHelpers/festbot/agenda');

const {
	ADD_POI,
	GET_POIS,
	GET_VENUES,
	UPDATE_VENUE_LOCATION,
	GET_AGENDA,
	GET_VENUE_LOCATION,
} = require('../actionTypes');

const executeAction = async function({ type, payload }) {
	switch (type) {
		case ADD_POI:
			return await PoiApi.addPoi(
				payload.festivalId,
				payload.category,
				payload.lat,
				payload.lng
			);

		case GET_POIS:
			return await PoiApi.getPois(
				payload.festivalId,
				payload.category,
				payload.lat,
				payload.lng
			);

		case GET_VENUES:
			return await PoiApi.getVenues(payload.festivalId, payload.category);

		case UPDATE_VENUE_LOCATION:
			return await PoiApi.updateVenueLocation(
				payload.venueId,
				payload.lat,
				payload.lng
			);

		case GET_VENUE_LOCATION:
			return await PoiApi.getVenueLocation(payload.venueId);

		case GET_AGENDA:
			return await AgendaApi.getTodaysAgenda(payload.psid);
	}
};

module.exports = executeAction;
