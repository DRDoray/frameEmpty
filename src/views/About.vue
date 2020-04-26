<template>
  <div class="appMainBox">
    <app-header class="app-header"></app-header>
    <main class="app-main">
      <div class="menuBox">
        <app-menu></app-menu>
      </div>
      <div class="mainBox">
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </main>
  </div>
  <!-- <div class="main">
    <AppHeader class="app-header"></AppHeader>
    <AppMenu></AppMenu>
    <section class="w100b">
      <transition name="fade-transform" mode="out-in">
        <router-view/>
      </transition>
    </section>
  </div> -->
</template>

<script>
import AppHeader from '@/components/AppHeader'
// import AppFooter from '@/components/AppFooter'
import AppMenu from '@/components/AppMenu'

export default {
  name: 'App',
  components: {
    AppHeader,
    // AppFooter,
    AppMenu
  }
}
</script>

<style lang="scss" scoped>
.appMainBox {
  // display: flex;
  // flex-wrap: wrap;
  .app-main {
    display: flex;
    background-color: #F7F7F7;
    height: calc(100vh - 70px);
    .menuBox {
      margin-top: 20px;
      width: 250px;
      height: auto;
      min-height: calc(100vh - 90px);
      flex-shrink: 0;
      overflow-y: auto;
      background: #227bd8;
    }
    .mainBox {
      width: 100%;
      min-height: calc(100vh - 110px);
      overflow: auto;
      // overflow-x:hidden;
      margin: 20px 0 20px 20px;
    }
    .mainBox::-webkit-scrollbar {
        width: 5px;
        background-color: #fff;
        height: 5px;
      }

    /*定义滚动条轨道 内阴影+圆角*/
    .mainBox::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px #f1f1f1;
      border-radius: 10px;
      background-color: #f1f1f1;
    }

    /*定义滑块 内阴影+圆角*/
    .mainBox::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px #a8a8a8;
      background-color: #a8a8a8;
    }
  }

}
/*fade*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
  // html,body{width:100%}
  //   .main{
  //       display: flex;
  //       flex-wrap: wrap;
  //       overflow: hidden;
  //       height:100%;
  //       /*box-sizing: border-box;*/
  //       min-width: 1280px;
  //       background-color: #EEF2F5;
  //   }
  //   .w100b{
  //       display: flex;
  //       width: calc(100vw - 320px);
  //       flex: 1;
  //       padding: 20px;
  //       // margin-top: 60px;
  //       background-color: #EEF2F5;
  //       height: calc(100vh - 110px);
  //       overflow-y: auto;
  //   }
  //   .w100b::-webkit-scrollbar {
  //     width: 5px;
  //     background-color: #fff;
  //     height: 5px;
  //   }

  //   /*定义滚动条轨道 内阴影+圆角*/
  //   .w100b::-webkit-scrollbar-track {
  //     -webkit-box-shadow: inset 0 0 6px #f1f1f1;
  //     border-radius: 10px;
  //     background-color: #f1f1f1;
  //   }

  //   /*定义滑块 内阴影+圆角*/
  //   .w100b::-webkit-scrollbar-thumb {
  //     border-radius: 10px;
  //     -webkit-box-shadow: inset 0 0 6px #a8a8a8;
  //     background-color: #a8a8a8;
  //   }
  //   /*fade*/
  //   .fade-enter-active,
  //   .fade-leave-active {
  //   transition: opacity 0.28s;
  //   }

  //   .fade-enter,
  //   .fade-leave-active {
  //   opacity: 0;
  //   }

  //   /*fade-transform*/
  //   .fade-transform-leave-active,
  //   .fade-transform-enter-active {
  //   transition: all .5s;
  //   }
  //   .fade-transform-enter {
  //   opacity: 0;
  //   transform: translateX(-30px);
  //   }
  //   .fade-transform-leave-to {
  //   opacity: 0;
  //   transform: translateX(30px);
  //   }
</style>
