<template>
  <div class="news">
    <div class="content">
    </div>
    <div class="footer">
      <div>
        <img src="../assets/img/app/footer.png" alt="">
        <router-link to='/download'><el-button type="mini">&nbsp;&nbsp;&nbsp;下载&nbsp;&nbsp;&nbsp;</el-button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'news',
  data () {
    return {
      htmlContent: ''
    }
  },
  mounted () {
    var defaultHeight = window.innerHeight
    $('div.news').css('height', defaultHeight + 'px')
    var url = window.location.pathname
    var index = url.lastIndexOf('/')
    if (index !== 0) {
      var id = url.slice(index + 1)
    }
    axios.get('/api/news/detail/' + id)
      .then(res => {
        $('div.content').html(res.data.data.content)
        document.title = res.data.data.title
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.news{
  max-width: 100%;
  height:100%;
  margin: 0px auto;

}
.content{
  width:95%;
  margin:0 auto
}
.footer{
  position: fixed;
  bottom:0
}
.footer div{
  position: relative;
}
.footer img{
  width:100%
}
.footer .el-button{
  width:20%;
  position: absolute;
  top:50%;
  left:85%;
  transform: translate(-50%, -50%);
  border-radius:1rem;
  cursor: pointer;
}
</style>
