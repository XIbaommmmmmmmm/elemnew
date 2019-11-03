// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// store导入
import store from "./store"
// 网络请求导入下载：npm install --save axios vue-axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
// 轮播npm install vue-awesome-swiper --save
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
// elementui下载：npm i element-ui -S
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
