<template>
  <div class="recentcitys flex">
    <span>最近访问：</span>
    <div class="p-hots textover" v-if="$store.state.recentCity.length > 0">
      <span
        class="sp-hots"
        v-for="item in $store.state.recentCity"
        :key="item.id"
        @click="changeCity(item)"
      >{{item}}</span>
    </div>
    <div class="p-hots" v-else>
      <span class="sp-hots">暂无访问城市</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    changeCity(items) {
      this.$store.state.citys = items;
      sessionStorage.setItem("locations", this.$store.state.citys);
      this.$router.push("/");
    }
  },
  mounted() {
    if (localStorage.getItem("recentCitys")) {
      this.$store.state.recentCity = JSON.parse(
        localStorage.getItem("recentCitys")
      );
    }
  },
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.recentcitys {
  padding: 30px 0 20px;
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