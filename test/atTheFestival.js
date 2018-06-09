const AtTheFestival = require('../src/conversations/atTheFestival');
const assert = require('chai').assert;

const TEST_STRING = 'Xj>>-nj:&N!tiz0a+N7(Cul9k4C.YJFF';

const i18nTemplateFunction = function() {
	return TEST_STRING;
};

describe('toilet', function() {
	const getStarted = AtTheFestival.toilet({
		locale: 'hu_HU',
		gender: 'male',
		activeFestival: null,
		i18n: i18nTemplateFunction,
	});

	it('should return string', function() {
		const { value, done } = getStarted.next();
		assert.isString(value);
		assert.isFalse(done);
		assert.include(value, TEST_STRING);
	});
});
