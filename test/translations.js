const fs = require('fs');
const file = fs.readFileSync('./src/conversations/getStarted.js').toString();

function getTexts(file) {
	const regex = /t`([a-zA-z .,'’?!$\{\}]+)`(?:;|\s?\+)/g;
	const texts = [];

	while ((m = regex.exec(file)) !== null) {
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
		texts.push(m[1]);
	}

	return texts;
}

console.log(getTexts(file));
