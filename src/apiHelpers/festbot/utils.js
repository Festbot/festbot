const request = require('request-promise');

const getUUID = async function() {
	const { uuids } = await request.get({
		url: `https://api.festbot.com/_uuids`,
		json: true,
	});

	return uuids[0];
};

const getDoc = async function(db, id) {
	const options = {
		url: 'https://api.festbot.com/' + db + '/' + id,
		json: true,
	};

	return await request.get(options);
};

const createDoc = async function(db, data) {
	const options = {
		url: 'https://api.festbot.com/' + db,
		json: data,
	};

	return await request.post(options);
};

const createDocWithId = async function(db, id, data) {
	const options = {
		url: 'https://api.festbot.com/' + db + '/' + id,
		json: data,
	};

	return await request.put(options);
};

const find = async function(db, selector) {
	const options = {
		url: 'https://api.festbot.com/' + db + '/_find',
		json: {
			selector,
		},
	};

	return await request.post(options);
};

const updateDoc = async function(db, id, data = {}) {
	const doc = await getDoc(db, id);
	const options = {
		url: 'https://api.festbot.com/' + db + '/' + id + '?rev=' + doc._rev,
		json: {
			...doc,
			...data,
		},
	};

	return await request.put(options);
};

module.exports = {
	getUUID,
	createDoc,
	createDocWithId,
	find,
	updateDoc,
	getDoc,
};
