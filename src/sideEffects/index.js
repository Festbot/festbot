const festbot = require('./festbot');
const facebook = require('./facebook');
const spotify = require('./spotify');

const ConversationContextProvider = require('../conversationContextProvider');
const sleep = timeout =>
	new Promise(resolve => {
		setTimeout(resolve, timeout);
	});

const { SLEEP, SET_CONTEXT } = require('../actionTypes');

const executeAction = async function({ type, payload }) {
	switch (type) {
		case SLEEP:
			return await sleep(payload.timeout);
		case SET_CONTEXT:
			return await ConversationContextProvider.set(
				payload.psid,
				payload.context
			);
	}

	return (await festbot()) || (await facebook()) || (await spotify());
};

module.exports = executeAction;
