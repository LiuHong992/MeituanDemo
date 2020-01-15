<template>
  <div class="searchtops">
    <!-- 顶部搜索框内容层 -->
    <div class="searchcontent flex searchbottom">
      <!-- 美团logo -->
      <div class="logos flex">
        <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt />
      </div>
      <!-- 搜索框 -->
      <div class="searchs">
        <div class="searchtop flex">
          <!-- 搜索输入框 -->
          <input
            type="text"
            v-model="value"
            placeholder="搜索商家和地点"
            @focus="changeFlag"
            @blur="changeFlag"
            @keyup.enter="onSearch"
          />
          <!-- 搜索弹出框 -->
          <div class="searcheject" v-show="flag && value === ''">
            <!-- 搜索历史 -->
            <div class="searchistory" v-show="this.$store.state.sHistory.length > 0">
              <div class="shistorytop flex between">
                <div class="historytxt">最近搜索</div>
                <div class="historytxts" @click="delHistory">删除搜索历史</div>
              </div>
              <!-- 搜索历史显示 -->
              <div class="shistorydown flex">
                <div
                  class="historymodel"
                  v-for="item in $store.state.sHistory"
                  :key="item.id"
                ><span @click="goToresult(item)">{{item}}</span></div>
              </div>
            </div>
            <!-- 热门搜索 -->
            <div class="hotsearch searchistory">
              <div class="shistorytop">
                <div class="historytxt">热门搜索</div>
              </div>
              <!-- 热门搜索模板 -->
              <div class="hotmodel" v-for="item in hotplaces" :key="item.id">
                <span @click="goTosearch(item.name)">{{item.name}}</span>
              </div>
            </div>
          </div>
          <!-- 搜索建议框 -->
          <div class="searcheject" v-if="flag && value.trim() !== ''">
            <div v-if="searchS.length>0">
              <div class="searchmodel" v-for="item in searchS" :key="item.id">
                <span @click="goTosearch(item.name)">{{item.name}}</span>
              </div>
            </div>
            <div class="doing textalign" v-else>拼命加载中...</div>
          </div>
          <div class="searchbtn" @click="onSearch">
            <Icon type="md-search" size="24" />
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
      value: "",
      flag: false,
      // 接收热门搜索数组
      hotplaces: [],
      // 搜索建议数组
      searchS:[]
    };
  },
  components: {},
  methods: {
    // 搜索框弹出层状态变化
    // 延迟执行失去焦点和获得焦点
    changeFlag() {
      setTimeout(() => {
        this.flag = !this.flag;
      }, 200);
    },
    // 搜索按钮
    onSearch() {
      if (!localStorage.getItem("searchhistory")) {
        localStorage.setItem(
          "searchhistory",
          JSON.stringify(this.$store.state.sHistory)
        );
      }
      if (this.value.trim() !== "") {
        let flags = true;
        this.$store.state.sHistory.map(item => {
          if (item === this.value.trim()) {
            flags = false;
          }
        });
        if (flags) {
          this.$store.state.sHistory.unshift(this.value.trim());
        }
        localStorage.setItem(
          "searchhistory",
          JSON.stringify(this.$store.state.sHistory)
        );
        this.goToresult(this.value)
      } else {
        this.$Message.info("请输入想搜索的内容");
        this.value = "";
      }
    },
    // 获取热门搜索方法
    getHotplace() {
      this.$api
        .Hotsearch(this.$store.state.citys)
        .then(res => {
          if (res.code === 200) {
            this.hotplaces = res.data.result;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除搜索历史
    delHistory() {
      localStorage.removeItem("searchhistory");
      this.$store.state.sHistory = [];
    },
    // 搜索建议
    searchSuggest() {
       setTimeout(() => {
      this.$api.Searchsuggest(this.$store.state.citys,this.value).then(res => {
        if(res.code === 200){
        this.searchS = res.data.top
        }
      }).catch(err => {
        console.log(err);
      })},500) 
    },
    // 点击搜索建议跳转商铺详情页面
    goTosearch(items) {
      this.$router.push({ name: "details", query: { keyword: items } });
    },
    // 点击搜索历史跳转搜索结果页面
    goToresult(item0) {
      this.$router.push({ name: "searchresult", query: { keyword: item0 } });
    }
  },
  mounted() {
    if (localStorage.getItem("searchhistory")) {
      this.$store.state.sHistory = JSON.parse(
        localStorage.getItem("searchhistory")
      );
    }
    setTimeout(() => {
      if(this.$store.state.citys !== ""){
      this.getHotplace();
      }
    }, 200),
    // 节流对输入框的值进行监听
    this.$watch(
      "value",
      this.$utils.throttle(() => {
        if (this.value === "") {
          this.searchS = [];
        } else {
          this.searchSuggest()
        }
      }, 200)
    );
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.searchtops {
  width: 100%;
  min-width: 1190px;
  background-color: white;
  box-shadow: 0px 2px 27px rgba(0,0,0,.1);
  .searchcontent {
    width: 1190px;
    height: 157px;
    margin: 0 auto;
    // logo图片
    .logos {
      width: 280px;
      min-width: 220px;
      padding: 28px 68px 40px 0;
      img {
        width: 126px;
        height: 46px;
      }
    }
    // 搜索框
    .searchs {
      width: 550px;
      height: 95px;
      padding-top: 28px;
      margin-left: 53px;
      .searchtop {
        position: relative;
        width: 100%;
        height: 40px;
        input {
          width: 470px;
          height: 100%;
          padding: 15px;
          border: 1px solid rgb(214, 213, 213);
          border-right: none;
          outline: none;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        }
        // 搜索框弹出层
        .searcheject {
          position: absolute;
          top: 40px;
          left: 0;
          width: 440px;
          padding: 10px;
          background-color: white;
          border-bottom-right-radius: 4px;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 5px 0 rgb(214, 213, 213);
          // 搜索历史
          .searchistory {
            width: 100%;
            font-size: 12px;
            color: #999;
            .shistorytop {
              font-weight: 700;
              .historytxts {
                &:hover {
                  cursor: pointer;
                }
              }
            }
            // 搜索历史展示数据
            .shistorydown {
              flex-wrap: wrap;
              .historymodel {
                color:#666;
                margin-right: 10px;
                &:hover {
                  cursor: pointer;
                  color: #fe8c00;
                }
              }
            }
          }
          // 热门搜索
          .hotsearch {
            width: 100%;
            .hotmodel {
              line-height: 20px;
              span {
                &:hover {
                  cursor: pointer;
                  color: #fe8c00;
                }
              }
            }
          }
          // 搜索建议框
          .searchmodel{
            width: 100%;
            font-size: 12px;
            span{
              &:hover{
                cursor: pointer;
                  color: #fe8c00;
              }
            }
          }
          .doing{
            font-size:12px;
            color:#999;
          }
        }
        .searchbtn {
          width: 80px;
          height: 100%;
          padding: 8px 28px;
          background-color: #ffc300;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>