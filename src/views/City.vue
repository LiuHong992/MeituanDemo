<template>
  <div id="cityes">
    <!-- 头部 -->
    <headers></headers>
    <!-- 搜索框 -->
    <searchtop class="city-searchtop"></searchtop>
    <!-- 中间主题内容 -->
    <citys></citys>
  </div>
</template>

<script>
import headers from "../components/Homepages/Header/Header";
import searchtop from "../components/Homepages/Searchtop/Searchtop";
import citys from '../components/City/Citys'

export default {
  data() {
    return {
    };
  },
  components: {
    headers,
    searchtop,
    citys
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
#cityes{
  background-color: #F8F8F8;
}
.city-searchtop {
  /deep/.searchcontent {
    height: 122px !important;
    padding-bottom: 0 !important;
  }
}
</style>