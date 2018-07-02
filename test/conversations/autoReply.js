const { autoReply } = require('../../src/conversations/autoReply');
const { isAction, actionTypeMatches } = require('../helpers/actions');
const { SEND_BUTTONS } = require('../../src/actionTypes');

const contextMock = {
	locale: 'hu_HU',
	psid: 1,
	activeFestival: 2,
	sendOrSave: 'send',
};

describe('autoReply', function() {
	const generator = autoReply(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_BUTTONS);
	});
});
