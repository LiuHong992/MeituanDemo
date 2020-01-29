<template>
  <div class="anchorcitys">
    <!-- 头部 -->
    <div class="anchor-header flex">
      <span>按拼音首字母选择：</span>
      <div class="p-hots">
        <a
          class="sp-hots textalign"
          v-for="item in Object.keys(this.cityesObj)"
          :key="item.id"
          :href="`#${item}`"
        >{{item}}</a>
      </div>
    </div>
    <!-- 主题内容 -->
    <div class="city-area-content">
      <div
        class="city-area flex"
        v-for="item in Object.keys(this.cityesObj)"
        :key="item.id"
        :id="item"
      >
        <span class="city-area-item textalign">{{item}}</span>
        <div class="cities flex">
          <span
            class="city-item"
            v-for="(item0,index) in cityesObj[item]"
            @click="changeCity(item0.name)"
            :key="index"
            :class="{hots:item0.id ==='1'}"
          >{{item0.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cities from "../../assets/js/city";
export default {
  data() {
    return {};
  },
  props: {
    hotcity: {
      type: Array,
      default: () => []
    },
    cityesObj: {
      type: Object,
      default: () => {}
    },
    cityesArr: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    // 切换城市返回主页
    changeCity(items) {
      this.$store.state.citys = items;
      sessionStorage.setItem("locations", this.$store.state.citys);
      this.$router.push("/");
      if (!localStorage.getItem("recentCitys")) {
        localStorage.setItem(
          "recentCitys",
          JSON.stringify(this.$store.state.recentCity)
        );
      }
      let flags = true;
      this.$store.state.recentCity.map(item => {
        if (item === items) {
          flags = false;
        }
      });
      if (flags) {
        this.$store.state.recentCity.unshift(items);
      }
      localStorage.setItem(
        "recentCitys",
        JSON.stringify(this.$store.state.recentCity)
      );
      // console.log(this.$store.state.recentCity);
    }
  },
  mounted() {
    // 热门城市高亮
    setTimeout(() => {
      if (this.hotcity.length > 0) {
        this.cityesArr.map(item => {
          this.hotcity.map(item0 => {
            if (item0.name.slice(0, -1) === item.name) {
              item.id = "1";
            }
          });
        });
      }
    }, 300);
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.anchorcitys {
  // 头部
  .anchor-header {
    padding: 30px 0;
    .p-hots {
      font-size: 15px;
      line-height: 26px;
      .sp-hots {
        display: inline-block;
        width: 25px;
        height: 25px;
        margin: 0 10px;
        color: #666;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  // 主题内容
  .city-area-content {
    .city-area {
      padding: 13px 30px 13px 10px;
      border-radius: 10px;
      transition: background-color 0.5s;
      &:hover {
        background-color: #f8f8f8;
      }
      .city-area-item {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #ffd000;
        line-height: 40px;
      }
      .cities {
        max-width: 1065px;
        flex-wrap: wrap;
        .city-item {
          margin: 10px 20px;
          font-size: 14px;
          color: #666;
          &:hover {
            cursor: pointer;
            color: #222222 !important;
          }
        }
        .hots {
          color: #ff6600;
        }
      }
    }
  }
}
</style>