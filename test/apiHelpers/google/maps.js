const { getStaticMapUrl } = require('../../../src/apiHelpers/google/maps');
const assert = require('chai').assert;

describe('google api: getStaticMapUrl', function() {
	it('should return with a string', function() {
		const url = getStaticMapUrl('40.714728', '-73.998672');
		assert.isString(url);
	});
});
