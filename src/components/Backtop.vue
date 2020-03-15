<template>
  <div class="wrap">
    <!-- 回到顶部组件 -->
    <BackTop :height="400" :bottom="50">
      <div class="top">UP</div>
    </BackTop>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 4px;
}
</style>