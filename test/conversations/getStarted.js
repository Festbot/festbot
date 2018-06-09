const { getStarted } = require('../../src/conversations/getStarted');
const { isAction, actionTypeMatches } = require('../helpers/actions');
const { GET_FACEBOOK_DATA } = require('../../src/actionTypes');

const contextMock = {
	locale: 'hu_HU',
	name: 'Andor',
	psid: 1,
};

describe('getStarted', function() {
	const generator = getStarted(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, GET_FACEBOOK_DATA);
	});
});
