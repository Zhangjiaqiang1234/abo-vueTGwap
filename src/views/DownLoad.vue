<template>
  <div class="downLoad">
    <img src="../assets/img/app/bg2.png" alt="" class="bg">
    <img src="../assets/img/app/androidDownload.png" alt="" class='bgDownLoad hidden'>
    <a href="http://www.abochain.io/ABO_v1.4.2.apk"><img src="../assets/img/app/android.png" alt="" class="bt android" @click="downLoad()"></a>
    <!-- href = itms-services://?action=download-manifest&url=https://www.abochain.io/manifest.plist -->
    <a href="https://itunes.apple.com/cn/app/id1443708821"><img src="../assets/img/app/ios.png" alt="" class="bt ios"></a>
  </div>
</template>

<script>
export default {
  name: 'downLoad',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    downLoad () {
      var ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        $('.bgDownLoad').removeClass('hidden')
        $('.bgDownLoad').addClass('isShow')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.downLoad{
  max-width: 100%;
  height:605px;
  margin: 0px auto;
  position: relative
}
.downLoad .bg{
  width:100%;
  z-index: 1
}
.downLoad .bt{
  position: absolute;
  left:50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  cursor: pointer;
}
.downLoad .android{
  width:66%;
  bottom:19%;

}
.downLoad .ios{
  width:65%;
  bottom:8%;
}
.bgDownLoad{
  width:100%;
}
.hidden{
  display: none
}
.isShow{
  display: block;
  position: absolute;
  top:0;
  z-index: 3;
}
</style>
