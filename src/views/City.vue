<template>
  <div id="cityes">
    <!-- 头部 -->
    <headers></headers>
    <!-- 搜索框 -->
    <searchtop class="city-searchtop"></searchtop>
    <!-- 中间主题内容 -->
    <div class="cityes">
      <!-- 按省份选择 -->
      <citys :cityesObj="cityesObj" :cityesArr="cityesArr"></citys>
      <!-- 热门城市选择 -->
      <hotcitys :hotcity="hotcity"></hotcitys>
      <!-- 最近访问 -->
      <rencent></rencent>
      <!-- 锚点定位城市 -->
      <anchors :hotcity="hotcity" :cityesObj="cityesObj" :cityesArr="cityesArr"></anchors>
    </div>
    <!-- 底部 -->
    <footers></footers>
  </div>
</template>

<script>
import citys from "../components/City/Citys";
import hotcitys from "../components/City/Hotcity";
import rencent from "../components/City/Recentcity";
import anchors from "../components/City/Anchorcity";
import cities from "../assets/js/city";
export default {
  data() {
    return {
      // 从city.js文件中取出所有城市数据
      cityes: cities,
      // 接收从city.js文件中取出的城市数据的对象
      cityesObj: {},
      // 接收从city.js文件中取出的城市数据的数组
      cityesArr: [],
      // 接收热门城市数据的数组
      hotcity: []
    };
  },
  components: {
    citys,
    hotcitys,
    rencent,
    anchors
  },
  methods: {
    // 获取热门城市
    getHotcity() {
      this.$api
        .getHotcity()
        .then(res => {
          if (res.code === 200) {
            this.hotcity = res.data.hots;
            this.hotcity.map(item => {
              if (item.name === "市辖区") {
                item.name = item.province;
              }
            });
            // console.log(this.hotcity);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    // 从city.js文件中获取城市对象
    this.cityesObj = this.cityes.data.cities;
    // 通过循环对象键的方法将所有城市push进cityesArr这个数组中
    Object.keys(this.cityesObj).map(item => {
      this.cityesArr.push(...this.cityesObj[item]);
    });
    // 获取热门城市
    this.getHotcity();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
#cityes {
  background-color: #f8f8f8;
}
.city-searchtop {
  /deep/.searchcontent {
    height: 122px !important;
    padding-bottom: 0 !important;
  }
}
.cityes {
  width: 1190px;
  min-height: 1000px;
  margin: 20px auto 0;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  padding: 20px;
  font-size: 16px;
  color: #333;
}
</style>