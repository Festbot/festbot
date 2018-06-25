const {
	getUUID,
	createDoc,
	createDocWithId,
	find,
	updateDoc,
	getDoc,
} = require('../../../src/apiHelpers/festbot/utils');
const assert = require('chai').assert;

describe('festbot api utils: getUUID', function() {
	it('should return with a UUID', async function() {
		const uuid = await getUUID();
		assert.isString(uuid);
	});
});

describe('festbot api utils: createDoc', function() {
	it('should return with an object', async function() {
		const response = await createDoc('test', { foo: 'bar' });
		assert.isObject(response);
		assert.isTrue(response.ok);
	});
});

describe('festbot api utils: createDocWithId', function() {
	it('should return with an object', async function() {
		const id = await getUUID();
		const response = await createDocWithId('test', id, { foo: 'bar' });
		assert.isObject(response);
		assert.isTrue(response.ok);
	});
});

describe('festbot api utils: find', function() {
	it('should return with an object', async function() {
		const response = await find('pois', {
			category: 'wc',
			festivalId: 'f442bee64bb034de9a00e5b3bd985e70',
		});
		assert.isObject(response);
	});

	it('should return with an object', async function() {
		const response = await find('pois', {
			category: 'semmi',
			festivalId: '',
		});
		assert.isObject(response);
	});
});

describe('festbot api utils: updateDoc', function() {
	it('should return with an object', async function() {
		const { id } = await createDoc('test', { foo: 'bar' });
		const response = await updateDoc('test', id, { bar: 'foo' });
		assert.isObject(response);
		assert.isTrue(response.ok);
	});
});

describe('festbot api utils: getDoc', function() {
	it('should return with an object', async function() {
		const { id } = await createDoc('test', { foo: 'bar' });
		const response = await getDoc('test', id);
		assert.isObject(response);
		assert.strictEqual(response.foo, 'bar');
	});
});
