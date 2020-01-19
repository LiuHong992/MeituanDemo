<template>
  <div>
    <!-- 头部 -->
    <div class="header-mini">
      <div class="header-mini-content flex between">
        <div class="logoimg"></div>
        <div class="login-block flex">
          <div class="login-block-had">已有美团账号？</div>
          <div class="logins" @click="$goto('/login')">登录</div>
        </div>
      </div>
    </div>
    <!-- 主体部分 -->
    <registers></registers>
    <!-- 底部 -->
    <div class="footer-mini textalign">
      <p>
        ©
        <span @click="$goto('/')">meituan.com</span>
        <span>京ICP证070791号</span>
        <span>京公网安备11010502025545号</span>
      </p>
    </div>
  </div>
</template>

<script>
import registers from "../components/Registers/Registers";
export default {
  data() {
    return {};
  },
  components: {
    registers
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// 头部
.header-mini {
  width: 100%;
  min-width: 1080px;
  border-bottom: 2px solid #d8d8d8;
  .header-mini-content {
    max-width: 980px;
    height: 59px;
    margin: 0 auto;
    padding: 10px 0;
    // logo图片
    .logoimg {
      width: 128px;
      height: 36px;
      background: url("//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png")
        no-repeat;
      background-size: contain;
    }
    .login-block {
      line-height: 39px;
      .login-block-had {
        margin-right: 12px;
      }
      .logins {
        height: 24px;
        padding: 0 11px;
        margin-top: 8px;
        background: #ffd000;
        box-shadow: 0 2px 1px rgba(191, 105, 0, 0.15);
        border: rgba(191, 105, 0, 0.15);
        border-radius: 2px;
        font-size: 12px;
        line-height: 24px;
        color: #222;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
// 底部
.footer-mini {
  border: 1px solid #eee;
  padding-top: 20px;
  p {
    color: #999;
    font-size: 13px;
    span {
      margin-right: 8px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>