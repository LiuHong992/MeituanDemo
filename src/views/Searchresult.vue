<template>
  <div>
    <!-- 头部 -->
    <headers></headers>
    <!-- 搜索框 -->
    <searchtop :menus="menus" :nums="nums" class="city-searchtop"></searchtop>
    <div class="searchcontents">
      <div class="crumb flex">
        <span class="city-crumb">
          {{$store.state.citys}}美团
          <div class="right-arrow"></div>
        </span>
        <h3>{{$store.state.citys}}{{keywords}}</h3>
      </div>
      <!-- 搜索详情页内容层头部 -->
      <searchcontenttop :suggestArr="suggestArr" :areasArr="areasArr" :menus="menus" :keywords="keywords"></searchcontenttop>
    </div>l
    <!-- 底部 -->
    <footers></footers>
  </div>
</template>

<script>
import searchcontenttop from "../components/Searchresult/Searchcontenttop";
export default {
  data() {
    return {
      // 接收分类总数据的数组
      menus: [],
      // 定义的第三方参数，用来决定搜索框组件中的全部分类框是否显示
      nums: 1,
      // 接收到的搜索关键词
      keywords: "",
      // 接收区域分类的数组
      areasArr: [],
      // 搜索建议数组
      searchS: [],
      // 接收搜索出来的数据的数组
      suggestArr: []
    };
  },
  components: {
    searchcontenttop
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
    },
    // 获取最近城市
    getNearcity() {
      this.$api
        .getCitymain(this.$store.state.citys)
        .then(res => {
          if (res.code === 200 && res.data.areas.length > 0) {
            this.areasArr = res.data.areas;
            // console.log(this.areasArr);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 搜索建议
    searchSuggest() {
      setTimeout(() => {
        this.$api
          .Searchsuggest(this.$store.state.citys, this.keywords)
          .then(res => {
            if (res.code === 200) {
              this.searchS = res.data.top;
              if (this.$store.state.citys !== "") {
                this.getMaininfo();
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }, 500);
    },
    // 展示数据方法
    getMaininfo() {
      this.searchS.map(items => {
        this.$api
          .Products(items.name, this.$store.state.citys)
          .then(res => {
            if (res.code === 200) {
              // console.log(res);
              this.suggestArr.push(res.data);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
      console.log(this.suggestArr);
    }
  },
  mounted() {
    this.getClassfy();
    // 如果是从定位的页面选择了城市过来就对附近城市进行重新请求
    setTimeout(() => {
      if (this.$store.state.citys !== "") {
        this.getNearcity();
      }
    }, 350);
    this.searchSuggest();
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
.searchcontents {
  max-width: 1190px;
  margin: 0 auto;
  padding-top: 10px;
  .crumb {
    margin: 11px 0;
    color: #222;
    font-size: 12px;
    line-height: 20px;
    .city-crumb {
      position: relative;
      margin-right: 13px;
      &:hover {
        cursor: pointer;
        color: #fe8c00;
      }
      .right-arrow {
        position: absolute;
        top: 8px;
        right: -8px;
        width: 5px;
        height: 5px;
        border-top: 1px solid #222;
        border-right: 1px solid #222;
        transform: rotate(45deg);
      }
    }
    h3 {
      &:hover {
        cursor: pointer;
        color: #fe8c00;
      }
    }
  }
}
</style>