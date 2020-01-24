<template>
  <div class="searchcontents">
    <div class="crumb flex">
      <span class="city-crumb">
        {{$store.state.citys}}美团
        <div class="right-arrow"></div>
      </span>
      <h3>{{$store.state.citys}}{{keywords}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    keywords: {
      type: String,
      default: ""
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
.searchcontents {
  max-width: 1190px;
  height: 500px;
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
  }
}
</style>