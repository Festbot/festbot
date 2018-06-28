const { getTodaysAgenda } = require('../../../src/apiHelpers/festbot/agenda');
const assert = require('chai').assert;

describe('festbot api agenda: getTodaysAgenda', function() {
	it('should return with an array', async function() {
		const agenda = await getTodaysAgenda([
			'f442bee64bb034de9a00e5b3bdb9e0c7',
			'f442bee64bb034de9a00e5b3bdb52fb2',
			'f442bee64bb034de9a00e5b3bdb4c319',
		]);
		console.log(agenda);
		assert.isArray(agenda);
	});
});
