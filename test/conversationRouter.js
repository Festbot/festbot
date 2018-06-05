const {
	routes,
	matchRoute,
	router,
	execRoute
} = require('../src/conversationRouter');
const assert = require('chai').assert;
const isGeneratorFunction = require('is-generator-function');

describe('testing routes', function() {
	routes.forEach(route => {
		it(
			'route ' + route.route + ' should have a handler function*',
			function() {
				assert.isTrue(isGeneratorFunction(route.handler));
			}
		);
		it('route ' + route.route + ' should have a regexp', function() {
			assert.typeOf(route.regex, 'regexp');
		});
	});
});

describe('testing matchRoute', function() {
	routes.forEach(route => {
		it('route ' + route.route + ' should match', function() {
			assert.doesNotThrow(function() {
				matchRoute(routes, route.route);
			}, Error);
		});

		it('route ' + route.route + ' has handler', function() {
			assert.isFunction(matchRoute(routes, route.route).handler);
		});
	});

	it('not matching', function() {
		assert.throws(function() {
			matchRoute(routes, '/get-starte');
		}, Error);
	});

	it('matches param', function() {
		const { param } = matchRoute(routes, '/settings/set-language/hu_HU');
		assert.isString(param);
		assert.strictEqual(param, 'hu_HU');
	});
});

describe('testing execRoute', function() {
	routes.forEach(route => {
		it('route ' + route.route + ' should match', function() {
			assert.doesNotThrow(function() {
				const match = matchRoute(routes, route.route);
				execRoute(match, {}, function() {});
			}, Error);
		});
	});
});
