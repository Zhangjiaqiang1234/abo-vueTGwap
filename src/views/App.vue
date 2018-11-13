<template>
  <div class="app">
    <img src="../assets/img/app/bg1.png" alt="" class="bg">
    <register ref='register' :login='login'></register>
    <router-link to='/register'><img src="../assets/img/app/bt1.png" alt="" class="bt bt1"></router-link>
    <img src="../assets/img/app/bt2.png" alt="" class="bt bt2" @click='TGregister()'>
    <router-link to='/download'><a class="textDownload" href="">已有账号可直接下载APP</a></router-link>
  </div>
</template>
<script>
import Register from './register/Register'
export default {
  name: 'app',
  components: {
    Register
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$i18n.locale = 'zh-CN'
    $('.el-form-item').css('width', '85%')
    $('.el-form-item').css('margin', '0 auto')
    $('.show').css('display', 'none')
  },
  updated () {
    $('.el-form-item').css('width', '85%')
    $('.el-form-item').css('margin', '0 auto')
    $('.show').css('display', 'none')
  },
  methods: {
    TGregister () {
      this.$refs.register.handleLogin()
      if (sessionStorage.getItem('login')) {
        this.$router.push({ path: '/downLoad' })
      }
    },
    login () {
      this.$router.push({ path: '/downLoad' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app{
  max-width: 100%;
  max-height:100%;
  margin: 0px auto;
  position: relative
}
.app .bg{
  width:100%;
  z-index: 1
}
.app .bt{
  position: absolute;
  left:50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  cursor: pointer;
}
.app .bt1{
  width:68%;
  top:47%;

}
.app .bt2{
  width:70%;
  bottom:8%;
}
form{
  width:90%;
  margin:0 auto;
  position:absolute;
  top:67%;
  left:50%;
  transform: translate(-50%, -50%);
}
.textDownload{
  text-align: center;
  width:50%;
  margin:0 auto;
  position:absolute;
  bottom:6%;
  left:50%;
  transform: translate(-50%, -50%);
  text-decoration:underline
}
</style>
