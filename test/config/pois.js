const {
	getBars,
	getServices,
	getFoods,
	getOthers,
} = require('../../src/config/pois');
const assert = require('chai').assert;

describe('testing pois', function() {
	it('getBars', function() {
		assert.doesNotThrow(function() {
			getBars('en_US');
		});
	});

	it('getServices', function() {
		assert.doesNotThrow(function() {
			getServices('en_US');
		});
	});

	it('getFoods', function() {
		assert.doesNotThrow(function() {
			getFoods('en_US');
		});
	});

	it('getOthers', function() {
		assert.doesNotThrow(function() {
			getOthers('en_US');
		});
	});
});
