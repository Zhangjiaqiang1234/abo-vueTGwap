<template>
  <div class='manager'>
    <el-container>
      <el-header>
        <headers></headers>
      </el-header>
      <el-main>
        <el-row type="flex" justify="center" align="middle">
          <el-col :span="7">
            <el-input v-model.trim='searchUserID' placeholder='请输入查询账户ID'></el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button @click="searchUser()">查询账户</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" align="middle">
          <el-col :span="7">
            <el-row>
              <el-col :span="11"><el-input v-model.trim='activeUserID' placeholder="请输入激活账户ID" ></el-input></el-col>
              <el-col :span="11" :offset="2"><el-input v-model.trim='telegram' placeholder="请输入电报群用户名" ></el-input></el-col>
            </el-row>
          </el-col>
          <el-col  :span="2" :offset="1">
            <el-button @click="activeUser(activeUserID,telegram)">激活账户</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData.slice((pageNum-1)*pageSize,pageNum*pageSize)" border center>
            <el-table-column prop="userId" label="用户ID"  min-width="80" align='center'>
            </el-table-column>
            <el-table-column prop="activationFlag" label="激活状态" :formatter="showActive" min-width="80" align='center'>
            </el-table-column>
            <el-table-column prop="telegram" label="电报群用户名"  min-width="80" align='center'>
            </el-table-column>
            <el-table-column prop="invitationCode" label="邀请码" min-width="80" align='center'>
            </el-table-column>
            <el-table-column prop="invitationUrl" label="邀请链接" min-width="250" align='center'>
            </el-table-column>
            <el-table-column prop="recommendedCount" label="邀请人数" width="80" align='center'>
            </el-table-column>
            <el-table-column prop="recommendedMoney" label="邀请奖励ABO" min-width="80" align='center'>
            </el-table-column>
            <el-table-column prop="assets" label="钱包ABO" min-width="80" align='center'>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align='center'>
                <template slot-scope="scope">
                    <el-button @click="activeUserButton(scope.row.activationFlag,scope.row.userId)" type="text" size="small">激活账户</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10,20,30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getAllUserInfo, userInfo, active } from '@/api/service'
import Headers from '../components/Headers'
export default {
  inject: ['reload'],
  name: 'manager',
  components: {
    Headers
  },
  data () {
    return {
      searchUserID: '',
      activeUserID: '',
      telegram: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      activationFlag: ''
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
    // var defaultWidth = document.documentElement.clientWidth >= 1200 ? document.documentElement.clientWidth : 1280
    // var defaultHeight = window.innerHeight
    // $('div.manager').css('width', defaultWidth + 'px')
    if (this.userId) {
      this.getUserInfo()
      this.admingetAllUserInfo()
    } else {
      this.$router.push({ path: '/register' })
    }
  },
  methods: {
    searchUser () {
      this.reset()
      if (this.searchUserID) {
        userInfo(this.searchUserID)
          .then(res => {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
            this.tableData.push(res.data.data)
            this.total = res.data.data.length
          })
          .catch(() => {
            this.$message({
              message: '用户不存在',
              type: 'warning'
            })
          })
      } else {
        this.admingetAllUserInfo()
      }
    },
    showActive (row, column) {
      var date = row[column.property]
      if (date === 1) {
        return '已激活'
      } else {
        return '未激活'
      }
    },
    activeUser (param1, param2) {
      active({
        userId: param1,
        telegram: param2})
        .then(res => {
          if (res.data.code === 1011) {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
            this.reload()
          } else {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
          }
        })
    },
    activeUserButton (param1, param2) {
      if (param1) {
        this.$message({
          message: '账户已激活',
          type: 'warning'
        })
      } else {
        this.$prompt('请输入telegram用户名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.activeUser(param2, value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      }
    },
    getUserInfo () {
      if (this.userId) {
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
      }
    },
    admingetAllUserInfo () {
      this.reset()
      getAllUserInfo({
        phone: '',
        activationFlag: '',
        userId: '',
        pageNum: '1',
        pageSize: '10000'
      })
        .then(res => {
          this.tableData = res.data.data
          this.total = res.data.data.length
        })
    },
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.pageNum = val
    },
    reset () {
      this.tableData = [] // 清空表单
      this.pageNum = 1
      this.pageSize = 10
      this.total = 0
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.manager{
  background: #391DD3;
  /* max-width: 340px;
  margin: 0 auto */
  padding-bottom: 200px
}
.el-container {
  background: url('../assets/img/login.png');
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
}
.el-header,.el-main{
  width:1240px;
  margin:0 auto
}
.el-header{
  height:400px;
  text-align: center;
  margin-top:50px;
  margin-bottom:50px
}
.el-main .el-row{
  margin-bottom:1%
}
.el-table{
  width: 98%;
  margin:2% auto 0
}
.block{
  text-align: right;
  background-color:#FFF;
  width: 98%;
  margin: 0 auto;
  padding: 0
}
</style>
