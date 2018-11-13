<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="phone">
      <el-input size="small" v-model="loginForm.phone" auto-complete="off" :placeholder='this.$t("user.phoneInfo")'>
        <i slot="prefix" class="el-icon-mobile-phone"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="verificationCode">
      <el-input size="small" v-model="loginForm.verificationCode" auto-complete="off" :placeholder='this.$t("user.SMSInfo")'>
        <i slot="prefix" class="el-icon-message" style=""></i>
        <template slot="append" >
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
    <el-form-item prop="invitationCode" class="show">
      <el-input size="small" v-model="loginForm.invitationCode" auto-complete="off" :placeholder='this.$t("user.invitation")' :disabled="isdisable">
      </el-input>
    </el-form-item>
    <el-form-item style="text-align:center" class="show">
      <el-button size="small" type="primary" @click.native.prevent="handleLogin" class="login-submit" :disabled="phoneVer">{{$t("user.register")}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getSMSCaptcha, register, checkPhone } from '@/api/service'
import {messageInfo} from '@/common/common.js'
const MSGINITEN = 'Send SMS'
const MSGINITZH = '发送验证码'
// const MSGERROR = '验证码发送失败'
const MSGSCUCCESS = '${time}'
const MSGTIME = 60
export default {
  inject: ['reload'],
  name: 'CodeForm',
  props: {
    invitationCode: {
      type: String
    }
  },
  data () {
    const checkPhoneNum = (rule, value, callback) => {
      console.log(this.loginForm.phone)
      var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (reg.test(this.loginForm.phone)) {
        checkPhone({phone: this.loginForm.phone})
          .then((res) => {
            if (res.data.code === 200) {
              callback(new Error('手机号已注册(App账号可通用)，请直接登录'))
              this.phoneVer = true
            } else if (res.data.code === 1004) {
              this.phoneVer = false
              callback()
            }
          }
          )
      } else {
        callback(new Error('请输入正确的手机号码'))
      }
    }
    const validatePassword = (rule, value, callback) => {
      var reg = /^(?!([0-9]+|[A-Za-z]+)$)[0-9A-Za-z]{8,20}$/
      if (!reg.test(value)) {
        callback(new Error('密码8-20位数字+字母'))
      } else {
        callback()
      }
    }
    return {
      phoneVer: false,
      msgText: '',
      msgTime: MSGTIME,
      msgKey: false,
      loginForm: {
        phone: '',
        verificationCode: '',
        password: '',
        invitationCode: ''
      },
      loginRules: {
        phone: [
          { required: true, message: this.$t('user.phoneInfo1'), trigger: 'blur' },
          { required: true, validator: checkPhoneNum, trigger: 'blur' }],
        verificationCode: [
          { required: true, message: this.$t('user.SMSInfo'), trigger: 'blur' },
          { min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur' }],
        password: [
          { required: true, message: this.$t('user.passwordInfo1'), trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePassword }
        ]

      },
      passwordType: 'password',
      isdisable: false
    }
  },
  created () {

  },
  mounted () {
    this.loginForm.invitationCode = this.invitationCode
    this.isdisable = !!this.invitationCode
    this.msgText = sessionStorage.getItem('encn') === '0' ? MSGINITEN : MSGINITZH
  },
  watch: {
    msgText (newVal, oldVal) {
      return oldVal
    }
  },
  computed: {
  },
  methods: {
    showPassword () {
      this.passwordType === '' ? (this.passwordType = 'password') : (this.passwordType = '')
    },
    handleSend () {
      if (this.msgKey) return
      var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!this.phoneVer) {
        getSMSCaptcha({phone: this.loginForm.phone})
          .then(res => {
            messageInfo(res.data.message)
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
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          register(this.loginForm)
            .then(res => {
              if (res.data.code === 200) {
                messageInfo('Success')
                sessionStorage.setItem('login', 1)
              } else {
                messageInfo(this.codeInfo(res.data.code))
              }
            })
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
.yanzhengma{
  display:block;
  margin-top: 8px;
}
.msg-text {
  display: block;
  width: 30%;
  /* font-size: 12px; */
  text-align: center;
  cursor: pointer;
}
.msg-text.display {
  color: #ccc;
}
.login-submit {
  margin-top: 0px;
  width: 80%;
  border-radius: 22px;
  background: #2C1ACC
}
.login-form .el-input i {
  margin: 0px 5px;
  font-size: 16px !important;
  cursor: pointer;
}
.login-form .el-input i.el-icon-message{
  margin: 7px 5px;
}

</style>
