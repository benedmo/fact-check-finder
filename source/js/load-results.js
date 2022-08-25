
// Import browser from 'webextension-polyfill';
import optionsStorage from './options-storage.js';

document.addEventListener('DOMContentLoaded', async () => {
	fetchAndDisplayResults();
});

async function fetchAndDisplayResults() {
	console.log('displaying');
	const options = await optionsStorage.getAll();
	const resultsDiv = document.querySelector('#results');
	let newResultsHtml = '';
	if (options.factChecks.length > 0) {
		newResultsHtml = `<hr><p>Search query: "<b>${options.selectionText}</b>"</p>`;
		const rows = options.factChecks.map(({url, title, match, summary, source}) => `<tr title="${summary}\n${source}"><td><a href=${url}>${title}</a></td><td>${source}</td><td>${match}</td><tr>`).join('\n');
		newResultsHtml += `
		<table>
			<tr>
				<th>Article</th>
				<th>Source</th>
				<th>Similarity</th>
			</tr>
			${rows}
		</table>`;
	}

	resultsDiv.innerHTML = newResultsHtml;
}
