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
        <BreadcrumbItem to="/">{{shopdetails.adname}}</BreadcrumbItem>
        <BreadcrumbItem>{{shopdetails.name}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!-- 店铺详情 -->
    <shopinfo :shopdetails="shopdetails"></shopinfo>
    <!-- 评论推荐 -->
    <commentrec :types="types" :mores="mores" :shopdetails="shopdetails"></commentrec>
    <footers></footers>
  </div>
</template>

<script>
import shopinfo from "../components/Details/Shopinfo";
import commentrec from "../components/Details/Commentrec";
export default {
  data() {
    return {
      shopdetails: {},
      // 接收从搜索建议传过来的店铺的类型关键字
      keys: "",
      // 判断searchtop组件是店铺详情页的参数
      numD: 6,
      // 传递到评论推荐的参数
      types: "",
      // 传到评论推荐的推荐数组
      mores: []
    };
  },
  components: {
    shopinfo,
    commentrec
  },
  methods: {
    // 如果是从搜索建议中点击的店铺名字过来时则调接口请求一遍数据
    getDetails() {
      this.$api
        .Products(this.$route.query.keyword, this.$store.state.citys)
        .then(res => {
          if (res.code === 200) {
            this.keys = res.data.product.type.split(";")[0];
            this.shopdetails = res.data.product;
            this.$store.state.oneLocation = this.shopdetails.location.split(
              ","
            );
            this.$store.state.shopName = this.shopdetails.name;
            this.mores = res.data.more;
            this.shopdetails.biz_ext.rating = Number(
              this.shopdetails.biz_ext.rating
            );
            // console.log(this.mores);
            this.$store.state.keysword = this.shopdetails.type.split(";")[0];
            this.types = this.shopdetails.type.split(";")[0];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 请求店铺的完整信息
    getAllinfo(names) {
      this.$api
        .Products(names, this.$store.state.citys)
        .then(res => {
          if (res.code === 200) {
            this.mores = res.data.more;
            // console.log(this.mores);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    if (this.$route.query.keyword) {
      this.getDetails();
    } else {
      this.shopdetails = JSON.parse(this.$route.query.items);
      this.$store.state.oneLocation = this.shopdetails.location.split(",");
      this.$store.state.shopName = this.shopdetails.name;
      // 关键词存储
      this.$store.state.keysword = this.shopdetails.type.split(";")[0];
      this.types = this.shopdetails.type.split(";")[0];
      // console.log(this.$store.state.oneLocation);
      setTimeout(() => {
        this.getAllinfo(this.shopdetails.name);
      }, 200);
      this.keys = this.$route.query.key;
      this.types = this.shopdetails.type.split(";")[0];
      // console.log(this.shopdetails);
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