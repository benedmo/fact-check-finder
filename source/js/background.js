
import browser from 'webextension-polyfill';
import optionsStorage from './options-storage.js';

browser.contextMenus.create({
	id: 'action-selection',
	title: 'Search highlighted text for a fact-check',
	contexts: ['selection'],
});

function getApiResults(selectedText) {
	// TODO: replace with real API calls
	return [
		{url: '#url1', title: selectedText, score: 0.65},
		{url: '#url2', title: 'found 2', score: 0.85},
	];
}

browser.contextMenus.onClicked.addListener(async info => {
	switch (info.menuItemId) {
		case 'action-selection': {
			console.log(`Selected text "${info.selectionText}"`);
			const data = getApiResults(info.selectionText);
			await optionsStorage.set({factChecks: data, selectionText: info.selectionText});
			try {
				// Does not work on chrome
				browser.browserAction.openPopup();
			} catch {
				browser.tabs.create({url: browser.runtime.getURL('html/results.html')});
			}

			break;
		}

		default:
			console.error(`Handler for action ${info.menuItemId} not found`);
	}
});
