const GetStarted = require('./conversations/getStarted');
const StreamProviderAuth = require('./conversations/streamProviderAuth');

const routes = {
	'/get-started': GetStarted.getStarted,

	'/stream-provider-auth/confirm-select': StreamProviderAuth.confirmSelect,
	'/stream-provider-auth/select': StreamProviderAuth.select,
	'/stream-provider-auth/select-later': StreamProviderAuth.selectLater,
	'/stream-provider-auth/spotify': StreamProviderAuth.spotify,
	'/stream-provider-auth/data-received': StreamProviderAuth.dataReceived
};

module.exports = async function(payload, context) {
	if (routes[payload]) {
		return routes[payload](context);
	}

	console.log('Unhandled route:', payload);
};
