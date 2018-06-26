const GetStarted = require('./conversations/getStarted');
const StreamProviderAuth = require('./conversations/streamProviderAuth');
const AtTheFestival = require('./conversations/atTheFestival');
const FavoriteGenres = require('./conversations/favroiteGenres');
const Settings = require('./conversations/settings');
const pathToRegexp = require('path-to-regexp');
const SobrietyTest = require('./conversations/sobrietyTest');
const AddPoi = require('./conversations/addPoi');
const GetPoi = require('./conversations/getPoi');

const routes = [
	{ route: '/get-started', handler: GetStarted.getStarted },

	{
		route: '/stream-provider-auth/confirm-select',
		handler: StreamProviderAuth.confirmSelect,
	},
	{
		route: '/stream-provider-auth/select',
		handler: StreamProviderAuth.select,
	},
	{
		route: '/stream-provider-auth/dont-want',
		handler: StreamProviderAuth.dontWant,
	},
	{
		route: '/stream-provider-auth/auth/:provider',
		handler: StreamProviderAuth.auth,
	},
	{
		route: '/stream-provider-auth/token-received/spotify/:accessToken',
		handler: StreamProviderAuth.spotifyTokenReceived,
	},

	{ route: '/at-the-festival/food', handler: AtTheFestival.food },
	{ route: '/at-the-festival/toilet', handler: AtTheFestival.toilet },
	{ route: '/at-the-festival/agenda', handler: AtTheFestival.agenda },

	{
		route: '/favorite-genres/random-artist',
		handler: FavoriteGenres.randomArtist,
	},

	{ route: '/settings/ask-language', handler: Settings.askLanguage },
	{
		route: '/settings/set-language/:language',
		handler: Settings.setLanguage,
	},

	{
		route: '/add-poi/add-poi',
		handler: AddPoi.addPoi,
	},
	{
		route: '/add-poi/save-poi/:location',
		handler: AddPoi.savePoi,
	},
	{
		route: '/add-poi/add-food',
		handler: AddPoi.addFood,
	},
	{
		route: '/add-poi/add-bar',
		handler: AddPoi.addBar,
	},
	{
		route: '/add-poi/add-service',
		handler: AddPoi.addService,
	},
	{
		route: '/add-poi/request-location/:type',
		handler: AddPoi.requestLocation,
	},
	{
		route: '/add-poi/add-stage',
		handler: AddPoi.addStage,
	},
	{
		route: '/add-poi/save-stage/:location',
		handler: AddPoi.saveStage,
	},

	{
		route: '/get-poi/get-poi',
		handler: GetPoi.getPoi,
	},
	{
		route: '/get-poi/send-poi/:location',
		handler: GetPoi.sendPoi,
	},
	{
		route: '/get-poi/get-food',
		handler: GetPoi.getFood,
	},
	{
		route: '/get-poi/get-bar',
		handler: GetPoi.getBar,
	},
	{
		route: '/get-poi/get-service',
		handler: GetPoi.getService,
	},
	{
		route: '/get-poi/request-location/:type',
		handler: GetPoi.requestLocation,
	},

	{
		route: '/sobriety-test/how-many-drinks',
		handler: SobrietyTest.howManyDrinks,
	},
	{
		route: '/sobriety-test/how-many-fingers/:drunkness',
		handler: SobrietyTest.howManyFingers,
	},
	{
		route: '/sobriety-test/dont-text-your-ex',
		handler: SobrietyTest.dontTextYourEx,
	},
	{
		route: '/sobriety-test/do-the-math',
		handler: SobrietyTest.doTheMath,
	},
	{
		route: '/sobriety-test/do-you-know-where-you-are',
		handler: SobrietyTest.doYouknowWhereYouAre,
	},
].map(route => ({ ...route, regex: pathToRegexp(route.route) }));

const matchRoute = function(routes, payload) {
	for (let i = 0; i < routes.length; i++) {
		if (routes[i].regex.test(payload)) {
			[, param] = payload.match(routes[i].regex);
			return {
				handler: routes[i].handler,
				param: param,
			};
		}
	}

	throw new Error('Unhandled route: ' + payload);
};

module.exports = { routes, matchRoute };
