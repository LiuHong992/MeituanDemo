<template>
  <div class="hotcitys flex">
    <span>热门城市：</span>
    <div class="p-hots" v-if="hotcity">
      <span
        class="sp-hots"
        v-for="item in hotcity"
        :key="item.id"
        @click="changeCity(item.name.slice(0, -1))"
      >{{item.name | cutname}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    hotcity: {
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
  mounted() {},
  watch: {},
  computed: {},
  filters: {
    cutname(data) {
      return data.slice(0, -1);
    }
  }
};
</script>

<style scoped lang='scss'>
.hotcitys {
  padding: 30px 0;
  border-bottom: 1px solid #e5e5e5;
  .p-hots {
    max-width: 900px;
    font-size: 14px;
    line-height: 26px;
    .sp-hots {
      margin: 0 20px;
      color: #666;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>