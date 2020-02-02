<template>
  <div class="base-info" v-if="shopdetails.name">
    <!-- 店铺基本信息卡片 -->
    <div class="info-card flex between">
      <!-- 左边店铺信息 -->
      <div class="left-info">
        <!-- 店铺名称 -->
        <div class="relative-clear flex">
          <span class="shopname">{{shopdetails.name}}</span>
        </div>
        <!-- 店铺评分价格等信息 -->
        <div class="shop-rates flex between">
          <div class="left-rates">
            <Rate disabled allow-half v-model="shopdetails.biz_ext.rating" />
            <span>{{shopdetails.biz_ext.rating}}分</span>
            <span>￥{{shopdetails.biz_ext.lowest_price}}起</span>
          </div>
          <div class="right-share flex">
            <i class="iconfont weixin"></i>
            <span>分享</span>
          </div>
        </div>
        <!-- 地址 -->
        <div class="shop-address marbottom">
          <span>地址：{{shopdetails.adname}}{{shopdetails.address}}</span>
        </div>
        <!-- 电话 -->
        <div class="shop-tel marbottom">
          <span v-if="shopdetails.tel.length> 0">电话：{{shopdetails.tel}}</span>
          <span v-else>电话：暂无电话</span>
        </div>
        <!-- 官网 -->
        <div class="shop-websites marbottom">
          <span v-if="shopdetails.website.length> 0">官网：{{shopdetails.website}}</span>
          <span v-else>官网：暂无相关数据</span>
        </div>
      </div>
      <!-- 右边图片 -->
      <div class="right-info">
        <img :src="shopdetails.photos[0].url" alt v-if="shopdetails.photos.length> 0" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    shopdetails: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.base-info {
  max-width: 1190px;
  margin: 0 auto;
  color: #666;
  // 店铺信息卡片
  .info-card {
    width: 97%;
    padding: 10px;
    margin: 0 auto;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba($color: #000000, $alpha: 0.1);
    // 左边内容
    .left-info {
      width: 63.5%;
      // 店铺名称
      .relative-clear {
        .shopname {
          font-size: 26px;
          color: #333;
          font-weight: 700;
        }
      }
      // 店铺评分价格
      .shop-rates {
        font-size: 12px;
        padding-bottom: 10px;
        margin-bottom: 20px;
        border-bottom: 1px solid #e5e5e5;
        .left-rates {
          span {
            line-height: 30px;
            font-weight: 500;
            &:last-child {
              font-size: 13px;
              margin-top: 2px;
              margin-left: 5px;
            }
          }
        }
        .right-share {
          line-height: 30px;
          &:hover {
            cursor: pointer;
          }
          i {
            display: block;
          }
        }
      }
      // 公共样式
      .marbottom {
        margin-bottom: 10px;
      }
    }
    // 右边图片
    .right-info {
      width: 35%;
      height: 260px;
      background: rgb(206, 203, 203);
      border-radius: 4px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }
  }
}
</style>