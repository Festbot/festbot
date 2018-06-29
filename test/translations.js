const fs = require('fs');
const locales = {
	en_US: require('../src/locales/en_US')
};

function replaceKeys(text) {
	const regex = /\$\{[a-zA-z._\s\+]+\}/;
	let counter = 1;
	while(regex.test(text)) {
		text = text.replace(regex, '{' + counter + '}');
		counter++;
	}

	return text;
}

function getTexts(file) {
	const regex = /t`([a-zA-Z.,'’_?!$áÁéÉíÍóÓöÖőŐüÜ\s\+\{\}]+)`/g;
	return texts = file.match(regex)
		.map(text => text.substring(2))
		.map(text => text.slice(0, -1));
}

fs.readdirSync('./src/conversations').forEach(file => {
	const content = fs.readFileSync('./src/conversations/' + file).toString();

	Object.keys(locales).forEach(locale => {
		getTexts(content).forEach(text => {
			if (!locales[locale][replaceKeys(text)]) {
				console.log('Missing translation:', file, '"' + replaceKeys(text) + '"');
			}
		});
	});
});

