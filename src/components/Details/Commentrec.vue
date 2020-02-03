<template>
  <div class="comment-recs">
    <!-- 评论推荐 -->
    <div class="comment-rec flex between">
      <div class="comment-rec-left">
        <!-- 网友评论 -->
        <div class="comment-info">
          <div class="comment-head flex between">
            <div class="left-head">网友评论</div>
            <div class="right-head flex">
              <span>默认排序</span>
              <span>时间排序</span>
            </div>
          </div>
          <!-- 评论列表 -->
          <div class="comment-list">
            <span>暂无评论</span>
          </div>
        </div>
        <!-- 相关推荐 -->
        <div class="recommend-info" v-if="mores.length>0">
          <h3>相关推荐</h3>
          <!-- 推荐店铺列表 -->
          <div class="recommend-list">
            <!-- 推荐店铺模板 -->
            <div class="recommend-model" v-for="(item,index) in mores" :key="index">
              <!-- 商铺名称 -->
              <div class="recommend-name">
                <span>{{item.name}}</span>
              </div>
              <!-- 商铺地址 -->
              <div class="recommend-address">
                <span>地址：{{item.adname}}{{item.address}}</span>
              </div>
              <!-- 商铺类型 -->
              <div class="recommend-type flex" v-if="item.type.split(';').length>0">
                <span>类型：</span>
                <Tag checkable color="primary">{{item.type.split(';')[0]}}</Tag>
                <Tag checkable color="success">{{item.type.split(';')[1]}}</Tag>
                <Tag checkable color="error">{{item.type.split(';')[2]}}</Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 高德地图 && 猜你喜欢 -->
      <div class="comment-rec-right">
        <!-- 高德地图 -->
        <mapss class="comment-map" :shopdetails="shopdetails"></mapss>
        <guesslike :keywords="types"></guesslike>
      </div>
    </div>
  </div>
</template>

<script>
import mapss from "./Comments/Mapss";
import guesslike from "../Searchresult/Guesslike/Guesslike";
export default {
  data() {
    return {};
  },
  props: {
    types: {
      type: String,
      default: ""
    },
    mores: {
      type: Array,
      default: () => []
    },
    shopdetails: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    mapss,
    guesslike
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.comment-recs {
  max-width: 1190px;
  margin: 0 auto;
  color: #666;
  .comment-rec {
    width: 97%;
    margin: 100px auto 0;
    // 左边的网友评论和相关推荐
    .comment-rec-left {
      width: 78.5%;
      // 网友评论
      .comment-info {
        width: 100%;
        margin-bottom: 40px;
        .comment-head {
          margin-bottom: 5px;
          .left-head {
            font-size: 20px;
            font-weight: 500;
          }
          .right-head {
            line-height: 30px;
            span {
              margin-left: 8px;
              font-size: 12px;
              color: #666;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
        // 评论列表
        .comment-list {
          padding: 15px 20px;
          background-color: #fff;
        }
      }
      // 相关推荐
      .recommend-info {
        width: 100%;
        h3 {
          font-size: 20px;
          font-weight: 500;
          margin-bottom: 5px;
        }
        // 推荐店铺列表
        .recommend-list {
          background-color: #fff;
          border-radius: 6px;
          .recommend-model {
            padding: 20px 20px 40px;
            div {
              margin-bottom: 8px;
            }
            // 商铺名称
            .recommend-name {
              color: #333;
              font-size: 17px;
            }
            // 商铺地址
            .recommend-address {
              color: #999;
              font-size: 13px;
            }
            // 商铺类型
            .recommend-type {
              span {
                font-size: 13px;
                line-height: 26px;
              }
            }
          }
        }
      }
    }
    // 右边的高德地图和猜你喜欢
    .comment-rec-right {
      .comment-map {
        margin-bottom: 20px;
      }
    }
  }
}
</style>