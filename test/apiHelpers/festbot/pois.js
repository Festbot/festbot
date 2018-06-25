const { getVenues } = require('../../../src/apiHelpers/festbot/pois');
const assert = require('chai').assert;

describe('festbot api pois: getVenues', function() {
	it('should return with an array', async function() {
		const uuid = await getVenues(
			'60b47fa2bc95b458fcc1d834dc01cbcf',
			'stage'
		);
		assert.isArray(uuid);
	});
});
