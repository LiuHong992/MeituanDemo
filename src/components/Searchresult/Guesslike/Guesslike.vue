<template>
  <div class="recommend-box">
    <div class="top-nav-box">
      <span>猜你喜欢</span>
    </div>
    <div class="recommend-list">
      <div
        class="list-model"
        @click="$goto('details',item,keywords)"
        v-for="(item,index) in shoplist"
        :key="index"
      >
        <div v-if="item.adcode">
          <div class="img-box">
            <img :src="item.photos[0].url" alt v-if="item.photos.length> 0" />
          </div>
          <div class="info-box">
            <div class="info-title textover">
              <span>{{item.name}}</span>
            </div>
            <div class="score-line flex">
              <!-- 评分 -->
              <div class="score-rating">
                <Rate
                  class="ratings"
                  allow-half
                  disabled
                  v-model="item.biz_ext.rating"
                  v-if="item.biz_ext.rating"
                />
                <Rate class="ratings" disabled v-model="ratings" v-else />
              </div>
              <!-- 具体评分 -->
              <div class="comment-number">
                <span>{{item.biz_ext.rating}}分</span>
              </div>
            </div>
            <!-- 地点 -->
            <div class="info-address textover">
              <span>{{item.adname}}</span>
            </div>
            <!-- 价格 -->
            <div class="info-price">
              <div
                class="item-price flex"
                v-if="!item.biz_ext.lowest_price || item.biz_ext.lowest_price==='0'"
              >
                <span class="nones">暂无商品价格</span>
              </div>
              <div class="item-price flex" v-else>
                <span>￥</span>
                <span>{{item.biz_ext.lowest_price}}</span>
                <span>起</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 接收获取到的推荐商家信息
      shoplist: [],
      // 商家信息中没有评分则默认为0
      ratings: 0
    };
  },
  props: {
    keywords: {
      type: String,
      default: ""
    }
  },
  components: {},
  methods: {
    // 如果店铺没价格，随机加一个价格
    getPrices() {
      return Number(this.$utils.getRandomInt(40, 400));
    },
    // 获取推荐信息方法
    getCommond() {
      this.$api
        .Result(this.$store.state.citys, this.$store.state.keysword)
        .then(res => {
          if (res.code === 200) {
            res.data.pois.map(item => {
              if (Number(item.biz_ext.rating) > 4) {
                item.biz_ext.rating = Number(item.biz_ext.rating);
                if (
                  item.biz_ext.lowest_price &&
                  Number(item.biz_ext.lowest_price) !== 0
                ) {
                  item.biz_ext.lowest_price = Number(
                    item.biz_ext.lowest_price
                  ).toFixed(0);
                } else {
                  item.biz_ext.lowest_price = this.getPrices();
                }
                this.shoplist.push(item);
              }
            });
            // console.log(this.shoplist);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    setTimeout(() => {
      this.getCommond();
    }, 350);
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.recommend-box {
  width: 230px;
  margin-top: 10px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 16px 20px 0;
  .top-nav-box {
    margin-bottom: 12px;
    font-size: 16px;
    color: #333333;
    line-height: 20px;
    font-weight: 500;
  }
  .recommend-list {
    // 猜你喜欢店铺盒子模板
    .list-model {
      margin-bottom: 20px;
      width: 190px;
      &:hover {
        cursor: pointer;
      }
      // 店铺图片
      .img-box {
        width: 100%;
        height: 105px;
        background-color: #f4f4f4;
        background: url("http://p0.meituan.net/travelcube/214b8411190e874781fe91dd3096236211567.png")
          no-repeat;
        background-size: cover;
        background-position: 50% 50%;
        border-radius: 4px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      // 下方内容盒子
      .info-box {
        position: relative;
        margin-top: 10px;
        // 标题
        .info-title {
          font-size: 14px;
          color: #222222;
        }
        // 评分评价
        .score-line {
          .ratings {
            width: 104px;
            height: 24px;
            /deep/.ivu-rate-star {
              width: 12px !important;
              height: 12px !important;
            }
          }
          .comment-number {
            margin-left: 12px;
            font-size: 12px;
            color: #999;
            height: 24px;
            line-height: 30px;
          }
        }
        // 地点
        .info-address {
          font-size: 12px;
          color: #999999;
          height: 18px;
          line-height: 18px;
          margin-top: 4px;
        }
        // 价格
        .info-price {
          .item-price {
            span {
              color: #ff6600;
              font-size: 12px;
              line-height: 24px;
              font-weight: 700;
              &:first-child {
                font-size: 14px;
              }
              &:nth-child(2) {
                font-weight: normal;
                font-size: 22px;
                line-height: 20px;
                margin-right: 4px;
              }
            }
            .nones {
              font-weight: normal;
              font-size: 13px !important;
            }
          }
        }
      }
    }
  }
}
</style>