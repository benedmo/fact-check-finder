import optionsStorage from './options-storage.js';

async function init() {
	const options = await optionsStorage.getAll();
	const notice = document.createElement('div');
	notice.innerHTML = text;
	document.body.append(notice);
	notice.id = 'text-notice';
	notice.style.border = '2px solid ' + color;
	notice.style.color = color;
}

init();
