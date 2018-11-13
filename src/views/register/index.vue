<template>
<div class="login">
  <div class="login-container">
    <div class="login-header">
      <headers></headers>
      <!-- <img src="../../assets/img/logo.png" alt=""> -->
      <p style="margin-top:1%;margin-bottom:0">{{$t("user.registerInfo")}}</p>
    </div>
    <div class="login-content">
      <div class="login-border">
        <div class="login-main">
          <el-tabs v-model="activeName" :stretch = 'true'>
            <el-tab-pane :label="this.$t('user.register')" name="code">
              <Register :invitationCode="invitationCode"></Register>
            </el-tab-pane>
            <el-tab-pane :label="this.$t('user.login')" name="user">
              <Login></Login>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Headers from '../../components/Headers'
import Login from './Login'
import Register from './Register'
export default {
  name: 'login',
  components: {
    Login,
    Register,
    Headers
  },
  data () {
    return {
      activeName: 'code',
      invitationCode: ''
    }
  },
  computed: {
    userId () {
      return sessionStorage.getItem('userId')
    }
  },
  created () {
    this.init()
  },
  mounted () {
    var defaultWidth = document.documentElement.clientWidth
    var defaultHeight = window.innerHeight
    $('div.login').css('width', defaultWidth + 'px')
    // $('div.login').css('height', defaultHeight + 'px')
    if (this.userId) {
      this.$router.push({ path: '/account' })
    }
  },
  methods: {
    init () {
      var url = window.location.pathname
      var index = url.lastIndexOf('/')
      if (index !== 0) {
        let Base64 = require('js-base64').Base64
        var id = Base64.decode(url.slice(index + 1))
        var reg = /^[0-9]*$/
        console.log(id, reg.test(id))
        if (reg.test(id)) {
          this.invitationCode = id
        } else {
          this.$message({
            type: 'warning',
            message: this.$t('user.registerUrlErr')
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.login{
  background: #391DD3;
  padding-bottom:30px
}
.login-container {
  background: url('../../assets/img/login.png');
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
}
.login-header{
  text-align: center;
}
.login-header .headers{
  padding-top:5%
}
.login-header p{
  font-size: 22px;
  margin-top:5px;
  color:#D8D7DC
}
.login-content{
  display: flex;
  align-items: center;
  justify-content: space-around;
  width:95%;
  margin: 20px auto
}
.login-border {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 30px 30px 10px 30px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 1px 1px 2px #eee;
}
.login-main {
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #fff;
}

.login-submit {
  margin-top: 10px;
  width: 100%;
  border-radius: 28px;
}
.login-form {
  margin: 10px 0;
}

  .el-form-item {
    margin-bottom: 12px;
  }
  .el-input input{
      text-indent: 5px;
      border-color: #dcdcdc;
      border-radius: 3px;
    }
  .el-input__prefix i{
      padding: 0 5px;
      font-size: 16px !important;
      cursor: pointer;
  }
</style>
