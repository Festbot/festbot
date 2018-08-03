const {
	askLanguage,
	setLanguage,
} = require('../../src/conversations/settings');
const { isAction, actionTypeMatches } = require('../helpers/actions');
const { SEND_QUICK_REPLY, SET_CONTEXT } = require('../../src/actionTypes');

const contextMock = {
	locale: 'hu_HU',
	psid: 1,
};

describe('askLanguage', function() {
	const generator = askLanguage(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_QUICK_REPLY);
	});
});

describe('setLanguage', function() {
	const generator = setLanguage(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SET_CONTEXT);
	});
});
