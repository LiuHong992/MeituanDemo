<template>
  <div>
    <!-- <Backtop> -->
      <router-view></router-view>
    <!-- </Backtop> -->
  </div>
</template>
<script>
// import Backtop from "../src/components/Backtop";
export default {
  components: {
    // Backtop
  }
};
</script>

<style lang="scss">
@import "../src/styles/common";
body {
  margin: 0;
  padding: 0;
}
.flex{
  display: flex;
}
.between{
  justify-content: space-between;
}
.around{
  justify-content: space-around;
}
.textover{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.textalign{
  text-align: center;
}
</style>
