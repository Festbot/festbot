const ConversationContextProvider = require('../conversationContextProvider');
const executeAction = require('./sideEffects');

const processAction = async function(conversation, param, psid) {
	const context = await ConversationContextProvider.get(psid);
	const generator = conversation(context, param);
	let done;
	let result;
	while (!done) {
		const yielded = generator.next(result);
		result = undefined;
		done = yielded.done;
		if (yielded.value) {
			result = await executeAction(yielded.value);
		}
	}
};

module.exports = { processAction };
