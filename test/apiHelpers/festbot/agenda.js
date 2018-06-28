const { getTodaysAgenda } = require('../../../src/apiHelpers/festbot/agenda');
const assert = require('chai').assert;

describe('festbot api agenda: getTodaysAgenda', function() {
	it('should return with an array', async function() {
		const agenda = await getTodaysAgenda([
			'f442bee64bb034de9a00e5b3bdb4ebec',
			'f442bee64bb034de9a00e5b3bdb602cc',
			'f442bee64bb034de9a00e5b3bdb50a8f',
		]);
		console.log(agenda);
		assert.isArray(agenda);
	});
});
