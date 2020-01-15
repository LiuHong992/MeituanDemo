import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import dayjs from 'dayjs'
import api from './http/api'
import './global'
import utils from './assets/js/util'


Vue.use(ViewUI);
Vue.prototype.$utils = utils
Vue.prototype.$dayjs = dayjs
Vue.prototype.$api = api
Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')