<template>
  <div>
    <div class="header-mini">
      <!-- LOGO图片 -->
      <div class="logoimage backs"></div>
    </div>
    <!-- 中间内容部分 -->
    <div class="login-content flex">
      <!-- 左边图片 -->
      <div class="login-left-image">
        <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" alt />
      </div>
      <!-- 右边主题内容 -->
      <div class="login-right-content">
        <!-- 空白部分 -->
        <div class="login-empty-info">
          <div class="backs"></div>
        </div>
        <!-- 登录方式 -->
        <!-- 密码登录 -->
        <div class="login-bypassword" v-if="!flag">
          <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
            <div class="login-header flex between">
              <span>账号登录</span>
              <div class="change-login flex" @click="changeFlag('formCustom')">
                <p>手机动态码登录</p>
                <Icon type="md-phone-portrait" />
              </div>
            </div>
            <!-- 用户名 -->
            <!-- <keep-alive include="username"> -->
            <FormItem prop="username">
              <Input v-model="formCustom.username" placeholder="请输入用户名" />
            </FormItem>
            <!-- </keep-alive> -->
            <!-- 密码 -->
            <FormItem prop="password">
              <Input type="password" v-model="formCustom.password" placeholder="请输入密码" />
            </FormItem>
            <!-- 忘记密码 -->
            <div class="forgetpwd">
              <span>忘记密码？</span>
            </div>
            <!-- 登录按钮 -->
            <FormItem>
              <Button class="login-btn" type="warning" @click="handleSubmit('formCustom')" long>登录</Button>
            </FormItem>
            <!-- 跳转注册页 -->
            <p class="gotoRegister">
              还没有账号？
              <span @click="$goto('/register')">免费注册</span>
            </p>
            <!-- 其他方式登录分割线 -->
            <Divider class="login-other">用合作网站账号登录</Divider>
            <!-- 其他登录方式 -->
            <div class="login-others flex">
              <div class="login-qq backs"></div>
              <div class="login-wb backs"></div>
            </div>
          </Form>
        </div>
        <!-- 手机动态码登录(假) -->
        <div class="login-bymsgcode login-bypassword" v-else>
          <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
            <div class="login-header flex between">
              <span>账号登录</span>
              <div class="change-login flex" @click="changeFlag('formCustom')">
                <p>普通方式登录</p>
                <Icon type="md-person" />
              </div>
            </div>
            <!-- 用户名 -->
            <FormItem prop="phone">
              <Input v-model="formCustom.phone" placeholder="请输入手机号" />
            </FormItem>
            <!-- 密码 -->
            <FormItem prop="code">
              <Input v-model="formCustom.code" placeholder="请输入动态码" />
            </FormItem>
            <!-- 忘记密码 -->
            <div class="forgetpwd">
              <span>忘记密码？</span>
            </div>
            <!-- 登录按钮 -->
            <FormItem>
              <Button class="login-btn" type="warning" @click="handleSubmit('formCustom')" long>登录</Button>
            </FormItem>
            <!-- 跳转注册页 -->
            <p class="gotoRegister moremsg">
              提示：未注册美团账号的手机号，登录时将自动注册美团账号，且代表您已同意
              <a
                href="https://rules-center.meituan.com/rules-detail/4"
              >《美团点评用户服务协议》</a>
              <a href="https://rules-center.meituan.com/rules-detail/2">《美团点评隐私政策》</a>
            </p>
            <!-- 其他方式登录分割线 -->
            <Divider class="login-other">用合作网站账号登录</Divider>
            <!-- 其他登录方式 -->
            <div class="login-others flex">
              <div class="login-qq backs"></div>
              <div class="login-wb backs"></div>
            </div>
          </Form>
        </div>
      </div>
    </div>
    <!-- 底部更多信息 -->
    <div class="login-moreinfo">
      <div class="login-moreinfo-content flex">
        <div>
          <span>关于美团</span>
        </div>
        <div>
          <span>加入我们</span>
        </div>
        <div>
          <span>商家入驻</span>
        </div>
        <div>
          <span>帮助中心</span>
        </div>
        <div>
          <span>美团手机版</span>
        </div>
      </div>
    </div>
    <p class="mores">
      ©
      <span>2020</span>
      <span @click="$goto('/')" class="sp-one">美团网团购</span>
      <span>meituan.com</span>
      <span class="sp-two">京ICP证070791号</span>
      京公网安备11010502025545号
    </p>
  </div>
</template>

<script>
export default {
  data() {
    // 用户名自定义验证规则
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (!/^[^\u4e00-\u9fa5]{0,}$/.test(value)) {
          callback(new Error("用户名不能含有中文"));
        }
      }
      callback();
    };
    // 创建密码自定义验证规则
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
      callback();
    };
    // 创建密码自定义验证规则
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        callback();
      }
      callback();
    };
    // 创建密码自定义验证规则
    const validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入动态验证码"));
      } else {
        callback();
      }
      callback();
    };
    return {
      // 控制登录方式
      flag: false,
      formCustom: {
        username: "",
        password: "",
        phone: "",
        code: ""
      },
      ruleCustom: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    // 登录
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$api
            .login({
              username: this.formCustom.username,
              password: this.formCustom.password
            })
            .then(res => {
              if (res.code === 200) {
                // 存储用户信息进localStorage中
                localStorage.setItem("userinfo", JSON.stringify(res.data));
                this.$Message.success(res.msg);
                this.$router.push("/");
              } else {
                this.$Message.warning(res.msg);
                this.$refs[name].resetFields();
              }
            })
            .catch(err => {});
        } else {
          this.$Message.error("请输入完整信息!");
        }
      });
    },
    // 切换登录方式
    changeFlag(name) {
      this.flag = !this.flag;
      this.$refs[name].resetFields();
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.backs {
  background: url("//s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/sp-normal.2ee5c09.png")
    no-repeat;
}
// 头部LOGO
.header-mini {
  max-width: 980px;
  margin: 40px auto 30px;
  .logoimage {
    width: 82px;
    height: 54px;
    background-position: -188px -808px;
  }
}
// 中间内容部分
.login-content {
  max-width: 980px;
  margin: 0 auto 70px;
  // 左边LOGO
  .login-left-image {
    width: 480px;
    height: 370px;
    margin-right: 115px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  // 右边主题内容
  .login-right-content {
    width: 270px;
    // 空白部分
    .login-empty-info {
      width: 100%;
      min-height: 18px;
      visibility: hidden;
      padding: 10px;
      margin-bottom: 10px;
      div {
        width: 20px;
        height: 20px;
        background-position: 0 -500px;
      }
    }
    // 密码登录(其中包含了部分验证码登录的样式)
    .login-bypassword {
      width: 100%;
      margin-bottom: 10px;
      .login-header {
        span {
          color: #666;
          font-weight: 400;
        }
        .change-login {
          &:hover {
            cursor: pointer;
          }
          p {
            color: #666;
            font-size: 12px;
            line-height: 20px;
          }
          i {
            line-height: 20px;
          }
        }
      }
      // 忘记密码
      .forgetpwd {
        text-align: right;
        margin: 10px 0;
        span {
          font-size: 12px;
          color: #fe8c00;
          &:hover {
            cursor: pointer;
          }
        }
      }
      // 登录按钮
      .login-btn {
        color: black;
        font-weight: 700;
      }
      // 跳转注册页
      .gotoRegister {
        span {
          color: #fe8c00;
          &:hover {
            cursor: pointer;
          }
        }
      }
      // 动态码登录
      .moremsg {
        white-space: wrap;
        font-size: 12px;
        color: #999;
        a {
          color: #fe8c00;
          &:hover {
            cursor: pointer;
          }
        }
      }
      // 其他方式登录分割线
      .login-other {
        margin-top: 8px !important;
        color: #666;
        font-size: 14px;
      }
      // 其他方式登录
      .login-others {
        padding: 0 0 0 88px;
        // 公共样式
        div {
          width: 18px;
          height: 18px;
          margin-right: 20px;
        }
        .login-qq {
          background-position: -1250px -491px;
          &:hover {
            cursor: pointer;
            background-position: -1250px -509px;
          }
        }
        .login-wb {
          background-position: -1250px -599px;
          &:hover {
            cursor: pointer;
            background-position: -1250px -545px;
          }
        }
      }
    }
  }
}
// 底部更多信息
.login-moreinfo {
  width: 980px;
  padding: 12px 0;
  margin: 0 auto 20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  .login-moreinfo-content {
    width: 594px;
    color: #999;
    font-size: 12px;
    div {
      padding: 0 16px;
      margin: 5px 0;
      border-left: 1px solid #eee;
      span {
        &:hover {
          cursor: pointer;
        }
      }
      &:first-child {
        padding-left: 0;
        border-left: none;
      }
    }
  }
}
.mores {
  width: 980px;
  margin: 0 auto 20px;
  font-size: 12px;
  color: #999;
  span {
    margin: 0 2px;
    &:first-child {
      margin-left: 0;
    }
  }
  .sp-one:hover {
    cursor: pointer;
  }
  .sp-two:hover{
    cursor: pointer;
  }
}
</style>