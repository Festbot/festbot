const GetStarted = require('../src/conversations/getStarted');
const assert = require('chai').assert;

const TEST_STRING = 'nceiwrfyabhskd';

const i18nTemplateFunction = function() {
	return TEST_STRING;
};

describe('getStarted', function() {
	const getStarted = GetStarted.getStarted({
		locale: 'hu_HU',
		name: 'Andor',
		i18n: i18nTemplateFunction
	});

	it('should return string', function() {
		const { value, done } = getStarted.next();
		assert.isString(value);
		assert.isFalse(done);
		assert.include(value, TEST_STRING);
	});

	it('should return string', function() {
		const { value, done } = getStarted.next();
		assert.isString(value);
		assert.isFalse(done);
		assert.include(value, TEST_STRING);
	});

	it('should return string', function() {
		const { value, done } = getStarted.next();
		assert.isString(value);
		assert.isFalse(done);
		assert.include(value, TEST_STRING);
	});

	it('should return object', function() {
		const { value, done } = getStarted.next();
		assert.isObject(value, 'object');
		assert.isTrue(done);
	});
});
