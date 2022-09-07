
import browser from 'webextension-polyfill';
import optionsStorage from './options-storage.js';

browser.contextMenus.create({
	id: 'action-selection',
	title: 'Search highlighted text for a fact-check',
	contexts: ['selection'],
});

/**
 * Received a URL from the API results and appends utm_ tags accordingly
 * @param {String} url
 * @returns {String} url with tags
 */
function transformUrlToHaveTagParameters(url) {
	const u = new URL(url);
	u.searchParams.set('utm_source', 'browser');
	u.searchParams.set('utm_medium', 'chrome');
	u.searchParams.set('utm_campaign', 'benedmo');
	return u.toString();
}

function getApiResults(selectedText) {
	return fetch('https://benedmo.textgain.com/matchfc', {
		method: 'POST',
		headers: {'Content-Type': 'application/json', 'X-API-KEY': 'e466882d-6d1e-463c-ba6b-2bf2c4d23cb6'},
		body: JSON.stringify({q: selectedText}),
	}).then(
		response => response.json(),
	).then(
		response => response.map(result => {
			result.url = transformUrlToHaveTagParameters(result.url);
			return result;
		}),
	);
}

browser.contextMenus.onClicked.addListener(async info => {
	switch (info.menuItemId) {
		case 'action-selection': {
			console.log(`Selected text "${info.selectionText}"`);
			const data = await getApiResults(info.selectionText);
			console.log(`got ${data.length} results`);
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
