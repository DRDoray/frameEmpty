<template>
  <div class="header">
    <div class="leftBox">
      <img src="@/assets/logo.png">
      <span class="title font22">测试平台</span>
      <span class="line"></span>
      <!-- <span class="title"> {{userType === 1 ? '咨询中心' : '最高人民法院'}}</span> -->
      <span class="title">测试案例</span>
    </div>
    <div class="rightBox">
      <img src="@/assets/logo.png"
           class="header-img">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link nameBox">
          <!-- {{userName ? userName : (userType === 1 ? '咨询中心管理员': '最高院管理员')}}<i class="el-icon-arrow-down el-icon--right"></i> -->
          测试人员<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="updatePwd">修改密码</el-dropdown-item> -->
          <el-dropdown-item command="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
// import { KEYS } from '@/config'
// import { getStorageItem, clearStorage } from '@/utils'

export default {
  name: 'AppHeader',
  data () {
    return {
      // userName: getStorageItem(KEYS.UserName),
      // userType: getStorageItem(KEYS.UserType) ? Number(getStorageItem(KEYS.UserType)) : 0,
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'updatePwd') { // 修改密码
        // this.$router.push({
        //   name: 'updatePwd',
        //   params: {
        //     id: 1
        //   }
        // })
      } else if (command === 'logOut') { // 退出登录
        this.$confirm('退出后再次访问需要重新登录，确认退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // clearStorage()
          Message.success('已退出登录')
          this.$router.push('/')
        }).catch(() => {
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .header,
  .leftBox,
  .rightBox,
  .exitBox {
    display: flex;
    align-items: center;
  }
  .header {
    width: 100%;
    height: 70px;
    justify-content: space-between;
    background: url("../assets/login/huabiao.png") no-repeat 1px 5px rgba(27, 84, 148, 1);
    color: #fff;
    box-shadow: 0px 3px 7px 0px rgba(173, 173, 173, 0.21);
    .leftBox {
      margin-left: 47px;
      img {
        width: 46px;
        height: 46px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        font-weight: 500;
        line-height: 70px;
      }
      .font22 {
        font-size: 22px;
      }
      .line {
        display: inline-block;
        width: 2px;
        height: 30px;
        margin: 0 20px;
        background: #fff;
      }
    }
    .rightBox {
      margin-right: 40px;
      .header-img {
        width: 36px;
        height: 36px;
        margin-right: 15px;
      }
      .nameBox {
        font-size: 14px;
        font-weight: 500;
        color: #fff;
        line-height: 30px;
        i {
          margin-left: 15px;
          color: #ccc;
        }
        .el-icon-arrow-down:before {
          content: "\e790";
        }
      }
      .exitBox {
        cursor: pointer;
        margin-left: 40px;
        img {
          width: 14px;
          height: 14px;
          margin-right: 10px;
        }
      }
    }
  }
</style>
