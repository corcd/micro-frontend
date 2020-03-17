/* eslint-disable no-shadow */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  registerMicroApps, // 注册子应用
  runAfterFirstMounted, // 第一个子应用装载完毕
  setDefaultMountApp, // 设置默认装载子应用
  start // 启动
} from 'qiankun'

Vue.config.productionTip = false

let app = null
/**
 * 渲染函数
 * appContent 子应用 html
 * loading 如果主应用设置 loading 效果，可不要
 */
function render({ appContent, loading } = {}) {
  if (!app) {
    app = new Vue({
      el: '#container',
      router,
      store,
      data() {
        return {
          content: appContent,
          loading
        }
      },
      render(h) {
        return h(App, {
          props: {
            content: this.content,
            loading: this.loading
          }
        })
      }
    })
  } else {
    app.content = appContent
    app.loading = loading
  }
}

/**
 * 路由监听
 * @param {*} routerPrefix 前缀
 */
function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix)
}

//  父级传递参数
const msg = {
  data: {
    auth: false
  },
  fns: [
    function LOGOUT_(data) {
      // eslint-disable-next-line no-alert
      alert('父应用返回信息：' + data)
    }
  ]
}

// 调用渲染主应用
render()

// 注册子应用
registerMicroApps(
  [
    {
      name: 'vue-lcps',
      entry: '//localhost:7771',
      render,
      activeRule: genActiveRule('/lcps'),
      props: msg
    }
    // {
    //   name: 'vue-bbb',
    //   entry: '//localhost:7772',
    //   render,
    //   activeRule: genActiveRule('/bbb')
    // }
  ],
  {
    beforeLoad: [
      app => {
        console.log('before load', app)
      }
    ], // 挂载前回调
    beforeMount: [
      app => {
        console.log('before mount', app)
      }
    ], // 挂载后回调
    afterUnmount: [
      app => {
        console.log('after unload', app)
      }
    ] // 卸载后回调
  }
)

// 设置默认子应用,参数与注册子应用时 genActiveRule("/lcps") 函数内的参数一致
setDefaultMountApp('/lcps')

// 第一个子应用加载完毕回调
runAfterFirstMounted(() => {
  // todo
})

// 启动微服务
start()
