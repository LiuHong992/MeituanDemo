<template>
  <div class="register-content">
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="85">
      <!-- 手机号验证 -->
      <div class="register-phone register-common flex">
        <FormItem label="手机号" prop="phone">
          <Input v-model="formCustom.phone" placeholder="输入手机号" />
        </FormItem>
        <div class="phone-pass" v-if="phoneflag">
          <Icon type="md-checkbox" color="green" />
          <span>验证通过</span>
        </div>
      </div>
      <!-- 发送验证码 -->
      <div class="register-sendcode register-common">
        <div class="sendcode-btn textalign" @click="sendCode">{{msgs}}</div>
      </div>
      <!-- 用户名 -->
      <div class="register-username register-common">
        <FormItem label="用户名" prop="username">
          <Input v-model="formCustom.username" placeholder="输入用户名" />
        </FormItem>
      </div>
      <!-- 创建密码 -->
      <div class="register-password register-common">
        <FormItem label="创建密码" prop="password">
          <Input type="password" v-model="formCustom.password" placeholder="输入密码" />
        </FormItem>
        <!-- 密码强度 -->
        <div class="pw-strength flex between">
          <div class="pw-strength-comm" :class="{pw1:count <= 3 && count > 0}">弱</div>
          <div class="pw-strength-comm" :class="{pw2:count <= 3 && count >= 2}">中</div>
          <div class="pw-strength-comm" :class="{pw3:count === 3}">强</div>
        </div>
      </div>
      <!-- 确认密码 -->
      <div class="register-pwdagain register-common">
        <FormItem label="确认密码" prop="passwdCheck">
          <Input type="password" v-model="formCustom.passwdCheck" placeholder="请再次输入密码" />
        </FormItem>
      </div>
      <!-- 邮箱 -->
      <div class="register-email register-common">
        <FormItem label="邮箱" prop="email">
          <Input v-model="formCustom.email" placeholder="输入你的邮箱" />
        </FormItem>
      </div>
      <!-- 注册按钮和重置表单按钮 -->
      <div class="register-submit register-common">
        <FormItem>
          <Button type="warning" @click="handleSubmit('formCustom')">同意以下协议并注册</Button>
          <Button @click="handleReset('formCustom')" style="margin-left: 8px">重新填写</Button>
        </FormItem>
      </div>
      <!-- 用户协议 -->
      <div class="register-useragree register-common flex">
        <a
          class="f1"
          href="https://rules-center.meituan.com/rules-detail/4"
          target="_blank"
        >《美团点评用户服务协议》</a>
        <a
          class="f1"
          href="https://rules-center.meituan.com/rules-detail/2"
          target="_blank"
        >《美团点评隐私政策》</a>
      </div>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    // 手机号自定义验证规则
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入你的手机号码"));
        this.phoneflag = false;
        return;
      } else {
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
          callback(new Error("请输入正确格式的手机号码"));
          this.phoneflag = false;
          return;
        }
        this.phoneflag = true;
        callback();
      }
    };
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
        if (value.length < 6) {
          callback(new Error("请输入至少6位数的密码"));
        }
        if (this.formCustom.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField("passwdCheck");
        }
        callback();
      }
      callback();
    };
    // 确认密码自定义验证规则
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formCustom.password) {
        callback(new Error("两次输入的密码不一致！"));
      } else {
        callback();
      }
    };
    // 邮箱自定义验证规则
    const validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
          callback(new Error("邮箱格式不正确"));
        }
      }
      callback();
    };
    return {
      phoneflag: false,
      //  发送验证码文字
      msgs: "免费获取短信验证码",
      // 控制密码强度显示
      count: 0,
      formCustom: {
        phone: "",
        username: "",
        password: "",
        passwdCheck: "",
        email: ""
      },
      ruleCustom: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    //  发送验证码验证
    sendCode() {
      if (this.phoneflag) {
        let counts = 5;
        let timer = setInterval(() => {
          this.msgs = `发送中(${counts})`;
          counts--;
          if (counts < 0) {
            clearInterval(timer);
            this.msgs = "重新发送";
          }
        }, 1000);
      } else {
        this.$Message.warning("请输入正确的手机号码");
      }
    },
    // 注册按钮
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$api
            .register({
              username: this.formCustom.username,
              password: this.formCustom.password,
              email: this.formCustom.email
            })
            .then(res => {
              if (res.code === 200) {
                this.$Message.success(res.msg);
                this.$router.push('/login')
              } else {
                this.$Message.warning(res.msg);
                this.$refs[name].resetFields();
                this.phoneflag = false;
              }
            })
            .catch(err => {});
        } else {
          this.$Message.error("请输入完整信息!");
        }
      });
    },
    // 重置按钮
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  mounted() {},
  watch: {
    "formCustom.password"(val) {
      if (val.match(/[a-z]/g)) {
        this.count++;
      }
      if (val.match(/[0-9]/g)) {
        this.count++;
      }
      if (val.match(/(.[^a-z0-9])/g)) {
        this.count++;
      }
      if (val.length < 6) {
        this.count = 0;
      }
      if (this.count > 3) {
        this.count = 3;
      }
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.register-content {
  max-width: 980px;
  min-height: 300px;
  margin: 0 auto 30px;
  padding-top: 30px;
  // 公共样式
  .register-common {
    position: relative;
    height: 50px;
    padding: 8px 0 8px 110px;
  }
  // 手机号
  .register-phone {
    .phone-pass {
      height: 36px;
      i {
        width: 18px;
        height: 18px;
        margin-top: 12px;
        margin-left: 5px;
      }
    }
  }
  // 发送验证码
  .register-sendcode {
    padding-top: 5px;
    height: 36px;
    .sendcode-btn {
      width: 130px;
      margin-left: 85px;
      padding: 3px 8px 0;
      font-size: 12px;
      color: #333;
      background-color: #dedede;
      border: 1px solid #e3e3e3;
      border-bottom: 1px solid #aaa;
      border-radius: 3px;
      background-image: linear-gradient(to bottom, #f7f7f7, #dedede);
      &:hover {
        cursor: pointer;
      }
    }
  }
  // 短信动态码
  .register-username {
  }
  // 创建密码
  .register-password {
    height: 100px;
    // 密码强度
    .pw-strength {
      width: 265px;
      margin: 0 0 8px 85px;
      // 密码强度弱class
      .pw1 {
        background-color: #f76120 !important;
      }
      // 密码强度中class
      .pw2 {
        background-color: #ff8900 !important;
      }
      // 密码强度强class
      .pw3 {
        background-color: #5bab3c !important;
      }
      .pw-strength-comm {
        width: 32%;
        text-align: center;
        line-height: 20px;
        color: #fff;
        background-color: #eeeeee;
      }
    }
  }
  // 确认密码
  // .register-pwdagain{
  // }
  // 注册和重置表单按钮
  .register-submit {
    // height: 36px;
  }
  // 用户协议
  .register-useragree {
    height: 36px;
    margin: 0 0 10px 80px;
    font-size: 13px;
    .f1 {
      color: #fe8c00;
    }
  }
}
</style>