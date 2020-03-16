import Vue from 'vue'
import App from './App'
import CuCustom from 'colorui/components/cu-custom.vue'
import Fab from 'components/my-fab.vue'
import uniLoadMore from 'components/uni-load-more.vue'
import './utils/init-vue.js'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.component('LoadMore', uniLoadMore)
Vue.component('Fab', Fab)
Vue.component('cu-custom', CuCustom)

const app = new Vue({
    ...App
})
app.$mount()
