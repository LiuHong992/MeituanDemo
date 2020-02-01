<template>
  <div>
    <div class="map-container" id="boxFixed" :class="{'is_fixed' : isFixed}">
      <div id="container"></div>
      <div class="input-card">
        <h4>地图自适应</h4>
        <input id="setFitView" type="button" class="btn" value="地图自适应显示" />
      </div>
      <div class="info" @click="clicks">
        <div id="centerCoord"></div>
        <div id="tips"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript" src="https://a.amap.com/jsapi_demos/static/demo-center/data/food_1.4.15.js"></script>
<script>
export default {
  data() {
    return {
      isFixed: false,
      offsetTop: 218
    };
  },
  components: {},
  props: {},
  methods: {
    initHeight() {
      // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 (被卷曲的高度)
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //如果被卷曲的高度大于吸顶元素到顶端位置的距离
      this.isFixed = scrollTop > this.offsetTop ? true : false;
    },
    getLocation(val) {
      var map = new AMap.Map("container", {
        resizeEnable: true,
        center: val,
        zoom: 10
      });

      map.clearMap(); // 清除地图覆盖物
      let markers = [];
      this.$store.state.shopArr.map((item, index) => {
        if (item.id) {
          let markerss = {
            icon: `//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-${index +
              1}.png`,
            position: item.location.split(",")
          };
          if (index > 4) {
            markerss.icon =
              "https://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png";
          }
          markers.push(markerss);
        }
      });

      // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
      markers.forEach(function(marker) {
        new AMap.Marker({
          map: map,
          icon: marker.icon,
          position: [marker.position[0], marker.position[1]],
          offset: new AMap.Pixel(-13, -30)
        });
      });

      var center = map.getCenter();

      var centerText =
        "当前中心点坐标：" + center.getLng() + "," + center.getLat();
      document.getElementById("centerCoord").innerHTML = centerText;
      document.getElementById("tips").innerHTML =
        "成功添加三个点标记，其中有两个在当前地图视野外！";

      // 添加事件监听, 使地图自适应显示到合适的范围
      AMap.event.addDomListener(
        document.getElementById("setFitView"),
        "click",
        function() {
          var newCenter = map.setFitView();
          document.getElementById("centerCoord").innerHTML =
            "当前中心点坐标：" + newCenter.getCenter();
          document.getElementById("tips").innerHTML =
            "通过setFitView，地图自适应显示到合适的范围内,点标记已全部显示在视野中！";
        }
      );
    },
    clicks() {
      console.log("object");
    }
  },
  //回调中移除监听
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight);
    this.$nextTick(() => {
      //获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置
      this.offsetTop = document.querySelector("#boxFixed").offsetTop;
    });
    setTimeout(() => {
      // console.log(this.$store.state.location);
      this.getLocation(this.$store.state.location);
    }, 1500);
  },
  watch: {
    "$store.state.location"(val) {
      // console.log(val);
      this.getLocation(val);
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.map-container {
  background-color: rgb(229, 227, 223);
  overflow: hidden;
  transform: translateZ(0px);
  height: 220px;
  width: 230px;
  border-radius: 4px;
  margin-bottom: 10px;
  border: 1px solid #e5e5e5;
  #container {
    height: 100%;
    width: 100%;
  }

  .amap-icon img {
    width: 25px;
    height: 34px;
  }
}

.is_fixed {
  position: fixed;
  top: 0;
  z-index: 99;
  box-shadow: 0 5px 14px 0 rgba(0, 0, 0, 0.19);
  transition: box-shadow 0.3s;
}
</style>