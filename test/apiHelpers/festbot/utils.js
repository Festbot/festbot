const { getUUID, createDoc } = require('../../../src/apiHelpers/festbot/utils');
const assert = require('chai').assert;

describe('festbot api utils: getUUID', function() {
	it('should return with a UUID', async function() {
		const uuid = await getUUID();
		assert.isString(uuid);
	});
});

describe('festbot api utils: createDoc', function() {
	it('should return with an object', async function() {
		const id = await getUUID();
		const response = await createDoc('test', id, { foo: 'bar' });
		assert.isObject(response);
		assert.isTrue(response.ok);
	});
});
