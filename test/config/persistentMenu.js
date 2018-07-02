const { getPersistentMenu } = require('../../src/config/persistentMenu');
const assert = require('chai').assert;

describe('testing persistent menu', function() {
	const persistentMenu = getPersistentMenu();

	it('cant have more than 3 menus', function() {
		persistentMenu.forEach(menu => {
			assert.isAtMost(menu.call_to_actions.length, 3);
		});
	});

	it('cant have more than 4 submenus', function() {
		persistentMenu.forEach(menu => {
			menu.call_to_actions.forEach(submenu => {
				assert.isAtMost(submenu.call_to_actions.length, 4);
			});
		});
	});

	it('title cant be longer than 30 chars', function() {
		persistentMenu.forEach(menu => {
			menu.call_to_actions.forEach(submenu => {
				assert.isAtMost(submenu.title.length, 30);
			});
		});
	});

	it('title cant be longer than 30 chars', function() {
		persistentMenu.forEach(menu => {
			menu.call_to_actions.forEach(submenu => {
				submenu.call_to_actions.forEach(submenu2 => {
					assert.isAtMost(submenu2.title.length, 30);
				});
			});
		});
	});
});
