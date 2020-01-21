<template>
  <div class="footers">
    <div class="footer-links">
      <div class="footer-content" v-for="item in footList" :key="item.id">
        <h4>{{item.title}}</h4>
        <div class="footer-mains" v-for="item0 in item.details" :key="item0.id">{{item0}}</div>
      </div>
    </div>
    <!-- 底部版权号 -->
    <div class="footer-copyright flex between">
      <div class="footer-copyright-left">
        <div class="left-first flex">
          <span>©美团网团购 meituan.com</span>
          <span>京ICP证070791号</span>
          <span>京ICP备10211739号</span>
        </div>
        <div class="left-second">
          <span>广播电视节目制作经营许可证（京）字第03889号</span>
        </div>
        <div class="left-third">
          <span>食品经营许可证</span>
          <span>互联网药品信息服务资格证</span>
        </div>
        <div class="left-fourth">
          <span>医疗器械网络交易服务第三方平台备案：（京）网械平台备字[2018]第00004号</span>
        </div>
      </div>
      <div class="footer-copyright-right">
        <div class="right-first">
          <span>京公网安备11010502025545号</span>
        </div>
        <div class="right-second flex">
          <img
            src="https://p1.meituan.net/travelcube/3e7f8a17e55bace814166b667618b459366061.png@76h_76w_2e"
            alt
          />
          <span>北京三快科技有限公司</span>
          <div class="record right-second-common"></div>
          <div class="honesty right-second-common"></div>
          <div class="consumption right-second-common"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  底部导航栏数据
      footList: [
        {
          title: "用户帮助",
          details: [
            "申请退款",
            "查看美团券密码",
            "常见问题",
            "用户协议",
            "隐私政策",
            "反诈骗公告",
            "消费者权益保障"
          ]
        },
        {
          title: "美团服务",
          details: [
            "美团外卖",
            "美团酒店",
            "猫眼电影",
            "美团配送",
            "美团云",
            "大众点评",
            "美团民宿",
            "无人配送"
          ]
        },
        {
          title: "商家合作",
          details: [
            "美团餐饮商户中心",
            "美食商家入驻(非外卖)",
            "美团外卖开店申请",
            "美团收银官网",
            "外卖配送加盟申请",
            "美团点评餐饮学院",
            "酒店商家入驻",
            "境内度假商家入驻",
            "综合商家入驻",
            "美团民宿房东商家入驻",
            "商家开票申请",
            "美团点评智能收银机",
            "美团点评餐饮开放平台",
            "美团点评收单",
            "免费使用美团排队",
            "快驴进货商家合作",
            "美团闪购商家入驻"
          ]
        },
        {
          title: "代理商加盟",
          details: [
            "美团外卖代理商招募",
            "到店餐饮代理商招募",
            "非餐饮代理商招募",
            "美团联盟",
            "美团收银招募线上分销商",
            "美团点评5S服务商招募",
            "美团收单渠道代理商招募"
          ]
        },
        {
          title: "美团规则",
          details: ["规则中心", "规则目录", "规则评议院"]
        },
        {
          title: "关注美团",
          details: ["美团新浪微博"]
        },
        {
          title: "公司信息",
          details: [
            "关于我们",
            "投资者关系",
            "加入我们",
            "商户诚信公约及管理办法",
            "保险经纪资质"
          ]
        },
        {
          title: "廉正举报",
          details: ["廉政邮箱"]
        },
        {
          title: "知识产权",
          details: ["知识产权维权平台"]
        },
        {
          title: "消费者服务热线",
          details: [
            "外卖消费者：10109777",
            "猫眼消费者：10105335",
            "其他消费者：10107888"
          ]
        },
        {
          title: "商家服务热线",
          details: [
            "外卖&餐饮商家：10105557",
            "休闲娱乐、丽人、ktv、教育、结婚、亲子、家装等商家：10100107"
          ]
        },
        {
          title: "投诉举报热线",
          details: [
            "违法和不良信息举报电话：4006018900",
            "举报邮箱：tousujubao@meituan.com"
          ]
        },
        {
          title: "商家自助入驻美团入口",
          details: []
        },
        {
          title: "供应商注册入口",
          details: []
        }
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
.footers {
  max-width: 1190px;
  margin: 40px auto 0;
  .footer-links {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    height: 538px;
    padding: 40px 45px;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    font-size: 12px;
    .footer-content {
      width: 220px;
      padding-bottom: 20px;
      color: #666;
      line-height: 2;
      h4 {
        font-size: 14px;
        color: #333;
      }
      .footer-mains {
        &:hover {
          cursor: pointer;
          color: #fe8c00;
        }
      }
    }
  }
  //   底部版权号
  .footer-copyright {
    color: #999;
    padding: 15px 0 30px 20px;
    line-height: 1.6;
    font-size: 12px;
    .footer-copyright-left {
      text-align: left;
      span {
        margin-right: 20px;
        &:hover {
          cursor: pointer;
          color: #fe8c00;
        }
      }
    }
    .footer-copyright-right {
      text-align: right;
      span {
        &:hover {
          cursor: pointer;
          color: #fe8c00;
        }
      }
      .right-second {
        padding-top: 5px;
        text-align: left;
        line-height: 38px;
        img {
          width: 38px;
          height: 38px;
        }
        span {
          padding: 0 3px;
        }
        .right-second-common {
          width: 109px;
          height: 38px;
          background: url("https://s0.meituan.net/bs/fe-web-meituan/8a39c6b/img/sprites/footer.png")
            no-repeat;
          margin-right: 3px;
        }
        .record {
          background-position: 0 -167px;
        }
        .honesty {
          background-position: 0 -127px;
        }
        .consumption {
          background-position: 0 -40px;
          margin-right: 0;
        }
      }
    }
  }
}
</style>