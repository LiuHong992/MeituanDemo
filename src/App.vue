<template>
  <div>
    <Backtop></Backtop>
    <router-view />
  </div>
</template>
<script>
import Backtop from "../src/components/Backtop";
export default {
  components: {
    Backtop
  },
  mounted() {
    this.$router.afterEach((to, from, next) => {
      window.scrollTo(0, 0);
    });
  }
};
</script>

<style lang="scss">
@import "../src/styles/common";
body {
  margin: 0;
  padding: 0;
}
.bg {
  background-color: #f8f8f8;
}
.flex {
  display: flex;
}
.between {
  justify-content: space-between;
}
.around {
  justify-content: space-around;
}
.textover {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.textalign {
  text-align: center;
}
// 顶部搜索框padding
.searchbottom {
  padding-bottom: 35px;
}
// 居中显示
.center {
  margin: 0 auto;
}
</style>
