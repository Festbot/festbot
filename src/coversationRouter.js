const GetStarted = require('./conversations/getStarted');
const StreamProviderAuth = require('./conversations/streamProviderAuth');
const AtTheFestival = require('./conversations/atTheFestival');

const routes = {
	'/get-started': GetStarted.getStarted,

	'/stream-provider-auth/confirm-select': StreamProviderAuth.confirmSelect,
	'/stream-provider-auth/select': StreamProviderAuth.select,
	'/stream-provider-auth/dont-want': StreamProviderAuth.dontWant,
	'/stream-provider-auth/spotify': StreamProviderAuth.spotify,
	'/stream-provider-auth/data-received': StreamProviderAuth.dataReceived,

	'/at-the-festival/food': AtTheFestival.food,
	'/at-the-festival/toilet': AtTheFestival.toilet,
	'/at-the-festival/agenda': AtTheFestival.agenda
};

module.exports = async function(payload, context) {
	if (routes[payload]) {
		return routes[payload](context);
	}

	console.log('Unhandled route:', payload);
};
