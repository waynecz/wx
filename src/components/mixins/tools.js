import API from '../API/API'
export default {
	data () {
		return {
			ajaxloading: false,
		}
	},
	methods: {
		jax (url, data, option = {errmsg: '请求发生异常'}) {
			this.ajaxloading = true;

			return axios({
				url: host + url,
				withCredentials: true,
				data: data,
				method: 'POST'

			})
				.then(res => {
					this.ajaxloading = false;
					if (res.data.success) {
						return res.data
					} else {
						this.msg(res.data.message);
					}
				})
				.catch(e => {
					this.msg('网络出现异常，请稍后再试');
					console.warn(e);
					this.ajaxloading = false;
				})
		},
		get (url, data, option = {errmsg: '请求发生异常'}) {
			this.ajaxloading = true;
			console.log(url)
			return axios({
				url: host + url,
				withCredentials: true,
				data: data,
				method: 'GET'
			})
				.then(res => {
					this.ajaxloading = false;
					if (res.data.success) {
						return res.data
					} else {
						this.msg(res.data.message);
					}

				})
				.catch(e => {
					this.msg('网络出现异常，请稍后再试');
					console.warn(e);
					this.ajaxloading = false;
				})
		},
		msg (msg, time = 4) {
			Toast({
				message: msg,
				position: 'bottom',
				duration: time * 1000
			});
		},
		throttle (fn, delay, immediate, debounce) {
			let curr      = +new Date(),//当前事件
				last_call = 0,
				last_exec = 0,
				timer     = null,
				diff, //时间差
				context,//上下文
				args,
				exec      = function () {
					last_exec = curr;
					fn.apply(context, args);
				};
			return function () {
				curr = +new Date();
				context = this,
					args = arguments,
					diff = curr - (debounce ? last_call : last_exec) - delay;
				clearTimeout(timer);
				if (debounce) {
					if (immediate) {
						timer = setTimeout(exec, delay);
					} else if (diff >= 0) {
						exec();
					}
				} else {
					if (diff >= 0) {
						exec();
					} else if (immediate) {
						timer = setTimeout(exec, -diff);
					}
				}
				last_call = curr;
			}
		},
	}
}