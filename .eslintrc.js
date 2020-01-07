module.exports = {
	'env': {
		'browser': true,
		'es6': true,
		'node': true,
		'jquery': true
	},
	'extends': [
		'plugin:vue/essential',
		'@vue/standard'
	],
	parserOptions: {
		parser: 'babel-eslint'
	},
	'globals': {
		'Aliplayer': true,
		'echarts': true
	},
	'rules': {
		'indent': ["off", "tab"],
		'eqeqeq': ['off', 'smart'],
		'camelcase': ['off', { properties: 'never' }],
		'linebreak-style': [
			'off'
		],
		'quotes': [
			'warn',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'no-console': 'off',
		'no-debugger': 'off',
		"no-tabs": "off"
	}
};

