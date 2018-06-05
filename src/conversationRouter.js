const GetStarted = require('./conversations/getStarted');
const StreamProviderAuth = require('./conversations/streamProviderAuth');
const AtTheFestival = require('./conversations/atTheFestival');
const FavoriteGenres = require('./conversations/favroiteGenres');
const Settings = require('./conversations/settings');
const pathToRegexp = require('path-to-regexp');
const SobrietyTest = require('./conversations/sobrietyTest');
const Send = require('./send');
const i18n = require('./i18n');

const routes = [
	{ route: '/get-started', handler: GetStarted.getStarted },

	{
		route: '/stream-provider-auth/confirm-select',
		handler: StreamProviderAuth.confirmSelect
	},
	{
		route: '/stream-provider-auth/select',
		handler: StreamProviderAuth.select
	},
	{
		route: '/stream-provider-auth/dont-want',
		handler: StreamProviderAuth.dontWant
	},
	{
		route: '/stream-provider-auth/auth/:provider',
		handler: StreamProviderAuth.auth
	},
	{
		route: '/stream-provider-auth/data-received',
		handler: StreamProviderAuth.dataReceived
	},

	{ route: '/at-the-festival/food', handler: AtTheFestival.food },
	{ route: '/at-the-festival/toilet', handler: AtTheFestival.toilet },
	{ route: '/at-the-festival/agenda', handler: AtTheFestival.agenda },

	{
		route: '/favorite-genres/random-artist',
		handler: FavoriteGenres.randomArtist
	},

	{ route: '/settings/ask-language', handler: Settings.askLanguage },
	{
		route: '/settings/set-language/:language',
		handler: Settings.setLanguage
	},

	{
		route: '/sobriety-test/how-many-drinks',
		handler: SobrietyTest.howManyDrinks
	},
	{
		route: '/sobriety-test/how-many-fingers/:drunkness',
		handler: SobrietyTest.howManyFingers
	},
	{
		route: '/sobriety-test/dont-text-your-ex/:drunkness',
		handler: SobrietyTest.dontTextYourEx
	},
	{
		route: '/sobriety-test/do-you-know-where-you-are',
		handler: SobrietyTest.doYouknowWhereYouAre
	}
].map(route => ({ ...route, regex: pathToRegexp(route.route) }));

const matchRoute = function(routes, payload) {
	for (let i = 0; i < routes.length; i++) {
		if (routes[i].regex.test(payload)) {
			[, param] = payload.match(routes[i].regex);
			return {
				handler: routes[i].handler,
				param: param
			};
		}
	}

	throw new Error('Unhandled route: ' + payload);
};

const execRoute = async function(route, context, callback) {
	const iterator = route.handler(
		{ ...context, i18n: i18n(context.locale) },
		route.param
	);
	let message = '';
	while ((message = iterator.next().value)) {
		await callback(message);
	}
};

const router = async function(payload, context) {
	const route = matchRoute(routes, payload);
	execRoute(route, context, async function(message) {
		if (typeof message === 'string') {
			await Send.message(context.psid, message);
		} else if (message.quickReplies) {
			await Send.message(
				context.psid,
				message.message,
				message.quickReplies
			);
		} else if (message.buttons) {
			await Send.buttons(context.psid, message.message, message.buttons);
		} else if (message.loginButton) {
			await Send.loginButton(
				context.psid,
				message.message,
				message.loginButton
			);
		}
	});
};

module.exports = { router, routes, matchRoute, execRoute };
