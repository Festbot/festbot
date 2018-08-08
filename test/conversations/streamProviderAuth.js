const {
	confirmSelect,
	select,
	dontWant,
	auth,
	notice,
	spotifyTokenReceived,
} = require('../../src/conversations/streamProviderAuth');
const { isAction, actionTypeMatches } = require('../helpers/actions');
const {
	SEND_REPLY,
	SEND_QUICK_REPLY,
	SEND_BUTTONS,
	SEND_LOGIN_BUTTON,
	GET_SPOTIFY_ARTISTS,
} = require('../../src/actionTypes');

const contextMock = {
	locale: 'hu_HU',
	psid: 1,
};

describe('confirmSelect', function() {
	const generator = confirmSelect(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_QUICK_REPLY);
	});
});

describe('select', function() {
	const generator = select(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_BUTTONS);
	});
});

describe('dontWant', function() {
	const generator = dontWant(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_REPLY);
	});
});

describe('auth', function() {
	const generator = auth(contextMock, 'spotify');

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_LOGIN_BUTTON);
	});
});

describe('notice', function() {
	const generator = notice(contextMock);

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, SEND_REPLY);
	});
});

describe('spotifyTokenReceived', function() {
	const generator = spotifyTokenReceived(contextMock, 'token');

	it('returns an action', function() {
		const { value } = generator.next();

		isAction(value);
		actionTypeMatches(value, GET_SPOTIFY_ARTISTS);
	});
});
