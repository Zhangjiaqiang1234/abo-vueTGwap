<template>
    <div class='headers'>
      <div :class="this.$i18n.locale === 'en-US' ? 'en' : 'zh'" style="text-align:right;width:98%;margin:0 auto">
        <el-dropdown  @command="handleCommand" style="color:#FFF">
          <span class="el-dropdown-link">
            {{$t("header.language")}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  command="a">{{$t("header.English")}}</el-dropdown-item>
            <el-dropdown-item  command="b">{{$t("header.Chinese")}}</el-dropdown-item>
            <!-- <el-dropdown-item  command="c" disabled>{{$t("header.Japanese")}}</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <img src="../assets/img/logo.png" alt="">
    </div>
</template>

<script>
export default {
  inject: ['reload'],
  name: 'headers',
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    handleCommand (command) {
      if (command === 'a') {
        this.$i18n.locale = 'en-US'
        this.isEn = 1
        sessionStorage.setItem('encn', 0)
        this.reload()
      }
      if (command === 'b') {
        this.$i18n.locale = 'zh-CN'
        this.isEn = 0
        sessionStorage.setItem('encn', 1)
        this.reload()
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
