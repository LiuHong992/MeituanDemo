import Vue from 'vue'

// 封装的跳转方法
Vue.prototype.$goto = function (path,item, index = 1) {
  if (item) {
    this.$router.push({
      name: "path",
      query: {
        items: item
      }
    });
  }else{
    this.$router.push(path)
  }
}