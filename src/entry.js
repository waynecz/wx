import Vue from 'vue'
import mint from 'mint-ui'
import axios from 'axios'
import Cookies from 'js-cookie'
import 'mint-ui/lib/style.css'
import 'babel-polyfill'

import '../public/css/style-output.css'

import Router from 'vue-router';

Vue.use(mint);
Vue.use(Router);
window.axios   = axios;
window.Cookies = Cookies;
window.host    = 'http://localhost:7777';
window.cdn = 'http://ohc6dcvol.bkt.clouddn.com/';

const router = new Router({
	routes: [
		{
			path: '/login',
			name: 'login',
			component: (resolve) => require(['./components/user/login.vue'], resolve),
			beforeEnter: (to, from, next) => {
				next()
				axios({
					url: host + '/upstreams/heartbeat',
					withCredentials: true,
					method: 'GET'
				}).then(res =>{
					if (res.data.success) {
						next('/home/index')
					} else {
						next()
					}
				})
			},
		},
		{
			path: '/home',
			name: 'home',
			component: (resolve) => require(['./components/home/index.vue'], resolve),
			beforeEnter: (to, from, next) => {
				axios({
					url: host + '/upstreams/heartbeat',
					withCredentials: true,
					method: 'GET'
				}).then(res =>{
					if (res.data.success) {
						next()
					} else {
						next('/login')
					}
				})
			},
			// children: [
			// 	{
			// 		path: 'task',
			// 		name: 'task',
			// 		component: (resolve) => require(['./components/home/task.vue'], resolve),
			// 	},
			// 	{
			// 		path: 'addtask',
			// 		name: 'addtask',
			// 		component: (resolve) => require(['./components/home/addtask.vue'], resolve),
			// 	}
			// ]
		},
		{
			path: '*',
			redirect: '/login'
		}
	],
	linkActiveClass: 'active'
});

const app = new Vue({
	router
}).$mount('#app');

if (environment === 'dev') {
	Vue.config.devtools = true;
}

// 热重载配置
if (module.hot) {
	module.hot.accept();
}
