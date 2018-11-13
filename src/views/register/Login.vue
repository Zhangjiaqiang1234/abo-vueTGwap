<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="phone" class="form-item">
      <el-input size="small"  v-model="loginForm.phone" auto-complete="off" :placeholder='this.$t("user.phoneInfo")'>
        <i slot="prefix" class="el-icon-mobile-phone"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small"  :type="passwordType" v-model="loginForm.password" auto-complete="off" :placeholder='this.$t("user.passwordInfo")'>
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="el-icon-goods"></i>
      </el-input>
    </el-form-item>
    <!-- <el-checkbox v-model="checked">记住账号</el-checkbox> -->
    <p style="text-align:right;font-size:12px;cursor: pointer;"><router-link to='forget'>{{$t("user.forgetInfo")}}</router-link></p>
    <el-form-item style="text-align:center;">
      <el-button type="primary" size="small" @click.native.prevent="handleLogin()" class="login-submit">{{$t("user.login")}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// import { isvalidUsername } from '@/utils/validate'
import { login } from '@/api/service'
import {messageInfo} from '@/common/common.js'
export default {
  name: 'userlogin',
  data () {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatePassword = (rule, value, callback) => {
      var reg = /^(?![0-9]+$)[0-9A-Za-z]{8,20}$/
      if (!reg.test(value)) {
        callback(new Error(this.$t('user.passwordInfo')))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        phone: '',
        password: ''
      },
      checked: false,
      code: {
        src: '',
        value: '',
        len: 4,
        type: 'text'
      },
      loginRules: {
        phone: [
          { required: true, message: this.$t('user.phoneInfo1'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('user.passwordInfo'), trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        code: [
          { required: true, message: this.$t('user.SMSInfo'), trigger: 'blur' },
          { min: 6, max: 6, message: this.$t('user.SMSInfo2'), trigger: 'blur' }
        ]
      },
      passwordType: 'password'
    }
  },
  created () {
  },
  mounted () {},
  computed: {
  },
  props: [],
  methods: {
    showPassword () {
      this.passwordType === '' ? (this.passwordType = 'password') : (this.passwordType = '')
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          login(this.loginForm)
            .then(res => {
              messageInfo(this.codeInfo(res.data.code))
              if (res.data.code === 1009) {
                this.$router.push({ path: '/account' })
                sessionStorage.clear()
                sessionStorage.setItem('userId', res.data.data.user.id)
                sessionStorage.setItem('x-auth-token', res.data.data.Authorization)
              }
            })
            .catch(res => {
              console.log(res)
            })
          // this.$store.dispatch('Login', this.loginForm).then(res => {
          //   this.$router.push({ path: '/dashboard/dashboard' })
          // })
        }
      })
    },
    codeInfo (data) {
      switch (data) {
        case 1004: return this.$t('code.err1004')
        case 1005: return this.$t('code.err1005')
        case 1006: return this.$t('code.err1006')
        case 1007: return this.$t('code.err1007')
        case 1008: return this.$t('code.err1008')
        case 1009: return this.$t('code.err1009')
      }
    }
  }
}
</script>
<style scoped>
.el-input{
  width:260px
}
.login-form .el-input  i {
    padding: 2px 5px 2px 5px;
    font-size: 16px !important;
}

i{
  cursor: pointer;
}
.login-submit {
  margin-top: 20px;
  width: 80%;
  border-radius: 22px;
  background: #2C1ACC
}
  .form-item{
    width: 95%;
  }
</style>
