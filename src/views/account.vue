<template>
  <div class='account'>
    <el-container>
      <el-header>
        <headers></headers>
      </el-header>
      <el-main>
        <el-row class="top"  justify="center">
          <el-col class="top1" :xs="24" :md="8">
            <el-row type="flex" align="middle" justify="center">
              <el-col :span='14'><p class="top-title">{{$t("account.assets")}}</p></el-col>
              <el-col :span='10'><p style="text-align:right;margin-right:8px"><span class="active" @click="dialogVisible = true" v-show='activationFlag===0'>{{$t("account.active")}}<i class="el-icon-arrow-right"></i></span></p> </el-col>
              <el-dialog :visible.sync="dialogVisible" width="90%">
                <p style="text-align:left;margin-top:0;font-size:16px;color:#000">{{$t("account.Activation")}}</p>
                <span style="color:#838282">{{$t("account.ActivationInfo")}}</span>
                <p style="text-align:left;color:#000;margin-top:10px">{{$t("account.ActivationInfo1")}}</p>
                <el-button size="mini" style="width:100%;color:#2A1ACC" @click="copy('invitationCode')">{{$t("account.copy")}}</el-button>
                <p style="text-align:left;color:#000;margin-top:10px">{{$t("account.ActivationInfo2")}}</p>
                <el-button  size="mini" style="width:100%"><a href="https://t.me/ABOChain">{{$t("account.joinTelegraphGroup")}}</a></el-button>
                <br>
                <el-button size="mini" style="width:100%;margin-top:2%"><a href="https://0.plus/#/ABOChain">{{$t("account.joinBiyong")}}</a></el-button>
              </el-dialog>
            </el-row>
            <el-row type="flex" justify="center" align="middle">
              <el-col>
                <p>
                  <span class="count">{{assets}}</span><span class='countInfo'>ABO</span>
                  <el-button size="mini" class="activeBtn" v-show='activationFlag===0' disabled="">{{$t("account.activeBtn1")}}</el-button>
                  <el-button size="mini" class="activeBtn" v-show='activationFlag===1'>{{$t("account.activeBtn2")}}</el-button>
                </p>
                <p style="margin-top:5px"><el-button size="mini" class="withdrawBtn" @click="dialogWithdraw()">{{$t("account.withdraw")}}</el-button> </p>
                <el-dialog :visible.sync="Withdraw" width="90%">
                <div style="width:80%;margin: 0 auto">
                  <p style="text-align:left;font-size:12px;color:#000">{{this.$t("account.withdraw")}}</p>
                  <span style="text-align:left;margin-top:20px;font-size:16px;color:#000">{{$t("account.walletAddress")}}</span>
                  <p style="text-align:left;"><el-input v-model="walletAddress"></el-input></p>
                  <span style="color:red">{{$t("account.withdrawInfo2")}}</span>
                  <p style="text-align:left;margin-top:20px;font-size:16px;color:#000"><span >{{$t("account.balance")}}</span></p>
                  <p style="text-align:left;"><el-input style="width:50%;margin-right:5%"  v-model="withdrawNum"></el-input><el-button  style="width:40%;" @click="withdraws()">{{$t("account.withdraw")}}</el-button> </p>
                  <span style="color:red">{{$t("account.withdrawInfo1")}}</span>
                  <p style="text-align:left;">{{$t("account.withdrawInfo3")}} </p>
                  <p style="text-align:left;">{{$t("account.rulsInfo5")}}</p>
                </div>
              </el-dialog>
              <el-dialog :visible.sync="WithdrawInfo" width="80%">
                <div style="width:90;margin: 0 auto"><p>提现功能将于9月30日开放，敬请期待。</p></div>
              </el-dialog>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="top2" :xs="24" :md="8">
            <el-row type="flex" align="middle" justify="space-between">
              <el-col><p class="top-title">{{$t("account.link")}}</p></el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span='20'>
                <!-- <p>{{$t("account.clickCount")}}:0</p> -->
                <p style="word-break: break-all;width:80%;text-align:center;margin:0.15rem auto;font-size:20px" id="invitationUrl">{{invitationUrl}}</p>
                <p><el-button size="mini" class="linkBtn"  @click="copy('invitationUrl')">{{$t("account.copy")}}</el-button></p>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="top3" :xs="24" :md="8">
              <el-row type="flex" align="middle" justify="center">
                <el-col><p class="top-title">{{$t("account.invitationCode")}}</p></el-col>
              </el-row>
            <el-row type="flex" align="middle" justify="center">
              <el-col :span='20'>
                <p id="invitationCode">{{invitationCode}}</p>
                <p><el-button size="mini" class="invitationCodeBtn" @click="copy('invitationCode')">{{$t("account.copy")}}</el-button></p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="middle">
           <el-row type="flex" align="middle" justify="center" class='title'>
              <el-col  :span='22'><p>{{$t("account.status")}}</p></el-col>
            </el-row>
            <el-row type="flex" align="middle" justify="center" style="text-align:center">
              <el-col :span='11'>
                <p class="middle-count">{{recommendedCount}}</p>
                <p class="middle-font">{{$t("account.RecommendedCount")}}</p>
              </el-col>
              <el-col :span='11' :offset="2">
                <p class="middle-count" style="color:#CD9E0C">{{recommendedMoney}}<span style="font-size:20px;margin-left:20px">ABO</span> </p>
                <p class="middle-font">{{$t("account.ReceivedAwards")}}</p>
              </el-col>
            </el-row>
        </el-row>
        <el-row class="middle">
          <el-row type="flex" align="middle" justify="center" class='title'>
              <el-col  :span='22'><p>{{$t("account.appDownload")}}</p></el-col>
          </el-row>
          <el-row type="flex" align="middle" justify="center" style="text-align:center">
              <el-col :span='11'>
                <p class="middle-count"><a href="http://47.244.108.42/ABO_v1.4.1.apk"><img src="../assets/img/app/android.png" alt=""></a></p>
              </el-col>
              <el-col :span='11' :offset="1">
                <!-- href = itms-services://?action=download-manifest&url=https://www.abochain.io/manifest.plist -->
                <p class="middle-count"><a href="itms-services://?action=download-manifest&url=https://plist.gunchung.com/com.aboCompany.ABOIOS_1542075354.plist"><img src="../assets/img/app/ios.png" alt=""></a></p>
              </el-col>
          </el-row>
        </el-row>
        <el-row class="bottom">
            <el-row type="flex" align="middle" justify="center" class='title'>
              <el-col  :span='22'>
                <p>{{$t("account.ruls")}}</p>
              </el-col>
            </el-row>
            <el-row type="flex" align="middle" justify="center" class="info">
              <el-col :span='22'>
                <p>{{$t("account.rulsInfo1")}}</p>
                <p>{{$t("account.rulsInfo2")}}</p>
                <p>{{$t("account.rulsInfo3")}}</p>
                <p>{{$t("account.rulsInfo4")}}</p>
                <p>{{$t("account.rulsInfo5")}}</p>
              </el-col>
            </el-row>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { userInfo } from '@/api/service'
import Headers from '../components/Headers'
export default {
  name: 'account',
  components: {
    Headers
  },
  data () {
    return {
      dialogVisible: false,
      Withdraw: false,
      WithdrawInfo: false,
      activationFlag: '',
      assets: '',
      invitationUrl: '',
      invitationCode: '', // 邀请码
      recommendedCount: '',
      recommendedMoney: '',
      walletAddress: '', // 用户填写钱包地址
      withdrawNum: '' // 用户提交体现数量
    }
  },
  watch: {
  },
  created () {
  },
  computed: {
    userId () {
      return sessionStorage.getItem('userId')
    }
  },
  mounted () {
    var defaultWidth = document.documentElement.clientWidth
    var defaultHeight = window.innerHeight
    $('div.account').css('width', defaultWidth + 'px')
    this.getUserInfo()
  },
  methods: {
    active () {
    },
    dialogWithdraw () {
      if (this.activationFlag === 0) {
        this.$message({
          message: this.$t('account.activeInfo'),
          type: 'warning'
        })
        this.dialogVisible = true
      } else {
        this.Withdraw = true
      }
    },
    withdraws () {
      this.WithdrawInfo = true
    },
    getUserInfo () {
      userInfo(this.userId)
        .then(res => {
          sessionStorage.setItem('userId', res.data.data.userId)
          this.activationFlag = res.data.data.activationFlag
          this.assets = res.data.data.assets
          this.invitationUrl = res.data.data.invitationUrl
          this.invitationCode = res.data.data.invitationCode
          this.recommendedCount = res.data.data.recommendedCount
          this.recommendedMoney = res.data.data.recommendedMoney
        })
        .catch(err => {
          console.log(err)
          sessionStorage.clear()
          this.$router.push({ path: '/register' })
        })
    },
    copy (data) {
      var txt = document.getElementById(data).innerHTML
      var oInput = document.createElement('input')
      oInput.value = txt
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.className = 'oInput'
      oInput.style.display = 'none'
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.account{
  background: #391DD3;
  margin: 0 auto
}
.el-container {
  background: url('../assets/img/login.png');
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
}
.el-header,.el-main,.el-footer{
  width:98%;
  margin:0 auto;
  padding:0px
}
.el-header{
  width:90%;
  height:10px;
  text-align: center;
  margin-top:10px;
  margin-bottom:10px
}
.top>.el-col{
  border-radius: 15px;
  margin-top:5px;
  font-size:12px;
  background: #FFF;
}
/* .top1{
  width:100%;
}
.top2{
  width:100%;
}
.top3{
  width:100%;
} */
.top1>.el-row:nth-child(1),.top2>.el-row:nth-child(1),.top3>.el-row:nth-child(1){
  height:35px;
  background: #F4F3FC;
  border-radius: 15px;
}
.top p{
  text-align: center
}
.top .top-title{
  font-size:16px;
  text-align: left;
  margin-left:15px
}
.middle,.bottom{
  background: #FFF;
  border-radius: 15px;
  margin-top:10px
}
.bottom{
  margin-bottom:10px
}
.active{
  cursor: pointer;
  color:#2C1ACC;
}
.count{
  font-size:30px;
  color:#CD9E0C
}
.countInfo{
  font-size:20px;
  margin-left:10px;
  color:#2C1ACC
}
.activeBtn{
  border-radius: 10px;
  font-size:12px
}
.withdrawBtn{
  width:30%;
  border-radius:25px;
  background: #2C1ACC;
  color:#FFF;
  font-size:12px
}
#invitationCode{
  margin-top:0.8rem;
  margin-bottom:0;
  font-size:30px;
  color:#2C1ACC
}
.invitationCodeBtn{
  margin-top:0px;
}
.linkBtn,.invitationCodeBtn{
  color:#2C1ACC;
  border:1px solid #2C1ACC;
  border-radius: 8px
}
.title{
  height:35px;
  width:100%;
  background: #F4F3FC;
  border-radius: 15px;
  font-size:16px
}
.middle-count{
  font-size:30px;
  margin-top:15px;
  margin-bottom:15px;
  text-align:center;
  color:#2A1ACC
}
.middle-count img{
  width:80%;
  margin: 0 auto
}
.middle-font{
  font-size:10px
}
.bottom .info{
  font-size:10px;
}
.bottom .info p{
  margin:5px
}
.bottom .info p:nth-child(1){
  margin-top:5px
}
</style>
