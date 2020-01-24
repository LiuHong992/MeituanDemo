<template>
  <div class="bgs">
    <!-- 头部 -->
    <headers></headers>
    <!-- 头部搜索栏和导航栏 -->
    <searchtop :nums="nums"></searchtop>
    <!-- 分类和轮播图 -->
    <classfywheel :menus="menus"></classfywheel>
    <!-- 有格调 -->
    <styles></styles>
    <!-- 底部 -->
    <footers></footers>
  </div>
</template>

<script>
import classfywheel from "../components/Homepages/Classfywheel/Classfywheel";
import styles from "../components/Homepages/Style/Style";
export default {
  data() {
    return {
      // 接收分类总数据的数组
      menus: [],
      // 颜色数组
      colors: [
        "#FF8200",
        "#FFB500",
        "#9B5E3E",
        "#FFB500",
        "#FF3D00",
        "#03A9F4",
        "#00BF96",
        "#00BF96",
        "#FF4081",
        "#FF4081",
        "#FF4081",
        "#03A9F4",
        "#00BF96",
        "#00BF96",
        "#03A9F4",
        "#00BF96"
      ],
      // 定义的第三方参数，用来决定搜索框组件中的全部分类框是否显示
      nums: 0
    };
  },
  components: {
    classfywheel,
    styles
  },
  methods: {
    // 获取分类数据
    getClassfy() {
      this.$api
        .getAllclassfy()
        .then(res => {
          if (res.code === 200) {
            this.menus = res.data.menu;
            this.colors.map((item0, index0) => {
              this.menus.map((item, index) => {
                if (index0 === index) {
                  item.color = item0;
                }
              });
            });
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
.bgs {
  background-color: #f8f8f8;
}
</style>