import Vue from 'vue'
import App from './App.vue'
// import { Row, Button } from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import axios from 'axios';
//import Cookie from 'js-cookie'

Vue.config.productionTip = false
 Vue.prototype.$axios=axios;

// 全局引入
Vue.use(ElementUI)

// 按需引入
// Vue.use(Row)
// Vue.use(Button)

//挂载路由导航守卫
router.beforeEach((to,from,next) => {
  //to要访问的路径
  //from代表从哪个路径跳转而来
  //next是一个函数，表示放行 next()放行 , next('/login')强制跳转
  if(to.path ==='/' || to.path==='/Register') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  console.log("213",tokenStr)
  if(!tokenStr) return next('/')
  next()
})


new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
