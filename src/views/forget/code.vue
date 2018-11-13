<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="phone">
      <el-input size="small" v-model="loginForm.phone" auto-complete="off" :placeholder='this.$t("user.phoneInfo")'>
        <i slot="prefix" class="el-icon-mobile-phone"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input size="small" v-model="loginForm.code" auto-complete="off" :placeholder='this.$t("user.SMSInfo")'>
        <i slot="prefix" class="el-icon-message" style=""></i>
        <template slot="append">
          <span @click="handleSend" class="msg-text" :class="[{display:msgKey}]">{{msgText}}</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small" :type="passwordType" v-model="loginForm.password" auto-complete="off" :placeholder='this.$t("user.passwordInfo")'>
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="el-icon-goods"></i>
      </el-input>
    </el-form-item>
    <el-form-item style="text-align:center">
      <el-button size="small" type="primary" @click.native.prevent="handleLogin" class="login-submit">{{this.$t("account.confirm")}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getSMSCaptcha, forget } from '@/api/service'
const MSGINIT = 'Send SMS code'
// const MSGERROR = '验证码发送失败'
const MSGINITEN = 'Send SMS'
const MSGINITZH = '发送验证码'
const MSGSCUCCESS = '${time}'
const MSGTIME = 60
export default {
  name: 'CodeForm',
  data () {
    const validatePassword = (rule, value, callback) => {
      var reg = /^[A-Za-z0-9]{8,16}$/
      if (!reg.test(value)) {
        callback(new Error(this.$t('user.passwordInfo')))
      } else {
        callback()
      }
    }
    return {
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
      loginForm: {
        phone: '',
        code: '',
        password: ''
      },
      loginRules: {
        phone: [{ required: true, message: this.$t('user.phoneInfo1'), trigger: 'blur' }],
        code: [
          { required: true, message: this.$t('user.SMSInfo'), trigger: 'blur' },
          { min: 6, max: 6, message: this.$t('user.SMSInfo2'), trigger: 'blur' }],
        password: [
          { required: true, message: this.$t('user.passwordInfo'), trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePassword }
        ]

      },
      passwordType: 'password'
    }
  },
  created () {},
  mounted () {
    this.msgText = sessionStorage.getItem('encn') === '0' ? MSGINITEN : MSGINITZH
  },
  computed: {
  },
  props: [],
  methods: {
    showPassword () {
      this.passwordType === '' ? (this.passwordType = 'password') : (this.passwordType = '')
    },
    handleSend () {
      if (this.msgKey) return
      getSMSCaptcha({phone: this.loginForm.phone})
        .then(res => {
          console.log(res)
        })
      this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
      this.msgKey = true
      const time = setInterval(() => {
        this.msgTime--
        this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
        if (this.msgTime === 0) {
          this.msgTime = MSGTIME
          this.msgText = sessionStorage.getItem('encn') === '0' ? MSGINITEN : MSGINITZH
          this.msgKey = false
          clearInterval(time)
        }
      }, 1000)
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          forget({
            phone: this.loginForm.phone,
            captcha: this.loginForm.code,
            newPassword: this.loginForm.password
          })
            .then(res => {
              this.$router.push({ path: '/register' })
            })
        }
      })
    },
    code (data) {
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
.yanzhengma{
  display:block;
  margin-top: 8px;
}
.msg-text {
  display: block;
  width: 30%;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
}
.msg-text.display {
  color: #ccc;
}
.login-submit {
  margin-top: 20px;
  width: 280px;
  border-radius: 22px;
  background: #2C1ACC
}
i{
  cursor: pointer;
}
.login-form .el-input i {
    padding: 2px 5px;
    font-size: 16px !important;
}
.login-form .el-input i {
  margin: 2px 0px;
  font-size: 16px !important;
  cursor: pointer;
}
.login-form .el-input i.el-icon-message{
  margin: 6px 0px;
}
</style>
