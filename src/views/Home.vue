<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div @click="toAbout()" class="logo-in">
      hello 我是青丘无敌大可爱小凤九啊啊啊
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  created () {
    console.log(this.$route.query.redirect, 'this.$route.query.redirect')
  },
  methods: {
    toAbout () {
      this.$router.push({
        path: '/demo'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo-in {
    cursor: pointer;
  }
}
</style>
