const { savePoi } = require('../../src/conversations/addPoi');
const { isAction, actionTypeMatches } = require('../helpers/actions');
const { ADD_POI, SEND_REPLY } = require('../../src/actionTypes');

const contextMock = {
	locale: 'hu_HU',
	psid: 1,
	activeFestival: 2,
};

describe('savePoi', function() {
	const generator = savePoi(contextMock, '1:1');

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, ADD_POI);
	});

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_REPLY);
	});
});
