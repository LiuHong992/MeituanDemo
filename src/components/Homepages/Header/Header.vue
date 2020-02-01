<template>
  <div class="headers">
    <div class="headercontent flex between">
      <!-- 头部左边 -->
      <div class="navleft flex">
        <div class="location">
          <Icon type="md-pin" size="16" />
          <span>{{city}}</span>
        </div>
        <div class="changecity" @click="$goto('/city')">切换城市</div>
        <!-- 附近城市 -->
        <div class="nearcity" v-if="nearcitys.length > 0">
          [
          <span
            v-for="item in nearcitys.slice(0,3)"
            :key="item.id"
            @click="changeCity(item.type)"
          >{{item.type}}</span>
          ]
        </div>
        <div class="nearcity" v-else>[定位中...]</div>
        <!-- 登录注册按钮（插槽） -->
        <div class="login flex" v-if="users === ''">
          <span class="splogin" @click="$goto('/login')">立即登录</span>
          <span class="spregister" @click="$goto('/register')">注册</span>
        </div>
        <!-- 登录后显示用户信息 -->
        <div class="login login-after" v-else>
          <span class="splogin">{{users.username}}</span>
          <span class="spregister" @click="edit">退出</span>
        </div>
      </div>
      <!-- 头部右边 -->
      <div class="navright flex">
        <div class="mymt" :class="{bg : num===1}" @mouseenter="addClass(1)" @mouseleave="delClass">
          <span>我的美团</span>
          <div class="hidden" v-show="num===1">
            <div>我的订单</div>
            <div>我的收藏</div>
            <div>抵用券</div>
            <div>账户设置</div>
          </div>
        </div>
        <div class="app">
          <span>手机APP</span>
        </div>
        <div
          class="shopcenter"
          :class="{bg : num===2}"
          @mouseenter="addClass(2)"
          @mouseleave="delClass"
        >
          <span>商家中心</span>
          <div class="hidden long" v-show="num===2">
            <div>美团餐饮商户中心</div>
            <div>登录商家中心</div>
            <div>美团智能收银</div>
            <div>我想合作</div>
            <div>手机免费开店</div>
            <div>餐饮代理商招募</div>
            <div>商家申请开票</div>
            <div>免费合作美团排队</div>
          </div>
        </div>
        <div
          class="rulues"
          :class="{bg : num===3}"
          @mouseenter="addClass(3)"
          @mouseleave="delClass"
        >
          <span>美团规则</span>
          <div class="hidden" v-show="num===3">
            <div>规则中心</div>
            <div>规则目录</div>
            <div>规则评议院</div>
          </div>
        </div>
        <div
          class="navigation"
          :class="{bg : num===4}"
          @mouseenter="addClass(4)"
          @mouseleave="delClass"
        >
          <span>网站导航</span>
          <!-- 隐藏的导航栏 -->
          <guide class="guides flex" v-show="num===4">123</guide>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import guide from "../Header/Headerguide/Guide";
export default {
  data() {
    return {
      users: "",
      // 接收附近城市数组
      nearcitys: [],
      // 动态添加样式参数
      num: 0
    };
  },
  components: {
    guide
  },
  methods: {
    // 获取定位
    getPosition() {
      this.$api
        .getPositions()
        .then(res => {
          if (res.code === 200) {
            this.$store.state.citys = JSON.parse(res.data).city.slice(0, -1);
            if (sessionStorage.getItem("locations")) {
              sessionStorage.setItem("locations", this.$store.state.citys);
            } else {
              // sessionStorage.setItem("locations", "成都");
            }
            this.getNearcity();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取最近城市
    getNearcity() {
      this.$api
        .getCitymain(this.$store.state.citys)
        .then(res => {
          if (res.code === 200 && res.data.areas.length > 0) {
            this.nearcitys = res.data.areas;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击附近城市将定位的城市变为点击的附近城市名
    changeCity(val) {
      this.$store.state.citys = val;
    },
    // 退出按钮
    edit() {
      this.users = "";
      localStorage.setItem("userinfo", this.users);
      sessionStorage.setItem("locations", this.users);
      // 跳转后刷新页面
      this.$router.go(0);
    },
    // 头部鼠标移入添加样式
    addClass(count) {
      this.num = count;
    },
    // 鼠标移出消除样式
    delClass() {
      this.num = 0;
    }
  },
  mounted() {
    if (
      this.$store.state.citys === "" &&
      sessionStorage.getItem("locations") === ""
    ) {
      this.getPosition();
    } else if (!sessionStorage.getItem("locations")) {
      this.getPosition();
    } else {
      this.$store.state.citys = sessionStorage.getItem("locations");
    }
    // 如果是从定位的页面选择了城市过来就对附近城市进行重新请求
    if (this.$store.state.citys !== "") {
      this.getNearcity();
    }
    // 获取用户名
    if (localStorage.getItem("userinfo")) {
      this.users = JSON.parse(localStorage.getItem("userinfo"));
    }
  },
  watch: {},
  computed: {
    city() {
      return this.$store.state.citys;
    }
  }
};
</script>

<style scoped lang='scss'>
.headers {
  width: 100%;
  height: 40px;
  font-size: 12px;
  .headercontent {
    width: 1190px;
    min-width: 1080px;
    height: 100%;
    margin: 0 auto;
    // 头部左边
    .navleft {
      height: 100%;
      line-height: 40px;
      // 定位
      // .location {
      // }
      // 切换城市
      .changecity {
        height: 16px;
        margin: auto 6px;
        padding: 0 1px;
        line-height: 15px;
        border: 1px solid #e5e5e5;
        &:hover {
          cursor: pointer;
          color: #fe8c00;
        }
      }
      // 附近城市
      .nearcity {
        color: #999;
        span {
          margin: 0 3px;
        }
        span:hover {
          cursor: pointer;
          color: #fe8c00;
        }
      }
      // 登录注册
      .login {
        margin-left: 25px;
        // 立即登录
        .splogin {
          margin-right: 5px;
          color: #fe8c00;
          &:hover {
            cursor: pointer;
          }
        }
        // 注册
        .spregister {
          color: #999;
          &:hover {
            cursor: pointer;
            color: #fe8c00;
          }
        }
      }
      // 登录后显示的用户信息
      .login-after {
        margin-left: 15px;
        span {
          margin-left: 8px;
        }
      }
    }
    // 头部右边
    .navright {
      color: #999;
      // 动态添加的样式
      .bg {
        background-color: white;
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
      }
      div {
        position: relative;
        padding: 10px 14px;
        span {
          &:hover {
            cursor: pointer;
            color: #fe8c00;
          }
        }
        // 隐藏的盒子
        .hidden {
          position: absolute;
          top: 40px;
          right: 0;
          z-index: 100;
          width: 100%;
          padding: 0;
          background-color: white;
          border-top: 1px solid #f8f8f8;
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
          div {
            height: 35px;
            padding: 0;
            line-height: 35px;
            text-align: center;
            &:hover {
              cursor: pointer;
              color: #fe8c00;
            }
          }
        }
        .long {
          width: 140%;
          div {
            width: 100%;
            padding: 0;
          }
        }
        // 隐藏导航栏
        .guides {
          position: absolute;
          top: 40px;
          right: 0;
          z-index: 100;
          width: 1200px;
          padding: 30px 36px 36px 47px;
          background-color: white;
          border-top: 1px solid #f8f8f8;
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}
</style>