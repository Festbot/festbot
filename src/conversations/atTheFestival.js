const toilet = function*({ i18n: t }) {
	return t`And now what? Go to the toilet!` + ' 🚽';
};

const food = function*({ i18n: t }) {
	return t`Mee too...` + ' 😞';
};

const agenda = function*({ i18n: t }) {
	return t`Sorry, what?` + ' 😕';
};

module.exports = { toilet, food, agenda };
