<template>
  <div class="bgs">
    <!-- 头部 -->
    <headers></headers>
    <!-- 头部搜索栏和导航栏 -->
    <searchtop></searchtop>
  </div>
</template>

<script>
import headers from "../components/Homepages/Header/Header";
import searchtop from '../components/Homepages/Searchtop/Searchtop'
export default {
  data() {
    return {};
  },
  components: {
    headers,
    searchtop
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.bgs{
  background-color: #f8f8f8;
}
</style>