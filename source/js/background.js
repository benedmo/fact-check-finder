// eslint-disable-next-line import/no-unassigned-import
import './options-storage.js';
import browser from 'webextension-polyfill';

browser.contextMenus.create({
	id: "action-selection",
	title: "Search highlighted text for a fact-check",
	contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
	switch (info.menuItemId) {
		case "action-selection":
			console.log(`Selected text "${info.selectionText}"`)
			break;
		// …
	}
})