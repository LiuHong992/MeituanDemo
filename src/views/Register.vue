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
 </div>
</template>

<script>
import registers from '../components/Registers/Registers';
 export default {
   data () {
     return {
       
     }
   },
   components: {
      registers
   },
   methods: {

   },
   mounted() {

   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.header-mini{
  width:100%;
  min-width:1080px;
  border-bottom:2px solid #D8D8D8;
  .header-mini-content{
    max-width:980px;
    height:59px;
    margin:0 auto;
    padding:10px 0;
    // logo图片
    .logoimg{
      width:128px;
      height:36px;
      background:url('//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png') no-repeat;
      background-size:contain;
    }
    .login-block{
      line-height:39px;
      .login-block-had{
        margin-right:12px;
      }
      .logins{
        height:24px;
        padding:0 11px;
        margin-top:8px;
        background:#FFD000; 
        box-shadow:0 2px 1px rgba(191,105,0,.15);
        border:rgba(191,105,0,.15);
        border-radius:2px;
        font-size:12px;
        line-height:24px;
        color:#222;
        &:hover{
          cursor:pointer;
        }
      }
    }
  }
}
</style>