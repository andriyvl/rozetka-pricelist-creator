import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'

export default new Vuetify({
  icons: {
    iconfont: 'mdi' || 'md' || 'fa'
  },
  theme: {
    dark: false
  },
  themes: {
    light: {
      primary: '#4682b4',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c'
    }
  }
})

Vue.use(Vuetify)
