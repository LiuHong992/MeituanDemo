<template>
 <div class="hadstyles">
   <!-- 顶部导航栏 -->
   <div class="headers flex">
    <div class="styletxt txtcommon">
       有格调
    </div>
    <div class="rightcont flex between">
      <div class="txtcommon" v-for="(item,index) in upbars" :key="item.id" @mouseenter="requests(index)">
        {{item.msg}}
        <Icon class="mdicon" type="md-arrow-dropup" v-if="index === counts"/>
      </div>
    </div>
   </div>
   <!-- 下方数据渲染 -->
   <div class="stylescontent flex">
     <div class="stylesmodel" v-for="item in styleArr[counts]" :key="item.id">
       <div class="stylesimg">
         <img :src="item.photos[0].url" alt="暂无图片信息" v-if="item.photos.length>0">
         <img src="//p0.meituan.net/shaitu/__49043264__6606669.jpg@368w_208h_1e_1c" alt="" v-else>
       </div>
       <!-- 标题 -->
       <div class="stitle">{{item.name}}</div>
       <!-- 标签 -->
       <div class="stags textover">{{item.type}}</div>
       <!-- 价格和地址 -->
       <div class="priceadd flex between">
          <div v-if="item.biz_ext.cost.length===0">暂无商品价格</div>
          <div class="prices" v-else>
            <span class="unit">￥</span>
            <span class="mainnum">{{item.biz_ext.cost}}</span>
            <span class="unit">/起</span>
          </div>
          <!-- 地址 -->
          <div class="address">
            {{item.adname}}
          </div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
      //  顶部导航栏数组
       upbars:[
        {
          msg:'全部',
          searchs:'景点'
        },
        {
          msg:'约会聚餐',
          searchs:'美食'
        },
        {
          msg:'丽人SPA',
          searchs:'丽人'
        },
        {
          msg:'电影演出',
          searchs:'电影'
        },
        {
          msg:'品质出游',
          searchs:'旅游'
        },
       ],
      //  顶部导航栏底部小三角显示参数
       flag:false,
      //  控制数据渲染的参数
       counts:0,
      //  接收请求来的数据的数组
      styleArr:[],
      // 请求接收的数据(6条装)
      sixinfo:[]
     }
   },
   components: {

   },
   methods: {
    //  循环请求数据方法
    getStyles() {
      let a = 0
      this.upbars.map((item,index) => {
        // console.log(this.$store.state.citys)
         this.$api.Result(this.$store.state.citys,item.searchs).then(res => {
          //  console.log(res)
            this.sixinfo = res.data.pois.splice(0,6)
            this.styleArr.push(this.sixinfo)
          }).catch(err => {
          console.log(err)
          })
        })
    },
    // 鼠标移入时控制数据渲染
    requests(idx) {
      setTimeout(() => {
        this.counts = idx
      },200)
    }
   },
   mounted() {
     setTimeout(() => {
      if(this.$store.state.citys !== ''){
        this.getStyles()
      }
     },400)
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
// 头部标题字体公共样式
.txtcommon{
  position:relative;
  padding:0 5px;
  font-size:14px;
  &:hover{
    cursor:pointer;
  }
  .mdicon{
    position:absolute;
    top:28px;
    left:0;
    right:0;
    font-size:26px;
  }
}
.hadstyles{
  max-width:1190px;
  height:695px;
  margin:40px auto 0;
  // 头部
  .headers{
    width:100%;
    height:44px;
    line-height:44px;
    background-color:#C0A980;
    border-top-right-radius:5px;
    border-top-left-radius:5px;
    color:#ffffff;
    .styletxt{
      font-size:18px;
      margin-left:13px;
      margin-right:10px;
      font-family:Serif;
    }
    // .rightcont{
    // }
  }
  // 下方内容
  .stylescontent{
    width:100%;
    flex-wrap:wrap;
    padding:11px 10px 10px;
    background-color:#fff;
    border-bottom-left-radius:4px;
    border-bottom-right-radius:4px;
    border:1px solid #e5e5e5;
    border-top:none;
    .stylesmodel{
      width:33.3%;
      height:314px;
      padding:10px;
      border-radius: 6px;
      transition: all .5s;
      &:hover{
        cursor: pointer;
        background-color: #F4F4F4;
      }
      .stylesimg{
        width:100%;
        height:208px;
        margin-bottom:8px;
        img{
          width:100%;
          height:100%;
          border-radius:4px;
        }
      }
      // 标题
      .stitle{
        font-size:16px;
        color:#222;
        margin-bottom:8px;
      }
      // 标签
      .stags{
        font-size:12px;
        color:#999;
        line-height:18px;
        margin-bottom:7px;
      }
      // 价格和地址
      .priceadd{
        .prices{
           color:#BE9E4D;
          .unit{
            font-size:14px;
          }
          .mainnum{
            font-size:22px;
          }
        }
      }
    }
  }
}
</style>