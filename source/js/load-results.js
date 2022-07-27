
// Import browser from 'webextension-polyfill';
import optionsStorage from './options-storage.js';

document.addEventListener('DOMContentLoaded', async () => {
	fetchAndDisplayResults();
});

async function fetchAndDisplayResults() {
	const options = await optionsStorage.getAll();
	const resultsDiv = document.querySelector('#results');
	let newResultsHtml = '';
	if (options.factChecks.length > 0) {
		const rows = options.factChecks.map(({url, title, similarity}) => `<tr><td>${similarity}</td><td><a href=${url}>${title}</a></td><tr>`).join('\n');
		newResultsHtml = `
		<hr>
		<table>
			<tr>
				<th>Article</th>
				<th>Similarity</th>
			</tr>
			${rows}
		</table>`;
	}

	resultsDiv.innerHTML = newResultsHtml;
}
