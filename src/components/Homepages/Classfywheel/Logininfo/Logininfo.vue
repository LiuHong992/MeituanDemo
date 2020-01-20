<template>
  <div>
    <div class="lregister">
      <!-- 登录注册(未登录状态) -->
      <div class="defalut" v-if="users === ''">
        <!-- 默认头像 -->
        <div class="defaultimg">
          <img src="//s0.meituan.net/bs/fe-web-meituan/e350c4a/img/avatar.jpg" alt />
        </div>
        <p class="pmsg">Hi！你好</p>
        <!-- 登录注册 -->
        <div class="btnlogin" @click="$goto('/register')">
          <span>注册</span>
        </div>
        <div class="btnlogin" @click="$goto('/login')">
          <span>立即登录</span>
        </div>
      </div>
      <!-- 登录状态下显示的用户信息(已登录状态) -->
      <div class="defalut login-after-info" v-else>
        <!-- 设置按钮 -->
        <div class="info-settings">
          <Icon type="md-settings" size="24" />
        </div>
        <!-- 登录后的默认头像 -->
        <div class="defaultimg">
          <img src=" //s0.meituan.net/bs/fe-web-meituan/e3064a3/img/head-img.png" alt />
        </div>
        <!-- 昵称 -->
        <div class="login-nickname textalign">
          <span class="textover">{{users.username}}</span>
          <img src="../../../../assets/images/VIP.svg" alt />
        </div>
        <!-- 我的订单/我的收藏/抵用券 -->
        <div class="login-row-up flex">
          <div class="fn-item textalign" v-for="item in userinfo" :key="item.id">
            <div class="fn-item-image">
              <i class="iconfont" :class="item.srcs" :style="{color:item.color}"></i>
            </div>
            <span>{{item.infos}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 接收从localStorage中获取到的用户信息
      users: "",
      // 我的订单/我的收藏等信息数组
      userinfo: [
        {
          srcs: "order",
          infos: "我的订单",
          color: "#FFC300"
        },
        {
          srcs: "collect",
          infos: "我的收藏",
          color: "#FFC300"
        },
        {
          srcs: "coupon",
          infos: "抵用券",
          color: "#FFC300"
        },
        {
          srcs: "balance",
          infos: "余额",
          color: "#FFC300"
        },
        {
          srcs: "more",
          infos: "更多",
          color: "#FFC300"
        }
      ]
    };
  },
  components: {},
  methods: {},
  mounted() {
    // 获取用户名
    if (localStorage.getItem("userinfo")) {
      this.users = JSON.parse(localStorage.getItem("userinfo"));
      // console.log(this.users);
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// 登录注册页(未登录)
.lregister {
  width: 230px;
  height: 240px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  .defalut {
    width: 100%;
    padding-top: 30px;
    // 头像
    .defaultimg {
      margin: 0 auto 4px;
      text-align: center;
      img {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        border: 4px solid #e5e5e5;
      }
    }
    .pmsg {
      text-align: center;
      font-size: 16px;
      color: #222;
    }
    .btnlogin {
      width: 118px;
      margin: 10px auto 15px;
      line-height: 38px;
      color: #333;
      text-align: center;
      border: 1px solid #e5e5e5;
      border-radius: 40px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .login-after-info {
    position: relative;
    .info-settings {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 29px;
      height: 26px;
      &:hover {
        cursor: pointer;
      }
    }
    // 用户名
    .login-nickname {
      height: 30px;
      font-size: 16px;
      color: #222;
      font-weight: 500;
      span {
        margin-right: 5px;
        &:hover {
          cursor: pointer;
        }
      }
      img {
        width: 14px;
        height: 14px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    // 我的订单/我的收藏/抵用券
    .login-row-up {
      //   height: 53px;
      padding: 0 15px;
      flex-wrap: wrap;
      .fn-item {
        width: 33.3%;
        &:hover {
          cursor: pointer;
        }
        .fn-item-image {
          width: 24px;
          height: 26.4px;
          margin: 0 auto;
        }
        span {
          margin: 5px 0;
          font-size: 12px;
          color: #222;
        }
      }
    }
  }
}
</style>