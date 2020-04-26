<template>
  <div class="app-menu">
    <el-menu
      :unique-opened="true"
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :router="true">
      <template v-for="(item, index) in routerData">
        <template v-if="!item.meta.hidden && item.meta.one">
          <template v-for="(el, idx) in item.children">
            <el-menu-item :index="el.path" :key="idx">
              <i class="el-icon-menu"></i>
              <span slot="title" class="menu-title">{{el.meta.title}}</span>
            </el-menu-item>
          </template>
        </template>
        <el-submenu :index="item.path" v-if="item.children && !item.meta.one" :key="index">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span class="menu-title">{{item.meta.title}}</span>
          </template>
          <template v-for="(el, idx2) in item.children">
            <el-menu-item :index="el.path" :key="idx2">
              <i class="el-icon-menu"></i>
              <span class="menu-title" slot="title" v-if="!el.meta.hidden">{{el.meta.title}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
// import { Message } from 'element-ui'
// import { KEYS } from '@/config'
// import { getStorageItem, clearStorage } from '@/utils'

export default {
  name: 'AppHeader',
  data () {
    return {
      routerData: [],
      defaultActive: ''
    }
  },
  created () {
    this.routerData = this.$router.options.routes
    this.defaultActive = this.$route.path
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="scss">
  .app-menu {
    .el-menu {
      background: #227bd8;
      z-index: 1111;
      height: calc(100vh - 90px);
      position: relative;
    }
    /deep/ .el-submenu__title {
      line-height: 60px;
      height: 60px;
      font-size: 16px;
      background: #227bd8;
      i.iconfont {
        margin-right: 5px;
      }
    }
    /deep/ .el-menu-item {
      line-height: 60px;
      height: 60px;
      font-size: 14px;
    }
    .el-menu-item.is-active {
      background: #1b5494;
    }
    .el-menu-item:hover,
    /deep/ .el-submenu__title:hover {
      background: #1b5494;
    }
    /deep/ .el-menu--inline {
      background: #1465ba;
      box-shadow: 0px 5px 7px -5px #1b5494 inset;
      .el-menu-item {
        color: #fff;
        border-left: 5px solid #1465ba;
      }
      .el-menu-item.is-active,
      .el-menu-item:hover {
        background: #0d58a7;
        border-left: 5px solid #fff;
      }
    }
    /deep/ .el-submenu__title,
    .el-menu-item {
      span,
      i {
        color: #fff;
      }
    }
    .menuImg {
      width: 279px;
      height: 428px;
      background: #1b5494;
      position: absolute;
      bottom: 0;
      z-index: -1;
    }
  }
</style>
