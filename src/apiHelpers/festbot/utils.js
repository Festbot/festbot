const request = require('request-promise');

const getUUID = async function() {
	const { uuids } = await request.get({
		url: `https://api.festbot.com/_uuids`,
		json: true,
	});

	return uuids[0];
};

const createDoc = async function(db, id, data) {
	const options = {
		url: 'https://api.festbot.com/' + db + '/' + id,
		json: data,
	};

	const response = await request.put(options);
	return response;
};

const find = async function(db, selector) {
	const options = {
		url: 'https://api.festbot.com/' + db + '/_find',
		json: {
			selector,
		},
	};

	const response = await request.post(options);
	return response;
};

module.exports = { getUUID, createDoc, find };
