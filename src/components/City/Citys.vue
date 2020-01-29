<template>
  <!-- 按省份选择 -->
  <div class="city-byprovince flex">
    <!-- 选择城市 -->
    <div class="city-choose">
      <span>按省份选择：</span>
      <Select v-model="provinces" style="width:150px" @on-change="getCity" placeholder="省份">
        <Option v-for="item in provincelist" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <Select v-model="citys" style="width:150px" placeholder="城市" :disabled="flag">
        <Option v-for="item in citylist" :value="item.name" :key="item.id">{{ item.name }}</Option>
      </Select>
    </div>
    <!-- 搜索城市 -->
    <div class="city-search">
      <span>直接搜索:</span>
      <Input
        v-model="cityvalue"
        placeholder="请输入城市中文或拼音"
        style="width: 220px;margin-left:10px;"
        @on-focus="changeFlags"
        @on-blur="changeFlags"
      />
      <div class="search-res" v-if="showcityarr.length > 0 && flags">
        <div
          class="search-rescity"
          v-for="item in showcityarr"
          :key="item.id"
          @click="changeCity(item.name)"
        >{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索展示的数组
      showcityarr: [],
      // 控制搜索框显示的第三方参数
      flags: false,
      // 选择器选择的省份，用于后面的城市的请求
      provinces: "",
      // 接收省份的数组
      provincelist: [],
      // 选中的城市
      citys: "",
      // 接收市的数组
      citylist: [],
      // 在未选择省份之前，城市不可选
      flag: true,
      // 搜索框搜索
      cityvalue: ""
    };
  },
  props: {
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
    // 获取省份的方法
    getProvince() {
      this.$api
        .getProvince()
        .then(res => {
          if (res.code === 200) {
            this.provincelist = res.data.province;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取市的方法
    getCity(value) {
      this.$api
        .getCitys(value)
        .then(res => {
          if (res.code === 200) {
            this.citylist = res.data.city;
            this.flag = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.$Message.warning("数据加载出错~");
        });
    },
    // 搜索框的显示与隐藏
    changeFlags() {
      setTimeout(() => {
        this.flags = !this.flags;
      }, 200);
    },
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
    }
  },
  mounted() {
    // 获取所有省份
    this.getProvince();
  },
  watch: {
    // 搜索城市监听
    cityvalue(val) {
      if (val.trim() !== "") {
        this.showcityarr = this.cityesArr.filter(item => {
          return JSON.stringify(item).includes(val.trim());
        });
        this.flags = true;
      } else {
        this.showcityarr = [];
      }
    }
  },
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
// 按省份选择
.city-byprovince {
  width: 100%;
  padding-bottom: 30px;
  border-bottom: 1px solid #e5e5e5;
  line-height: 40px;
  font-size: 16px;
  .city-choose {
    span {
      margin-right: 5px;
    }
  }
  .city-search {
    position: relative;
    margin-left: 60px;
    .search-res {
      position: absolute;
      top: 45px;
      left: 78px;
      z-index: 99;
      min-width: 150px;
      max-height: 375px;
      padding: 0 20px 0 15px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
      overflow-y: scroll;
      .search-rescity {
        min-width: 40px;
        height: 20px;
        padding: 1px 8px;
        margin: 6px 38px 6px 0;
        line-height: 20px;
        color: #222;
        font-weight: 500;
        font-size: 12px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>