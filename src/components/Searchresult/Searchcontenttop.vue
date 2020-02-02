<template>
  <div class="searchcontenttop flex">
    <!-- 左边内容层 -->
    <div class="left-content">
      <!-- 选择器（过滤器） -->
      <div class="filter-box">
        <!-- 分类选择器 -->
        <filtercontent :filters="menus" :lables="'分类'"></filtercontent>
        <!-- 区域选择器 -->
        <filtercontent class="areas" :filters="areasArr" :lables="'区域'"></filtercontent>
      </div>
      <!-- 搜索建议展示的数据 -->
      <div class="suggest-content">
        <!-- 排序 -->
        <div class="sort-option flex">
          <div>
            <span>智能排序</span>
          </div>
          <div class="prices">
            <div class="before"></div>
            <span>价格排序</span>
            <div class="after"></div>
          </div>
          <div>
            <span>人气最高</span>
          </div>
          <div>
            <span>评价最高</span>
          </div>
        </div>
        <!-- 具体内容 -->
        <div class="suggest-contents">
          <!-- 内容模板 -->
          <div class="suggest-content-model flex" v-for="(item,index) in products" :key="index">
            <!-- 结果图片 -->
            <div class="content-image" @click="$goto('details',item,keywords)">
              <img :src="item.photos[0].url" alt v-if="item.photos.length>0" />
              <!-- 数据排序 -->
              <span class="rating textalign">{{index+1}}</span>
            </div>
            <!-- 右边具体内容 -->
            <div class="right-contents">
              <h3 @click="$goto('details',item,keywords)">{{item.name}}</h3>
              <!-- 第二行内容 -->
              <div class="right-content-second common-right flex">
                <Rate class="ratings" allow-half disabled v-model="item.biz_ext.rating" />
                <span v-if="item.biz_ext.rating === 5">很好</span>
                <span v-else-if="item.biz_ext.rating > 3.5 && item.biz_ext.rating<5">好</span>
                <span v-else-if="item.biz_ext.rating <= 3.5 && item.biz_ext.rating > 2">不错</span>
                <span v-else>一般</span>
                <span>{{item.biz_ext.rating}}分</span>
                <span class="highlight">{{item.recommend}}人评论</span>
              </div>
              <!-- 第三行内容 -->
              <div class="right-content-third common-right flex">
                <span>
                  <span class="tags">{{item.type.split(";")[2]}}</span>|
                  <span class="address">{{item.adname}}</span>
                </span>
                <span v-if="item.address.length === 0">暂无地址信息</span>
                <span v-else>{{item.address}}</span>
                <!-- 查看地图 -->
                <div class="lookmap flex">
                  <img
                    src="https://s0.meituan.net/bs/fe-web-meituan/5058856/img/icons/16pt_16pt/location_colour.png"
                    alt
                  />
                  <span>查看地图</span>
                </div>
              </div>
              <!-- 第四排内容 -->
              <div class="right-content-fourth flex between">
                <!-- 价格 -->
                <div class="item-price flex" v-if="!item.biz_ext.lowest_price">
                  <span>暂无商品价格</span>
                </div>
                <div class="item-price flex" v-else>
                  <span>￥</span>
                  <span>{{item.biz_ext.lowest_price}}</span>
                  <span>起</span>
                </div>
                <div class="orders">预订</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右边内容层 -->
    <div class="right-content">
      <!-- 地图显示 -->
      <maps class="maps"></maps>
      <!-- 猜你喜欢 -->
      <guesslike :keywords="keywords" class="guesslikes"></guesslike>
    </div>
  </div>
</template>

<script>
import filtercontent from "./Filter-content/Filtercontent";
import maps from "./Maps/Maps";
import guesslike from "./Guesslike/Guesslike";
export default {
  data() {
    return {
      // kword: ""
    };
  },
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    areasArr: {
      type: Array,
      default: () => []
    },
    suggestArr: {
      type: Array,
      default: () => []
    },
    keywords: {
      type: String,
      default: ""
    }
  },
  components: {
    filtercontent,
    maps,
    guesslike
  },
  methods: {
    // 如果店铺没价格，随机加一个价格
    getPrices() {
      return Number(this.$utils.getRandomInt(40, 400));
    }
  },
  mounted() {
    // this.kword = this.keywords
    // console.log(this.kword);
  },
  watch: {},
  computed: {
    products() {
      let productsArr = [];
      this.suggestArr.map(item => {
        // console.log(item);
        if (item.more.length > 0) {
          if (item.product.biz_ext.rating) {
            item.product.biz_ext.rating = Number(item.product.biz_ext.rating);
          } else {
            item.product.biz_ext.rating = 0;
          }
          if (
            item.product.biz_ext.lowest_price &&
            Number(item.product.biz_ext.lowest_price) !== 0
          ) {
            item.product.biz_ext.lowest_price = Number(
              item.product.biz_ext.lowest_price
            ).toFixed(0);
          } else {
            item.product.biz_ext.lowest_price = this.getPrices();
          }
          productsArr.push(item.product);
        }
      });
      return productsArr;
    }
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.searchcontenttop {
  max-width: 1190px;
  margin: 0 auto;
  // 左边内容部分
  .left-content {
    width: 950px;
    .filter-box {
      margin-top: 10px;
      padding-bottom: 15px;
      background-color: #fff;
      border: 1px solid #e5e5e5;
      color: #333;
      font-weight: 500;
      line-height: 20px;
      .areas /deep/ .tags {
        border-bottom: none;
      }
    }
    // 搜索建议展示数据
    .suggest-content {
      background-color: #ffffff;
      margin-top: 10px;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      color: #333;
      font-size: 14px;
      line-height: 20px;
      .sort-option {
        padding: 15px 20px 2px;
        div {
          min-width: 96px;
          color: #666;
          &:first-child {
            color: #222222;
            span {
              padding: 0 10px 0 0;
            }
          }
          span {
            padding: 0 10px;
            font-weight: 500;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .prices {
          position: relative;
          .before {
            position: absolute;
            top: 2px;
            right: 20px;
            min-width: 1px;
            height: 1px;
            border: 3.2px solid transparent;
            border-bottom-width: 4px;
            border-bottom-color: #ccc;
          }
          .after {
            position: absolute;
            bottom: 2px;
            right: 20px;
            min-width: 1px;
            height: 1px;
            border: 3.2px solid transparent;
            border-top-width: 4px;
            border-top-color: #ccc;
          }
        }
      }
      // 具体内容层
      .suggest-contents {
        padding: 11px 20px;
        .suggest-content-model {
          padding: 20px 0;
          min-height: 125px;
          border-top: 1px solid #e5e5e5;
          .content-image {
            position: relative;
            width: 220px;
            height: 125px;
            background-color: #f4f4f4;
            &:hover {
              cursor: pointer;
            }
            img {
              width: 100%;
              height: 100%;
              border-radius: 4px;
            }
            .rating {
              position: absolute;
              top: 3px;
              width: 20px;
              left: -3px;
              background-color: #fb6433;
              border-radius: 2px;
              line-height: 13px;
              color: #fff;
              font-size: 12px;
            }
          }
          // 右边具体内容
          .right-contents {
            width: 688px;
            padding-left: 20px;
            h3 {
              font-size: 16px;
              font-weight: 500;
              color: #333;
              &:hover {
                cursor: pointer;
              }
            }
            // 公共样式
            .common-right {
              margin-top: 6px;
              font-size: 12px;
              color: #666;
              span {
                margin-right: 10px;
              }
            }
            // 第二排内容
            .right-content-second {
              .ratings {
                width: 85px;
                height: 20px;
                margin-right: 8px;
                /deep/ .ivu-rate-star {
                  width: 8px !important;
                  height: 8px !important;
                }
              }
              .highlight {
                color: #ff9900;
              }
            }
            // 第三排内容
            .right-content-third {
              .tags {
                margin-right: 1px;
              }
              .address {
                margin-left: 1px;
                margin-right: 0;
              }
              .lookmap {
                color: #222222;
                font-weight: 500;
                margin-left: 10px;
                &:hover {
                  cursor: pointer;
                }
                img {
                  display: inline-block;
                  width: 11px;
                  height: 14px;
                  margin-top: 3px;
                  margin-right: 3px;
                }
              }
            }
            // 第四排内容
            .right-content-fourth {
              margin-top: 10px;
              span {
                color: #ff6600;
                font-size: 12px;
                &:nth-child(2) {
                  font-size: 15px;
                }
              }
              .orders {
                width: 35px;
                height: 20px;
                padding: 0 4px 0 5px;
                background-color: rgb(255, 153, 0);
                border-radius: 4px;
                font-size: 12px;
                color: #fff;
                font-weight: 500;
                &:hover {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }
  // 右边内容部分
  .right-content {
    width: 230px;
    margin-left: 10px;
    .maps {
      position: static;
      top: 0;
      margin-top: 10px;
    }
  }
}
</style>