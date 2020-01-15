<template>
  <div>
    <!-- 酒店旅游 -->
    <div class="hotel common">
      <h5>酒店旅游</h5>
      <div class="commoncontent flex">
        <div class="model" v-for="item in hotel" :key="item.id">{{item}}</div>
      </div>
    </div>
    <!-- 吃美食 -->
    <div class="foods common">
      <h5>吃美食</h5>
      <div class="commoncontent flex">
        <div class="model" v-for="item in foods" :key="item.id">{{item}}</div>
      </div>
    </div>
    <!-- 看电影 -->
    <div class="movies common">
      <h5>看电影</h5>
      <div class="commoncontent flex">
        <div class="model moviemodel" v-for="item in movies" :key="item.id">{{item}}</div>
      </div>
    </div>
    <!-- 手机应用 -->
    <div class="phoneapp common">
      <h5>手机应用</h5>
      <div class="flex">
        <div class="imagemodel" v-for="item in appimages" :key="item.id">
          <img :src="item" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 酒店旅游信息
      hotel: [
        "国际机票",
        "火车票",
        "民宿",
        "经济型酒店",
        "主题酒店",
        "商务酒店",
        "公寓",
        "豪华酒店",
        "客栈",
        "青年旅社",
        "度假酒店",
        "别墅",
        "农家院"
      ],
      // 吃美食
      foods: ["烤鱼", "特色小吃", "烧烤", "自助餐", "火锅", "代金券"],
      // 看电影
      movies: [
        "热映电影",
        "热门影院",
        "热映电影口碑榜",
        "最受期待电影",
        "国内票房榜",
        "北美票房榜",
        "电影排行榜"
      ],
      // 手机应用图片
      appimages: [
        "//s0.meituan.net/bs/fe-web-meituan/2d53095/img/appicons/meituan.png",
        "//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/waimai.png ",
        "https://p0.meituan.net/travelcube/162c3308d9622f6d9cfaa49e60be4dca8573.png ",
        "//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/dianping.png ",
        "//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/maoyan.png "
      ]
    };
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// 公共样式
.common {
  margin-right: 47px;
  text-align: center;
  h5 {
    font-size: 14px;
    color: #222222;
    text-align: center;
    margin-bottom: 26px;
  }
  .commoncontent {
    flex-wrap: wrap;
    .model {
      width: 74px;
      padding: 5px 0;
      &:hover {
        cursor: pointer;
        color: #fe8c00;
      }
    }
  }
}
// 酒店旅馆
.hotel {
  width: 243px;
}
// 吃美食
.foods {
  width: 155px;
  .commoncontent{
    .model{
      width: 66px;
    }
  }

}
// 看电影
.movies {
  width: 90px;
  margin-right: 107px;
  .commoncontent {
    .moviemodel {
      width: 100%;
    }
  }
}
// 手机应用
.phoneapp {
  width: 380px;
  .imagemodel {
    width: 60px;
    height: 60px;
    margin:0 8px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>