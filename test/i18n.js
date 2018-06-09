const assert = require('assert');
const i18n = require('../src/i18n');

describe('i18n', function() {
	it('should return the correct translation', function() {
		const name = 'Andor';

		assert.strictEqual(
			i18n(
				'hu_HU'
			)`Hey ${name}, I’m here to assist you with festival related things.`,
			'Hey Andor, I’m here to assist you with festival related things.'
		);
	});

	it('should return the correct translation', function() {
		const name = 'Andor';

		assert.strictEqual(
			i18n(
				'en_US'
			)`Hey ${name}, I’m here to assist you with festival related things.`,
			'Hey Andor, I’m here to assist you with festival related things.'
		);
	});

	it('should return the correct translation', function() {
		assert.strictEqual(
			i18n('hu_HU')`Random, non-existent key.`,
			'Random, non-existent key.'
		);
	});
});
