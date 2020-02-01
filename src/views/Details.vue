<template>
  <div class="bg">
    <!-- 头部 -->
    <headers></headers>
    <!-- 搜索栏（详情页没有搜索框） -->
    <searchtop :numD="numD" class="details-search"></searchtop>
    <!-- 导航栏面包屑 -->
    <div class="breadcrumb">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">美团{{keys}}</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopdetails: {},
      // 接收从搜索建议传过来的店铺的类型关键字
      keys: "",
      // 判断searchtop组件是店铺详情页的参数
      numD: 6
    };
  },
  components: {},
  methods: {
    // 如果是从搜索建议中点击的店铺名字过来时则调接口请求一遍数据
    getDetails() {
      this.$api
        .Products(this.$route.query.keyword, this.$store.state.citys)
        .then(res => {
          if (res.code === 200) {
            this.keys = res.data.product.type.split(";")[0];
            // console.log(this.keys);
            this.shopdetails = res.data;
            console.log(this.shopdetails);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    if (this.$route.query.keyword) {
      console.log(this.$route.query.keyword);
      this.getDetails();
    } else {
      this.shopdetails = JSON.parse(this.$route.query.items);
      console.log(this.$route.query.key);
      this.keys = this.$route.query.key;
      console.log(this.shopdetails);
      console.log(this.keys);
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.details-search {
  /deep/.searchcontent {
    height: 122px !important;
    padding-bottom: 0 !important;
  }
}
// 导航栏面包屑
.breadcrumb {
  max-width: 1190px;
  height: 52px;
  margin: 0 auto;
  font-size: 12px;
  color: #666;
  line-height: 52px;
  font-weight: 700;
  .demo-breadcrumb-separator {
    color: #ff5500;
    padding: 0 5px;
  }
}
</style>