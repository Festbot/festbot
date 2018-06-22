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

module.exports = { getUUID, createDoc };
