const path          = require('path');
const dashboardDist = path.relative(process.cwd(), '/Users/leon/wulianwang/simboss-dashboard/simboss-dashboard-web/src/main/webapp/js/fe/');
/**
 * 暂时不写, 有点懒
 */
module.exports = {
	dllDist: path.resolve(process.cwd(), './public/js'),
	proDllDist: dashboardDist,
	bundleDist: path.resolve(process.cwd(), './public/js'),
	devEntry: path.resolve(process.cwd(), './src/entry.js'),
	proEntry: path.resolve(process.cwd(), './src/ibilling.js'),
	proOutput: dashboardDist,
	devPackage: {
		'vue': 'vue/dist/vue.js',
		'vue-router': 'vue-router/dist/vue-router.js',
		'js-cookie': 'js-cookie/src/js.cookie.js',
		'axios': 'axios/dist/axios.js'
	},
	devDllPackage: [
		'vue/dist/vue.js',
		'vue-router/dist/vue-router.js',
		'js-cookie/src/js.cookie.js',
		'axios/dist/axios.js'
	],
	proPackage: {
		'vue': 'vue/dist/vue.min.js',
		'vue-router': 'vue-router/dist/vue-router.min.js',
		'js-cookie': 'js-cookie/src/js.cookie.js',
		'axios': 'axios/dist/axios.min.js'
	},
	proDllPackage: [
		'vue/dist/vue.min.js',
		'vue-router/dist/vue-router.min.js',
		'js-cookie/src/js.cookie.js',
		'axios/dist/axios.min.js'
	]
};
