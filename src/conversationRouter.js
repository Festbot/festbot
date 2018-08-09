const GetStarted = require('./conversations/getStarted');
const StreamProviderAuth = require('./conversations/streamProviderAuth');
const AtTheFestival = require('./conversations/atTheFestival');
const FavoriteGenres = require('./conversations/favroiteGenres');
const Settings = require('./conversations/settings');
const pathToRegexp = require('path-to-regexp');
const SobrietyTest = require('./conversations/sobrietyTest');
const GetPoi = require('./conversations/getPoi');
const Agenda = require('./conversations/agenda');
const AutoReply = require('./conversations/autoReply');
const FestivalNavigator = require('./conversations/festivalNavigator');

const routes = [
	{ route: '/auto-reply', handler: AutoReply.autoReply },

	{ route: '/auto-reply/sub-menu/:index', handler: AutoReply.subMenu },

	{ route: '/get-started', handler: GetStarted.getStarted },
	{ route: '/get-started/introduction', handler: GetStarted.introduction },
	{
		route: '/get-started/set-language/:locale',
		handler: GetStarted.setLanguage,
	},

	{ route: '/agenda/get-agenda', handler: Agenda.getAgenda },

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
	{
		route: '/stream-provider-auth/token-received/deezer/:accessToken',
		handler: StreamProviderAuth.deezerTokenReceived,
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
		route: '/get-poi/get-poi',
		handler: GetPoi.getPoi,
	},
	{
		route: '/get-poi/send-poi/:location',
		handler: GetPoi.sendPoi,
	},
	{
		route: '/get-poi/send-stage/:stageId',
		handler: GetPoi.sendStage,
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
		route: '/get-poi/get-stage',
		handler: GetPoi.getStage,
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
		route: '/sobriety-test/dont-text-your-ex/:drunkness',
		handler: SobrietyTest.dontTextYourEx,
	},
	{
		route: '/sobriety-test/do-the-math/:drunkness',
		handler: SobrietyTest.doTheMath,
	},
	{
		route: '/sobriety-test/do-you-know-where-you-are/:drunkness',
		handler: SobrietyTest.doYouknowWhereYouAre,
	},

	{
		route: '/festival-navigator/send-url',
		handler: FestivalNavigator.sendUrl,
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
