import Vue from 'vue'
import App from './App'
import request from 'common/request.js'

Vue.prototype.$http = request
Vue.config.productionTip = false

App.mpType = 'app'


const app = new Vue({
	...App
})
app.$mount()
