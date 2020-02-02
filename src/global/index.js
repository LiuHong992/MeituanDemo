import Vue from 'vue'
import Headers from '../components/Homepages/Header/Header'
import Searchtop from '../components/Homepages/Searchtop/Searchtop'
import Footers from '../components/Homepages/Footers/Footers'

Vue.component('headers', Headers)
Vue.component('searchtop', Searchtop)
Vue.component('footers', Footers)
    // 封装的跳转方法
Vue.prototype.$goto = function(path, item, key, index = 1) {
    if (item && key) {
        this.$router.push({
            name: path,
            query: {
                items: JSON.stringify(item),
                key: key
            }
        });
    } else if (item) {
        this.$router.push({
            name: path,
            query: {
                items: JSON.stringify(item),
            }
        });
    } else {
        this.$router.push(path)
    }
}