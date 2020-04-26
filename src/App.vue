<template>
  <div id="app" v-cloak>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <router-view></router-view> -->
    <main class="app-main">
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss">
[v-cloak] {
  display: none;
}
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  min-width: 1280px;
  min-height: 600px;
}
html {
  height: 100%;
}
#app {
  height: 100%;
  // min-width: 1280px;
  .app-main {
    // height: 100%;

  }
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
body::-webkit-scrollbar {
    width: 5px;
    background-color: #fff;
    height: 5px;
  }

/*定义滚动条轨道 内阴影+圆角*/
body::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #f1f1f1;
  border-radius: 10px;
  background-color: #f1f1f1;
}

/*定义滑块 内阴影+圆角*/
body::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px #a8a8a8;
  background-color: #a8a8a8;
}

</style>
