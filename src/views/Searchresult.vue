<template>
  <div class="bg">
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
      <searchcontenttop
        :suggestArr="suggestArr"
        :areasArr="areasArr"
        :menus="menus"
        :keywords="keywords"
      ></searchcontenttop>
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
      suggestArr: [],
      num: 0
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
        console.log(this.$store.state.shopArr);
      }, 500);
    },
    // 展示数据方法
    getMaininfo() {
      this.searchS.map((items, index) => {
        this.$api
          .Products(items.name, this.$store.state.citys)
          .then(res => {
            if (res.code === 200) {
              this.suggestArr.push(res.data);
              this.$store.state.shopArr.push(res.data.product);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
      // console.log(this.$store.state.shopArr);
      // this.$store.state.shopArr = this.suggestArr
      // console.log(this.$store.state.shopArr);
    },
    // 页面滚动距离
    initHeight() {
      // console.log(this.suggestArr);
      // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 (被卷曲的高度)
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // let num = 0;
      if (scrollTop > 481 && scrollTop < this.suggestArr.length * 166 + 218) {
        // console.log(scrollTop);
        this.num = parseInt((scrollTop - 481) / 166);
        if (this.num > this.suggestArr.length) {
          this.num = this.suggestArr.length;
        }
      }
      // console.log(this.num);
      // if (this.$store.state.location.length > 0) {
      if (
        (this.$store.state.location = this.suggestArr[this.num].product.location)
      ) {
        this.$store.state.location = this.suggestArr[
          this.num
        ].product.location.split(",");
      }
      //  else {
      //   this.$store.state.location = ["123.123", "45.56"];
      // }
      // } else {
      //   this.$store.state.location = this.suggestArr[0].product.location.split(
      //     ","
      //   );
      // }
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
    // 获取页面数据
    this.searchSuggest();
    // 做好判断，当请求到数据再进行对页面滚动的监听
    // if (this.suggestArr.length > 0) {
    window.addEventListener("scroll", this.initHeight);
    // }
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