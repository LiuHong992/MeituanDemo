<template>
  <div class="bgs">
    <!-- 头部 -->
    <headers></headers>
    <!-- 头部搜索栏和导航栏 -->
    <searchtop></searchtop>
    <!-- 分类和轮播图 -->
    <classfywheel :menus="menus"></classfywheel>
    <!-- 有格调 -->
    <styles></styles>
    <!-- 底部 -->
    <footers></footers>
  </div>
</template>

<script>
import headers from "../components/Homepages/Header/Header";
import searchtop from '../components/Homepages/Searchtop/Searchtop'
import classfywheel from '../components/Homepages/Classfywheel/Classfywheel'
import styles from '../components/Homepages/Style/Style'
import footers from '../components/Homepages/Footers/Footers'
export default {
  data() {
    return {
      // 接收分类总数据的数组
      menus:[],
      // 颜色数组
      colors:[
        '#FF8200','#FFB500','#9B5E3E','#FFB500','#FF3D00','#03A9F4',
        '#00BF96','#00BF96','#FF4081','#FF4081','#FF4081','#03A9F4',
        '#00BF96','#00BF96','#03A9F4','#00BF96'
      ]
    };
  },
  components: {
    headers,
    searchtop,
    classfywheel,
    styles,
    footers
  },
  methods: {
    // 获取分类数据
    getClassfy() {
      this.$api.getAllclassfy().then(res => {
        if(res.code === 200){
          this.menus = res.data.menu
          this.colors.map((item0,index0)=>{
            this.menus.map((item,index) => {
              if(index0 === index){
                item.color=item0
              }
            })
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.getClassfy()
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.bgs{
  background-color: #f8f8f8;
}
</style>