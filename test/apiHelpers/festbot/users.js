const {
	getUsersWithActiveFestival,
} = require('../../../src/apiHelpers/festbot/users');
const assert = require('chai').assert;

describe('festbot api users: getUsersWithActiveFestival', function() {
	it('should return with an array', async function() {
		const users = await getUsersWithActiveFestival(
			'60b47fa2bc95b458fcc1d834dc01cbcf'
		);
		assert.isArray(users);
	});
});
