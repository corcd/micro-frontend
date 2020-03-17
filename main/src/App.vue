<template>
  <div id="root" class="main-container">
    <div class="main-container-menu"></div>
    <!-- 子应用盒子 -->
    <div id="root-view" class="app-view-box" v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: 'root-view',
  props: {
    loading: Boolean,
    content: String
  }
}
</script>

<style lang="scss">
#root {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  #root-view {
    width: 90%;
    height: 100%;
  }

  .main-container-menu {
    width: 10%;
    height: 100%;
  }
}
</style>
