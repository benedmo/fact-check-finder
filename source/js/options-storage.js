import OptionsSync from 'webext-options-sync';

export default new OptionsSync({
	defaults: {
		colorRed: 244,
		colorGreen: 67,
		colorBlue: 54,
		text: 'Set a text!',
		factChecks: [],
	},
	migrations: [
		OptionsSync.migrations.removeUnused,
	],
	logging: true,
});
