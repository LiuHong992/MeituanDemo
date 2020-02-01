<template>
  <div class="filter-component flex">
    <!-- 分类头部 -->
    <div class="lable flex">
      <div class="lable-title">{{lables}}</div>
      <div class="lable-all">
        <span>全部</span>
      </div>
    </div>
    <!-- 具体标签 -->
    <div class="tags flex">
      <div class="filter-model" v-for="(item,index) in filters" :key="index">
        <div class="filter-sp flex" v-if="lables === '分类'">
          <span class="filter-sps flex" @mouseenter="changeCount(index)" @mouseleave="changeCounts">
            {{item.child[0].title}}
            <div class="downs"></div>
            <!-- 隐藏的选择器盒子 -->
            <div class="hidden-filters" v-show="count === index">
              <h2>{{item.child[0].title}}</h2>
              <div class="tags-content flex">
                <div v-for="item0 in item.child[0].child" :key="item0.id">
                  <span>{{item0}}</span>
                </div>
              </div>
            </div>
          </span>
        </div>
        <div class="filter-sp flex" v-else>
          <span class="filter-sps flex" @mouseenter="changeCount(index)" @mouseleave="changeCounts">
            {{item.type}}
            <div class="downs"></div>
            <!-- 隐藏的选择器盒子 -->
            <div class="hidden-filters textover" v-show="count === index">
              <h2>{{item.type}}</h2>
              <div class="tags-content flex">
                <div v-for="item0 in item.module" :key="item0.id">
                  <span v-if="item0 !== ''">{{item0}}</span>
                  <span v-else>暂无信息</span>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: -1
    };
  },
  props: {
    filters: {
      type: Array,
      default: () => []
    },
    lables: {
      type: String,
      default: ""
    }
  },
  components: {},
  methods: {
    changeCount(idx) {
      this.count = idx;
    },
    changeCounts() {
      this.count = -1;
    }
  },
  mounted() {},
  watch: {},
  computed: {
    // classfyname() {
    //   return this.filters.filter(item => {
    //       return JSON.stringify(item).includes(this.keywords)
    //   });
    // }
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.filter-component {
  padding: 15px 20px 0;
  .lable {
    position: absolute;
    width: 160px;
    .lable-title {
      width: 80px;
    }
    .lable-all {
      height: 22px;
      padding: 0 10px;
      line-height: 22px;
      color: #222222;
      font-size: 14px;
      border-radius: 100px;
      background-color: #ffd000;
      &:hover {
        cursor: pointer;
      }
    }
  }
  // 具体标签
  .tags {
    flex-wrap: wrap;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e5e5;
    line-height: 28px;
    margin-left: 160px;
    margin-top: -3px;
    color: #666;
    .filter-model {
      min-width: 120px;
      .filter-sp {
        .filter-sps {
          position: relative;
          padding: 0 10px;
          // 隐藏的选择器盒子
          .hidden-filters {
            position: absolute;
            top: 24px;
            left: -5px;
            z-index: 100;
            min-width: 530px;
            max-height: 300px;
            overflow: auto;
            padding: 19px 15px;
            padding-bottom: 9px;
            background-color: #fff;
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e5e5;
            border-radius: 4px;
            line-height: 1.5;
            h2 {
              color: #ccc;
              font-size: 16px;
              margin-bottom: 11px;
            }
            .tags-content {
              flex-wrap: wrap;
              font-size: 12px;
              div {
                min-width: 120px;
                span {
                  &:hover {
                    cursor: pointer;
                  }
                }
              }
            }
          }
          &:hover {
            cursor: pointer;
            .hidden-filters {
              cursor: default;
            }
          }
        }
        .downs {
          width: 1px;
          height: 1px;
          margin-left: 4px;
          margin-top: 11px;
          border: 4px solid transparent;
          border-top-color: #666;
        }
      }
    }
  }
}
</style>