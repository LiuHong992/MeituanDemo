<template>
  <div class="classfys">
    <!-- 分类导航栏 -->
    <div class="navbar">
      <div class="allclassfy">
        <span>全部分类</span>
      </div>
      <!-- 导航栏具体内容 -->
      <div class="classfycont">
        <div
          class="classfymodel flex between"
          v-for="(item,index) in menus"
          :key="index"
          @mouseenter="changeFlag(item)"
          @mouseleave="changeFlags(1,item)"
        >
          <div class="modelleft flex">
            <i class="iconfont" :class="item.type" :style="{color:item.color}"></i>
            <div class="iname">{{item.name}}</div>
          </div>
          <div class="iicon">
            <Icon type="ios-arrow-forward" />
          </div>
        </div>
      </div>
      <!-- 隐藏的盒子 -->
      <div class="hiddencont" v-if="flag"
          @mouseenter="changeFlag('')"
          @mouseleave="changeFlags(0)">
          <div class="hcontent">
            <div class="hcontentmodel" v-for="item in menuchilds.child" :key="item.id">
                <!-- 标题 -->
                <div class="htitle flex between">
                  <h4>{{item.title}}</h4>
                  <div class="rightcont">
                    <span>更多</span>
                    <Icon type="ios-arrow-forward" />
                  </div>
                </div>
                <!-- 内容 -->
                <div class="hmain flex">
                  <div class="hmainmodel" v-for="item0 in item.child" :key="item0.id">
                    <span>{{item0}}</span>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
    <!-- 右边轮播图盒子 -->
    <div class="rightbar">
      <!-- 右边顶上的导航栏 -->
      <div class="rightupbar">
        <div class="barmodel" v-for="item in bavcontent" :key="item.id">
          <span>{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图图片
      images: [
        "http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg",
        "http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg",
        "http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg",
        "http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg"
      ],
      // 分类导航栏数据
      bavcontent: [
        "美团外卖",
        "猫眼电影",
        "美团酒店",
        "民宿/公寓",
        "商家入驻",
        "美团公益"
      ],
      // 隐藏盒子的显示与隐藏
      flag: false,
      count:0,
      // 接收menus下面的child数组的对象
      menuchilds:{}
    };
  },
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  methods: {
    // 弹出框显示
    changeFlag(items) {
      setTimeout(() => {
      this.flag = true
        if(items !== ''){
          this.menuchilds = items
        }
      },10)
    },
    // 弹出框隐藏
    changeFlags(ids,items) {
      setTimeout(() => {
        this.flag = false;
        this.count = ids
        if(this.count === 0){
          this.menuchilds = []
        }else {
          this.menuchilds = items
        }
      },10)
    },
  },
  mounted() {
    // console.log(this.menus);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.classfys {
  display: flex;
  width: 1190px;
  min-width: 1190px;
  height: 430px;
  margin: 0 auto;

  // 分类导航栏
  .navbar {
    position: relative;
    width: 230px;
    height: 480px;
    margin-top: -50px;
    background-color: white;
    border: 1px solid #e5e5e5;
    color: #646464;
    // 全部分类文字
    .allclassfy {
      width: 100%;
      height: 50px;
      padding-top: 15px;
      span {
        font-size: 16px;
        font-weight: 700;
        color: #222222;
        margin-left: 15px;
      }
    }
    // 分类具体详情
    .classfycont {
      width: 100%;
      height: 425px;
      padding: 10px 0 8px;
      .classfymodel {
        height: 25.5px;
        padding: 2px 12px;
        &:hover {
          background-color: #fff7eb;
          .iname {
            color: black;
            font-weight: 700;
          }
        }
        .modelleft {
          line-height: 21px;
          i {
            font-size: 17px;
          }
          .iname {
            font-size: 13px;
            margin-left: 11px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
    // 隐藏的盒子
    .hiddencont {
      position: absolute;
      left: 230px;
      top: 60px;
      z-index: 99;
      width: 400px;
      height: 416px;
      background-color: #fff;
      .hcontent{
        padding:0 30px;
        .hcontentmodel{
          // 标题
          .htitle{
            margin-top:24px;
            padding-bottom:10px;
            border-bottom:1px solid #E5E5E5;
            line-height:22px;
            h4{
              font-size:18px;
              color:black;
            }
            .rightcont{
              color:#666;
            }
          }
          // 内容
          .hmain{
            width:100%;
            flex-wrap:wrap;
            .hmainmodel{
              margin:10px 16px 0 0;
              span{
                font-size:12px;
                color:#999;
                &:hover{
                  cursor:pointer;
                  color:#fe8c00;
                }
              }
            }
          }
        }
      }
    }
  }
  // 右边轮播图盒子
  .rightbar {
    position: relative;
    width: 950px;
    margin-left: 10px;
    margin-top: 10px;
    // 右边顶上导航栏
    .rightupbar {
      position: absolute;
      top: -45px;
      left: 20px;
      display: flex;
      .barmodel {
        margin: 0 20px;
        span {
          font-weight: 700;
          font-size: 16px;
          color: #222222;
        }
      }
    }
  }
}
</style>