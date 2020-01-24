<template>
  <div>
    <!-- 头部 -->
    <headers></headers>
    <!-- 搜索框 -->
    <searchtop :menus="menus" :nums="nums" class="city-searchtop"></searchtop>
    <!-- 搜索详情页内容层 -->
    <searchcontent :keywords="keywords"></searchcontent>
    <!-- 底部 -->
    <footers></footers>
  </div>
</template>

<script>
import searchcontent from "../components/Searchresult/Searchcontent";
export default {
  data() {
    return {
      // 接收分类总数据的数组
      menus: [],
      // 定义的第三方参数，用来决定搜索框组件中的全部分类框是否显示
      nums: 1,
      // 接收到的搜索关键词
      keywords: ""
    };
  },
  components: {
    searchcontent
  },
  methods: {
    // 获取分类数据
    getClassfy() {
      this.$api
        .getAllclassfy()
        .then(res => {
          if (res.code === 200) {
            this.menus = res.data.menu;
            this.keywords = this.$route.query.keyword;
            // console.log(this.keywords);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getClassfy();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.city-searchtop {
  /deep/.searchcontent {
    height: 122px !important;
    padding-bottom: 0 !important;
  }
}
</style>