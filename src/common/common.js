import { Message } from 'element-ui'
import VueI18n from 'vue-i18n'

export const messageInfo = (data) => {
  Message({
    message: data,
    type: 'warning'
  })
}

// export const code = (data) => {
//   switch (data) {
//     case 1004: return `this.$t('code.err1004')`
//     case 1005: return this.$t('code.err1005')
//     case 1006: return this.$t('code.err1006')
//     case 1007: return this.$t('code.err1007')
//     case 1008: return this.$t('code.err1008')
//     case 1009: return this.$t('code.err1009')
//   }
// }
