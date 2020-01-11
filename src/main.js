import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import dayjs from 'dayjs'
// import service from "./http"
import api from './http/api'

// Vue.use(ElementUI)
Vue.use(ViewUI);
// Vue.prototype.$axios = service
Vue.prototype.$dayjs = dayjs
Vue.prototype.$api = api
Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')