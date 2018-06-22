const { getPoi } = require('../../src/conversations/getPoi');
const { isAction, actionTypeMatches } = require('../helpers/actions');
const { SEND_QUICK_REPLY } = require('../../src/actionTypes');

const contextMock = {
	locale: 'hu_HU',
	psid: 1,
	activeFestival: 2,
	sendOrSave: 'send',
};

describe('getPoi', function() {
	const generator = getPoi(contextMock, '1:1');

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_QUICK_REPLY);
	});
});
