<template>
<div class="forget">
  <div class="login-container">
    <div class="login-header">
      <headers></headers>
    </div>
    <div class="login-content">
      <div class="login-border">
        <div class="login-main">
          <p>{{$t("user.reset")}}</p>
          <code-form></code-form>
        </div>
      </div>
    </div>
  </div>
</div>

</template>
<script>
import CodeForm from './code'
import Headers from '../../components/Headers'
export default {
  name: 'forget',
  components: {
    CodeForm,
    Headers
  },
  data () {
    return {
    }
  },
  created () {},
  mounted () {
    var defaultWidth = document.documentElement.clientWidth
    var defaultHeight = window.innerHeight
    $('div.forget').css('width', defaultWidth + 'px')
    $('div.forget').css('height', defaultHeight + 'px')
  },
  computed: {
  },
  props: [],
  methods: {}
}
</script>

<style scoped>
.forget{
  background: #391DD3;
}
.headers{
  padding-top:8%
}
.login-container {
  background: url('../../assets/img/login.png');
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
  height:600px;
  margin:0 auto
}
.login-header{
  text-align: center;
}
.login-header img{
  margin-top:8%
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
  width:300px;
  height:390px;
  margin: 0 auto
}
.login-border {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 30px 20px 25px 20px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 1px 1px 2px #eee;
}
.login-main {
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #fff;
}
.login-main>p{
  text-align: center;
  font-size: 16px;
  color:#5A52D4
}
.login-form {
  margin: 10px 0;
}
.el-form-item__content {
    width: 270px;
  }
.el-form-item {
    margin-bottom: 12px;
  }

</style>
